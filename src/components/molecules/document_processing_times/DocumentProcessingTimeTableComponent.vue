<template>
  <div>
    <v-data-table :headers="headers" :items="document_processing_times_data">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="text-title-table"
            >Danh sách thời hạn xử lý văn bản đến</v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <document-processing-time-table-add-new-item-component />
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="item">
        <v-icon
          small
          @click="show_document_processing_time_update(item.item)"
          class="mr-2"
          >fas fa-pencil-alt</v-icon
        >
        <v-icon small @click="show_document_processing_time_delete(item.item)"
          >fas fa-trash</v-icon
        >
      </template>
    </v-data-table>
    <document-processing-time-table-update-item-component
      v-model="is_show_document_processing_time_update"
    />
    <document-processing-time-table-delete-item-component
      v-model="is_show_document_processing_time_delete"
    />
  </div>
</template>

<script>
/**
 * import
 */
import { mapGetters, mapActions } from "vuex";
import DocumentProcessingTimeTableAddNewItemComponent from "./DocumentProcessingTimeTableAddNewItemComponent.vue";
import DocumentProcessingTimeTableUpdateItemComponent from "./DocumentProcessingTimeTableUpdateItemComponent.vue";
import DocumentProcessingTimeTableDeleteItemComponent from "./DocumentProcessingTimeTableDeleteItemComponent.vue";

/**
 * Vue
 */
export default {
  /**
   * components
   */
  components: {
    DocumentProcessingTimeTableAddNewItemComponent,
    DocumentProcessingTimeTableUpdateItemComponent,
    DocumentProcessingTimeTableDeleteItemComponent
  },

  /**
   * data
   */
  data: () => ({
    headers: [
      { text: "Loại văn bản", value: "document_type_name" },
      { text: "Nơi đến", value: "document_destination_name" },
      { text: "Thời hạn (ngày)", value: "processing_time", sortable: false },
      { text: "Thao tác", value: "actions", sortable: false }
    ],
    is_show_document_processing_time_update: false,
    is_show_document_processing_time_delete: false
  }),

  /**
   * computed
   */
  computed: {
    ...mapGetters("documents", [
      "get_document_processing_times_data",
      "get_document_destinations_data",
      "get_document_types_data"
    ]),

    document_processing_times_data() {
      return this.get_document_processing_times_data.map(
        document_processing_time => {
          let { id, processing_time } = document_processing_time;
          let document_type_name = this.document_type_name_by_id(
            document_processing_time.document_type_id
          );
          let document_destination_name = this.document_destination_name_by_id(
            document_processing_time.document_destination_id
          );
          return {
            id,
            document_type_name,
            document_destination_name,
            processing_time
          };
        }
      );
    }
  },

  /**
   * method
   */
  methods: {
    ...mapActions("documents", ["get_document_processing_time"]),

    document_destination_name_by_id(id) {
      let ret = this.get_document_destinations_data.find(
        document_destination => document_destination.id == id
      );
      if (ret) {
        return ret.document_destination_name;
      } else {
        return null;
      }
    },

    document_type_name_by_id(id) {
      let ret = this.get_document_types_data.find(
        document_type => document_type.id == id
      );
      if (ret) {
        return ret.document_type_name;
      } else {
        return null;
      }
    },

    async show_document_processing_time_update(document_processing_time) {
      await this.get_document_processing_time(document_processing_time.id);
      this.is_show_document_processing_time_update = true;
    },

    async show_document_processing_time_delete(document_processing_time) {
      await this.get_document_processing_time(document_processing_time.id);
      this.is_show_document_processing_time_delete = true;
    }
  }
};
</script>

<style></style>
