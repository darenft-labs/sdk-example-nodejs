import React from "react"
import { useDispatch } from "react-redux"
import { setModalOpened } from "@/redux/modal-connect-wallet"
import { Button } from "@/shared/components"
import { ModalConnectWallet } from "@/shared/components/modal-connect-wallet"

function ConnectWalletSSO() {
  const dispatch = useDispatch()

  const handleConnectWallet = async () => {
    dispatch(setModalOpened(true))
  }

  return (
    <>
      <Button className="!bg-blue-700" onClick={handleConnectWallet}>
        Connect Wallet
      </Button>
      <ModalConnectWallet />
    </>
  )
}

export default ConnectWalletSSO
