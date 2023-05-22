import React from "react"
import { useParams } from "react-router-dom"
import BasicInfo from "./basic-info"
import SectionMetadata from "./section-metadata"
import TransactionHistory from "./transaction-history-section"

const NftDetail = () => {
  const { nftId } = useParams()

  return (
    <div className="bg-grey-100">
      <BasicInfo />

      <div className="bg-white pb-20">
        <SectionMetadata />

        <TransactionHistory />
      </div>
    </div>
  )
}

export default NftDetail
