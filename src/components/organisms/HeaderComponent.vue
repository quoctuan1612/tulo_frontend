<template>
  <v-app-bar app dense color="rgb(237,237,237)" elevation="2">
    <v-toolbar-title>
      <h2></h2>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <div v-if="current_user">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <span class="pr-4" v-bind="attrs" v-on="on"
            ><v-icon dense>fa-user</v-icon>
            {{ current_user.employee_name }} ▼</span
          >
        </template>

        <v-list>
          <v-list-item dense>
            <v-list-item-title>
              <v-row @click="logout" style="cursor: pointer">
                <v-col cols="9">
                  <span style="font-size: 15px">Đăng xuất</span>
                </v-col>
                <v-col cols="3">
                  <v-icon dense>fa-sign-out-alt</v-icon>
                </v-col>
              </v-row>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
/**
 * import
 */
import { mapGetters, mapActions } from "vuex";

/**
 * Vue
 */
export default {
  /**
   * computed
   */
  computed: {
    ...mapGetters("common", ["get_current_user"]),

    current_user() {
      return this.get_current_user;
    }
  },

  /**
   * methods
   */
  methods: {
    ...mapActions("common", ["get_logout"]),

    logout() {
      this.get_logout();
    }
  }
};
</script>

<style lang="scss" scoped>
.v-toolbar__title {
  display: flex;
  align-items: center;
  h2 {
    content: url("../../assets/svg/tulo.svg");
    width: auto;
    height: 26px;
    display: inline-block;
    &:hover {
      cursor: pointer;
    }
  }
}
.v-row:hover {
  &:hover {
    cursor: pointer;
  }
}
</style>
