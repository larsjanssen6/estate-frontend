<template>
    <modal name="userdetails" height="auto" :scrollable="true">
        <div class="p-8">
            <h1>{{user.first_name}} {{user.surname}}
            </h1>
            <div class="mb-6">
                <label class="label mb-2">Rol</label>
                <div v-if="user.role === 0">
                    Potentiële commissielid
                </div>
                <div v-else-if="user.role === 1">
                    commissielid
                </div>
                <div v-else-if="user.role === 2">
                    Admin
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
                <button @click="$modal.hide('userdetails')" class="btn-normal w-full mx-4 shadow">Sluiten</button>
            </div>
        </div>
    </modal>
</template>

<script>
    export default {
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
        }
    }
</script>