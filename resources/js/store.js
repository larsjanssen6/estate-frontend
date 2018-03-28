import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

const store = new Vuex.Store({

    state: {
        isLoggedIn: !!localStorage.getItem("token"),
        user: null
    },
    mutations: {
        [LOGIN] (state) {
            state.pending = true;
        },
        [LOGIN_SUCCESS] (state) {
            state.isLoggedIn = true;
            state.pending = false;
        },
        [LOGOUT](state) {
            state.isLoggedIn = false;
        }
    },

    actions: {
        login({state, commit, rootState}) {
            commit(LOGIN_SUCCESS);
        },

        setUser({state, commit, rootState}, user) {
            //todo
        }
    }
});

export default store;