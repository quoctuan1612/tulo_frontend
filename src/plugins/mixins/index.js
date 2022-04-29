import { mapGetters, mapMutations } from "vuex";

export default {
  beforeCreate: function() {},
  created: function() {},
  beforeMount: function() {},
  mounted: function() {},
  beforeUpdate: function() {},
  updated: function() {},
  beforeDestroy: function() {},
  destroyed: function() {},

  /**
   * computed
   */
  computed: {
    /**
     * mapGetters
     */
    ...mapGetters("global", ["v_error", "v_error_f", "v_error_ff"])
  },

  /**
   * methods
   */
  methods: {
    /**
     * mapMutations
     */
    ...mapMutations("global", ["delete_error_messages"]),

    /**
     * Gets the master's ID and returns name
     *
     * @param {*} obj
     * @param {*} id
     * @returns name
     */
    name_by_id(obj, id) {
      let ret = obj.find(obj => obj.id == id);
      if (ret) {
        return ret.name;
      } else {
        return null;
      }
    },

    /**
     * field_name_by_id
     *
     * @param {*} obj
     * @param {*} id
     * @param {*} field_name
     * @returns name of field_name
     */
    field_name_by_id(obj, id, field_name) {
      let ret = obj.find(obj => obj.id == id);
      if (ret) {
        return ret[field_name];
      } else {
        return null;
      }
    },

    /**
     * full_name_by_id
     *
     * @param {*} obj
     * @param {*} id
     * @returns first_name last_name
     */
    full_name_by_id(obj, id) {
      let ret = obj.find(obj => obj.id == id);
      if (ret) {
        if (ret.first_name === null || ret.first_name === "") {
          return ret.last_name;
        }

        if (ret.last_name === null || ret.last_name === "") {
          return ret.first_name;
        }

        return `${ret.first_name} ${ret.last_name}`;
      } else {
        return null;
      }
    },

    /**
     * empty_hyphen
     *
     * @param {*} string
     * @returns
     */
    empty_hyphen(string) {
      if (string === null || string === "") {
        return "-";
      } else {
        return string;
      }
    },

    clear_error_messages() {
      this.delete_error_messages();
    }
  }
};
