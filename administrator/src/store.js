import Vue from "vue";
import Vuex from "vuex";
import { isNull } from "util";
import idb from "@/api/idb";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    authenticated: isNull(sessionStorage.getItem("authenticated")) ? false : true
  },
  mutations: { setAuthentication(state, status) {
    sessionStorage.setItem("authenticated", status)
    state.authenticated = status;
}},
  actions: {
    async deleteUser(context, user) {
      console.log("store is being asked to delete " + user.id);
      await idb.deleteUser(user);
    },
    async getUsers(context) {
      context.state.users = null;
      let users = await idb.getUsers();
      console.log(users);
        context.state.users = users;
    },
    async saveUser(context, user) {
      await idb.saveUser(user);
    },
    async deleteData(context, data) {
      console.log("store is being asked to delete " + data.id);
      await idb.deleteData(data);
    },
    async getDatas(context) {
      context.state.datas = null;
      let datas = await idb.getDatas();
      console.log(datas);
        context.state.datas = datas;
    },
    async saveData(context, data) {
      await idb.saveData(data);
    }
  }
});
