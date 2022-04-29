import Vue from "vue";

export const employees = {
  namespaced: true,

  state: () => ({
    api: "employees/v1/",

    employees_data: [],
    employee_data: []
  }),

  mutations: {
    set_employees_data(state, employees) {
      state.employees_data = employees;
    },

    set_employee_data(state, employee) {
      state.employee_data = employee;
    }
  },

  getters: {
    get_employees_data(state) {
      return state.employees_data;
    },

    get_employee_data(state) {
      return state.employee_data;
    }
  },

  actions: {
    async get_employees({ commit, state }) {
      Vue.$log.debug("get_employees");

      return Vue.http.get(state.api + "employees").then(
        response => {
          Vue.$log.debug("employees", response.employees);
          commit("set_employees_data", response.employees);
        },
        error => {
          Vue.$log.debug(error);
        }
      );
    },

    async upsert_employee({ state }, params) {
      Vue.$log.debug("upsert_employee");

      return Vue.http.post(state.api + "employees", params).then(
        response => {
          Vue.$log.debug(response);
          if (params.id === undefined) {
            Vue.toasted.global.success({
              message: "Thêm mới nhân viên thành công"
            });
          } else {
            Vue.toasted.global.success({
              message: "Cập nhật nhân viên thành công"
            });
          }
        },
        error => {
          return Promise.reject(error);
        }
      );
    },

    async get_employee({ commit, state }, params) {
      Vue.$log.debug("get_employee");

      return Vue.http.get(state.api + "employees/" + params).then(
        response => {
          Vue.$log.debug("employees", response);
          commit("set_employee_data", response);
        },
        error => {
          Vue.$log.debug(error);
        }
      );
    },

    async delete_employee({ state }, params) {
      Vue.$log.debug("delete_employee");

      return Vue.http.delete(state.api + "employees/" + params).then(
        response => {
          Vue.$log.debug(response);
          Vue.toasted.global.success({
            message: "Xóa nhân viên thành công"
          });
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  }
};
