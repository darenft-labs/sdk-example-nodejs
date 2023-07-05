import { useCallback, useEffect } from "react"
import { useContractFunction } from "@usedapp/core"
import { useParams } from "react-router-dom"
import { ethers } from "ethers"

import { useLoadingOverlay } from "@/hooks/use-loading-overlay"
import { Button } from "@/shared/components"
import vaultAbi from "@/dapp/abis/vault.json"
import { utilsNotification } from "@/utils/utils-notification"

interface Props {
  onClose: () => void
  selectedVault: string
  refetch: () => void
}

export const LockButton = ({ selectedVault, onClose, refetch }: Props) => {
  const { contractAddress, tokenId } = useParams()

  const vault = new ethers.Contract(selectedVault, vaultAbi)
  const lockMethod = useContractFunction(vault, "lockNFT")
  const { showLoading } = useLoadingOverlay()

  const handleLockItem = useCallback(async () => {
    try {
      showLoading(true)
      await lockMethod.send(contractAddress, tokenId)
      showLoading(false)
    } catch (e) {
      console.error("lock error:", e)
    }
  }, [contractAddress, tokenId, lockMethod])

  useEffect(() => {
    if (lockMethod.state.status === "Exception" || lockMethod.state.status == "Fail") {
      utilsNotification.warning(lockMethod.state.errorMessage)
      showLoading(false)
      onClose()
    }
    if (lockMethod.state.status === "Success") {
      utilsNotification.success("Item has been locked in vault")
      refetch()
      showLoading(false)
      onClose()
    }
  }, [lockMethod.state.status, showLoading])

  return (
    <div>
      <Button
        fillColor="blue"
        fillVariant="flat"
        className="rounded w-full h-12 font-medium !text-base"
        onClick={handleLockItem}
        disabled={!!selectedVault ? false : true}
      >
        Play and Lock
      </Button>
    </div>
  )
}
