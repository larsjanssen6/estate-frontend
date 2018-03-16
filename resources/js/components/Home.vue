<template>
    <div class="container mx-auto">
        <button class="bg-teal font-semibold text-white py-2 px-4 border border-teal hover:border-transparent rounded m-4" @click="$modal.show('registration');">Registreer gebruiker</button>

        <table class="text-left m-4 w-full" style="border-collapse:collapse">
            <thead>
            <tr>
                <th class="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Naam</th>
                <th class="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Achternaam</th>
                <th class="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Woonplaats</th>
                <th class="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Lid sinds</th>
            </tr>
            </thead>
            <tbody>
            <tr class="hover:bg-blue-lightest" v-for="user in users">
                <td class="py-4 px-6 border-b border-grey-light">{{ user.first_name }}</td>
                <td class="py-4 px-6 border-b border-grey-light">{{ user.surname }}</td>
                <td class="py-4 px-6 border-b border-grey-light">{{ user.city }}</td>
                <td class="py-4 px-6 border-b border-grey-light">{{ user.date_joined }}</td>
            </tr>
            </tbody>
        </table>

        <register></register>
    </div>
</template>

<script>
    import axios from '../axios';
    import register from './Register';

    export default {
        components: {
            register
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
        }
    }
</script>