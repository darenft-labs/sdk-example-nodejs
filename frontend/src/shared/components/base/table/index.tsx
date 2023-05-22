import { Table, TableProps } from "antd"
import "./index.css"

interface Props extends TableProps<any> {}

export const BaseTable: React.FC<Props> = ({ ...props }) => <Table {...props} />
