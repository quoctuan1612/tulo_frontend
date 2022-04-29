<template>
  <v-dialog v-model="value" max-width="700px" persistent>
    <v-card>
      <v-toolbar
        flat
        class="body-2 font-weight-bold mb-3"
        color="grey lighten-2"
      >
        <span class="title-form">Cập nhật thông tin chức vụ</span>
      </v-toolbar>

      <v-card-text>
        <v-form class="px-3">
          <v-text-field
            label="Mã chức vụ"
            v-model="role_data.role_id"
            disabled
            outlined
          ></v-text-field>
          <v-text-field
            label="Tên chức vụ"
            v-model="role_data.role_name"
            outlined
          ></v-text-field>
          <v-textarea
            label="Mô tả"
            v-model="role_data.description"
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
    role: {}
  }),

  /**
   * computed
   */
  computed: {
    ...mapGetters("common", ["get_role_data"]),

    role_data() {
      return this.get_role_data;
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
    ...mapActions("common", ["upsert_role", "get_roles"]),

    close() {
      this.dialog = false;
    },

    async save() {
      try {
        let { id, role_id, role_name, description } = this.role_data;
        this.role = {
          id: id,
          role_id: role_id,
          role_name: role_name,
          description: description
        };

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
