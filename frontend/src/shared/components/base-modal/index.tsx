import { FC, ReactNode } from "react"
import { Modal, ModalProps } from "antd"
import { CustomIcon } from "@/shared/components"
import "./index.css"
import clsx from "clsx"

interface Props extends ModalProps {
  onClose?: () => void | undefined
  typeMode?: "default" | "dark" | "white"
  customCloseIcon?: ReactNode
}

export const BaseModal: FC<Props> = ({
  title,
  typeMode = "default",
  children,
  customCloseIcon,
  onClose,
  ...rest
}) => {
  function getMode() {
    if (typeMode === "dark") return "custom-dark-modal"
    if (typeMode === "white") return ""
    return "blue-modal"
  }

  return (
    <Modal
      className={clsx("rounded-lg !bg-red-200", ...rest.className)}
      wrapClassName={getMode()}
      footer={null}
      closeIcon={
        <div onClick={onClose} className="flex justify-end h-full mt-[10px] mr-[10px]">
          {!!onClose &&
            (customCloseIcon ?? <CustomIcon className="w-8 h-8" iconName={"close-modal"} />)}
        </div>
      }
      {...rest}
    >
      {title && (
        <h1 className="pt-7 text-center text-4xl font-light bg-gradients-cerulean-blue text-white uppercase">
          {title}
        </h1>
      )}
      <div className="min-h-fit flex flex-col justify-center">{children}</div>
    </Modal>
  )
}
