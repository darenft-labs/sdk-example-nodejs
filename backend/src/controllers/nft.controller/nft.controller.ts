import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  PreconditionFailedException,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { NFT2Service } from "src/global_modules";

import { NFTMetadataUpdateDto } from "./dtos";

@ApiTags("NFT")
@Controller("nfts")
export class NFTController {
  constructor(private nft2Service: NFT2Service) {}

  @Post("update-metadata")
  async updateMetadataNFT(@Body() data: NFTMetadataUpdateDto) {
    try {
      const { nftContractAddress, tokenId, nftData, providerAddress } = data;

      const schema = (
        await this.nft2Service.client.provider.getProviderSchema(
          providerAddress,
        )
      )?.jsonSchema;

      const client = this.nft2Service.clients.get(providerAddress);

      if (!client) {
        throw new PreconditionFailedException(
          `Client ${providerAddress} not found`,
        );
      }

      const result = await client.nftMetadata.updateMetadata({
        nftContractAddress,
        tokenId,
        tokenData: nftData,
        schema,
      });

      return result;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  @Get(":token_id")
  async getNFTDetail(
    @Param("token_id") tokenId: string,
    @Query("contract_address") contractAddress: string,
    @Query("chain_id") chainId: number,
  ) {
    try {
      return await this.nft2Service.client.nft.getNFTDetail({
        contractAddress,
        tokenId,
        chainId,
      });
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  @Get(":token_id/metadatas")
  async getNFTMetadatas(
    @Param("token_id") tokenId: string,
    @Query("contract_address") contractAddress: string,
    @Query("chain_id") chainId: number,
    @Query("provider_address") providerAddress: string,
  ): Promise<any> {
    try {
      return await this.nft2Service.client.nft.getNFTMetadatas({
        contractAddress,
        tokenId,
        chainId,
        providerAddress,
      });
    } catch (error) {
      console.log(error);

      throw error;
    }
  }

  @Get(":token_id/providers")
  async getNFTProviders(
    @Param("token_id") tokenId: string,
    @Query("contract_address") contractAddress: string,
    @Query("chain_id") chainId: number,
    @Query("limit") limit: number,
    @Query("offset") offset: number,
  ) {
    try {
      return await this.nft2Service.client.nft.getNFTProviders({
        contractAddress,
        tokenId,
        chainId,
        limit,
        offset,
      });
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}
