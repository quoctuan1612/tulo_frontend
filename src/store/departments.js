import Vue from "vue";

export const departments = {
  namespaced: true,

  state: () => ({
    api: "departments/v1/",

    departments_data: [],
    department_data: []
  }),

  mutations: {
    set_departments_data(state, departments) {
      state.departments_data = departments;
    },

    set_department_data(state, department) {
      state.department_data = department;
    }
  },

  getters: {
    get_departments_data(state) {
      return state.departments_data;
    },

    get_department_data(state) {
      return state.department_data;
    }
  },

  actions: {
    async get_departments({ commit, state }) {
      Vue.$log.debug("get_departments");

      return Vue.http.get(state.api + "departments").then(
        response => {
          Vue.$log.debug("departments", response.departments);
          commit("set_departments_data", response.departments);
        },
        error => {
          Vue.$log.debug(error);
        }
      );
    },

    async upsert_department({ state }, params) {
      Vue.$log.debug("upsert_department");

      return Vue.http.post(state.api + "departments", params).then(
        response => {
          Vue.$log.debug(response);
          if (params.id === undefined) {
            Vue.toasted.global.success({
              message: "Thêm mới phòng ban thành công"
            });
          } else {
            Vue.toasted.global.success({
              message: "Cập nhật phòng ban thành công"
            });
          }
        },
        error => {
          return Promise.reject(error);
        }
      );
    },

    async get_department({ commit, state }, params) {
      Vue.$log.debug("get_department");

      return Vue.http.get(state.api + "departments/" + params).then(
        response => {
          Vue.$log.debug("department", response);
          commit("set_department_data", response);
        },
        error => {
          Vue.$log.debug(error);
        }
      );
    },

    async delete_department({ state }, params) {
      Vue.$log.debug("delete_department");

      return Vue.http.delete(state.api + "departments/" + params).then(
        response => {
          Vue.$log.debug(response);
          Vue.toasted.global.success({
            message: "Xóa phòng ban thành công"
          });
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  }
};
