<template>
  <v-dialog v-model="dialog" max-width="700px" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        Thêm mới
      </v-btn>
    </template>
    <v-card>
      <v-toolbar
        flat
        class="body-2 font-weight-bold mb-3"
        color="grey lighten-2"
      >
        <span class="title-form">Thêm mới người dùng</span>
      </v-toolbar>
      <v-card-text>
        <v-form class="px-3">
          <v-select
            v-model="employee_id"
            :items="employees_data"
            item-text="full_name"
            item-value="id"
            label="Nhân viên"
            :rules="[rules.required]"
            outlined
          ></v-select>
          <v-text-field
            v-model="user.user_name"
            :rules="[rules.required]"
            :error-messages="v_error('user_name')"
            label="Tài khoản"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="[rules.required, rules.password]"
            label="Mật khẩu"
            :append-icon="show ? 'fa fa-eye' : 'fa fa-eye-slash'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            outlined
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed color="blue-grey" @click="close">
          Thoát
        </v-btn>
        <v-btn depressed color="success" @click="save">
          Lưu
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/**
 * import
 */
import { mapActions, mapGetters } from "vuex";

/**
 * Vue
 */
export default {
  /**
   * data
   */
  data: () => ({
    dialog: false,
    show: false,
    user: {
      employee_id: null,
      user_name: null,
      password: null
    },
    defaultUser: {
      employee_id: null,
      user_name: null,
      password: null
    },
    employee_id: null,
    rules: {
      required: value => !!value || "Không được để trống.",
      password: value => {
        const pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        return (
          pattern.test(value) ||
          "Mật khẩu của bạn phải có ít nhất 8 ký tự, bao gồm một số, một chữ in, một chữ thường và một ký tự đặc biêt."
        );
      }
    }
  }),

  /**
   * computed
   */
  computed: {
    ...mapGetters("employees", ["get_employees_data"]),
    ...mapGetters("common", ["get_users_data"]),

    employees_data() {
      let employees = this.get_employees_data.filter(employee => {
        if (!this.users_data.includes(employee.id)) {
          return employee;
        }
      });

      let result = employees.map(employee => {
        let { id, first_name, last_name } = employee;
        return { id, full_name: first_name + " " + last_name };
      });

      result.unshift({ id: null, full_name: "" });

      return result;
    },

    users_data() {
      let users = this.get_users_data.map(user => {
        return user.employee_id;
      });

      return users;
    }
  },

  /**
   * methods
   */
  methods: {
    ...mapActions("common", ["upsert_user", "get_users"]),

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.user = Object.assign({}, this.defaultUser);
      });
    },

    // Save
    async save() {
      try {
        this.user.employee_id = this.employee_id;

        await this.upsert_user(this.user);

        await this.get_users();

        this.close();
      } catch (error) {
        this.$log.debug(error);
      }
    }
  }
};
</script>

<style></style>
