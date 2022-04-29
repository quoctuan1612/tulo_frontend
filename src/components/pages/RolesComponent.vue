<template>
  <v-main>
    <v-container fluid>
      <v-row class="mb-6">
        <v-col cols="6">
          <div>
            <span class="text-title-component">Quản lý chức vụ</span>
          </div>
        </v-col>
        <v-col cols="6"> </v-col>
      </v-row>
      <v-card>
        <v-card-text>
          <role-table-component />
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
import RoleTableComponent from "../molecules/roles/RoleTableComponent.vue";

/**
 * Vue
 */
export default {
  /**
   * components
   */
  components: {
    RoleTableComponent
  },

  /**
   * method
   */
  methods: {
    ...mapActions("common", ["get_roles"])
  },

  /**
   * beforeMount
   */
  beforeMount: function() {
    this.get_roles();
  }
};
</script>

<style></style>
