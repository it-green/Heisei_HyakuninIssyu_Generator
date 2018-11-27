<template lang="pug">
    #Generator
        img.sheet(alt="This is pink sheet" src="../assets/pink.png")

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
