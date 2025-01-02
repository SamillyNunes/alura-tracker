import { createApp } from "vue";
import App from "./App.vue";

import "@fortawesome/fontawesome-free/css/all.css";
import router from "./router";
import { store, storeKey } from "./store";

createApp(App)
    .use(router)
    .use(store, storeKey)
    .mount("#app");
