<template lang="pug">
    #WriteArea
        p.song {{ song }}
        br
        textarea(v-model="song" type="text")
        button.button.is-success(@click='$dialog.alert("test")') テストボタン
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component

export default class WriteArea extends Vue {
    public song = 'song';
}
</script>
<style lang="sass">
.song
    p
    color: green
</style>
