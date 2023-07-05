import EmptyData from "./empty-data"
import Item from "./item"
import { useEthers } from "@usedapp/core"
import { useEffect } from "react"
import { groupBy } from "lodash"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useNftData } from "@/hooks/use-nfts"
import ImportButton from "../import-button"

const ListNFt = () => {
  const { account } = useEthers()
  const nftData = useSelector((state: RootState) => state?.nftData?.list)
  const groupCollection = groupBy(nftData, "contractAddress")
  const result = Object.keys(groupCollection).map((key) => [groupCollection[key]])

  const { initData } = useNftData()

  useEffect(() => {
    if (!account) return
    initData()
  }, [account])

  return (
    <div className="w-full">
      {!!nftData && nftData?.length !== 0 && account ? (
        <div className="mt-10 w-full">
          <div className="flex justify-center lg:justify-end mb-8">
            <ImportButton />
          </div>
          <div className="grid grid-cols-1 gap-5">
            {result?.map((item, index) => {
              return (
                <div
                  key={index}
                  className=" border-solid border-[1px] border-light-gray rounded bg-gray-300 "
                >
                  <div className="text-gray-800 text-base h-16 border-solid border-b-[1px] border-light-gray xl:px-20 px-5 ">
                    <div className="flex lg:flex-row flex-col justify-center lg:justify-start items-center h-full">
                      <div className="sm:text-base text-sm font-medium">
                        Collection: {item?.[0]?.[0]?.contractName}{" "}
                      </div>
                      <div className="flex items-center">
                        <span className="px-1 lg:block hidden">-</span>
                        <div className="sm:text-base text-xs">
                          {item?.[0]?.[0]?.contractAddress}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="xl:px-20 px-5  py-6 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 3xl:grid-cols-4 gap-x-10 gap-y-8">
                    {item?.[0]?.map((item, index) => (
                      <Item data={item} key={index} />
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <EmptyData />
      )}
    </div>
  )
}

export default ListNFt
