import { useEffect, useMemo, useState } from "react"
import { useEthers } from "@usedapp/core"
import { useParams } from "react-router-dom"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Form } from "react-final-form"

import api from "@/api"
import { Button, Select } from "@/shared/components"
import { useLoadingOverlay } from "@/hooks/use-loading-overlay"
import { utilsNotification } from "@/utils/utils-notification"
import { ProviderResponse } from "@/api/entity"
import { useFeeOf } from "@/hooks/use-fee"
import { FeeMethod, WITHDRAW } from "@/helpers/static-data"
import { utilsFee } from "@/utils/utils-fee"
import { UPDATE } from "@/helpers/static-data"
import FormInteraction from "./form-interaction"

interface Props {
  onClose?: () => void
  disableSelect?: boolean
  onHandle?: any
  modalType?: string
  dappList?: ProviderResponse[]
  modalTitle?: string
}

const ModalInteraction = ({
  onClose,
  disableSelect,
  onHandle,
  modalType,
  dappList,
  modalTitle,
}: Props) => {
  const [selectedGame, setSelectedGame] = useState(null)
  const { showLoading } = useLoadingOverlay()
  const { tokenId, contractAddress } = useParams()
  const { account, chainId } = useEthers()

  const { data: detailData } = useQuery(
    ["listed", contractAddress, tokenId, chainId],
    () =>
      api.GameApi.getNftDetail({
        contract_address: contractAddress,
        token_id: tokenId,
        chain_id: chainId,
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

  const currentGame = allListProvider?.find(
    (item) => item?.vault?.toLowerCase() === detailData?.temporaryAddress?.toLowerCase()
  )
  const currentProviderAddresss = currentGame?.providerAddress
  const selectedVault = selectedGame ?? currentProviderAddresss

  // Get metadata
  const { data: metadataRespone } = useQuery(
    ["list_metadata", contractAddress, tokenId, chainId, selectedVault],
    () =>
      api.GameApi.getMetaData({
        contract_address: contractAddress,
        token_id: tokenId,
        chain_id: chainId,
        provider_address: selectedVault,
      }),
    { enabled: !!selectedVault && !!contractAddress && !!tokenId }
  )

  const dappVaultList = allListProvider?.filter((item) => item?.vault !== "")
  const optionProvider = !!dappList ? dappList : dappVaultList
  const currentProvider = optionProvider?.find((item) => item?.providerAddress === selectedVault)
  const currentOption =
    modalType === UPDATE
      ? undefined
      : [
          {
            label: currentProvider?.name,
            value: currentProvider?.vault,
          },
        ]
  const OPTION_DATA = optionProvider?.map((item, index) => {
    return {
      label: item?.name,
      value: item?.providerAddress,
    }
  })

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
  }, [selectedVault])

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
          modalType === WITHDRAW
            ? await onHandle.send(
                contractAddress,
                tokenId,
                account,
                res?.dataKeys,
                res?.dataValues,
                res?.nonce,
                res?.provider,
                res?.providerSignature,
                res?.rootSignature
              )
            : await onHandle.send(
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
      providerAddress: selectedVault,
      nftData: value,
    })
  }

  useEffect(() => {
    if (onHandle.state.status === "Exception" || onHandle.state.status == "Fail") {
      utilsNotification.warning(onHandle.state.errorMessage)
      showLoading(false)
      onClose()
    }

    if (onHandle.state.status === "Success") {
      utilsNotification.success("Successfully!")
      showLoading(false)
      onClose()
    }
  }, [onHandle.state.status, showLoading])

  return (
    <div className="min-h-[280px] pl-[22px]">
      <div className="uppercase text-[30px] font-semibold text-dark-strong-blue text-center pt-[6px] mb-8">
        {modalTitle}
      </div>
      {modalType === WITHDRAW && (
        <>
          <div className="text-dark-strong-blue mb-1 text-xs">
            Your items will be updated with the latest in-game datas when quitting the game.
          </div>
          <div className="flex items-center text-dark-strong-blue mb-2 text-xs">
            <span>Receiver address: </span>
            <div className="px-2 ml-1 bg-light-gray">{account}</div>
          </div>
        </>
      )}
      <div className="text-dark-strong-blue font-medium capitalize mb-4">Game</div>
      <div className="pr-[22px]">
        <Select
          optionsData={!!currentOption ? currentOption : OPTION_DATA}
          disabled={disableSelect}
          value={currentOption ?? undefined}
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
      {selectedVault && (
        <>
          {metadata && Object?.keys(!!schema ? schema : {})?.length !== 0 ? (
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
                              <FormInteraction item={item} type={schema?.[item]?.type} />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mr-[22px]">
                        <Button
                          disabled={selectedVault ? false : true}
                          type="submit"
                          uiStyleVariant="blue"
                          className="!w-full !rounded-default !border-0 outline-none !text-black !py-[14px] mt-7"
                        >
                          <span className="text-white font-medium">
                            {modalType === WITHDRAW ? "Update & quit" : "Update"}
                          </span>
                        </Button>
                      </div>
                    </form>
                  )
                }}
              />
            </div>
          ) : (
            <div className="text-center mt-10 pr-[22px] text-lg font-medium">
              Metadatas not found
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ModalInteraction
