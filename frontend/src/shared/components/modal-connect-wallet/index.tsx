import { useState } from "react"
import { useDispatch } from "react-redux"
import clsx from "clsx"

import { ConnectWalletType } from "@/helpers/static-data"
import { METAMASK_EXTENSION_INSTALL_URL, useWallet } from "@/hooks/use-wallet"
import { useAppSelector } from "@/redux/hooks"
import { setModalOpened } from "@/redux/modal-connect-wallet"
import { RootState } from "@/redux/store"
import { BaseModal } from "@/shared/components/base-modal"
import { Button } from "@/shared/components/button"
import { Checkbox } from "../checkbox"
import metamaskIcon from "@/assets/icons/metamask.svg"
import walletConnectIcon from "@/assets/icons/wallet-connect-select.svg"
import i18n from "@/i18n/config"
import { useEthers } from "@usedapp/core"

const chooseWalletOptions = [
  {
    imageUrl: metamaskIcon,
    label: "Metamask",
    width: "50%",
    disabled: false,
    type: ConnectWalletType.META_MASK,
  },
  {
    imageUrl: walletConnectIcon,
    label: "Wallet Connect",
    width: "50%",
    disabled: false,
    type: ConnectWalletType.WALLET_CONNECT,
  },
]

export const ModalConnectWallet = () => {
  const { checkMetaMaskInstalled, connect } = useWallet()
  const isMetaMaskInstalled = checkMetaMaskInstalled()
  const { isOpened } = useAppSelector((state: RootState) => state.modalConnectWallet)
  const dispatch = useDispatch()
  const [walletActive, setWalletActive] = useState(undefined)
  const [policyChecked, setPolicyChecked] = useState(false)

  async function handleConnectWallet() {
    const type = chooseWalletOptions[walletActive]?.type
    if (type && policyChecked) {
      switch (type) {
        case ConnectWalletType.META_MASK:
          if (isMetaMaskInstalled) {
            await connect(type)
            handleCloseConnectWalletModal()
          } else {
            window.open(METAMASK_EXTENSION_INSTALL_URL, "_blank")
          }
          break
        case ConnectWalletType.WALLET_CONNECT:
          await connect(type)
          handleCloseConnectWalletModal()
          break

        default:
          break
      }
    }
  }

  function handleCloseConnectWalletModal() {
    dispatch(setModalOpened(false))
  }

  return (
    <>
      {isOpened == true && (
        <BaseModal
          visible={true}
          onClose={handleCloseConnectWalletModal}
          className="!w-[569px] !h-[450px]"
        >
          <div className="pb-[29px] pt-5 px-9">
            <h1 className="text-[30px] leading-[28px] font-[300] text-white uppercase text-center">
              {i18n.t("Choose wallet")}
            </h1>
            <div className="flex w-full justify-center space-x-2.5 mt-4">
              {chooseWalletOptions.map((item, idx) => (
                <OptionItem
                  key={item.label}
                  label={item.label}
                  width={item.width}
                  imageUrl={item.imageUrl}
                  disabled={item.disabled}
                  active={idx === walletActive}
                  onclick={() => setWalletActive(idx)}
                />
              ))}
            </div>
            <div className="horizontal-line mt-8 mb-6 bg-gallery w-full h-px" />
            <div className="mt-8 ml-2">
              <Checkbox checked={policyChecked} onChange={() => setPolicyChecked(!policyChecked)} />
              <p
                className="cursor-pointer text-white text-xs ml-5 inline-block align-top mt-[-8px]"
                onClick={() => setPolicyChecked(!policyChecked)}
              >
                {i18n.t("I read and accept the")}{" "}
                <a
                  className="text-light-blue underline hover:text-light-blue hover:underline"
                  href="#"
                  target="_blank"
                >
                  {i18n.t("Terms of Service")}
                </a>{" "}
                {i18n.t("and")}{" "}
                <a
                  className="text-light-blue underline hover:text-light-blue hover:underline"
                  href="#"
                  target="_blank"
                >
                  {i18n.t("Privacy Policy")}
                </a>
              </p>
            </div>
            <div className="flex justify-center space-x-2.5 pt-5">
              <Button
                fillVariant="flat"
                sizeVariant="lg"
                className="h-12 w-54 !text-sm !rounded-lg font-semibold !text-white !bg-transparent border border-light-blue"
                onClick={handleCloseConnectWalletModal}
              >
                {i18n.t("Cancel")}
              </Button>
              <Button
                sizeVariant="lg"
                // fillVariant="flat"
                // fillColor="blue"
                className="blue-button h-12 w-54 !text-sm !rounded-lg font-semibold !border-none !text-white"
                onClick={handleConnectWallet}
                disabled={walletActive == undefined || policyChecked == false}
              >
                {i18n.t("Confirm")}
              </Button>
            </div>
          </div>
        </BaseModal>
      )}
    </>
  )
}
interface OptionItemProps {
  label: string
  active: boolean
  width: string
  imageUrl: string
  onclick: () => void
  disabled: boolean
}

const OptionItem = ({ label, active, imageUrl, onclick }: OptionItemProps) => {
  return (
    <div
      className={clsx(
        active ? "bg-marine-blue !border-light-blue" : "bg-smalt",
        "rounded-[7px] pt-[14px] w-[220px] h-[150px] cursor-pointer"
      )}
      onClick={onclick}
    >
      <div className="mx-auto">
        <img src={imageUrl} alt="" className="w-[80px] h-[80px] mx-auto" />
        <p className="text-center mt-[11px] text-white text-[15px] font-semibold">{label}</p>
      </div>
    </div>
  )
}
