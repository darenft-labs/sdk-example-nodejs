import { useMemo } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useVT } from "virtualizedtableforantd4"
import { useParams } from "react-router-dom"
import i18n from "@/i18n/config"
import { Button, Table } from "@/shared/components"
import { formattingUtils } from "@/utils/utils-formatting"
import api from "@/api"
import "./index.css"
import dayjs from "dayjs"
import { FORMAT_TIME_UPDATE } from "@/helpers/static-data"
import { useEthers } from "@usedapp/core"

const DEFAULT_PAGE_SIZE = 10

function TransactionHistory() {
  const { tokenId, contractAddress } = useParams()
  const { chainId } = useEthers()

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["get_history", tokenId, contractAddress, chainId],
    ({ pageParam = 1 }) =>
      api.GameApi.getTransaction({
        token_id: tokenId,
        contract_address: contractAddress,
        chain_id: chainId,
        limit: DEFAULT_PAGE_SIZE,
        offset: pageParam === 1 ? 0 : (pageParam - 1) * DEFAULT_PAGE_SIZE,
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1
        return nextPage
      },
      enabled: !!tokenId,
      keepPreviousData: true,
    }
  )

  const dataNew = useMemo(
    () =>
      data?.pages?.reduce((prev, page) => {
        return {
          items: [...prev.items, ...page.items],
          total: page.total,
        }
      }),
    [data]
  )

  const items = dataNew?.items

  const hashMore = items?.length < dataNew?.total

  const fetchMoreData = () => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }

  const dataTable = useMemo(() => {
    if (items?.length > 0) {
      // TODO: replace type
      return items?.map((i: any, idx: number) => {
        return { ...i, key: idx + 1 }
      })
    }

    return []
  }, [data])

  const [vt] = useVT(
    () => ({
      onScroll: async ({ top, isEnd }) => {
        if (isEnd) {
          if (items && hashMore) {
            fetchMoreData()
          }
        }
      },
      scroll: {
        y: 640,
      },
      debug: false,
    }),
    [items]
  )

  const columnData: RowType[] = useMemo(
    () => [
      {
        key: "no",
        title: "",
        dataIndex: "key",
        className: "row-head text-navy-100",
        width: "5rem",
        render: (key) => <div className="font-normal">{key}</div>,
      },

      {
        key: "timestamp",
        title: <div className="font-semibold text-dark-strong-blue">Timestamp</div>,
        dataIndex: "timestamp",
        className: "row-head text-navy-100",
        render: (timestamps) => (
          <div className="font-normal">
            {dayjs(dayjs(timestamps)).format(FORMAT_TIME_UPDATE) ?? ""}
          </div>
        ),
      },
      {
        key: "trigger",
        title: <div className="font-semibold text-dark-strong-blue">Triggered from</div>,
        dataIndex: "fromAddress",
        className: "row-head text-navy-100",
        render: (fromAddress) => (
          <div className="font-normal">
            {formattingUtils.centerEllipsizeString(fromAddress, 7, 4)}
          </div>
        ),
      },
      {
        key: "transaction",
        title: <div className="font-semibold text-dark-strong-blue">Transaction</div>,
        dataIndex: "",
        className: "row-head text-navy-100",
        render: (data) => (
          <div>{data?.eventType}</div>
          // <div className="text-red-100 font-medium">
          //   {formattingUtils.centerEllipsizeString(data?.txHash, 7, 4)}
          // </div>
        ),
      },
      {
        key: "Value",
        title: <div className="font-semibold text-dark-strong-blue">Value</div>,
        dataIndex: "value",
        className: "row-head text-navy-100",
        render: (value) => <div className="text-red-100 font-medium">{value ?? "-"}</div>,
      },
    ],
    [dataTable]
  )

  return (
    <div className="max-w-[1408px] pt-6  mx-auto mt-12 px-[60px] 2xl:px-0">
      <div className="font-semibold text-[28px] leading-[42px] text-navy-100">
        Transaction history
      </div>

      <div className="mt-[19px] rounded relative hidden lg:block">
        <div className="h-[55px] bg-grey-200 absolute top-0 w-full rounded-tl rounded-tr" />

        <Table
          columns={columnData}
          // dataSource={dataTable}
          dataSource={dataTable}
          rowClassName="row-white"
          className="table-history"
          loading={isLoading}
          components={vt}
          pagination={false}
          scroll={{
            scrollToFirstRowOnChange: false,
            y: 640,
          }}
        />
      </div>

      {/* Responsive */}
      <div className="grid grid-cols-1 gap-y-4 mt-3 lg:hidden">
        {dataTable?.map((item) => (
          <div
            key={item?.key}
            className="grid grid-cols-1 gap-y-2 bg-grey-100 rounded py-6 px-4 sm:px-10"
          >
            <div className="italic">
              {dayjs(dayjs(item?.timestamps)).format(FORMAT_TIME_UPDATE) ?? ""} UTC
            </div>
            <div className="grid grid-cols-1 gap-y-1">
              <div className="font-semibold text-dark-strong-blue">Trigger from</div>
              <div className="text-[12px] sm:text-xs hidden sm:block">
                {item?.fromAddress ? item?.fromAddress : "-"}
              </div>
              <div className="text-[12px] sm:text-xs block sm:hidden">
                {item?.fromAddress
                  ? formattingUtils.centerEllipsizeString(item?.fromAddress, 7, 4)
                  : "-"}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-1">
              <div className="font-semibold text-dark-strong-blue">Transaction</div>
              <div className="text-[12px] sm:text-xs">{item?.eventType}</div>
            </div>
            <div className="grid grid-cols-1 gap-y-1">
              <div className="font-semibold text-dark-strong-blue">Value</div>
              <div className="text-[12px] sm:text-xs">-</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TransactionHistory
