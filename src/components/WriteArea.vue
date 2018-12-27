<template lang="pug">
.vue-write-area
    section.section
        .sheetArea
            canvas.canvas-style(ref="canvas")

        .songs
            p{{ firstSong }}
            p {{ secoundSong }}
            p {{ thirdSong }}
            p {{ fourthSong }}
            p {{ fifthSong }}
        //- 上の句を書き込むエリア
        .forms
            p.title 上の句
            div.columns
                //- example2: メソッド（関数）を利用。この場合stringを返り値とするメソッド
                b-field.column(label="初句" horizontal  :type="returnFieldTypeOne"  :message="{'音の数が多いです': returnFieldTypeOne}")
                    b-input(type="text" v-model="firstSong"  maxlength="5" @blur="first")
                b-field.column(label="二句" horizontal :type="returnFieldTypeTwo"  :message="{'音の数が多いです': returnFieldTypeTwo}")
                    b-input(type="text" v-model="secoundSong" maxlength="7" @blur="second")
                b-field.column(label="三句" horizontal  :type="returnFieldTypeThree"  :message="{'音の数が多いです': returnFieldTypeThree}")
                    b-input(type="text" v-model="thirdSong" maxlength="5" @blur="third")
            p.title 下の句
            //- 下の句を書き込むエリア
            div.columns
                b-field.column(label="四句" horizontal :type="returnFieldTypeFour"  :message="{'音の数が多いです': returnFieldTypeFour}")
                    b-input(type="text" v-model="fourthSong" maxlength="7" @blur="fourth")
                b-field.column(label="結び句" horizontal :type="returnFieldTypeFive"  :message="{'音の数が多いです': returnFieldTypeFive}")
                    b-input(type="text" v-model="fifthSong" maxlength="7" @blur="fifth")

            button.button.column.is-info(@click="downloadImg" ref="download") 画像をダウンロード
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';
import LoadUtil from '@/utils/LoadUtil';

interface Img {
    [ key: string ]: string; // interfaceでimgの型定義を作っている。この場合、キーはstringでvalueがストリングの意味。
}

@Component
export default class WriteArea extends Vue {
    private firstSong: string  = '千早ぶる';
    private secoundSong: string = '神代もきかず';
    private thirdSong: string = '龍田川';
    private fourthSong: string = 'からくれなゐに';
    private fifthSong: string = '水くくる';

    private textBooleanValueOne = false;
    private textBooleanValueTwo = false;
    private textBooleanValueThree = false;
    private textBooleanValueFour = false;
    private textBooleanValueFive = false;

    private re = /(ぁ|ぃ|ぅ|ぇ|ぉ|っ|ゃ|ゅ|ょ|ゎ|ァ|ィ|ゥ|ェ|ォ|ッ|ャ|ュ|ョ|ヮ)/;

    private kuroshiroInstance = new Kuroshiro();

    // canvasに使うデータの用意
    private canvas: HTMLCanvasElement | null = null;
    private ctx: CanvasRenderingContext2D | null = null;
    private pinkSheet: HTMLImageElement | null = null;
    private ctxFirstSong: CanvasRenderingContext2D | null = null;
    private ctxSecoundSong: CanvasRenderingContext2D | null = null;
    private ctxThirdSong: CanvasRenderingContext2D | null = null;
    private ctxFourthSong: CanvasRenderingContext2D | null = null;
    private ctxFifthSong: CanvasRenderingContext2D | null = null;
    private sheetWidth = 500;
    private sheetHeight = 500;

    // 画像を読み込む
    private sheets: Img = {
        'pink-sheet': require('../assets/sheets/pink.png'),
    };

    // 画像を描画する。
    private drawSheet() {
        if (this.ctx === null || this.pinkSheet === null) {
            return;
        }
        this.ctx.drawImage(this.pinkSheet, 0, 0);
    }
    // 短歌をcanvasに描画する。
    private drawCanvasFirstSong() {
        if (this.ctxFirstSong === null ) {
            return;
        }
        this.ctxFirstSong.font = '25px serif';
        this.ctxFirstSong.fillStyle = 'white';
        this.ctxFirstSong.fillText(this.firstSong, 50, 160);
    }
    private drawCanvasSecoundSong() {
        if (this.ctxSecoundSong === null) {
            return;
        }
        this.ctxSecoundSong.font = '25px serif';
        this.ctxSecoundSong.fillStyle = 'white';
        this.ctxSecoundSong.fillText(this.secoundSong, 50, 200);
    }
    private drawCanvasThirdSong() {
        if (this.ctxThirdSong === null) {
            return;
        }
        this.ctxThirdSong.font = '25px serif';
        this.ctxThirdSong.fillStyle = 'White';
        this.ctxThirdSong.fillText(this.thirdSong, 50, 240);
    }
    private drawCanvasFourthSong() {
        if (this.ctxFourthSong === null) {
            return;
        }
        this.ctxFourthSong.font = '25px serif';
        this.ctxFourthSong.fillStyle = 'white';
        this.ctxFourthSong.fillText(this.fourthSong, 50, 280);
    }
    private drawCanvasFifthSong() {
        if (this.ctxFifthSong === null) {
            return;
        }
        this.ctxFifthSong.font = '25px serif';
        this.ctxFifthSong.fillStyle = 'white';
        this.ctxFifthSong.fillText(this.fifthSong, 50, 320);
    }

    private async first() {
        const songOne = await this.kuroshiroInstance.convert(this.firstSong, { to: 'hiragana' });
        // ここで正規表現を参照
        const reRef = new RegExp(this.re, 'g');
        // 正規表現を排除
        const replaceRe = songOne.replace(reRef , '');
        const countOne = replaceRe.length;
        if (countOne > 5) {
            this.textBooleanValueOne = true;
        } else {
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
        } else {
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
        } else {
            this.textBooleanValueThree = false;
        }
    }
    private async fourth() {
        const songFour = await this.kuroshiroInstance.convert(this.fourthSong, { to: 'hiragana' });
        const reRef = new RegExp(this.re, 'g');
        const replaceRe = songFour.replace(reRef, '');
        const countFour = replaceRe.length;
        if (countFour > 7) {
            this.textBooleanValueFour = true;
        } else {
            this.textBooleanValueFour = false;
        }
    }
    private async fifth() {
        const songFive = await this.kuroshiroInstance.convert(this.fifthSong, { to: 'hiragana' });
        const reRef = new RegExp(this.re, 'g');
        const replaceRe = songFive.replace(reRef, '');
        const countFive = replaceRe.length;
        if (countFive > 7) {
            this.textBooleanValueFive = true;
        } else {
            this.textBooleanValueFive = false;
        }
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
    private get returnFieldTypeFour(): string {
        if (this.textBooleanValueFour === true) {
            return 'is-danger';
        } else {
            return '';
        }
    }
    private get returnFieldTypeFive(): string {
        if (this.textBooleanValueFive === true) {
            return 'is-danger';
        } else {
            return '';
        }
    }
    // 画像をbase64形式に変換する。
    private downloadImg() {
        if (this.canvas === null) {
            return;
        }
        const typeBase64 =  this.canvas.toDataURL('image/png');
        console.log(typeBase64);
    }
    private mounted() {
        LoadUtil.loading(this.$loading, async () => {
            await this.kuroshiroInstance.init(new KuromojiAnalyzer({dictPath: '/dict'}));
            console.log('kuroshiro ready');
        });
        // canvasの処理(画像の方)
        this.canvas = this.$refs.canvas as HTMLCanvasElement;
        this.canvas.width = this.sheetWidth;
        this.canvas.height = this.sheetHeight;
        this.ctx = this.canvas.getContext('2d');
        this.ctxFirstSong = this.canvas.getContext('2d');
        this.ctxSecoundSong = this.canvas.getContext('2d');
        this.ctxThirdSong = this.canvas.getContext('2d');
        this.ctxFourthSong = this.canvas.getContext('2d');
        this.ctxFifthSong = this.canvas.getContext('2d');

        this.pinkSheet = new Image();

        this.pinkSheet.onload = () => {
            if (this.ctx === null || this.pinkSheet === null) {
                return;
            }
            this.drawSheet();
            this.drawCanvasFirstSong();
            this.drawCanvasSecoundSong();
            this.drawCanvasThirdSong();
            this.drawCanvasFourthSong();
            this.drawCanvasFifthSong();
        };
        this.pinkSheet.src = this.sheets['pink-sheet'];
    }
}
</script>
<style lang="sass">
@import 'all';
.vue-write-area
    .songs
        display: none

    .sheetArea
        display: flex
    .canvas-style
        margin: 0 auto
    // スマホ用のcss
    @media screen and (max-width: $tablet)
        .canvas-style
            margin: 0 auto
            height: 100%
            width: 100%
</style>
