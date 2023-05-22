import { Global, Module } from "@nestjs/common";
import { NFT2Service } from "./darenft-client.service";

@Global()
@Module({
  providers: [NFT2Service],
  exports: [NFT2Service],
})
export class DareNFTModule {}

export * from "./darenft-client.service";
