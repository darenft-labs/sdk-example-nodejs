import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { NFT2Service } from "src/global_modules";

import { Ok } from "src/utils";

@ApiTags("Transaction")
@Controller("nft-transactions")
export class NFTTransactionController {
  constructor(private nft2Service: NFT2Service) {}

  @Get()
  async getTransactions(
    @Query("token_id") tokenId: string,
    @Query("contract_address") contractAddress: string,
    @Query("chain_id") chainId: number,
    @Query("limit") limit: number,
    @Query("offset") offset: number,
  ) {
    try {
      return await this.nft2Service.client.nft.getNFTTransactionHistory({
        filter: {
          contractAddress,
          tokenId,
          chainId,
        },
        limit,
        offset,
      });
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}
