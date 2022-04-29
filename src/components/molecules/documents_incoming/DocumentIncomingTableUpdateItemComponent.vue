<template>
  <v-dialog v-model="value" max-width="700px" persistent>
    <v-card>
      <v-toolbar
        flat
        class="body-2 font-weight-bold mb-3"
        color="grey lighten-2"
      >
        <span class="title-form">Cập nhật thông tin văn bản đến</span>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-form class="px-3">
            <v-text-field
              ref="document_name"
              v-model="document_incoming_data.document_name"
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
              v-model="document_incoming_data.abstract"
              label="Tóm tắt"
              outlined
              :rules="[rules.required]"
            ></v-text-field>
            <v-file-input
              v-model="file"
              prepend-icon
              label="Tệp đính kèm"
              outlined
            ></v-file-input>
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
    document_incoming: {},
    document_type_id: null,
    document_destination_id: null,
    defaultDocumentIncoming: {
      document_type_id: null,
      document_destination_id: null
    },
    rules: {
      required: value => !!value || "Không được để trống."
    },
    file: null
  }),

  /**
   * computed
   */
  computed: {
    ...mapGetters("documents", [
      "get_document_destinations_data",
      "get_document_types_data",
      "get_document_incoming_data",
      "get_document_incoming_file_data"
    ]),

    document_incoming_data() {
      let {
        document_type_id,
        document_destination_id
      } = this.get_document_incoming_data;
      this.set_default_selected(
        document_type_id,
        document_destination_id,
        this.get_document_incoming_file_data
      );
      return this.get_document_incoming_data;
    },

    document_destinations_data() {
      let document_destinations = this.get_document_destinations_data.map(
        document_destination => {
          let { id, document_destination_name } = document_destination;
          return { id, document_destination_name };
        }
      );

      return document_destinations;
    },

    document_types_data() {
      let document_types = this.get_document_types_data.map(document_type => {
        let { id, document_type_name } = document_type;
        return { id, document_type_name };
      });

      return document_types;
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
      "upsert_document_incoming",
      "get_documents_incoming"
    ]),

    set_default_selected(
      document_type_id,
      document_destination_id,
      document_incoming_file
    ) {
      this.document_type_id = document_type_id;
      this.document_destination_id = document_destination_id;
      this.file = document_incoming_file;
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.document_processing_time = Object.assign(
          {},
          this.defaultDocumentProcessingTime
        );
        this.document_type_id = null;
        this.document_destination_id = null;
        this.file = null;
      });
    },

    // Save
    async save() {
      try {
        let { id, document_name, abstract } = this.document_incoming_data;
        let formData = new FormData();

        formData.append("file", this.file);

        this.document_incoming = {
          id: id,
          document_name: document_name,
          document_type_id: this.document_type_id,
          document_destination_id: this.document_destination_id,
          abstract: abstract
        };

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

<style scoped>
.title-form {
  font-size: 20px;
}
</style>
