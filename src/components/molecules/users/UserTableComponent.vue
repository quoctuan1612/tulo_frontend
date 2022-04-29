<template>
  <div>
    <v-data-table :headers="headers" :items="users_data">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="text-title-table"
            >Danh sách người dùng</v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <user-table-add-new-item-component />
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="item">
        <v-icon small @click="show_user_update(item.item)" class="mr-2"
          >fas fa-pencil-alt</v-icon
        >
        <v-icon small @click="show_user_delete(item.item)">fas fa-trash</v-icon>
      </template>
    </v-data-table>
    <user-table-update-item-component v-model="is_show_user_update" />
    <user-table-delete-item-component v-model="is_show_user_delete" />
  </div>
</template>

<script>
/**
 * import
 */
import { mapGetters, mapActions } from "vuex";
import UserTableAddNewItemComponent from "./UserTableAddNewItemComponent.vue";
import UserTableUpdateItemComponent from "./UserTableUpdateItemComponent.vue";
import UserTableDeleteItemComponent from "./UserTableDeleteItemComponent.vue";

/**
 * Vue
 */
export default {
  /**
   * components
   */
  components: {
    UserTableAddNewItemComponent,
    UserTableUpdateItemComponent,
    UserTableDeleteItemComponent
  },

  /**
   * data
   */
  data: () => ({
    headers: [
      { text: "Tên nhân viên", value: "full_name" },
      { text: "Tài khoản", value: "user_name" },
      { text: "Phòng ban", value: "department_name" },
      { text: "Chức vụ", value: "role_name" },
      { text: "Thao tác", value: "actions", sortable: false }
    ],
    is_show_user_update: false,
    is_show_user_delete: false
  }),

  /**
   * computed
   */
  computed: {
    ...mapGetters("common", ["get_users_data", "get_roles_data"]),
    ...mapGetters("employees", ["get_employees_data"]),
    ...mapGetters("departments", ["get_departments_data"]),

    users_data() {
      let result = this.employees_data.map(employee => {
        let users = this.get_users_data;
        for (let i = 0; i < users.length; i++) {
          if (users[i].employee_id == employee.id) {
            let full_name = `${employee.first_name} ${employee.last_name}`;
            let department = this.get_departments_data.find(
              deparment => employee.department_id == deparment.id
            );
            let role = this.get_roles_data.find(
              role => employee.role_id == role.role_id
            );
            let { id, user_name, employee_id } = users[i];

            return {
              id,
              employee_id,
              full_name,
              department_name: department.department_name,
              role_name: role.role_name,
              user_name
            };
          }
        }
      });

      return result.filter(item => typeof item == "object");
    },

    employees_data() {
      return this.get_employees_data;
    }
  },

  /**
   * method
   */
  methods: {
    ...mapActions("common", ["get_user"]),
    ...mapActions("employees", ["get_employee"]),

    async show_user_update(user) {
      await this.get_user(user.id);
      await this.get_employee(user.employee_id);
      this.is_show_user_update = true;
    },

    async show_user_delete(user) {
      await this.get_user(user.id);
      this.is_show_user_delete = true;
    },

    async get_employee_info(employee_id) {
      await this.get_employee(employee_id);
    }
  }
};
</script>

<style></style>
