import Vue from "vue";
import Vuex from "vuex";
import CryptoJS from "crypto-js";

import { global } from "./global";
import { common } from "./common";
import { departments } from "./departments";
import { employees } from "./employees";
import { documents } from "./documents";

const STORAGE_KEY = "id_token";
const KEY = "mcjiypw7yixami3e4z5875uu5h7r83ze";
const IV = "s6ftmky7hetb2pyw";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    common,
    departments,
    employees,
    documents
  },

  actions: {
    /**
     * Credential restoration
     */
    userRestoration({ commit }) {
      if (localStorage.getItem(STORAGE_KEY)) {
        Vue.$log.info("Restore local storage credentials to Store");

        let user_store = CryptoJS.AES.decrypt(
          localStorage.getItem(STORAGE_KEY),
          CryptoJS.enc.Utf8.parse(KEY),
          {
            mode: CryptoJS.mode.CBC,
            iv: CryptoJS.enc.Utf8.parse(IV),
            padding: CryptoJS.pad.Pkcs7
          }
        ).toString(CryptoJS.enc.Utf8);

        let user = JSON.parse(user_store);

        // Write to store
        commit("common/set_login", user);

        // Get Users
        this.dispatch("common/get_users");
      } else {
        Vue.$log.info("No credentials in local storage");
      }
    }
  }
});
