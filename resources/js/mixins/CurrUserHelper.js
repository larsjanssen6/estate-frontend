import CookieHelper from "./CookieHelper";

export default {
    mixins: [CookieHelper],

    data() {
        return {
            cookies: ['user_id', 'role', 'first_name', 'is_authenticated', 'role']
        }
    },

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
    },

    methods: {
        signOut() {
            this.cookies.forEach((cookie) => {
                this.delCookie(cookie);
            });

            localStorage.clear();

            window.location = '/';
        }
    }
}