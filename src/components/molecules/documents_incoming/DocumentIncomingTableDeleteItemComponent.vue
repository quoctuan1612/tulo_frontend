<template>
  <v-dialog v-model="value" max-width="500px" persistent>
    <v-card>
      <v-toolbar
        flat
        class="body-2 font-weight-bold mb-3"
        color="grey lighten-2"
      >
        <span class="title-form">Xóa văn bản đến</span>
      </v-toolbar>

      <v-card-text>
        Bạn có chắc chắn muốn xóa thông tin văn bản đến này không?
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
    ...mapGetters("documents", ["get_document_incoming_data"]),

    document_incoming_data() {
      return this.get_document_incoming_data;
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
    ...mapActions("documents", [
      "delete_document_incoming",
      "get_documents_incoming"
    ]),

    close() {
      this.dialog = false;
    },

    async delete() {
      try {
        await this.delete_document_incoming(this.document_incoming_data.id);

        await this.get_documents_incoming();

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
