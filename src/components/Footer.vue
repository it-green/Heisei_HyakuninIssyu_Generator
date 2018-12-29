<template lang="pug">
#Footer.footer-position
    footer.footer
        .content.has-text-centered
            p made by
                strong  平成百人一首四歌仙
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
export default class Footer extends Vue {
}
</script>

<style lang="sass">
.footer-position
    margin-top: 50px
</style>
