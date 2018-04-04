<template>
    <modal name="createNote" height="auto" :scrollable="true">
        <form class="p-8" @submit.prevent="createNote()">
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
    import Vue from 'vue'
    import vSelect from 'vue-select'
    Vue.component('v-select', vSelect)

    export default {

        data() {
            return {
                form: {},
                isLoading: false
            }
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