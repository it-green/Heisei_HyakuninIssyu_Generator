<template lang="pug">
    #WriteArea
        p.song {{ song }}
        br
        textarea(v-model="song" type="text")
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component

    export default class WriteArea extends Vue {
        public song = '';
    }
</script>
<style lang="sass">
.song
    p
    color: green
</style>
