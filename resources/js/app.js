import VueRouter from 'vue-router';
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import VModal from 'vue-js-modal'

window.Vue = require('vue');

Vue.use(VueRouter);
Vue.use(VModal);

// Check the user's auth status when the app starts
// auth.checkAuth()


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

