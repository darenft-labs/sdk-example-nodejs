import { Link, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Button, CustomIcon } from "@/shared/components"
import { utilsNotification } from "@/utils/utils-notification"
import { formattingUtils } from "@/utils/utils-formatting"
import api from "@/api"
import ButtonUpdateMetadata from "./button-update-metadata"
import { CHAINS_ICON, MigrateState, NFTContractType } from "@/helpers/static-data"
import ButtonMigrate from "./button-migrate"
import MigratedInfor from "./migrated-infor"
import { useEthers } from "@usedapp/core"

function BasicInfo() {
  const { tokenId, contractAddress } = useParams()
  const { chainId } = useEthers()

  const { data, isLoading } = useQuery(
    ["listed", contractAddress, tokenId, chainId],
    () =>
      api.GameApi.getNftDetail({
        contract_address: contractAddress,
        token_id: tokenId,
        chain_id: chainId,
      }),
    { enabled: !!contractAddress && !!tokenId }
  )

  return (
    <div className="flex flex-col mx-auto max-w-[1410px] pt-[25px] pb-[60px] px-[60px] 2xl:px-0">
      <div className="relative h-8">
        <Link to="/" className="absolute left-0 max-w-[20px] lg:max-w-[100px]">
          <div className="text-navy-100 hover:text-navy-100 inline-flex gap-[10px] items-center">
            <CustomIcon iconName="go-back" />
            <span className="hidden lg:block">Go back</span>
          </div>
        </Link>
        <div className="text-center block lg:hidden text-dark-strong-blue font-semibold text-base">
          NFT detail
        </div>
      </div>
      <div className="lg:flex gap-x-2 xl:gap-x-8 mt-[25px]">
        <div className="relative lg:w-[420px] xl:w-[570px] flex justify-center items-center md:block lg:pb-0 pb-5">
          {data?.imageUrl ? (
            <img
              src={data?.imageUrl}
              alt="nft-image"
              className="w-full 2xl:h-[570px] h-full rounded mx-auto"
              loading="lazy"
            />
          ) : (
            <div className="w-full 2xl:h-[570px] h-[530px] lg:h-full bg-strong-dark relative rounded">
              <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col items-center justify-center">
                <CustomIcon iconName="empty-image" />
                <div className="uppercase mt-3 tracking-[0.02rem] text-tiny text-center font-medium text-white">
                  No image available
                </div>
              </div>
            </div>
          )}
          {/* TODO: Update later */}
          {/* {data?.nftContract?.contractVersion !== MigrateState?.NORMAL && (
            <div className="absolute left-[-14px] top-5">
              <MigrateTag migration={data?.migration} />
            </div>
          )} */}
        </div>

        <div className="bg-white flex-1 rounded px-5 lg:px-6 xl:px-[60px] py-[38px]">
          <div className="flex">
            <div className="flex gap-[6px] flex-1 items-center">
              <img src={CHAINS_ICON?.[data?.chainId]} className="w-5 h-5 rounded-full" />
              <span className="text-brown-100 leading-[21px]">{data?.nftContract?.name}</span>
            </div>
          </div>

          {/* NFT name */}
          <div className="text-[28px] font-semibold uppercase text-navy-100 leading-[42px] pt-[9px]">
            {data?.name ?? "N/A"}
          </div>
          {/* Description */}
          <div className="text-navy-100 leading-[26px] pb-6 pr-[20px]">{data?.description}</div>
          <>
            <div className="flex flex-col sm:gap-[18px] gap-3 text-dark-strong-blue">
              {/* Token ID */}
              <div className="flex leading-[21px]">
                <span className="sm:w-[85px] w-[100px] font-semibold text-navy-100">Token ID:</span>
                <span className="font-light">{data?.tokenId}</span>
              </div>
              {/* Token URI */}
              <div className="flex leading-[21px]">
                <span className="sm:w-[85px] w-[100px] font-semibold text-navy-100">
                  Token URI:
                </span>
                {/* TODO: Update later */}
                {/* <a href={data?.nft?.tokenUri} className="italic text-light-blue">
                  {data?.nft?.tokenUri}
                </a> */}
              </div>
              {/* Creator */}
              <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-0 gap-y-3">
                <div className="flex leading-[21px] ">
                  <span className="sm:w-[85px] w-[100px] font-semibold text-navy-100">
                    Creator:
                  </span>
                  <span className="font-light">
                    {formattingUtils.centerEllipsizeString(data?.nftContract?.creatorAddress, 7, 4)}{" "}
                  </span>
                  <CustomIcon
                    iconName="copy"
                    className="ml-[20px] cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(data?.nftContract?.creatorAddress)
                      utilsNotification.success("Copied to clipboard")
                    }}
                  />
                </div>
                <div className="flex leading-[21px]">
                  <span className="w-[100px] font-semibold text-navy-100">Derivative:</span>
                  <span className="font-light">
                    {NFTContractType?.Derivative === data?.type ? "Yes" : "No"}
                  </span>
                </div>
              </div>
              {/* OWner */}
              <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-0 gap-y-3">
                <div className="flex leading-[21px]">
                  <span className="sm:w-[85px] w-[100px] font-semibold text-navy-100">Owner:</span>
                  <span className="font-light">
                    {formattingUtils.centerEllipsizeString(data?.nftContract?.ownerAddress, 7, 4)}{" "}
                  </span>
                  <CustomIcon
                    iconName="copy"
                    className="ml-[20px] cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(data?.nftContract?.ownerAddress)
                      utilsNotification.success("Copied to clipboard")
                    }}
                  />
                </div>
                <div className="flex leading-[21px]">
                  <span className="w-[100px] font-semibold text-navy-100">Longevity:</span>
                  {/*TODO: Update later */}
                  <span className="font-light">N/A</span>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-0 gap-y-3">
                <div className="flex leading-[21px]">
                  <span className="sm:w-[85px] w-[100px] font-semibold text-navy-100">
                    Royalty:
                  </span>
                  <span className="font-light">
                    {" "}
                    {data?.royalties ? `${Math.round(data?.royalties * 100) / 100}%` : "-"}
                  </span>
                </div>
                <div className="flex leading-[21px]">
                  <span className="w-[100px] font-semibold text-navy-100">Expiry date:</span>
                  {/*TODO: Update later */}
                  <span className="font-light">N/A</span>
                </div>
              </div>
            </div>
          </>

          <div className="h-[1px] bg-grey-200 w-full mt-[24px] mb-[38px]"></div>
          <ButtonUpdateMetadata />
          {/* TODO: Update later */}
          {/* {data?.nftContract?.contractVersion === MigrateState?.NORMAL && <ButtonUpdateMetadata />}
          {data?.nftContract?.contractVersion === MigrateState?.MIGRATED && (
            <MigratedInfor
              collectionName={data?.collection?.name}
              nftId={data?.nftId}
              nftName={data?.nft?.name}
            />
          )}
          {data?.nftContract?.contractVersion === MigrateState?.NOTMIGRATE && <ButtonMigrate />} */}
        </div>
      </div>
    </div>
  )
}

export default BasicInfo
