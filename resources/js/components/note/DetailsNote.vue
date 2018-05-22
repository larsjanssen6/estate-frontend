<template>
    <modal name="noteOnlyDetails" height="auto" :scrollable="true">
        <div class="p-8" v-if="note">
            <div class="mb-8">
                <label class="label mb-6">Potentieel lid</label>

                    <label class="w-full">{{ bindUser.first_name }} {{ bindUser.surname }}</label>
                    
            </div> 

            <div class="mb-6" v-if="bindUser">
                <label class="label mb-6">Details</label>
                <label class="label mb-4">Geïntereseerd op:<p class="p-2 rounded text-black rounded">{{bindUser.interestdate}}</p></label>
                <label class="label mb-4">Beroep:<p class="p-2 rounded text-black rounded">{{bindUser.profession}}</p></label>
				<label class="label mb-4">Nummer:<p class="p-2 rounded text-black rounded">{{bindUser.number}}</p></label>
                <label class="label mb-4">Stad:<p class="p-2 rounded text-black rounded">{{bindUser.city}}</p></label>
                <label class="label mb-4">Adres:<p class="p-2 rounded text-black rounded">{{bindUser.address}}</p></label>
                <label class="label mb-4">Postcode:<p class="p-2 rounded text-black rounded"> {{bindUser.zipcode}}</p></label>
            </div>

            <div class="mb-6">
                <label class="label mb-6">Gedaan</label>
                <label class="p-2 rounded text-black rounded" v-if="note.done == true">Ja</label>
                <label class="p-2 rounded text-black rounded" v-else="note.done == false">Nee</label>
            </div>

            <div class="mb-6">
                <label class="label mb-2">Moet klaar zijn op</label>
                <datetime placeholder="Selecteer datum" v-model="note.start" required>Selecteer start.</datetime>
            </div>

            <div class="mb-6">
                <label class="label mb-2">Gedaan op</label>
                <datetime placeholder="Selecteer datum" v-model="note.end" required>Selecteer einde.</datetime>
            </div>

            <div class="mb-6">
                <label for="Content" class="label mb-2">Notitie</label>
                <textarea
                        rows="5"
                        cols="50"
                        id="content"
                        class="input w-full"
                        name="content"
                        v-model="note.content"
                        required
                        ></textarea>
                </div>
            <div class="flex -mx-4">
                <button @click="$modal.hide('noteOnlyDetails')" class="btn-outlined w-full mx-4 shadow">Sluiten</button>
            </div>
        </div>
    </modal>
</template>

<script>
    import axios from '../../axios';
    import Vue from 'vue'

    export default {

        data() {
            return {
                note:{},
                users: [],
                bindUser: {},
            }
        },

        mounted() {
            Bus.$on('show-details-note', (note) => {
                this.note = note;

                axios.get('users').then(({data}) => {
                    this.users = data;

                    this.users.forEach((user) => {
                        if(user.id == this.note.potential_member_id) {
                            this.bindUser = user;
                        }
                    });

                    this.$modal.show('noteOnlyDetails');
                });
            });
        },
    }
</script>