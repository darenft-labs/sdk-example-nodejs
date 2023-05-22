import { Button, CustomIcon } from "@/shared/components"
import CardMetadata from "./card-metadata"
import { useParams } from "react-router-dom"
import { useEthers } from "@usedapp/core"
import { useQuery } from "@tanstack/react-query"
import api from "@/api"

function SectionMetadata() {
  const refresh = () => {}

  const { tokenId, contractAddress } = useParams()
  const { chainId } = useEthers()
  const { data: detailData, isLoading } = useQuery(
    ["list_provider", contractAddress, tokenId, chainId],
    () =>
      api.GameApi.getNftProvider({
        contract_address: contractAddress,
        token_id: tokenId,
        chain_id: chainId,
        limit: 10,
        offset: 0,
      }),
    { enabled: !!contractAddress && !!tokenId }
  )

  const listProvider = detailData?.items

  return (
    <div className="mx-auto max-w-[1410px] pt-[49px] flex-1 px-[60px] 2xl:px-0">
      <div>
        <div className="flex items-centers pb-[21px]">
          <div className="flex-1 font-semibold text-[28px] leading-[42px] text-navy-100">
            Metadata
          </div>
          {/* <Button
            className="h-10 w-[88px] rounded !bg-grey-100 !text-navy-100 border-none text-[12px]"
            onClick={refresh}
          >
            <CustomIcon iconName="refresh" /> Refresh
          </Button> */}
        </div>

        <div className="overflow-y-auto grid sm:grid-cols-2 grid-cols-1 gap-[10px]">
          {listProvider?.map((item, index) => (
            <CardMetadata
              key={index}
              providerAddress={item?.providerAddress}
              gameName={item?.name ?? `Game ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default SectionMetadata
