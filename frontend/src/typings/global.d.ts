import { CollectionType, NFTType } from "@/api/entity"

export {}

declare global {
  export type UIStyleVariant =
    | "default"
    | "success"
    | "warning"
    | "error"
    | "disabled"
    | "loading"
    | "blue"
  export type ButtonFillVariant = "filled" | "outlined" | "flat"
  export type InputSizeVariant = "sm" | "md" | "lg"

  export type EditorProps = {
    defaultValue?: string
    placeholder?: string
    onChange?: (content: string) => void
  }

  type TokenType = "unknown" | "erc721" | "erc1155"

  type ColunmType = {
    title: any
    dataIndex: string
    key: string
    render?: (text: any, record: any, e: any) => ReactNode
    className?: string
    align?: "left" | "right" | "center"
    width?: number | string
  }

  export type OptionType = {
    name: string
    id: number
  }

  export type ItemType = {
    key?: number
    icon: string
    label: string
  }

  export type ModalFormType = { icon: IconName; url: string }

  export type IconName =
    | "arrow"
    | "heart"
    | "share"
    | "eye"
    | "copy"
    | "close-icon"
    | "close-grey"
    | "close-red"
    | "close-icon-gray"
    | "close-icon-blue"
    | "game-controller"
    | "video-game"
    | "star-calendar"
    | "box"
    | "rocket"
    | "wallet"
    | "down"
    | "next"
    | "pencil"
    | "pencil-fill-white"
    | "website"
    | "twitter"
    | "discord"
    | "telegram"
    | "github"
    | "youtube"
    | "instagram"
    | "reddit"
    | "medium"
    | "gitbook"
    | "facebook"
    | "steam"
    | "twitch"
    | "bitcointalk"
    | "web"
    | "ios"
    | "android"
    | "linux"
    | "windows"
    | "xbox"
    | "playstation"
    | "mac"
    | "nintendo"
    | "up"
    | "chevron-down"
    | "chevron-left"
    | "save"
    | "camera"
    | "picture"
    | "recycle-bin"
    | "cross"
    | "info"
    | "info-grey"
    | "arrow-left"
    | "copy"
    | "copy-midnight-blue"
    | "arrow"
    | "arrow-down-select"
    | "search"
    | "setting"
    | "view-grid"
    | "view-list"
    | "phone"
    | "mail"
    | "location-marker"
    | "clock"
    | "wallet-connect"
    | "search-gray"
    | "wallet-connect"
    | "arrow-right"
    | "half-square"
    | "copy-white"
    | "copy-black"
    | "exclamation"
    | "link"
    | "check"
    | "copy-black"
    | "search-thin"
    | "loop"
    | "infor"
    | "success"
    | "success-light"
    | "fail-light"
    | "arrow-down-select"
    | "copy-gray"
    | "pencil-edit"
    | "plus"
    | "close-remove"
    | "shuffle"
    | "logout"
    | "upload"
    | "excel"
    | "black-copy"
    | "refesh"
    | "increase"
    | "go-back"
    | "next-arrow"
    | "big-next-arrow"
    | "big-back-arrow"
    | "prev-arrow"
    | "option-icon"
    | "arrow-down-red"
    | "arrow-up-green"
    | "arrow-up"
    | "writing"
    | "empty-image"
    | "black-close-icon"
    | "list-check"
    | "wallet-connect-select"
    | "bell"
    | "chain-icon-wallet"
    | "arrow-down-black"
    | "star"
    | "arrow-small-left"
    | "chevron-down-polo-blue"
    | "currency-icon"
    | "blue-right-arrow"
    | "star-board"
    | "medal"
    | "slider-next-arrow"
    | "slider-prev-arrow"
    | "ticket"
    | "block"
    | "reward"
    | "white-down-arrow"
    | "credit-card"
    | "close-gray-default"
    | "close-modal"
    | "migrated-arrow"
    | "bsc-testnet"
    | "refresh"

  export type PageType =
    | "kyc"
    | "edit-game"
    | "game-page"
    | "game-events"
    | "ino-page"
    | "bi-dashboard"

  type FilterQuery = {
    q?: string
    status?: string
    name?: string
    providerId?: string
    page?: string
    participant?: string
  }

  export type RowType = {
    title: string | ReactNode
    dataIndex: string
    key: string
    className?: string
    render?: (text: any, record: any, e: any) => ReactNode
    width?: string
  }

  type CollectionResponse = {
    items: CollectionType[]
    total: number
  }
  interface Window {
    ethereum: any
  }

  type LocalNftType = {
    contractAddress: string
    tokenId: string
    version: number
    image: string
    contractName: string
    chainId: number
    nftName: string
  }
}
