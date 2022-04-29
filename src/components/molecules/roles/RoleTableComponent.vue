<template>
  <div>
    <v-data-table :headers="headers" :items="roles_data">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="text-title-table"
            >Danh sách chức vụ</v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <role-table-add-new-item-component />
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="item">
        <v-icon small @click="show_role_update(item.item)" class="mr-2"
          >fas fa-pencil-alt</v-icon
        >
        <v-icon small @click="show_role_delete(item.item)">fas fa-trash</v-icon>
      </template>
    </v-data-table>
    <role-table-update-item-component v-model="is_show_role_update" />
    <role-table-delete-item-component v-model="is_show_role_delete" />
  </div>
</template>

<script>
/**
 * import
 */
import { mapGetters, mapActions } from "vuex";
import RoleTableAddNewItemComponent from "./RoleTableAddNewItemComponent.vue";
import RoleTableUpdateItemComponent from "./RoleTableUpdateItemComponent.vue";
import RoleTableDeleteItemComponent from "./RoleTableDeleteItemComponent.vue";

/**
 * Vue
 */
export default {
  /**
   * components
   */
  components: {
    RoleTableAddNewItemComponent,
    RoleTableUpdateItemComponent,
    RoleTableDeleteItemComponent
  },

  /**
   * data
   */
  data: () => ({
    headers: [
      { text: "Mã chức vụ", value: "role_id" },
      { text: "Tên chức vụ", value: "role_name" },
      { text: "Mô tả", sortable: false, value: "description" },
      { text: "Thao tác", value: "actions", sortable: false }
    ],
    is_show_role_update: false,
    is_show_role_delete: false
  }),

  /**
   * computed
   */
  computed: {
    ...mapGetters("common", ["get_roles_data"]),

    roles_data() {
      return this.get_roles_data;
    }
  },

  /**
   * method
   */
  methods: {
    ...mapActions("common", ["get_role"]),

    async show_role_update(role) {
      await this.get_role(role.role_id);
      this.is_show_role_update = true;
    },

    async show_role_delete(role) {
      await this.get_role(role.role_id);
      this.is_show_role_delete = true;
    }
  }
};
</script>

<style></style>
