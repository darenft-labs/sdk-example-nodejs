import { BasePagination } from "@/shared/components/base"
import "./index.css"

export interface PaginationProps {
  showQuickJumper?:
    | boolean
    | {
        goButton?: React.ReactNode
      }
  defaultCurrent?: number
  current?: number
  defaultPageSize?: number
  total?: number
  showTitle?: boolean
  showSizeChanger?: boolean
  onChange?: (page: number, pageSize: number) => void
  onShowSizeChange?: (current: number, size: number) => void
  showTotal?: (total: number, range: [number, number]) => React.ReactNode
  position?: (
    | "topLeft"
    | "topCenter"
    | "topRight"
    | "bottomLeft"
    | "bottomCenter"
    | "bottomRight"
  )[]
}

export const Pagination: React.FC<PaginationProps> = ({ ...props }) => {
  return <BasePagination showQuickJumper {...props} />
}
