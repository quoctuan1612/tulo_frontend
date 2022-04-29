import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import http from "./plugins/http";
import VueLogger from "vuejs-logger";
import toasted from "vue-toasted";
import GlobalMixin from "@/plugins/mixins";

Vue.config.productionTip = false;

/**
 * axios
 */
Vue.use(http, { store });

/**
 * logger
 */
const isProduction = process.env.NODE_ENV === "production";
const options = {
  isEnabled: true,
  logLevel: isProduction ? "fatal" : "debug",
  stringifyArguments: false,
  showLogLevel: true,
  showMethodName: true,
  separator: "<<<",
  showConsoleColors: true
};
Vue.use(VueLogger, options);

/**
 * vue-toasted
 */
Vue.use(toasted, {
  fullWidth: true,
  position: "top-center",
  duration: 1500,
  singleton: false,
  iconPack: "fontawesome"
});

// register the toast with the custom message
Vue.toasted.register(
  "error",
  payload => {
    return payload.message;
  },
  {
    keepOnHover: true,
    duration: null,
    type: "error",
    icon: "error_outline"
  }
);
Vue.toasted.register(
  "load",
  payload => {
    return payload.message;
  },
  {
    duration: null,
    type: "info",
    icon: "cached"
  }
);
Vue.toasted.register(
  "success",
  payload => {
    return payload.message;
  },
  {
    type: "success",
    icon: "check-circle"
  }
);
Vue.toasted.register(
  "warning",
  payload => {
    return payload.message;
  },
  {
    duration: null,
    type: "warning",
    icon: "warning",
    className: "warning"
  }
);

/**
 * Global mixin
 */
Vue.mixin(GlobalMixin);

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  beforeMount() {
    this.$store.dispatch("userRestoration");
  }
}).$mount("#app");
