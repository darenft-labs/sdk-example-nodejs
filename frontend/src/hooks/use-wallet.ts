import { useEffect, useRef } from "react"
import { useEtherBalance, useEthers } from "@usedapp/core"
import WalletConnectProvider from "@walletconnect/web3-provider/dist/umd/index.min.js"
import { Web3Provider } from "@ethersproject/providers"

import { RPCS } from "@/dapp/config"
import { ConnectWalletType } from "@/helpers/static-data"
import { uniqueId } from "lodash"
import { useLoadingOverlay } from "./use-loading-overlay"
import { utilsNotification } from "@/utils/utils-notification"
import { personalSign } from "@/utils/utils"

export const METAMASK_EXTENSION_INSTALL_URL = "https://metamask.io/download"

export function useWallet() {
  const { activateBrowserWallet, account, deactivate, library: lib, activate } = useEthers()
  const walletTypeRef = useRef(null)

  const nonce = uniqueId()
  const message = `
  Welcome to Game Demo!

  Click "Sign" to sign in. No password needed!
  This request will not trigger a blockchain transaction or cost any gas fees.

  I accept the Dareplay Terms of Service: https://darenft.com/tos

  Wallet address:
  ${account}

  Nonce:
  ${nonce}
  `

  const library = lib as Web3Provider

  const { showLoading } = useLoadingOverlay()

  useEffect(() => {
    if (!library || !account || !walletTypeRef.current) {
      return
    }

    showLoading(true)
    ;(async () => {
      const signature = await personalSign(
        library.provider,
        account,
        message,
        walletTypeRef.current
      )

      // TODO: store... by redux
      //   const resp = await api.MarketplaceApi.connectWallet(signature, message)

      showLoading(false)
    })().catch((err) => {
      ;(window as any).__askingPersonal = false
      // metamask or api fail ...
      console.log(err, "Cannot login")
      showLoading(false)
      deactivate()
      removeCacheWalletConnect()
      utilsNotification.warning(err.message)
    })
  }, [account, walletTypeRef.current])

  async function handleConnectWallet(walletType: ConnectWalletType) {
    walletTypeRef.current = walletType
    switch (walletType) {
      case ConnectWalletType.META_MASK:
        await activateBrowserWallet()
        break
      case ConnectWalletType.WALLET_CONNECT:
        try {
          const provider = new WalletConnectProvider({
            rpc: RPCS,
            qrcode: true,
          })
          await provider.enable()

          await activate(provider)
        } catch (error) {
          console.log(error)
          deactivate()
          removeCacheWalletConnect()
        }
        break
      default:
        break
    }
  }

  function removeCacheWalletConnect() {
    // Remove cache ws
    localStorage.removeItem("walletconnect")
  }

  function handleDisconnectWallet() {
    deactivate()
  }

  function checkMetaMaskInstalled() {
    return !!window.ethereum
  }

  return {
    account,
    balance: useEtherBalance(account),
    connect: handleConnectWallet,
    disconnect: handleDisconnectWallet,
    checkMetaMaskInstalled,
  }
}
