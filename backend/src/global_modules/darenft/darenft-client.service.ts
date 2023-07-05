import { Injectable } from "@nestjs/common";
import { Chain, DareNFTClient } from "@darenft/nft2-client";
import config from "../../config";

@Injectable()
export class NFT2Service {
  public client: DareNFTClient;
  public clients: Map<string, DareNFTClient>;
  public supportedProviders: string[];
  constructor() {
    this.clients = new Map();
    this.supportedProviders = [];
    const providerKeys = (config.PRIV_KEYS || "").split(",");
    const apiKeys = (config.API_KEY || "").split(",");

    providerKeys.forEach((e, i) => {
      const newClient = new DareNFTClient({
        opts: {
          apiKey: apiKeys[i],
          chainType: parseInt(config.CHAIN || "1"),
        },
        chainId: parseInt(config.CHAIN_ID || "0") || Chain.BSC_TESTNET,
        privateKey: e,
      });

      const providerAddress = newClient.blockchain.signer.address.toLowerCase();

      this.supportedProviders.push(providerAddress);

      this.clients.set(providerAddress, newClient);

      if (i === 0) {
        this.client = newClient;
      }
    });
  }

  async getProviderVault(address: string) {
    const result = await this.client.provider.getProviderVaults(address);

    return result.items?.[0]?.contractAddress;
  }
}
