import VueRouter from "vue-router";
Vue.use(VueRouter);

//Pages
import Home from "../../client/pages/Home.vue";
import Items from "../../client/pages/Items.vue";
import ItemNew from "../../client/pages/ItemNew.vue";
import ItemEdit from "../../client/pages/ItemEdit.vue";
//Config router
const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/item",
      name: "item",
      component: Items
    },
    {
      path: "/itemNew",
      name: "itemNew",
      component: ItemNew
    },
    {
      path: ":_id/itemEdit",
      name: "itemEdit",
      component: ItemEdit
    }
  ]
});
export default router;
