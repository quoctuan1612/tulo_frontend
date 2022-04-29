<template>
  <v-main>
    <v-container fluid>
      <v-row class="mb-6">
        <v-col cols="6">
          <div>
            <span class="text-title-component">Quản lý nhóm quyền</span>
          </div>
        </v-col>
        <v-col cols="6"> </v-col>
      </v-row>
      <v-card>
        <v-card-text>
          <permission-table-component />
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
import PermissionTableComponent from "../molecules/permissions/PermissionTableComponent.vue";

/**
 * Vue
 */
export default {
  /**
   * components
   */
  components: {
    PermissionTableComponent
  },

  /**
   * method
   */
  methods: {
    ...mapActions("common", ["get_permissions", "get_roles"])
  },

  /**
   * beforeMount
   */
  beforeMount: function() {
    this.get_permissions();
    this.get_roles();
  }
};
</script>

<style></style>
