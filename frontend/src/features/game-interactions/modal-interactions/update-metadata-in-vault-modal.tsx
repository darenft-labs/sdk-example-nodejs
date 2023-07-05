import { useContractFunction } from "@usedapp/core"
import { useParams } from "react-router-dom"
import { ethers } from "ethers"

import setData from "@/dapp/abis/updateMetadata.json"
import ModalInteraction from "./modal-interaction"
import { UPDATE_IN_VAULT } from "@/helpers/static-data"
interface Props {
  onClose: () => void
}

export const UpdateMetadataModal = ({ onClose }: Props) => {
  const { contractAddress } = useParams()
  const contract = new ethers.Contract(contractAddress ?? "", setData)
  const requestUpdatemetadata = useContractFunction(contract, "setData")

  return (
    <ModalInteraction
      onHandle={requestUpdatemetadata}
      onClose={onClose}
      modalType={UPDATE_IN_VAULT}
      modalTitle="Update metadata"
      disableSelect
    />
  )
}
