<template>
  <v-dialog v-model="dialog" max-width="700px" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
        Thêm mới
      </v-btn>
    </template>
    <v-card>
      <v-toolbar
        flat
        class="body-2 font-weight-bold mb-3"
        color="grey lighten-2"
      >
        <span class="title-form">Thêm mới phòng ban</span>
      </v-toolbar>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field
            v-model="department.department_name"
            label="Tên phòng ban"
            outlined
          ></v-text-field>
          <v-select
            v-model="parent_department_id"
            :items="departments_data"
            item-text="department_name"
            item-value="id"
            label="Trực thuộc"
            outlined
          ></v-select>
          <v-select
            v-model="mgr_id"
            :items="employees_data"
            item-text="full_name"
            item-value="id"
            label="Lãnh đạo/Trưởng phòng"
            outlined
          ></v-select>
          <v-textarea
            v-model="department.description"
            label="Mô tả"
            outlined
          ></v-textarea>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed color="blue-grey" @click="close">
          Thoát
        </v-btn>
        <v-btn depressed color="success" @click="save">
          Lưu
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
/**
 * import
 */
import { mapActions, mapGetters } from "vuex";

/**
 * Vue
 */
export default {
  /**
   * data
   */
  data: () => ({
    dialog: false,

    department: {
      department_name: null,
      parent_department_id: null,
      mgr_id: null,
      description: null
    },

    defaultDepartment: {
      department_name: null,
      parent_department_id: null,
      mgr_id: null,
      description: null
    },

    parent_department_id: null,
    mgr_id: null
  }),

  /**
   * computed
   */
  computed: {
    ...mapGetters("departments", ["get_departments_data"]),
    ...mapGetters("employees", ["get_employees_data"]),

    departments_data() {
      let departments = this.get_departments_data.map(department => {
        let { id, department_name } = department;
        return { id, department_name };
      });

      departments.unshift({ id: null, department_name: "" });

      return departments;
    },

    employees_data() {
      let employees = this.get_employees_data.map(employee => {
        let { id, first_name, last_name } = employee;
        return { id, full_name: first_name + " " + last_name };
      });

      employees.unshift({ id: null, full_name: "" });

      return employees;
    }
  },

  /**
   * methods
   */
  methods: {
    ...mapActions("departments", ["upsert_department", "get_departments"]),

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.department = Object.assign({}, this.defaultDepartment);
      });
    },

    async save() {
      try {
        this.department.parent_department_id = this.parent_department_id;
        this.department.mgr_id = this.mgr_id;

        await this.upsert_department(this.department);

        await this.get_departments();

        this.close();
      } catch (error) {
        this.$log.debug(error);
      }
    }
  }
};
</script>

<style></style>
