<template>
    <modal name="noteDetails" height="auto" :scrollable="true">
        <div class="p-8">
            <div class="mb-8">
                <label class="label mb-6">Potentieel lid</label>
                <select required class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded shadow" v-model="note.potential_member_id" required>
                    <option class="w-full" v-for="user in users" v-bind:value="user.id">
                        {{ user.first_name }} {{ user.surname }}
                    </option>
                </select>
            </div> 

            <div class="mb-6">
                <label class="label mb-6">Gedaan</label>
                <select required class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded shadow" v-model="note.done" required>
                    <option value="false">Nee</option>
                    <option value="true">Ja</option>
                </select>
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
                <button class="btn-normal w-full mx-4 shadow" @click="updateNote()">Update</button>
                <button @click="$modal.hide('noteDetails')" class="btn-outlined w-full mx-4 shadow">Sluiten</button>
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
                bindUser: {}
            }
        },

        created() {
            axios.get('users').then(({data}) => {
                this.users = data;

                this.users.forEach((user) => {
                    if(user.id == this.note.user_id) {
                        this.bindUser = user;
                    }
                });
            });
        },

        methods: {
            updateNote() {
                axios.post('/note/update', this.note).then(() => {
                    location.reload();
                });
            }
        },

        mounted() {
            Bus.$on('show-note', (note) => {
                this.note = note;
                this.$modal.show('noteDetails');
            });
        },
    }
</script>