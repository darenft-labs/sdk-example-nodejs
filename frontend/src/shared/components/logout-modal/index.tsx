import { useEthers } from "@usedapp/core"
import { Button } from "@/shared/components"
// import confirmLogo from "@/assets/images/confirm-modal.svg"

interface Props {
  onCloseModal?: () => void
  onLogout: () => void
}

const LogoutModal = ({ onCloseModal, onLogout }: Props) => {
  const { account } = useEthers()

  return (
    <div className="relative">
      {/* <div className="absolute translate-y-[-64px] translate-x-[-50%] left-1/2">
        <img src={""} alt="confirm" />
      </div> */}
      <div className="text-center mb-11 text-3xl font-semibold leading-10">
        <div className="text-white font-[300]">Are you sure</div>
        <div className="text-white font-[300]">to disconnect from the wallet?</div>
      </div>
      <div className="text-center">
        <span className="text-white font-semibold text-sm leading-[22px]">Wallet address:</span>
        <span className="pl-2 text-light-yellow">{account}</span>
      </div>
      <div className="mt-[50px] mb-[14px] flex items-center justify-center">
        <Button
          onClick={onCloseModal}
          className="!outline-none text-[15px] !mr-2 !w-[220px] rounded-lg !h-12 !bg-transparent text-white !border !border-light-blue font-semibold"
        >
          <span>Cancel</span>
        </Button>
        <Button
          onClick={onLogout}
          className={`!outline-none text-[15px] !border-none !w-[220px] !h-12 rounded-lg !blue-button text-base !text-white font-semibold hover:brightness-105`}
        >
          <span>Disconnect</span>
        </Button>
      </div>
    </div>
  )
}

export default LogoutModal
