<template>
    <div class="container mx-auto mt-4">
            <table class="text-left w-full bg-white" style="border-collapse:collapse">
                <thead>
                <tr>
                    <th class="th">Content</th>
                    <th class="th">Contact gegevens</th>
                    <th class="th">Moet klaar zijn op</th>
                    <th class="th">Gedaan op</th>
                    <th class="th">Gedaan</th>
                    <th class="th">Aanmaak datum</th>
                    <th class="th">Opties</th>
                </tr>
                </thead>
                <tbody v-if="notes.length > 0">
                    <tr class="clickable-row hover:bg-blue-lightest" v-for="note in notes" @click.prevent="openDetails(note)">
                        <td class="tr"><p class="summary">{{ note.content }}</p></td>
                        <td class="tr">{{ note.potential_member['first_name'] }}</td>
                        <td class="tr">{{ note.start }}</td>
                        <td class="tr" v-if="note.end">{{ note.end }}</td>
                        <td class="tr" v-else>nvt</td>
                        <td class="tr">
                            <span class="rounded p-2 bg-orange text-white" v-if="note.done === 'false'">Nee</span>
                            <span class="rounded p-2 bg-green text-white" v-else>Ja</span>
                        </td>
                        <td class="tr">{{ note.date_created }}</td>
                        <td class="tr">
                            <button class="btn-normal" @click.stop="reopen(note)">Heropen</button>
                        </td>
                    </tr>
                </tbody>

                <tbody v-else>
                    <td class="p-2">Er zijn nog geen notities.</td>
                </tbody>
            </table>

            <createNote></createNote>
            <noteDetails></noteDetails>
            <noteOnlyDetails></noteOnlyDetails>
    </div>
           
</template>
<script>
    import axios from '../axios';
    import createNote from './note/CreateNote';
    import Vue from 'vue';
    import noteDetails from './note/OpenNote';
    import noteOnlyDetails from './note/DetailsNote';

    export default {
        components: {
            createNote,
            noteDetails,
            noteOnlyDetails
        },

        data() {
            return {
                notes: [],
            }
        },        
        created() {
            axios.post('note/allnotes').then(({data}) => {
                this.notes = data;
            });
        },

        methods:{
            openNote(note) {
                Bus.$emit('show-note', note);
            },
            openDetails(note) {
                Bus.$emit('show-details-note', note);
            },
            reopen(note) {
                axios.post('/note/reopen', note).then(() => {
                    this.$swal({
                        title: 'Taak is heropend',
                        type: 'success',
                    });

                    this.notes = this.notes.filter((n) => {
                        return n.id !== note.id;
                    });
                });
            },
            deleteNote(note){
                this.$swal({
                    title: 'Weet je dit zeker?',
                    text: "Deze actie is definitief!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ja, verwijder deze notitie!'
                }).then((result) => {
                    if (result.value) {
                        axios.post('note/delete/' + note.id).then(({data}) => {
                            location.reload();
                        }).catch((error) => {
                            this.wrong = true;
                        });

                        this.$swal(
                            'Notitie verwijderd!',
                            'Voltooid'
                        )
                    }
                })
            }
        }
    }
</script>