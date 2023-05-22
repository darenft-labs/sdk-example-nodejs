import binanceIc from "@/assets/icons/binance.svg"

export const BSC_TESTNET = 97
export const BSC_MAINNET = 56

export const RPC_URLS = {
  BSC_MAINNET: "https://bsc-dataseed.binance.org/",
  BSC_TESTNET: "https://data-seed-prebsc-1-s1.binance.org:8545/",
}

export const RPCS = {
  [BSC_MAINNET]: RPC_URLS.BSC_MAINNET,
  [BSC_TESTNET]: RPC_URLS.BSC_TESTNET,
}

export const chainSupports = {
  [BSC_TESTNET]: {
    imgUrl: binanceIc,
    label: "Binance",
  },
  [BSC_MAINNET]: {
    imgUrl: binanceIc,
    label: "Binance",
  },
}
