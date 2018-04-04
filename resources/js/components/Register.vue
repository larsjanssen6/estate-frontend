<template>
    <modal name="registration" height="auto" :scrollable="true">
        <form class="p-8" @submit.prevent="register()">
            <div class="mb-6">
                <label for="first_name" class="label mb-2">Voornaam</label>
                <input type="text"
                       id="first_name"
                       class="input w-full"
                       name="first_name"
                       v-model="form.first_name"
                       required
                       autofocus>
            </div>

            <div class="mb-6">
                <label for="last_name" class="label mb-2">Achternaam</label>
                <input type="text"
                       id="last_name"
                       class="input w-full"
                       name="last_name"
                       v-model="form.surname"
                       required
                       autofocus>
            </div>

            <div class="mb-6">
                <label class="label mb-2">Geboortedatum</label>
                <datetime v-model="form.birthdate" required>Klik hier om een keuze te maken.</datetime>
            </div>

            <div class="mb-6">
                <label for="username" class="label mb-2">Gebruikersnaam</label>
                <input type="text"
                       id="username"
                       class="input w-full"
                       name="username"
                       v-model="form.username"
                       required
                       autofocus>
            </div>

            <div class="mb-6">
                <label for="password" class="label mb-2">Wachtwoord</label>
                <input type="password"
                       id="password"
                       class="input w-full"
                       name="password"
                       v-model="form.password"
                       required
                       autofocus>
            </div>

            <div class="mb-6">
                <label class="label mb-2">Rol</label>
                <select required class="wide-dropdown" v-model="form.role">
                    <option selected disabled class="w-full">
                        (Selecteer de juiste rol)
                    </option>
					<option class="w-full" v-for="option in options" v-bind:value="option.value" v-bind:selected="option.index == 0">
                        {{ option.text }}
                    </option>
                </select>
            </div>

            <div class="mb-6">
                <label for="address" class="label mb-2">Adres</label>
                <input type="text"
                       id="address"
                       class="input w-full"
                       name="address"
                       v-model="form.address"
                       required
                       autofocus>
            </div>

            <div class="mb-6">
                <label for="city" class="label mb-2">Woonplaats</label>
                <input type="text"
                       id="city"
                       class="input w-full"
                       name="city"
                       v-model="form.city"
                       required
                       autofocus>
            </div>

            <div class="mb-6">
                <label for="postcode" class="label mb-2">Postcode</label>
                <input type="text"
                       id="postcode"
                       class="input w-full"
                       name="zip"
                       v-model="form.zipcode"
                       required
                       autofocus>
            </div>

            <div class="mb-6">
                <label for="profession" class="label mb-2">Vakgebied</label>
                <input type="text"
                       id="profession"
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
	import moment from 'moment';
    import Vue from 'vue'
    import vSelect from 'vue-select'
    Vue.component('v-select', vSelect)

    export default {
        created() {
            this.form.birthdate = String(Moment.now());
        },

        data() {
            return {
				options: [
                    { text: 'Potentieel lid', value: 'PotentialMember', index: 0},
                    { text: 'Lid', value: 'Member', index: 1 }
                ],
                form: {},
                isLoading: false
            }
        },
		
		created() {
			this.form.birthdate = moment().format('ddmmjjjj');
		},

        methods: {
            register() {
                this.isLoading = true;
                axios.post('signup', this.form).then(({data}) => {
                    this.isLoading = false;
                    location.reload();
                }).catch((error) => {
                    this.isLoading = false;
                });
            }
        }
    }
</script>