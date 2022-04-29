<template>
  <v-main>
    <v-container fluid>
      <v-row>
        <v-col cols="6">
          <div>
            <span class="text-title-component">Quản lý nơi đến</span>
          </div>
        </v-col>
        <v-col cols="6"> </v-col>
      </v-row>
      <v-card>
        <v-card-text>
          <document-destination-table-component />
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
import DocumentDestinationTableComponent from "../molecules/document_destinations/DocumentDestinationTableComponent.vue";

/**
 * Vue
 */
export default {
  /**
   * components
   */
  components: {
    DocumentDestinationTableComponent
  },

  /**
   * method
   */
  methods: {
    ...mapActions("documents", ["get_document_destinations"])
  },

  /**
   * beforeMount
   */
  beforeMount: function() {
    this.get_document_destinations();
  }
};
</script>
<style></style>
