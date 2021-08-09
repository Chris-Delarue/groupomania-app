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

        token : state => state.token,
       
    },
    mutations : {

        SET_TOKEN : (state, token) => state.token = token, 

        LOGOUT : state => state.token == null && state.user == null,
        },

    actions : {
        login({commit}, data) {
            commit("SET_TOKEN", data.token);
        },

        logout({commit}) {
            commit("LOGOUT");
        
        },
    
    },
});