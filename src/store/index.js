import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
//import auth from '../api/auth';



Vue.use(Vuex);

export default new Vuex.Store({
    strict : true,
    state : {
        token: null,
        user: null,
    
    },
    plugins : [createPersistedState ({
        storage : window.sessionStorage,
    })],

    getters : {
       
        isLogged: state => state.token !== null ,
       
    },
    mutations : {

        SET_TOKEN : (state, token) => state.token = token, 

        LOGOUT : state => state.token == null && state.user == null,
        },

    actions : {
        setToken({commit}, token) {
            commit("SET_TOKEN", token);
        },

        logout({commit}) {
            commit("LOGOUT");
        
        },
    
    },
});