import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setModalOpened } from "@/redux/modal-connect-wallet"
import { RootState } from "@/redux/store"
import { formattingUtils } from "@/utils/utils-formatting"
import { useEthers } from "@usedapp/core"
import { CustomIcon } from "@/shared/components/custom-icon"
import { NotiComponent } from "@/shared/components/header/noti-component"
import { ModalConnectWallet } from "../modal-connect-wallet"
import logo from "@/assets/icons/logo.svg"
import symbol from "@/assets/icons/symbol.svg"
import { BasePopover } from "../popover"
import { BaseModal } from "../base-modal"
import LogoutModal from "../logout-modal"
import { Button } from "../button"

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [isMenu, setIsMenu] = useState(false)
  const { account, deactivate } = useEthers()

  const { accessToken } = useSelector((state: RootState) => state.auth)

  function handleShowConnectWalletModal() {
    dispatch(setModalOpened(true))
  }

  const handleClickChange = (visible: boolean) => {
    setIsMenu(visible)
  }

  const handleOpen = () => {
    setIsMenu(false)
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleLogout = () => {
    handleClose()
    deactivate()
  }

  const DropdownHeader = () => {
    return (
      <div className="w-[287px] pb-3 bg-white rounded">
        <div className="h-[60px] px-5 py-3 bg-light-gray">
          <div className="text-dark-strong-blue font-semibold text-[15px] leading-5 opacity-[87] ">
            {formattingUtils.centerEllipsizeString(account, 3, 5)}
          </div>
          <div className="text-light-orange-100 text-[12px] leading-[18px]">
            <span>Dare ID: </span>
          </div>
        </div>

        <div className="px-2 bg-white group cursor-pointer" onClick={handleOpen}>
          <div className="group-hover:bg-light-gray pt-5 pb-[14px] rounded-lg ">
            <div className="px-5 flex items-center capitalize tracking-[0.01em] text-dark-strong-blue text-xs font-medium">
              <CustomIcon iconName="logout" />
              <div className="ml-[6px]">Log out</div>
            </div>
          </div>
        </div>
        {isOpen && (
          <BaseModal className="!w-[569px] !h-[400px]" title="" visible={isOpen}>
            <LogoutModal onCloseModal={handleClose} onLogout={handleLogout} />
          </BaseModal>
        )}
      </div>
    )
  }

  return (
    <div className="h-20 bg-white px-4">
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center">
          <a href={"/"} className="flex items-center cursor-pointer h-[80px]">
            <img src={logo} alt="logo" className="w-[60px] h-[50px]" />
            <div className="ml-2 text-lg">
              <span className="text-lg leading-6 font-semibold text-dark-strong-blue">
                DApp Demo
              </span>
            </div>
          </a>
        </div>

        <div className="flex items-center">
          {account ? (
            <div className="w-full relative flex">
              <BasePopover
                content={
                  <>
                    <DropdownHeader />
                  </>
                }
                placement="bottomRight"
                overlayClassName="no-arrow !p-0"
                overlayInnerStyle={{
                  backgroundColor: "#121126",
                  padding: "0px",
                  transform: "translateY(4px)",
                }}
                visible={isMenu}
                onVisibleChange={handleClickChange}
                trigger="click"
              >
                <Button className="cursor-pointer ml-[10px] h-12 px-4 py-2 flex items-center justify-between border-solid border-dark-strong-blue border-[1px] rounded-[12px] !bg-white">
                  <div className="flex items-center">
                    <CustomIcon iconName="chain-icon-wallet" className="w-8 h-8" />
                    <span className="px-[10px] lg:text-md text-xs font-medium text-dark-strong-blue">
                      {formattingUtils.centerEllipsizeString(account, 3, 7)}
                    </span>
                  </div>
                  <CustomIcon iconName="chevron-down-polo-blue" />
                </Button>
              </BasePopover>
            </div>
          ) : (
            <div
              className="flex items-center bg-light-orange h-10 w-[180px] justify-center rounded cursor-pointer hover:brightness-95"
              onClick={handleShowConnectWalletModal}
            >
              <CustomIcon iconName="wallet-connect" />
              <span className="pl-[10px] text-white font-medium text-xs leading-6">
                Connect wallet
              </span>
            </div>
          )}
        </div>
      </div>
      <ModalConnectWallet />
    </div>
  )
}

export default Header
