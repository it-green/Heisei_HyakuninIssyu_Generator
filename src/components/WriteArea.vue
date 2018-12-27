<template lang="pug">
.vue-write-area
    section.section.has-text-centered
        .container
            canvas.canvas-size(ref='canvas')

    section.section.input-section
        b-field(v-for='formItem in formItems' :type='returnFieldType(formItem.hasError)' :label='formItem.label' :message='returnMessage(formItem.errorMessage, formItem.hasError)' :key='formItem.id' horizontal)
            b-input(type='text' v-model='formItem.value' maxlength='10' @blur='checkPhraseLength(formItem.value, formItem.label, formItem.id)')
        button.button.is-success.is-pulled-right(@click='changeFrame("blue")') ボタン
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';
import LoadUtil from '@/utils/LoadUtil';
import ImgUtil from '@/utils/ImgUtil';

interface Img {
    [ key: string ]: string; // interfaceでimgの型定義を作っている。この場合、キーはstringでvalueがストリングの意味。
}

@Component
export default class WriteArea extends Vue {
    private kuroshiroInstance = new Kuroshiro();
    private hasError = false;
    private formItems = [
        { id: 1, label: '5', value: 'くれなゐの', errorMessage: '5音の句を入力してください', hasError: false },
        { id: 2, label: '7', value: '二尺伸びたる', errorMessage: '7音の句を入力してください', hasError: false },
        { id: 3, label: '5', value: '薔薇の芽の', errorMessage: '5音の句を入力してください', hasError: false },
        { id: 4, label: '7', value: '針やはらかに', errorMessage: '7音の句を入力してください', hasError: false },
        { id: 5, label: '7', value: '春雨のふる', errorMessage: '7音の句を入力してください', hasError: false },
    ];
    private Imgs = {
        defaultFrame: require('@/assets/sheets/pink.png'),
        blueFrame: require('@/assets/sheets/blue.png'),
    } as Imgs;
    private frameImgObj: {[key: string]: HTMLImageElement} = {};

    private returnFieldType(hasError: boolean): string {
        if (!hasError) {
            return '';
        } else {
            return 'is-danger';
        }
    }

    private returnMessage(message: string, hasError: boolean): string {
        if (!hasError) {
            return '';
        } else {
            return message;
        }
    }

    private checkPhraseLength(formValue: string, numberToCountChars: string, formId: number) {
        // 入力値をひらがなへ変換
        this.kuroshiroInstance.convert(formValue, { to: 'hiragana' })
            .then((result: string) => {
                console.log(`変換結果：${result}`);
                // 変換結果からひらがな又はカタカナの小文字を削除
                const noLowerCase = result.replace(/[ぁぃぅぇぉゕゖっゃゅょゎァィゥェォヵヶッャュョヮ]/g, '');
                console.log(`小文字を取り払った結果：${noLowerCase}`);
                // formItem.label の値から、チェックする文字数を変数 numberToCountChars として渡す
                // 文字数チェック用の正規表現を作成
                const checkChars = new RegExp(`^.{${numberToCountChars}}$`);
                const checkResult = checkChars.test(noLowerCase);
                console.log(`最終チェック結果：${checkResult}`);
                console.log('------------------------------------');
                this.formItems.forEach((item) => {
                    if (item.id === formId && checkResult === false) {
                        item.hasError = true;
                    }
                    if (item.id === formId && checkResult === true) {
                        item.hasError = false;
                    }
                });
            },
        );
    }

    private preloadImages() {
        const imgsKeys = Object.keys(this.Imgs);
        Promise.all(imgsKeys.map(async (key) => {
            const url = this.Imgs[key] as string;
            await ImgUtil.loadImg(url).then((img) => this.frameImgObj[key] = img);
        }));
    }

    private initFrame() {
        const canvas = this.$refs.canvas as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('no canvas context');
            return;
        }
        ImgUtil.loadImg(this.Imgs.defaultFrame as string)
            .then((img) => {
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                ctx.drawImage(img, 0, 0);
            }).catch((e) => {
                console.error(e);
            },
        );
    }

    private changeFrame(color: string) {
        const canvas = this.$refs.canvas as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('no canvas context');
            return;
        }
        switch (color) {
            case 'pink':
                canvas.width = this.frameImgObj.defaultFrame.naturalWidth;
                canvas.height = this.frameImgObj.defaultFrame.naturalHeight;
                ctx.drawImage(this.frameImgObj.defaultFrame, 0, 0);
                break;
            case 'blue':
                canvas.width = this.frameImgObj.blueFrame.naturalWidth;
                canvas.height = this.frameImgObj.blueFrame.naturalHeight;
                ctx.drawImage(this.frameImgObj.blueFrame, 0, 0);
                break;
            default:
                break;
        }
    }

    private mounted() {
        this.preloadImages();
        this.initFrame();
        // kuroshiro の初期化が完了するまで loding を表示
        LoadUtil.loading(this.$loading, async () => {
            await this.kuroshiroInstance.init(new KuromojiAnalyzer({dictPath: '/dict'}));
            console.log('kuroshiro is ready');
        });
    }

    @Watch('formItems', { deep: true })
    private fillCanvasText() {
        this.changeFrame('pink');
        const canvas = this.$refs.canvas as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('no canvas context');
            return;
        }
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'left';
        const formItemLength = this.formItems.length;
        const cellHeight = canvas.height / 8;
        this.formItems.forEach((formItem, index) => {
            ctx.fillText(formItem.value, 80, (index + 2) * cellHeight);
        });
    }
}
</script>
<style lang="sass">
$canvas-min-size: 280px
$canvas-max-size: 550px
.vue-write-area
    .canvas-size
        min-width: $canvas-min-size
        min-height: $canvas-min-size
        max-width: $canvas-max-size
        max-height: $canvas-max-size
        width: 100%
        height: 100&

    .input-section
        max-width: 600px
        margin: 0 auto

</style>
