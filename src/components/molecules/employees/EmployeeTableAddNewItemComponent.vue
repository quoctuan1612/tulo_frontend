<template>
  <v-dialog v-model="dialog" persistent max-width="900px">
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
        <span class="title-form">Thêm mới nhân viên</span>
      </v-toolbar>
      <v-card-text>
        <v-form class="px-3">
          <v-row>
            <v-col cols="6">
              <v-text-field
                ref="first_name"
                v-model="employee.first_name"
                label="Họ"
                outlined
                :rules="[rules.required, rules.counter]"
                counter
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                ref="last_name"
                v-model="employee.last_name"
                label="Tên"
                outlined
                :rules="[rules.required, rules.counter]"
                counter
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-select
                ref="gender"
                v-model="employee.gender"
                :items="gender_data"
                label="Giới tính"
                outlined
                :rules="[rules.required]"
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-menu
                v-model="is_show_date_picker_dob"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    outlined
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    prepend-inner-icon="fa-solid fa-calendar-day"
                    :value="get_dob"
                    label="Ngày sinh"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="get_dob"
                  @input="is_show_date_picker_dob = false"
                  @change="set_dob($event)"
                >
                </v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="employee.phone"
                label="Số điện thoại"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="employee.email"
                label="Email"
                outlined
                :rules="[rules.email]"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="employee.master_country_id"
                :items="countries_data"
                item-text="name"
                item-value="id"
                label="Đất nước"
                outlined
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="employee.master_province_id"
                :items="provinces_data"
                item-text="name"
                item-value="id"
                label="Tỉnh/Thành"
                outlined
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="employee.master_district_id"
                :items="districts_data"
                item-text="name"
                item-value="id"
                label="Quận/Huyện"
                outlined
                @change="get_wards_data($event)"
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="employee.master_ward_id"
                :items="wards_data"
                item-text="name"
                item-value="id"
                label="Xã/Phường"
                outlined
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-select
                v-model="employee.department_id"
                :items="departments_data"
                item-text="department_name"
                item-value="id"
                label="Phòng ban"
                outlined
              ></v-select>
            </v-col>
            <v-col cols="6">
              <v-select
                v-model="employee.role_id"
                :items="roles_data"
                item-text="role_name"
                item-value="role_id"
                label="Chức vụ"
                outlined
              ></v-select>
            </v-col>
          </v-row>
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
    rules: {
      required: value => !!value || "Không được để trống.",
      counter: value => (value && value.length <= 20) || "Tối đa 20 ký tự.",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Email không hợp lệ.";
      }
    },
    employee: {
      first_name: "",
      last_name: "",
      gender: "",
      dob: null,
      email: null,
      phone: null,
      master_country_id: null,
      master_province_id: null,
      master_district_id: null,
      master_ward_id: null,
      owner_id: null,
      department_id: null,
      role_id: null
    },
    defaultEmployee: {
      first_name: null,
      last_name: null,
      gender: null,
      dob: null,
      email: null,
      phone: null,
      master_country_id: null,
      master_province_id: null,
      master_district_id: null,
      master_ward_id: null,
      owner_id: null,
      department_id: null,
      role_id: null
    },
    gender_data: ["Nam", "Nữ"],
    is_show_date_picker_dob: false,
    formHasErrors: false
  }),

  /**
   * computed
   */
  computed: {
    ...mapGetters("departments", ["get_departments_data"]),
    ...mapGetters("common", [
      "get_roles_data",
      "get_master_countries_data",
      "get_master_provinces_data",
      "get_master_districts_data",
      "get_master_wards_data"
    ]),

    countries_data() {
      let countries = this.get_master_countries_data.map(country => {
        let { id, name } = country;
        return { id, name };
      });

      countries.unshift({ id: null, name: "" });

      return countries;
    },

    provinces_data() {
      let provinces = this.get_master_provinces_data.map(province => {
        let { id, name } = province;
        return { id, name };
      });

      provinces.unshift({ id: null, name: "" });

      return provinces;
    },

    districts_data() {
      let districts = this.get_master_districts_data.filter(district => {
        if (district.master_province_id == this.employee.master_province_id) {
          let { id, name } = district;
          return { id, name };
        }
      });

      districts.unshift({ id: null, name: "" });

      return districts;
    },

    wards_data() {
      let wards = this.get_master_wards_data.filter(ward => {
        let { id, name } = ward;
        return { id, name };
      });

      wards.unshift({ id: null, name: "" });

      return wards;
    },

    departments_data() {
      let departments = this.get_departments_data.map(department => {
        let { id, department_name } = department;
        return { id, department_name };
      });

      departments.unshift({ id: null, department_name: "" });

      return departments;
    },

    roles_data() {
      let roles = this.get_roles_data.map(role => {
        let { role_id, role_name } = role;
        return { role_id, role_name };
      });

      roles.unshift({ role_id: null, role_name: "" });

      return roles;
    },

    get_dob: {
      get: function() {
        return this.employee.dob;
      },
      set: function(newValue) {
        this.$emit("input", newValue);
      }
    },

    form() {
      return {
        first_name: this.employee.first_name,
        last_name: this.employee.last_name,
        gender: this.employee.gender
      };
    }
  },

  /**
   * methods
   */
  methods: {
    ...mapActions("employees", ["upsert_employee", "get_employees"]),
    ...mapActions("common", ["get_wards"]),

    close() {
      this.dialog = false;
      this.formHasErrors = false;
      this.$nextTick(() => {
        this.employee = Object.assign({}, this.defaultEmployee);
      });
    },

    set_dob(event) {
      this.employee.dob = event;
    },

    async get_wards_data(event) {
      await this.get_wards(event);
    },

    validate_form() {
      this.formHasErrors = false;

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) this.formHasErrors = true;
        this.$refs[f].validate(true);
      });
    },

    async save() {
      try {
        this.validate_form();

        if (!this.formHasErrors) {
          await this.upsert_employee(this.employee);

          await this.get_employees();

          this.close();
        }
      } catch (error) {
        this.$log.debug(error);
      }
    }
  }
};
</script>

<style></style>
