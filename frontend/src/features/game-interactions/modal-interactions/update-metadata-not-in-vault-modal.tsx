import { useContractFunction, useEthers } from "@usedapp/core"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { ethers } from "ethers"

import api from "@/api"
import { ProviderResponse } from "@/api/entity"
import setData from "@/dapp/abis/updateMetadata.json"
import ModalInteraction from "./modal-interaction"
import { UPDATE } from "@/helpers/static-data"
interface Props {
  onClose: () => void
}

export const UpdateMetadataNotinVaultModal = ({ onClose }: Props) => {
  const { contractAddress } = useParams()
  const { account } = useEthers()
  const contract = new ethers.Contract(contractAddress ?? "", setData)
  const requestUpdatemetadata = useContractFunction(contract, "setData")
  const { data: allListProvider } = useQuery<ProviderResponse[]>(
    ["nft_schema", account],
    () => api.GameApi.getProviders(),
    {
      enabled: !!account,
    }
  )
  const communityProvider = allListProvider?.filter((item) => item?.vault === "")

  return (
    <ModalInteraction
      onHandle={requestUpdatemetadata}
      onClose={onClose}
      dappList={communityProvider}
      modalTitle="Update metadata"
      modalType={UPDATE}
    />
  )
}
