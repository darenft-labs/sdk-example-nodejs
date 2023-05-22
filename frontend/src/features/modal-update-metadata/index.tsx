import { Button, Input, Select } from "@/shared/components"
import React, { useEffect, useMemo, useState } from "react"
import { Field, Form } from "react-final-form"
import { useParams } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import api from "@/api"
import { ethers } from "ethers"

import setData from "@/dapp/abis/updateMetadata.json"
import { useContractFunction, useEthers } from "@usedapp/core"
import { useLoadingOverlay } from "@/hooks/use-loading-overlay"
import { utilsNotification } from "@/utils/utils-notification"
import { ProviderResponse } from "@/api/entity"
import { useFeeOf } from "@/hooks/use-fee"
import { FeeMethod } from "@/helpers/static-data"
import { utilsFee } from "@/utils/utils-fee"
interface Props {
  onClose: () => void
}

const ModalUpdateMetadata = ({ onClose }: Props) => {
  const [selectedGame, setSelectedGame] = useState(null)
  const { showLoading } = useLoadingOverlay()
  const { tokenId, contractAddress } = useParams()
  const { account, chainId } = useEthers()

  // TODO: Remove comment
  // Get list provider by contractAddress + tokenId
  // const { data, isLoading } = useQuery(
  //   ["list_provider", contractAddress, tokenId, chainId],
  //   () =>
  //     api.GameApi.getNftProvider({
  //       contract_address: contractAddress,
  //       token_id: tokenId,
  //       chain_id: chainId,
  //       limit: 10,
  //       offset: 0,
  //     }),
  //   { enabled: !!contractAddress && !!tokenId }
  // )

  // Get list provider
  const { data } = useQuery<ProviderResponse[]>(
    ["nft_schema", account],
    () => api.GameApi.getProviders(),
    {
      enabled: !!account,
    }
  )

  // Get metadata
  const { data: metadataRespone } = useQuery(
    ["list_metadata", contractAddress, tokenId, chainId, selectedGame],
    () =>
      api.GameApi.getMetaData({
        contract_address: contractAddress,
        token_id: tokenId,
        chain_id: chainId,
        provider_address: selectedGame,
      }),
    { enabled: !!selectedGame && !!contractAddress && !!tokenId }
  )

  // TODO: Remove comment
  // const { data: nftSchema } = useQuery(
  //   ["nft_schema", contractAddress, tokenId, chainId, selectedGame],
  //   () =>
  //     api.GameApi.getNftSchemas({
  //       provider_address: selectedGame,
  //     }),
  //   { enabled: !!selectedGame && !!contractAddress && !!tokenId }
  // )

  const contract = new ethers.Contract(contractAddress ?? "", setData)
  const requestUpdatemetadata = useContractFunction(contract, "setData")

  //TODO: Remove
  const OPTION_DATA = data?.map((item, index) => {
    return {
      label: item?.name,
      value: item?.providerAddress,
    }
  })

  const BOOLEAN_OPTION = [
    { label: "True", value: true },
    { label: "False", value: false },
  ]

  const currentProvider = data?.find((item) => item?.providerAddress === selectedGame)
  const schema = currentProvider?.schema?.jsonSchema?.properties
  const keyProp = Object?.keys(schema || [])

  const defaultMetadata = keyProp?.reduce((prev, cur) => {
    return {
      ...prev,
      [cur]: "",
    }
  }, {})

  // Checking
  const metadata = useMemo(() => {
    return metadataRespone && Object.keys(metadataRespone)?.length !== 0
      ? metadataRespone
      : defaultMetadata
  }, [selectedGame])

  const rs = useFeeOf({ type: FeeMethod?.UPDATE_METADATA })
  const fee = rs && utilsFee?.methodFee(rs)

  const handleUpdateMetadata = useMutation(
    (data: {
      tokenId: string
      nftContractAddress: string
      providerAddress: string
      nftData: any
    }) => {
      return api.GameApi.updateMetadata({ ...data })
    },
    {
      onSuccess: async (res: any) => {
        try {
          showLoading(true)
          await requestUpdatemetadata.send(
            res?.tokenId,
            res?.dataKeys,
            res?.dataValues,
            res?.nonce,
            res?.provider,
            res?.providerSignature,
            res?.rootSignature,
            {
              value: fee,
            }
          )
        } catch {}
      },
      onError: (e) => {
        showLoading(false)
        utilsNotification.warning("Error")
      },
    }
  )

  const onSubmit = (value: any) => {
    showLoading(true)
    handleUpdateMetadata.mutate({
      tokenId: tokenId,
      nftContractAddress: contractAddress,
      providerAddress: selectedGame,
      nftData: value,
    })
  }

  useEffect(() => {
    if (
      requestUpdatemetadata.state.status === "Exception" ||
      requestUpdatemetadata.state.status == "Fail"
    ) {
      utilsNotification.warning(requestUpdatemetadata.state.errorMessage)
      showLoading(false)
      onClose()
    }

    if (requestUpdatemetadata.state.status === "Success") {
      utilsNotification.success("Update successfully!")
      showLoading(false)
      onClose()
    }
  }, [requestUpdatemetadata.state.status, showLoading])

  return (
    <div className="min-h-[280px] pl-[22px]">
      <div className="uppercase text-[30px] font-semibold text-dark-strong-blue text-center pt-[6px] mb-8">
        Update Metadata
      </div>
      <div className="text-dark-strong-blue font-medium capitalize mb-4">Game</div>
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
            setSelectedGame(e?.value)
          }}
        />
      </div>
      {selectedGame && (
        <>
          {metadata &&
          Object?.keys(currentProvider?.schema?.jsonSchema?.properties)?.length !== 0 ? (
            <div className="mt-3">
              <div className="h-[1px] w-full my-5 pr-[22px]">
                <div className="bg-dark-strong-blue w-full h-full"></div>
              </div>
              <Form
                onSubmit={onSubmit}
                initialValues={metadata}
                render={({ handleSubmit }) => {
                  return (
                    <form onSubmit={handleSubmit}>
                      <div className="max-h-[400px] overflow-y-scroll">
                        <div className="pr-4">
                          {keyProp?.map((item, index) => (
                            <div className="pb-4" key={index}>
                              <label className="text-dark-strong-blue font-medium capitalize">
                                {item} (
                                {currentProvider?.schema?.jsonSchema?.properties?.[item]?.type})
                              </label>
                              <div className="mt-[10px] for-sale">
                                <Field name={item}>
                                  {({ input }) => {
                                    return (
                                      <>
                                        {currentProvider?.schema?.jsonSchema?.properties?.[item]
                                          ?.type !== "boolean" ? (
                                          <Input
                                            placeholder="Enter value"
                                            className="bg-light-gray !h-14 !tracking-[2%] !px-[15px] !text-[13px] !leading-[18px] !text-grey-300 placeholder:text-light-gray-100 placeholder:text-[12px]"
                                            {...input}
                                          />
                                        ) : (
                                          <Select
                                            optionsData={BOOLEAN_OPTION}
                                            placeholder="Select value"
                                            className="!rounded !bg-white !text-xs"
                                            labelInValue={true}
                                            onChange={(e) => {
                                              input.onChange(e?.value)
                                            }}
                                          />
                                        )}
                                      </>
                                    )
                                  }}
                                </Field>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mr-[22px]">
                        <Button
                          disabled={selectedGame ? false : true}
                          type="submit"
                          uiStyleVariant="blue"
                          className="!w-full !rounded-default !border-0 outline-none !text-black !py-[14px] mt-7"
                        >
                          <span className="text-white font-medium">Update</span>
                        </Button>
                      </div>
                    </form>
                  )
                }}
              />
            </div>
          ) : (
            <div className="text-center mt-10 pr-[22px] text-lg font-medium">
              Not found any metadata
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ModalUpdateMetadata
