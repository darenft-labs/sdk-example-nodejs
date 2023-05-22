import Cookies from "universal-cookie"
import axios, { AxiosInstance, AxiosResponse } from "axios"
import store from "@/redux/store"
import { setAccessToken, setIsRefreshingToken, setRetry } from "@/redux/auth"

export enum AuthType {
  Basic,
  Bearer,
  ///...
}

export enum ApiName {
  SSO,
  Notification,
}

export enum TokenName {
  access_token = "access_token",
  refresh_token = "refresh_token",
}

const cookies = new Cookies()

export default class HttpService {
  protected readonly instance: AxiosInstance

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    })
    this._initializeResponseInterceptor()
  }

  protected _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this._handleResponse, this._handleError)
  }

  protected _handleResponse = ({ data }: AxiosResponse) => {
    const dispatch = store.dispatch
    dispatch(setRetry(3))
    return data
  }

  protected _handleError = async (error: any) => {
    const dispatch = store.dispatch
    const { auth } = store.getState()
    const { retry, isRefreshing } = auth
    const { config: originalReq, response } = error
    const refreshToken = HttpService.getToken(TokenName.refresh_token)
    const accessToken = HttpService.getToken(TokenName.access_token)

    if (response?.status === 401 && !!accessToken && !!refreshToken) {
      if (!isRefreshing && retry > 0) {
        dispatch(setIsRefreshingToken(true))
        dispatch(setRetry(retry - 1))

        try {
          const res: any = await axios.post(
            `${import.meta.env.VITE_TOURNAMENT_SERVICE_URL}user/refresh-token`,
            {
              refresh_token: refreshToken,
            }
            // TODO: will remove
            // {
            //   auth: {
            //     username: import.meta.env.VITE_SSO_BASIC_AUTH_USERNAME,
            //     password: import.meta.env.VITE_SSO_BASIC_AUTH_PASSWORD,
            //   },
            // }
          )

          if (res?.data?.access_token) {
            dispatch(setAccessToken(res?.data?.access_token))
            HttpService.saveToken(TokenName.access_token, res?.data?.access_token)
            originalReq.headers.Authorization = `Bearer ${res?.data?.access_token}`
          } else if (res?.data?.error) {
            dispatch(setRetry(3))
            window.location.replace("/")
            HttpService.removeToken(TokenName.access_token)
            HttpService.removeToken(TokenName.refresh_token)
          }

          dispatch(setIsRefreshingToken(false))
          return axios.request(originalReq)
        } catch (ex: any) {
          if (ex?.response?.status === 401) {
            dispatch(setRetry(3))
            dispatch(setIsRefreshingToken(false))
            window.location.replace("/")
            HttpService.removeToken(TokenName.access_token)
            HttpService.removeToken(TokenName.refresh_token)
          }

          return Promise.reject(ex)
        }
      }
    } else {
      dispatch(setRetry(3))
      dispatch(setIsRefreshingToken(false))
      return Promise.reject(error)
    }
  }

  static saveToken(name: string, value: string, expires?: Date) {
    cookies.set(name, value, {
      sameSite: true,
      path: "/",
      expires,
      domain: import.meta.env.VITE_ENV === "dev" ? "" : import.meta.env.VITE_SUB_DOMAIN,
    })
  }

  static getToken(name: string) {
    return cookies.get(name)
  }

  static removeToken(name: string) {
    cookies.remove(name)
  }
}

const getAuthConfig = (type: AuthType, apiName: ApiName) => {
  let config = {}
  if (type === AuthType.Basic) {
    config = {
      auth: {
        username: import.meta.env.VITE_SSO_BASIC_AUTH_USERNAME,
        password: import.meta.env.VITE_SSO_BASIC_AUTH_PASSWORD,
      },
    }
  }

  if (type === AuthType.Bearer) {
    const accessToken = HttpService.getToken(TokenName.access_token)
    config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  }

  return config
}

export function useAuth(type: AuthType, apiName: ApiName = ApiName.SSO) {
  return function (target: Object, key: string | symbol, descriptor: PropertyDescriptor) {
    let originalMethod = descriptor.value
    descriptor.value = function (...args: any[]) {
      const config = getAuthConfig(type, apiName)
      args.push(config)
      let result = originalMethod.apply(this, args)
      return result
    }
  }
}
