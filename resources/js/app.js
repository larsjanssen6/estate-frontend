import VueRouter from 'vue-router';
import Login from './components/Login.vue';
import Home from './components/Home.vue';
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
Vue.use(Datetime)

window.Bus = new Vue();

const routes = [
    { path: '/', component: Login, name: 'login' },
    { path: '/home', component: Home, name: 'home' },
];

const router = new VueRouter({
    routes // short for `routes: routes`
});

const app = new Vue({
    router,
    store
}).$mount('#app');

function requireAuth() {
    return true;
}








