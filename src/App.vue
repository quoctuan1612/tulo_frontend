<template>
  <div>
    <v-app v-if="current_user">
      <sidebars />
      <header-component />
      <router-view></router-view>
    </v-app>
    <login-component v-if="!current_user" />
  </div>
</template>

<script>
/**
 * import
 */
import { mapGetters } from "vuex";
import Sidebars from "./components/organisms/SidebarsComponent.vue";
import HeaderComponent from "./components/organisms/HeaderComponent.vue";
import LoginComponent from "./components/pages/LoginComponent.vue";

/**
 * Vue
 */
export default {
  /**
   * components
   */
  components: {
    Sidebars,
    HeaderComponent,
    LoginComponent
  },

  /**
   * computed
   */
  computed: {
    ...mapGetters("common", ["get_current_user"]),

    current_user() {
      return this.get_current_user;
    }
  }
};
</script>

<style>
.text-title-component {
  font-size: 38px;
  color: #738a9e;
}

.text-title-table {
  font-size: 18px;
  color: #738a9e;
}

/* @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'); */
@import url("http://fonts.cdnfonts.com/css/helvetica-neue-9");
</style>
