<template>
    <modal name="edit-user" height="auto" :scrollable="true">
        <div class="p-8" v-if="user">
            <h1>{{user.first_name}} {{user.surname}}</h1>
            <div class="flex flex-col">
                <div>
                    <label class="label">Rol</label>
                </div>

                <div class="flex mb-2 mt-2">
                    <span class="flex rounded-full bg-indigo uppercase px-2 py-1 text-xs font-bold mr-3">{{user.role}}</span>
                </div>
            </div>

            <form>
                <div class="mb-6">
                    <label for="first_name" class="label mb-2">Voornaam</label>
                    <input type="text"
                           id="first_name"
                           class="input w-full"
                           name="first_name"
                           v-model="user.first_name"
                           required
                           autofocus>
                </div>

                <div class="mb-6">
                    <label for="last_name" class="label mb-2">Achternaam</label>
                    <input type="text"
                           id="last_name"
                           class="input w-full"
                           name="last_name"
                           v-model="user.surname"
                           required
                           autofocus>
                </div>

                <div class="mb-6">
                    <label class="label mb-2">Vakgebied</label>
                    <input type="text"
                           class="input w-full"
                           name="zip"
                           v-model="user.profession"
                           required
                           autofocus>
                </div>
				<div class="mb-6">
                    <label class="label mb-2">Nummer</label>
                    <input type="text"
                           class="input w-full"
                           name="number"
                           v-model="user.number"
                           required
                           autofocus>
                </div>
                <div class="mb-6">
                    <label class="label mb-2">Geboortedatum</label>
                    <datetime v-model="user.birthdate" required>Klik hier om een keuze te maken.</datetime>
                </div>
                <div class="mb-6">
                    <label class="label mb-2">Registreerdatum</label>
                    {{user.date_joined}}
                </div>
				<div class="mb-6">
                    <label class="label mb-2">Interesse vanaf:</label>
                    <datetime v-model="user.interestdate" required>Klik hier om een keuze te maken.</datetime>
                </div>
                <div class="mb-6">
                    <label class="label mb-2">Adres</label>
                    <input type="text"
                           class="input w-full"
                           name="zip"
                           v-model="user.address"
                           required
                           autofocus>
                </div>
                <div class="mb-6">
                    <label class="label mb-2">Postcode</label>
                    <input type="text"
                           class="input w-full"
                           name="zip"
                           v-model="user.zipcode"
                           required
                           autofocus>
                </div>
                <div class="mb-6">
                    <label class="label mb-2">Woonplaats</label>
                    <input type="text"
                           class="input w-full"
                           name="zip"
                           v-model="user.city"
                           required
                           autofocus>
                </div>
                <div class="flex -mx-4">
                    <button @click="update()" class="btn-normal w-full mx-4 shadow">Opslaan</button>
                    <button @click="$modal.hide('edit-user') & $modal.hide('userdetails')" class="btn-normal w-full mx-4 shadow">Sluiten</button>
                </div>
            </form>
        </div>
    </modal>
</template>

<script>
    import axios from '../../axios';

    export default {
        data() {
            return {
                user: null
            }
        },

        mounted() {
            Bus.$on('edit-user', (user) => {
                this.user = user;
                this.$modal.show('edit-user');
            });
        },

        methods: {
            update() {
                axios.post('/update-user', this.user).then(() => {
                    this.$swal({
                        type: 'success',
                        title: 'Success',
                        text: 'Gebruiker geupdatet!'
                    });
                });
            }
        }
    }
</script>