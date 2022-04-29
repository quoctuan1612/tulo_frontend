import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const STORAGE_KEY = "id_token";

const routes = [
  {
    path: "/departments",
    name: "Departments",
    component: () => import("../components/pages/DepartmentsComponent.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/roles",
    name: "Roles",
    component: () => import("../components/pages/RolesComponent.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/employees",
    name: "Employees",
    component: () => import("../components/pages/EmployeesComponent.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/document/document-destinations",
    name: "DocumentDestinations",
    component: () =>
      import("../components/pages/DocumentDestinationsComponent.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/document/document-processing-times",
    name: "DocumentProcessingTimes",
    component: () =>
      import("../components/pages/DocumentProcessingTimesComponent.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/permissions",
    name: "Permissions",
    component: () => import("../components/pages/PermissionsComponent.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../components/pages/UsersComponent.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/documents-incoming",
    name: "DocumentsIncoming",
    component: () =>
      import("../components/pages/DocumentsIncomingComponent.vue"),
    meta: { requiresAuth: true }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem(STORAGE_KEY);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!loggedIn) {
      next();
      next({
        path: "/login"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
