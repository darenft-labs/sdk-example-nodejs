import React from "react"
import { BSC, BSCTestnet, Config, DAppProvider } from "@usedapp/core"

export const BlockchainNetworks = {
  [BSC.chainId]: "https://bsc-dataseed.binance.org",
  [BSCTestnet.chainId]: "https://data-seed-prebsc-1-s1.binance.org:8545/",
}

const config: Config = {
  readOnlyChainId: BSC.chainId,
  readOnlyUrls: BlockchainNetworks,
}

function BlockchainProvider(props: React.PropsWithChildren) {
  return <DAppProvider config={config}>{props.children}</DAppProvider>
}

export default BlockchainProvider
