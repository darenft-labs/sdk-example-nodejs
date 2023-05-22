import { Pagination, PaginationProps } from "antd"
import "./index.css"

interface Props extends PaginationProps {}

export const BasePagination: React.FC<Props> = ({ ...props }) => {
  return <Pagination {...props} />
}
