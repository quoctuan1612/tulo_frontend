<template>
  <v-navigation-drawer app permanent color="#2a3f54">
    <v-list class="py-0">
      <v-list-item class="px-0" v-for="(item, index) in items" :key="index">
        <v-expansion-panels>
          <v-expansion-panel class="white--text">
            <v-expansion-panel-header
              color="#2a3f54"
              class="pb-1 pl-3 text-left"
              disable-icon-rotate
            >
              <v-col class="px-0 py-0" cols="1">
                <v-icon class="white--text d-inline-block">
                  {{ item.icon }}
                </v-icon>
              </v-col>
              <v-col class="pl-3 py-0">
                <span class="pl-3 pb-0 parent d-inline-block">
                  {{ item.title_side_menu }}
                </span>
              </v-col>
              <template v-slot:actions>
                <v-icon color="white" small>
                  fas fa-angle-down
                </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content color="#2a3f54">
              <ul>
                <li
                  v-for="(item, index) in item.title_child_menu"
                  :key="index"
                  link
                >
                  <router-link
                    :to="{ name: item.link }"
                    custom
                    v-slot="{ navigate }"
                  >
                    <span class="child" @click="navigate" role="link">
                      {{ item.title }}
                    </span>
                  </router-link>
                </li>
              </ul>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
/**
 * Vue
 */
export default {
  /**
   * data
   */
  data: () => ({
    items: [
      {
        icon: "fa fa-edit",
        title_side_menu: "Quản lý",
        title_child_menu: [
          { title: "Quản lý chức vụ", link: "Roles" },
          { title: "Quản lý phòng ban", link: "Departments" },
          { title: "Quản lý nhân viên", link: "Employees" }
        ]
      },
      {
        icon: "fas fa-user",
        title_side_menu: "Tài khoản",
        title_child_menu: [
          { title: "Quản lý nhóm quyền", link: "Permissions" },
          { title: "Quản lý người dùng", link: "Users" }
        ]
      },
      {
        icon: "fa-solid fa-file",
        title_side_menu: "Văn bản",
        title_child_menu: [
          { title: "Quản lý nơi đến", link: "DocumentDestinations" },
          {
            title: "Quản lý thời hạn xử lý văn bản đến",
            link: "DocumentProcessingTimes"
          },
          { title: "Quản lý văn bản đến", link: "DocumentsIncoming" }
        ]
      }
    ]
  })
};
</script>

<style scoped>
.parent {
  font-size: 16px;
}

.child {
  font-size: 14px;
}

ul {
  position: relative;
}

li {
  margin-bottom: 9px;
  cursor: pointer;
}

li:after {
  border-left: 1px solid white;
  bottom: 0;
  content: "";
  left: 9.5px;
  position: absolute;
  top: 0;
}
</style>
