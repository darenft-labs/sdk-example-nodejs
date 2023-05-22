import React, { ReactNode } from "react"
import clsx from "clsx"
import { Select, Tag, SelectProps } from "antd"
import { CustomTagProps } from "rc-select/lib/BaseSelect"
import { BaseOptionType } from "antd/lib/select"
import "./index.css"

const { Option } = Select

interface Props extends SelectProps {
  optionsData: string[]
  closeIcon?: ReactNode
  tagClassName?: string
  optionsProps?: BaseOptionType[]
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

export const BaseDropdown: React.FC<Props> = ({
  optionsData,
  closeIcon,
  tagClassName,
  optionsProps,
  ...props
}) => {
  const customTheme =
    props?.mode === "multiple"
      ? { container: "tagsContainer", optionContainer: "tagsOptionContainer" }
      : { container: "containerSelect", optionContainer: "optionContainer" }

  return (
    <div className={customTheme.container}>
      <Select
        {...props}
        dropdownClassName={customTheme.optionContainer}
        tagRender={(props) => (
          <TagRender props={props} className={tagClassName} closeIcon={closeIcon} />
        )}
      >
        {optionsData?.map((item, idx) => (
          <Option key={item} {...optionsProps?.[idx]}>
            {item}
          </Option>
        ))}
      </Select>
    </div>
  )
}
