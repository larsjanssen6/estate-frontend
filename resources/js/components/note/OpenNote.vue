<template>
    <modal name="noteDetails" height="auto" :scrollable="true">
        <div class="p-8">
            <div class="mb-6">
            <label for="Content" class="label mb-2">Notitie</label>
            <textarea readonly
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
            <button @click="$modal.hide('noteDetails')" class="btn-outlined w-full mx-4 shadow">Sluiten</button>
            </div>
        </div>
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
                note:{}
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