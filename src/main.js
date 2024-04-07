import { createApp } from "vue";
import { createNaverMap } from "vue3-naver-maps";
import vuetify from "./plugins/vuetify";

import App from "./App.vue";

createApp(App)
  .use(createNaverMap, {
    clientId: "bewd9ie2h9", // Required
    category: "ncp", // Optional
    subModules: [], // Optional
  })
  .use(vuetify)
  .mount("#app");
