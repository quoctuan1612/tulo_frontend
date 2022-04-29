<docs>
  # User Login Profiles

  # Overview

  # Author
  - Tunigo Ltd.co ThinhNH
</docs>

<template lang="pug">
<v-menu offset-y>
  <template v-slot:activator="{ on, attrs }">
    button.profile
      span.pr-4(v-bind="attrs" v-on="on")
        <v-icon>mdi-account</v-icon>{{ currentUser.first_name }} {{ currentUser.last_name }} ▼
  </template>
  <v-list>
      dl
        dt Username
        dd {{ currentUser.user_name }}
      dl
        dt Full Name
        dd {{ currentUser.first_name }} {{ currentUser.last_name}}
      dl
        dt Email
        dd {{ currentUser.email }}
      dl
        dt Phone
        dd {{ currentUser.phone }}
      dl
        dt Department
        dd {{ field_name_by_id(departments_data, currentUser.department_id, "department_name") || "-" }}
      dl
        dt Role
        dd {{ field_name_by_id(roles_data, currentUser.role_id, "role_name") || "-" }}
      dl
        dt Reports To
        dd {{ full_name_by_id(users_data, currentUser.reports_to_id) || "-" }}
      dl
        dt Description
        dd {{ currentUser.description || "-" }}
  </v-list>
</v-menu>
</template>

<script>
/**
 * import
 */
import { mapGetters } from "vuex";

/**
 * Vue
 */
export default {
  /**
   * computed
   */
  computed: {
    ...mapGetters("common", [
      "get_current_user",
      "get_users_data",
      "get_roles_data",
      "get_departments_data"
    ]),

    currentUser() {
      return this.get_current_user;
    },

    users_data() {
      return this.get_users_data;
    },

    roles_data() {
      return this.get_roles_data;
    },

    departments_data() {
      return this.get_departments_data;
    }
  }
};
</script>

<style lang="scss" scoped>
.profile {
  height: 48px;
}
.v-list {
  padding: 16px;
}
</style>
