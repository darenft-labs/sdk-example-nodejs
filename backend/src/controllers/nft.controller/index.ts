import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { NFTController } from "./nft.controller";
import { NFTSchemaController } from "./nft-schema.controller";
import { NFTTransactionController } from "./nft-transaction.controller";
import { ProviderController } from "./provider.controller";

@Module({
  imports: [HttpModule],
  controllers: [
    NFTController,
    NFTSchemaController,
    NFTTransactionController,
    ProviderController,
  ],
  providers: [],
})
export class NFTModule {}
