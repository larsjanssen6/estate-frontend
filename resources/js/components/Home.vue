<template>
    <div class="container mx-auto">
        <table class="text-left m-4 w-full" style="border-collapse:collapse">
            <thead>
            <tr>
                <th class="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Naam</th>
                <th class="py-4 px-6 bg-grey-lighter font-sans font-medium uppercase text-sm text-grey border-b border-grey-light">Supported?</th>
            </tr>
            </thead>
            <tbody>
            <tr class="hover:bg-blue-lightest">
                <td class="py-4 px-6 border-b border-grey-light">Conversations</td>
                <td class="py-4 px-6 border-b border-grey-light text-center">❌</td>
            </tr>
            <tr class="hover:bg-blue-lightest">
                <td class="py-4 px-6 border-b border-grey-light">Question-Buttons</td>
                <td class="py-4 px-6 border-b border-grey-light text-center">❌</td>
            </tr>
            <tr class="hover:bg-blue-lightest">
                <td class="py-4 px-6 border-b border-grey-light">Image Attachment</td>
                <td class="py-4 px-6 border-b border-grey-light text-center">✅ </td>
            </tr>
            <tr class="hover:bg-blue-lightest">
                <td class="py-4 px-6 border-b border-grey-light">Video Attachment</td>
                <td class="py-4 px-6 border-b border-grey-light text-center">❌</td>
            </tr>
            <tr class="hover:bg-blue-lightest">
                <td class="py-4 px-6 border-b border-grey-light">Audio Attachment</td>
                <td class="py-4 px-6 border-b border-grey-light text-center">❌</td>
            </tr>
            <tr class="hover:bg-blue-lightest">
                <td class="py-4 px-6 border-b border-grey-light">Location Attachment</td>
                <td class="py-4 px-6 border-b border-grey-light text-center">❌</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {

    }
</script>