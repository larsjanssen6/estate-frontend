<template>
    <div class="container mx-auto">
        <div class="mt-4 mb-4">
            <button class="bg-teal font-semibold text-white py-2 px-4 border border-teal hover:border-transparent rounded" @click="$modal.show('registration');" v-if="isAdmin">Registreer lid</button>
        </div>

        <table class="text-left w-full bg-white" style="border-collapse:collapse">
            <thead>
            <tr>
                <th class="th">Naam</th>
                <th class="th">Nummer</th>
                <th class="th">Woonplaats</th>
                <th class="th">Registreerdatum</th>
                <th class="th">Role</th>
                <th class="th">Opties</th>
            </tr>
            </thead>
            <tbody>
                <tr class="hover:bg-blue-lightest cursor-pointer" v-for="user in users">
                    <td class="tr">{{ user.first_name }} {{ user.surname }}</td>
                    <td class="tr">{{ user.number }}</td>
                    <td class="tr">{{ user.city }}</td>
                    <td class="tr">{{ user.date_joined }}</td>
                    <td class="tr">
                        <span class="rounded p-2 bg-green text-white">
                            {{ user.role }}
                        </span>
                    </td>
                    <td class="tr">
                        <button class="btn-normal" type="button" @click="showUser(user)">
                            Bekijken
                        </button>

                        <button class="btn-delete" type="button" @click="deleteUser(user)" v-if="isAdmin">
                            Verwijderen
                        </button>

                        <button class="btn-normal" type="button" @click="promoteUser(user)" v-if="isAdmin">
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
    import CookieHelper from "../mixins/CookieHelper";
    import CurrUserHelper from "../mixins/CurrUserHelper";

    export default {
        components: {
            register,
            userdetails
        },

        mixins: [ CookieHelper, CurrUserHelper ],

        data() {
            return {
                users: []
            }
        },

        created() {
            axios.get('potential-users').then(({data}) => {
                this.users = data;
            });
        },

        methods: {
            showUser(user) {
                Bus.$emit('show-user', user);
            },
			deleteUser(user) {
                this.$swal({
                    title: 'Weet je dit zeker?',
                    text: "Deze actie is definitief!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ja, verwijder dit lid.'
                }).then((result) => {
                    if (result.value) {
                        axios.post('users/deleteuser/' + user.id).then(({data}) => {
                            location.reload();
                        }).catch((error) => {
                            this.wrong = true;
                        });

                        this.$swal(
                            'Lid verwijderd!',
                            'Voltooid.'
                        )
                    }
                })
            },
			promoteUser(user){
                this.$swal({
                    title: 'Weet je dit zeker?',
                    text: "Deze actie is definitief!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ja, maak dit lid een admin!'
                }).then((result) => {
                    if (result.value) {
                    axios.post('/users/promoteuser', user).then((response) => {
                        location.reload();
                    this.$swal(
                        'Admin rechten overgebracht!',
                        'Voltooid'
                    )
                }).catch((error) => {
                        this.wrong = true;
                    this.$swal({
                        title: 'Je hebt geen toegang tot dit!',
                    })
                });

                }
            })
        },
        }
    }

</script>