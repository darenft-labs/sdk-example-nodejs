import ImportButton from "../import-button"

const EmptyData = () => {
  return (
    <div>
      <div className="text-xl text-gray-400 text-center h-[300px] flex flex-col justify-center">
        No NFTs
      </div>
      <div className="flex flex-col items-center">
        <div className="text-base text-gray-500 text-center italic mb-3">Cannot find your NFT?</div>
        <ImportButton />
      </div>
    </div>
  )
}

export default EmptyData
