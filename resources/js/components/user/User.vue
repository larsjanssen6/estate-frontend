<template>
    <div>
        <modal name="userdetails" height="auto" :scrollable="true">
            <div class="p-8">
                <h1>{{user.first_name}} {{user.surname}}
                </h1>
                <div class="mb-6 flex flex-col">
                    <div>
                        <label class="label mb-2">Rol</label>
                    </div>

                    <div class="flex">
                        <div v-if="user.role_id === 0">
                            <span class="flex rounded-full bg-indigo uppercase px-2 py-1 text-xs font-bold mr-3">Potentiële commissielid</span>
                        </div>
                        <div v-else-if="user.role_id === 1">
                            <span class="flex rounded-full bg-indigo uppercase px-2 py-1 text-xs font-bold mr-3">commissielid</span>
                        </div>
                        <div v-else-if="user.role_id === 2">
                            <span class="flex rounded-full bg-indigo uppercase px-2 py-1 text-xs font-bold mr-3">Admin</span>
                        </div>
                    </div>
                </div>
                <div class="mb-6">
                    <label class="label mb-2">Vakgebied</label>
                    {{user.profesion}}
                </div>
                <div class="mb-6">
                    <label class="label mb-2">Geboortedatum</label>
                    {{user.birthdate}}
                </div>
                <div class="mb-6">
                    <label class="label mb-2">Lid sinds</label>
                    {{user.date_joined}}
                </div>
                <div class="mb-6">
                    <label class="label mb-2">Adres</label>
                    {{user.address}}
                </div>
                <div class="mb-6">
                    <label class="label mb-2">Postcode</label>
                    {{user.zipcode}}
                </div>
                <div class="mb-6">
                    <label class="label mb-2">Woonplaats</label>
                    {{user.city}}
                </div>
                <div class="flex -mx-4">
                    <button @click="editUser(user)" class="btn-normal w-full mx-4 shadow">Edit</button>
                    <button @click="$modal.hide('userdetails')" class="btn-normal w-full mx-4 shadow">Sluiten</button>
                </div>
            </div>
        </modal>

        <edit-user></edit-user>
    </div>
</template>

<script>
    import editUser from './EditUser';

    export default {
        components: {
            editUser,
        },

        mounted() {
            Bus.$on('show-user', (user) => {
                this.user = user;
                this.$modal.show('userdetails');
            });
        },

        data() {
            return {
                user: {},
                show: false
            }
        },

        methods: {
            editUser(user) {
                Bus.$emit('edit-user', user);
            }
        }
    }
</script>