<template lang="pug">
    #home
        p(style="white-space: pre-line;") {{ msg }}
        br
        textarea(v-model="msg" type="text")

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Generator from '@/views/Generator.vue';

@Component({
  components: {
      Generator,
  },
})
export default class Home extends Vue {
    public msg = '';
}
</script>

<style lamg="sass">

</style>
