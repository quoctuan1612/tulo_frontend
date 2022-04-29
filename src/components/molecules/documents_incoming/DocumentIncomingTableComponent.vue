<template>
  <div>
    <v-data-table :headers="headers" :items="documents_incoming_data">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="text-title-table"
            >Danh sách văn bản đến</v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <document-incoming-table-add-new-item-component />
        </v-toolbar>
      </template>
      <template v-slot:[`item.file_name`]="item">
        <a @click="download_file(item.item)">{{ item.item.file_name }}</a>
      </template>
      <template v-slot:[`item.actions`]="item">
        <v-icon
          small
          @click="show_document_incoming_update(item.item)"
          class="mr-2"
          >fas fa-pencil-alt</v-icon
        >
        <v-icon small @click="show_document_incoming_delete(item.item)"
          >fas fa-trash</v-icon
        >
      </template>
    </v-data-table>
    <document-incoming-table-update-item-component
      v-model="is_show_document_incoming_update"
    />
    <document-incoming-table-delete-item-component
      v-model="is_show_document_incoming_delete"
    />
  </div>
</template>

<script>
/**
 * import
 */
import { mapGetters, mapMutations, mapActions } from "vuex";
import DocumentIncomingTableAddNewItemComponent from "./DocumentIncomingTableAddNewItemComponent.vue";
import DocumentIncomingTableUpdateItemComponent from "./DocumentIncomingTableUpdateItemComponent.vue";
import DocumentIncomingTableDeleteItemComponent from "./DocumentIncomingTableDeleteItemComponent.vue";

/**
 * Vue
 */
export default {
  /**
   * components
   */
  components: {
    DocumentIncomingTableAddNewItemComponent,
    DocumentIncomingTableUpdateItemComponent,
    DocumentIncomingTableDeleteItemComponent
  },

  /**
   * data
   */
  data: () => ({
    headers: [
      { text: "Tên văn bản", value: "document_name" },
      { text: "Loại văn bản", value: "document_type_name" },
      { text: "Nơi đến", value: "document_destination_name" },
      { text: "Nội dung", value: "abstract", sortable: false },
      { text: "Tệp", value: "file_name", sortable: false },
      { text: "Thao tác", value: "actions", sortable: false }
    ],
    is_show_document_incoming_update: false,
    is_show_document_incoming_delete: false
  }),

  /**
   * computed
   */
  computed: {
    ...mapGetters("documents", [
      "get_documents_incoming_data",
      "get_document_types_data",
      "get_document_destinations_data"
    ]),

    documents_incoming_data() {
      return this.get_documents_incoming_data.map(document_incoming => {
        let {
          id,
          document_name,
          abstract,
          file_name,
          file_path
        } = document_incoming;
        let document_type_name = this.document_type_name_by_id(
          document_incoming.document_type_id
        );
        let document_destination_name = this.document_destination_name_by_id(
          document_incoming.document_destination_id
        );
        return {
          id,
          document_name,
          abstract,
          file_name,
          document_type_name,
          document_destination_name,
          file_path
        };
      });
    }
  },

  /**
   * method
   */
  methods: {
    ...mapActions("documents", [
      "get_document_incoming",
      "download_document_incoming",
      "get_document_incoming_file"
    ]),
    ...mapMutations("documents", ["set_document_incoming_file_data_null"]),

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

    async download_file(document_incoming) {
      await this.download_document_incoming(document_incoming);
    },

    async show_document_incoming_update(document_incoming) {
      await this.get_document_incoming(document_incoming.id);

      if (document_incoming.file_path) {
        await this.get_document_incoming_file(document_incoming);
      } else {
        this.set_document_incoming_file_data_null();
      }
      this.is_show_document_incoming_update = true;
    },

    async show_document_incoming_delete(document_incoming) {
      await this.get_document_incoming(document_incoming.id);
      this.is_show_document_incoming_delete = true;
    }
  }
};
</script>

<style></style>
