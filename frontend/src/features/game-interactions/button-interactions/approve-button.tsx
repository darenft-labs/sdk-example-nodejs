import { useCallback, useEffect } from "react"
import { useContractFunction } from "@usedapp/core"
import { useParams } from "react-router-dom"
import { Interface } from "@ethersproject/abi"

import { useContract } from "@/dapp/use-contract"
import { Button } from "@/shared/components"
import { useLoadingOverlay } from "@/hooks/use-loading-overlay"
import { utilsNotification } from "@/utils/utils-notification"

interface Props {
  selectedVault: string
}

export const ApproveButton = ({ selectedVault }: Props) => {
  const { contractAddress } = useParams()

  const setApproveAbi = new Interface([
    "function setApprovalForAll(address operator, bool _approved) external",
  ])

  const { showLoading } = useLoadingOverlay()
  const approveContract = useContract(contractAddress, setApproveAbi)
  const approveMethod = useContractFunction(approveContract, "setApprovalForAll")

  const handleClick = useCallback(async () => {
    try {
      showLoading(true)
      await approveMethod.send(selectedVault, true)
      showLoading(false)
    } catch {}
  }, [selectedVault, approveMethod])

  useEffect(() => {
    if (approveMethod.state.status === "Exception" || approveMethod.state.status == "Fail") {
      utilsNotification.warning(approveMethod.state.errorMessage)
      showLoading(false)
    }

    if (approveMethod.state.status === "Success") {
      utilsNotification.success("Approve successfully")
      showLoading(false)
    }
  }, [approveMethod.state.status, showLoading])

  return (
    <div>
      <Button
        fillColor="blue"
        fillVariant="flat"
        className="rounded w-full h-12 font-medium !text-base"
        onClick={handleClick}
        disabled={!!selectedVault ? false : true}
      >
        Approve
      </Button>
    </div>
  )
}
