<template lang="pug">
#header
    .center-box
        a.main-visual-parent(href="http://heysay100.her.jp/")
            img.main-logo(src="../assets/mainVisual.jpg")
        hr.app-border
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
interface Img {
    [key: string]: string; // キーが文字列、でvalueも文字列と型定義
}
@Component
export default class Header extends Vue {}
</script>

<style lang="sass">
#header
.center-box
    text-align: center
    margin-top: 20px
.app-border
    height: 2px
    background-color: #ffccff
</style>
