<script setup>
import { useAccount, useDisconnect, useWriteContract } from "@wagmi/vue";
import { Logo, ModalConnect } from "./components";
import { abi, contract } from "./contracts/Token";
const { isConnected } = useAccount();
const { disconnect } = useDisconnect();
const { writeContract } = useWriteContract();
async function faucet() {
  writeContract({
    abi: abi,
    address: contract,
    functionName: "mint",
    args: [2000n],
  });
}
</script>
<!-- prettier-ignore -->
<template>
  <main class="l-main">
    <header class="l-header u-flex-line u-flex-line-center">
      <a class="l-header__logo" href="https://sograph.app/#/"><logo/></a>
      <nav class="l-header__nav u-flex-line">
        <a class="l-header__nav-item" target="_blank" href="https://sograph.app/#/">App</a>
        <a class="l-header__nav-item" target="_blank" href="https://vote.sograph.app/#/">Vote</a>
        <a class="l-header__nav-item" target="_blank" href="https://docs.sograph.app/#/">Docs</a>
      </nav>
      <button type="button" class="c-chain u-flex-line-center"><span></span>BSC Testnet</button>
      <button v-if="isConnected" @click="disconnect()" type="button" class="l-header__button">Disconnect</button>
    </header>
    <div class="l-main__content u-flex-line-center">
      <modal-connect v-if="!isConnected"/>
      <button v-else @click="faucet" class="c-button">Claim 2000 Graph</button>
    </div>
  </main>
</template>
