export type NftContract = {
  createdAt: string
  updatedAt: string
  id: number
  name: string
  symbol: string
  description: string
  contractAddress: string
  creatorAddress: string
  ownerAddress: string
  originalNFTContractAddress?: string
  originalTokenId?: string
  parentNFTContractAddress?: string
  parentTokenId?: string
  chainId: number
  imageUrl: string
  contractVersion: number
  type: number
  compatibility?: number
  royaltyRate?: number
  royalties?: number
  status?: number
  deployedAt?: string
  isDeleted?: number
}

export type NftType = {
  id: number
  name: string
  description: string
  tokenId: string
  chainId: number
  creatorAddress: string
  ownerAddress: string
  imageUrl: string
  type: number
  royalties: number
  status: number
  mintedAt: string
  closeAt: string
  openAt: string
  createdAt: string
  updatedAt: string
  isDeleted?: number
  nftContractAddress: string
  nftContractId: number
  nftContract: NftContract
  temporaryAddress: string
  tokenUri: string
}

export type TransactionType = {
  blockNumber: number
  chainId: number
  createdAt?: string
  eventType: string
  fromAddress: string
  id: number
  isDeleted?: number
  logIndex?: number
  nftContractAddress: string
  nftId: number
  timestamps: number
  toAddress: string
  tokenId: string
  txHash: string
  txIndex: number
  updatedAt?: string
}

export type ProviderType = {
  description?: string
  name?: string
  providerAddress: string
  providerType?: string
  url?: string
}

export type JsonSchema = {
  type: string
  properties: any
}

export type NftSchemaType = {
  name: string
  version: number
  jsonSchema: JsonSchema
  status: number
  publishedAt?: string
  createdAt?: string
  updatedAt?: string
  provider: ProviderType
}

export type ProviderResponse = {
  name: string
  description?: string
  providerAddress: string
  providerType?: string
  url?: string
  schema: {
    name: string
    version: number
    jsonSchema: JsonSchema
    status: number
    publishedAt?: string
    createdAt?: string
    updatedAt?: string
  }
  vault: string
}

export type UpdateMetadataResponse = {
  tokenId: string
  dataKeys: string[]
  dataValues: string[]
  nonce: string
  provider: string
  providerSignature: string
  rootSignature: string
}
