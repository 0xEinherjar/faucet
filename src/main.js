import { createApp } from "vue";
import { WagmiPlugin } from "@wagmi/vue";
import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";
import { config } from "./wagmi.js";
import App from "./App.vue";
import "./style.css";

const queryClient = new QueryClient();
const app = createApp(App);
app.use(WagmiPlugin, { config });
app.use(VueQueryPlugin, { queryClient });
app.mount("#app");
