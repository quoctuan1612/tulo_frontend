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
        <span class="title-form">Thêm mới nơi đến</span>
      </v-toolbar>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field
            v-model="document_destination.document_destination_name"
            label="Tên nơi đến"
            :error-messages="v_error('document_destination_name')"
            :rules="[rules.required]"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="document_destination.email"
            label="Email"
            outlined
            :rules="[rules.email]"
          ></v-text-field>
          <v-text-field
            v-model="document_destination.phone"
            label="Số điện thoại"
            outlined
          ></v-text-field>
          <v-textarea
            v-model="document_destination.description"
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

    document_destination: {
      document_destination_name: null,
      email: null,
      phone: null,
      description: null
    },

    defaultDocumentDestination: {
      document_destination_name: null,
      email: null,
      phone: null,
      description: null
    },

    rules: {
      required: value => !!value || "Không được để trống.",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Email không hợp lệ.";
      }
    }
  }),

  /**
   * methods
   */
  methods: {
    ...mapActions("documents", [
      "upsert_document_destination",
      "get_document_destinations"
    ]),

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.document_destination = Object.assign(
          {},
          this.defaultDocumentDestination
        );
      });
    },

    // Save
    async save() {
      try {
        await this.upsert_document_destination(this.document_destination);

        await this.get_document_destinations();

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
