<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col cols="6">
          <div>
            <span class="text-title-component">Quản lý văn bản đến</span>
          </div>
        </v-col>
        <v-col cols="6"> </v-col>
      </v-row>
      <v-card>
        <v-card-text>
          <document-incoming-table-component />
        </v-card-text>
      </v-card>
    </v-container>
  </v-main>
</template>
<script>
/**
 * import
 */
import { mapActions } from "vuex";
import DocumentIncomingTableComponent from "../molecules/documents_incoming/DocumentIncomingTableComponent.vue";

/**
 * Vue
 */
export default {
  /**
   * components
   */
  components: {
    DocumentIncomingTableComponent
  },

  /**
   * method
   */
  methods: {
    ...mapActions("documents", [
      "get_documents_incoming",
      "get_document_destinations",
      "get_document_types"
    ])
  },

  /**
   * beforeMount
   */
  beforeMount: function() {
    this.get_documents_incoming();
    this.get_document_destinations();
    this.get_document_types();
  }
};
</script>
<style></style>
