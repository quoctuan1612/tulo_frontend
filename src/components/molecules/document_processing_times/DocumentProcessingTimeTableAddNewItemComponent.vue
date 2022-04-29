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
        <span class="title-form">Thêm mới thời hạn xử lý văn bản đến</span>
      </v-toolbar>
      <v-card-text>
        <v-form class="px-3">
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
            v-model="document_processing_time.processing_time"
            type="number"
            label="Thời hạn xử lý"
            min="1"
            :rules="[rules.number]"
            outlined
          ></v-text-field>
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

    document_processing_time: {
      document_type_id: null,
      document_destination_id: null,
      processing_time: null
    },

    defaultDocumentProcessingTime: {
      document_type_id: null,
      document_destination_id: null,
      processing_time: null
    },

    document_type_id: null,
    document_destination_id: null,

    rules: {
      required: value => !!value || "Không được để trống.",
      number: value => {
        const pattern = /^[0-9]+$/;
        return pattern.test(value) || "Thời gian không hợp lệ.";
      }
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
      "upsert_document_processing_time",
      "get_document_processing_times"
    ]),

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.document_processing_time = Object.assign(
          {},
          this.defaultDocumentProcessingTime
        );
      });
    },

    // Save
    async save() {
      try {
        this.document_processing_time.document_type_id = this.document_type_id;
        this.document_processing_time.document_destination_id = this.document_destination_id;

        await this.upsert_document_processing_time(
          this.document_processing_time
        );

        await this.get_document_processing_times();

        this.close();
      } catch (error) {
        this.$log.debug(error);
      }
    }
  }
};
</script>

<style></style>
