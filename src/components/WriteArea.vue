<template lang="pug">
.vue-write-area
    section.section
        p {{ upperOne }}
        b-field(label="5" horizontal)
            b-input(type="text" v-model="upperOne" maxlength="5" @blur="first")
        button.button.is-success(@click="$dialog.alert('test')") ボタン
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';
import LoadUtil from '@/utils/LoadUtil';

@Component
export default class WriteArea extends Vue {
    private upperOne = '給食の';
    private upperTwo = '懲戒免職';
    private kuroshiroInstance = new Kuroshiro();

    private async first() {
        const result = await this.kuroshiroInstance.convert(this.upperOne, { to: 'hiragana' });
        const count = result.length;
        console.log(count);
        console.log(result);
    }

    private mounted() {
        LoadUtil.loading(this.$loading, async () => {
            await this.kuroshiroInstance.init(new KuromojiAnalyzer({dictPath: '/dict'}));
            console.log('kuroshiro ready');
        });
    }
}
</script>
<style lang="sass">
.vue-write-area
    .song
        p
        color: green
</style>
