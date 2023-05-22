import HttpService from "@/api/http-service"
import qs from "querystringify"
import {
  NftSchemaType,
  NftType,
  ProviderResponse,
  ProviderType,
  TransactionType,
  UpdateMetadataResponse,
} from "./entity"

export default class GameApi extends HttpService {
  private static classInstance?: GameApi

  private constructor() {
    super(import.meta.env.VITE_GAME_DEMO_API)
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new GameApi()
    }
    return this.classInstance
  }

  async getNftDetail(params: { contract_address: string; token_id: string; chain_id: number }) {
    const data: NftType = await this.instance.get(
      `/nfts/${params.token_id}?contract_address=${params.contract_address}&chain_id=${params.chain_id}`
    )
    return data
  }

  async getMetaData(params: {
    contract_address: string
    token_id: string
    chain_id: number
    provider_address: string
  }) {
    const data: any = await this.instance.get(
      `/nfts/${params.token_id}/metadatas?contract_address=${params.contract_address}&chain_id=${params.chain_id}&provider_address=${params.provider_address}`
    )
    return data
  }

  async getTransaction(params: {
    contract_address: string
    token_id: string
    chain_id: number
    limit: number
    offset: number
  }) {
    const data: { items: TransactionType[]; total: number } = await this.instance.get(
      `/nft-transactions?token_id=${params.token_id}&contract_address=${params.contract_address}&chain_id=${params.chain_id}&limit=${params?.limit}&offet=${params?.offset}`
    )
    return data
  }

  async getNftProvider(params: {
    contract_address: string
    token_id: string
    chain_id: number
    limit: number
    offset: number
  }) {
    const data: { items: ProviderType[]; total: number } = await this.instance.get(
      `/nfts/${params.token_id}/providers?contract_address=${params.contract_address}&chain_id=${params.chain_id}&limit=${params?.limit}&offet=${params?.offset}`
    )
    return data
  }

  async getNftSchemas(params: { provider_address: string }) {
    const data: NftSchemaType = await this.instance.get(`/nft-schemas/${params?.provider_address}`)
    return data
  }

  async updateMetadata(params: {
    tokenId: string
    nftContractAddress: string
    providerAddress: string
    nftData: any
  }) {
    const res: UpdateMetadataResponse = await this.instance.post(`nfts/update-metadata`, params)
    return res
  }

  async getProviders() {
    const data: ProviderResponse[] = await this.instance.get(`/providers`)
    return data
  }
}
