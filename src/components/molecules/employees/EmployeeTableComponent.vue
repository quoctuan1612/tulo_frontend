<template>
  <div>
    <v-data-table :headers="headers" :items="employees_data">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="text-title-table"
            >Danh sách nhân viên</v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <employee-table-add-new-item-component />
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="item">
        <v-icon small @click="show_employee_update(item.item)" class="mr-2"
          >fas fa-pencil-alt</v-icon
        >
        <v-icon small @click="show_employee_delete(item.item)"
          >fas fa-trash</v-icon
        >
      </template>
    </v-data-table>
    <employee-table-update-item-component v-model="is_show_employee_update" />
    <employee-table-delete-item-component v-model="is_show_employee_delete" />
  </div>
</template>

<script>
/**
 * import
 */
import { mapActions, mapGetters } from "vuex";
import EmployeeTableAddNewItemComponent from "./EmployeeTableAddNewItemComponent.vue";
import EmployeeTableUpdateItemComponent from "./EmployeeTableUpdateItemComponent.vue";
import EmployeeTableDeleteItemComponent from "./EmployeeTableDeleteItemComponent.vue";

/**
 * Vue
 */
export default {
  /**
   * components
   */
  components: {
    EmployeeTableAddNewItemComponent,
    EmployeeTableUpdateItemComponent,
    EmployeeTableDeleteItemComponent
  },

  /**
   * data
   */
  data: () => ({
    headers: [
      { text: "Họ và Tên", value: "full_name" },
      { text: "Phòng ban", value: "department_name" },
      { text: "Chức vụ", value: "role_name" },
      { text: "Thao tác", value: "actions", sortable: false }
    ],
    is_show_employee_update: false,
    is_show_employee_delete: false
  }),

  /**
   * computed
   */
  computed: {
    ...mapGetters("employees", ["get_employees_data"]),
    ...mapGetters("departments", ["get_departments_data"]),
    ...mapGetters("common", ["get_roles_data"]),

    employees_data() {
      return this.get_employees_data.map(employee => {
        let {
          id,
          first_name,
          last_name,
          department_id,
          role_id,
          master_district_id
        } = employee;
        let department_name = this.department_name_by_id(department_id);
        let role_name = this.role_name_by_id(role_id);
        let full_name = first_name + " " + last_name;
        return {
          id,
          full_name,
          department_name,
          role_name,
          master_district_id
        };
      });
    }
  },

  /**
   * method
   */
  methods: {
    ...mapActions("employees", ["get_employee"]),
    ...mapActions("common", ["get_wards"]),

    department_name_by_id(id) {
      let ret = this.get_departments_data.find(
        department => department.id == id
      );
      if (ret) {
        return ret.department_name;
      } else {
        return null;
      }
    },

    role_name_by_id(id) {
      let ret = this.get_roles_data.find(role => role.role_id == id);
      if (ret) {
        return ret.role_name;
      } else {
        return null;
      }
    },

    async show_employee_delete(employee) {
      await this.get_employee(employee.id);
      this.is_show_employee_delete = true;
    },

    async show_employee_update(employee) {
      await this.get_employee(employee.id);
      (await employee.master_district_id) &&
        this.get_wards(employee.master_district_id);
      this.is_show_employee_update = true;
    }
  }
};
</script>

<style></style>
