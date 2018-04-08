import VueRouter from 'vue-router';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import Notities from './components/Notities.vue';
import VModal from 'vue-js-modal';
import Vuex from 'vuex';
import store from './store';
import moment from 'moment';
import Datetime from 'vue-datetime';

window.Vue = require('vue');
window.Moment = moment;

Vue.use(VueRouter);
Vue.use(VModal);
Vue.use(Vuex);
Vue.use(Datetime);

window.Bus = new Vue();

const routes = [
    { path: '/', component: Login, name: 'login', meta: { guest: true }},
    { path: '/home', component: Home, name: 'home', meta: { requiresAuth: true }},
    { path: '/notities', component: Notities, name: 'notities', meta: { requiresAuth: true }},
];

const router = new VueRouter({
    routes // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!token || token === null) {
            next({
                path: '/',
            });
        }
    }

    if (to.matched.some(record => record.meta.guest)) {
        if (token || token !== null) {
            next({
                path: '/home',
            });
        }
    }

    next();
});

const app = new Vue({
    router,
    store
}).$mount('#app');









