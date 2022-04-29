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
        <span class="title-form">Thêm mới chức vụ</span>
      </v-toolbar>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field
            v-model="role.role_id"
            label="Mã chức vụ"
            :error-messages="v_error('role_id')"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="role.role_name"
            label="Tên chức vụ"
            :error-messages="v_error('role_name')"
            outlined
          ></v-text-field>
          <v-textarea
            v-model="role.description"
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
import { mapActions } from "vuex";

/**
 * Vue
 */
export default {
  /**
   * data
   */
  data: () => ({
    dialog: false,

    role: {
      role_id: null,
      role_name: null,
      description: null
    },

    defaultRole: {
      role_id: null,
      role_name: null,
      description: null
    }
  }),

  /**
   * methods
   */
  methods: {
    ...mapActions("common", ["upsert_role", "get_roles"]),

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.role = Object.assign({}, this.defaultRole);
      });
    },

    // Save
    async save() {
      try {
        await this.upsert_role(this.role);

        await this.get_roles();

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
