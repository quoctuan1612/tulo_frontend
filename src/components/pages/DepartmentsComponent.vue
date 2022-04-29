<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col cols="6">
          <div>
            <span class="text-title-component">Quản lý phòng ban</span>
          </div>
        </v-col>
        <v-col cols="6"> </v-col>
      </v-row>
      <v-card>
        <v-card-text>
          <department-table-component />
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
import DepartmentTableComponent from "../molecules/departments/DepartmentTableComponent.vue";

/**
 * Vue
 */
export default {
  /**
   * components
   */
  components: {
    DepartmentTableComponent
  },

  /**
   * method
   */
  methods: {
    ...mapActions("departments", ["get_departments"]),
    ...mapActions("employees", ["get_employees"])
  },

  /**
   * beforeMount
   */
  beforeMount: function() {
    this.get_departments();
    this.get_employees();
  }
};
</script>
<style></style>
