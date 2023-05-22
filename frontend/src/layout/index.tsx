import { ReactNode, Suspense } from "react"
import { BackTop } from "antd"
import { ArrowUpIcon } from "@heroicons/react/outline"
import Header from "@/shared/components/header"
import Footer from "@/shared/components/footer"
import i18n from "@/i18n/config"

interface Props {
  children?: ReactNode
  isShowFooter?: boolean
}

function GameLayout({ children, isShowFooter = true }: Props) {
  return (
    <div className="flex flex-col bg-strong-gray-200 relative">
      {/* HEADER */}
      <Header />

      {/* BODY */}
      <div className="grow w-full 3xl:64 bg-grey-100">
        <LazyLoadComponent>{children}</LazyLoadComponent>
      </div>

      {/* FOOTER */}
      {/* {isShowFooter && <Footer />} */}

      <BackTop>
        <div className=" space-y-2">
          <div className="w-8 h-8 rounded-full shadow-[0_0_20px_5px_rgba(0,0,0,0.1)] bg-white flex items-center justify-center">
            <ArrowUpIcon className="w-[10px]" />
          </div>
        </div>
      </BackTop>
    </div>
  )
}

export function LazyLoadComponent({ children }) {
  return (
    <Suspense
      fallback={
        <div className="!text-white">
          {/*TODO: Add animation here */}
          {i18n.t("Loading")}...
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

export default GameLayout
