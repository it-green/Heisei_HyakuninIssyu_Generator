<template lang="pug">
.vue-write-area
    section.section
        p {{ upperOne }}

        b-field(label="5" horizontal)
            b-input(type="text" v-model="upperOne" maxlength="5" @blur="first")
        b-field(label="5" horizontal)
            b-input(type="text" v-model="upperTwo" maxlength="7" @blur="second")
        b-field(label="test" message="音の数が5を超えています" type="is-danger")
            b-input(placeholder="Error")

        p#takeMe(align="right") 属性をとって欲しい!

        //- このボタンを押すと#takeMeのalignがcenterになる。
        button.button(@click="takeAttribute()") 属性を取る
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
        const songOne = await this.kuroshiroInstance.convert(this.upperOne, { to: 'hiragana' });
        const countOne = songOne.length;
        console.log(songOne);
        console.log(countOne);
    }

    private async second() {
        const songTwo = await this.kuroshiroInstance.convert(this.upperTwo, { to: 'hiragana' });
        const countTwo = songTwo.length;
        console.log(songTwo);
        console.log(countTwo);
    }
    // HTMLの属性の書き換えの例
    private takeAttribute() {
        const getElem: HTMLElement | any  = document.getElementById('takeMe');
        const check = getElem.setAttribute('align', 'cente');
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
