import { http, createConfig } from "@wagmi/vue";
import { baseSepolia } from "@wagmi/vue/chains";
import { metaMask, coinbaseWallet } from "@wagmi/vue/connectors";
import { getWagmiConnectorV2 } from "@binance/w3w-wagmi-connector-v2";

const binanceWallet = getWagmiConnectorV2();

export const config = createConfig({
  chains: [baseSepolia],
  connectors: [metaMask(), coinbaseWallet(), binanceWallet()],
  transports: {
    [baseSepolia.id]: http(),
  },
});
