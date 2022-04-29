<template>
  <div>
    <v-data-table :headers="headers" :items="document_destinations_data">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title class="text-title-table"
            >Danh sách nơi đến</v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <document-destination-table-add-new-item-component />
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="item">
        <v-icon
          small
          @click="show_document_destination_update(item.item)"
          class="mr-2"
          >fas fa-pencil-alt</v-icon
        >
        <v-icon small @click="show_document_destination_delete(item.item)"
          >fas fa-trash</v-icon
        >
      </template>
    </v-data-table>
    <document-destination-table-update-item-component
      v-model="is_show_document_destination_update"
    />
    <document-destination-table-delete-item-component
      v-model="is_show_document_destination_delete"
    />
  </div>
</template>

<script>
/**
 * import
 */
import { mapGetters, mapActions } from "vuex";
import DocumentDestinationTableAddNewItemComponent from "./DocumentDestinationTableAddNewItemComponent.vue";
import DocumentDestinationTableUpdateItemComponent from "./DocumentDestinationTableUpdateItemComponent.vue";
import DocumentDestinationTableDeleteItemComponent from "./DocumentDestinationTableDeleteItemComponent.vue";

/**
 * Vue
 */
export default {
  /**
   * components
   */
  components: {
    DocumentDestinationTableAddNewItemComponent,
    DocumentDestinationTableUpdateItemComponent,
    DocumentDestinationTableDeleteItemComponent
  },

  /**
   * data
   */
  data: () => ({
    headers: [
      { text: "Tên nơi đến", value: "document_destination_name" },
      { text: "Email", value: "email" },
      { text: "Số điện thoại", value: "phone" },
      { text: "Mô tả", sortable: false, value: "description" },
      { text: "Thao tác", value: "actions", sortable: false }
    ],
    is_show_document_destination_update: false,
    is_show_document_destination_delete: false
  }),

  /**
   * computed
   */
  computed: {
    ...mapGetters("documents", ["get_document_destinations_data"]),

    document_destinations_data() {
      return this.get_document_destinations_data;
    }
  },

  /**
   * method
   */
  methods: {
    ...mapActions("documents", ["get_document_destination"]),

    async show_document_destination_update(document_destination) {
      await this.get_document_destination(document_destination.id);
      this.is_show_document_destination_update = true;
    },

    async show_document_destination_delete(document_destination) {
      await this.get_document_destination(document_destination.id);
      this.is_show_document_destination_delete = true;
    }
  }
};
</script>

<style></style>
