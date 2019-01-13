<template lang="pug">
#app
    Header
    router-link(to='/')
    router-view
    Footer

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WriteArea from '@/components/WriteArea.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import Buefy from 'buefy';
Vue.use(Buefy);

@Component({
    components: {
        WriteArea,
        Header,
        Footer,
    },
})
export default class App extends Vue {}
</script>

<style lang='rscss'>
@import 'all';
</style>

<style lang="sass">
@import 'variable';
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50

#nav
  padding: 30px
  a
    font-weight: bold
    color: #2c3e50
    &.router-link-exact-active
        color: #42b983
.writeArea-style
    margin-top: 60px
</style>
