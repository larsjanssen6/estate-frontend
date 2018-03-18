import VueRouter from 'vue-router';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import VModal from 'vue-js-modal';
import Vuex from 'vuex';

window.Vue = require('vue');

Vue.use(VueRouter);
Vue.use(VModal);
Vue.use(Vuex);

// Check the user's auth status when the app starts
// auth.checkAuth()

window.Bus = new Vue();

const routes = [
    { path: '/', component: Login, name: 'login' },
    { path: '/home', component: Home, name: 'home', beforeEnter: requireAuth },
];

const router = new VueRouter({
    routes // short for `routes: routes`
});

const app = new Vue({
    router
}).$mount('#app');

function requireAuth (to, from, next) {
    if (!loggedIn()) {
        router.push('/');
    } else {
        next()
    }
}

function loggedIn() {
    return localStorage.token !== undefined;
}

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

const store = new Vuex.Store({
    state: {
        isLoggedIn: !!localStorage.getItem("token")
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
    }
});

