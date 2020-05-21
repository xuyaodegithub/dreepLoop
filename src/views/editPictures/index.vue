<template>
    <div class="editPictures flex">
        <v-header></v-header>
        <div class="e_l">
            <div v-for="(item,idx) in e_btn_list" :key="idx" :class="{active : selectType===idx}"
                 @click="changeSelecType(idx)">
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
                <!--                <div class="ships">-->
                <!--                    温馨小贴士：<br>-->
                <!--                    1、按住空格键可以拖动整个图片改变位置哦！<br>-->
                <!--                    2、背景模式下前景的位置可以通过拖拽改变-->
                <!--                </div>-->
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
                <el-button type="primary" plain style="width: 100%" @click="upLoad(0)">自定义背景</el-button>
                <input type="file" name="file" accept="image/*" :multiple="false" ref="selfImg" @change="changeselfImg"
                       style="display: none;">
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
        <div class="e_r" id="e_r" @click="showDa=false">
            <div class="r_h flex a-i">
                <div class="h_l">
                    <img src="../../assets/image/Revoke.png" alt="" class="cu"
                         :class="{'stops' : (historyList.length<2 || hisIdx===historyList[0].id)}"
                         @click.stop="goback(0)">
                    <img src="../../assets/image/Revoke.png" alt="" class="cu"
                         :class="{'stops' : ( historyList.length<2 || hisIdx===historyList[historyList.length-1].id)}"
                         @click.stop="goback(1)">
                </div>
                <div class="flex c_input">
                    <span>画布尺寸：</span>
                    <div><input type="number" v-model="pxWidth" @input="changeSize(1)"><i>宽(px)</i></div>
                    <div><input type="number" v-model="pxHeight" @input="changeSize(2)"><i>高(px)</i></div>
                </div>
                <div>
                    <el-button type="primary" style="background-color: #fff;color: #e82255;" @click="reloads">{{edrieImgInfo.type===1 ? '重新上传' : '重置'}}
                    </el-button>
                    <el-button type="primary" icon="el-icon-download">下载
                        <table class="downBtn">
                            <tr>
                                <td>尺寸</td>
                                <td>消耗次数</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>{{edrieImgInfo.imageMsg.previewWidth + ' X ' + edrieImgInfo.imageMsg.previewHeight}}
                                </td>
                                <td>0</td>
                                <td>
                                    <el-button type="danger" round size="mini" @click="downLoadImg($event)">下载
                                    </el-button>
                                </td>
                            </tr>
                            <tr v-if="edrieImgInfo.imageMsg.previewWidth!==edrieImgInfo.imageMsg.originalWidth || edrieImgInfo.imageMsg.previewHeight!==edrieImgInfo.imageMsg.originalHeight">
                                <td>{{edrieImgInfo.imageMsg.originalWidth + ' X ' +
                                    edrieImgInfo.imageMsg.originalHeight}}
                                </td>
                                <td>1</td>
                                <td>
                                    <el-button type="danger" round size="mini" @click="downLoadImg($event,1)">下载
                                    </el-button>
                                </td>
                            </tr>
                            <tr>当前可用次数：{{userSubscribeData ? userSubscribeData.freeRemaining +
                                userSubscribeData.monthRemaining : 0}} <a href="userVip.html" class="cu" target="_blank"
                                                                          style="color: #a1a0a0;margin-left: 20px;border-bottom: 1px solid #a1a0a0;">去充值</a>
                            </tr>
                        </table>
                    </el-button>
                </div>
            </div>
            <div class="canvas" ref="canvasM" :style="{width:`${pxWidth}px`,height:`${pxHeight}px`}"
                 @mousedown.stop="down" @click.stop="showDa=true"
                 :class="{active : showBorder,resiaze : (isPattern===5 || downSpace)}">
                <canvas id="b_g">当前游览器不支持此功能，换一个试试吧！</canvas>
                <canvas id="b_p">当前游览器不支持此功能，换一个试试吧！</canvas>
                <div class="img" ref="oIImg" :style="{backgroundImage:`url(${trImg})`}"
                     v-show="isPattern!==3 && noOperation && showDa">
                    <!--                            <img src="../../assets/image/scale.png" alt="" style="border-radius: 0">-->
                </div>
                <div class="dashed" ref="dashed" v-show="isPattern!==3 && ![2,3].includes(choseBack) && showDa"
                     :style="{left:`${Offsetxy.x/cWH.cWidth*pxWidth}px`,top:`${Offsetxy.y/cWH.cHeight*pxHeight}px`,width:`${initwh.w/cWH.cWidth*pxWidth-2}px`,height:`${initwh.h/cWH.cHeight*pxHeight-2}px`,}"></div>
                <div class="borderShow" v-show="showBorder"
                     :style="{width:`${borderXy.w}px`,height:`${borderXy.h}px`,left:`${borderXy.x}px`,top:`${borderXy.y}px`}"></div>
            </div>
            <div class="ships">
                小提示：按住“空格键”拖动鼠标可以移动画板哦
            </div>
            <div class="nowMsg flex a-i">
                <i class="el-icon-minus cu" @click="wheelFun({deltaY:1})"></i>
                <span>{{preimgObj ? Math.round(pxWidth/preimgObj.width*100) : 0}}%</span>
                <i class="el-icon-plus cu" @click="wheelFun({deltaY:-1})"></i>
                <span class="cu" @click="initRest">1:1</span>
                <img src="../../assets/image/preview.png" alt="" class="cu" @click="initRestore">
            </div>
        </div>
        <div class="dialogs" :style="{backgroundImage: `url(${edrieImgInfo.bgImg})`}" v-if="showUpload">
            <div class="sons">
                <div class="title">请输入你需要替换背景的图片</div>
                <div class="flex types">
                    <img src="@/assets/edtwo.png" alt="" @click="upLoad(1)">
                    <img src="@/assets/edone.png" alt="" @click="upLoad(2)">
                </div>
            </div>
            <div class="loadingss" v-if="loading.show">{{loading.text}}</div>
        </div>
        <div class="zheR" v-if="showUpload"></div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import vHeader from '@/components/header'
    import {myBrowser,findLastIdx} from '@/utils'
    import one from '@/assets/image/e_o.png'
    import two from '@/assets/image/e_t.png'
    import three from '@/assets/image/e_th.png'
    import four from '@/assets/image/e_f.png'
    import scale from '../../assets/image/scale.png'
    import {mixins} from '@/minxins'
    import opacity from '@/assets/opacity.jpg'
    import JSManipulate from '@/utils/jsmanipulate.js'
    import {uploadImgApi, getMattingInfo, downloadMattedImage} from '@/apis'
    import {mapGetters, mapActions} from 'vuex'
    import {getToken} from "@/utils/auth";

    export default {
        name: 'editPictures',
        mixins: [mixins],
        data() {
            return {
                showDa: true,//canvas聚焦
                showBorder: false,//显示鼠标圆圈
                trImg: scale,
                opas: opacity,
                opacity: '',
                e_btn_list: [
                    {url: one, title: '擦除'},
                    {url: two, title: '背景'},
                    // {url: three, title: '文字'},
                    // {url: four, title: '形状'},
                ],
                selectType: 1,
                isPattern: 0,//0无模式，1擦除模式，2还原模式，3移动模式，4放大缩小模式，5 canvas移动模式
                isClear: true,
                penSize: 10,
                choseBack: 0,
                showcolorList: false,
                bgBtn: ['摄影', '手绘', '颜色',],
                bgType: 0,
                selectIdx: -1,
                cWH: {cWidth: 0, cHeight: 0},//实际内容区
                pxWidth: 500,//css canvas宽
                pxHeight: 500,//css canvas高
                canvasinitNum: 500,//初始化基数
                cans: '',//前canvas
                cansTxt: '',//前canvas
                bgCans: '',//后canvas
                bgCansTxt: '',//后canvas
                proCans: '',//隐藏的预览图canvas
                proCansTxt: '',//隐藏的预览图canvas
                Original: '',//原图片链接
                OriginalObj: '',//原图片对象
                imgUrl: '',//图片链接
                preimgObj: '',//预览图加载后对象
                secondobj: '',//涂抹后储存的图片对象
                scale: '',//图片比例系数
                Offsetxy: {x: 0, y: 0, cL: 0, cT: 0},//图片偏移量坐标和canvas定位偏移量
                downxy: {x: 0, y: 0, pxx: 0, pxy: 0},//鼠标按下画布中坐标和在桌面上的css鼠标坐标
                initwh: {w: 0, h: 0},//内容图片大小
                selfImg: '',//自定义背景对象
                bgobj: '',//选中的背景对象
                colorValue: '',//纯色背景
                setScale: 0,//整体放大系数
                oCantl: '',//
                borderXy: {x: 0, y: 0, w: 0, h: 0},//跟随鼠标圆的位置
                historyList: [],
                historyListopa: [],//隐藏canvas记录
                hisIdx: 0,
                downType: 0,//下载时的状态 0 初始状态 1 四种背景状态 2 背景图片状态
                filename: 'picture',
                downSpace: false,
                edrieImgInfo: {imageMsg: {}},//本页面操作图片的信息
                showUpload: true,
                upType: 0,//上传图片的类型 0 背景  1人抠图 2物抠图
                loading: {show: false, text: '处理中...'},
                savepointList: [],//擦除还原点储存
                // savepoint: null,//放大缩小点储存
                loadingInstance: null
            }
        },
        components: {
            vHeader
        },
        computed: {
            ...mapGetters( ['userSubscribeData'] ),
            ossId() {
                return this.$route.query.ossId
            },
            noOperation() {//特效时不能操作图片
                if (!this.selectType) return false;
                else if (this.selectType === 1 && this.choseBack === 2) return false;
                else if (this.selectType === 1 && this.choseBack === 3) return false;
                else return true;
            },
            savepoint() {//找到储存点save前面最后一个type为3||4
                let arr = JSON.parse(JSON.stringify(this.savepointList));
                const idx = arr.findIndex( item => item.save );
                if (idx > -1) arr.splice( idx, arr.length);
                const ix = arr.reverse().findIndex( item => [3, 4].includes( item.type ) )
                if (ix > -1) return arr[ix];
                else return null;
            },
            pointLists() {
                const idx = this.savepointList.findIndex( item => item.save );
                if (idx > -1)return this.savepointList.filter((item,ix)=>([1,2].includes(item.type) && ix<idx))
                else return this.savepointList.filter((item,ix)=>([1,2].includes(item.type)))
             },
        },
        watch: {
            // Offsetxy:{
            //     handler(newVal,oldVal){
            //         this.oriCansTxt.clearRect(0,0,this.oriCans.width,this.oriCans.height)
            //         this.oriCansTxt.drawImage(this.OriginalObj,this.Offsetxy.x,this.Offsetxy.y,this.initwh.w,this.initwh.h)
            //     },
            //     // immediate: true,
            //     deep:true
            // },
        },
        methods: {
            ...mapActions( [
                'userGetscribe'
            ] ),
            upLoad(k) {
                this.upType = k;
                this.$refs.selfImg.click()
            },
            changeselfImg(e) {
                const file = e.target.files[0]
                if (!this.upType) this.initSelfImg( file )
                else this.upimgsLoad( file )
            },
            upimgsLoad(file) {
                console.log( file )
                if (!file) return;
                this.loading.show = true;
                this.edrieImgInfo.filename = file.name;
                let param = new FormData();
                param.append( 'file', file, file.name )
                param.set( 'mattingType', this.upType )
                uploadImgApi( param ).then( res => {
                    if (!res.code) {
                        this.edrieImgInfo.fileId = res.data.fileId;
                        if (res.data.status == 'success') {
                            this.edrieImgInfo.pro = res.data.bgRemovedPreview;
                            this.edrieImgInfo.ori = res.data.original;
                            this.edrieImgInfo.imageMsg = res.data;
                            this.initImgs( this.edrieImgInfo );
                            this.showUpload = false;
                            this.loading.show = false;
                        } else setTimeout( this.pollingImg, 2000 )
                    }
                } ).catch( re => this.loading.show = false )
            },
            pollingImg() {//轮询
                getMattingInfo( {fileId: this.edrieImgInfo.fileId} ).then( res => {
                    if (!res.code) {
                        if (res.data.status === 'success') {
                            this.edrieImgInfo.pro = res.data.bgRemovedPreview;
                            this.edrieImgInfo.ori = res.data.original;
                            this.edrieImgInfo.imageMsg = res.data;
                            this.initImgs( this.edrieImgInfo );
                            this.showUpload = false;
                            this.loading.show = false;
                        } else {
                            this.loading.text = `当前排队位置为 ${res.data.queueNumber}，请稍后...`
                            setTimeout( this.pollingImg, 2000 )
                        }
                    }
                } ).catch( re => this.loading.show = false )
            },
            initSelfImg(file) {//自定义背景
                let reader = new FileReader();
                reader.readAsDataURL( file );
                //监听文件读取结束后事件
                reader.onloadend = (ev) => {
                    let imgs = new Image()
                    imgs.crossOrigin = ''
                    imgs.onload = () => {
                        this.selfImg = imgs
                        this.drawImgAfterFirst( this.secondobj, imgs, 1 );
                        this.bgobj = ''
                        this.downType = 2
                    }
                    imgs.src = ev.target.result
                }
            },
            goback(k) {
                if (this.historyList.length < 2) return;
                const idx = this.historyList.findIndex( item => item.id === this.hisIdx );
                if ((!k && idx - 1 < 0) || (k && idx + 1 > (this.historyList.length - 1))) return;
                const nexidx = k ? idx + 1 : idx - 1;
                this.Offsetxy.x = this.historyList[nexidx].x;
                this.Offsetxy.y = this.historyList[nexidx].y;
                this.initwh.w = this.historyList[nexidx].w;
                this.initwh.h = this.historyList[nexidx].h;
                this.cansTxt.putImageData( this.historyList[nexidx].obj, 0, 0 );
                this.proCansTxt.putImageData( this.historyListopa[nexidx].obj, 0, 0 );
                this.initborder();
                this.hisIdx = this.historyList[nexidx].id;
                const url = this.proCans.toDataURL();
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    this.secondobj = oImg
                };
                oImg.src = url
                let ix=this.savepointList.findIndex(item=>item.save),j;
                if(!k){
                    j=findLastIdx(this.savepointList,ix>-1 ? ix : this.savepointList.length,(item,i)=>item.node);
                    // console.log(j,'++')
                    this.savepointList[j].save=1
                }else {
                    if(ix>-1)this.savepointList[ix].save=0;
                }
                // console.log(ix,this.savepointList.length,this.savepointList.filter(item=>item.save).length)
            },
            initMove(x, y) {//擦除还原模式下canvas拖拽
                if (x < this.Offsetxy.x || x > (this.Offsetxy.x + this.initwh.w) || y < this.Offsetxy.y || y > (this.Offsetxy.y + this.initwh.h)) return true;
                else return false;
            },
            toRepair(x, y) {//还原提取
                this.cansTxt.save()
                this.cansTxt.beginPath()
                this.cansTxt.arc( x, y, 2 * this.penSize, 0, Math.PI * 2, false );
                this.cansTxt.clip();
                this.cansTxt.drawImage( this.OriginalObj, this.Offsetxy.x, this.Offsetxy.y, this.initwh.w, this.initwh.h )
                this.cansTxt.restore()
                //
                this.proCansTxt.save()
                this.proCansTxt.beginPath()
                this.proCansTxt.arc( (x - this.Offsetxy.x) / this.initwh.w * this.cWH.cWidth, (y - this.Offsetxy.y) / this.initwh.h * this.cWH.cHeight, 2 * this.penSize / this.initwh.w * this.cWH.cWidth, 0, Math.PI * 2, false );
                this.proCansTxt.clip();
                this.proCansTxt.drawImage( this.OriginalObj, 0, 0, this.proCans.width, this.proCans.height )
                this.proCansTxt.restore()
            },
            toclear(x, y) {//擦除功能提取
                this.cansTxt.save();
                this.cansTxt.beginPath();
                this.cansTxt.arc( x, y, 2 * this.penSize, 0, Math.PI * 2, false );
                this.cansTxt.clip();
                this.cansTxt.clearRect( 0, 0, this.cans.width, this.cans.height );
                this.cansTxt.restore();
                //
                this.proCansTxt.save();
                this.proCansTxt.beginPath();
                this.proCansTxt.arc( (x - this.Offsetxy.x) / this.initwh.w * this.cWH.cWidth, (y - this.Offsetxy.y) / this.initwh.h * this.cWH.cHeight, 2 * this.penSize / this.initwh.w * this.cWH.cWidth, 0, Math.PI * 2, false );
                this.proCansTxt.clip();
                this.proCansTxt.clearRect( 0, 0, this.proCans.width, this.proCans.height );
                this.proCansTxt.restore();
            },
            initborderXy(x, y) {//计算跟随圆的位置
                this.borderXy.w = this.pxWidth * 4 * this.penSize / this.cWH.cWidth;
                this.borderXy.h = this.pxHeight * 4 * this.penSize / this.cWH.cHeight;
                this.borderXy.x = x - this.borderXy.w / 2;
                this.borderXy.y = y - this.borderXy.h / 2;
            },
            pointList(point, k) {//储存点提取，为了下载原图准备
                const data = {
                    x: point.x * this.OriginalObj.width / this.preimgObj.width,
                    y: point.y * this.OriginalObj.height / this.preimgObj.height,
                    offsetx: this.Offsetxy.x * this.OriginalObj.width / this.preimgObj.width,
                    offsety: this.Offsetxy.y * this.OriginalObj.height / this.preimgObj.height,
                    initw: this.initwh.w * this.OriginalObj.width / this.preimgObj.width,
                    inith: this.initwh.h * this.OriginalObj.height / this.preimgObj.height,
                    type: this.isPattern,
                    r: this.penSize * this.OriginalObj.width / this.preimgObj.width,
                    save: 0,
                    node: k ? 1 : 0
                }
                if ([1, 2, 3, 4].includes( this.isPattern )) {
                    const idx = this.savepointList.findIndex( item => item.save );
                    if (idx > -1) this.savepointList.splice( idx, this.savepointList.length );
                    this.savepointList.push( data )
                }
                // else if ([3, 4].includes( this.isPattern )) {
                //     this.savepoint = data
                // }
            },
            down(e) {//鼠标按下
                const ev = e || window.event;
                this.oCantl = document.getElementById( `b_g` ).getBoundingClientRect()
                this.downxy.x = (ev.clientX - this.oCantl.left) * this.cWH.cWidth / this.pxWidth
                this.downxy.y = (ev.clientY - this.oCantl.top) * this.cWH.cHeight / this.pxHeight//每次鼠标按下的位置
                this.downxy.pxx = ev.clientX - this.oCantl.left//每次鼠标按下的位置
                this.downxy.pxy = ev.clientY - this.oCantl.top//每次鼠标按下的位置
                this.Offsetxy.cL = this.$refs.canvasM.offsetLeft;
                this.Offsetxy.cT = this.$refs.canvasM.offsetTop;
                const bigit = !this.initMove( this.downxy.x, this.downxy.y ),//this.cansTxt.isPointInPath( this.downxy.x, this.downxy.y ),
                    smallit = this.initfour( ev.clientX - this.oCantl.left, ev.clientY - this.oCantl.top );
                if (this.downSpace) this.isPattern = 5;
                else if (!this.selectType && this.isClear && !this.initMove( this.downxy.x, this.downxy.y )) this.isPattern = 1;
                else if (!this.selectType && !this.isClear && !this.initMove( this.downxy.x, this.downxy.y )) this.isPattern = 2;
                else if (!smallit && bigit && this.noOperation) this.isPattern = 3;
                else if (smallit && this.noOperation) this.isPattern = 4;
                else this.isPattern = 5;
                // if ([1, 2].includes( this.isPattern )) this.initborderXy( this.downxy.pxx, this.downxy.pxy );
                if (this.isPattern !== 5) {
                    const idx = this.historyList.findIndex( item => item.id === this.hisIdx )
                    if (this.hisIdx !== this.historyList[this.historyList.length - 1].id) {
                        this.historyList.splice( idx + 1, this.historyList.length - 2 - idx );
                        this.historyListopa.splice( idx + 1, this.historyListopa.length - 2 - idx );
                    } else {
                        this.historyList.splice( this.historyList.length - 1, 0, {
                            obj: this.cansTxt.getImageData( 0, 0, this.cWH.cWidth, this.cWH.cHeight ),
                            x: this.Offsetxy.x, y: this.Offsetxy.y, w: this.initwh.w, h: this.initwh.h,
                            id: this.historyList.length > 1 ? this.historyList[this.historyList.length - 2].id + 1 : 1
                        } )
                        this.historyListopa.splice( this.historyListopa.length - 1, 0, {
                            obj: this.proCansTxt.getImageData( 0, 0, this.proCans.width, this.proCans.height ),
                            id: this.historyListopa.length > 1 ? this.historyListopa[this.historyListopa.length - 2].id + 1 : 1
                        } )
                    }
                }
                this.isPattern === 1 ? this.toclear( this.downxy.x, this.downxy.y ) : this.isPattern === 2 ? this.toRepair( this.downxy.x, this.downxy.y ) : '';
                this.pointList( this.downxy, 1 )
            },
            ups(e) {//鼠标弹起
                const ev = e || window.event;
                const upxy = {
                    x: (ev.clientX - this.oCantl.left) * this.cWH.cWidth / this.pxWidth,
                    y: (ev.clientY - this.oCantl.top) * this.cWH.cHeight / this.pxHeight
                }
                if (this.isPattern === 3) {
                    let initw, inith
                    if ((this.Offsetxy.x + upxy.x - this.downxy.x) > (this.cWH.cWidth - this.initwh.w / 2)) initw = this.cWH.cWidth - this.initwh.w / 2;
                    else if ((this.Offsetxy.x + upxy.x - this.downxy.x) < -(this.initwh.w / 2)) initw = -(this.initwh.w / 2);
                    else initw = this.Offsetxy.x + upxy.x - this.downxy.x;
                    if ((this.Offsetxy.y + upxy.y - this.downxy.y) > (this.cWH.cHeight - this.initwh.h / 2)) inith = this.cWH.cHeight - this.initwh.h / 2;
                    else if ((this.Offsetxy.y + upxy.y - this.downxy.y) < -(this.initwh.h / 2)) inith = -this.initwh.h / 2;
                    else inith = this.Offsetxy.y + (upxy.y - this.downxy.y);
                    this.Offsetxy.x = initw;
                    this.Offsetxy.y = inith;
                    this.initborder( 0, 0 )
                } else if (this.isPattern === 4) {
                    const [w, h] = this.initsetwh( upxy );
                    this.Offsetxy.y = this.Offsetxy.y - h + this.initwh.h
                    this.initwh.w = w;
                    this.initwh.h = h;
                }
                if ([1, 2, 3, 4].includes( this.isPattern )) {
                    this.hisIdx = 0
                    this.historyList[this.historyList.length - 1] = {
                        obj: this.cansTxt.getImageData( 0, 0, this.cWH.cWidth, this.cWH.cHeight ),
                        x: this.Offsetxy.x,
                        y: this.Offsetxy.y,
                        w: this.initwh.w,
                        h: this.initwh.h,
                        id: 0
                    }
                    this.historyListopa[this.historyListopa.length - 1] = {
                        obj: this.proCansTxt.getImageData( 0, 0, this.proCans.width, this.proCans.height ),
                        id: 0
                    }
                }
                this.pointList( upxy );
                this.isPattern = 0;
                this.$nextTick( () => {
                    this.oCantl = document.getElementById( `b_g` ).getBoundingClientRect()
                    this.initborderXy( e.clientX - this.oCantl.left, e.clientY - this.oCantl.top )
                } )
            },
            moves(e) {//鼠标移动
                const ev = e || window.event;
                const movexy = {
                    x: (ev.clientX - this.oCantl.left) * this.cWH.cWidth / this.pxWidth,
                    y: (ev.clientY - this.oCantl.top) * this.cWH.cHeight / this.pxHeight
                }
                if (this.isPattern === 1) {
                    console.log( 111 )
                    this.toclear( movexy.x, movexy.y );
                } else if (this.isPattern === 2) this.toRepair( movexy.x, movexy.y );
                else if (this.isPattern === 3) {//移动时开关
                    const x = movexy.x - this.downxy.x, y = movexy.y - this.downxy.y;
                    this.dropMove( x, y )
                } else if (this.isPattern === 4) {//放大缩小时开关
                    let afterw, zoom = movexy.x - this.downxy.x > 0;
                    if (zoom) {
                        afterw = this.initwh.w + (movexy.x - this.downxy.x)//变化后宽度
                    } else afterw = this.initwh.w - Math.abs( movexy.x - this.downxy.x )//变化后宽度
                    const [w, h] = [afterw, afterw * this.initwh.h / this.initwh.w]//缩放后宽//缩放后高
                    this.cansTxt.clearRect( 0, 0, this.cWH.cWidth, this.cWH.cHeight )
                    this.cansTxt.drawImage( this.secondobj, this.Offsetxy.x, this.Offsetxy.y - h + this.initwh.h, w, h )
                    this.initborder( 0, -(h - this.initwh.h), w, h )
                } else if (this.isPattern === 5) {//canvas移动cl为can的offsetleft px为每次鼠标按下的位置
                    const oCanvas = this.$refs.canvasM, oPares = document.getElementById( 'e_r' );
                    let cl, ct;
                    if ((this.Offsetxy.cL + ev.clientX - this.oCantl.left - this.downxy.pxx) > (oPares.offsetWidth)) cl = oPares.offsetWidth;
                    else if ((this.Offsetxy.cL + ev.clientX - this.oCantl.left - this.downxy.pxx) < 0) cl = 0;
                    else cl = this.Offsetxy.cL + (ev.clientX - this.oCantl.left - this.downxy.pxx);
                    if ((this.Offsetxy.cT + ev.clientY - this.oCantl.top - this.downxy.pxy) > (oPares.offsetHeight)) ct = oPares.offsetHeight;
                    else if ((this.Offsetxy.cT + ev.clientY - this.oCantl.top - this.downxy.pxy) < 0) ct = 0;
                    else ct = this.Offsetxy.cT + (ev.clientY - this.oCantl.top - this.downxy.pxy);
                    oCanvas.style.left = cl + 'px'
                    oCanvas.style.top = ct + 'px'
                }
                if (!this.selectType && !this.initMove( movexy.x, movexy.y ) && this.isPattern !== 5) {
                    this.initborderXy( ev.clientX - this.oCantl.left, ev.clientY - this.oCantl.top )
                    this.showBorder = true;
                } else this.showBorder = false;
                this.pointList( movexy )
            },
            dropMove(x, y) {//移动提取
                let initw, inith
                this.cansTxt.clearRect( 0, 0, this.cWH.cWidth, this.cWH.cHeight )
                if ((this.Offsetxy.x + x) > (this.cWH.cWidth - this.initwh.w / 2)) initw = this.cWH.cWidth - this.initwh.w / 2;
                else if ((this.Offsetxy.x + x) < -(this.initwh.w / 2)) initw = -(this.initwh.w / 2);
                else initw = this.Offsetxy.x + x;
                if ((this.Offsetxy.y + y) > (this.cWH.cHeight - this.initwh.h / 2)) inith = this.cWH.cHeight - this.initwh.h / 2;
                else if ((this.Offsetxy.y + y) < -(this.initwh.h / 2)) inith = -this.initwh.h / 2;
                else inith = this.Offsetxy.y + y;
                this.cansTxt.drawImage( this.secondobj, initw, inith, this.initwh.w, this.initwh.h )
            },
            initsetwh(movexy) {//缩放后重置dx,dy,initw.inith
                let afterw, zoom = movexy.x - this.downxy.x > 0;
                if (zoom) afterw = this.initwh.w + movexy.x - this.downxy.x//变化后宽度
                else afterw = this.initwh.w - Math.abs( movexy.x - this.downxy.x )//变化后宽度
                const [w, h] = [afterw, afterw * this.initwh.h / this.initwh.w]//缩放后宽//缩放后高
                return [w, h]

            },
            initfour(x, y) {//计算鼠标是否再四个角范围内
                const alldian = [[(this.Offsetxy.x + this.initwh.w) * this.pxWidth / this.cWH.cWidth - 26, this.Offsetxy.y * this.pxHeight / this.cWH.cHeight], [(this.Offsetxy.x + this.initwh.w) * this.pxWidth / this.cWH.cWidth, this.Offsetxy.y * this.pxHeight / this.cWH.cHeight + 26]];
                let result = false;
                for (let k in alldian) {
                    if (x >= alldian[0][0] && x <= alldian[1][0] && y >= alldian[0][1] && y <= alldian[1][1]) {
                        result = true
                        break
                    }
                }
                return result
            },
            changeClear(k) {//切换擦除还原
                this.isClear = k === 1 ? true : false;
            },
            choseBackColor(color, index) {//纯色背景切换
                if (index !== 1) {
                    this.choseBack = index
                    this.downType = 1
                }
                this.bgobj = '';
                if (index !== 1) this.showcolorList = false;
                if (index === 0) {
                    this.drawImgAfterFirst( this.secondobj, this.opacity, 1 )
                } else if (index === 2) this.drawStyleBg( this.OriginalObj, this.secondobj, 1 );
                else if (index === 3) this.drawStyleBg( this.OriginalObj, this.secondobj, 2 );
                else {
                    this.showcolorList = !this.showcolorList
                }
            },
            choseColor(color) {//选择颜色背景，颜色选择器
                this.choseBack = 1
                this.colorValue = color
                this.downType = 1
                this.drawImgAfterFirst( this.secondobj, color, 2 );
            },
            changeSelecType(idx) {
                if (this.selectType === idx || !this.edrieImgInfo.pro) return;
                this.selectType = idx;
                const url = this.proCans.toDataURL()
                let oImg = new Image()
                oImg.crossOrigin = ''
                oImg.onload = () => {
                    this.secondobj = oImg
                }
                oImg.src = url
                if (idx) {
                    this.initborder()
                } else {
                    this.cansTxt.clearRect( 0, 0, this.cans.width, this.cans.height );
                    this.cansTxt.drawImage( this.secondobj, this.Offsetxy.x, this.Offsetxy.y, this.initwh.w, this.initwh.h );
                }
                // this.initborder()
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
                this.choseBack = 0;
                this.downType = 2;
                let bgimg = new Image();
                bgimg.crossOrigin = '';
                bgimg.onload = () => {
                    this.bgobj = bgimg;
                    this.drawImgAfterFirst( this.secondobj, bgimg, 1 );
                }
                bgimg.src = z ? this.bgList[item][idx] : item;
            },
            initCans(data) {//初始化画布
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    this.cans.width = oImg.width
                    this.cans.height = oImg.height
                    this.bgCans.width = oImg.width
                    this.bgCans.height = oImg.height
                    this.proCans.width = oImg.width
                    this.proCans.height = oImg.height
                    this.preimgObj = oImg;
                    this.secondobj = oImg;
                    this.scale = oImg.width / oImg.height
                    this.cWH.cWidth = oImg.width
                    this.cWH.cHeight = oImg.height
                    this.initwh = {w: oImg.width, h: oImg.height}
                    if (oImg.width >= oImg.height) {
                        this.pxWidth = oImg.width >= this.canvasinitNum ? this.canvasinitNum : oImg.width;
                        this.pxHeight = oImg.width >= this.canvasinitNum ? this.canvasinitNum / this.scale : oImg.height;
                    } else {
                        this.pxHeight = oImg.height >= this.canvasinitNum ? this.canvasinitNum : oImg.height;
                        this.pxWidth = oImg.height >= this.canvasinitNum ? this.canvasinitNum * this.scale : oImg.width;
                    }
                    this.cansTxt.drawImage( oImg, this.Offsetxy.x, this.Offsetxy.y, this.initwh.w, this.initwh.h )
                    this.proCansTxt.drawImage( oImg, 0, 0, this.proCans.width, this.proCans.height )
                    if (this.edrieImgInfo.bgImg) this.initBgInfo();
                    else this.initBgimg( this.opacity, this.bgCans, this.bgCansTxt )
                    this.historyList.push( {
                        obj: this.cansTxt.getImageData( this.Offsetxy.x, this.Offsetxy.y, this.initwh.w, this.initwh.h ),
                        x: this.Offsetxy.x, y: this.Offsetxy.y, w: this.initwh.w, h: this.initwh.h, id: 0
                    } )
                    this.historyListopa.push( {
                        obj: this.proCansTxt.getImageData( 0, 0, this.proCans.width, this.proCans.height ),
                        id: 0
                    } )
                    this.$nextTick( () => {
                        this.oCantl = document.getElementById( `b_g` ).getBoundingClientRect()
                    } )
                }
                oImg.src = this.imgUrl + `?str=${Math.random()}`;
                // oImg.src = 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/matting2/2019/12/11/71a5d7d2b3334c9c841e89e888f359b0.png';
            },
            initBgimg(bg_img, cans, ctx) {//生成背景通用方法
                ctx.clearRect( 0, 0, cans.width, cans.height );
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
                this.initborder()
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
            downLoadImg(e, k) {
                this.loadingInstance = this.$loading( {
                    lock: true,
                    text: '处理中，请稍后......',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                } );
                if (k) {
                    downloadMattedImage( {fileId: this.edrieImgInfo.fileId} ).then( res => {
                        if (!res.code) {
                            this.initSmallTag( e, '次数 -1' );
                            let oImg = new Image(), c = document.createElement( 'canvas' ),
                                cc = document.createElement( 'canvas' );
                            const ct = c.getContext( '2d' ), cct = cc.getContext( '2d' );
                            oImg.crossOrigin = '';
                            oImg.onload = () => {
                                c.width = oImg.width;
                                cc.width = oImg.width;
                                c.height = oImg.height;
                                cc.height = oImg.height;
                                ct.drawImage( oImg, 0, 0 );
                                this.pointLists.map( item => {//擦除还原只操作在原图上，放大缩小偏移  只需记住最后一次操作就好
                                        ct.save();
                                        ct.beginPath();
                                        ct.arc( (item.x - item.offsetx) * oImg.width / item.initw, (item.y - item.offsety) * oImg.height / item.inith, 2 * (item.r * oImg.width / item.initw), 0, Math.PI * 2, false );
                                        ct.clip();
                                        if (item.type === 1) ct.clearRect( 0, 0, c.width, c.height );
                                        else ct.drawImage( this.OriginalObj, 0, 0, oImg.width, oImg.height );
                                        ct.restore();
                                } )
                                if (this.savepoint) {
                                    cct.clearRect( 0, 0, c.width, c.height );
                                    cct.putImageData( ct.getImageData( 0, 0, c.width, c.height ), 0, 0 );
                                    ct.clearRect( 0, 0, c.width, c.height );
                                    ct.drawImage( cc, this.savepoint.offsetx, this.savepoint.offsety, this.savepoint.initw, this.savepoint.inith );
                                }
                                const url = c.toDataURL();
                                if (!this.downType || (this.downType === 1 && [0, 2, 3].includes( this.choseBack ))) this.downLoad( url );
                                else if (this.downType === 1 && this.choseBack === 1) this.downLoad( url, this.colorValue );
                                else this.selfImg ? this.downLoad( url, '', this.selfImg ) : this.downLoad( url, '', this.bgobj );
                            }
                            oImg.src = res.data
                        }
                    } )
                    return
                }
                const url = this.cans.toDataURL();
                if (!this.downType || (this.downType === 1 && [0, 2, 3].includes( this.choseBack ))) this.downLoad( url );
                else if (this.downType === 1 && this.choseBack === 1) this.downLoad( url, this.colorValue );
                else this.selfImg ? this.downLoad( url, '', this.selfImg ) : this.downLoad( url, '', this.bgobj );
            },
            downLoad(url, color, bg) {
                let cans = document.createElement( 'canvas' );
                let ctxs = cans.getContext( '2d' );
                let oImg = new Image();
                oImg.crossOrigin = "";
                oImg.onload = () => {
                    cans.width = oImg.width;
                    cans.height = oImg.height;
                    if (color) {
                        ctxs.fillStyle = color
                        ctxs.fillRect( 0, 0, cans.width, cans.height )
                    }
                    if (bg) this.initBgimg( bg, cans, ctxs )
                    ctxs.drawImage( oImg, 0, 0, cans.width, cans.height );
                    if (myBrowser() === 'IE' || myBrowser() === 'Edge') {//ie下载图片
                        let url = cans.msToBlob();
                        let blobObj = new Blob( [url] );
                        window.navigator.msSaveOrOpenBlob( blobObj, this.filename.substring( 0, this.filename.lastIndexOf( '.' ) ) + ".png" );
                        this.loadingInstance.close()
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
                        save_link.download = this.filename.substring( 0, this.filename.lastIndexOf( '.' ) ) + ".png";
                        let event = document.createEvent( 'MouseEvents' );
                        event.initMouseEvent( 'click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null );
                        save_link.dispatchEvent( event );
                        this.loadingInstance.close()
                    }
                }
                oImg.src = url
            },
            initImgs(data) {
                console.log( data );
                this.Original = data.ori;
                this.imgUrl = data.pro;
                this.filename = data.filename;
                let orige = new Image();
                orige.crossOrigin = '';
                orige.onload = () => {
                    this.OriginalObj = orige;
                    this.initCans( data );
                }
                orige.src = this.Original + `?str=${Math.random()}`
            },
            initBgInfo() {//初始化时背景初始化
                this.downType = 2;
                let bgimg = new Image();
                bgimg.crossOrigin = '';
                bgimg.onload = () => {
                    this.bgobj = bgimg;
                    this.initBgimg( this.bgobj, this.bgCans, this.bgCansTxt );
                }
                bgimg.src = this.edrieImgInfo.bgImg + `?str=${Math.random()}`;
            },
            changeSize(k) {//+-号
                if (k === 1) {
                    this.pxWidth = this.pxWidth >= this.cans.width ? this.cans.width : this.pxWidth;
                    this.pxHeight = this.pxWidth / this.scale;
                } else {
                    this.pxHeight = this.pxHeight >= this.cans.height ? this.cans.height : this.pxHeight;
                    this.pxWidth = this.pxHeight * this.scale;
                }
                if (this.noOperation) this.initborder()
            },
            wheelFun(e) {//滚轮事件
                this.setScale = parseFloat( (this.pxWidth / this.preimgObj.width).toFixed( 1 ) ) - 1
                if (e.deltaY < 0 && this.setScale >= 1) return;
                if (e.deltaY > 0 && this.setScale <= -0.5) return;
                if (e.deltaY < 0) this.setScale = parseFloat( (this.setScale + 0.1).toFixed( 1 ) );//放大
                else this.setScale = parseFloat( (this.setScale - 0.1).toFixed( 1 ) );//放大
                this.pxWidth = parseInt( this.preimgObj.width * (1 + this.setScale) )
                this.pxHeight = parseInt( this.pxWidth / this.scale )
                if (this.noOperation) this.initborder()
                this.$nextTick( () => {
                    this.oCantl = document.getElementById( `b_g` ).getBoundingClientRect()
                    this.initborderXy( e.clientX - this.oCantl.left, e.clientY - this.oCantl.top )
                } )
            },
            initRestore() {//重置按钮
                const oImg = this.preimgObj
                if (oImg.width >= oImg.height) {
                    this.pxWidth = oImg.width >= this.canvasinitNum ? this.canvasinitNum : oImg.width;
                    this.pxHeight = oImg.width >= this.canvasinitNum ? this.canvasinitNum / this.scale : oImg.height;
                } else {
                    this.pxHeight = oImg.height >= this.canvasinitNum ? this.canvasinitNum : oImg.height;
                    this.pxWidth = oImg.height >= this.canvasinitNum ? this.canvasinitNum * this.scale : oImg.width;
                }
                if (this.noOperation) this.initborder()
                this.$nextTick( () => {
                    this.oCantl = document.getElementById( `b_g` ).getBoundingClientRect()
                } )
            },
            initRest() {
                this.pxWidth = this.preimgObj.width;
                this.pxHeight = this.preimgObj.height;
                if (this.noOperation) this.initborder()
                this.$nextTick( () => {
                    this.oCantl = document.getElementById( `b_g` ).getBoundingClientRect()
                } )
            },
            initborder(x = 0, y = 0, w, h) {//周边虚线和四个角
                const [tw, th] = [w ? w : this.initwh.w, h ? h : this.initwh.h]
                this.$refs.oIImg.style.left = (this.Offsetxy.x + tw + x) * this.pxWidth / this.cWH.cWidth - 26 + 'px'
                this.$refs.oIImg.style.top = (this.Offsetxy.y + y) * this.pxHeight / this.cWH.cHeight + 'px'
                this.$refs.dashed.style.left = (this.Offsetxy.x + x) / this.cWH.cWidth * this.pxWidth + 'px'
                this.$refs.dashed.style.top = (this.Offsetxy.y + y) / this.cWH.cHeight * this.pxHeight + 'px'
                this.$refs.dashed.style.width = tw / this.cWH.cWidth * this.pxWidth - 2 + 'px'
                this.$refs.dashed.style.height = th / this.cWH.cHeight * this.pxHeight - 2 + 'px'
            },
            initAllInfo() {//初始化时操作拖信息
                this.edrieImgInfo = JSON.parse( localStorage.getItem( 'editImg' ) )
                if (this.edrieImgInfo.bgImg) this.showUpload = true;
                else {
                    this.showUpload = false;
                    this.initImgs( this.edrieImgInfo )
                }
                this.edrieImgInfo['type']=this.showUpload ? 1 : 2;//1代表背景过来的，2代表抠图后过来的
            },
            reloads() {//重新上传
                this.$confirm(`确定要${this.edrieImgInfo.type===1 ? '重新上传' : '重置'}, 是否继续?`, '提示', {
                    showClose:false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.location.reload()
                }).catch(() => {

                });
            }
        },
        created() {
            let oBg = new Image();
            oBg.crossOrigin = '';
            oBg.onload = () => {
                this.opacity = oBg
            }
            oBg.src = this.opas
        },
        mounted() {
            this.cans = document.getElementById( 'b_p' );
            this.bgCans = document.getElementById( 'b_g' );
            this.cansTxt = this.cans.getContext( '2d' );
            this.bgCansTxt = this.bgCans.getContext( '2d' );
            this.proCans = document.createElement( 'canvas' );
            this.proCansTxt = this.proCans.getContext( '2d' );
            this.initAllInfo()
            if (getToken()) this.userGetscribe();
            // this.oCantl = document.getElementById( `b_g` ).getBoundingClientRect()
            document.getElementById( 'e_r' ).addEventListener( 'wheel', this.wheelFun )
            document.addEventListener( 'mousemove', this.moves )
            document.addEventListener( 'mouseup', this.ups, true )
            document.addEventListener( 'click', () => {
                this.showcolorList = false
            } )
            document.addEventListener( 'keydown', (e) => {
                const keynum = window.event ? e.keyCode : e.which;
                // console.log(keynum)
                if (keynum === 32) this.downSpace = true;
            } )
            document.addEventListener( 'keyup', (e) => {
                this.downSpace = false;
                // const  keynum = window.event ? e.keyCode : e.which;
                // if(keynum===32)this.downSpace=true;
            } )
        }
    }
</script>
<style scoped lang="scss">
    .editPictures {
        height: 100%;
        overflow: hidden;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently*/
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
                    box-shadow: 0 0 2px #444;
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

                & > .el-button:hover {
                    background: #fde9ee;
                    border-color: #f6a7bb;
                    color: $co;
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
                z-index: 110;

                img {
                    width: 20px;

                    &:last-child {
                        margin-left: 30px;
                        transform: rotateY(180deg);
                    }

                    &.stops {
                        opacity: .4;
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
                    height: 36px;
                    position: relative;
                    border-radius: 18px;

                    &:hover .downBtn {
                        display: block;
                    }

                    .downBtn {
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
                                }
                            }
                        }
                    }
                }
            }

            .ships {
                position: absolute;
                left: 50%;
                bottom: 12%;
                transform: translateX(-50%);
                color: $co;
                font-size: 12px;
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
                overflow: hidden;
                z-index: 99;

                &.active {
                    cursor: none;
                }

                &.resiaze {
                    cursor: all-scroll;
                }

                .img {
                    position: absolute;
                    z-index: 33;
                    background-color: #fff;
                    background-position: center;
                    background-repeat: no-repeat;
                    right: 0;
                    top: 0;
                    width: 26px;
                    height: 26px;

                    &:hover {
                        cursor: nesw-resize;
                    }
                }

                canvas {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

                .borderShow {
                    border: 1px solid $co;
                    border-radius: 50%;
                    position: absolute;
                    box-shadow: 0 0 10px $co inset;
                }

                .dashed {
                    position: absolute;
                    border: 1px solid #999;
                }
            }
        }
    }

    .editPictures {

        .dialogs {
            padding-top: 0;
            z-index: 1111;
            width: 500px;
            margin-left: 178px;
            background-color: initial;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-size: cover;
            background-position: center;

            .sons {
                padding-top: 65px;
                background-color: rgba(0, 0, 0, .4);
                padding-bottom: 120px;
            }

            .title {
                text-align: center;
                color: #fff;
                font-size: 24px;
                line-height: 1;
                font-weight: 600;
                margin: 60px 0 80px;
            }

            .types {
                justify-content: center;
                align-items: center;

                img {
                    display: block;
                    width: 120px;
                    margin: 0 30px;
                    cursor: pointer;
                }
            }

            .loadingss {
                position: absolute;
                top: 50%;
                left: 50%;
                padding: 8px 15px;
                font-size: 14px;
                line-height: 24px;
                background-color: rgba(255, 255, 255, .6);
                text-align: center;
                max-width: 70%;
                transform: translate(-50%, -50%);
                border-radius: 10px;
                margin-top: -40px;
            }
        }
    }
    .zheR {
        z-index: 888;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, .1);
    }
    @media screen and (max-width: 1500px){
        .editPictures .e_r .ships{
            bottom: 15%;
        }
        .editPictures .dialogs{
            max-width: 380px;
            .sons{
                padding: 50px 0;
                .title{
                    margin: 40px 0;
                    font-size: 18px;
                }
            }
            .types img{
                width: 80px;
            }
        }

    }
</style>
