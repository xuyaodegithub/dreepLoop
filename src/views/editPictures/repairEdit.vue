<template>
    <div class="repairEdit flex">
        <input type="file" style="display: none;" ref="fileInput" accept="image/*" :multiple="false"
               @change="changeselfImg">
        <div class="edHead flex j-b a-i">
            <div class="left">
                <a href="index.html"><img src="@/assets/image/sureLogo.png" alt=""></a> <span>|</span><a href="intelligentRepair.html">修复</a>
            </div>
            <div class="center">
                <span @click="setBack(0)" :style="{color:`${historyList.indexOf(imageInfo)>0 ? '#333' : '#9c9c9c'}`}"><i
                        class="icon iconfont icon-lujing"></i> 上一步</span>
                <span @click="setBack(1)"
                      :style="{color:`${historyList.indexOf(imageInfo)<(historyList.length-1) ? '#333' : '#9c9c9c'}`}"><i
                        class="icon iconfont icon-lujing"></i> 下一步</span>
                <span @click="resets()"><i class="el-icon-refresh-right" style="font-size: 18px;"></i> 重做</span>
            </div>
            <div class="right">
                <el-button type="primary" style="background-color: #fff;color: #e82255;" @click="reloads">重新上传
                </el-button>
                <el-button type="primary" icon="el-icon-download" @click="downLoadImg($event)">下载
                </el-button>
            </div>
        </div>
        <div class="section flex">
            <div class="s_left" @mouseleave="showPaint=false">
                <div v-for="(item,idx) in typeList" :key="idx" :class="{ 'active' : typeIdx===idx }"
                     @mouseenter=" typeIdx===idx ? showPaint=true : ''"
                     @click="changeType(idx)">
                    <i class="icon iconfont" :class="item.icon"></i>
                    <div>{{item.title}}</div>
                </div>
                <div class="paint" v-show="[0,2].includes(typeIdx) && showPaint"
                     :style="{top:`${typeIdx ? 176 : 0}px`}">
                    <p>画笔大小</p>
                    <div class="flex a-i">
                        <el-slider v-model="penSize" :min="1" :max="30" :show-tooltip="false"></el-slider>
                        <span>{{penSize}}px</span>
                    </div>
                </div>
            </div>
            <div class="s_right">
                <div class="content" ref="canvasM" v-show="oriImgurl"
                     :style="{width:`${pxWidth}px`,height:`${pxHeight}px`,cursor:`${curose}`}"
                     @mousedown="downs">
                    <!--:class="{active : showBorder,resiaze : (isPattern===5 || downSpace)}"-->
                    <canvas id="cans"></canvas>
                    <canvas id="up_cans" :style="{'opacity':`${typeIdx!==1 ? 0.6 : 1}`}"></canvas>
                    <div class="loadingss flex a-i" v-show="loading.show">
                        <div class="el-icon-loading" style="display: block;font-size: 32px;margin-bottom: 15px;"></div>
                        {{loading.text}}
                    </div>
                    <div class="hideborder"
                         v-show="typeIdx!==1"
                         :style="{width:`${borderXy.w}px`,height:`${borderXy.h}px`,borderRadius:'50%',backgroundColor:'rgba(89, 142, 238, 0.6)',top:`${borderXy.y}px`,left:`${borderXy.x}px`}"></div>
                    <div class="Btn cu"
                         v-show="showBtn"
                         @mouseenter="noDown=true"
                         @mouseleave="noDown=false"
                         @click.stop="repairImg">开始修复
                    </div>
                </div>
                <div class="nowMsg flex a-i">
                    <i class="el-icon-minus cu" @click="wheelFun({deltaY:1})"></i>
                    <span>{{initBl}}</span>
                    <i class="el-icon-plus cu" @click="wheelFun({deltaY:-1})"></i>
                </div>
                <aside>提示：图片修复下载需消耗2个点数</aside>
            </div>
        </div>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {getToken} from "@/utils/auth";
    import {redirMatting, getMattingInfo, uploadossBg} from '@/apis'
    import {compressImg} from "../../utils";
    export default {
        name: "repairEdit",
        data() {
            return {
                edrieImgInfo: {
                    imageMsg: {}
                },
                typeList: [
                    {title: '涂抹修复', icon: 'icon-huabi'},
                    {title: '勾选修复', icon: 'icon-taosuo'},
                    {title: '点击修复', icon: 'icon-dianji'},
                ],
                typeIdx: 0,//类型idx
                penSize: 10,//画笔大小
                showPaint: true,//调节画笔大小框
                pxWidth: 500,//css canvas宽
                pxHeight: 500,//css canvas高
                canvasinitNum: 650,//初始化基数
                borderXy: {x: 0, y: 0, w: 0, h: 0},//跟随鼠标圆的位置
                can: '',
                upCan: '',
                canTxt: '',
                upCanTxt: '',
                hideCan: '',
                hideCanTxt: '',
                oriImgObg: {},
                oriImgurl: '',
                imageInfo: {},
                scale: '',//图片比例系数
                fileId: '',
                loading: {show: false, text: '处理中...'},
                isPattern: 0,//0无模式，1抹擦、2勾选、3点击，4移动
                oCantl: '',
                downXy: {x: 0, y: 0, px: 0, py: 0, cl: 0, ct: 0},//cl,ct canvas的定位偏移量
                downSpace: false,
                showBtn: false,//显示确定按钮
                file: '',
                setScale: 0,
                historyList: [],//历史记录
                noDown: false,
                imgName: ''

            }
        },
        mounted() {
            if (getToken()) this.userGetscribe();
            [this.can, this.hideCan, this.upCan] = [document.getElementById( 'cans' ), document.createElement( 'canvas' ), document.getElementById( 'up_cans' )];
            [this.canTxt, this.hideCanTxt, this.upCanTxt] = [this.can.getContext( '2d' ), this.hideCan.getContext( '2d' ), this.upCan.getContext( '2d' )];
            document.addEventListener( 'mousemove', this.moves )
            document.addEventListener( 'mouseup', this.ups )
            document.getElementsByClassName( 's_right' )[0].addEventListener( 'click', () => {
                this.showPaint = false;
            } )
            document.addEventListener( 'keydown', (e) => {
                const keynum = window.event ? e.keyCode : e.which;
                if (keynum === 32) this.downSpace = true;
            } )
            document.addEventListener( 'keyup', (e) => {
                this.downSpace = false;
            } )
            document.getElementsByClassName( 's_right' )[0].addEventListener( 'wheel', this.wheelFun )
            window.addEventListener( 'resize', (e) => {
                this.oCantl = document.getElementsByClassName( `content` )[0].getBoundingClientRect();
            } )
            this.initImgData();
        },
        computed: {
            ...mapGetters( ['userSubscribeData'] ),
            curose() {
                const a = ['default', 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTguOTUgMTIuMDhjNC43MDggMCA2LjUzNiAzLjE4OCA1LjU3IDcuMjA2LS42NCAyLjY2NS0zLjkyMiA0LjQzOC03LjYzMyA0LjkzOC0uMDgzLjIzLS4yMTQuNDM5LS4zOC42MTMuMjYyLjUyMy41NzIuOTE1LjkyNiAxLjE4LjY0OC40ODcgMy4yMDguNjYxIDUuODAxLjQyNGwuMTMyIDEuNDM0Yy0yLjkzMy4yNjgtNS43NzIuMDY1LTYuNzk5LS43MDYtLjU2Mi0uNDIzLTEuMDIzLTEuMDE0LTEuMzktMS43NjhhMS44MDIgMS44MDIgMCAwMS0xLjYxMi0xLjA0OEMxMC42NjMgMjQuMTUgOS4wOCAyMi45MTEgOS4wOCAyMGMwLTQuMSA0Ljc3My03LjkyIDkuODctNy45MnptMCAxLjQ0Yy00LjM2NCAwLTguNDMgMy4yNTUtOC40MyA2LjQ4IDAgMS44ODUuOTQ3IDIuNzM1IDMuMDE3IDIuOTFhMS44MDEgMS44MDEgMCAwMTMuMjY2LS4xM2MzLjEzNy0uNDUzIDUuODYtMS45MyA2LjMxNy0zLjgzLjc2OC0zLjE5OS0uNTEtNS40My00LjE3LTUuNDN6IiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iI0ZGRiIgc3Ryb2tlLXdpZHRoPSIxLjgiLz48cGF0aCBkPSJNMTUuOTUgMjMuNmMzLS4yMzcgNy4xODgtMS42NDEgNy44Ny00LjQ4Mi42ODMtMi44NC0uMDYyLTYuMzE4LTQuODctNi4zMThTOS44IDE2LjQgOS44IDIwczMuMTUgMy44MzcgNi4xNSAzLjZ6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS40NCIgc3Ryb2tlLWRhc2hhcnJheT0iMS44LDAuOSIvPjxwYXRoIGQ9Ik0xNS4yIDIzLjIxM2MuMzYzIDEuNjI0Ljk2MyAyLjc1IDEuOCAzLjM4LjgzNy42MyAyLjkzNy44MTggNi4zLjU2NSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuNDQiIHN0cm9rZS1kYXNoYXJyYXk9IjEuOCwwLjkiLz48cGF0aCBkPSJNMTUuMiAyNS40YTEuOCAxLjggMCAxMDAtMy42IDEuOCAxLjggMCAwMDAgMy42eiIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0xMC4wOTYgMTEuMTNsLTMuNzA1IDMuMjg2LTEuMjU3LTExLjg4IDkuNjYgNy4wMjgtNC42OTggMS41Njd6IiBmaWxsPSIjMDAwIiBzdHJva2U9IiNGRkYiLz48L2c+PC9zdmc+) 4 4,auto', 'pointer']
                return this.downSpace ? 'move' : a[this.typeIdx];
            },
            initBl(){
               return this.oriImgObg ? `${Math.round(this.pxWidth/this.oriImgObg.width*100)}%` : '0';
            }
        },
        watch: {
            // typeIdx:{
            //     handler(n,o){
            //         if(n)this.activeTop=document.querySelector('.s_left .active').offsetTop;
            //         else this.activeTop=0;
            //     },
            //     immediate:true
            // }
        },
        methods: {
            ...mapActions( [
                'userGetscribe'
            ] ),
            initImgData() {
                const info = JSON.parse( window.localStorage.getItem( 'repairInfo' ) )
                this.imageInfo = info.img;
                this.imgName = info.name;
                this.oriImgurl = info.img;
                this.historyList = [this.imageInfo];
                this.initCans( info.img )
            },
            changeType(idx) {
                if ([0, 2].includes( idx )) this.showPaint = true;
                if (idx === this.typeIdx) return;
                this.hideCanTxt.fillStyle = '#000';
                this.hideCanTxt.fillRect( 0, 0, this.hideCan.width, this.hideCan.height );
                this.upCanTxt.clearRect( 0, 0, this.upCan.width, this.upCan.height );
                this.showBtn = false;
                this.typeIdx = idx;
            },
            reloads() {
                this.$refs.fileInput.click()
            },
            downLoadImg(e, i) {
                this.loading.show = true;
                let fromData = new FormData();
                fromData.set( 'width', this.oriImgObg.width );
                fromData.set( 'height', this.oriImgObg.height );
                fromData.set( 'flag', 1 );
                fromData.set( 'image', this.imageInfo );
                fromData.set( 'name', this.imgName );
                this.hideCan.toBlob( (blob) => {
                    fromData.set( 'mask', blob );
                    redirMatting( fromData ).then( res => {
                        if (!res.code) {
                            let oImg = new Image(), oCan = document.createElement( 'canvas' );
                            const oCanTxt = oCan.getContext( '2d' );
                            oImg.crossOrigin = '';
                            oImg.onload = () => {
                                oCan.width = oImg.width;
                                oCan.height = oImg.height;
                                oCanTxt.drawImage( oImg, 0, 0 );
                                if (window.navigator.msSaveOrOpenBlob) {
                                    let imgData = oCan.msToBlob();
                                    let blobObj = new Blob( [imgData] );
                                    window.navigator.msSaveOrOpenBlob( blobObj, this.imgName + ".png" );
                                } else {
                                    let oA = document.createElement( 'a' );
                                    oA.href = oCan.toDataURL();
                                    oA.download = `${this.imgName}.png`;
                                    oA.click();
                                }
                            };
                            oImg.src = res.data + `?str=${Math.random()}`
                        }
                    } ).catch( re => {

                    } ).finally( () => {
                        this.loading.show = false;
                    } )
                }, 'image/jpeg' );
            },
            changeselfImg(e) {
                this.file = e.target.files[0];
                this.imgName = this.file.name;
                this.loading.show = true;
                compressImg(this.file).then(blob=>{
                    let fromData = new FormData();
                    fromData.set( 'file', blob );
                    //监听文件读取结束后事件
                    uploadossBg( fromData ).then( res => {
                        window.localStorage.setItem( 'repairInfo', JSON.stringify( {
                            img: res.data,
                            name: this.file.name
                        } ) );
                        this.oriImgurl = res.data;
                        this.imageInfo = res.data;
                        this.historyList = [this.imageInfo];
                        this.initCans( res.data );
                    } ).finally( () => {
                        this.loading.show = false;
                    } )
                })
            },
            repairImg(e) {
                this.showBtn = false;
                this.loading.show = true;
                // console.log( this.hideCan.toDataURL() );
                let fromData = new FormData();
                fromData.set( 'width', this.oriImgObg.width );
                fromData.set( 'height', this.oriImgObg.height );
                fromData.set( 'flag', 0 );
                fromData.set( 'image', this.imageInfo );
                fromData.set( 'name', this.imgName );
                // this.can.toBlob( (blob) => {
                //     fromData.set( 'image', blob );
                //     if (fromData.has( 'mask' )) this.upImg( fromData );
                // }, 'image/jpeg' );
                this.hideCan.toBlob( (blob) => {
                    fromData.set( 'mask', blob );
                    this.upImg( fromData );
                }, 'image/jpeg' );
            },
            upImg(fromData) {
                redirMatting( fromData ).then( res => {
                    if (!res.code) {
                        this.fileId = res.data.fileId;
                        const idx = this.historyList.indexOf( this.imageInfo );
                        if (idx !== this.historyList.length - 1) this.historyList.splice( idx + 1, this.historyList.length );
                        this.imageInfo = res.data;
                        this.historyList.push( this.imageInfo );
                        this.redInit();
                        console.log( this.imageInfo )
                    }
                } ).catch( re => {

                } ).finally( () => {
                    this.loading.show = false;
                } )
            },
            redInit() {
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    this.hideCanTxt.fillStyle = '#000';
                    this.hideCanTxt.fillRect( 0, 0, this.hideCan.width, this.hideCan.height );
                    this.upCanTxt.clearRect( 0, 0, this.upCan.width, this.upCan.height );
                    this.canTxt.drawImage( oImg, 0, 0, );
                }
                oImg.src = this.imageInfo + `?str=${Math.random()}`;
            },
            initCans(url) {//初始化画布
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    [this.can.width, this.hideCan.width, this.oriImgObg, this.upCan.width] = [oImg.width, oImg.width, oImg, oImg.width];
                    [this.can.height, this.hideCan.height, this.upCan.height] = [oImg.height, oImg.height, oImg.height];
                    this.hideCanTxt.fillStyle = '#000';
                    this.hideCanTxt.fillRect( 0, 0, oImg.width, oImg.height );
                    this.scale = oImg.width / oImg.height;
                    if (oImg.width >= oImg.height) {
                        this.pxWidth = oImg.width >= this.canvasinitNum ? this.canvasinitNum : oImg.width;
                        this.pxHeight = oImg.width >= this.canvasinitNum ? this.canvasinitNum / this.scale : oImg.height;
                    } else {
                        this.pxHeight = oImg.height >= this.canvasinitNum ? this.canvasinitNum : oImg.height;
                        this.pxWidth = oImg.height >= this.canvasinitNum ? this.canvasinitNum * this.scale : oImg.width;
                    }
                    this.canTxt.drawImage( oImg, 0, 0, );
                    this.$nextTick( () => {
                        this.oCantl = document.getElementsByClassName( `content` )[0].getBoundingClientRect();
                    } )
                }
                oImg.src = url + `?str=${Math.random()}`;
            },
            initBorder(x, y) {//初始化跟随圆
                this.borderXy = {
                    w: this.pxWidth * 4 * this.penSize / this.oriImgObg.width,
                    h: this.pxHeight * 4 * this.penSize / this.oriImgObg.height,
                    x: x - this.pxWidth * 4 * this.penSize / this.oriImgObg.width / 2,
                    y: y - this.pxHeight * 4 * this.penSize / this.oriImgObg.height / 2,
                }
                // console.log(this.borderXy)
            },
            toRepair(cans, downXy, k) {//操作提取
                cans.save();
                cans.beginPath();
                cans.fillStyle = k ? 'rgba(255,255,255,1)' : 'rgba(89, 142, 238, 1)';
                cans.arc( downXy.x, downXy.y, 2 * this.penSize, 0, Math.PI * 2, false );
                cans.clip();
                cans.fillRect( 0, 0, this.oriImgObg.width, this.oriImgObg.height );
                // else cans.clearRect( 0, 0, this.oriImgObg.width, this.oriImgObg.height );
                cans.restore()

            },
            toLineTo(cans, downXy, k, j) {
                if (!k) {
                    cans.beginPath();
                    cans.strokeStyle = j ? 'rgba(255,255,255,1)' : 'rgba(89, 142, 238, 1)';
                    cans.fillStyle = j ? 'rgba(255,255,255,1)' : 'rgba(89, 142, 238, 1)';
                    cans.lineWidth = 2;
                    cans.moveTo( downXy.x, downXy.y );
                    if (!j) cans.setLineDash( [5] );
                } else if (k === 1) {
                    cans.lineTo( downXy.x, downXy.y );
                    cans.stroke();
                } else if (k === 2) {
                    cans.closePath();
                    if (j) cans.fill();
                    else cans.stroke();
                }

            },
            downs(e) {
                if (this.noDown) return;
                this.oCantl = document.getElementsByClassName( `content` )[0].getBoundingClientRect();
                this.downXy = {
                    x: (e.clientX - this.oCantl.left) * this.can.width / this.pxWidth,
                    y: (e.clientY - this.oCantl.top) * this.can.height / this.pxHeight,
                    px: e.clientX - this.oCantl.left, py: e.clientY - this.oCantl.top,
                    cl: this.$refs.canvasM.offsetLeft, ct: this.$refs.canvasM.offsetTop
                }
                if (this.downSpace) {
                    this.isPattern = 4;//移动
                    return
                }
                if (!this.typeIdx || this.typeIdx === 2) this.isPattern = this.typeIdx === 2 ? 3 : 1;//抹擦
                else if (this.typeIdx === 1) this.isPattern = 2;//勾选
                if ([1, 3].includes( this.isPattern )) {
                    this.toRepair( this.upCanTxt, this.downXy );
                    this.toRepair( this.hideCanTxt, this.downXy, 1 );
                } else if (this.isPattern === 2) {
                    this.toLineTo( this.upCanTxt, this.downXy, 0 );
                    this.toLineTo( this.hideCanTxt, this.downXy, 0, 1 );
                }
                // this.toRepair( this.canTxt, this.downXy, 1 )

            },
            moves(e) {
                const moveXy = {
                    x: (e.clientX - this.oCantl.left) * this.can.width / this.pxWidth,
                    y: (e.clientY - this.oCantl.top) * this.can.height / this.pxHeight,
                    px: e.clientX - this.oCantl.left, py: e.clientY - this.oCantl.top
                }
                // this.initBorder( moveXy.px, moveXy.py );
                if (this.isPattern === 1) {
                    // this.toRepair( this.canTxt, moveXy, 1 )
                    this.toRepair( this.upCanTxt, moveXy );
                    this.toRepair( this.hideCanTxt, moveXy, 1 );
                } else if (this.isPattern === 2) {
                    this.toLineTo( this.upCanTxt, moveXy, 1 );
                    this.toLineTo( this.hideCanTxt, moveXy, 1, 1 );
                } /*else if (this.isPattern === 3) {

                } */ else if (this.isPattern === 4) {//content盒子transform了
                    const oDiv = this.$refs.canvasM, oPares = document.getElementsByClassName( 's_right' )[0];
                    let l, t;
                    if (e.clientX - this.downXy.px - this.oCantl.left + this.downXy.cl > (oPares.offsetWidth)) l = oPares.offsetWidth;
                    else if (e.clientX - this.downXy.px - this.oCantl.left + this.downXy.cl < 0) l = 0;
                    else l = e.clientX - this.downXy.px - this.oCantl.left + this.downXy.cl;
                    if (e.clientY - this.downXy.py - this.oCantl.top + this.downXy.ct > (oPares.offsetHeight)) t = oPares.offsetHeight;
                    else if (e.clientY - this.downXy.py - this.oCantl.top + this.downXy.ct < 0) t = 0;
                    else t = e.clientY - this.downXy.py - this.oCantl.top + this.downXy.ct;
                    oDiv.style.left = l + 'px';
                    oDiv.style.top = t + 'px';
                }
                if (this.isPattern !== 4) this.initBorder( moveXy.px, moveXy.py );
            },
            ups(e) {
                if (this.isPattern && this.isPattern !== 4) this.showBtn = true;
                if (this.isPattern === 2) {
                    this.toLineTo( this.upCanTxt, e.clientX - this.oCantl.left, 2 );
                    this.toLineTo( this.hideCanTxt, e.clientY - this.oCantl.top, 2, 1 );
                }
                this.isPattern = 0;
                this.oCantl = document.getElementsByClassName( `content` )[0].getBoundingClientRect();
                this.initBorder( e.clientX - this.oCantl.left, e.clientY - this.oCantl.top );
            },
            wheelFun(e) {//滚轮事件
                this.setScale = parseFloat( (this.pxWidth / this.oriImgObg.width).toFixed( 1 ) ) - 1;
                if (e.deltaY < 0 && this.setScale >= 1) return;
                if (e.deltaY > 0 && this.setScale <= -0.5) return;
                if (e.deltaY < 0) this.setScale = parseFloat( (this.setScale + 0.1).toFixed( 1 ) );//放大
                else this.setScale = parseFloat( (this.setScale - 0.1).toFixed( 1 ) );//放大
                this.pxWidth = parseInt( this.oriImgObg.width * (1 + this.setScale) )
                this.pxHeight = parseInt( this.pxWidth / this.scale );
                this.$nextTick( () => {
                    this.oCantl = document.getElementsByClassName( `content` )[0].getBoundingClientRect();
                    this.initBorder( e.x - this.oCantl.left, e.y - this.oCantl.top )
                } )
            },
            setBack(k) {//前进后退
                const idx = this.historyList.indexOf( this.imageInfo );
                if ((!k && idx < 1) || (k && idx === this.historyList.length - 1)) return;
                const i = k ? idx + 1 : idx - 1;
                this.imageInfo = this.historyList[i];
                this.redInit();
            },
            resets() {
                this.$confirm( `确定重置, 是否继续?`, '提示', {
                    showClose: false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                } ).then( () => {
                    this.canTxt.clearRect( 0, 0, this.can.width, this.can.height );
                    this.hideCanTxt.clearRect( 0, 0, this.can.width, this.can.height );
                    this.upCanTxt.clearRect( 0, 0, this.can.width, this.can.height );
                    this.showBtn = false;
                    this.historyList = [this.oriImgurl];
                    this.imageInfo = this.oriImgurl;
                    this.redInit( this.oriImgurl );
                    // this.canTxt.drawImage( this.oriImgObg, 0, 0, );
                } ).catch( () => {

                } );
            }

        }
    }
</script>

<style scoped lang="scss">
    .repairEdit {
        flex-direction: column;
        height: 100%;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        .section {
            flex: 1;
            line-height: 1;

            .s_left {
                width: 80px;
                background-color: #000;
                color: #B7B7B7;
                text-align: center;
                position: relative;

                & > div {
                    padding: 20px 0;
                    cursor: pointer;

                    i {
                        display: inline-block;
                        font-size: 26px;
                        margin-bottom: 10px;
                    }
                }

                .active {
                    background-color: #2A2F35;
                    color: #fff;
                }

                .paint {
                    z-index: 99;
                    width: 224px;
                    position: absolute;
                    top: 0;
                    right: 0;
                    transform: translateX(100%);
                    padding: 30px 28px 50px;
                    font-size: 14px;
                    background-color: #2A2F35;
                    text-align: left;
                    border-radius: 0 10px 10px 0px;

                    p {
                        margin-bottom: 10px;
                    }

                    .el-slider {
                        margin-right: 14px;
                        width: 190px;
                    }

                    span {
                        font-size: 12px;
                    }
                }
            }

            .s_right {
                flex: 1;
                background-color: #F5F5F5;
                position: relative;
                overflow: hidden;
                aside{
                    position: absolute;
                    top: 0;
                    right: 10px;
                    color: #999;
                    line-height: 40px;
                }
                .content {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    overflow: hidden;

                    canvas {
                        position: absolute;
                        top: 0;
                        left: 0;
                        display: block;
                        width: 100%;
                        height: 100%;
                    }

                    .hideborder {
                        position: absolute;
                    }

                    .Btn {
                        z-index: 66;
                        position: absolute;
                        font-size: 12px;
                        width: 100px;
                        line-height: 36px;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        background-color: rgba(0, 0, 0, .8);
                        color: #fff;
                        border-radius: 18px;
                        text-align: center;
                    }
                }

                .loadingss {
                    flex-direction: column;
                    justify-content: center;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 100px;
                    color: #fff;
                    height: 100px;
                    font-size: 14px;
                    background-color: rgba(0, 0, 0, .8);
                    text-align: center;
                    transform: translate(-50%, -50%);
                    border-radius: 10px;
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
                background-color: rgba(0, 0, 0, .6);
                color: #fff;
                z-index: 111;

                span {
                    margin: 0 25px;
                }
            }
        }
    }

    .edHead {
        padding: 10px 10px 10px 25px;
        background-color: #fff;
        font-size: 14px;
        font-weight: bold;

        .left img {
            width: 108px;
        }

        .left span {
            margin: 0 20px;
        }

        .center {
            font-size: 14px;
            color: #333;

            .el-icon-refresh-right {
                transform: scale(1.1, 1.1);
            }

            span {
                margin: 0 22px;
                cursor: pointer;

                i {
                    margin-right: 8px;
                    font-size: 16px;
                }

                &:nth-child(2) i {
                    display: inline-block;
                    transform: rotateY(180deg);
                }
            }
        }
    }

    .right .el-button {
        padding: 0;
        width: 140px;
        height: 36px;
        line-height: 36px;
        position: relative;
        border-radius: 18px;

        &:hover .downBtn {
            display: block;
        }

        .downBtn {
            overflow: hidden;
            z-index: 99;
            display: none;
            text-align: left;
            padding: 10px 0;
            width: 250px;
            position: absolute;
            right: 0;
            bottom: 0;
            transform: translateY(100%);
            line-height: 30px;
            font-size: 12px;
            background-color: rgba(0, 0, 0, .8);
            border-radius: 5px;

            tr {
                padding: 0 20px;
                display: block;
                width: 100%;

                &:first-child, &:last-child {
                    color: #a1a0a0;
                }

                &:hover {
                    background-color: rgba(255, 255, 255, .2);
                }

                td {
                    display: inline-block;
                    padding: 0;
                    width: 30%;

                    .el-button {
                        width: 100%;
                        background-color: $co;
                        height: 26px;
                        line-height: 26px;
                        padding: 0;
                    }
                }
            }
        }
    }
</style>
