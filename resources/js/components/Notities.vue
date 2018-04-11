<template>
    <div class="container mx-auto">
        <button class="btn-normal mt-4 mb-4" type="button"  @click="$modal.show('createNote')">Maak notitie aan</button>
            <table class="text-left w-full bg-white" style="border-collapse:collapse">
                <thead>
                <tr>
                    <th class="th">Content</th>
                    <th class="th">Datum</th>
                    <th class="th">Opties</th>
                </tr>
                </thead>
                <tbody>
                    <tr class="hover:bg-blue-lightest" v-for="note in notes">
                        <td class="tr">{{ note.content }}</td>
                        <td class="tr">{{ note.date_created }}</td>
                        <td class="tr">
                            <button class="btn-normal" type="button" @click="openNote(note)">
                            Open
                            </button>
                            <button class="btn-delete" type="button" @click="deleteNote(note)">
                            Verwijderen
                            </button>
                        </td>
                    </tr>
                    
                </tbody>
            </table>
            <createNote></createNote>
            <noteDetails></noteDetails>
    </div>
           
</template>
<script>
    import axios from '../axios';
    import createNote from './note/CreateNote';
    import Vue from 'vue';
    import VueSweetalert2 from 'vue-sweetalert2';
    import noteDetails from './note/OpenNote';

    Vue.use(VueSweetalert2);

    export default {
        components: {
            createNote,
            noteDetails
        },

        data() {
            return {
                notes: []
            }
        },        
        created() {
            axios.post('note/notes').then(({data}) => {
                this.notes = data;
            });
        },
        methods:{
            openNote(note) {
                Bus.$emit('show-note', note);
            },
            deleteNote(note){
                                Vue.swal({
                    title: 'Weet je dit zeker?',
                    text: "Eenmaal verwijderd kan een notitie niet meer worden teruggehaald!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ja, delete deze notitie!'
                }).then((result) => {
                    if (result.value) {
                        axios.post('note/delete/' + note.id).then(({data}) => {
                            location.reload();
                        }).catch((error) => {
                            this.wrong = true;
                        });

                        Vue.swal(
                            'Notitie verwijderd!',
                            'Voltooid'
                        )
                    }
                })
            }
        }
        }

        </script>