<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col cols="6">
          <div>
            <span class="text-title-component">Quản lý nhân viên</span>
          </div>
        </v-col>
        <v-col cols="6"> </v-col>
      </v-row>
      <v-card>
        <v-card-text>
          <employee-table-component />
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
import EmployeeTableComponent from "../molecules/employees/EmployeeTableComponent.vue";

/**
 * Vue
 */
export default {
  /**
   * components
   */
  components: {
    EmployeeTableComponent
  },

  /**
   * method
   */
  methods: {
    ...mapActions("employees", ["get_employees"]),
    ...mapActions("departments", ["get_departments"]),
    ...mapActions("common", ["get_roles", "get_countries_provinces_districts"])
  },

  /**
   * beforeMount
   */
  beforeMount: function() {
    this.get_employees();
    this.get_departments();
    this.get_roles();
    this.get_countries_provinces_districts();
  }
};
</script>
<style></style>
