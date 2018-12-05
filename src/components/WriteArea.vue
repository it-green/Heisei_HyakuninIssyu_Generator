<template lang="pug">
.WriteArea
    //- buefyのテスト
    //- button.button.is-info.test(@click="alert") ここを押してね


</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Buefy from 'buefy';
Vue.use(Buefy);
@Component

export default class WriteArea extends Vue {
// buefyのテスト
//     private alert() {
//         this.$dialog.alert('this is test');
//     }
}
</script>
<style lang="sass">
@import '~bulma/bulma'
@import '~buefy/src/scss/buefy'
.song
    p
    color: green
button.test
    margin-top: 100px
</style>
