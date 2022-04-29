<template>
  <v-dialog v-model="dialog" max-width="1300px" persistent>
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
        <span class="title-form">Thêm mới nhóm quyền</span>
      </v-toolbar>
      <v-card-text>
        <v-form class="px-3">
          <v-select
            ref="role_id"
            v-model="role_id"
            :items="roles_data"
            item-text="role_name"
            item-value="role_id"
            label="Mã chức vụ"
            :rules="[rules.required]"
            :error-messages="v_error('role_id')"
            class="mx-auto"
            outlined
          ></v-select>
          <v-textarea
            v-model="description"
            label="Mô tả"
            class="mx-auto"
            outlined
          ></v-textarea>
        </v-form>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th v-for="header in headers" :key="header.name">
                  {{ header.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="permission in permissions" :key="permission.name">
                <td>{{ permission.name }}</td>
                <td>
                  <v-checkbox v-model="permission.read" dense></v-checkbox>
                </td>
                <td>
                  <v-checkbox v-model="permission.create" dense></v-checkbox>
                </td>
                <td>
                  <v-checkbox v-model="permission.update" dense></v-checkbox>
                </td>
                <td>
                  <v-checkbox v-model="permission.del" dense></v-checkbox>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed color="blue-grey" @click="close">
          Thoát
        </v-btn>
        <v-btn depressed color="success" @click="save">
          Thêm
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
    params: {
      permission: [],
      permission_details: []
    },
    defaultParams: {
      permission: [],
      permission_details: []
    },
    role_id: null,
    description: "",
    rules: {
      required: value => !!value || "Không được để trống."
    },
    headers: [
      { name: "Chức năng" },
      { name: "Truy cập" },
      { name: "Thêm mới" },
      { name: "Sửa" },
      { name: "Xóa" }
    ],
    permissions: [
      {
        name: "Quản lý chức vụ",
        read: false,
        create: false,
        update: false,
        del: false
      },
      {
        name: "Quản lý phòng ban",
        read: false,
        create: false,
        update: false,
        del: false
      },
      {
        name: "Quản lý nhân viên",
        read: false,
        create: false,
        update: false,
        del: false
      },
      {
        name: "Quản lý nhóm quyền",
        read: false,
        create: false,
        update: false,
        del: false
      },
      {
        name: "Quản lý nơi đến",
        read: false,
        create: false,
        update: false,
        del: false
      },
      {
        name: "Quản lý thời hạn xử lý văn bản đến",
        read: false,
        create: false,
        update: false,
        del: false
      }
    ],
    formHasErrors: false
  }),

  /**
   * computed
   */
  computed: {
    ...mapGetters("common", ["get_roles_data", "get_permissions_data"]),

    roles_data() {
      let roles = this.get_roles_data.filter(role => {
        let { role_id, role_name } = role;
        if (!this.permissions_data.includes(role_id)) {
          return { role_id, role_name };
        }
      });

      roles.unshift({ role_id: null, role_name: "" });

      return roles;
    },

    permissions_data() {
      let permissions = this.get_permissions_data.map(permission => {
        let { role_id } = permission;
        return role_id;
      });

      return permissions;
    },

    form() {
      return {
        role_id: this.role_id
      };
    }
  },

  /**
   * methods
   */
  methods: {
    ...mapActions("common", ["upsert_permission", "get_permissions"]),

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.params.permission = [];
        this.params.permission_details = [];
        this.description = "";
        this.role_id = null;
        this.permissions = [
          {
            name: "Quản lý chức vụ",
            read: false,
            create: false,
            update: false,
            del: false
          },
          {
            name: "Quản lý phòng ban",
            read: false,
            create: false,
            update: false,
            del: false
          },
          {
            name: "Quản lý nhân viên",
            read: false,
            create: false,
            update: false,
            del: false
          },
          {
            name: "Quản lý nhóm quyền",
            read: false,
            create: false,
            update: false,
            del: false
          },
          {
            name: "Quản lý nơi đến",
            read: false,
            create: false,
            update: false,
            del: false
          },
          {
            name: "Quản lý thời hạn xử lý văn bản đến",
            read: false,
            create: false,
            update: false,
            del: false
          }
        ];
      });
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
          this.permissions.forEach(permission => {
            let { name, read, create, update, del } = permission;
            let Read = {
              permission_name: name,
              permission: "Read",
              is_active: read
            };
            let Create = {
              permission_name: name,
              permission: "Create",
              is_active: create
            };
            let Update = {
              permission_name: name,
              permission: "Update",
              is_active: update
            };
            let Delete = {
              permission_name: name,
              permission: "Delete",
              is_active: del
            };

            this.params.permission_details.push(Read);
            this.params.permission_details.push(Create);
            this.params.permission_details.push(Update);
            this.params.permission_details.push(Delete);
          });

          this.params.permission = [
            { role_id: this.role_id, description: this.description }
          ];

          await this.upsert_permission(this.params);

          await this.get_permissions();

          this.close();
        }
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
th {
  font-size: 16px !important;
  color: black !important;
}
td {
  font-size: 16px !important;
  color: black !important;
}
.v-select,
.v-textarea {
  width: 650px;
}
</style>
