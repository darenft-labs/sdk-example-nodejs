import clsx from "clsx"
import "./index.css"

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string
  placement?: "left" | "right"
  labelClassname?: string
  checkmarkClassname?: string
}

export const Checkbox: React.FC<Props> = ({
  label,
  placement = "right",
  labelClassname,
  checkmarkClassname,
  ...props
}) => {
  return (
    <div className="flex gap-2 items-center">
      {placement === "left" && <label className={labelClassname}>{label}</label>}
      <label className={clsx("container")}>
        <input type="checkbox" {...props} />
        <span className={clsx("checkmark", checkmarkClassname)}></span>
      </label>
      {placement === "right" && <label className={labelClassname}>{label}</label>}
    </div>
  )
}
