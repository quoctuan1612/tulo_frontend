<template>
  <v-main>
    <v-container fluid>
      <v-row class="mb-6">
        <v-col cols="6">
          <div>
            <span class="text-title-component">Quản lý người dùng</span>
          </div>
        </v-col>
        <v-col cols="6"> </v-col>
      </v-row>
      <v-card>
        <v-card-text>
          <user-table-component />
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>
/**
 * import
 */
import { mapActions } from "vuex";
import UserTableComponent from "../molecules/users/UserTableComponent.vue";

/**
 * Vue
 */
export default {
  /**
   * components
   */
  components: {
    UserTableComponent
  },

  /**
   * method
   */
  methods: {
    ...mapActions("common", ["get_users", "get_roles"]),
    ...mapActions("departments", ["get_departments"]),
    ...mapActions("employees", ["get_employees"])
  },

  /**
   * beforeMount
   */
  beforeMount: async function() {
    await this.get_users();
    await this.get_roles();
    await this.get_departments();
    await this.get_employees();
  }
};
</script>

<style></style>
