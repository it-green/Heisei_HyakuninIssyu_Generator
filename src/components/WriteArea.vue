<template lang="pug">
.vue-write-area
    section.section
        b-field(label='5' horizontal)
            b-input(type='text' v-model='upperOne' maxlength='5' @blur='onBlur')
        button.button.is-success(@click='$dialog.alert("test")') ボタン
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';
import LoadUtil from '@/utils/LoadUtil';

@Component
export default class WriteArea extends Vue {
    private upperOne = 'この冬は';
    private kuroshiroInstance = new Kuroshiro();

    private async onBlur() {
        const result = await this.kuroshiroInstance.convert('感じ取れたら手を繋ごう、重なるのは人生のライン and レミリア最高！', { to: 'hiragana' });
        console.log(result);
    }

    private async mounted() {
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
