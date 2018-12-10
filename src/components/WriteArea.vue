<template lang="pug">
.vue-write-area
    section.section
        p {{ upperOne }}
        p {{ upperTwo }}

        b-checkbox(v-model="test")
        //- FIXME: ブラウン: Buefyのサンプル通りではあるのだがエラーが出るので修正が必要
        //- typeが要求している値の型がStringなのに対し、与えられている値の方がObjectであるのでエラーとなる
        //- string を渡してあげる必要がある
        //- example1: 三項演算子を利用
        b-field#sentenceOne(label="5" horizontal  :type="test ? 'is-danger' : ''")
            b-input#test(type="text" v-model="upperOne"  maxlength="5" @blur="first")
        //- example2: メソッド（関数）を利用。この場合stringを返り値とするメソッド
        b-field#sentenceOne(label="5" horizontal  :type="returnFieldType")
            b-input#test(type="text" v-model="upperOne"  maxlength="5" @blur="first")

        b-field#sentenceOne(label="5" horizontal  :type="{ 'is-danger': test }")
            b-input#test(type="text" v-model="upperOne"  maxlength="5" @blur="first")
        b-field(label="5" horizontal v-bind:type ="{'is-danger':checkUpperTwo}")
            b-input(type="text" v-model="upperTwo" maxlength="7" @blur="second")
        b-field(label="test" message="音の数が5を超えています" type="is-danger")
            b-input

        p#takeMe(align="") 属性をとって欲しい!
        //- TODO: ブラウン: refを用いてHTML要素へアクセスするためのサンプル
        canvas(ref='canvas')
        //- このボタンを押すと#takeMeのalignがcenterになる。
        button.button(@click="setAttribute()") 属性を取る
        button.button.is-success(@click="$dialog.alert('test')") ボタン
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';
import LoadUtil from '@/utils/LoadUtil';

@Component
export default class WriteArea extends Vue {
    private upperOne = '給食の';
    private upperTwo = 'キャン攻撃';
    // FIXME: ブラウン: サンプル用のプロパティであっても'test'等の命名はしてはいけない。癖になっているようなのでこれは即矯正するべし。
    // プロパティ名にかかわらず、関数名やその他においても'それ'が持つ役割を認識可能な命名をするように心がけること。
    // コードを書きはじめの人、英語が苦手な人のためにこのようなサイトも存在する。https://codic.jp/
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
        // FIXME: ブラウン: 音が5の場合OKならば、以下のように5以上の条件としているのは筋が通らない。'5より大きい'では？
        // 音が5以下の場合のチェックを else if などで実装しても良いが、正規表現で特定の文字数をチェックすることもできる。実装方法は任せる。
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
    private get returnFieldType(): string {
        if (this.test) {
            // this.testがtrueの場合
            return 'is-danger';
        } else {
            // 上記の条件以外の場合
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
