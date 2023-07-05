import { ProviderSchemaResponse } from "@darenft/nft2-client";
import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { NFT2Service } from "src/global_modules";

@ApiTags("Provider")
@Controller("providers")
export class ProviderController {
  constructor(private nft2Service: NFT2Service) {}

  @Get()
  async getSupportedProviders() {
    try {
      const supportedAddresses = this.nft2Service.supportedProviders;

      const promises = [];

      for (let i = 0; i < supportedAddresses.length; i++) {
        const element = supportedAddresses[i];

        const promise = new Promise(async (resolve, reject) => {
          try {
            const schemas: Partial<ProviderSchemaResponse> =
              await this.nft2Service.client.provider.getProviderSchema(element);

            const provider = {
              ...schemas.provider,
              schema: {},
              vault: null,
            } as any;
            delete schemas.provider;
            provider.schema = schemas;
            provider.vault =
              (await this.nft2Service.getProviderVault(
                supportedAddresses[i],
              )) || "";

            resolve(provider);
          } catch (error) {
            reject(error);
          }
        });

        promises.push(promise);
      }

      const providers = await Promise.all(promises);

      return providers;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}
