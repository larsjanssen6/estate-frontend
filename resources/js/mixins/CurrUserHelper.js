import CookieHelper from "./CookieHelper";

export default {
    mixins: [CookieHelper],

    computed: {
        username() {
            return this.getCookie('first_name');
        },

        isAuthenticated() {
            return this.getCookie('is_authenticated');
        },

        isAdmin() {
            return this.getCookie('role') == 'Admin';
        }
    }
}