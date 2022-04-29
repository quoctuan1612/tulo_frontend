import Vue from "vue";
import _ from "lodash";

export const global = {
  namespaced: true,

  state: () => ({
    /**
     * http loading
     */
    http_loading: 0,

    /**
     * http loading quiet
     */
    http_loading_quiet: 0,

    /**
     * http error
     */
    http_error: false,

    /**
     * Store the response returned at 400
     */
    error_messages: { details: [], messages: [] },

    /**
     * rules
     */
    rules: {
      required: value => !!value || "Please enter",
      min: v => v.length >= 8 || "Min 8 characters"
    }
  }),

  mutations: {
    /**
     * Loading change
     * @param state
     * @param isLoading
     */
    set_http_loading(state, isLoading) {
      if (isLoading) {
        state.http_loading = state.http_loading + 1;
      } else {
        state.http_loading = state.http_loading - 1;
      }
    },

    /**
     * Loading change
     * @param state
     * @param isLoading
     */
    set_http_loading_quiet(state, isLoading) {
      if (isLoading) {
        state.http_loading_quiet = state.http_loading_quiet + 1;
      } else {
        state.http_loading_quiet = state.http_loading_quiet - 1;
      }
    },

    /**
     * axios error occurs
     *
     * @param state
     * @param error
     */
    set_http_error(state, error) {
      Vue.$log.error(error);
      state.http_error = true;
    },

    /**
     * Store 400 errors and refer to them from various places
     *
     * @param state
     * @param error_messages
     */
    set_error_messages(state, error_messages) {
      state.error_messages = error_messages;
    },

    /**
     * Remove 400 errors
     *
     * @param state
     */
    delete_error_messages(state) {
      state.error_messages = { details: [], messages: [] };
    }
  },

  getters: {
    /**
     * Returns an array of errors
     */
    v_error: state => (...args) => {
      if (state.error_messages && state.error_messages.details) {
        let index = state.error_messages.details.findIndex(k =>
          args.includes(k.field_name)
        );
        if (index >= 0) {
          return state.error_messages.details[index].field_messages;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },

    /**
     * Returns an array of errors as a simple array
     */
    v_error_f: state => (...args) => {
      if (state.error_messages && state.error_messages.details) {
        let index = state.error_messages.details.findIndex(k =>
          args.includes(k.field_name)
        );
        if (index >= 0) {
          return _.flattenDeep(
            state.error_messages.details[index].field_messages
          );
        } else {
          return null;
        }
      } else {
        return null;
      }
    },

    /**
     * Returns an array of errors as a simpler array
     */
    v_error_ff: state => name => {
      if (state.error_messages && state.error_messages.details) {
        let index = state.error_messages.details.findIndex(
          k => k.field_name == name
        );
        if (index >= 0) {
          return _.flattenDeep(
            _.flattenDeep(state.error_messages.details[index].field_messages)
          );
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
  }
};
