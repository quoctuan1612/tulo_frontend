<template>
  <v-dialog v-model="value" max-width="700px" persistent>
    <v-card>
      <v-toolbar
        flat
        class="body-2 font-weight-bold mb-3"
        color="grey lighten-2"
      >
        <span class="title-form">Cập nhật thông tin người dùng</span>
      </v-toolbar>

      <v-card-text>
        <v-form class="px-3">
          <v-text-field
            label="Tên nhân viên"
            :value="employee_name_data"
            disabled
            outlined
          ></v-text-field>
          <v-text-field
            label="Tài khoản"
            :value="user_data.user_name"
            disabled
            outlined
          ></v-text-field>
          <v-text-field
            v-model="user_data.password"
            :rules="[rules.required, rules.password]"
            label="Mật khẩu"
            :append-icon="show ? 'fa fa-eye' : 'fa fa-eye-slash'"
            :type="show ? 'text' : 'password'"
            @click="show = !show"
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
        <v-btn depressed color="error" @click="save">
          Cập nhật
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
   * props
   */
  props: {
    value: Boolean
  },

  /**
   * data
   */
  data: () => ({
    show: false,
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
    ...mapGetters("common", ["get_user_data"]),
    ...mapGetters("employees", ["get_employee_data"]),

    user_data() {
      return this.get_user_data;
    },

    employee_name_data() {
      return `${this.get_employee_data.first_name} ${this.get_employee_data.last_name}`;
    },

    dialog: {
      get: function() {
        return this.value;
      },
      set: function(newValue) {
        this.$emit("input", newValue);
      }
    }
  },

  /**
   * methods
   */
  methods: {
    ...mapActions("common", ["upsert_user", "get_users"]),

    close() {
      this.dialog = false;
    },

    async save() {
      try {
        let { id, employee_id, user_name, password } = this.user_data;
        this.user = {
          id: id,
          employee_id: employee_id,
          user_name: user_name,
          password: password
        };

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

<style scoped>
.title-form {
  font-size: 20px;
}
</style>
