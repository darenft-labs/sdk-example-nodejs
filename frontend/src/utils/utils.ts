import tailwindConfig from "tailwind.config.js" // IMPORTANT that the path is NOT relative, only the file name
import resolveConfig from "tailwindcss/resolveConfig"
import WalletConnectProvider from "@walletconnect/web3-provider/dist/umd/index.min.js"
import { ExternalProvider } from "@ethersproject/providers"
import { ConnectWalletType } from "@/helpers/static-data"

export default resolveConfig(tailwindConfig as any)

export const personalSign = (
  provider: ExternalProvider,
  account: string,
  message: string,
  walletType: ConnectWalletType
): Promise<string> =>
  new Promise(async (resolve, reject) => {
    if (!provider) {
      return reject(new Error("provider not found"))
    }

    switch (walletType) {
      case ConnectWalletType.META_MASK:
        provider.sendAsync(
          {
            method: "personal_sign",
            params: [message, account],
          },
          (err, response) => {
            if (err) {
              return reject(err)
            }

            resolve(response.result)
          }
        )
        break
      case ConnectWalletType.WALLET_CONNECT:
        try {
          const otherProvider = (provider as WalletConnectProvider).connector
          if (otherProvider) {
            const params = [message, account]

            const signature = await otherProvider.signPersonalMessage(params)
            return resolve(signature)
          }
        } catch (error) {
          return reject(error)
        }
        return reject(new Error("invalid provider"))
      default:
        reject(new Error("invalid wallet"))
        break
    }
  })
