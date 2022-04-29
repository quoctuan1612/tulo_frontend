import Vue from "vue";
import router from "./../router";
import CryptoJS from "crypto-js";

const STORAGE_KEY = "id_token";
const KEY = "mcjiypw7yixami3e4z5875uu5h7r83ze";
const IV = "s6ftmky7hetb2pyw";

export const common = {
  namespaced: true,

  state: () => ({
    api: "common/v1/",

    current_user: null,

    roles_data: [],
    role_data: {},

    masters_data: {
      master_countries: [],
      master_provinces: [],
      master_districts: [],
      master_wards: []
    },

    permissions_data: [],
    permission_data: {
      permission: {},
      permission_details: []
    },

    users_data: [],
    user_data: []
  }),

  mutations: {
    set_roles_data(state, roles) {
      state.roles_data = roles;
    },

    set_role_data(state, role) {
      state.role_data = role;
    },

    set_master_data(state, data) {
      state.masters_data.master_countries = data.master_countries;
      state.masters_data.master_provinces = data.master_provinces;
      state.masters_data.master_districts = data.master_districts;
    },

    set_master_wards_data(state, data) {
      state.masters_data.master_wards = data.master_wards;
    },

    set_permissions_data(state, permissions) {
      state.permissions_data = permissions;
    },

    set_permission_data(state, response) {
      state.permission_data.permission = response.permission;
      state.permission_data.permission_details = response.permission_details;
    },

    set_users_data(state, users) {
      state.users_data = users;
    },

    set_user_data(state, user) {
      state.user_data = user;
    },

    set_login(state, user) {
      Vue.http.defaults.headers.common[
        "authorization"
      ] = `Bearer ${user.auth_token}`;

      state.current_user = user;

      try {
        localStorage.setItem(
          STORAGE_KEY,
          CryptoJS.AES.encrypt(
            JSON.stringify(user),
            CryptoJS.enc.Utf8.parse(KEY),
            {
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7,
              iv: CryptoJS.enc.Utf8.parse(IV)
            }
          ).toString()
        );
      } catch (e) {
        Vue.$log.error(e);
      }
    },

    set_logout(state) {
      Vue.http.defaults.headers.common["authorization"] = null;

      state.current_user = null;

      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        Vue.$log.error(e);
      }
    }
  },

  getters: {
    get_roles_data(state) {
      return state.roles_data;
    },

    get_role_data(state) {
      return state.role_data;
    },

    get_common_master_object: state => (table_name, id) => {
      const { masters_data = {} } = state;
      if (masters_data[table_name]) {
        return state.masters_data[table_name].find(obj => obj.id == id) || {};
      } else {
        return {};
      }
    },

    get_common_master_name: (_, getters) => (table_name, id) => {
      const { get_common_master_object } = getters;
      const { name = "" } = get_common_master_object(table_name, id);
      return name;
    },

    get_master_countries_data(state) {
      return state.masters_data.master_countries;
    },

    get_master_provinces_data(state) {
      return state.masters_data.master_provinces;
    },

    get_master_districts_data(state) {
      return state.masters_data.master_districts;
    },

    get_master_wards_data(state) {
      return state.masters_data.master_wards;
    },

    get_permissions_data(state) {
      return state.permissions_data;
    },

    get_permission_data(state) {
      return state.permission_data;
    },

    get_users_data(state) {
      return state.users_data;
    },

    get_user_data(state) {
      return state.user_data;
    },

    get_current_user(state) {
      return state.current_user;
    }
  },

  actions: {
    // Login
    async get_login({ commit, state }, params) {
      Vue.$log.debug("get_login");

      return Vue.http.get(state.api + "users/login", { params }).then(
        response => {
          commit("set_login", response.user);

          router.push("/", () => {});

          Vue.toasted.global.success({
            message: "Đăng nhập thành công!"
          });
        },
        error => {
          return Promise.reject(error);
        }
      );
    },

    // Logout
    async get_logout({ commit }) {
      Vue.$log.debug("get_logout");

      commit("set_logout");

      router.push("/login", () => {});
    },

    // Role
    async get_roles({ commit, state }) {
      Vue.$log.debug("get_roles");

      return Vue.http.get(state.api + "roles").then(
        response => {
          Vue.$log.debug("roles", response.roles);
          commit("set_roles_data", response.roles);
        },
        error => {
          Vue.$log.debug(error);
        }
      );
    },

    async upsert_role({ state }, params) {
      Vue.$log.debug("upsert_role");

      return Vue.http.post(state.api + "roles", params).then(
        response => {
          Vue.$log.debug(response);
          if (params.id === undefined) {
            Vue.toasted.global.success({
              message: "Thêm mới chức vụ thành công"
            });
          } else {
            Vue.toasted.global.success({
              message: "Cập nhật chức vụ thành công"
            });
          }
        },
        error => {
          return Promise.reject(error);
        }
      );
    },

    async get_role({ commit, state }, params) {
      Vue.$log.debug("get_role");

      return Vue.http.get(state.api + "roles/" + params).then(
        response => {
          Vue.$log.debug("role", response);
          commit("set_role_data", response);
        },
        error => {
          Vue.$log.debug(error);
        }
      );
    },

    async delete_role({ state }, params) {
      Vue.$log.debug("delete_role");

      return Vue.http.delete(state.api + "roles/" + params).then(
        response => {
          Vue.$log.debug(response);
          Vue.toasted.global.success({
            message: "Xóa chức vụ thành công"
          });
        },
        error => {
          return Promise.reject(error);
        }
      );
    },

    // Countrie Province District Ward
    async get_countries_provinces_districts({ commit, state }) {
      Vue.$log.debug("get_countries_provinces_districts");

      return Vue.http
        .get(state.api + "master/countries_provinces_districts")
        .then(
          response => {
            Vue.$log.debug("get_countries_provinces_districts", response);
            commit("set_master_data", response);
          },
          error => {
            Vue.$log.debug(error);
          }
        );
    },

    async get_wards({ commit, state }, params) {
      Vue.$log.debug("get_wards");

      return Vue.http
        .get(state.api + "master/wards?district_id=" + params)
        .then(
          response => {
            Vue.$log.debug("wards", response);
            commit("set_master_wards_data", response);
          },
          error => {
            Vue.$log.debug(error);
          }
        );
    },

    // Permission
    async get_permissions({ commit, state }) {
      Vue.$log.debug("get_permissions");

      return Vue.http.get(state.api + "permissions").then(
        response => {
          Vue.$log.debug("permissions", response.permissions);
          commit("set_permissions_data", response.permissions);
        },
        error => {
          Vue.$log.debug(error);
        }
      );
    },

    async upsert_permission({ state }, params) {
      Vue.$log.debug("upsert_permission");

      return Vue.http.post(state.api + "permissions", params).then(
        response => {
          Vue.$log.debug(response);
          console.log(params.permission);
          if (params.permission[0].id === undefined) {
            Vue.toasted.global.success({
              message: "Thêm mới nhóm quyền thành công"
            });
          } else {
            Vue.toasted.global.success({
              message: "Cập nhật nhóm quyền thành công"
            });
          }
        },
        error => {
          return Promise.reject(error);
        }
      );
    },

    async get_permission({ commit, state }, params) {
      Vue.$log.debug("get_permission");

      return Vue.http.get(state.api + "permissions/" + params).then(
        response => {
          Vue.$log.debug("permission", response);
          commit("set_permission_data", response);
        },
        error => {
          Vue.$log.debug(error);
        }
      );
    },

    async delete_permission({ state }, params) {
      Vue.$log.debug("delete_permission");

      return Vue.http.delete(state.api + "permissions/" + params).then(
        response => {
          Vue.$log.debug(response);
          Vue.toasted.global.success({
            message: "Xóa nhóm quyền thành công"
          });
        },
        error => {
          return Promise.reject(error);
        }
      );
    },

    // User
    async get_users({ commit, state }) {
      Vue.$log.debug("get_users");

      return Vue.http.get(state.api + "users").then(
        response => {
          Vue.$log.debug("users", response.users);
          commit("set_users_data", response.users);
        },
        error => {
          Vue.$log.debug(error);
        }
      );
    },

    async upsert_user({ state }, params) {
      Vue.$log.debug("upsert_user");

      return Vue.http.post(state.api + "users", params).then(
        response => {
          Vue.$log.debug(response);
          if (params.id === undefined) {
            Vue.toasted.global.success({
              message: "Thêm mới tài khoản thành công"
            });
          } else {
            Vue.toasted.global.success({
              message: "Cập nhật tài khoản thành công"
            });
          }
        },
        error => {
          return Promise.reject(error);
        }
      );
    },

    async get_user({ commit, state }, params) {
      Vue.$log.debug("get_user");

      return Vue.http.get(state.api + "users/" + params).then(
        response => {
          Vue.$log.debug("user", response);
          commit("set_user_data", response);
        },
        error => {
          Vue.$log.debug(error);
        }
      );
    },

    async delete_user({ state }, params) {
      Vue.$log.debug("delete_user");

      return Vue.http.delete(state.api + "users/" + params).then(
        response => {
          Vue.$log.debug(response);
          Vue.toasted.global.success({
            message: "Xóa tài khoản thành công"
          });
        },
        error => {
          return Promise.reject(error);
        }
      );
    }
  }
};
