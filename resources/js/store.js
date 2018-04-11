import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

export const store = new Vuex.Store({
    state: {
        user: {},
        authenticated: false
    },

    getters: {
        isAuthenticated(state) {
            return state.authenticated;
        },
    },

    mutations: {
        setUser(state, user) {
            state.authenticated = true;
            state.user = user;
        },

        logout(state) {
            localStorage.removeItem('token');
            state.authenticated = false;
        }
    },

    actions: {
        logout(context) {
            alert('logout');
            context.commit('logout');
        }
    }
});

export default store;