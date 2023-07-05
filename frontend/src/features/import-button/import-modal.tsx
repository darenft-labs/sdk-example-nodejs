import api from "@/api"
import { useNftData } from "@/hooks/use-nfts"
import { RootState } from "@/redux/store"
import { Button, Input } from "@/shared/components"
import { utilsNotification } from "@/utils/utils-notification"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useEthers } from "@usedapp/core"
import { Field, Form } from "react-final-form"
import { useSelector } from "react-redux"
interface Props {
  onClose: () => void
}

const ModalImport = ({ onClose }: Props) => {
  const { chainId, account } = useEthers()

  const { setData } = useNftData()
  const nftData = useSelector((state: RootState) => state.nftData.list)
  const currentWallet = useSelector((state: RootState) => state.nftData.walletAddress)

  const listed = useMutation(
    (data: { contract_address: string; token_id: string; chain_id: number }) =>
      api.GameApi.getNftDetail({
        ...data,
      }),
    {
      onError: () => {
        utilsNotification.error("NFT not found!")
      },
      onSuccess: (data) => {
        if (data?.ownerAddress?.toLowerCase() === currentWallet?.toLowerCase()) {
          const existed = nftData?.some((item) => {
            if (item.contractAddress === data?.nftContract?.contractAddress) {
              return item.tokenId === data?.tokenId
            }
          })

          if (!existed) {
            const payload = {
              contractAddress: data?.nftContractAddress,
              tokenId: data?.tokenId,
              version: data?.nftContract?.contractVersion,
              image: data?.imageUrl,
              contractName: data?.nftContract?.name,
              chainId: data?.chainId,
              nftName: data?.name,
            }
            setData(payload)
            utilsNotification.success("Import Successfully!")
            onClose()
          } else {
            utilsNotification.error("NFT existed!")
          }
        } else {
          utilsNotification.error("NFT not found!")
        }
      },
    }
  )

  const onSubmit = (value: any) => {
    listed.mutate({
      contract_address: value?.collectionAddress,
      token_id: value?.tokenId,
      chain_id: chainId,
    })
  }

  return (
    <div className="px-[6px] pb-9">
      <div className="uppercase text-[30px] font-semibold text-dark-strong-blue text-center pt-[6px] mb-10">
        Import NFT
      </div>
      <Form
        onSubmit={onSubmit}
        // validate={validate}
        initialValues={{
          collectionAddress: "",
          tokenId: "",
        }}
        render={({ handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <label className="text-dark-strong-blue font-medium capitalize">
              Collection Address
            </label>
            <div className="mt-[10px] for-sale">
              <Field
                name="collectionAddress"
                render={({ input }) => {
                  return (
                    <Input
                      // onChange={(e) => setContractAddress(e.target.value)}
                      placeholder="Enter collection address (on BSC test net only)"
                      className="bg-light-gray !h-14 !tracking-[2%] !px-[15px] !text-[13px] !leading-[18px] !text-black placeholder:text-light-gray-100 placeholder:text-[12px]"
                      {...input}
                    />
                  )
                }}
              />
            </div>
            <div className="h-4"></div>
            <label className="text-dark-strong-blue font-medium capitalize">Token ID</label>
            <div className="mt-[10px] for-sale">
              <Field
                name="tokenId"
                render={({ input }) => {
                  return (
                    <Input
                      // onChange={input.onChange}
                      placeholder="Enter collection address (on BSC test net only)"
                      className="bg-light-gray !h-14 !tracking-[2%] !px-[15px] !text-[13px] !leading-[18px] !text-black placeholder:text-light-gray-100 placeholder:text-[12px]"
                      {...input}
                    />
                  )
                }}
              />
            </div>

            <Button
              type="submit"
              loading={listed?.isLoading}
              disabled={values?.collectionAddress && values?.tokenId ? false : true}
              uiStyleVariant="blue"
              className="!w-full !rounded-default !border-0 outline-none !text-black !py-[14px] mt-7"
            >
              <span className="text-white font-medium">Import</span>
            </Button>
          </form>
        )}
      />
    </div>
  )
}

export default ModalImport
