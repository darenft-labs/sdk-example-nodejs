import ModalUpdateMetadata from "@/features/modal-update-metadata"
import { setModalOpened } from "@/redux/modal-connect-wallet"
import { BaseModal, Button } from "@/shared/components"
import { useEthers } from "@usedapp/core"
import React, { useState } from "react"
import { useDispatch } from "react-redux"

const ButtonUpdateMetadata = () => {
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
    <div>
      <Button
        fillColor="blue"
        fillVariant="flat"
        className="rounded lg:w-[320px] w-full h-12 font-semibold !text-base"
        onClick={handleOpen}
      >
        Update metadata
      </Button>
      {isOpen && (
        <BaseModal
          typeMode="white"
          className="!w-[600px] !min-h-[400px]"
          title=""
          visible={isOpen}
          onClose={handleClose}
        >
          <ModalUpdateMetadata onClose={handleClose} />
        </BaseModal>
      )}
    </div>
  )
}

export default ButtonUpdateMetadata
