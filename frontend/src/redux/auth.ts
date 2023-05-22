import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type AuthState = {
  accessToken: string | null
  refreshToken: string | null
  expiresIn: number | null
  isRefreshing: boolean
  retry: number
}

const initialAuthState: AuthState = {
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
  isRefreshing: false,
  retry: 3,
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload
    },
    setRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload
    },
    setIsRefreshingToken(state, action: PayloadAction<boolean>) {
      state.isRefreshing = action.payload
    },
    setRetry(state, action: PayloadAction<number>) {
      state.retry = action.payload
    },
  },
})

export const { setAccessToken, setIsRefreshingToken, setRetry, setRefreshToken } = authSlice.actions

export default authSlice
