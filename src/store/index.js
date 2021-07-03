import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import createPersistedState from 'vuex-persistedState';



Vue.use(Vuex)

const getDefaultState = 0 => {
  return {
    token: '',
    user: {}
  }
}

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: getDefaultState(),
  getters: {
    isoggedIn: state => {
      return state.token;
    },
    getuser: state => {
      return state.user;
    }
  },
  mutations :{
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user)  => {
    state.user = user;
    },
    RESET : state => {
    Object.assign(state, getDefaultState());
    }
  },
  actions: {
    login:({ commit, dispatch}, {token, user}) => {
      commmit('SET_TOKEN', token);
      commit('SET_USER', user);
      
      Axios.defaults.headers.common['Authorization'] = `Bearer${token};`
    },
    logout: ({commit}) ={
      commit('RESET',``);
    }
  }
})
