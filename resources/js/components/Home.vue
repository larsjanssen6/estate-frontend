<template>
    <div class="container mx-auto">
        <button class="bg-teal font-semibold text-white py-2 px-4 border border-teal hover:border-transparent rounded m-4" @click="$modal.show('registration');">Registreer lid</button>

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
                            <button class="btn-delete" type="button" @click="deleteUser(user)">
                                Verwijderen
                            </button>
                            <button class="btn-normal" type="button" @click="promoteUser(user)">
                                Admin
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
    import userdetails from './user/User';
    import Vue from 'vue';
    import VueSweetalert2 from 'vue-sweetalert2';

    Vue.use(VueSweetalert2);

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
            },
			deleteUser(user) {
                Vue.swal({
                    title: 'Weet je dit zeker?',
                    text: "Eenmaal verwijderd kan een lid niet meer worden teruggehaald!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ja, delete dit lid.'
                }).then((result) => {
                    if (result.value) {
                        axios.post('users/deleteuser/' + user.id).then(({data}) => {
                            location.reload();
                        }).catch((error) => {
                            this.wrong = true;
                        });

                        Vue.swal(
                            'Lid verwijderd!',
                            '',
                            'Voltooid.'
                        )
                    }
                })
            },
			promoteUser(user){
                Vue.swal({
                    title: 'Weet je dit zeker?',
                    text: "Je kan het niet meer ongedaan maken!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ja, maak dit lid een admin!'
                }).then((result) => {
                    if (result.value) {
                    axios.post('/users/promoteuser', user).then((response) => {
                        location.reload();
                    Vue.swal(
                        'Admin rechten overgebracht!',
                        'Voltooid'
                    )
                }).catch((error) => {
                        this.wrong = true;
                    Vue.swal({
                        title: 'Je hebt geen toegang tot dit!',
                    })
                });

                }
            })
        },

    }}

</script>