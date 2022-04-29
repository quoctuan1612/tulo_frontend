<template>
  <v-dialog v-model="value" max-width="500px" persistent>
    <v-card>
      <v-toolbar
        flat
        class="body-2 font-weight-bold mb-3"
        color="grey lighten-2"
      >
        <span class="title-form">Xóa phòng ban</span>
      </v-toolbar>

      <v-card-text>
        Bạn có chắc chắn muốn xóa thông tin phòng ban này không?
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn depressed color="blue-grey" @click="close">
          Thoát
        </v-btn>
        <v-btn depressed color="error" @click="this.delete">
          Xóa
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
   * computed
   */
  computed: {
    ...mapGetters("departments", ["get_department_data"]),

    department_data() {
      return this.get_department_data;
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
    ...mapActions("departments", ["delete_department", "get_departments"]),

    close() {
      this.dialog = false;
    },

    async delete() {
      try {
        await this.delete_department(this.department_data.id);

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
