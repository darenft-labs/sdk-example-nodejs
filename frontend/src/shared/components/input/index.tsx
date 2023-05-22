import clsx from "clsx"

const DEFAULT_VARIANT =
  "w-full rounded border-0 outline-0 shadow-none text-white placeholder:text-sm"

interface Props
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  sizeVariant?: InputSizeVariant
  isError?: boolean
  leftAddon?: React.ReactNode
  rightAddon?: React.ReactNode
}

export const Input: React.FC<Props> = ({
  sizeVariant,
  className,
  isError,
  leftAddon,
  rightAddon,
  ...rest
}) => {
  const errorStyle = isError ? "!border !border-red-500" : ""

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
    <div className={clsx("flex w-full rounded items-center", errorStyle)}>
      {leftAddon}
      <input className={clsx(DEFAULT_VARIANT, getSize(), className)} {...rest} />
      {rightAddon}
    </div>
  )
}
