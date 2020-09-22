<template>
    <div class="editPictures flex">
        <input type="file" name="file" accept="image/*" :multiple="false" ref="tihuan" @change="changetihuan"
               style="display: none;">
        <header class="header flex j-b a-i">
            <a href="index.html"><img src="@/assets/image/sureLogo.png" alt=""></a>
            <div class="h_l flex">
                <div @click.stop="goback(0)" :class="{'stops' : hisIdx<1}"
                     class="cu">
                    <img src="../../assets/image/Revoke.png" alt="">
                    <span>上一步</span>
                </div>
                <div @click.stop="goback(1)"
                     :class="{'stops' : !(hisIdx<SubsDataList.length-1)}"
                     class="cu">
                    <img src="../../assets/image/Revoke.png" alt="" class="last">
                    <span>下一步</span>
                </div>
                <div @click.stop="reloads" class="cu" style="margin-left: 30px">
                    <i class="el-icon-refresh-right"
                       style="font-size: 18px;display: inline-block;vertical-align: text-top;"></i>
                    <span> <!--{{edrieImgInfo.type===1 ? '重新上传' : '重置'}}-->重置</span>
                </div>
            </div>
            <div class="hDown">
                <el-button class="up" @click="reupload" style="margin-right: 10px">重新上传
                </el-button>
<!--                <el-popover-->
<!--                        @show="setIndex"-->
<!--                        popper-class="hDown2"-->
<!--                        placement="bottom"-->
<!--                        trigger="click">-->
<!--                    <div class="saveJpg">-->
<!--                        <h3>选择下载类型</h3>-->
<!--                        <strong @click="downLoadImg($event,0)">PNG格式<br>高保真，适合打印 </strong>-->
<!--                        <strong @click="downLoadImg($event,1)">JPG格式<br>文件小，适合上传 </strong>-->
<!--                    </div>-->
                    <el-button class="doo" type="primary" icon="el-icon-download" slot="reference" @click="downLoadImg($event,0)">下载
                        <table class="downBtn" @click.stop="">
                            <tr>{{(userSubscribeData.monthExpireDate && userSubscribeData.monthExpireDate>noeTime &&
                                userSubscribeData.monthRemaining>0) ? `包月剩余次数:${userSubscribeData.monthRemaining}` :
                                `永久剩余次数:${userSubscribeData.freeRemaining >0 ? userSubscribeData.freeRemaining : 0 }`}}
                                <a
                                        href="userVip.html" class="cu" target="_blank"
                                        style="color: #a1a0a0;margin-left: 20px;border-bottom: 1px solid #a1a0a0;">去充值</a>
                            </tr>
                        </table>
                    </el-button>
<!--                </el-popover>-->
            </div>
        </header>
        <div class="e_c flex">
            <label>颜色背景</label>
            <div class="flex smallBtn f-w">
                <div v-for="(items,idx) in initcolorList" :key="idx"
                     @click.stop="selectColor(items,idx)"
                     class="cu" :class="{'bordershow' : idx===colorType}"
                     :style="{backgroundColor: `${idx>1 ? items : 'initial'}`}">
                    <div class="flex color_List" v-if="showcolorList && !idx">
                            <span v-for="(color,idxs) in colorList" :key="idxs" :style="{backgroundColor:color}"
                                  @click.stop="choseColor(color)"></span>
                    </div>
                    <img :src="items" alt="" v-if="idx<2"/>
                </div>
            </div>
            <label>形象照模板</label>
            <div class="fource">
                <el-scrollbar style="overflow-x: hidden;" :style="{height:`100%`,overflowY: 'auto'}"
                >
                    <div class="iconList flex contents f-w j-b">
                        <div class="cu" v-for="(item,idx) in effectList" :key="idx" @click="loadThis(item,idx)">
                            <div class="its" :style="item | itemBack">
                                <img :src="item.imgurl"
                                     alt="">
                                <img class="upimgsb" v-if="item.type===2 && item.imgSrc.split(',').length>1" :src="item.imgSrc.split(',')[1]" alt="">
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </div>
        <div class="e_r" id="e_r" @mouseup="blurAll">
            <div class="subs opas"
                 :style="{width:`${parseSubs.bW}px`,height:`${parseSubs.bH}px`,opacity:'.4',overflow:'initial'}">
                <div class="items upss" :class="{'hovers' : item.hovering}" v-for="(item,idx) in parseSubs.subList"
                     :style="item | subsStyle"
                     @mousedown.stop="moveBack($event,idx)" @click.stop="hoverThis(idx)" @mouseenter="borderFun(idx)"
                     @mouseleave="borderFun(idx,1)">
                </div>
<!--                <div class="items" :class="{'hovers' : backSub.hovering}" :style="backSub | subsStyle"-->
<!--                     v-if=" !backSub.backColor && backSub.idx>-1 && backSub.useImg"-->
<!--                     @mouseenter="borderFun(backSub.idx)" @mouseleave="borderFun(backSub.idx,1)"-->
<!--                     @click.stop="hoverThis(backSub.idx)"-->
<!--                     @mousedown.stop="moveBack($event,backSub.idx)">-->
<!--                    <img :src="backSub.useImg" alt="">-->
<!--                </div>-->
            </div>
            <!--            ,margin:`${-parseSubs.bH/2}px 0 0 ${-parseSubs.bW/2}px`-->
            <div class="subs otherSubs"
                 v-if="parseSubs.bW>0 && parseSubs.bH>0"
                 :style="{width:`${parseSubs.bW}px`,height:`${parseSubs.bH}px`,...colorOrbImg}">
                <div class="items upss" :class="{'hovers' : item.hovering,'teimgs' : item.type===3}" v-for="(item,idx) in parseSubs.subList"
                     :style="item | subsStyle"
                     @mousedown.stop="moveBack($event,idx)" @click.stop="hoverThis(idx)" @mouseenter="borderFun(idx)"
                     @mouseleave="borderFun(idx,1)">
<!--                    <el-tooltip class="item" effect="dark" content="双击修改文字" placement="top"-->
<!--                                :disabled="moveNum>0 || hoverSub.contenteditable">-->
<!--                        <div v-if="item.type===2" :contenteditable="item.contenteditable" class="text"-->
<!--                             :class="{texsst : item.contenteditable}"-->
<!--                             style="font-weight:inherit;border: 0;width:auto;height: auto;"-->
<!--                             @dblclick="writeText(idx)"-->
<!--                             @input="setBlur($event,idx)"-->
<!--                             @blur="setBlur($event,idx,1)"-->
<!--                             v-html="item.title">-->
<!--                            &lt;!&ndash;                            <div>{{}}</div>&ndash;&gt;-->
<!--                        </div>-->
<!--                    </el-tooltip>-->
                    <el-tooltip class="item" effect="dark" content="双击替换图片" placement="top"
                                :disabled="moveNum>0">
                        <div v-if="[1].includes(item.type)" class="Imgs" @dblclick="writeText(idx)" :style="miansubStyle">
                            <img :src="item.useImg" alt="">
                        </div>
                    </el-tooltip>
                    <div v-if="[3].includes(item.type)" class="Imgs">
                        <img :src="item.useImg" alt="">
                    </div>
                </div>
<!--                             @mouseenter="borderFun(idx)" @mouseleave="borderFun(idx,1)"-->
                <!--                @mousedown.stop="moveBack($event,backSub.idx)"@click.stop="hoverThis(backSub.idx)"-->
                <div class="items initBack" :class="{'hovers' : backSub.hovering}" :style="backSub | subsStyle"
                      v-if="backSub.idx>-1 && !backSub.backColor ">
                    <img :src="backSub.useImg" alt=""/>
                </div>
            </div>
            <!--            操作框，放大缩小，-->
            <div class="fivePoint"
                 @mousedown.stop="moveBack($event,hoverSub.idx)"
                 @click.stop="hoverThis(hoverSub.idx)"
                 v-if="hoverSub.type===1"
                 :style="{left:`${mainx.x+hoverSub.x}px`,top:`${mainx.y+hoverSub.y}px`,width:`${parseInt(hoverSub.w)-4}px`,height:`${parseInt(hoverSub.h)-4}px`,transform:`rotateZ(${hoverSub.rotate}deg)`,backgroundColor:fivePoint? 'rgba(250,250,250,.7)' : 'initial'}">
                <div>
                    <el-tooltip effect="dark" content="旋转" placement="top" :enterable="false" :disabled="moveNum>0">
                        <span class="el-icon-refresh downIcon" style="z-index: 666;color: #333;"></span>
                    </el-tooltip>
                    <el-tooltip effect="dark" :content="it===9? '删除' : (it===10? '上一层' : '下一层')" placement="top"
                                v-for="it in 8" :key="'a'+it"
                                :disabled="it<9" :enterable="false">
                        <i class="teI icon iconfont"
                           @click.stop="setOImg(it)"
                           :class="['iOne','iTwo','iTh','iFor','iFive','iSix','iSeven','iEight','icon-shanchu','icon-dashujukeshihuaico-1','icon-dashujukeshihuaico-'][it-1]"
                           style="z-index: 666"
                           v-show="!(([1,3].includes(it) && hoverSub.type===2 && !hoverSub.flexDirection) || ([2,4].includes(it) && hoverSub.type===2 && hoverSub.flexDirection) || ([7,8].includes(it) && !hoverSub.type))"
                           :style="pointcursor(it)"></i>
                    </el-tooltip>
                </div>
            </div>
            <!--            //框框-->
            <div v-show="enterIdx>-1 && enterIdx!==hoverSub.idx" class="borderK"
                 :style="{left:`${mainx.x+enterSub.x}px`,top:`${mainx.y+enterSub.y}px`,width:`${parseInt(enterSub.w)-2}px`,height:`${parseInt(enterSub.h)-2}px`,transform:`rotateZ(${enterSub.rotate}deg)`}"></div>
            <div class="nowMsg flex a-i">
                <i class="el-icon-minus cu" @click="wheelFun(0)"></i>
                <span>{{parseInt(parseSubs.scale*100)}}%</span>
                <i class="el-icon-plus cu" @click="wheelFun(1)"></i>
                <!--                <span class="cu" @click="initRest">1:1</span>-->
                <!--                <img src="../../assets/image/preview.png" alt="" class="cu" @click="initRestore">-->
            </div>
            <div class="loadingss" v-if="loading.show">
                <i class="el-icon-loading" style="display: block;font-size: 24px;margin:0 auto 6px;"></i>
                {{loading.text}}
            </div>
        </div>
        <div class="e_rLast">
            <v-mune ref="Munes" @mattingImgs="repireImg"
                    @effectsImg="effectsImg" @loading="loadings" @hoverMain="hoverMain" :edrieImgInfo="edrieImgInfo"></v-mune>
            <!--            <h4>修复</h4>-->
            <!--            <el-button plain @click="repireImg">手工修补</el-button>-->
        </div>
        <div class="zheR" v-if="loading.show"></div>
        <!--        <div class="zheR" v-if="loading.show"></div>-->
        <el-dialog
                :close-on-click-modal="false"
                title="修复"
                top="0vh"
                :width=" openScreen ? '95%' : '1200px'"
                :visible.sync="dialogVisible">
            <matting-img :edrieImgInfo="hoverSub" @close="closeSetMap" v-if="dialogVisible" :openScreen="openScreen"
                         @changeScree="openScreen=!openScreen" :hisList="pointLists"></matting-img>
        </el-dialog>
        <el-dialog
                :close-on-click-modal="false"
                destroy-on-close
                custom-class="loginDialog"
                top="10vh"
                width="420px"
                :before-close="showLoginDilogAction"
                :visible.sync="showLoginDilog">
            <login-dialog v-if="showLoginDilog"></login-dialog>
        </el-dialog>
    </div>
</template>

<script>
    // @ is an alias to /src
    import vMune from '@/components/editMune/imagePhotoSub.vue';
    import loginDialog from '@/components/login_dialog/index2';
    import mattingImg from '@/components/mattingImg';
    import { getTanDeg, initSmallTag,setRad} from '@/utils';
    import {mixins} from '@/minxins';
    import opacity from '@/assets/opacity.jpg'
    import fupa from '@/assets/image/fopa.png';
    import color from '@/assets/image/color.png';
    import {niceScroll} from 'jquery.nicescroll';
    import jsMulit from '@/utils/jsmanipulate.js';
    import {getUserInfo, saveTemplate} from "@/apis";
    import {
        uploadImgApi,
        getMattingInfo,
        downloadMattedImage,
        templatedownload,
        copyUpload,
        uploadossBg,
        templateDetial,
        templateCategoryList
    } from '@/apis';
    import {mapGetters, mapActions} from 'vuex';
    import {getToken} from "@/utils/auth";
    import { effectList } from './specialEffectsList'
    import * as StackBlur from 'stackblur-canvas';
    export default {
        name: 'editPictures',
        mixins: [mixins],
        data() {
            return {
                hisLoadList:[],
                loadIdx:-1,
                effectList,
                loadSubing: 0,
                initcolorList: [color, fupa, '#000', '#fff', '#BFBFBF', '#2862F4', '#FED835', '#28F5B4', '#F62897', '#F57B28', '#00FFFF', '#90C320'],
                showcolorList: false,//是否显示颜色选择的弹框
                colorType: 1,
                noeTime: new Date().getTime(),
                userInfo: {},
                openclearAll: true,
                loadSubObj: '',
                tzType: 0,
                scale: '',//图片width/height比例系数
                edrieImgInfo: {
                    filename: '形象照',
                    w:900,
                    h:1275,
                    "bgRemovedPreview": "http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200914/92934e3c98614396b1a225bfb1dbf3bc.png",
                    "oripro": "http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200912/1514df7f4b9d49358c2709aab09f0d5d.png",
                    "original": "http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200912/1514df7f4b9d49358c2709aab09f0d5d.png",
                    "mattingType": 9,
                    "originalHeight": "1620",
                    "originalWidth": "1080",
                    "headData": {"bottom": 432.8, "left": 356.2, "mouseY": 371.4, "right": 704, "top": -7.3},
                    "ori": "http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200912/1514df7f4b9d49358c2709aab09f0d5d.png",
                    "pro": "http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200912/1514df7f4b9d49358c2709aab09f0d5d.png",
                    "type": "2",
                    "fileId": "",
                    "backlist": "http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200911/773ffba6c0404d78a61a073e0f899a43.jpg,http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200914/ef961596f4774fad9dbeb2466b32299b.png"
                },//图片的信息（预览图尺寸，原图尺寸，下载按钮处显示的信息）
                upType: 0,//从背景库页面进入本页面时，要显示上传弹框 ，上传图片的类型 0 自定义背景  1人抠图 2物抠图
                loading: {show: false, text: '处理中...', which: 0},//loading
                loadingInstance: null,//下载时的loading效果
                dialogVisible: false,//修复弹框
                openScreen: false,//是否全屏
                oDiv_w: {w: 0, h: 0},
                parseSubs: {
                    bW: 0,
                    bH: 0,
                    scale: 1,
                    oriW: 0,
                    oriH: 0,
                    subList: [{
                        type: 0, useImg: '',
                        pro: '',
                        ori: '',
                    }],
                },
                oriW: 0,
                oriH: 0,
                SubsDataList: [],
                openBack: true,
                hisIdx: -1,//当前处于历史记录的哪个位置的对应记录id（储存记录时会存一个对应id）
                mattingMsg: {id: '', type: ''},//公用
                page: 1,
                enterIdx: -1,
                fivePoint: false,//移动时 透明
                moveNum: 0,
                touchContrl: false,
                pointList: [],//历史记录
                mainOri: '',//主图扣过的原图尺寸
                downType: 0
            }
        },
        watch: {
            subsLength: {
                handler(n, o) {
                    if (this.parseSubs.subList.length > 0 && ![1, 2].includes( this.parseSubs.subList[this.parseSubs.subList.length - 1].type )) this.parseSubs.subList.map( item => item.hovering = false );
                    if (!this.openBack) return;
                    this.initsave();
                },
                // deep:true,
                // immediate:true
            },
            // edrieImgInfo: {
            //     handler(n, o) {
            //         // console.log(n.fileId,o.fileId,n.fileId!==o.fileId)
            //         this.initDiv();
            //     },
            //     deep:true,
            //     // immediate:true
            // }
        },
        components: {vMune, mattingImg, loginDialog},
        computed: {
            ...mapGetters( ['userSubscribeData', 'effectsImgList', 'showLoginDilog'] ),
            subsLength() {
                return this.parseSubs.subList.length;
            },
            hoverSub() {//聚焦组件
                const idx = this.parseSubs.subList.findIndex( item => item.hovering );
                const item = idx > -1 ? this.parseSubs.subList[idx] : {type: ''};
                return {...item, idx: idx}
            },
            enterSub() {//鼠标移入组件
                const item = this.enterIdx > -1 ? this.parseSubs.subList[this.enterIdx] : {};
                return item
            },
            backSub() {//背景组件
                const i = this.parseSubs.subList.findIndex( item => !item.type );
                let item = i > -1 ? JSON.parse( JSON.stringify( this.parseSubs.subList[i] ) ) : {};
                item.proObj = i > -1 ? this.parseSubs.subList[i].proObj : {}
                item.idx = i;
                return item
            },
            mainx() {//内容区的left
                return {x: this.oDiv_w.w / 2 - this.parseSubs.bW / 2, y: this.oDiv_w.h / 2 - this.parseSubs.bH / 2}
            },
            colorOrbImg() {//opacity
                if (this.backSub.backColor) {
                    const a = this.backSub.backColor.split( ',' );
                    return {background: `linear-gradient(${a[0]},${a[1] || a[0]})`}
                } else return {backgroundImage: `url(${opacity})`, backgroundRepeat: 'repeat'};
            },
            urlStr() {
                const url = window.location.href
                return url.split( '?' )[1] ? url.split( '?' )[1].includes( 'admin=1' ) : false;
            },
            pointLists() {//过滤历史记录中当前状态前擦除还原的点，去掉放大缩小移动的点
                const idx = this.pointList.findIndex( item => item.save );
                if (idx > -1) return this.pointList.filter( (item, ix) => ([1, 2].includes( item.type ) && ix < idx) );
                else return this.pointList.filter( (item, ix) => ([1, 2].includes( item.type )) );
            },
            miansubStyle(){
                const oVal=this.$refs.Munes.opacityVal;
                return {opacity:(100-oVal)/100}
            }
        },
        filters: {
            subsStyle(item) {
                let data = {
                    left: item.x === '50%' ? '50%' : item.x + 'px',
                    top: item.y === '50%' ? '50%' : item.y + 'px',
                    transform: `rotateZ(${item.rotate}deg)`,
                    width: item.w + 'px',
                    height: item.h + 'px',
                };
                if (item.type === 2) {
                    data.transform = `rotateZ(${item.rotate}deg) scale(${1 / 6})`;
                    data.width = item.w * 6 + 'px';
                    data.height = item.h * 6 + 'px';
                    data.left = item.x - item.w * 3 + item.w / 2 + 'px';
                    data.top = item.y - item.h * 3 + item.h / 2 + 'px';
                    // if(item.hovering)data.top =-(parseInt( item.y )+parseInt(item.h)) + 'px';
                    data.fontSize = item.fontSize * 6 + 'px';
                    data.fontWeight = item.fontWeight;
                    data.letterSpacing = item.letterSpacing * 6 + 'px';
                    data.lineHeight = item.lineHeight * 6 + 'px';
                    data.color = item.color;
                    data.fontFamily = item.fontFamily;
                    data.backgroundColor = item.backgroundColor;
                    data.fontStyle = item.fontStyle;//是否是斜体
                    data.textDecoration = item.textDecoration;//画线
                    data.textAlign = item.textAlign;//对齐方式
                    // data.padding = '5px';
                    data.textShadow = item.textShadow;//对齐方式
                    if (item.flexDirection) {
                        // writing-mode:horizontal-tb;//默认：水平方向，从上到下
                        data['writing-mode'] = 'vertical-rl';//垂直方向，从右向左
                    }
                }
                return data
            },
            backColor(val) {
                const a = val.split( ',' );
                return {background: `linear-gradient(${a[0]},${a[1] || a[0]})`}
            },
            itemBack(item){
                if(item.type===2)return {backgroundImage:`url(${item.imgSrc.split(',')[0]})`}
                else return {}
            }
        },
        methods: {
            ...mapActions( [
                'userGetscribe', 'showLoginDilogAction'
            ] ),
            loadings(v) {
                this.loading.show = v;
            },
            effectsImg(data) {//添加特效
                let idx = this.parseSubs.subList.findIndex( item => item.hovering ), list = Object.keys( data );
                if (idx > -1) {
                    list.map( item => {
                        this.parseSubs.subList[idx][item] = data[item]
                    } )
                }
                this.$nextTick( () => {
                    this.loading.show = false;
                    this.initsave()
                } )

            },
            repireImg(k) {
                const idx = this.parseSubs.subList.findIndex( item => item.type === 1 )
                if (k === 1) {
                    this.hoverThis( idx );
                    return;
                }
                if (this.hoverSub.idx === -1) this.parseSubs.subList[idx].hovering = true;
                this.$nextTick( _ => {
                    this.dialogVisible = true;
                } )
            },
            selectColor(item, idx) {
                const ix = this.parseSubs.subList.findIndex( it => !it.type );
                this.colorType = idx;
                if (idx > 1) this.parseSubs.subList[ix].backColor = this.initcolorList[this.colorType];
                else if (!idx) this.showcolorList = true;
                else {
                    this.parseSubs.subList[ix].backColor = '';
                    this.parseSubs.subList[ix].useImg = '';
                }
                if(idx) {
                    this.showcolorList = false;
                    this.parseSubs.subList=this.parseSubs.subList.filter(items=>[0,1].includes(items.type))
                }
            },
            choseColor(color) {//选择颜色背景，颜色选择器
                this.colorType = 0;
                const idx = this.parseSubs.subList.findIndex( item => !item.type );
                this.parseSubs.subList[idx].backColor = color;
                this.parseSubs.subList=this.parseSubs.subList.filter(items=>[0,1].includes(items.type));
                this.initsave()
            },
            initsave() {//储存公用方法
                if (this.hisIdx !== this.SubsDataList.length - 1) {
                    this.SubsDataList.splice( this.hisIdx + 1, this.SubsDataList.length )
                }
                let item = JSON.parse( JSON.stringify( this.parseSubs ) );
                item.subList.map( (it, idx) => {
                    if (it.hasOwnProperty( 'proObj' )) it.proObj = this.parseSubs.subList[idx].proObj;
                } )
                this.SubsDataList.push( item );
                this.hisIdx = this.SubsDataList.length - 1;
            },
            pointcursor(ix) {
                let deg = this.hoverSub.rotate, data, a = ['s-resize', 'w-resize', 's-resize', 'w-resize', 'ne-resize'];
                if ([1, 3].includes( ix )) {
                    if (deg >= -30 && deg <= 30) data = {cursor: a[ix - 1]};
                    else if ((deg >= -60 && deg < -30) || (deg >= 30 && deg < 60)) data = {cursor: deg > 0 ? 'ne-resize' : 'se-resize'};
                    else if ((deg >= -120 && deg < -60) || (deg >= 60 && deg < 120)) data = {cursor: 'w-resize'};
                    else if ((deg >= -150 && deg < -120) || (deg >= 120 && deg < 150)) data = {cursor: deg > 0 ? 'se-resize' : 'ne-resize'};
                    else if ((deg >= -180 && deg < -150) || (deg >= 150 && deg < 180)) data = {cursor: a[ix - 1]};
                } else if ([2, 4].includes( ix )) {
                    if (deg >= -30 && deg <= 30) data = {cursor: a[ix - 1]};
                    else if ((deg >= -60 && deg < -30) || (deg >= 30 && deg < 60)) data = {cursor: deg > 0 ? 'se-resize' : 'ne-resize'};
                    else if ((deg >= -120 && deg < -60) || (deg >= 60 && deg < 120)) data = {cursor: 's-resize'};
                    else if ((deg >= -150 && deg < -120) || (deg >= 120 && deg < 150)) data = {cursor: deg > 0 ? 'ne-resize' : 'se-resize'};
                    else if ((deg >= -180 && deg < -150) || (deg >= 150 && deg < 180)) data = {cursor: a[ix - 1]};
                } else if ([5, 7].includes( ix )) {
                    if (deg >= -15 && deg <= 15) data = {cursor: a[ix - 1]};
                    else if ((deg >= -70 && deg < -15) || (deg >= 15 && deg < 75)) data = {cursor: deg > 0 ? 'w-resize' : 's-resize'};
                    else if ((deg >= -100 && deg < -70) || (deg >= 70 && deg < 100)) data = {cursor: 'se-resize'};
                    else if ((deg >= -160 && deg < -100) || (deg >= 100 && deg < 160)) data = {cursor: deg > 0 ? 'w-resize' : 's-resize'};
                    else if ((deg >= -180 && deg < -150) || (deg >= 150 && deg < 180)) data = {cursor: 'ne-resize'};
                } else if ([6, 8].includes( ix )) {
                    if (deg >= -15 && deg <= 15) data = {cursor: 'se-resize'};
                    else if ((deg >= -70 && deg < -15) || (deg >= 15 && deg < 75)) data = {cursor: deg < 0 ? 'w-resize' : 's-resize'};
                    else if ((deg >= -100 && deg < -70) || (deg >= 70 && deg < 100)) data = {cursor: 'ne-resize'};
                    else if ((deg >= -160 && deg < -100) || (deg >= 100 && deg < 160)) data = {cursor: deg < 0 ? 's-resize' : 's-resize'};
                    else if ((deg >= -180 && deg < -150) || (deg >= 150 && deg < 180)) data = {cursor: 'se-resize'};
                }

                return data
            },
            changetihuan(e) {
                let file = e.target.files[0], formData = new FormData(), oImg = new Image();
                if (!file) return;
                this.loading.show = true;
                formData.append( 'file', file );
                uploadossBg( formData ).then( res => {
                    this.parseSubs.subList[this.hoverSub.idx].ori = res.data;
                    this.parseSubs.subList[this.hoverSub.idx].pro = res.data;
                    this.parseSubs.subList[this.hoverSub.idx].proObj = '';
                    this.$refs.tihuan.value = '';
                    if (this.hoverSub.type === 1) {//保存替换主图后的原图对象
                        this.pointList = [];
                        let oImg2 = new Image();
                        oImg2.crossOrigin = '';
                        oImg2.onload = () => {
                            this.edrieImgInfo.oriObj = oImg2;
                            this.edrieImgInfo.ori = res.data;
                        };
                        oImg2.src = addUrlQuery(res.data);
                    }
                    if ([1, 2, 3, 6, 9].includes( this.hoverSub.mattingType )) {
                        this.mattingbyUrl( this.hoverSub.mattingType )//1额外参数表示  替换时传参
                    } else {
                        this.parseSubs.subList[this.hoverSub.idx].useImg = res.data;
                        oImg.crossOrigin = '';
                        oImg.onload = () => {
                            this.parseSubs.subList[this.hoverSub.idx].proObj = oImg;
                            this.parseSubs.subList[this.hoverSub.idx].id = `img${Math.random()}`;
                            this.loading.show = false;
                        };
                        oImg.src = addUrlQuery(res.data) ;
                    }
                } )
            },
            writeText(idx) {
                if (this.parseSubs.subList[idx].type === 2) {
                    this.parseSubs.subList[idx].contenteditable = true;
                    this.$nextTick( () => {
                        let oDiv = document.querySelector( `.otherSubs .items:nth-child(${idx + 1}) .text` );
                        oDiv.focus();
                    } )
                } else if ([1].includes( this.parseSubs.subList[idx].type )) {
                    this.$refs.tihuan.click()
                }

            },
            reupload() {
                const idx = this.parseSubs.subList.findIndex( item => item.type === 1 )
                this.parseSubs.subList.map( item => item.hovering = false )
                this.parseSubs.subList[idx].hovering = true;
                this.pointList = [];
                this.writeText( idx )
            },
            hoverThis(idx) {
                this.parseSubs.subList.map( item => item.hovering = false );
                if (this.parseSubs.subList[idx].type ===1) this.parseSubs.subList[idx].hovering = true;
                if ([0, 1, 3].includes( this.parseSubs.subList[idx].type )) {
                    this.$nextTick( () => {
                        this.$refs.Munes.filterUrl( this.parseSubs.subList[idx] );
                    } )
                }
            },
            hoverMain(){
                this.parseSubs.subList.map( item => item.hovering = false );
                const idx=this.parseSubs.subList.findIndex(item=>item.type===1);
                this.parseSubs.subList[idx].hovering = true;
            },
            blurAll() {
                if (!this.openclearAll) return;
                if (this.hoverSub.idx > -1 && this.hoverSub.type === 2) this.parseSubs.subList[this.hoverSub.idx].contenteditable = false;
                this.parseSubs.subList.map( item => item.hovering = false );
            },
            setBlur(e, idx, l) {
                let oDiv = document.querySelector( `.otherSubs .items:nth-child(${idx + 1}) .text` );
                const [detail, w, h] = [oDiv.innerHTML, oDiv.offsetWidth, oDiv.offsetHeight];
                this.parseSubs.subList[idx].w = w / 6;
                this.parseSubs.subList[idx].h = h / 6;
                if (l) {
                    this.parseSubs.subList[idx].title = detail;
                    this.parseSubs.subList[idx].contenteditable = false;
                }
            },
            upLoad(k) {//上传图片（k值0自定义背景，1人像抠图 2物体抠图）
                this.upType = k;
                this.$refs.selfImg.click()
            },
            pollingImg2() {//轮询
                getMattingInfo( {fileId: this.mattingMsg.id} ).then( res => {//根据id查询
                    if (!res.code) {
                        if (res.data.status === 'success') {
                          this.mattingAfter(res.data,this.mattingMsg.type)
                        } else {
                            this.loading.text = `当前排队位置为 ${res.data.queueNumber}，请稍后...`
                            setTimeout( this.pollingImg2, 2000 )
                        }
                    } else this.loading.show = false;
                } ).catch( re => this.loading.show = false )
            },
            mattingbyUrl(type) {
                if (this.hoverSub.idx < 0) {
                    const ix = this.parseSubs.subList.findIndex( it => it.type === 1 )
                    this.parseSubs.subList[ix].hovering = true;
                }
                this.loading.show = true;
                this.mattingMsg.type = type;
                let obj = {url: this.hoverSub.ori, mattingType: type};
                if (type === 9) obj['bodyData'] = 1;
                copyUpload( obj ).then( res => {
                    if (!res.code) {
                        this.mattingMsg.id = res.data.fileId;
                        if (res.data.status == 'success') {
                            this.mattingAfter(res.data,type)
                            // this.loading.show = false;
                        } else setTimeout( this.pollingImg2, 2000 )//有排队情况，轮训查看（可以websocket）
                    } else this.loading.show = false;
                } ).catch( re => this.loading.show = false )
            },
            mattingAfter(result,type){
                this.parseSubs.subList=this.parseSubs.subList.filter(item=>[0,1].includes(item.type));
                let idx = this.parseSubs.subList.findIndex( item => item.hovering ),oImg=new Image();
                this.parseSubs.subList[idx].mattingType = type;
                this.parseSubs.subList[idx].pro = result.bgRemovedPreview;
                this.parseSubs.subList[idx].useImg = result.bgRemovedPreview;
                if (this.parseSubs.subList[idx].type === 1) {
                    this.parseSubs.subList[idx].fileId = result.fileId;
                    this.edrieImgInfo.fileId = result.fileId;
                    this.edrieImgInfo.pro = result.bgRemovedPreview;
                    this.edrieImgInfo = {...this.edrieImgInfo, ...result};
                    oImg.crossOrigin='';
                    oImg.onload=()=>{

                        const [w, h,mattingMsg] = [parseFloat( this.edrieImgInfo.w ), parseFloat( this.edrieImgInfo.h ),this.edrieImgInfo];
                        let point=mattingMsg.maskRect,ow=mattingMsg.originalWidth,oh=mattingMsg.originalHeight;
                        let downTop=h * 0.08,ih=(h-downTop)*oh/point.height,iw=ow*ih/oh,left=w/2-iw/2;//
                        let afterPoint={x:iw*point.x/ow,y:ih*point.y/oh,w:iw*point.width/ow,h:ih*point.height/oh};
                        downTop=downTop-afterPoint.y;
                        if(afterPoint.w>w){
                            iw=(w*ow/point.width);
                            ih=iw*oh/ow;
                            left=0;
                            downTop=h-ih;
                            afterPoint={x:iw*point.x/ow,y:ih*point.y/oh,w:iw*point.width/ow,h:ih*point.height/oh};
                        }
                        left=w/2-iw/2-(afterPoint.x+afterPoint.w/2-iw/2);
                        this.parseSubs.subList[idx].w = iw * this.parseSubs.scale;
                        this.parseSubs.subList[idx].h = ih * this.parseSubs.scale;
                        this.parseSubs.subList[idx].x = left * this.parseSubs.scale;
                        this.parseSubs.subList[idx].y = downTop * this.parseSubs.scale;
                        this.parseSubs.subList[idx].proObj = oImg;
                        this.loading.show = false;
                        // this.hoverThis(idx);
                        this.mainOri='';
                        this.hisLoadList=[];
                        if(this.loadIdx>-1)this.loadThis(this.effectList[this.loadIdx],this.loadIdx);
                        this.$nextTick(_=>{
                            this.hoverThis(idx);
                        })
                    };
                    oImg.src=addUrlQuery(result.bgRemovedPreview);
                }
            },
            goback(k) {//前进(k=1)   返回(k=0)
                if (this.SubsDataList.length < 2) return;
                if ((!k && this.hisIdx < 1) || (k && this.hisIdx + 1 > (this.SubsDataList.length - 1))) return;
                this.hisIdx = k ? this.hisIdx + 1 : this.hisIdx - 1;
                this.openBack = false;
                const item = JSON.parse( JSON.stringify( this.SubsDataList[this.hisIdx] ) );
                item.subList.map( (it, idx) => {
                    if (it.hasOwnProperty( 'proObj' )) it.proObj = this.SubsDataList[this.hisIdx].subList[idx].proObj;
                } )
                this.parseSubs = item;
                this.parseSubs.subList.map( item => item.hovering = false );
                // this.parseSubs.oriW=this.parseSubs.bW/this.parseSubs.scale;
                // this.pxHeight=this.parseSubs.bH/this.parseSubs.scale;
                this.$nextTick( () => {
                    this.openBack = true;
                } )
            },
            moveBack(ev, idx) {
                this.openclearAll = false;
                const oDivs = document.querySelector( `.otherSubs` ),
                    oright = document.getElementById( 'e_r' ).getBoundingClientRect();
                this.parseSubs.subList.map( item => item.hovering = false );
                if (!(!this.parseSubs.subList[idx].type && this.parseSubs.subList[idx].backColor)) this.parseSubs.subList[idx].hovering = true;
                else return;
                let [x, y] = [ev.clientX - this.parseSubs.subList[idx].x, ev.clientY - this.parseSubs.subList[idx].y];
                let [w, h, top, left, size, lineHeight, letterSpacing] = [this.parseSubs.subList[idx].w, this.parseSubs.subList[idx].h, this.parseSubs.subList[idx].y, this.parseSubs.subList[idx].x, this.parseSubs.subList[idx].type === 2 ? this.parseSubs.subList[idx].fontSize : 0, this.parseSubs.subList[idx].type === 2 ? this.parseSubs.subList[idx].lineHeight : 0, this.parseSubs.subList[idx].type === 2 ? this.parseSubs.subList[idx].letterSpacing : 0];
                let isMove = false,allSubs=JSON.parse(JSON.stringify( this.parseSubs.subList));
                document.onmousemove = (e) => {
                    this.moveNum = 1;
                    isMove = true;
                    const xx = this.parseSubs.subList[idx].x + oDivs.offsetLeft - this.parseSubs.bW / 2 + this.parseSubs.subList[idx].w / 2,//组件中心坐标，因为translate 50% 所有要减去一半
                        yy = this.parseSubs.subList[idx].y + oDivs.offsetTop - this.parseSubs.bH / 2 + this.parseSubs.subList[idx].h / 2;
                    const cn = ev.target.className,
                        mx = Math.sqrt( Math.pow( e.clientX - oright.left - xx, 2 ) + Math.pow( e.clientY - oright.top - yy, 2 ) ),
                        mx2 = Math.sqrt( Math.pow( ev.clientX - oright.left - xx, 2 ) + Math.pow( ev.clientY - oright.top - yy, 2 ) );
                    let [l, t] = [e.clientX - x, e.clientY - y];
                    if (cn.includes( 'downIcon' )) {
                        const dx = e.clientX - oright.left, dy = e.clientY - oright.top;
                        let a = Math.sqrt( Math.pow( dx - xx, 2 ) + Math.pow( dy - yy, 2 ) );
                        let c = Math.sqrt( Math.pow( dx - xx, 2 ) + Math.pow( dy - yy - a, 2 ) ) / 2;
                        let deg = getTanDeg( c / a ), d;
                        if (dx - xx > 0) d = -deg * 2;
                        else d = deg * 2;
                        if (this.parseSubs.subList[idx].type === 3) {
                            this.parseSubs.subList.map( (item, i) => {
                                if (item.type === 3) {
                                    item.rotate = d;
                                }
                            } )
                        } else this.parseSubs.subList[idx].rotate = d;
                    } else if (cn.includes( 'iOne' )) {
                        if (this.parseSubs.subList[idx].type === 3) {
                            this.parseSubs.subList.map( (item, i) => {
                                if (item.type === 3) {
                                    item.h = h - (mx2 - mx);
                                    item.y = top + (mx2 - mx);
                                }
                            } )
                        } else {
                            this.parseSubs.subList[idx].h = h - (mx2 - mx);
                            this.parseSubs.subList[idx].y = top + (mx2 - mx);
                        }
                    } else if (cn.includes( 'iTwo' )) {
                        if (this.parseSubs.subList[idx].type === 3) {
                            this.parseSubs.subList.map( (item, i) => {
                                if (item.type === 3) {
                                    item.w = w - (mx2 - mx);
                                }
                            } )
                        } else this.parseSubs.subList[idx].w = w - (mx2 - mx);
                    } else if (cn.includes( 'iTh' )) {
                        if (this.parseSubs.subList[idx].type === 3) {
                            this.parseSubs.subList.map( (item, i) => {
                                if (item.type === 3) {
                                    item.h = h - (mx2 - mx);
                                }
                            } )
                        } else this.parseSubs.subList[idx].h = h - (mx2 - mx);
                    } else if (cn.includes( 'iFor' )) {
                        if (this.parseSubs.subList[idx].type === 3) {
                            this.parseSubs.subList.map( (item, i) => {
                                if (item.type === 3) {
                                    item.w = w - (mx2 - mx);
                                    item.x = left + (mx2 - mx);
                                }
                            } )
                        } else {
                            this.parseSubs.subList[idx].w = w - (mx2 - mx);
                            this.parseSubs.subList[idx].x = left + (mx2 - mx);
                        }
                    } else if (['iFive', 'iSix', 'iSeven', 'iEight'].some( item => cn.includes( item ) )) {
                        let idxss = ['iFive', 'iSix', 'iSeven', 'iEight'].findIndex( item => cn.includes( item ) ),
                            lx = left, ly = top;
                        if (!idxss) ly = top + (h - (w - (mx2 - mx)) * h / w);
                        if (idxss === 2) lx = left + mx2 - mx;
                        if (idxss === 3) {
                            ly = top + (h - (w - (mx2 - mx)) * h / w);
                            lx = left + mx2 - mx;
                        }
                        if (this.parseSubs.subList[idx].type === 3) {
                            this.parseSubs.subList.map( (item, i) => {
                                if (item.type === 3) {
                                    item.w = w - (mx2 - mx);
                                    item.h = (w - (mx2 - mx)) * h / w;
                                    item.y = ly;
                                    item.x = lx;
                                }
                            } )
                        } else {
                            this.parseSubs.subList[idx].w = w - (mx2 - mx);
                            this.parseSubs.subList[idx].h = (w - (mx2 - mx)) * h / w;
                            this.parseSubs.subList[idx].y = ly;
                            this.parseSubs.subList[idx].x = lx;
                        }
                    } else {
                        if (this.parseSubs.subList[idx].type === 1) {
                            this.parseSubs.subList[idx].x = l;
                            this.parseSubs.subList[idx].y = t;
                            this.parseSubs.subList.map( (item, i) => {
                                if (item.type === 3 && item.canMove) {
                                    item.y = allSubs[i].y + e.clientY - ev.clientY;
                                    item.x = allSubs[i].x + e.clientX - ev.clientX;
                                }
                            } )
                        }
                    }
                    this.fivePoint = true;
                }
                document.onmouseup = (e) => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    if (isMove) this.initsave();
                    this.fivePoint = false;
                    this.$nextTick( () => {
                        this.moveNum = 0;
                        if (this.parseSubs.subList[idx].type === 2) {
                            let oDiv = document.querySelector( `.otherSubs .items:nth-child(${idx + 1}) .text` );
                            if (oDiv) this.setBlur( oDiv, idx )
                        }
                        this.openclearAll = true;
                    } )
                }
            },
            borderFun(idx, k) {
                if (k || this.parseSubs.subList[idx].type!==1) {
                    this.enterIdx = -1;
                    return
                }
                if (!k && idx === this.enterIdx) return;
                if (!this.parseSubs.subList[idx].type && this.parseSubs.subList[idx].backColor) return;
                this.enterIdx = idx;
            },
            setOImg(k) {
                if (k === 9) this.parseSubs.subList.splice( this.hoverSub.idx, 1 );
                if ([10, 11].includes( k )) {
                    this.openBack = false;
                    let list = [];
                    this.parseSubs.subList.map( (item, idx) => {
                        if (!(item.x >= this.hoverSub.x + this.hoverSub.w || item.x + item.w <= this.hoverSub.x || item.y >= this.hoverSub.y + this.hoverSub.h || item.y + item.h <= this.hoverSub.y) && idx !== this.hoverSub.idx && item.type !== 0) {
                            list.push( {...item, idx: idx} );
                        }
                    } );
                    if (list.length < 1) return;
                    if (k === 10 && this.hoverSub.idx > list[list.length - 1].idx) return;
                    if (k === 11 && this.hoverSub.idx < list[0].idx) return;
                    if (k === 10) {
                        const c = list.find( item => item.idx > this.hoverSub.idx );
                        this.parseSubs.subList.splice( c.idx + 1, 0, this.parseSubs.subList[this.hoverSub.idx] );
                        this.parseSubs.subList.splice( this.hoverSub.idx, 1 );
                    } else {
                        const d = list.findIndex( item => item.idx > this.hoverSub.idx ),
                            e = JSON.parse( JSON.stringify( this.hoverSub ) );
                        e.proObj = this.hoverSub.proObj;
                        this.parseSubs.subList.splice( this.hoverSub.idx, 1 );
                        if (d < 0) {
                            this.parseSubs.subList.splice( list[list.length - 1].idx, 0, e );
                        } else {
                            this.parseSubs.subList.splice( list[d - 1].idx, 0, e );
                        }
                    }
                    this.$nextTick( () => {
                        this.openBack = true;
                    } )
                }
            },
            initOriRepir(url, idx) {
                let cans = document.createElement( 'canvas' ), cansTxt, oImg = new Image();
                cansTxt = cans.getContext( '2d' );
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    cans.width = oImg.width;
                    cans.height = oImg.height;
                    cansTxt.drawImage( oImg, 0, 0 );
                    this.pointLists.map( item => {//擦除还原只操作在原图上，放大缩小偏移  只需记住最后一次操作就好
                        cansTxt.save();
                        cansTxt.beginPath();
                        cansTxt.arc( item.x, item.y, 2 * item.r, 0, Math.PI * 2, false );
                        cansTxt.clip();
                        if (item.type === 1) cansTxt.clearRect( 0, 0, oImg.width, oImg.height );
                        else cansTxt.drawImage( this.edrieImgInfo.oriObj, 0, 0, oImg.width, oImg.height );
                        cansTxt.restore();
                    } )
                    // this.parseSubs.subList[idx].useImg = cans.toDataURL( "image/png" );
                    // this.downLoadImg2();
                    this.electtexiao( cans, cansTxt.getImageData( 0, 0, cans.width, cans.height ), idx )
                };
                oImg.src = addUrlQuery(url);
            },
            electtexiao(loadImg, dataImg, idx) {//原图特效处理
                let mainSub = this.parseSubs.subList.find( item => item.type === 1 ),
                    oCan = document.createElement( 'canvas' ), oCan2 = document.createElement( 'canvas' ),
                    oCan3 = document.createElement( 'canvas' ), obj = loadImg;
                let oCanTxt = oCan.getContext( '2d' ), oCanTxt2 = oCan2.getContext( '2d' ),
                    oCanTxt3 = oCan3.getContext( '2d' ), [w, h] = [obj.width, obj.height];
                let texiaoList = ['', '', 'emboss', 'grayscale', 'dither', 'triangleripple', 'blur', 'threshold', 'twirl'],
                    otehC = {
                        blur: {amount: 5.0},
                        threshold: {threshold: 100},
                        twirl: {radius: w, angle: 90, centerX: 0.5, centerY: 0.5}
                    };
                oCan.width = w;
                oCan2.width = w;
                oCan3.width = w;
                oCan.height = h;
                oCan2.height = h;
                oCan3.height = h;
                if (mainSub.t2Idx > 1) {
                    obj = this.jsMulitData( dataImg, texiaoList[mainSub.t2Idx], otehC[texiaoList[mainSub.t2Idx]] || {}, 1 );
                }
                if (mainSub.checked) {
                    oCanTxt.drawImage( obj, 0, 0, w, h );
                    let imgData = oCanTxt.getImageData( 0, 0, w, h );
                    for (let y = 0; y < h; y++) {
                        for (let x = 0; x < w; x++) {
                            let pixel = (y * w + x) * 4;
                            if (imgData.data[pixel + 3] != 0) {
                                imgData.data[pixel] = 0;
                                imgData.data[pixel + 1] = 0;
                                imgData.data[pixel + 2] = 0;
                                imgData.data[pixel + 3] = (1 - mainSub.extend / 100) * imgData.data[pixel + 3];
                            }
                        }
                    }
                    if (mainSub.size > 0) StackBlur.imageDataRGBA( imgData, 0, 0, w, h, parseInt( mainSub.size / this.parseSubs.scale ) );
                    oCanTxt.clearRect( 0, 0, w, h )
                    oCanTxt.putImageData( imgData, 0, 0 )
                    const xy = this.initAngleDistance( mainSub.angle, mainSub.distance )
                    oCanTxt3.drawImage( oCan, xy.x, xy.y )
                }
                if (mainSub.checkedM) {
                    oCanTxt2.drawImage( obj, 0, 0, w, h );
                    console.log(mainSub.mSize,111111)
                    jsMulit['strokeBorder'].filter( oCan2, oCanTxt2.getImageData( 0, 0, w, h ), mainSub.mSize, mainSub.colorVal );
                    oCanTxt3.drawImage( oCan2, 0, 0, w, h )
                }
                oCanTxt3.drawImage( obj, 0, 0, w, h );
                this.parseSubs.subList[idx].useImg = oCan3.toDataURL( "image/png" );
                this.downLoadImg2();
            },
            initAngleDistance(angle, distance) {//更具角度计算位置
                if (angle == 0 || angle == 360) return {x: -distance, y: 0};
                else if (angle > 0 && angle < 90) return {
                    x: -Math.cos( setRad( angle ) ) * distance,
                    y: -Math.sin( setRad( angle ) ) * distance
                };
                else if (angle == 90) return {x: 0, y: -distance};
                else if (angle > 90 && angle < 180) return {
                    x: Math.cos( setRad( 180 - angle ) ) * distance,
                    y: -Math.sin( setRad( 180 - angle ) ) * distance
                };
                else if (angle == 180) return {x: distance, y: 0};
                else if (angle > 180 && angle < 270) return {
                    x: Math.cos( setRad( angle - 180 ) ) * distance,
                    y: Math.sin( setRad( angle - 180 ) ) * distance
                };
                else if (angle == 270) return {x: 0, y: distance};
                else if (angle > 270 && angle < 360) return {
                    x: -Math.cos( setRad( 360 - angle ) ) * distance,
                    y: Math.sin( setRad( 360 - angle ) ) * distance
                };
                // else return{x:-Math.cos(360-angle)*distance,y:Math.sin(360-angle)*distance};
            },
            downLoadImg(e, k) {
                this.downType = k;
                let data = {templateId: 0}, iidx = this.parseSubs.subList.findIndex( item => item.type === 1 );
                if (!this.loadSubObj && this.parseSubs.hasOwnProperty( 'isOwnTwo' )) data.templateId = this.parseSubs.templateId;
                else if (this.loadSubObj) data.templateId = this.loadSubObj.id;
                // templatedownload( data ).then( res => {
                if (!this.mainOri && this.parseSubs.subList[iidx].fileId) {
                    downloadMattedImage( {fileId: this.parseSubs.subList[iidx].fileId} ).then( res => {
                        if (!res.code) {
                            this.hisLoadList.push(this.loadIdx);
                            this.mainOri = res.data;
                            initSmallTag( e, '次数 -1' );
                            this.userGetscribe();
                            this.initOriRepir( res.data, iidx );
                        }
                    } )
                } else if(!this.parseSubs.subList[iidx].fileId){
                    initSmallTag( e, '免费' );
                    this.initOriRepir( this.parseSubs.subList[iidx].pro, iidx );
                }else if(this.hisLoadList.includes(this.loadIdx) ){
                    initSmallTag( e, '免费' );
                    this.initOriRepir( this.mainOri, iidx );
                }else{
                    templatedownload( data ).then( res => {
                        if (!res.code) {
                            initSmallTag( e, '次数 -1' );
                            this.userGetscribe();
                            this.initOriRepir( this.mainOri, iidx );
                            this.hisLoadList.push(this.loadIdx);
                            // this.downLoadImg2();
                        } else if (res.code === 1100) this.dialogVisible2 = true;
                    } )
                }

            },
            downLoadImg2(k) {//操作记录覆盖到原图
                if (!k) this.loadingInstance = this.$loading( {
                    lock: true,
                    text: '处理中，请稍后......',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                } );
                let imgSubs = this.parseSubs.subList.reduce( (pre, item, idx) => {
                        if ([0, 1, 3].includes( item.type ) && !item.backColor && item.useImg) pre.push( {
                            ...item,
                            lastidx: idx
                        } );
                        return pre
                    }, [] ),
                    reg = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i,
                    dOrr = k ? k : '';
                this.parseSubs.subList.map( item => {
                    if ([0, 1, 3].includes( item.type )) item['lastObj'] = '';
                } )
                if (imgSubs.length < 1) {
                    this.initCanImg( dOrr );
                }
                imgSubs.map( item => {
                    let oImg = new Image();
                    oImg.crossOrigin = '';
                    oImg.onload = () => {
                        this.parseSubs.subList[item.lastidx]['lastObj'] = oImg;
                        const next = this.parseSubs.subList.reduce( (pre, item, idx) => {
                            if ([0, 1, 3].includes( item.type ) && !item.backColor && item.useImg) pre.push( {
                                ...item,
                                lastidx: idx
                            } );
                            return pre
                        }, [] )
                        if (next.every( it => it['lastObj'] )) this.initCanImg( dOrr )
                    };
                    oImg.src = reg.test( item.useImg ) ? item.useImg : addUrlQuery(item.useImg);
                } )
            },
            initCanImg(dOrr) {
                let prolist3 = ['x', 'y', 'w', 'h', 'fontSize', 'lineHeight', 'letterSpacing'],
                    oCan = document.createElement( 'canvas' ), oCanTxt, scale;
                oCanTxt = oCan.getContext( '2d' );
                oCan.width = this.parseSubs.oriW;
                oCan.height = this.parseSubs.oriH;
                scale = this.parseSubs.scale;
                this.parseSubs.subList.map( item => {
                    if ([0, 1, 3].includes( item.type ) && !item.backColor && item.useImg) {
                        oCanTxt.shadowColor = '';
                        oCanTxt.shadowBlur = 0;
                        oCanTxt.shadowOffsetY = 0;
                        oCanTxt.shadowOffsetX = 0;
                        oCanTxt.translate( item.x / scale + item.w / scale / 2, item.y / scale + item.h / scale / 2 );
                        oCanTxt.rotate( item.rotate * Math.PI / 180 );
                        oCanTxt.translate( -(item.x / scale + item.w / scale / 2), -(item.y / scale + item.h / scale / 2) );
                        if(item.type===1)oCanTxt.globalAlpha = (100-this.$refs.Munes.opacityVal)/100;
                        oCanTxt.drawImage( item.lastObj, item.x / scale, item.y / scale, item.w / scale, item.h / scale );
                        oCanTxt.globalAlpha =1
                        oCanTxt.setTransform( 1, 0, 0, 1, 0, 0 );
                    } else if (item.type == 0 && item.backColor) {
                        const a = item.backColor.split( ',' );
                        if (a.length > 1) {
                            let gradient = oCanTxt.createLinearGradient( 0, 0, 0, oCan.height );
                            gradient.addColorStop( 0, a[0] );
                            gradient.addColorStop( 1, a[1] );
                            // 设置填充样式为渐变
                            oCanTxt.fillStyle = gradient;
                        } else oCanTxt.fillStyle = item.backColor;
                        oCanTxt.fillRect( 0, 0, oCan.width, oCan.height );
                    }
                } )
                if (!dOrr) this.downLoad( oCan )
            },
            downLoad(cans) {
                const type = this.downType ? 'image/jpeg' : 'image/png';
                if (window.navigator.msSaveOrOpenBlob) {//ie下载图片
                    let url = cans.msToBlob( _ => {
                    }, type );
                    let blobObj = new Blob( [url] );
                    window.navigator.msSaveOrOpenBlob( blobObj, '形象照' + (this.downType ? '.jpg' : '.png') );
                    this.loadingInstance.close()
                } else {
                    let url = cans.toDataURL( type );
                    let arr = url.split( ',' ), mime = arr[0].match( /:(.*?);/ )[1], bstr = atob( arr[1] ),
                        n = bstr.length, u8arr = new Uint8Array( n );
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt( n );
                    }
                    let objurl = URL.createObjectURL( new Blob( [u8arr], {type: mime} ) );
                    let save_link = document.createElement( 'a' );
                    save_link.href = objurl;
                    save_link.download = '形象照';
                    let event = document.createEvent( 'MouseEvents' );
                    event.initMouseEvent( 'click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null );
                    save_link.dispatchEvent( event );
                    this.loadingInstance.close()
                }
            },
            wheelFun(k) {
                let scale = parseFloat( this.parseSubs.scale ), newscale, data,
                    prolist3 = ['x', 'y', 'w', 'h', 'fontSize', 'lineHeight', 'letterSpacing'];
                if (!k && scale - 0.1 <= 0.15) newscale = 0.15;
                else if (k && scale + 0.1 >= 1) newscale = 1;
                else newscale = k ? scale + 0.1 : scale - 0.1;
                this.parseSubs.bW = this.parseSubs.oriW * newscale;
                this.parseSubs.bH = this.parseSubs.oriH * newscale;
                this.parseSubs.scale = newscale;
                this.parseSubs.subList.map( (items, idx) => {
                    Object.keys( items ).map( it => {
                        if (prolist3.includes( it )) this.parseSubs.subList[idx][it] = this.parseSubs.subList[idx][it] / scale * newscale
                    } )
                } )
            },
            initAllInfo(data) {//初始化时操作信息
                let obj = data ? data : JSON.parse( localStorage.getItem( 'imagephotoMsg' ) );
                if (!obj) obj = {};
                this.edrieImgInfo = {...this.edrieImgInfo, ...obj};
                this.loading.show = true;
                this.loading.text = '加载中...';
                this.openBack = false;
                this.parseSubs.subList = [];
                this.loadSubObj = '';
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    const [w, h] = [this.edrieImgInfo.w, this.edrieImgInfo.h];
                    this.edrieImgInfo.oriObj = oImg;
                    // let scaleW = 2 / 9 * h / w;//头部占尺寸的比例
                    // let iw = w * scaleW * this.edrieImgInfo.originalWidth / (this.edrieImgInfo.headData.right - this.edrieImgInfo.headData.left);//缩放后的图片宽
                    // let ih = iw * this.edrieImgInfo.originalHeight / this.edrieImgInfo.originalWidth;
                    // let top = -(ih * this.edrieImgInfo.headData.top / this.edrieImgInfo.originalHeight) + h * 0.05;
                    // let left = w / 2 - ((this.edrieImgInfo.headData.right - this.edrieImgInfo.headData.left) / 2 + this.edrieImgInfo.headData.left) * iw / this.edrieImgInfo.originalWidth;
                    // let downTop = h - top <= ih ? top : h - ih;//吸底判断
                    let mattingMsg=this.edrieImgInfo;
                    let point=mattingMsg.maskRect,ow=mattingMsg.originalWidth,oh=mattingMsg.originalHeight;
                    let downTop=h * 0.08,ih=(h-downTop)*oh/point.height,iw=ow*ih/oh,left=w/2-iw/2;//
                    let afterPoint={x:iw*point.x/ow,y:ih*point.y/oh,w:iw*point.width/ow,h:ih*point.height/oh};
                    downTop=downTop-afterPoint.y;
                    if(afterPoint.w>w){
                        iw=(w*ow/point.width);
                        ih=iw*oh/ow;
                        left=0;
                        downTop=h-ih;
                        afterPoint={x:iw*point.x/ow,y:ih*point.y/oh,w:iw*point.width/ow,h:ih*point.height/oh};
                    }
                    left=w/2-iw/2-(afterPoint.x+afterPoint.w/2-iw/2);
                    let it = {
                        title: '形象照',
                        oriW: w,
                        oriH: h,
                        isOwnTwo: 1,//证件照替换时需要调整x位置
                        id: 'is1',
                        templateId: 1,
                        cover: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200724/aa742c4ea6a045d79d3256e170c48118.png',
                        subList: [{
                            type: 0,
                            backColor: ''
                        }, {
                            "type": 1,
                            "title": "主图",
                            "w": iw,
                            "h": ih,
                            "x": left,
                            "y": downTop,
                            "rotate": 0,
                            "useImg": this.edrieImgInfo.pro,
                            "pro": this.edrieImgInfo.pro,
                            "ori": this.edrieImgInfo.ori,
                            "hovering": false,
                            "mattingType": 9,
                            fileId: this.edrieImgInfo.fileId,
                        }]
                    }
                    this.loadSubs( it );
                };
                oImg.src = addUrlQuery(this.edrieImgInfo.ori);
            },
            reloads(k) {//重新上传
                const msg = k ? '确定要选择此模板替换当前模板, 是否继续?' : '确定要重置, 是否继续?';
                this.$confirm( msg, '提示', {
                    showClose: false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                } ).then( () => {
                    // const item = this.parseSubs.subList.find( item => item.type === 1 );
                    this.loading.show = true;
                    this.openBack = false;
                    this.parseSubs.subList = [];
                    this.hisIdx = -1;
                    this.SubsDataList = [];
                    this.pointList = [];
                    this.initAllInfo();
                    this.$nextTick( () => {
                        this.openBack = true;
                        // this.loading.show=false;
                    } )
                } ).catch( () => {

                } );
            },
            closeSetMap(data) {
                const idx = this.parseSubs.subList.findIndex( item => item.hovering );
                this.parseSubs.subList[idx].useImg = data.img;
                this.parseSubs.subList[idx].pro = data.img;
                this.parseSubs.subList[idx].proObj = null;
                this.dialogVisible = false;
                if (this.parseSubs.subList[idx].type === 1) this.pointList = data.hisList;
                this.publicFun( idx, idx );
                // this.hoverThis( idx )
            },
            publicFun(idx, k) {
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    this.parseSubs.subList[idx].proObj = oImg;
                    this.parseSubs.subList[idx].id = `img${Math.random()}`;
                    this.loading.show = false;
                };
                oImg.src = addUrlQuery(this.parseSubs.subList[idx].useImg);
            },
            initUpImgs(file) {
                let formData = new FormData();
                formData.append( 'file', file );
                uploadossBg( formData ).then( res => {
                    let data = {
                        type: 3,//图片组件
                        title: '图片组件',
                        w: 80,
                        h: 80,
                        x: 0,
                        y: 100,
                        rotate: 0,
                        id: `img${Math.random()}`,
                        useImg: res.data,
                        pro: res.data,
                        ori: res.data,
                        proObj: null,////抠图过加载后的对象
                        hovering: false,
                        // zIndex: this.parseSubs.subList[this.parseSubs.subList.length - 1].zIndex + 1,
                        mattingType: -1,//抠图模式
                    }, oImg = new Image();
                    oImg.crossOrigin = '';
                    oImg.onload = () => {
                        data.proObj = oImg;
                        const [w, h] = [this.parseSubs.bW * 0.4, this.parseSubs.bW * 0.4 * oImg.height / oImg.width]
                        data.w = w;
                        data.h = h;
                        data.x = this.parseSubs.bW / 2 - w / 2;
                        data.y = this.parseSubs.bH / 2 - h / 2;
                        this.parseSubs.subList.push( data )
                        this.loading.show = false;
                    };
                    oImg.src = addUrlQuery(res.data);

                } )

            },
            saveSubItem() {
                if (!this.loadSubObj) return;
                this.loading.show = true;
                let nowSub = JSON.parse( JSON.stringify( this.parseSubs ) ),
                    prolist3 = ['x', 'y', 'w', 'h', 'fontSize', 'lineHeight', 'letterSpacing'], reg = /^\http/,
                    upNum = 0, dataImg;
                nowSub.subList.map( (item, idx) => {
                    Object.keys( item ).map( it => {
                        if (prolist3.includes( it )) nowSub.subList[idx][it] = item[it] / nowSub.scale;
                        if (it === 'textShadow') {
                            nowSub.subList[idx][it] = ['none', '#333 1px 0 0, #333 0 1px 0, #333 -1px 0 0, #333 0 -1px 0', '0 5px 5px #333'].indexOf( item[it] )
                        }
                    } )
                } )
                this.downLoadImg2( nowSub );
            },
            saveTempelteSub(nowSub, url) {
                let data = {
                    ...this.loadSubObj,
                    width: this.parseSubs.oriW,
                    height: this.parseSubs.oriH,
                    cover: url,
                    data: JSON.stringify( nowSub )
                }
                saveTemplate( data ).then( res => {
                    if (!res.code) this.$message( {message: '保存成功', type: 'success'} )
                } ).finally( _ => this.loading.show = false )
            },
            loadSubs(item) {
                let mItems = JSON.parse( JSON.stringify( item ) ),
                    oH = document.getElementById( 'e_r' ).offsetHeight * 0.6,
                    imgsList = mItems.subList.filter( it => ([1].includes( it.type ) && it.useImg) ),
                    oW = document.getElementById( 'e_r' ).offsetWidth * 0.6;
                mItems['bW'] = mItems.oriW > mItems.oriH ? (mItems.oriW > oW ? oW : mItems.oriW) : (mItems.oriH > oH ? oH * mItems.oriW / mItems.oriH : mItems.oriW);
                mItems['bH'] = mItems.oriW > mItems.oriH ? (mItems.oriW > oW ? oW * mItems.oriH / mItems.oriW : mItems.oriH) : (mItems.oriH > oH ? oH : mItems.oriH);
                mItems['scale'] = parseFloat( mItems.bW / mItems.oriW );
                const keyList = ['w', 'h', 'x', 'y', 'fontSize', 'letterSpacing', 'lineHeight']
                mItems.subList.map( (item, idx) => {
                    Object.keys( item ).map( it => {
                        if (keyList.includes( it )) {
                            mItems.subList[idx][it] = mItems.subList[idx][it] * mItems['scale']
                        }
                        if (it === 'textShadow') mItems.subList[idx][it] = ['none', '#333 1px 0 0, #333 0 1px 0, #333 -1px 0 0, #333 0 -1px 0', '0 5px 5px #333'][mItems.subList[idx][it]]
                    } )
                } )
                this.loadSubing = 0;
                this.oriW = mItems.oriW;
                this.oriH = mItems.oriH;
                mItems.subList.map( (item, idx) => {
                    if ([1].includes( item.type ) && item.useImg) {
                        mItems.subList[idx]['id'] = `img${Math.random()}`;
                        mItems.subList[idx]['proObj'] = ``;
                        let oImg = new Image();
                        oImg.crossOrigin = '';
                        oImg.onload = () => {
                            mItems.subList[idx]['proObj'] = oImg;
                            this.loadSubing+=1;
                            if(this.loadSubing===imgsList.length){
                                this.parseSubs=mItems;
                                const ixs=this.edrieImgInfo.idxSplace;
                                if(ixs>-1 && ixs<38)this.loadThis(this.effectList[ixs],ixs);
                                this.loading = {show: false, text: '处理中...'};
                            }
                        };
                        oImg.src =addUrlQuery(mItems.subList[idx].useImg);
                    }
                } )

            },
            initUserinfo() {
                getUserInfo().then( res => {
                    this.userInfo = res.data;
                } )
            },
            setIndex() {
                this.$nextTick( _ => {
                    $( '.hDown2' ).css( 'zIndex', 888 )
                } )
            },
            initDiv() {
                let oImg = new Image(), w = 900, h = 1275,mattingMsg={"previewHeight":"500","original":"http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200912/68c0e3b336c74460958010c081d06529.jpg","originalHeight":"1600","maskRect":{"x":427,"width":896,"y":95,"height":1505},"bgRemovedPreview":"https://deeplor.oss-cn-hangzhou.aliyuncs.com/matting2/2020/09/21/http___deeplor.oss-cn-hangzhou.aliyuncs.com_upload_image_20200912_68c0e3b336c74460958010c081d06529.png","queueNumber":"1","originalWidth":"1600","status":"success","fileId":"746894","previewWidth":"500"};
                // let scaleW = 2 / 9 * h / w;//头部占据2/9
                // let iw = w * scaleW * mattingMsg.originalWidth / (mattingMsg.headData.right - mattingMsg.headData.left);//缩放后的图片宽
                // let ih = iw * mattingMsg.originalHeight / mattingMsg.originalWidth;
                // let top = -(ih * mattingMsg.headData.top / mattingMsg.originalHeight) + h * 0.05;
                // let left = w / 2 - ((mattingMsg.headData.right - mattingMsg.headData.left) / 2 + mattingMsg.headData.left) * iw / mattingMsg.originalWidth;
                // let downTop = h - top <= ih ? top : h - ih;//吸底判断
                let point=mattingMsg.maskRect,ow=mattingMsg.originalWidth,oh=mattingMsg.originalHeight;
                let downTop=h * 0.08,ih=(h-downTop)*oh/point.height,iw=ow*ih/oh,left=w/2-iw/2;//
                let afterPoint={x:iw*point.x/ow,y:ih*point.y/oh,w:iw*point.width/ow,h:ih*point.height/oh};
                downTop=downTop-afterPoint.y;
                if(afterPoint.w>w){
                    iw=(w*ow/point.width);
                    ih=iw*oh/ow;
                    left=0;
                    downTop=h-ih;
                    afterPoint={x:iw*point.x/ow,y:ih*point.y/oh,w:iw*point.width/ow,h:ih*point.height/oh};
                }
                left=w/2-iw/2-(afterPoint.x+afterPoint.w/2-iw/2);
                oImg.crossOrigin = '';
                oImg.onload = ()=> {
                    let data = {};
                    this.effectList.map((item,idxx)=>{
                        let type = item.type;
                        if (type == 1) {//径向渐变
                            let colorStr = item.color;
                            data = {colorStr: colorStr, imgObj: oImg, w: w, h: h, x: left, y: downTop, iw: iw, ih: ih, downtype: ''};
                            item.imgurl=jsMulit.RadialGradient.init( data )
                        } else if (type == 2) {//前后背景
                            let oCan=document.createElement('canvas'),ctx=oCan.getContext('2d');
                            oCan.width=w;oCan.height=h;
                            ctx.drawImage(oImg,left,downTop,iw,ih);
                            item.imgurl=oCan.toDataURL();
                            // data = {backStr: backStr, imgObj: oImg, w: w, h: h, x: left, y: downTop, iw: iw, ih: ih, downtype: ''};
                            // jsMulit.AddBackgroundImage.init( data, callback )
                        } else if (type == 3) {//三个影子
                            // let headw = (mattingMsg.headData.right - mattingMsg.headData.left) * iw / mattingMsg.originalWidth;
                            let headw =iw/3;
                            data = {imgObj: oImg, w: w, h: h, x: left, y: downTop, iw: iw, ih: ih, headw: headw, downtype: ''};
                            item.imgurl=jsMulit.ThreeShow.init( data )
                        } else if (type == 4) {//加相框
                            let bColor = item.bColor;
                            data = {bColor: bColor, imgObj: oImg, w: w, h: h, x: left, y: downTop, iw: iw, ih: ih, downtype: '', size: 40,iheight:downTop+afterPoint.y};
                           item.imgurl= jsMulit.AddPhotoFrame.init( data )
                        } else if (type == 5) {//加佛光
                            let upColor = item.upColor, backUrl = item.backUrl,
                                callback = (can)=> {
                                    item.imgurl=can.toDataURL()
                                };
                            data = {imgObj: oImg, w: w, h: h, x: left, y: downTop, iw: iw, ih: ih, downtype: '', upColor: upColor, backUrl: backUrl};
                            jsMulit.AddBuddhaLight.init( data, callback )
                        } else if (type == 6) {//加圆圈
                            let colors = item.colors;
                            data = {imgObj: oImg, w: w, h: h, x: left, y: downTop, iw: iw, ih: ih, downtype: '', colors: colors, bcolor: '#000'
                            };
                            item.imgurl= jsMulit.AddArc.init( data )
                        }
                    })
                };
                oImg.src = addUrlQuery('http://deeplor.oss-cn-hangzhou.aliyuncs.com/matting_preview/2020/09/17/4a6460db6b1d4af1acaafcac6867ad50.png');
            },
            loadThis(item,x){
                let type=item.type,oCan=document.createElement('canvas'),canTxt,data,idx=this.parseSubs.subList.findIndex(items=>!items.type),mattingMsg=this.edrieImgInfo,w=mattingMsg.w,h=mattingMsg.h;
                let [scaleW,oImg] = [2 / 9 * h / w,(this.parseSubs.subList.find(items=>items.type===1)).proObj];//头部占据2/9
                // let iw = w * scaleW * mattingMsg.originalWidth / (mattingMsg.headData.right - mattingMsg.headData.left);//缩放后的图片宽
                // let ih = iw * mattingMsg.originalHeight / mattingMsg.originalWidth;
                // let top = -(ih * mattingMsg.headData.top / mattingMsg.originalHeight) + h * 0.05;
                // let left = w / 2 - ((mattingMsg.headData.right - mattingMsg.headData.left) / 2 + mattingMsg.headData.left) * iw / mattingMsg.originalWidth;
                // let downTop = h - top <= ih ? top : h - ih;//吸底判断
                let point=mattingMsg.maskRect,ow=mattingMsg.originalWidth,oh=mattingMsg.originalHeight;
                let downTop=h * 0.08,ih=(h-downTop)*oh/point.height,iw=ow*ih/oh,left=w/2-iw/2;//
                let afterPoint={x:iw*point.x/ow,y:ih*point.y/oh,w:iw*point.width/ow,h:ih*point.height/oh};
                downTop=downTop-afterPoint.y;
                if(afterPoint.w>w){
                    iw=(w*ow/point.width);
                    ih=iw*oh/ow;
                    left=0;
                    downTop=h-ih;
                    afterPoint={x:iw*point.x/ow,y:ih*point.y/oh,w:iw*point.width/ow,h:ih*point.height/oh};
                }
                left=w/2-iw/2-(afterPoint.x+afterPoint.w/2-iw/2);
                oCan.width=w;
                oCan.height=h;
                canTxt=oCan.getContext('2d');
                this.parseSubs.subList=[{ type: 0, useImg: '', pro: '', ori: ''},...this.parseSubs.subList.filter(itemson=>[1].includes(itemson.type))];
                if(type===1){
                    let gradient = canTxt.createRadialGradient( w / 2, h / 2, 0, w / 2, h / 2, h / 2 ),colors=item.color.split(',');
                    gradient.addColorStop( 0, colors[0] );
                    gradient.addColorStop( 1, colors[1] );
                    canTxt.fillStyle = gradient;
                    canTxt.fillRect( 0, 0,w,h );
                    data={backColor:'', type: 0, title: '背景组件', w:w*this.parseSubs.scale, h:h*this.parseSubs.scale, x: 0, y: 0, id: `img${Math.random()}`, rotate: 0, useImg: oCan.toDataURL(), pro:  oCan.toDataURL(), ori:  oCan.toDataURL(), hovering: false, mattingType: -1,}
                    this.parseSubs.subList.splice(idx,1,data);
                }else if(type===2){
                    let imglist=item.imgSrc.split(','),imgs;
                    data={backColor:'', type: 0, title: '背景组件', w:w*this.parseSubs.scale, h:h*this.parseSubs.scale, x: 0, y: 0, id: `img${Math.random()}`, rotate: 0, useImg: imglist[0], pro:  imglist[0], ori: imglist[0], hovering: false, mattingType: -1,}
                    this.parseSubs.subList.splice(idx,1,data);
                    if(imglist.length>1){
                        imgs={type: 3, title: '图片背景', w:w*this.parseSubs.scale, h:h*this.parseSubs.scale, x: 0, y: 0, id: `img${Math.random()}`, rotate: 0, useImg: imglist[1], pro:  imglist[1], ori: imglist[1], hovering: false, mattingType: -1,}
                        this.parseSubs.subList.push(imgs);
                    }
                }else if(type===3){
                    this.parseSubs.subList[0].backColor='#000';
                    // let headw = (mattingMsg.headData.right - mattingMsg.headData.left) * iw / mattingMsg.originalWidth,objData;
                    let headw = iw/3,objData;
                    data = {imgObj: oImg, w: w, h: h, x: left, y: downTop, iw: iw, ih: ih, headw: headw, downtype: '',color:'rgba(0,0,0,0)'};
                    let effurl=jsMulit.ThreeShow.init( data,'',1 );
                    objData={type: 3, title: '图片', w:this.parseSubs.bW, h:this.parseSubs.bH, x: 0, y: 0, id: `img${Math.random()}`, rotate: 0, useImg: effurl, pro:  effurl, ori: effurl, hovering: false, mattingType: -1,}
                    this.parseSubs.subList.splice(1,0,objData)
                }else if(type===4){//PhotoFrame
                    data = {imgObj: oImg, w: w, h: h, x: left, y: downTop, iw: iw, ih: ih, downtype: '', size: 40,iheight:downTop+afterPoint.y};
                    this.parseSubs.subList[0].backColor=item.bColor;
                    const img=jsMulit.PhotoFrame.init( data),img2=jsMulit.PhotoFrame.init( data,1);
                    let imgdata={type: 3, title: '图片', w:this.parseSubs.bW, h:this.parseSubs.bH, x: 0, y: 0, id: `img${Math.random()}`, rotate: 0, useImg: img, pro:  img, ori: img, hovering: false, mattingType: -1,};
                    let imgdata2={type: 3, title: '图片', w:this.parseSubs.bW, h:this.parseSubs.bH, x: 0, y: 0, id: `img${Math.random()}`, rotate: 0, useImg: img2, pro:  img2, ori: img2, hovering: false, mattingType: -1,};
                    this.parseSubs.subList.splice(1,0,imgdata2);
                    this.parseSubs.subList.push(imgdata);
                }else if(type===5){//PhotoFrame
                    data = {imgObj: oImg, w: w, h: h, x: left, y: downTop, iw: iw, ih: ih, downtype: '', upColor: item.upColor, backUrl: item.backUrl};
                    const backsub={backColor:'', type: 0, title: '背景组件', w:this.parseSubs.bW, h:this.parseSubs.bH, x: 0, y: 0, id: `img${Math.random()}`, rotate: 0, useImg: data.backUrl, pro:  data.backUrl, ori:  data.backUrl, hovering: false, mattingType: -1,}
                    let img=jsMulit.AddBuddhaLight.init( data,'',1),cale=this.parseSubs.scale;
                    let imgsub={type: 3, title: '图片', w:this.parseSubs.bW, h:this.parseSubs.bH, x: 0, y: 0, id: `img${Math.random()}`, rotate: 0, useImg: img, pro:  img, ori: img, hovering: false, mattingType: -1,canMove:true};
                    let mainsub={...this.parseSubs.subList[1],...{x:left*cale,y:downTop*cale,w:iw*cale,h:ih*cale}};
                    this.parseSubs.subList.splice(0,1,backsub);
                    this.parseSubs.subList.splice(1,1,mainsub);
                    this.parseSubs.subList.push(imgsub);
                    // console.log(this.parseSubs.subList,mainsub)
                }
                this.loadIdx=x;
                this.$nextTick(_=>{
                    const mainidx=this.parseSubs.subList.findIndex(it=>it.type===1);
                    this.hoverThis(mainidx);
                })
            },
        },
        created() {//透明背景储存
        },
        mounted() {//初始化参数
            const oDiv = document.getElementById( 'e_r' );
            this.oDiv_w = {w: oDiv.offsetWidth, h: oDiv.offsetHeight};
            if (getToken()) {
                this.userGetscribe();
                this.initUserinfo();
            }
            $( '#e_r' ).niceScroll( {cursorcolor: '#999999'} );
            document.addEventListener( 'keydown', (e) => {//键盘事件
                const keynum = window.event ? e.keyCode : e.which;
                const idx = this.hoverSub.idx, type = this.hoverSub.type;
                if (keynum === 17) this.touchContrl = true;
                if (this.touchContrl && keynum === 90) this.goback( 0 );
                if (this.touchContrl && keynum === 89) this.goback( 1 );
            } )
            document.addEventListener( 'keyup', (e) => {
                const keynum = window.event ? e.keyCode : e.which;
                if (keynum === 17) this.touchContrl = false;
            } )
            document.addEventListener( 'click', (e) => {
                this.showcolorList = false;
            } )
            window.addEventListener( 'resize', () => {
                const oDiv = document.getElementById( 'e_r' )
                this.oDiv_w = {w: oDiv.offsetWidth, h: oDiv.offsetHeight};
            } )
            this.initAllInfo();
            this.initDiv();
        }
    }
</script>
<style scoped lang="scss">
    .editPictures {
        -webkit-text-size-adjust: none;
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

        .e_c {
            padding: 0 25px;
            padding-top: 80px;
            width: 230px;
            background-color: #2A2F35;
            color: #ADAEB2;
            overflow: hidden;
            flex-direction: column;

            label {
                display: block;
                font-size: 14px;
                margin-bottom: 20px;
            }

            .smallBtn {
                margin-top: 20px;
                margin-bottom: 35px;
                background-color: initial;

                .bordershow {
                    box-shadow: 0 0 5px $co;
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
            }

            .smallBtn > div {
                border-radius: 5px;
                width: 28px;
                height: 28px;
                margin-right: 10px;
                margin-bottom: 10px;
                position: relative;

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }

                &:first-child, &:nth-child(2) {
                    border-radius: 50%;
                }
            }

            .el-slider {
                width: 80%;
                margin-right: 15px;
            }

            .fource {
                flex: 1;
                overflow: hidden;
                .el-button {
                    background-color: initial;
                    border-color: $co;
                    color: $co;
                    margin-bottom: 20px;
                }

                .Fbtn {
                    font-size: 14px;
                    color: #ADAEB2;
                    line-height: 32px;
                    margin-bottom: 20px;
                    border-bottom: 1px solid #40454B;

                    span {
                        padding: 0 5px;
                    }

                    .active {
                        color: #fff;
                        border-bottom: 2px solid $co;
                    }
                }

                .iconList {
                    padding: 5px;
                    /*justify-content: center;*/
                    div {
                        background-size: cover;
                        background-repeat: no-repeat;
                        background-position: center;
                        width: 100px;
                        position: relative;
                        margin-bottom: 10px;
                        overflow: hidden;
                        img{
                            display: block;
                            width: 100%;
                        }
                        img.upimgsb{
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                        }
                    }

                    .active {
                        box-shadow: 0 0 15px $co;
                    }
                }
            }
        }

        .e_r {
            margin-top: 60px;
            flex: 1;
            position: relative;
            overflow: auto;

            .fivePoint {
                position: absolute;
                border: 2px solid $co;
                pointer-events: none;

                i {
                    pointer-events: initial;
                    position: absolute;
                    border: 1px solid $co;
                    background-color: #fff;
                    transform: translate(-50%, -50%);
                    cursor: nesw-resize;
                    z-index: 66;
                    font-size: 24px;
                    color: #000;
                    overflow: hidden;
                    border-radius: 4px;

                    &.iOne {
                        margin-top: -1px;
                        width: 14px;
                        height: 6px;
                        top: 0;
                        left: 50%;
                        cursor: n-resize;
                    }

                    &.iTwo {
                        margin-right: -1px;
                        top: 50%;
                        right: 0;
                        width: 6px;
                        height: 14px;
                        cursor: e-resize;
                        transform: translate(50%, -50%);
                    }

                    &.iTh {
                        margin-top: 1px;
                        bottom: 0;
                        left: 50%;
                        width: 14px;
                        height: 6px;
                        cursor: n-resize;
                        transform: translate(-50%, 50%);
                    }

                    &.iFor {
                        margin-left: -1px;
                        top: 50%;
                        left: 0;
                        width: 6px;
                        height: 14px;
                        cursor: e-resize;
                    }

                    &.iFive {
                        top: 0;
                        right: 0;
                        width: 12px;
                        height: 12px;
                        transform: translate(50%, -50%);
                        border-radius: 50%;
                    }

                    &.icon-shanchu, &.icon-dashujukeshihuaico-1, &.icon-dashujukeshihuaico- {
                        border: none;
                        cursor: pointer;
                        width: 20px;
                        height: 20px;
                        text-align: center;
                        border-radius: 50%;
                        box-shadow: 0 0 1px #666;
                        font-size: 16px;
                        line-height: 20px;
                    }

                    &.iSix, &.iSeven, &.iEight {
                        background-color: #fff;
                        width: 12px;
                        height: 12px;
                        border: 1px solid $co;
                        border-radius: 50%;
                    }

                    &.iSix {
                        right: 0;
                        bottom: 0;
                        transform: translate(50%, 50%);
                    }

                    &.iSeven {
                        left: 0;
                        bottom: 0;
                        transform: translate(-50%, 50%);
                    }

                    &.iEight {
                        transform: translate(-50%, -50%);
                    }

                    &.icon-shanchu {
                        top: 10px;
                        right: -40px;
                        font-size: 18px;
                        background-color: #fff;
                    }

                    &.icon-dashujukeshihuaico-1 {
                        top: 40px;
                        background-color: #fff;
                        right: -40px;
                    }

                    &.icon-dashujukeshihuaico- {
                        top: 70px;
                        background-color: #fff;
                        right: -40px;
                    }
                }

                span.downIcon {
                    background-color: #fff;
                    pointer-events: initial;
                    position: absolute;
                    left: 50%;
                    bottom: -34px;
                    transform: translate(-50%, 0);
                    border: none;
                    letter-spacing: 0 !important;
                    border-radius: 50%;
                    color: $co;
                    font-size: 18px;
                    cursor: url(../../assets/image/rotate.svg) 11 9, pointer
                }
            }

            .borderK {
                position: absolute;
                border: 1px solid $co;
                pointer-events: none;
            }

            i.teI {
                position: absolute;
                border: 1px solid $co;
                background-color: #fff;
                cursor: nesw-resize;
                z-index: 66;

                &.iOne {
                    cursor: n-resize;
                }

                &.iTwo {
                    cursor: e-resize;
                }

                &.iTh {
                    cursor: n-resize;
                }

                &.iFor {
                    cursor: e-resize;

                    & ~ i::before {
                        background-color: #fff;
                    }
                }
            }

            & > span.downIcon {
                position: absolute;
                border: none;
                letter-spacing: 0 !important;
                background-color: initial;
                color: #3a8ee6;
                font-size: 18px;
                cursor: url(../../assets/image/rotate.svg) 11 9, pointer
            }

            .loadingss {
                position: absolute;
                top: 50%;
                color: #fff;
                left: 50%;
                padding: 15px;
                font-size: 12px;
                line-height: 24px;
                background-color: rgba(0, 0, 0, .6);
                text-align: center;
                max-width: 70%;
                transform: translate(-50%, -50%);
                border-radius: 10px;
                margin-top: -40px;
                z-index: 99;
            }

            .nowMsg {
                position: fixed;
                right: 15%;
                bottom: 10%;
                font-size: 14px;
                padding: 0 20px;
                line-height: 38px;
                border-radius: 19px;
                background-color: #fff;
                box-shadow: 0 0 2px #666;
                color: #333;
                z-index: 111;

                img {
                    width: 22px;
                }

                span {
                    margin: 0 25px;
                }
            }

            .subs {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 15px #9c9c9c;
                overflow: hidden;
                .upss {
                    z-index: 1;
                }

                .items img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }

                & > div {
                    /*overflow: hidden;*/

                    &:after {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        content: '';
                        left: 0;
                        top: 0;
                    }

                    position: absolute;
                    text-align: center;

                    .Imgs {
                        position: relative;
                        flex: 1;
                        z-index: 2;

                        &:after {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            content: '';
                            left: 0;
                            top: 0;
                        }

                        img {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            left: 0;
                            top: 0;
                        }
                    }

                    .flex {
                        flex-direction: column;
                        height: 100%;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    & > .Imgs {
                        height: 100%;
                    }

                    &.hovers {
                        cursor: move;
                        /*border: 1px solid #3a8ee6;*/
                    }

                    .text {
                        position: relative;
                        z-index: 22;
                        /*width: 100%;*/
                        /*height: 100%;*/

                        &:focus {
                            outline: none;
                        }

                        &.texsst {
                            cursor: text;
                        }
                    }
                }
            }
            .teimgs{
                pointer-events: none;
            }

        }

        .e_rLast {
            width: 220px;
            padding: 80px 20px 0;
            background-color: #fff;
            position: relative;
            z-index: 32;

            h4 {
                font-size: 14px;
                color: #333;
                margin-bottom: 15px;
            }

            .btns {
                margin-bottom: 20px;
            }

            .btns span {
                width: 102px;
                line-height: 40px;
                border: 1px solid #e9e9e9;
                text-align: center;
                border-radius: 5px;
                margin-bottom: 10px;

                &.active {
                    color: #fff;
                    background-color: $co;
                    border-color: $co;
                }
            }

            .el-button {
                display: block;
                width: 70%;
                color: $co;
                border-color: $co;
            }
        }
    }

    .editPictures {

        .dialogs {
            padding-top: 0;
            z-index: 440;
            width: 500px;
            margin-left: 48px;
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
        }

        .header {
            height: 60px;
            background-color: #fff;
            justify-content: space-between;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 110;
            box-shadow: 0 2px 2px #eee;

            & > a img {
                width: 108px;
                margin-left: 20px;
            }

            .hDown {
                margin-right: 20px;

                .up {
                    border: 1px solid $co;
                    color: $co;
                }
            }

            .h_l span {
                display: inline-block;
                line-height: 20px;
                margin-left: 8px;
            }

            .h_l img {
                display: inline-block;
                width: 20px;
                vertical-align: top;

                &.last {
                    margin-left: 30px;
                    transform: rotateY(180deg);
                }
            }

            .stops {
                color: #9c9c9c;

                img {
                    opacity: .4;
                }
            }

            .el-button {
                width: 150px;
                position: relative;
                border-radius: 18px;

                &.doo:hover .downBtn {
                    display: block;
                }

                .downBtn {
                    display: none;
                    text-align: left;
                    padding: 10px 0;
                    width: 200px;
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
    }

    .el-dialog {
        border-radius: 15px;
    }

    .zheR {
        z-index: 220;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        padding-top: 0 !important;
        background-color: rgba(255, 255, 255, 0);
    }

    .saveJpg {
        width: 250px;
        background-color: #fff;
        color: #333333;
        font-size: 12px;
        padding: 10px 0;
        text-align: center;
        line-height: 1.5;
        border-radius: 5px;
        box-shadow: 0 0 2px #999;
    }

    .saveJpg strong {
        padding: 8px 20px;
        cursor: pointer;
        display: block;
        text-align: left;
        position: relative;
    }

    .saveJpg h3 {
        padding-bottom: 15px;
        border-bottom: 1px solid #eee
    }

    .saveJpg strong:hover {
        color: #e82255;
        background-color: #eee;
    }

    @media screen and (max-width: 1500px) {
        .editPictures .e_r .ships {
            bottom: 15%;
        }
        .editPictures .dialogs {
            max-width: 380px;

            .sons {
                padding: 50px 0;

                .title {
                    margin: 40px 0;
                    font-size: 18px;
                }
            }

            .types img {
                width: 80px;
            }
        }

    }
</style>
