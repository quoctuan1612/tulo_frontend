import Vue from "vue";

export const documents = {
  namespaced: true,

  state: () => ({
    api: "documents/v1/",
    headers: { "Content-Type": "multipart/form-data" },

    document_destinations_data: [],
    document_destination_data: [],
    document_processing_times_data: [],
    document_processing_time_data: [],
    document_types_data: [],
    documents_incoming_data: [],
    document_incoming_data: [],
    document_incoming_file_data: null
  }),

  mutations: {
    set_document_destinations_data(state, document_destinations_data) {
      state.document_destinations_data = document_destinations_data;
    },

    set_document_destination_data(state, document_destination_data) {
      state.document_destination_data = document_destination_data;
    },

    set_document_processing_times_data(state, document_processing_times_data) {
      state.document_processing_times_data = document_processing_times_data;
    },

    set_document_processing_time_data(state, document_processing_time_data) {
      state.document_processing_time_data = document_processing_time_data;
    },

    set_document_types_data(state, document_types_data) {
      state.document_types_data = document_types_data;
    },

    set_documents_incoming_data(state, documents_incoming_data) {
      state.documents_incoming_data = documents_incoming_data;
    },

    set_document_incoming_data(state, document_incoming_data) {
      state.document_incoming_data = document_incoming_data;
    },

    set_document_incoming_file_data(state, document_incoming_file_data) {
      state.document_incoming_file_data = document_incoming_file_data;
    },

    set_document_incoming_file_data_null(state) {
      state.document_incoming_file_data = null;
    }
  },

  getters: {
    get_document_destinations_data(state) {
      return state.document_destinations_data;
    },

    get_document_destination_data(state) {
      return state.document_destination_data;
    },

    get_document_processing_times_data(state) {
      return state.document_processing_times_data;
    },

    get_document_processing_time_data(state) {
      return state.document_processing_time_data;
    },

    get_document_types_data(state) {
      return state.document_types_data;
    },

    get_documents_incoming_data(state) {
      return state.documents_incoming_data;
    },

    get_document_incoming_data(state) {
      return state.document_incoming_data;
    },

    get_document_incoming_file_data(state) {
      return state.document_incoming_file_data;
    }
  },

  actions: {
    // Document Destination
    async get_document_destinations({ commit, state }) {
      Vue.$log.debug("get_document_destinations");

      return Vue.http.get(state.api + "document_destinations").then(
        response => {
          Vue.$log.debug(
            "document_destinations",
            response.document_destinations
          );
          commit(
            "set_document_destinations_data",
            response.document_destinations
          );
        },
        error => {
          Vue.$log.debug(error);
        }
      );
    },

    async upsert_document_destination({ state }, params) {
      Vue.$log.debug("upsert_document_destination");

      return Vue.http.post(state.api + "document_destinations", params).then(
        response => {
          Vue.$log.debug(response);
          if (params.id === undefined) {
            Vue.toasted.global.success({
              message: "Thêm mới nơi đến thành công"
            });
          } else {
            Vue.toasted.global.success({
              message: "Cập nhật nơi đến thành công"
            });
          }
        },
        error => {
          return Promise.reject(error);
        }
      );
    },

    async get_document_destination({ commit, state }, params) {
      Vue.$log.debug("get_document_destination");

      return Vue.http.get(state.api + "document_destinations/" + params).then(
        response => {
          Vue.$log.debug("document_destinations", response);
          commit("set_document_destination_data", response);
        },
        error => {
          Vue.$log.debug(error);
        }
      );
    },

    async delete_document_destination({ state }, params) {
      Vue.$log.debug("delete_document_destination");

      return Vue.http
        .delete(state.api + "document_destinations/" + params)
        .then(
          response => {
            Vue.$log.debug(response);
            Vue.toasted.global.success({
              message: "Xóa nơi đến thành công"
            });
          },
          error => {
            return Promise.reject(error);
          }
        );
    },

    // Document Processing Time
    async get_document_processing_times({ commit, state }) {
      Vue.$log.debug("get_document_processing_times");

      return Vue.http.get(state.api + "document_processing_times").then(
        response => {
          Vue.$log.debug(
            "document_processing_times",
            response.document_processing_times
          );
          commit(
            "set_document_processing_times_data",
            response.document_processing_times
          );
        },
        error => {
          Vue.$log.debug(error);
        }
      );
    },

    async upsert_document_processing_time({ state }, params) {
      Vue.$log.debug("upsert_document_processing_time");

      return Vue.http
        .post(state.api + "document_processing_times", params)
        .then(
          response => {
            Vue.$log.debug(response);
            if (params.id === undefined) {
              Vue.toasted.global.success({
                message: "Thêm mới thời hạn xử lý văn bản đến thành công"
              });
            } else {
              Vue.toasted.global.success({
                message: "Cập nhật thời hạn xử lý văn bản đến thành công"
              });
            }
          },
          error => {
            return Promise.reject(error);
          }
        );
    },

    async get_document_processing_time({ commit, state }, params) {
      Vue.$log.debug("get_document_processing_time");

      return Vue.http
        .get(state.api + "document_processing_times/" + params)
        .then(
          response => {
            Vue.$log.debug("document_processing_time", response);
            commit("set_document_processing_time_data", response);
          },
          error => {
            Vue.$log.debug(error);
          }
        );
    },

    async delete_document_processing_time({ state }, params) {
      Vue.$log.debug("delete_document_processing_time");

      return Vue.http
        .delete(state.api + "document_processing_times/" + params)
        .then(
          response => {
            Vue.$log.debug(response);
            Vue.toasted.global.success({
              message: "Xóa thời hạn xử lý văn bản đến thành công"
            });
          },
          error => {
            return Promise.reject(error);
          }
        );
    },

    // Document Type
    async get_document_types({ commit, state }) {
      Vue.$log.debug("get_document_types");

      return Vue.http.get(state.api + "document_types").then(
        response => {
          Vue.$log.debug("document_types", response.document_types);
          commit("set_document_types_data", response.document_types);
        },
        error => {
          Vue.$log.debug(error);
        }
      );
    },

    // Document Incoming
    async get_documents_incoming({ commit, state }) {
      Vue.$log.debug("get_documents_incoming");

      return Vue.http.get(state.api + "documents_incoming").then(
        response => {
          Vue.$log.debug("documents_incoming", response.documents_incoming);
          commit("set_documents_incoming_data", response.documents_incoming);
        },
        error => {
          Vue.$log.debug(error);
        }
      );
    },

    async get_document_incoming({ commit, state }, params) {
      Vue.$log.debug("get_document_incoming");

      return Vue.http.get(state.api + "documents_incoming/" + params).then(
        response => {
          Vue.$log.debug("document_incoming", response);
          commit("set_document_incoming_data", response);
        },
        error => {
          Vue.$log.debug(error);
        }
      );
    },

    async upsert_document_incoming({ state }, params) {
      Vue.$log.debug("upsert_document_incoming");

      return Vue.http
        .post(state.api + "documents_incoming", params, state.headers)
        .then(
          response => {
            Vue.$log.debug(response);
            if (params.id === undefined) {
              Vue.toasted.global.success({
                message: "Thêm mới văn bản đến thành công"
              });
            } else {
              Vue.toasted.global.success({
                message: "Cập nhật văn bản đến thành công"
              });
            }
          },
          error => {
            return Promise.reject(error);
          }
        );
    },

    async delete_document_incoming({ state }, params) {
      Vue.$log.debug("delete_document_incoming");

      return Vue.http.delete(state.api + "documents_incoming/" + params).then(
        response => {
          Vue.$log.debug(response);
          Vue.toasted.global.success({
            message: "Xóa văn bản đến thành công"
          });
        },
        error => {
          return Promise.reject(error);
        }
      );
    },

    async download_document_incoming({ state }, params) {
      Vue.$log.debug("download_document_incoming");

      return Vue.http
        .get(
          state.api +
            `documents_incoming/download_file/?file_path=${params.file_path}`,
          { responseType: "blob" }
        )
        .then(
          response => {
            Vue.$log.debug(response);

            let fileURL = window.URL.createObjectURL(
              new Blob([response], {
                type:
                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              })
            );
            let fileLink = document.createElement("a");

            fileLink.href = fileURL;
            fileLink.setAttribute("download", params.file_name);
            document.body.appendChild(fileLink);

            fileLink.click();
          },
          error => {
            return Promise.reject(error);
          }
        );
    },

    async get_document_incoming_file({ commit, state }, params) {
      Vue.$log.debug("get_document_incoming_file");

      return Vue.http
        .get(
          state.api +
            `documents_incoming/download_file/?file_path=${params.file_path}`,
          { responseType: "blob" }
        )
        .then(
          response => {
            Vue.$log.debug(response);

            let blob = new Blob([response], {
              type:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            });
            let file = new File([blob], params.file_name);
            commit("set_document_incoming_file_data", file);
          },
          error => {
            return Promise.reject(error);
          }
        );
    }
  }
};
