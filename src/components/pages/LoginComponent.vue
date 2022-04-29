<template>
  <v-app>
    <v-main>
      <div class="login_wrapper">
        <div class="login-form">
          <section class="login_content">
            <v-form>
              <h1>Đăng nhập</h1>
              <v-text-field
                ref="user_name"
                label="Tên đăng nhập"
                v-model="user_name"
                :rules="[rules.required]"
                :error-messages="v_error('user_name')"
                @keydown.enter.prevent="login"
                dense
                outlined
              ></v-text-field>
              <v-text-field
                ref="password"
                label="Mật khẩu"
                v-model="password"
                :rules="[rules.required]"
                :append-icon="show ? 'fa-eye' : 'fa-eye-slash'"
                :type="show ? 'text' : 'password'"
                :error-messages="v_error('password')"
                @click:append="show = !show"
                @keydown.enter.prevent="login"
                dense
                outlined
              ></v-text-field>
              <v-btn @click="login">Đăng nhập</v-btn>
              <div class="clearfix"></div>
              <v-icon>fa-paw</v-icon>
            </v-form>
          </section>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
/**
 * import
 */
import { mapActions } from "vuex";

/**
 * Vue
 */
export default {
  /**
   * data
   */
  data: () => ({
    user_name: "",
    password: "",
    show: false,
    formHasErrors: false,
    rules: {
      required: value => !!value || "Không được để trống."
    }
  }),

  /**
   * computed
   */
  computed: {
    form() {
      return {
        user_name: this.user_name,
        password: this.password
      };
    }
  },

  /**
   * methods
   */
  methods: {
    ...mapActions("common", ["get_login"]),

    validate_form() {
      this.formHasErrors = false;

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });
    },

    async login() {
      try {
        this.validate_form();
        let params = {
          user_info: this.user_name,
          password: this.password
        };

        if (!this.formHasErrors) {
          await this.get_login(params);
        }
      } catch (error) {
        this.$log.debug(error);
      }
    }
  }
};
</script>

<style scoped>
.v-app {
  position: relative !important;
}
.v-btn {
  background-color: rgb(108, 117, 126) !important;
  color: #fff;
  letter-spacing: -0.05em;
  line-height: 1.5;
}
.v-main {
  background-color: rgb(247, 247, 247) !important;
  position: relative !important;
}
.v-form {
  margin: 20px 0;
  position: relative;
  display: block;
  margin-block-end: 1em;
}
div {
  display: block;
}
.login_wrapper {
  right: 0px;
  margin: 0px auto;
  margin-top: 5%;
  max-width: 350px;
  position: relative;
}
.login_form {
  position: absolute;
  top: 0px;
  width: 100%;
}
.login_content {
  margin: 0 auto;
  padding: 25px 0 0;
  position: relative;
  text-align: center;
  text-shadow: 0 1px 0 #fff;
  min-width: 280px;
}
h1 {
  font: normal 25px Helvetica, Arial, sans-serif;
  color: rgb(114, 136, 159);
  letter-spacing: -0.05em;
  line-height: 20px;
  margin: 10px 0 30px;
}
h1:before {
  background: linear-gradient(to left, #7e7e7e 0%, #fff 100%);
  left: 0;
}
h1:after {
  background: linear-gradient(to right, #7e7e7e 0%, #fff 100%);
  right: 0;
}
h1:before,
h1:after {
  content: "";
  height: 1px;
  position: absolute;
  top: 10px;
  width: 20%;
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  border-top: 1px solid rgb(216, 216, 216);
  margin: 18px 0;
}
</style>
