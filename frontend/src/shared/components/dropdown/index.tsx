import clsx from "clsx"
import { BaseDropdown } from "@/shared/components/base"
import { CustomIcon } from "@/shared/components"

interface Props {
  size?: "small" | "middle" | "large"
  mode?: "multiple"
  optionsData: string[]
  selectedData?: string[]
  value?: string[]
  placeholder?: string
  optionsProps?: { disabled?: boolean }[]
  onChange: (value: any) => void
  className?: string
}

export const Dropdown: React.FC<Props> = ({
  size = "middle",
  mode,
  optionsData,
  selectedData,
  placeholder,
  value,
  className,
  optionsProps,
  onChange,
}) => {
  return (
    <BaseDropdown
      size={size}
      mode={mode}
      bordered={false}
      optionsData={optionsData}
      defaultValue={selectedData}
      value={value}
      onChange={onChange}
      optionsProps={optionsProps}
      closeIcon={
        <div className="absolute -top-1.5 -right-1.5">
          <CustomIcon iconName="close-icon-blue" />
        </div>
      }
      className={clsx("text-grey-blue h-11 w-full", className)}
      tagClassName="!bg-cerulean-blue !border-cerulean-blue !text-white !rounded !text-sm"
      placeholder={placeholder ?? "Please select"}
    />
  )
}
