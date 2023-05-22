import React from "react"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import api from "@/api"
import { useEthers } from "@usedapp/core"

interface Props {
  providerAddress: string
  gameName: string
}

function CardMetadata({ providerAddress, gameName }: Props) {
  const { tokenId, contractAddress } = useParams()
  const { chainId } = useEthers()

  const { data } = useQuery(
    ["list_metadata", contractAddress, tokenId, chainId, providerAddress],
    () =>
      api.GameApi.getMetaData({
        contract_address: contractAddress,
        token_id: tokenId,
        chain_id: chainId,
        provider_address: providerAddress,
      }),
    { enabled: !!providerAddress && !!contractAddress && !!tokenId }
  )

  const keyProp = Object?.keys(data || [])

  return (
    <>
      {keyProp.length !== 0 && (
        <div className="rounded shadow-default py-[19px] pl-[28px] border border-brown min-h-[300px] ">
          <div className="text-dark-strong-blue font-bold md:text-3xl text-xl mb-8">
            {data?.["name"] ?? gameName}
          </div>
          <div className="flex flex-col gap-4 text-navy-100 max-h-48 overflow-scroll">
            {keyProp?.map((item, index) => (
              <React.Fragment key={index}>
                <div className="grid grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4" key={index}>
                  <div className="font-semibold capitalize">{item}</div>
                  <div>{data?.[item]?.toString()}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default CardMetadata
