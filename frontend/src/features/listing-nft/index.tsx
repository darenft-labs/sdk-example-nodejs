import SearchNft from "./search-nft"
import ListNFt from "./list-nft"

const ListingNft = () => {
  return (
    <div className="pt-14">
      <div className="flex flex-col items-center xl:px-14 2xl:px-48 3xl:px-64 pb-20 px-5">
        <h2 className="text-4xl text-dark-strong-blue text-center mb-12 font-semibold">My NFTs</h2>
        <SearchNft />
        <ListNFt />
      </div>
    </div>
  )
}

export default ListingNft
