<template>
    <modal name="noteOnlyDetails" height="auto" :scrollable="true">
        <div class="p-8" v-if="note">
            <label class="label mb-6">Details</label>
            <div class="flex mb-4">
                <div class="w-1/2 px-2">
                    <label for="Content" class="label mb-2">Taak</label>
                    <textarea
                        rows="8"
                        cols="50"
                        id="content"
                        class="input w-full"
                        name="content"
                        v-model="note.content"
                        required
                        readonly
                        ></textarea>
                </div>
                <div v-if="note" class="w-1/2 px-2">
                    <label class="label mb-4">
                        Naam
                        <p class="text-black rounded noteproperty">{{ note.potential_member['first_name'] }} {{ note.potential_member['surname'] }}</p>
                    </label>
                    <label class="label mb-4">
                        Contact informatie
                        <p class="text-black rounded noteproperty">
							{{note.potential_member['number']}}<br><br>{{note.potential_member['address']}}<br>{{note.potential_member['zipcode']}}<br>{{note.potential_member['city']}}
                        </p>
                    </label>
                    <label class="label mb-4">
                        Beroep
                        <p class="text-black rounded noteproperty">{{ note.potential_member['profession'] }}</p>
                    </label>
                </div>
            </div>
			
			
           <div class="flex mb-4" v-if="note">
				<div class="w-1/4 px-2">
					<div class="mb-6">
						<label class="label mb-2">Deadline</label>
						<datetime placeholder="Selecteer datum" v-model="note.start" :format="format" required>Selecteer start.</datetime>
					</div>
				</div>
				<div class="w-1/4 px-2">
					<div class="mb-6">
						<label class="label mb-2">Gedaan op</label>
						<datetime placeholder="nvt." v-model="note.end" :format="format" required>Selecteer einde.</datetime>
					</div>
				</div>
				<div class="w-1/4 px-2">
					<div class="mb-6">
						<label class="label mb-6">Gedaan</label>
						<p class="p-2 rounded text-black rounded" v-if="note.done === 'false'">Nee</p>
						<p class="p-2 rounded text-black rounded" v-else>Ja</p>
					</div>
				</div>
				<div class="w-1/4 px-2">
					<div class="mb-6">
						<label class="label mb-4">Geïntereseerd op:</label>
						<p class="p-2 rounded text-black rounded">{{note.potential_member['interestdate']}}</p>
					</div>
				</div>
			</div>
			<div class="flex mb-4">
				
				<div class="w-1/2 px-2">
					<div class="mb-6">
						<button class="btn-normal w-full" type="button" @click="openNote(note)">Bewerken</button>
					</div>
				</div>
				<div class="w-1/2 px-2">
					<div class="mb-6">
						<button class="btn-delete w-full" type="button" @click="deleteNote(note)">Verwijderen</button>
					</div>
				</div>
			</div>
			
			<div class="flex mb-4">
				<div class="w-full">
					
						<button @click="$modal.hide('noteOnlyDetails')" class="btn-outlined w-full shadow">Sluiten</button>
					
				</div>
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
                note: null,
                users: [],
                format: { format: 'DD-MM-YYYY' }
            }
        },
    
        mounted() {
            Bus.$on('show-details-note', (note) => {
                this.note = Object.assign({}, note);
    
                axios.get('users').then(({data}) => {
                    this.users = data;
    
                    this.$modal.show('noteOnlyDetails');
                });
            });
        },
		methods:{
              openNote(note) {
                Bus.$emit('show-note', note);
    			this.$modal.hide('noteOnlyDetails');
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