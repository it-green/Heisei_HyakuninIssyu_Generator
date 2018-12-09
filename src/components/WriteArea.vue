<template lang="pug">
.vue-write-area
    section.section
        p {{ upperOne }}

        b-checkbox(v-model="test")

        b-field#sentenceOne(label="5" horizontal  :type="{ 'is-danger': test }")
            b-input#test(type="text" v-model="upperOne"  maxlength="5" @blur="first")
        b-field(label="5" horizontal)
            b-input(type="text" v-model="upperTwo" maxlength="7" @blur="second")
        b-field(label="test" message="音の数が5を超えています" type="is-danger")
            b-input

        p#takeMe(align="") 属性をとって欲しい!

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
    private upperTwo = 'キャン攻撃';
    private test = false;
    private re = /(ぁ|ぃ|ぅ|ぇ|ぉ|っ|ゃ|ゅ|ょ|ゎ|ァ|ィ|ゥ|ェ|ォ|ッ|ャ|ュ|ョ|ヮ)/;
    private kuroshiroInstance = new Kuroshiro();

    private async first() {
        const songOne = await this.kuroshiroInstance.convert(this.upperOne, { to: 'hiragana' });
        // ここで正規表現を参照
        const reRef = new RegExp(this.re, 'g');
        // 正規表現を排除
        const replaceRe = songOne.replace(reRef , '');
        const countOne = replaceRe.length;
        console.log(songOne);
        console.log(countOne);
        if (countOne >= 5) {
            console.log('音の数が多いよ');
        }
    }

    private async second() {
        const songTwo = await this.kuroshiroInstance.convert(this.upperTwo, { to: 'hiragana' });
        const reRef = new RegExp(this.re, 'g');
        const replaceRe = songTwo.replace(reRef, '');
        const countTwo = replaceRe.length;
        console.log(songTwo);
        console.log(countTwo);
    }
    // HTMLの属性の書き換えの例
    private takeAttribute() {
        const getElem: HTMLElement | any  = document.getElementById('takeMe');
        const check = getElem.setAttribute('align', 'center');
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
