<docs>
  # Signup

  # Overview

  # Author
  - Tunigo Ltd.co ThinhNH
</docs>

<template lang="pug">
v-dialog(
  v-model="value",
  :persistent="true",
  transition="dialog-top-transition",
  max-width="600"
)
  v-card(
    tile
  )
    v-toolbar(
      dark
      color="primary"
    )
      v-btn(
        icon
        dark
        @click="close"
      )
        v-icon mdi-close
      v-toolbar-title User Sign Up
    v-card-text
      v-form
        v-text-field(
          label="Username"
          dense
          outlined
          v-model="user_info.user_name"
          :error-messages='v_error("user_name")'
        )
        v-text-field(
          label="Password"
          dense
          outlined
          v-model="user_info.password"
          :error-messages='v_error("password")'
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
        )
        v-text-field(
          label="First Name"
          dense
          outlined
          v-model="user_info.first_name"
          :error-messages='v_error("first_name")'
        )
        v-text-field(
          label="Last Name"
          dense
          outlined
          v-model="user_info.last_name"
          :error-messages='v_error("last_name")'
        )
        v-text-field(
          label="Email"
          dense
          outlined
          v-model="user_info.email"
          :error-messages='v_error("email")'
        )
        v-text-field(
          label="Phone"
          dense
          outlined
          v-model="user_info.phone"
          :error-messages='v_error("phone")'
        )
    v-divider
    v-card-actions
      v-btn(
        @click='signup'
        color="primary"
      ) Signup
      v-spacer
      v-btn(
        @click="close"
      ) Close

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
  data() {
    return {
      show: false,
      user_info: {
        user_name: null,
        password: null,
        first_name: null,
        last_name: null,
        email: null,
        phone: null,
        department_id: null,
        role_id: null,
        reports_to_id: null,
        description: null
      }
    };
  },

  /**
   * props
   */
  props: {
    value: Boolean
  },

  /**
   * methods
   */
  methods: {
    ...mapActions("common", ["post_user"]),

    async signup() {
      try {
        await this.post_user(this.user_info);

        this.close();
      } catch (error) {
        this.$log.debug(error);
      }
    },

    // Close Dialog
    close() {
      this.dialog = false;
      this.clear_error_messages();
    }
  },

  /**
   * computed
   */
  computed: {
    dialog: {
      get: function() {
        return this.value;
      },
      set: function(newValue) {
        this.$emit("input", newValue);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-form {
  padding: 24px 0px 0px;
}
</style>
