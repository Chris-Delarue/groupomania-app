
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";


import httpClient from '../api/httpClient';


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

        SET_TOKEN : (state, token) =>  {
            httpClient.defaults.headers.common['Authorization'] = `${token}`;
           console.log(httpClient.defaults.headers);
            state.token = token;
            console.log(token);
        },

        LOGOUT : state => {
            state.token = null;
            state.user = null;
        },

        SET_USER : (state, user) => state.user = user

        },

    actions : {
        login({commit}, data) {
            commit("SET_TOKEN", data.token);
            console.log(data.token)
            
        },

        logout({commit}) {
            commit("LOGOUT");
        },

        setUser({commit}, user) {
            commit("SET_USER", user);
        }


    },
});