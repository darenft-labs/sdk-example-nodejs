import { ReactNode } from "react"
import clsx from "clsx"
import { BaseTable } from "@/shared/components/base"
import { PaginationProps } from "@/shared/components/pagination"
import "./index.css"
import { TableProps } from "antd"
import { TableComponents } from "virtualizedtableforantd4/dist/cjs/vt"

interface TableCustomProps extends TableProps<any> {
  dataSource?: object[]
  columns?: ColunmType[]
  pagination?: false | PaginationProps
  showHeader?: boolean
  rowClassName?: string
  className?: string
  components?: TableComponents
  columnWidth?: string | number
  scroll?: {
    x?: string | number | true
    y?: string | number
  } & {
    scrollToFirstRowOnChange?: boolean
  }
}

export const Table: React.FC<TableCustomProps> = ({
  dataSource,
  columns,
  pagination = {
    defaultPageSize: 10,
    showTitle: false,
    showSizeChanger: false,
    showQuickJumper: false,
  },
  showHeader = true,
  rowClassName,
  className,
  scroll,
  components,
  ...rest
}) => {
  return (
    <div className="relative">
      <BaseTable
        columns={columns}
        dataSource={[...(dataSource ?? [])]}
        rowClassName={rowClassName ?? "row-default"}
        pagination={pagination}
        expandedRowClassName={() => "!bg-green-400"}
        showHeader={showHeader}
        className={className}
        scroll={scroll}
        onRow={rest?.onRow}
        components={components}
      />
      {pagination && (
        <div className="text-sm absolute bottom-5 left-6 font-normal !text-brown-400">
          {`1 - ${pagination?.defaultPageSize} of ${pagination?.total} items`}
        </div>
      )}
    </div>
  )
}
