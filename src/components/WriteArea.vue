<template lang="pug">
.vue-write-area
    section.section
        p {{ firstSong }}
        p {{ secoundSong }}

        //- example2: メソッド（関数）を利用。この場合stringを返り値とするメソッド
        b-field(label="初句" horizontal  :type="returnFieldTypeOne"  :message="{'音の数が多いです': returnFieldTypeOne}")
            b-input(type="text" v-model="firstSong"  maxlength="5" @blur="first")
        b-field(label="二句" horizontal :type="returnFieldTypeTwo"  :message="{'音の数が多いです': returnFieldTypeTwo}")
            b-input(type="text" v-model="secoundSong" maxlength="7" @blur="second")
        b-field(label="三句" horizontal  :type="returnFieldTypeThree"  :message="{'音の数が多いです': returnFieldTypeThree}")
            b-input(type="text" v-model="thirdSong" maxlength="5" @blur="third")


        //- TODO: ブラウン: refを用いてHTML要素へアクセスするためのサンプル
        canvas(ref='canvas')
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';
import LoadUtil from '@/utils/LoadUtil';

@Component
export default class WriteArea extends Vue {
    private firstSong = '千早ぶる';
    private secoundSong = '神代もきかず';
    private thirdSong = '龍田川';
    // FIXME: ブラウン: サンプル用のプロパティであっても'test'等の命名はしてはいけない。癖になっているようなのでこれは即矯正するべし。
    // プロパティ名にかかわらず、関数名やその他においても'それ'が持つ役割を認識可能な命名をするように心がけること。
    // コードを書きはじめの人、英語が苦手な人のためにこのようなサイトも存在する。https://codic.jp/
    private textBooleanValueOne = false;
    private textBooleanValueTwo = false;
    private textBooleanValueThree = false;
    private re = /(ぁ|ぃ|ぅ|ぇ|ぉ|っ|ゃ|ゅ|ょ|ゎ|ァ|ィ|ゥ|ェ|ォ|ッ|ャ|ュ|ョ|ヮ)/;
    private kuroshiroInstance = new Kuroshiro();

    private async first() {
        const songOne = await this.kuroshiroInstance.convert(this.firstSong, { to: 'hiragana' });
        // ここで正規表現を参照
        const reRef = new RegExp(this.re, 'g');
        // 正規表現を排除
        const replaceRe = songOne.replace(reRef , '');
        const countOne = replaceRe.length;
        // FIXME: ブラウン: 音が5の場合OKならば、以下のように5以上の条件としているのは筋が通らない。'5より大きい'では？
        // 音が5以下の場合のチェックを else if などで実装しても良いが、正規表現で特定の文字数をチェックすることもできる。実装方法は任せる。
        if (countOne > 5) {
            this.textBooleanValueOne = true;
        } else if (countOne <= 5) {
            this.textBooleanValueOne = false;
        }
    }

    private async second() {
        const songTwo = await this.kuroshiroInstance.convert(this.secoundSong, { to: 'hiragana' });
        const reRef = new RegExp(this.re, 'g');
        const replaceRe = songTwo.replace(reRef, '');
        const countTwo = replaceRe.length;
        if (countTwo > 7) {
            this.textBooleanValueTwo = true;
        } else if (countTwo <= 7) {
            this.textBooleanValueTwo = false;
        }
    }

    private async third() {
        const songThree = await this.kuroshiroInstance.convert(this.thirdSong, { to: 'hiragana' });
        const reRef = new RegExp(this.re, 'g');
        const replaceRe = songThree.replace(reRef, '');
        const countThree = replaceRe.length;
        if (countThree > 5) {
            this.textBooleanValueThree = true;
        } else if (countThree <= 5) {
            this.textBooleanValueThree = false;
        }
    }
    // TODO: ブラウン質問: ここでは何がしたい？実装しようとしている機能の説明を求む。
    // HTMLの属性の書き換えの例
    private takeAttribute() {
        const getElem: HTMLElement | any  = document.getElementById('takeMe');
        const check = getElem.setAttribute('align', 'center');

        // FIXME: ブラウン: vueでの開発でHTML要素へアクセスする場合、refを利用する
        // 以下はtemplateのcanvas要素へアクセスするためのサンプル。
        const canvasElement = this.$refs.canvas as HTMLCanvasElement;
        console.log(canvasElement);
    }

    // 引数を与える必要がある場合はgetter関数にできない。その場合は通常のメソッドのように扱う。
    private get returnFieldTypeOne(): string {
        if (this.textBooleanValueOne === true) {
            // this.testがtrueの場合
            return 'is-danger';
        } else {
            // 上記の条件以外の場合
            return '';
        }
    }
    private get returnFieldTypeTwo(): string {
        if (this.textBooleanValueTwo === true) {
            return 'is-danger';
        } else {
            return '';
        }
    }
    private get returnFieldTypeThree(): string {
        if (this.textBooleanValueThree === true) {
            return 'is-danger';
        } else {
            return '';
        }
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
