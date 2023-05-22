import { CustomIcon } from "@/shared/components"
import React from "react"

interface Props {
  collectionName?: string
  nftName?: string
  nftId?: number
}

const MigratedInfor = ({ collectionName, nftId, nftName }: Props) => {
  return (
    <div className="py-[10px] px-6 rounded-[10px] border-solid border-[1px] border-light-blue">
      <div className="text-light-blue text-base font-bold">Migrated to NFT2.0</div>
      <div className="flex items-center mt-3">
        <CustomIcon iconName="migrated-arrow" />
        <div className="bg-slate-300 ml-3 mr-4 w-9 h-9 rounded flex items-center justify-center">
          <CustomIcon iconName="bsc-testnet" />
        </div>
        <span className="text-dark-strong-blue text-[18px]">{collectionName}</span>
      </div>
      <div className="flex items-center text-[18px] pl-[42px] pt-2">
        <div className="text-dark-strong-blue font-bold">{nftName ?? "N/A"}</div>
        <div className="text-strong-red pl-1">(ID: {nftId})</div>
      </div>
    </div>
  )
}

export default MigratedInfor
