export default [
    {
      path: "",
      name: "home",
      component: () => import("../pages/home")
    },
    {
      path: "/note/:id",
      name: "noteView",
      component: () => import("../pages/note")
    },
    {
      path: "/calendar",
      name: "calendar",
      component: () => import("../pages/calendar")
    },
  ];
  