import { useState } from "react"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { useCall, useEthers } from "@usedapp/core"
import { Interface } from "@ethersproject/abi"

import { useContract } from "@/dapp/use-contract"
import { Button, Select } from "@/shared/components"
import { ProviderResponse } from "@/api/entity"
import { NFTContractType } from "@/helpers/static-data"
import { ApproveButton, LockButton } from "../button-interactions"
import api from "@/api"

interface Props {
  onClose: () => void
}

const approveforAllabi = new Interface([
  "function isApprovedForAll(address owner, address operator) public view returns(bool)",
])

export const SelectGameModal = ({ onClose }: Props) => {
  const [selectedVault, setselectedVault] = useState("")
  const { tokenId, contractAddress } = useParams()
  const { account, chainId } = useEthers()

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

  const approveContract = useContract(contractAddress, approveforAllabi)

  const isApproved = useCall(
    !!selectedVault &&
      account && {
        contract: approveContract,
        method: "isApprovedForAll",
        args: [account, selectedVault],
      }
  )

  // TODO: Remove comment
  // Get list provider by contractAddress + tokenId
  const { data: derivativeProvider, isLoading } = useQuery(
    ["list_provider", contractAddress, tokenId, chainId],
    () =>
      api.GameApi.getNftProvider({
        contract_address: contractAddress,
        token_id: tokenId,
        chain_id: chainId,
        limit: 10,
        offset: 0,
      }),
    { enabled: !!contractAddress && !!tokenId }
  )

  // Get list provider
  const { data: allListProvider } = useQuery<ProviderResponse[]>(
    ["nft_schema", account],
    () => api.GameApi.getProviders(),
    {
      enabled: !!account,
    }
  )

  const dappVaultList = allListProvider?.filter((item) => item?.vault !== "")

  const filteredProvider = dappVaultList?.filter(
    (item) => item?.providerAddress === derivativeProvider?.items?.[0]?.providerAddress
  )

  const optionProvider =
    detailData?.type === NFTContractType?.Derivative ? filteredProvider : dappVaultList

  const OPTION_DATA = optionProvider?.map((item, index) => {
    return {
      label: item?.name,
      value: item?.vault,
    }
  })

  // Checking

  return (
    <div className="pl-[22px]">
      <div className="uppercase text-[30px] font-semibold text-dark-strong-blue text-center pt-[6px] mb-8">
        Select game to play
      </div>
      <div className="pr-[22px]">
        <Select
          optionsData={OPTION_DATA}
          placeholder="Select game"
          className="!rounded !bg-white !text-xs"
          labelInValue={true}
          dropdownStyle={{
            maxHeight: "96px",
            overflow: "scroll",
          }}
          onChange={(e) => {
            setselectedVault(e?.value)
          }}
        />
      </div>
      <div className="mt-3 text-dark-strong-blue">
        Your items will be locked to Game Vault while playing the game.
      </div>
      <div className="text-dark-strong-blue"> Are you sure to continue?</div>
      <div className="grid grid-cols-2 gap-2 items-center mr-[22px] mt-5">
        <Button
          fillColor="blue"
          fillVariant="outlined"
          className="rounded w-full h-12 font-medium !text-base text-blue-100"
          onClick={onClose}
        >
          Cancel
        </Button>
        {isApproved?.value[0] ? (
          <LockButton selectedVault={selectedVault} onClose={onClose} refetch={refetch} />
        ) : (
          <ApproveButton selectedVault={selectedVault} />
        )}
      </div>
    </div>
  )
}
