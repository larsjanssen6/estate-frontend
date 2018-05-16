<template>
    <div class="flex justify-center mt-16">
        <div class="w-full max-w-xs">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="login" @keydown.enter.prevent="login">
                <div class="mb-4">
                    <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                        Gebruikersnaam
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" :class="{ 'border-red': wrong }" id="username" type="text" placeholder="Username" v-model="creds.username">
                </div>
                <div class="mb-6">
                    <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
                        Wachtwoord
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3" :class="{ 'border-red': wrong }" id="password" type="password" placeholder="******************" v-model="creds.password">
                    <p class="text-red text-xs italic" v-if="wrong">Login gegevens zijn onjuist.</p>
                </div>
                <div class="flex items-center justify-between">
                    <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="submit">
                        Login
                    </button>
                    <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
                        Wachtwoord vergeten?
                    </a>
                </div>
            </form>
            <p class="text-center text-grey text-xs">
                ©2018 Estate. All rights reserved.
            </p>
        </div>
    </div>
</template>

<script>
    import axios from '../axios';

    export default {
        data() {
            return {
                creds: {
                    username: "",
                    password: ""
                },

                wrong: false
            }
        },

        methods: {
            login() {
                axios.post('token/generate-token', this.creds).then(({data}) => {
                    localStorage.setItem('token', data.token);
                    this.getUser();
                }).catch((error) => {
                    this.wrong = true;
                });
            },

            getUser() {
                axios.get('/user').then((response) => {
                    document.cookie = "user_id=" + response.data.id;
                    document.cookie = "role=" + response.data.role;
                    document.cookie = "first_name=" + response.data.first_name;
                    document.cookie = "is_authenticated=" + true;
                    document.cookie = "role=" + response.data.role;

                    location.reload();
                });
            }
        }
    }
</script>