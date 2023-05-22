import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { NFT2Service } from "src/global_modules";

import { Ok } from "src/utils";

@ApiTags("Schema")
@Controller("nft-schemas")
export class NFTSchemaController {
  constructor(private nft2Service: NFT2Service) {}

  @Get(":provider_address")
  async getNFTSchema(@Param("provider_address") providerAddress: string) {
    return await this.nft2Service.client.provider.getProviderSchema(
      providerAddress,
    );
  }
}
