import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Token from "./infra/token.js";

const token = new Token();
token.init(window);
createApp(App).mount("#app");
