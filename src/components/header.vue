<template lang="pug">
#header
    .center-box
        a.main-visual-parent(href="https://www.google.co.jp")
            img.main-logo(src="../assets/mainVisual.jpg")

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
interface Img {
    [key: string]: string; // キーが文字列、でvalueも文字列と型定義
}
@Component
export default class Header extends Vue {
    // private img: Img = {
    //     'service-icon': require('../assets/mainVisual.jpg'),
    // };
}
</script>

<style lang="sass">
#header
.center-box
    text-align: center
    margin-top: 20px
</style>
