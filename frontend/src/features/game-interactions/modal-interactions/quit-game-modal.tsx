import { useContractFunction, useEthers } from "@usedapp/core"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { ethers } from "ethers"

import api from "@/api"
import vaultAbi from "@/dapp/abis/vault.json"
import ModalInteraction from "./modal-interaction"
import { WITHDRAW } from "@/helpers/static-data"
interface Props {
  onClose: () => void
}

export const QuitGameModal = ({ onClose }: Props) => {
  const { contractAddress, tokenId } = useParams()
  const { chainId } = useEthers()

  const { data: detailData, refetch } = useQuery(
    ["listed", contractAddress, tokenId, chainId],
    () =>
      api.GameApi.getNftDetail({
        contract_address: contractAddress,
        token_id: tokenId,
        chain_id: chainId,
      }),
    { enabled: !!contractAddress && !!tokenId }
  )

  const vault = new ethers.Contract(detailData?.temporaryAddress, vaultAbi)
  const unLockMethod = useContractFunction(vault, "unlockNFT")

  return (
    <ModalInteraction
      onHandle={unLockMethod}
      onClose={onClose}
      modalType={WITHDRAW}
      modalTitle="Quit Game"
      disableSelect
    />
  )
}
