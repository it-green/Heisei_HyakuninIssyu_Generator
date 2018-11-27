<template lang="pug">
    #Generator
        .sheet
            img.sheet(alt="Image1" src="../assets/red.png")

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component

export default class Generator extends Vue {
}
</script>

<style lang="sass">
@import '~bulma/bulma'

</style>
