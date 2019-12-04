<template>
    <div class="editPictures flex">
        <v-header></v-header>
        <div class="e_l">
            <div v-for="(item,idx) in e_btn_list" :key="idx" :class="{active : selectType===idx}"
                 @click="selectType=idx">
                <img :src="item.url" alt="">
                <span>{{item.title}}</span>
            </div>
        </div>
        <div class="e_c">
            <div class="first" v-show="selectType===0">
                <p>前景</p>
                <div class="flex">
                    <el-button round :class="{active : isClear}" @click="changeClear(1)">擦除</el-button>
                    <el-button round :class="{active : !isClear}" @click="changeClear(2)">还原</el-button>
                </div>
                <p>画笔大小</p>
                <div class="flex a-i">
                    <el-slider v-model="penSize" :max="30" :min="1" :show-tooltip="false"></el-slider>
                    <span>{{penSize}}px</span>
                </div>
            </div>
            <div class="second" v-show="selectType===1">
                <p>背景</p>
                <div class="flex smallBtn">
                    <div v-for="(items,idx) in color" :key="idx"
                         @click.stop="choseBackColor(items,idx)"
                         class="cu" :class="{'bordershow' : idx===choseBack}">
                        <div class="flex color_List" v-show="showcolorList && idx===1">
                            <span v-for="(color,idxs) in colorList" :key="idxs" :style="{backgroundColor:color}"
                                  @click.stop="choseColor(color)"></span>
                        </div>
                        <img :src="items" alt="" style="left: 0;top: 0;width: 28px;height: 28px;border-radius: 50%;"
                             :title="idx | imgtitle">
                    </div>
                </div>
                <p>更换背景</p>
                <el-button type="primary" plain style="width: 100%">自定义背景</el-button>
                <div class="bgbtn flex">
                    <el-button v-for="(item,idx) in bgBtn" :key="idx" :type="bgType===idx ? 'primary' : ''"
                               @click="changeBgType(idx)">{{item}}
                    </el-button>
                </div>
                <div class="flex a-i bgimgs f-w">
                    <div v-for="(item,idx) in oneItemBg" :key="idx" class="cu" :class="{active : selectIdx===idx}"
                         @click="selectBg(item,idx)">
                        <img :src="item" alt="">
                    </div>
                </div>
            </div>

        </div>
        <div class="e_r" id="e_r">
            <div class="r_h flex a-i">
                <div class="h_l">
                    <img src="../../assets/image/Revoke.png" alt="" class="cu">
                    <img src="../../assets/image/Revoke.png" alt="" class="cu">
                </div>
                <div class="flex c_input">
                    <span>画布尺寸：</span>
                    <div><input type="number" v-model="pxWidth" @input="changeSize(1)"><i>宽(px)</i></div>
                    <div><input type="number" v-model="pxHeight" @input="changeSize(2)"><i>高(px)</i></div>
                </div>
                <el-button type="primary" icon="el-icon-download">下载</el-button>
            </div>
            <div class="canvas" :style="{width:`${pxWidth}px`,height:`${pxHeight}px`}">
                <canvas id="b_g">当前游览器不支持此功能，换一个试试吧！</canvas>
                <canvas id="b_p">当前游览器不支持此功能，换一个试试吧！</canvas>
            </div>
            <div class="nowMsg flex a-i">
                <i class="el-icon-minus cu" @click="wheelFun({deltaY:1})"></i>
                <span>{{parseInt(pxWidth/preimgObj.width*100)}}%</span>
                <i class="el-icon-plus cu" @click="wheelFun({deltaY:-1})"></i>
                <span>1:1</span>
                <img src="../../assets/image/preview.png" alt="" class="cu">
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import vHeader from '@/components/header'
    import {myBrowser} from '@/utils'
    import one from '@/assets/image/e_o.png'
    import two from '@/assets/image/e_t.png'
    import three from '@/assets/image/e_th.png'
    import four from '@/assets/image/e_f.png'
    import {mixins} from '@/minxins'
    import opacity from '@/assets/opacity.jpg'
    import {getMattingInfo} from "../../apis";
    import JSManipulate from '@/utils/jsmanipulate.js'

    export default {
        name: 'editPictures',
        mixins: [mixins],
        data() {
            return {
                opacity,
                e_btn_list: [
                    {url: one, title: '擦除'},
                    {url: two, title: '背景'},
                    {url: three, title: '文字'},
                    {url: four, title: '形状'},
                ],
                selectType: 0,
                isClear: true,
                penSize: 10,
                choseBack: 0,
                showcolorList: false,
                bgBtn: ['摄影', '手绘', '颜色',],
                bgType: 0,
                selectIdx: -1,
                // cWidth: 500,//实际canvas宽
                // cHeight: 500,//实际canvas高
                pxWidth: 500,//css canvas宽
                pxHeight: 500,//css canvas高
                canvasinitNum: 500,//初始化基数
                cans: '',//前canvas
                cansTxt: '',//前canvas
                bgCans: '',//后canvas
                bgCansTxt: '',//后canvas
                Original: '',//原图片链接
                OriginalObj: '',//原图片对象
                imgUrl: '',//图片链接
                preimgObj: '',//预览图加载后对象
                scale: '',//图片比例系数
                Offsetxy: {x: 0, y: 0},//偏移量坐标
                downxy: {x: 0, y: 0},//鼠标按下坐标
                initwh: {w: 0, h: 0},//内容图片大小
                selfImg: '',//自定义背景对象
                bgobj: '',//选中的背景对象
                colorValue: '',//纯色背景
                setScale: 0,//放大系数
            }
        },
        components: {
            vHeader
        },
        computed: {
            ossId() {
                return this.$route.query.ossId
            }
        },
        methods: {
            changeClear(k) {//切换擦除还原
                this.isClear = k === 1 ? true : false;
            },
            choseBackColor(color, index) {//纯色背景切换
                this.choseBack = index;
                this.selfImg = '';
                if (index !== 1) this.showcolorList = false;
                if (index === 0) {
                    this.drawImgAfterFirst( this.preimgObj, this.opacity, 1 )
                } else if (index === 2) this.drawStyleBg( this.OriginalObj, this.preimgObj, 1 );
                else if (index === 3) this.drawStyleBg( this.OriginalObj, this.preimgObj, 2 );
                else {
                    this.showcolorList = !this.showcolorList
                }
            },
            choseColor(color) {//选择颜色背景，颜色选择器
                this.colorValue = color
                this.selfImg = '';
                this.drawImgAfterFirst( this.preimgObj, color, 2 );
            },
            changeBgType(idx) {
                if (this.bgType === idx) return;
                this.bgType = idx;
                this.selectIdx = -1;
                this.oneItemBg = []
                this.$nextTick( () => {
                    this.oneItemBg = this.bgList[idx]
                } )
            },
            selectBg(item, idx, z) {
                this.selfImg = '';
                this.selectIdx = idx;
                let bgimg = new Image();
                bgimg.crossOrigin = '';
                bgimg.onload = () => {
                    this.bgobj = bgimg;
                    this.drawImgAfterFirst( this.preimgObj, bgimg, 1 );
                }
                bgimg.src = z ? this.bgList[item][idx] : item;
            },
            initCans() {//初始化画布
                this.cans = document.getElementById( 'b_p' );
                this.bgCans = document.getElementById( 'b_g' );
                this.cansTxt = this.cans.getContext( '2d' );
                this.bgCansTxt = this.bgCans.getContext( '2d' );
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    this.cans.width = 2 * oImg.width
                    this.cans.height = 2 * oImg.height
                    this.bgCans.width = 2 * oImg.width
                    this.bgCans.height = 2 * oImg.height
                    this.preimgObj = oImg
                    this.scale = oImg.width / oImg.height
                    // this.cWidth = 2 * oImg.width
                    // this.cHeight = 2 * oImg.height
                    this.initwh = {w: 2 * oImg.width, h: 2 * oImg.height}
                    if (oImg.width >= oImg.height) {
                        this.pxWidth = oImg.width >= this.canvasinitNum ? this.canvasinitNum : oImg.width;
                        this.pxHeight = oImg.width >= this.canvasinitNum ? this.canvasinitNum / this.scale : oImg.height;
                    } else {
                        this.pxHeight = oImg.height >= this.canvasinitNum ? this.canvasinitNum : oImg.height;
                        this.pxWidth = oImg.height >= this.canvasinitNum ? this.canvasinitNum * this.scale : oImg.width;
                    }
                    this.cansTxt.drawImage( oImg, this.Offsetxy.x, this.Offsetxy.y, this.initwh.w, this.initwh.h )
                }
                oImg.src = this.imgUrl;
                let oBg = new Image();
                oBg.crossOrigin = '';
                oBg.onload = () => {
                    this.opacity = oBg
                    this.initBgimg( oBg, this.bgCans, this.bgCansTxt )
                }
                oBg.src = this.opacity
            },
            initBgimg(bg_img, cans, ctx) {//生成背景通用方法
                ctx.clearRect( 0, 0, cans.width, cans.height )
                const oBg = bg_img, can = cans;
                const h = can.width * oBg.height / oBg.width;
                const w = can.height * oBg.width / oBg.height;
                if (h > can.height) {
                    const bh = ((h - can.height) / 2) * oBg.height / h;
                    ctx.drawImage( oBg, 0, bh, oBg.width, oBg.height - 2 * bh, 0, 0, can.width, can.height );
                } else {
                    const bw = ((w - can.width) / 2) * oBg.width / w;
                    ctx.drawImage( oBg, bw, 0, oBg.width - 2 * bw, oBg.height, 0, 0, can.width, can.height );
                }
            },
            drawImgAfterFirst(img, bg, k) {//通用提取
                this.bgCansTxt.clearRect( 0, 0, this.bgCans.width, this.bgCans.height )
                if (k === 1) this.initBgimg( bg, this.bgCans, this.bgCansTxt )
                else {
                    this.bgCansTxt.fillStyle = bg
                    this.bgCansTxt.fillRect( 0, 0, this.bgCans.width, this.bgCans.height )
                }
                this.cansTxt.clearRect( 0, 0, this.cans.width, this.cans.height );
                this.cansTxt.drawImage( img, this.Offsetxy.x, this.Offsetxy.y, this.initwh.w, this.initwh.h );
            },
            drawStyleBg(originalImgUrl, bgRemovedImgUrl, index, key, callback) {
                if (!key) {
                    this.drawStyleBg2( originalImgUrl, bgRemovedImgUrl, index )
                } else if (key === 2) {
                    this.downOthers( {oldImg: originalImg, bgImg: img}, 4, callback )
                } else if (key === 3) {
                    this.downOthers( {oldImg: originalImg, bgImg: img}, 5, callback )
                }
            },
            drawStyleBg2(originalImg, bgRemovedImg, index) {
                let canvas = document.createElement( 'canvas' );
                canvas.width = this.cans.width; //☜
                canvas.height = this.cans.height;
                let ctx = canvas.getContext( "2d" );
                ctx.drawImage( originalImg, 0, 0, canvas.width, canvas.height );
                let imgData = ctx.getImageData( 0, 0, canvas.width, canvas.height );
                let newBg1 = imgData;
                let newBg4 = ctx.getImageData( 0, 0, canvas.width, canvas.height );
                JSManipulate.blur.filter( newBg1, {amount: 5.0} );
                JSManipulate.grayscale.filter( newBg4 );
                if (index === 1) this.showStyleBgCanvas( newBg4, bgRemovedImg, "前景彩色，背景黑白" );
                else this.showStyleBgCanvas( newBg1, bgRemovedImg, "模糊聚焦" );
            },
            showStyleBgCanvas(newBg, bgRemovedImg) {
                this.cansTxt.clearRect( 0, 0, this.cans.width, this.cans.height );
                this.cansTxt.putImageData( newBg, 0, 0 );
                this.cansTxt.drawImage( bgRemovedImg, 0, 0, this.cans.width, this.cans.height );
                this.bgCansTxt.clearRect( 0, 0, this.bgCans.width, this.bgCans.height )
            },
            downLoad() {
                let cans = document.createElement( 'canvas' );
                let ctxs = cans.getContext( '2d' );
                let oImg = new Image();
                oImg.crossOrigin = "";
                oImg.onload = function () {
                    cans.width = oImg.width;
                    cans.height = oImg.height;
                    ctxs.drawImage( oImg, 0, 0, cans.width, cans.height );
                    if (myBrowser() === 'IE' || myBrowser() === 'Edge') {//ie下载图片
                        let url = cans.msToBlob();
                        let blobObj = new Blob( [url] );
                        window.navigator.msSaveOrOpenBlob( blobObj, this.bgOriginal.name + ".png" );
                    } else {
                        let url = cans.toDataURL( "image/png" );
                        let arr = url.split( ',' ), mime = arr[0].match( /:(.*?);/ )[1], bstr = atob( arr[1] ),
                            n = bstr.length, u8arr = new Uint8Array( n );
                        while (n--) {
                            u8arr[n] = bstr.charCodeAt( n );
                        }
                        let objurl = URL.createObjectURL( new Blob( [u8arr], {type: mime} ) );
                        let save_link = document.createElement( 'a' );
                        save_link.href = objurl;
                        save_link.download = 'pictrue.png';
                        let event = document.createEvent( 'MouseEvents' );
                        event.initMouseEvent( 'click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null );
                        save_link.dispatchEvent( event );
                    }
                }
                oImg.src = this.imgInfo + `?str=${Math.random()}`
            },
            initImgs() {
                const data = {fileId: this.ossId}
                getMattingInfo( data ).then( res => {
                    this.Original = res.data.original
                    this.imgUrl = res.data.bgRemovedPreview
                    let orige = new Image()
                    orige.crossOrigin = ''
                    orige.onload = () => {
                        this.OriginalObj = orige
                    }
                    orige.src = res.data.original + `?str=${Math.random()}`
                    this.initCans()
                } )
            },
            changeSize(k) {
                if (k === 1) {
                    this.pxWidth = this.pxWidth >= this.cans.width ? this.cans.width : this.pxWidth;
                    this.pxHeight = this.pxWidth / this.scale;
                } else {
                    this.pxHeight = this.pxHeight >= this.cans.height ? this.cans.height : this.pxHeight;
                    this.pxWidth = this.pxHeight * this.scale;
                }
            },
            wheelFun(e){
                if(e.deltaY < 0 && this.setScale>=1)return;
                if(e.deltaY > 0 && this.setScale<=-0.5)return;
                if (e.deltaY < 0)this.setScale=parseFloat((this.setScale+0.1).toFixed(1));//放大
                else this.setScale=parseFloat((this.setScale-0.1).toFixed(1));//放大
                console.log(e,this.setScale)
                this.pxWidth=parseInt(this.preimgObj.width*(1+this.setScale))
                this.pxHeight=parseInt(this.pxWidth/this.scale)
            }
        },
        mounted() {
            this.initImgs()
            document.getElementById('e_r').addEventListener( 'wheel', this.wheelFun )
        }
    }
</script>
<style scoped lang="scss">
    .editPictures {
        height: 100%;
        overflow: hidden;

        & > div {
            padding-top: 90px;
        }

        .e_l {
            width: 80px;
            border-right: 1px solid #eee;
            background-color: #fff;
            font-size: 12px;
            text-align: center;

            & > div {
                margin-bottom: 40px;
                padding: 5px 0;
                position: relative;
                cursor: pointer;
            }

            .active:before {
                height: 100%;
                width: 8px;
                content: '';
                background-color: $co;
                position: absolute;
                top: 0;
                left: 0;

            }

            img {
                display: block;
                margin: 0 auto;
                width: 25px;
                margin-bottom: 5px;
            }
        }

        .e_c {
            padding-left: 25px;
            padding-right: 25px;
            width: 225px;
            border-right: 1px solid #eee;
            background-color: #fff;

            p:first-child {
                margin-bottom: 20px;
            }

            p:nth-child(3) {
                color: #333;
                margin: 40px 0 10px 0;
            }

            .first .el-button {
                width: 80px;
                line-height: 30px;
                height: 30px;
                padding: 0 12px;
            }

            .active {
                border-color: $co;
                color: $co;
            }

            .el-slider {
                width: 80%;
                margin-right: 15px;
            }

            .second {
                .smallBtn > div {
                    border-radius: 50%;
                    width: 28px;
                    height: 28px;
                    margin-right: 15px;
                    position: relative;
                }

                & .bordershow.cu {
                    border: 1px solid #e82255;
                    color: $co;
                }

                .color_List {
                    position: absolute;
                    top: 30px;
                    right: -200px;
                    width: 240px;
                    flex-wrap: wrap;
                    box-shadow: 0 0 10px #333;
                    margin-top: 10px;
                    z-index: 1002;
                    background-color: #fff;

                    span:first-child {
                        margin-bottom: 10px;
                    }

                    span {
                        width: 20px;
                        height: 20px;
                    }
                }

                .bgbtn {
                    justify-content: space-between;
                    margin-top: 16px;

                    .el-button {
                        height: 30px;
                        line-height: 30px;
                        padding: 0 16px;
                    }
                }

                .bgimgs {
                    overflow-y: scroll;
                    justify-content: space-between;
                    height: 350px;
                    margin-top: 25px;

                    .active {
                        box-shadow: 0 0 10px $co;
                    }
                }

                .bgimgs > div {
                    width: 65px;
                    height: 65px;
                    border-radius: 10px;
                    background-color: #eee;
                    margin-bottom: 10px;

                    img {
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }

        .e_r {
            padding-top: 60px;
            flex: 1;
            position: relative;
            overflow: hidden;

            .r_h {
                padding-left: 25px;
                height: 50px;
                background-color: #fff;
                justify-content: space-between;
                position: relative;
                z-index: 10;

                img {
                    width: 20px;

                    &:last-child {
                        margin-left: 30px;
                        transform: rotateY(180deg);
                    }
                }

                .c_input {
                    font-size: 14px;
                    line-height: 28px;
                    margin-left: -10%;

                    input {
                        width: 40px;
                        border: none;
                        margin-right: 15px;
                    }

                    & > div {
                        padding: 0 15px;
                        border: 1px solid #999;
                        margin-right: 10px;
                    }

                    span {
                        display: inline-block;
                    }
                }

                .el-button {
                    width: 150px;
                    height: 100%;
                }
            }

            .nowMsg {
                position: absolute;
                left: 50%;
                bottom: 6%;
                transform: translateX(-50%);
                font-size: 14px;
                padding: 0 20px;
                line-height: 38px;
                border-radius: 19px;
                background-color: rgba(0, 0, 0, .3);
                color: #fff;

                img {
                    width: 22px;
                }

                span {
                    margin: 0 25px;
                }
            }

            .canvas {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);

                canvas {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>
