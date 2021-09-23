//import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";
//import httpClient from '../api/httpClient';
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

        user : state => state.user,

    },
    mutations : {

        SET_TOKEN : (state, token) => state.token = token, 

        LOGOUT : state => {
        state.token = null;
        state.user =null;
        sessionStorage.clear('vuex');
        },

        SET_USER : (state, user) => state.user = user

        },

    actions : {
        login({commit}, data) {
            commit("SET_TOKEN", data.token);
            
        },

        logout({commit}) {
            commit("LOGOUT");
        },

        setUser({commit}, user) {
            commit("SET_USER", user);
        }


    },
});