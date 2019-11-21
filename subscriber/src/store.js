import Vue from "vue";
import Vuex from "vuex";

import idb from "@/api/idb";
import idb2 from '@/api/dataDB';
import axios from 'axios'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: null,
    loggingIn: false,
    loginError: null,
    users: [],
    datas:[]
  },
  mutations: {
    loginStart: state => state.loggingIn = true,
    loginStop: (state, errorMessage) => {
      state.loggingIn = false;
      state.loginError = errorMessage;
    },
    updateAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    }
  },
  actions: {
    doLogin({ commit }, loginData) {
      commit('loginStart');

      axios.post('https://reqres.in/api/login', {
        ...loginData
      })
      .then(response => {
        localStorage.setItem('accessToken', response.data.token);
        commit('loginStop', null);
        commit('updateAccessToken', response.data.token);
      })
      .catch(error => {
        commit('loginStop', error.response.data.error);
        commit('updateAccessToken', null);
      })
    },
    fetchAccessToken({ commit }) {
      commit('updateAccessToken', localStorage.getItem('accessToken'));
    },
    ////////////////////
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
      console.log('store is being asked to delete '+data.id);
      await idb2.deleteData(data); 
    },
    async getDatas(context) {
      context.state.datas = [];
      let datas = await idb2.getDatas();
      datas.forEach(c => {
          context.state.datas.push(c);
      });
    },

    async getProblem(context) {
      context.state.datas = [];
      let datas = await idb2.getDatas();
      datas.forEach(c => {
        if((c.items) === 'Problem'){
          context.state.datas.push(c);
        }
        
      });
    },

    async getSolution(context) {
      context.state.datas = [];
      let datas = await idb2.getDatas();
      datas.forEach(c => {
        if((c.items) === "Solution")
          context.state.datas.push(c);
      });
    },
    
    async saveData(context, data) {
      await idb2.saveData(data);
    }
  }
});
