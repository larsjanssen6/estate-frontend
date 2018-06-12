<template>
    <modal name="createNote" height="auto" :scrollable="true">
        <form class="p-8" @submit.prevent="createNote()">
           <div class="mb-6">
               <label class="label mb-6">Potentieel lid</label>
               <select required class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded shadow" v-model="form.potential_member_id_id" required>
                   <option class="w-full" v-for="user in users" v-bind:value="user.id">
                       {{ user.first_name }} {{ user.surname }}
                   </option>
               </select>
           </div>

            <div class="mb-6">
                <label class="label mb-6">Gedaan</label>
                <select required class="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-4 py-2 pr-8 rounded shadow" v-model="form.done" required>
                   <option value="false">Nee</option>
                    <option value="true">Ja</option>
                </select>
            </div>

            <div class="mb-6">
                <label class="label mb-2">Moet klaar zijn op</label>
                <datetime placeholder="Selecteer datum" v-model="form.start" required>Selecteer start.</datetime>
            </div>

            <div class="mb-6">
                <label for="Content" class="label mb-2">Notitie</label>
                <textarea rows="5" cols="50"
                       id="content"
                       class="input w-full"
                       name="content"
                       v-model="form.content"
                       required
                       autofocus></textarea>
            </div>


            <div class="flex -mx-4">
                <button type="submit" class="btn-normal w-full mx-4 shadow" :class="{ 'loader': isLoading }">Aanmaken</button>
                <button @click="$modal.hide('createNote')" class="btn-outlined w-full mx-4 shadow">Annuleren</button>
            </div>
        </form>
    </modal>
</template>

<script>
    import axios from '../../axios';
    import Vue from 'vue';

    export default {

        data() {
            return {
                form: { potential_member_id_id: null, done: "false", start: "", end: "" },
                isLoading: false,
                users: []
            }
        },

        created() {
            axios.get('users').then(({data}) => {
                this.users = data;
            });
        },

        methods: {
            createNote() {
                this.isLoading = true;
                axios.post('note/create', this.form).then(({data}) => {
                    this.isLoading = false;
                    location.reload();
                }).catch((error) => {
                    this.isLoading = false;
                });
            }
        }
    }
</script>