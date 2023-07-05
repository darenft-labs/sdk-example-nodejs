import { BaseModal, Button } from "@/shared/components"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { useEthers } from "@usedapp/core"
import { setModalOpened } from "@/redux/modal-connect-wallet"
import ModalImport from "./import-modal"

const ImportButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const { account } = useEthers()
  const handleConnectWallet = async () => {
    dispatch(setModalOpened(true))
  }

  const handleOpen = () => {
    account ? setIsOpen(true) : handleConnectWallet()
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Button
        fillColor="blue"
        fillVariant="flat"
        className="rounded w-[320px] h-12 font-semibold !text-base"
        onClick={handleOpen}
      >
        Import NFT
      </Button>
      {isOpen && (
        <BaseModal
          typeMode="white"
          className="!w-[569px] !h-[400px]"
          title=""
          visible={isOpen}
          onClose={handleClose}
        >
          <ModalImport onClose={handleClose} />
        </BaseModal>
      )}
    </>
  )
}

export default ImportButton
