<template>
  <div>
    <v-data-table :headers="headers" :items="permissions_data">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="text-title-table"
            >Danh sách nhóm quyền</v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <permission-table-add-new-item-component />
        </v-toolbar>
      </template>
      <template v-slot:[`item.role_id`]="item">
        <span> {{ get_role_name(item.item.role_id) }} </span>
      </template>
      <template v-slot:[`item.actions`]="item">
        <v-icon small @click="show_permission_update(item.item)" class="mr-2"
          >fas fa-pencil-alt</v-icon
        >
        <v-icon small @click="show_permission_delete(item.item)"
          >fas fa-trash</v-icon
        >
      </template>
    </v-data-table>
    <permission-table-update-item-component
      v-model="is_show_permission_update"
    />
    <permission-table-delete-item-component
      v-model="is_show_permission_delete"
    />
  </div>
</template>

<script>
/**
 * import
 */
import { mapGetters, mapActions } from "vuex";
import PermissionTableAddNewItemComponent from "./PermissionTableAddNewItemComponent.vue";
import PermissionTableUpdateItemComponent from "./PermissionTableUpdateItemComponent.vue";
import PermissionTableDeleteItemComponent from "./PermissionTableDeleteItemComponent.vue";

/**
 * Vue
 */
export default {
  /**
   * components
   */
  components: {
    PermissionTableAddNewItemComponent,
    PermissionTableUpdateItemComponent,
    PermissionTableDeleteItemComponent
  },

  /**
   * data
   */
  data: () => ({
    headers: [
      { text: "Tên chức vụ", value: "role_id" },
      { text: "Mô tả", sortable: false, value: "description" },
      { text: "Thao tác", value: "actions", sortable: false }
    ],
    is_show_permission_update: false,
    is_show_permission_delete: false
  }),

  /**
   * computed
   */
  computed: {
    ...mapGetters("common", ["get_permissions_data", "get_roles_data"]),

    permissions_data() {
      return this.get_permissions_data;
    },

    roles_data() {
      let roles = this.get_roles_data.map(role => {
        let { role_id, role_name } = role;
        return { role_id, role_name };
      });

      return roles;
    }
  },

  /**
   * method
   */
  methods: {
    ...mapActions("common", ["get_permission"]),

    get_role_name(role_id) {
      let role = this.roles_data.find(role => {
        if (role.role_id == role_id) {
          return role;
        }
      });

      return role && role.role_name;
    },

    async show_permission_update(permission) {
      await this.get_permission(permission.id);
      this.is_show_permission_update = true;
    },

    async show_permission_delete(permission) {
      await this.get_permission(permission.id);
      this.is_show_permission_delete = true;
    }
  }
};
</script>

<style></style>
