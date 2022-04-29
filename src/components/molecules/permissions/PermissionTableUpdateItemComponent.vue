<template>
  <v-dialog v-model="value" max-width="1300px" persistent>
    <v-card>
      <v-toolbar
        flat
        class="body-2 font-weight-bold mb-3"
        color="grey lighten-2"
      >
        <span class="title-form">Cập nhật thông tin nhóm quyền</span>
      </v-toolbar>

      <v-card-text>
        <v-form class="px-3">
          <v-text-field
            label="Mã chức vụ"
            :value="get_role_name(permission_data.permission.role_id)"
            class="mx-auto"
            disabled
            outlined
          ></v-text-field>
          <v-textarea
            v-model="permission_data.permission.description"
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
              <tr
                v-for="permission_detail in permission_details_data"
                :key="permission_detail.name"
              >
                <td>{{ permission_detail.name }}</td>
                <td
                  v-for="item in permission_detail.permission_details"
                  :key="item.id"
                >
                  <v-checkbox v-model="item.is_active" dense></v-checkbox>
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
        <v-btn depressed color="error" @click="save">
          Cập nhật
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
    headers: [
      { name: "Chức năng" },
      { name: "Thêm mới" },
      { name: "Xóa" },
      { name: "Truy cập" },
      { name: "Sửa" }
    ]
  }),

  /**
   * computed
   */
  computed: {
    ...mapGetters("common", ["get_permission_data", "get_roles_data"]),

    permission_data() {
      return this.get_permission_data;
    },

    permission_details_data() {
      let permission_details = this.permission_data.permission_details;
      let permissions = [
        { name: "Quản lý chức vụ", permission_details: [] },
        { name: "Quản lý phòng ban", permission_details: [] },
        { name: "Quản lý nhân viên", permission_details: [] },
        { name: "Quản lý nhóm quyền", permission_details: [] },
        { name: "Quản lý nơi đến", permission_details: [] },
        { name: "Quản lý thời hạn xử lý văn bản đến", permission_details: [] }
      ];

      permissions &&
        permissions.forEach(permission => {
          for (let i = 0; i < permission_details.length; i++) {
            if (permission.name == permission_details[i].permission_name) {
              permission.permission_details.push(permission_details[i]);
            }
          }
        });

      permissions.forEach(permission => {
        permission.permission_details.sort((a, b) =>
          a.permission > b.permission ? 1 : -1
        );
      });

      return permissions;
    },

    roles_data() {
      let roles = this.get_roles_data.map(role => {
        let { role_id, role_name } = role;
        return { role_id, role_name };
      });

      return roles;
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
    ...mapActions("common", ["upsert_permission", "get_permissions"]),

    close() {
      this.dialog = false;
    },

    get_role_name(role_id) {
      let role = this.roles_data.find(role => {
        if (role.role_id == role_id) {
          return role;
        }
      });

      return role && role.role_name;
    },

    async save() {
      try {
        let permission_details = [];

        this.permission_details_data.forEach(item => {
          permission_details = permission_details.concat(
            item.permission_details
          );
        });

        let permission = {
          permission: [
            {
              id: this.permission_data.permission.id,
              role_id: this.permission_data.permission.role_id,
              description: this.permission_data.permission.description
            }
          ],
          permission_details: permission_details
        };

        await this.upsert_permission(permission);

        await this.get_permissions();

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
.v-text-field,
.v-textarea {
  width: 650px;
}
th {
  font-size: 16px !important;
  color: black !important;
}
td {
  font-size: 16px !important;
  color: black !important;
}
</style>
