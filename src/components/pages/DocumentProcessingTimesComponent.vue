<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col cols="6">
          <div>
            <span class="text-title-component"
              >Quản lý thời hạn xử lý văn bản đến</span
            >
          </div>
        </v-col>
        <v-col cols="6"> </v-col>
      </v-row>
      <v-card>
        <v-card-text>
          <document-processing-time-table-component />
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
import DocumentProcessingTimeTableComponent from "../molecules/document_processing_times/DocumentProcessingTimeTableComponent.vue";

/**
 * Vue
 */
export default {
  /**
   * components
   */
  components: {
    DocumentProcessingTimeTableComponent
  },

  /**
   * method
   */
  methods: {
    ...mapActions("documents", [
      "get_document_processing_times",
      "get_document_types",
      "get_document_destinations"
    ])
  },

  /**
   * beforeMount
   */
  beforeMount: function() {
    this.get_document_processing_times();
    this.get_document_types();
    this.get_document_destinations();
  }
};
</script>
<style></style>
