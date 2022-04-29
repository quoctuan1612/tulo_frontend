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
        <span class="title-form">Thêm mới văn bản đến</span>
      </v-toolbar>
      <v-card-text>
        <v-form class="px-3">
          <v-text-field
            ref="document_name"
            v-model="document_incoming.document_name"
            label="Tên văn bản"
            outlined
            :rules="[rules.required]"
          ></v-text-field>
          <v-select
            v-model="document_type_id"
            :items="document_types_data"
            item-text="document_type_name"
            item-value="id"
            label="Loại văn bản"
            :rules="[rules.required]"
            outlined
          ></v-select>
          <v-select
            v-model="document_destination_id"
            :items="document_destinations_data"
            item-text="document_destination_name"
            item-value="id"
            label="Nơi đến"
            :rules="[rules.required]"
            outlined
          ></v-select>
          <v-text-field
            ref="abstract"
            v-model="document_incoming.abstract"
            label="Tóm tắt"
            outlined
            :rules="[rules.required]"
          ></v-text-field>
          <v-file-input
            v-model="document_incoming.file"
            prepend-icon
            label="Tệp đính kèm"
            outlined
          ></v-file-input>
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

    document_incoming: {
      document_name: "",
      document_type_id: null,
      document_destination_id: null,
      abstract: null,
      file: null
    },

    defaultDocumentIncoming: {
      document_name: "",
      document_type_id: null,
      document_destination_id: null,
      abstract: "",
      file: null
    },

    document_type_id: null,
    document_destination_id: null,

    rules: {
      required: value => !!value || "Không được để trống."
    }
  }),

  /**
   * computed
   */
  computed: {
    ...mapGetters("documents", [
      "get_document_destinations_data",
      "get_document_types_data"
    ]),

    document_destinations_data() {
      let document_destinations = this.get_document_destinations_data.map(
        document_destination => {
          let { id, document_destination_name } = document_destination;
          return { id, document_destination_name };
        }
      );

      document_destinations.unshift({
        id: null,
        document_destination_name: ""
      });

      return document_destinations;
    },

    document_types_data() {
      let document_types = this.get_document_types_data.map(document_type => {
        let { id, document_type_name } = document_type;
        return { id, document_type_name };
      });

      document_types.unshift({ id: null, document_type_name: "" });

      return document_types;
    }
  },

  /**
   * methods
   */
  methods: {
    ...mapActions("documents", [
      "upsert_document_incoming",
      "get_documents_incoming"
    ]),

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.document_incoming = Object.assign(
          {},
          this.defaultDocumentIncoming
        );
      });
    },

    async save() {
      try {
        let formData = new FormData();
        formData.append("file", this.document_incoming.file);
        this.document_incoming.document_type_id = this.document_type_id;
        this.document_incoming.document_destination_id = this.document_destination_id;

        Object.entries(this.document_incoming).forEach(([key, value]) =>
          formData.append(key, value)
        );

        await this.upsert_document_incoming(formData);

        await this.get_documents_incoming();

        this.close();
      } catch (error) {
        this.$log.debug(error);
      }
    }
  }
};
</script>

<style></style>
