import { Link } from "react-router-dom"

import { Button, CustomIcon } from "@/shared/components"
import { CHAINS_ICON, MigrateState } from "@/helpers/static-data"

type Props = {
  data: LocalNftType
}

const Item = ({ data }: Props) => {
  return (
    <div className="relative bg-white w-full my-0 mx-auto rounded px-[9px] py-[10px] group cursor-pointer">
      <Link to={`/nft-detail/${data?.contractAddress}/${data?.tokenId}`} className="relative">
        {data?.image ? (
          <img className="h-[260px] aspect-square w-full" src={data?.image} />
        ) : (
          <div className="w-full h-[260px] 2xl:h-[260px] 3xl:h-[240px] bg-strong-dark relative rounded">
            <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex flex-col items-center justify-center">
              <CustomIcon iconName="empty-image" />
              <div className="uppercase mt-3 tracking-[0.02rem] text-tiny font-medium text-white text-center">
                No images available
              </div>
            </div>
          </div>
        )}
      </Link>
      {/* TODO: Update later */}
      {/* {data?.version !== MigrateState?.NORMAL && (
        <div className="absolute left-[-14px] top-5">
          <MigrateTag migration={data?.version} />
        </div>
      )} */}

      <div className="px-[10px] pt-4 pb-2 overflow-hidden">
        <div className="flex items-center justify-between mt-1">
          <div className="text-[12px] text-brown-100 tracking-[0.02em]">{data?.contractName}</div>
          <img src={CHAINS_ICON?.[data?.chainId]} className="w-5 h-5 rounded-full" />
        </div>
        <h2 className="nft-name text-navy-100 mt-[6px]">{data?.nftName ?? "N/A"}</h2>

        <div className="w-full h-[0.5px] bg-light-grey !my-4" />
        <div className="relative h-[55px] group-hover:hidden">
          <div className="mt-[15px] flex flex-col visible group-hover:visible">
            <div className="flex justify-between pb-4 items-center">
              <span className="text-brown-100 uppercase text-[12px] tracking-[0.02rem] flex items-end justify-end">
                Token ID
              </span>
              <span className="text-navy-100 font-medium text-sm">{data?.tokenId}</span>
            </div>
          </div>
        </div>
        <div className="relative min-h-[55px] hidden group-hover:block">
          <Link to={`/nft-detail/${data?.contractAddress}/${data?.tokenId}`}>
            <Button
              fillColor="gray"
              fillVariant="flat"
              className="rounded w-full h-12 font-semibold"
            >
              View details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Item
