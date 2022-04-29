<template>
  <v-dialog v-model="value" max-width="700px" persistent>
    <v-card>
      <v-toolbar
        flat
        class="body-2 font-weight-bold mb-3"
        color="grey lighten-2"
      >
        <span class="title-form">Cập nhật thông tin nơi đến</span>
      </v-toolbar>

      <v-card-text>
        <v-form class="px-3">
          <v-text-field
            v-model="document_destination_data.document_destination_name"
            label="Tên nơi đến"
            :error-messages="v_error('document_destination_name')"
            :rules="[rules.required]"
            outlined
          ></v-text-field>
          <v-text-field
            v-model="document_destination_data.email"
            label="Email"
            outlined
            :rules="[rules.email]"
          ></v-text-field>
          <v-text-field
            v-model="document_destination_data.phone"
            label="Số điện thoại"
            outlined
          ></v-text-field>
          <v-textarea
            v-model="document_destination_data.description"
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
        <v-btn depressed color="error" @click="save">
          Cập nhật
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
    document_destination: {},

    rules: {
      required: value => !!value || "Không được để trống.",
      email: value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Email không hợp lệ.";
      }
    }
  }),

  /**
   * computed
   */
  computed: {
    ...mapGetters("documents", ["get_document_destination_data"]),

    document_destination_data() {
      return this.get_document_destination_data;
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
      "upsert_document_destination",
      "get_document_destinations"
    ]),

    close() {
      this.dialog = false;
    },

    async save() {
      try {
        let {
          id,
          document_destination_name,
          email,
          phone,
          description
        } = this.document_destination_data;
        this.document_destination = {
          id: id,
          document_destination_name: document_destination_name,
          email: email,
          phone: phone,
          description: description
        };

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
