import { useState } from "react"
import { useEthers } from "@usedapp/core"
import { useDispatch } from "react-redux"
import { setModalOpened } from "@/redux/modal-connect-wallet"
import { BaseModal, Button } from "@/shared/components"
import {
  QuitGameModal,
  SelectGameModal,
  UpdateMetadataModal,
  UpdateMetadataNotinVaultModal,
} from "../modal-interactions"
import {
  BUTTON_PLAY_GAME,
  BUTTON_QUIT_GAME,
  BUTTON_UPDATE,
  BUTTON_UPDATE_NOT_IN_VAULT,
} from "@/helpers/static-data"

interface Props {
  title: string
  type: string
  disabled?: boolean
}

const ButtonInteraction = ({ title, type, disabled }: Props) => {
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

  const getComponent = () => {
    if (type === BUTTON_PLAY_GAME) {
      return <SelectGameModal onClose={handleClose} />
    }
    if (type === BUTTON_QUIT_GAME) {
      return <QuitGameModal onClose={handleClose} />
    }
    if (type === BUTTON_UPDATE) {
      return <UpdateMetadataModal onClose={handleClose} />
    }
    if (type === BUTTON_UPDATE_NOT_IN_VAULT) {
      return <UpdateMetadataNotinVaultModal onClose={handleClose} />
    }
  }

  return (
    <div>
      <Button
        fillColor="blue"
        fillVariant="flat"
        className="rounded lg:w-[280px] w-full h-12 font-semibold !text-base"
        onClick={handleOpen}
        disabled={disabled}
      >
        {title}
      </Button>
      {isOpen && (
        <BaseModal
          typeMode="white"
          className="!w-[600px] !min-h-[400px]"
          title=""
          visible={isOpen}
          onClose={handleClose}
        >
          {getComponent()}
        </BaseModal>
      )}
    </div>
  )
}

export default ButtonInteraction
