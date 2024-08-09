import { CHAIN } from "../utils/constant";
import { useUtils } from "./useUtils";
const { toHex } = useUtils();

export const useWebWallet = () => {
  const chainBNB = "0x61";

  function isMetaMask() {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  }

  function isBNB() {
    return window.ethereum.chainId === toHex(CHAIN.ID);
  }

  async function connect() {
    if (!isMetaMask()) return null;
    const address = (
      await window.ethereum.request({ method: "eth_requestAccounts" })
    )[0];
    if (!address) return null;
    if (!isBNB()) {
      const result = await changeChain();
      if (!result) return null;
    }
    return address;
  }

  async function changeChain(id = toHex(CHAIN.ID)) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: id }],
      });
      return true;
    } catch (error) {
      console.log(error.code);
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: id,
                chainName: CHAIN.NAME,
                rpcUrls: CHAIN.RPC_URLS,
                nativeCurrency: {
                  name: CHAIN.CURRENCY_NAME,
                  symbol: CHAIN.CURRENCY_SYMBOL,
                  decimals: CHAIN.CURRENCY_DECIMALS,
                },
              },
            ],
          });
          return true;
        } catch (_) {
          return false;
        }
      }
    }
  }

  return { isBNB, isMetaMask, changeChain, connect };
};
