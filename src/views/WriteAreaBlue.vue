<template lang="pug">
.vue-write-area
    .sheetArea
        canvas.canvas-style(ref="canvas")
    .button-parent
        b-dropdown.button-style
            button.button(slot="trigger")
                span シートのカラーを変える
                b-icon(icon="menu-down")
            b-dropdown-item
                router-link(to="/") ピンク
            b-dropdown-item
                router-link(to="orange") オレンジ
            b-dropdown-item
                router-link(to="blue") ブルー
            b-dropdown-item
                router-link(to="/green") グリーン
            b-dropdown-item
                router-link(to="/purple") パープル
    //- 上の句を書き込むエリア
    .forms
        p.title 上の句
        div.columns
            b-field.column(label="初句" horizontal)
                b-input(type="text" v-model="firstSong"  maxlength="5")
            b-field.column(label="二句" horizontal)
                b-input(type="text" v-model="secondSong" maxlength="7")
            b-field.column(label="三句" horizontal)
                b-input(type="text" v-model="thirdSong" maxlength="5")
        p.title 下の句
        //- 下の句を書き込むエリア
        div.columns
            b-field.column(label="四句" horizontal)
                b-input(type="text" v-model="fourthSong" maxlength="7")
            b-field.column(label="結び句" horizontal)
                b-input(type="text" v-model="fifthSong" maxlength="7")

    .button-parent
            button#download.button.is-info.button-style(@click="downloadBtn") 画像をダウンロード
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

interface Img {
    [ key: string ]: string; // interfaceでimgの型定義を作っている。この場合、キーはstringでvalueがストリングの意味。
}

@Component
export default class WriteArea extends Vue {
    private firstSong: string  = '千早ぶる';
    private secondSong: string = '神代もきかず';
    private thirdSong: string = '龍田川';
    private fourthSong: string = 'からくれなゐに';
    private fifthSong: string = '水くくるとは';
    // canvasに使うデータの用意
    private canvas: HTMLCanvasElement | null = null;
    private ctx: CanvasRenderingContext2D | null = null;
    private blueSheet: HTMLImageElement | null = null;
    private ctxFirstSong: CanvasRenderingContext2D | null = null;
    private ctxSecondSong: CanvasRenderingContext2D | null = null;
    private ctxThirdSong: CanvasRenderingContext2D | null = null;
    private ctxFourthSong: CanvasRenderingContext2D | null = null;
    private ctxFifthSong: CanvasRenderingContext2D | null = null;
    private sheetWidth = 500;
    private sheetHeight = 500;

    // 画像を読み込む
    private sheets: Img = {
        'blue-sheet': require('../assets/sheets/blue.png'),
    };

    // 画像を描画する。
    private drawBlueSheet() {
        if (this.ctx === null || this.blueSheet === null) {
            return;
        }
        this.ctx.drawImage(this.blueSheet, 0, 0);
    }
    // 短歌をcanvasに描画する。
    private drawCanvasFirstSong() {
        if (this.ctxFirstSong === null) {
            return;
        }
        this.ctxFirstSong.font = '25px serif';
        this.ctxFirstSong.fillStyle = 'white';
        this.ctxFirstSong.fillText(this.firstSong, 50, 160);
    }
    private drawCanvasSecondSong() {
        if (this.ctxSecondSong === null) {
            return;
        }
        this.ctxSecondSong.font = '25px serif';
        this.ctxSecondSong.fillStyle = 'white';
        this.ctxSecondSong.fillText(this.secondSong, 50, 200);
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

    private downloadBtn() {
        if (this.canvas === null) {
            return;
        }
            const canvasDate = this.$refs.canvas;
            const link = document.createElement('a');
            link.href = this.canvas.toDataURL('image/png');
            link.download = '平成百人一首.png';
            link.click();
    }

    private mounted() {
        // canvasの処理(画像の方)
        this.canvas = this.$refs.canvas as HTMLCanvasElement;
        this.canvas.width = this.sheetWidth;
        this.canvas.height = this.sheetHeight;
        this.ctx = this.canvas.getContext('2d');
        this.ctxFirstSong = this.canvas.getContext('2d');
        this.ctxSecondSong = this.canvas.getContext('2d');
        this.ctxThirdSong = this.canvas.getContext('2d');
        this.ctxFourthSong = this.canvas.getContext('2d');
        this.ctxFifthSong = this.canvas.getContext('2d');

        this.blueSheet = new Image();

        this.blueSheet.onload = () => {
            if (this.ctx === null || this.blueSheet === null) {
                return;
            }
            this.drawBlueSheet();
            this.drawCanvasFirstSong();
            this.drawCanvasSecondSong();
            this.drawCanvasThirdSong();
            this.drawCanvasFourthSong();
            this.drawCanvasFifthSong();
        };
        this.blueSheet.src = this.sheets['blue-sheet'];
    }
    @Watch('firstSong')
    @Watch('secondSong')
    @Watch('thirdSong')
    @Watch('fourthSong')
    @Watch('fifthSong')
        private rewrite() {
            this.drawBlueSheet();
            this.drawCanvasFirstSong();
            this.drawCanvasSecondSong();
            this.drawCanvasThirdSong();
            this.drawCanvasFourthSong();
            this.drawCanvasFifthSong();
        }
}
</script>
<style lang="sass">
@import 'all';
.vue-write-area
    .sheetArea
        display: flex
    .canvas-style
        margin: 0 auto
    .forms
        max-width: 80%
        margin: 0 auto
        margin-top: 40px
    .button-parent
        display: flex
    .button-style
        margin: 0 auto
        margin-top: 55px
    // スマホ用のcss
    @media screen and (max-width: $tablet)
        .canvas-style
            margin: 0 auto
            height: 100%
            width: 100%
            max-width: 90%
</style>
