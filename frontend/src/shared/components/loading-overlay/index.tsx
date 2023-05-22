import { ReactNode } from "react"
import { useSelector } from "react-redux"
import Modal from "antd/lib/modal"
import { RootState } from "@/redux/store"
import { LoadingAnimation } from "@/shared/components/loading-animation"
import "./loading-overlay.css"

interface Props {
  children?: ReactNode
}

export default function LoadingOverlay({ children }: Props) {
  const { isLoading } = useSelector((state: RootState) => state.ui)

  return (
    isLoading && (
      <div className="hello">
        <Modal
          visible={isLoading}
          className="!bg-transparent loading-overlay w-full"
          wrapClassName="loading-modal"
          footer={null}
          closeIcon={<></>}
        >
          {children}
          <LoadingAnimation type="dots" />
        </Modal>
      </div>
    )
  )
}
