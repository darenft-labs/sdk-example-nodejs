import React, { JSXElementConstructor, ReactElement, ReactNode } from "react"
import clsx from "clsx"
import { Select as SelectAntd, Tag, SelectProps as SelectAntdProps } from "antd"
import { CustomTagProps } from "rc-select/lib/BaseSelect"
import { BaseOptionType, DefaultOptionType, SelectProps as SelectPropsType } from "antd/lib/select"
import { CustomIcon } from "@/shared/components"
import "./index.css"

const { Option } = SelectAntd

type SelectOptionType = {
  label: string | number | React.ReactNode
  value: string | number | boolean
}

type SelectValueType = SelectOptionType[] | SelectOptionType | string[] | string | number[] | number

export interface SelectProps extends SelectPropsType {
  size?: "small" | "middle" | "large"
  mode?: "multiple"
  bgfill?: "marine-blue" | "dark-blue" | "grey"
  optionsData: SelectOptionType[] | string[]
  defaultValue?: SelectValueType
  value?: SelectValueType
  placeholder?: string
  optionsProps?: { disabled?: boolean }[]
  onChange?: (value: any) => void
  className?: string
  open?: boolean
  disabled?: boolean
  labelInValue?: boolean // if labelInValue = true, when selected it will return an object e:{label, value, key, disable}
  error?: boolean
  allowClear?: boolean
  dropdownRender?: (menu?: any) => ReactElement<any, string | JSXElementConstructor<any>>
  showArrow?: boolean
  textColor?: "navy" | "gray"
  onPopupScroll?: React.UIEventHandler<HTMLDivElement>
}

export const Select: React.FC<SelectProps> = (props) => {
  const getBgFill = () => {
    if (props?.bgfill === "marine-blue")
      return { container: "marine-blue-select", optionContainer: "marine-blue-option" }
    if (props?.bgfill === "dark-blue")
      return { container: "dark-blue-container", optionContainer: "dark-blue-option" }
    if (props?.bgfill === "grey")
      return { container: "grey-container", optionContainer: "grey-option" }
    return { container: "grey-container", optionContainer: "grey-option" }
  }

  return (
    <BaseSelect
      {...props}
      placeholder={props?.placeholder ?? "Please select"}
      className={clsx(
        "text-grey-blue w-full h-12 flex items-center",
        props?.className,
        props?.error && "border border-red-600"
      )}
      tagClassName="!bg-cerulean-blue !border-cerulean-blue !text-white !rounded !text-sm"
      dropdownClassName={clsx(getBgFill()?.optionContainer)}
      containerClassName={clsx(
        getBgFill()?.container,
        props?.textColor === "navy" ? "text-selected-navy" : "text-selected-gray"
      )}
      closeIcon={<CustomIcon iconName="close-icon-blue" className="absolute -top-1.5 -right-1.5" />}
    />
  )
}

interface Props extends SelectAntdProps {
  optionsData: SelectOptionType[] | string[]
  closeIcon?: ReactNode
  tagClassName?: string
  optionsProps?: BaseOptionType[]
  bgfill?: "marine-blue" | "dark-blue" | "grey"
  containerClassName?: string
}

const BaseSelect: React.FC<Props> = ({
  optionsData,
  closeIcon,
  tagClassName,
  optionsProps,
  containerClassName,
  ...props
}) => {
  return (
    <div className={clsx(containerClassName)}>
      <SelectAntd
        {...props}
        bordered={false}
        suffixIcon={<CustomIcon iconName="arrow-down-select" className="mt-[2px]" />}
        tagRender={(props) => (
          <TagRender props={props} className={tagClassName} closeIcon={closeIcon} />
        )}
      >
        {optionsData?.map((item, idx) => (
          <Option key={idx} {...optionsProps?.[idx]} value={item?.value}>
            {item?.label}
          </Option>
        ))}
      </SelectAntd>
    </div>
  )
}

const TagRender = ({
  props,
  className,
  closeIcon,
}: {
  props: CustomTagProps
  className: string
  closeIcon: ReactNode
}) => {
  const { label, closable, onClose } = props

  const onPreventMouseDown = (event) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <Tag
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      className={clsx("tag", className)}
      closeIcon={closeIcon}
    >
      {label}
    </Tag>
  )
}
