import clx from "clsx"

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  fillVariant?: ButtonFillVariant
  uiStyleVariant?: UIStyleVariant
  sizeVariant?: "sm" | "md" | "lg"
  loading?: boolean
  disabled?: boolean
  fillColor?: "blue" | "orange" | "white" | "gray" | "red" | "green"
}

export const Button: React.FC<Props> = ({
  children,
  uiStyleVariant,
  fillVariant,
  loading,
  fillColor,
  disabled = false,
  ...rest
}) => {
  function getContextVariant() {
    if (fillVariant === "flat") {
      if (uiStyleVariant === "default") {
        return "!bg-dark-slate-blue"
      }
      if (fillColor === "blue") {
        return "!bg-light-blue hover:brightness-105"
      }
      if (fillColor === "red") {
        return "!bg-red-100 hover:brightness-105"
      }
      if (fillColor === "green") {
        return "!bg-strong-green hover:brightness-105"
      }
      if (fillColor === "white") {
        return "!bg-white hover:brightness"
      }
      if (fillColor === "gray") {
        return "!bg-light-gray !text-dark-strong-blue hover:!bg-light-blue hover:!text-white"
      }
      return "!bg-dark-grey-blue"
    }

    if (fillVariant === "filled") {
      if (uiStyleVariant === "warning") {
        return "!bg-melon-600 from-melon-500 to-melon-600"
      }
      if (uiStyleVariant === "success") {
        return "!bg-bluish-green-600 from-bluish-green-500 to-bluish-green-600"
      }
      return "bg-blue-600 from-blue-100 to-blue-600"
    }

    // Default is outlined
    if (uiStyleVariant === "warning") {
      return "!bg-brown-melon-500 from-brown-melon-500 to-brown-melon-500 border border-melon-600 hover:!bg-brown-melon-600"
    }
    if (uiStyleVariant === "success") {
      return "!bg-bluish-green-600 from-bluish-green-500 to-bluish-green-600"
    }

    if (uiStyleVariant === "blue") {
      return "!bg-blue-100"
    }
    return "!from-dark-blur-grey-300 !to-dark-blur-grey-300 border border-blue-600 hover:bg-dark-blur-grey-600"
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { onClick } = rest

    if (loading) {
      e.preventDefault()
      return
    }
    ;(onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e)
  }

  function getDisabledStyle() {
    return loading ? "!cursor-progress opacity-50" : ""
  }

  return (
    <button
      type="button"
      {...rest}
      onClick={handleClick}
      className={clx(
        "text-white select-none cursor-pointer flex justify-center items-center gap-2 truncate px-3",
        getContextVariant(),
        getDisabledStyle(),
        disabled && "hover:cursor-not-allowed !opacity-40",
        rest.className
      )}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
