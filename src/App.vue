<script setup>
import { ref } from "vue";
import { useWebWallet } from "./composables/useWebWallet.js";
import Token from "./infra/token.js";
import Logo from "./components/logo.vue";

const { connect } = useWebWallet();
const wallet = ref(null);

async function handleConnect() {
  const address = await connect();
  if (!address) return;
  wallet.value = address;
}

async function faucet() {
  const token = new Token();
  await token.faucet();
}
</script>
<!-- prettier-ignore -->
<template>
  <main class="l-main">
    <header class="l-header u-flex-line u-flex-line-center">
      <a class="l-header__logo" href="https://sograph.app/#/">
        <logo/>
      </a>
      <nav class="l-header__nav u-flex-line">
        <a class="l-header__nav-item" href="#">Faucet</a>
        <a class="l-header__nav-item" href="https://vote.sograph.app/#/">Vote</a>
        <a class="l-header__nav-item c-soon" href="#">Docs</a>
      </nav>
      <button type="button" class="c-chain u-flex-line-center"><span></span>BNBChain Testnet</button>
    </header>
    <div class="l-main__content u-flex-line-center">
      <button v-if="!wallet" @click="handleConnect" class="c-button">Connect</button>
      <button v-else @click="faucet" class="c-button">Claim 2000 Graph</button>
    </div>
  </main>
</template>
