import React from "react"
import clsx from "clsx"

interface Props
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  sizeVariant?: InputSizeVariant
  isError?: boolean
  integerOnly?: boolean
}

export const NumberInput: React.FC<Props> = ({
  sizeVariant,
  className,
  isError,
  integerOnly,
  ...rest
}) => {
  const errorStyle = isError ? "border border-red-500" : ""

  function getSize() {
    switch (sizeVariant) {
      case "sm":
        return "px-1 py-1"
      case "md":
        return "px-2 py-2"
      case "lg":
        return "px-3 py-3"
      default:
        return "px-2 py-2"
    }
  }

  return (
    <input
      className={clsx(
        "text-white appearance-none outline-none bg-dark-blue w-full rounded-md",
        getSize(),
        errorStyle,
        className
      )}
      type="number"
      {...rest}
      onKeyDown={(evt) =>
        (integerOnly ? ["e", "E", "+", "-", ".", ","] : ["e", "E", "+", "-"]).includes(evt.key) &&
        evt.preventDefault()
      }
    />
  )
}
