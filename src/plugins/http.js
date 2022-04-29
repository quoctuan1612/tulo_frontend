import axios from "axios";

const http = axios;

export default (Vue, { store }) => {
  /**
   * interceptors of request
   * Insert in the processing of all requests
   */
  http.interceptors.request.use(
    config => {
      // Debug Information
      Vue.$log.debug("Start Request HTTP", config);

      if (config.timeout) {
        store.commit("global/set_http_loading_quiet", true, { root: true });
      } else {
        store.commit("global/set_http_loading", true, { root: true });
      }

      return config;
    },
    error => {
      store.commit("global/set_http_error", true);

      return error;
    }
  );

  /**
   * response of request
   * Inserted in the processing of all responses
   */
  http.interceptors.response.use(
    response => {
      /**
       * http response 200
       */
      Vue.$log.debug("HTTP response", response);

      // Clear errors
      store.commit("global/delete_error_messages");

      if (response.config.timeout) {
        store.commit("global/set_http_loading_quiet", false, { root: true });
      } else {
        store.commit("global/set_http_loading", false, { root: true });
      }

      if (response.data.vue_http_use_response) {
        delete response.data.vue_http_use_response;

        return Promise.resolve(response);
      } else {
        return Promise.resolve(response.data);
      }
    },
    async error => {
      // Clear the error
      store.commit("global/delete_error_messages");

      if (http.isCancel(error)) {
        Vue.$log.debug("HTTP cancel");

        return Promise.reject(error);
      } else if (error.code && error.code === "ECONNABORTED") {
        Vue.$log.debug("HTTP timeout", error);

        store.commit("global/set_http_loading_quiet", false, { root: true });
      } else {
        Vue.$log.debug("HTTP response", error.response);

        /**
         * When a network error occurs
         */
        if (error.response === undefined) {
          Vue.toasted.global.error({
            message:
              "Please try again at a later time. If the problem persists, please contact your system administrator."
          });

          // Loading finished
          if (store.state.global.http_loading > 0)
            store.commit("global/set_http_loading", false, { root: true });
          if (store.state.global.http_loading_quiet > 0)
            store.commit("global/set_http_loading_quiet", false, {
              root: true
            });

          return Promise.reject(error);
        }

        // Loading change
        if (error.response.config.timeout) {
          store.commit("global/set_http_loading_quiet", false, { root: true });
        } else {
          store.commit("global/set_http_loading", false, { root: true });
        }

        /**
         * http response 400
         */
        if (error.response.status === 400) {
          store.commit("global/set_error_messages", error.response.data);

          return Promise.reject(error);
        }

        /**
         * http response 404
         */
        if (error.response.status === 404) {
          store.commit("global/set_error_messages", error.response.data);

          return Promise.reject(error);
        }

        /**
         * http response 415
         */
        if (error.response.status === 415) {
          Vue.toasted.global.error({
            message:
              "415 Unsupported Media Type：" +
              error.response.request.responseURL
          });

          return Promise.reject(error);
        }

        /**
         * http response 422
         */
        if (error.response.status === 422) {
          store.commit("global/set_error_messages", error.response.data);

          return Promise.reject(error);
        }

        /**
         * http response 500
         */
        if (error.response.status === 500) {
          Vue.toasted.global.error({
            message:
              "Internal Server Error：" + error.response.request.responseURL
          });

          return Promise.reject(error);
        }

        /**
         * http response 521
         */
        if (error.response.status === 521) {
          Vue.toasted.global.error({
            message: "Web server is down：" + error.response.request.responseURL
          });

          return Promise.reject(error);
        }
      }
    }
  );

  http.defaults.baseURL = process.env.VUE_APP_REST_API_URL_BASE;

  Vue.http = http;
  Object.defineProperties(Vue.prototype, {
    $http: {
      get() {
        return http;
      }
    }
  });
};
