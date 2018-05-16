export default {
    methods: {
        getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },

        delCookie(name) {
            document.cookie = name+'=; expires=Thu, 2 Aug 2001 20:47:11 UTC; path=';
        }
    }
}