import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex)

export default new Vuex.Store({
    strict : true,
    state : {
        token: null,
        user : null,
  
    },
    plugins : [createPersistedState ({
        storage : window.sessionStorage,
    })],

    getters : {
       
        isLogged: state => state.token != null && state.user != null
        
    },
    mutations : {

        setToken : (state, token) => state.token = token,
        
        logout : state => state.token == null && state.user == null || window.sessionStorage.clear()
      
    },
    actions : {
        SET_TOKEN({commit}, token) {
            commit("setToken", token);
        },
        LOGOUT({commit}) {
            commit("logout");
        },
    }
})