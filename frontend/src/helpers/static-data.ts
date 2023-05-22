import {
  BSC,
  BSCTestnet,
  Cronos,
  CronosTestnet,
  Polygon,
  Mumbai,
  Ether,
  Goerli,
  Mainnet,
  ChainId,
} from "@usedapp/core"
import bscIcon from "@/assets/images/wallet-networks/bsc-icon.png"
import cronosIcon from "@/assets/images/wallet-networks/cronos-logo.svg"
import polygonIcon from "@/assets/images/wallet-networks/polygon-icon.png"
import ethIcon from "@/assets/images/wallet-networks/eth.svg"
import i18next from "@/i18n/config"
import { BigNumber } from "ethers"

const t = i18next.getFixedT(null, "helpers")
const isDevMode = import.meta.env.VITE_ENV === "dev"

export const FORMAT = "DD/MM/YYYY HH:mm:ss"

export const FORMAT_DATE = "DD/MM/YYYY"

export const FORMAT_TIME_UPDATE = "YYYY-MM-DD HH:mm:ss"

export const FORMAT_DATE_UPDATE = "YYYY-MM-DD"

export const DEFAULT_PAGE_SIZE = 10

export enum ProviderType {
  GAME = 1,
}

export enum TournamentStatus {
  ALL,
  REGISTRATION = 4,
  COMPETING = 5,
  ENDING = 6,
}

export enum ResultRule {
  IS_THE_SMALLEST,
  IS_THE_GREATEST,
}

export const ResultRuleSort = {
  [ResultRule.IS_THE_GREATEST]: "DESC",
  [ResultRule.IS_THE_SMALLEST]: "ASC",
}

export const TournamentStatuslabel = {
  [TournamentStatus.REGISTRATION]: "Registration",
  [TournamentStatus.COMPETING]: "Competing",
  [TournamentStatus.ENDING]: "Ending",
}

export enum ConnectWalletType {
  META_MASK = "metamask",
  WALLET_CONNECT = "wallet-connect",
}

export enum ClaimType {
  NOT_CLAIMED = 0,
  CLAIMED = 1,
}

export const CHAINS_ICON = {
  [BSC.chainId]: bscIcon,
  [BSCTestnet.chainId]: bscIcon,
  [Cronos.chainId]: cronosIcon,
  [CronosTestnet.chainId]: cronosIcon,
  [Polygon.chainId]: polygonIcon,
  [Mumbai.chainId]: polygonIcon,
  [Ether.chainId]: ethIcon,
  [Goerli.chainId]: ethIcon,
}

export enum TokenType {
  ERC721 = 0,
  ERC1155 = 1,
}

export enum ChainType {
  All = 0,
  BSC_TESTNET = 97,
}

export const StandardNFT = {
  [TokenType.ERC721]: "ERC 721",
  [TokenType.ERC1155]: "ERC 1155",
}

export enum MigrateState {
  // NFT 1.0
  NOTMIGRATE = 0,
  MIGRATED = 1,
  // NFT2.0
  NORMAL = 2,
}

export enum NFTContractType {
  Original = 0,
  Derivative = 1,
  All = 2,
}

export enum FeeMethod {
  UPDATE_METADATA = 6,
}

export enum FeeMethodAddress {
  UPDATE_METADATA = "0x1654c0b1bc79e5efd11874cb452467bf7311917990e2cd132e1a40ba3ae596e1",
}

export const ChainsSupport = [
  {
    icon: CHAINS_ICON[ChainId.Cronos],
    name: isDevMode ? CronosTestnet.chainName : Cronos.chainName,
    chainId: isDevMode ? ChainId.CronosTestnet : ChainId.Cronos,
  },
  {
    icon: CHAINS_ICON[ChainId.BSC],
    name: isDevMode ? BSCTestnet.chainName : BSC.chainName,
    chainId: isDevMode ? ChainId.BSCTestnet : ChainId.BSC,
  },
  {
    icon: CHAINS_ICON[ChainId.Polygon],
    name: isDevMode ? Mumbai.chainName : Polygon.chainName,
    chainId: isDevMode ? ChainId.Mumbai : ChainId.Polygon,
  },

  {
    icon: CHAINS_ICON[ChainId.Mainnet],
    name: isDevMode ? Goerli.chainName : Mainnet.chainName,
    chainId: isDevMode ? ChainId.Goerli : ChainId.Mainnet,
  },
]
