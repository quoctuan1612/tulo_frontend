<template>
  <v-dialog v-model="value" max-width="700px" persistent>
    <v-card>
      <v-toolbar
        flat
        class="body-2 font-weight-bold mb-3"
        color="grey lighten-2"
      >
        <span class="title-form">Cập nhật thông tin phòng ban</span>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-form class="px-3">
            <v-text-field
              v-model="department_data.department_name"
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
              v-model="department_data.description"
              label="Mô tả"
              outlined
            ></v-textarea>
          </v-form>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed color="blue-grey" @click="close">
          Thoát
        </v-btn>
        <v-btn depressed color="error" @click="save">
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
   * props
   */
  props: {
    value: Boolean
  },

  /**
   * data
   */
  data: () => ({
    department: {},
    parent_department_id: null,
    mgr_id: null,
    defaultDepartment: {
      id: null,
      department_name: null,
      parent_department_id: null,
      mgr_id: null,
      description: null
    }
  }),

  /**
   * computed
   */
  computed: {
    ...mapGetters("departments", [
      "get_department_data",
      "get_departments_data"
    ]),
    ...mapGetters("employees", ["get_employees_data"]),

    department_data() {
      let { parent_department_id, department_name } = this.get_department_data;
      this.set_default_selected_parent_department_id({
        id: parent_department_id,
        department_name
      });
      return this.get_department_data;
    },

    departments_data() {
      let departments = this.get_departments_data.filter(department => {
        let { id, department_name } = department;
        return { id, department_name };
      });

      departments.unshift({ id: null, department_name: "" });

      return departments;
    },

    employees_data() {
      let employees = this.get_employees_data.map(employee => {
        let { id, first_name, last_name } = employee;

        if (id == this.department_data.mgr_id) {
          this.set_default_selected_mgr_id({
            id,
            full_name: first_name + " " + last_name
          });
        }

        return { id, full_name: first_name + " " + last_name };
      });

      employees.unshift({ id: null, full_name: "" });

      return employees;
    },

    dialog: {
      get: function() {
        return this.value;
      },
      set: function(newValue) {
        this.$emit("input", newValue);
      }
    }
  },

  /**
   * methods
   */
  methods: {
    ...mapActions("departments", ["upsert_department", "get_departments"]),

    set_default_selected_parent_department_id(obj) {
      this.parent_department_id = obj;
    },

    set_default_selected_mgr_id(obj) {
      this.mgr_id = obj;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.department = Object.assign({}, this.defaultDepartment);
        this.mgr_id = null;
        this.parent_department_id = null;
      });
    },

    // Save
    async save() {
      try {
        let { id, department_name, description } = this.department_data;
        this.department = {
          id: id,
          department_name: department_name,
          parent_department_id:
            isFinite(this.parent_department_id) ||
            this.parent_department_id == null
              ? this.parent_department_id
              : this.parent_department_id.id,
          mgr_id:
            isFinite(this.mgr_id) || this.mgr_id == null
              ? this.mgr_id
              : this.mgr_id.id,
          description: description
        };

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

<style scoped>
.title-form {
  font-size: 20px;
}
</style>
