<template>
    <div class="container mx-auto">
        <button class="bg-teal font-semibold text-white py-2 px-4 border border-teal hover:border-transparent rounded m-4" @click="$modal.show('registration');">Registreer gebruiker</button>

        <table class="text-left m-4 w-full bg-white" style="border-collapse:collapse">
            <thead>
            <tr>
                <th class="th">Naam</th>
                <th class="th">Achternaam</th>
                <th class="th">Woonplaats</th>
                <th class="th">Lid sinds</th>
                <th class="th">Opties</th>
            </tr>
            </thead>
            <tbody>
                <tr class="hover:bg-blue-lightest" v-for="user in users">
                    <td class="tr">{{ user.first_name }}</td>
                    <td class="tr">{{ user.surname }}</td>
                    <td class="tr">{{ user.city }}</td>
                    <td class="tr">{{ user.date_joined }}</td>
                    <td class="tr">
                        <button class="btn-normal" type="button" @click="showUser(user)">
                            Bekijken
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <userdetails></userdetails>
        <register></register>
    </div>
</template>

<script>
    import axios from '../axios';
    import register from './Register';
    import userdetails from './User';

    export default {
        components: {
            register,
            userdetails
        },

        data() {
            return {
                users: []
            }
        },

        created() {
            axios.get('users').then(({data}) => {
                this.users = data;
            });
        },

        methods: {
            showUser(user) {
                Bus.$emit('show-user', user);
            }
        }
    }
</script>