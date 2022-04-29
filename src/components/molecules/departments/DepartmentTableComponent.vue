<template>
  <div>
    <v-data-table :headers="headers" :items="departments_data">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="text-title-table"
            >Danh sách phòng ban</v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <department-table-add-new-item-component />
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="item">
        <v-icon small @click="show_department_update(item.item)" class="mr-2"
          >fas fa-pencil-alt</v-icon
        >
        <v-icon small @click="show_department_delete(item.item)"
          >fas fa-trash</v-icon
        >
      </template>
    </v-data-table>
    <department-table-update-item-component
      v-model="is_show_department_update"
    />
    <department-table-delete-item-component
      v-model="is_show_department_delete"
    />
  </div>
</template>

<script>
/**
 * import
 */
import { mapActions, mapGetters } from "vuex";
import DepartmentTableAddNewItemComponent from "./DepartmentTableAddNewItemComponent.vue";
import DepartmentTableUpdateItemComponent from "./DepartmentTableUpdateItemComponent.vue";
import DepartmentTableDeleteItemComponent from "./DepartmentTableDeleteItemComponent.vue";

/**
 * Vue
 */
export default {
  /**
   * components
   */
  components: {
    DepartmentTableAddNewItemComponent,
    DepartmentTableUpdateItemComponent,
    DepartmentTableDeleteItemComponent
  },

  /**
   * data
   */
  data: () => ({
    headers: [
      { text: "Tên phòng ban", value: "department_name" },
      { text: "Trực thuộc", value: "parent_department_name" },
      { text: "Trưởng phòng/Lãnh đạo", value: "mgr_name" },
      { text: "Mô tả", sortable: false, value: "description" },
      { text: "Thao tác", value: "actions", sortable: false }
    ],
    is_show_department_update: false,
    is_show_department_delete: false
  }),

  /**
   * computed
   */
  computed: {
    ...mapGetters("departments", ["get_departments_data"]),
    ...mapGetters("employees", ["get_employees_data"]),

    departments_data() {
      return this.get_departments_data.map(department => {
        let {
          id,
          department_name,
          parent_department_id,
          mgr_id,
          description
        } = department;
        let parent_department_name = this.department_name_by_id(
          parent_department_id
        );
        let mgr_name = this.mgr_name_by_id(mgr_id);
        return {
          id,
          department_name,
          parent_department_name,
          mgr_name,
          description
        };
      });
    }
  },

  /**
   * method
   */
  methods: {
    ...mapActions("departments", ["get_department"]),

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

    mgr_name_by_id(id) {
      let ret = this.get_employees_data.find(employee => employee.id == id);
      if (ret) {
        return ret.first_name + " " + ret.last_name;
      } else {
        return null;
      }
    },

    async show_department_update(department) {
      await this.get_department(department.id);
      this.is_show_department_update = true;
    },

    async show_department_delete(department) {
      await this.get_department(department.id);
      this.is_show_department_delete = true;
    }
  }
};
</script>

<style></style>
