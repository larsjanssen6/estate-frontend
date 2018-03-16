<template>
    <modal name="registration" height="auto" :scrollable="true">
        <form class="p-8" @submit.prevent="register()">
            <div class="mb-6">
                <label class="label mb-2">Voornaam</label>
                <input type="text"
                       class="input w-full"
                       name="first_name"
                       v-model="form.first_name"
                       required
                       autofocus>
            </div>

            <div class="mb-6">
                <label class="label mb-2">Achternaam</label>
                <input type="text"
                       class="input w-full"
                       name="last_name"
                       v-model="form.last_name"
                       required
                       autofocus>
            </div>

            <div class="mb-6">
                <label class="label mb-2">Gebruikersnaam</label>
                <input type="text"
                       class="input w-full"
                       name="username"
                       v-model="form.username"
                       required
                       autofocus>
            </div>

            <div class="mb-6">
                <label class="label mb-2">Wachtwoord</label>
                <input type="password"
                       class="input w-full"
                       name="password"
                       v-model="form.password"
                       required
                       autofocus>
            </div>

            <div class="mb-6">
                <label class="label mb-2">Adres</label>
                <input type="text"
                       class="input w-full"
                       name="city"
                       v-model="form.address"
                       required
                       autofocus>
            </div>

            <div class="mb-6">
                <label class="label mb-2">Woonplaats</label>
                <input type="text"
                       class="input w-full"
                       name="city"
                       v-model="form.city"
                       required
                       autofocus>
            </div>

            <div class="mb-6">
                <label class="label mb-2">Postcode</label>
                <input type="text"
                       class="input w-full"
                       name="zip"
                       v-model="form.zipcode"
                       required
                       autofocus>
            </div>

            <div class="mb-6">
                <label class="label mb-2">Vakgebied</label>
                <input type="text"
                       class="input w-full"
                       name="profession"
                       v-model="form.profession"
                       required
                       autofocus>
            </div>

            <div class="flex -mx-4">
                <button type="submit" class="btn-normal w-full mx-4 shadow" :class="{ 'loader': isLoading }">Register</button>
                <button @click="$modal.hide('registration')" class="btn-outlined w-full mx-4 shadow">Cancel</button>
            </div>
        </form>
    </modal>
</template>

<script>
    import axios from '../axios';

    export default {
        data() {
            return {
                form: {},
                isLoading: false
            }
        },

        methods: {
            register() {
                this.isLoading = true;
                axios.post('signup', this.form).then(({data}) => {
                    console.log(data);
                    this.isLoading = false;
                }).catch((error) => {
                    this.isLoading = false;
                });
            }
        }
    }
</script>