<template>
    <div class="editPictures flex">
        <header class="header flex j-b a-i">
            <img src="@/assets/image/sureLogo.png" alt="">
            <div class="h_l flex">
                <div @click.stop="goback(0)" :class="{'stops' : (historyList.length<2 || hisIdx===historyList[0].id)}"
                     class="cu">
                    <img src="../../assets/image/Revoke.png" alt="">
                    <span>上一步</span>
                </div>
                <div @click.stop="goback(1)"
                     :class="{'stops' : ( historyList.length<2 || hisIdx===historyList[historyList.length-1].id)}"
                     class="cu">
                    <img src="../../assets/image/Revoke.png" alt="" class="last">
                    <span>下一步</span>
                </div>
                <div @click.stop="reloads" class="cu" style="margin-left: 30px">
                    <i class="el-icon-refresh-right"
                       style="font-size: 18px;display: inline-block;vertical-align: text-top;"></i>
                    <span> {{edrieImgInfo.type===1 ? '重新上传' : '重置'}}</span>
                </div>
            </div>
            <div class="hDown">
                <!--                <el-button type="primary" style="background-color: #fff;color: #e82255;" @click="reloads">-->
                <!--                    {{edrieImgInfo.type===1 ? '重新上传' : '重置'}}-->
                <!--                </el-button>-->
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
        </header>
        <div class="e_l">
            <div v-for="(item,idx) in e_btn_list" :key="idx" :class="{active : selectType===idx}"
                 @click="changeSelecType(idx)">
                <i class="icon iconfont " :class="item.url"></i>
                <span>{{item.title}}</span>
            </div>
        </div>
        <div class="e_c">
            <div class="first" v-show="selectType===0">
                <el-button type="primary" plain style="width: 100%" @click="upLoad(0)">上传</el-button>
                <p>CTRL + V粘贴图片或者URL</p>
                <div class="list flex f-w">
                    <div v-for="(it,idx) in 4" :key="idx">
                        <img src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/resource/img/26/26129.png" alt="">
                    </div>
                </div>
            </div>
            <div class="second" v-show="selectType===1">
                <p>颜色背景</p>
                <div class="flex smallBtn f-w">
                    <div v-for="(items,idx) in initcolorList" :key="idx"
                         @click.stop="choseBackColor(items,idx)"
                         class="cu" :class="{'bordershow' : idx===choseBack}"
                         :style="{backgroundColor: `${idx>1 ? items : 'initial'}`}">
                        <div class="flex color_List" v-if="showcolorList && idx===0">
                            <span v-for="(color,idxs) in colorList" :key="idxs" :style="{backgroundColor:color}"
                                  @click.stop="choseColor(color)"></span>
                        </div>
                        <img :src="items" alt="" v-if="idx<2"/>
                    </div>
                </div>
                <p>图片背景</p>
                <el-button plain icon="el-icon-plus" style="width: 100%" @click="upLoad(-1)">自定义背景</el-button>
                <input type="file" name="file" accept="image/*" :multiple="false" ref="selfImg" @change="changeselfImg"
                       style="display: none;">
                <el-input v-model="seachWords" placeholder="搜索背景" suffix-icon="el-icon-search"
                          @keydown.enter="seachBack"></el-input>
                <div class="bgbtn ">
                    <div class="flex" ref="bTypeList">
                        <div v-for="(it,idx) in imgCatList" :key="idx" :class="{'active':bgType===idx}"
                             @click="changeBgType(idx)" class="cu">
                            <img :src="it.url" alt="">
                            <p>{{it.category}}</p>
                        </div>
                    </div>
                    <i class="el-icon-arrow-left cu" @click="moveItem(0)"></i>
                    <i class="el-icon-arrow-right cu" @click="moveItem(1)"></i>
                </div>
                <div class="flex a-i bgimgs f-w" v-loading="oneItemBg2.length<1">
                    <div v-for="(item,idx) in oneItemBg2" :key="idx" class="cu"
                         :class="{active : backSub.useImg===item.url}"
                         @click="selectBg(item,idx)">
                        <img :src="item.url" alt="">
                    </div>
                    <p style="width: 100%;text-align: center;margin: 10px 0;">
                        图片不够？试试精确搜索一下！
                    </p>
                </div>
            </div>
            <div class="thred" v-show="selectType===2">
                <el-button plain icon="el-icon-plus" class="addText" style="width: 100%" size="small"
                           @click="addTextSub">添加文本
                </el-button>
                <p>字体样式</p>
                <div class="fontList flex f-w j-b">
                    <div v-for="(ite,idxs) in fontList" :key="idxs" class="cu" @click="addTextSub(ite.val)">
                        {{ite.title}}
                    </div>
                </div>
            </div>
            <div class="fource" v-show="selectType===3">
                <el-button plain icon="el-icon-plus" style="width: 100%" @click="upLoad(0)">上传自己的照片</el-button>
                <div class="Fbtn flex j-b">
                    <span v-for="(item,idx) in ttList" :key="idx" :class="{'active' : tzType===idx}" class="cu"
                          @click="changetz(idx)">
                        {{item.title}}
                    </span>
                </div>
                <div class="iconList flex f-w j-b">
                    <div v-for="(son,ix) in tzList" :key="ix" class="cu" @click="addImgsSub(son)">
                        <img :src="son" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="e_r" id="e_r" @mouseup="blurAll">
            <div class="subs opas"
                 :style="{width:`${parseSubs.bW}px`,height:`${parseSubs.bH}px`,opacity:'.4',overflow:'initial'}"
                 v-if="edrieImgInfo.pro && selectType===1 && !backSub.backColor">
                <div class="items" :class="{'hovers' : backSub.hovering}" :style="backSub | subsStyle"
                     @click.stop="hoverThis(backSub.idx)" v-if="backSub.idx>-1"
                     @mousedown.stop="moveBack($event,backSub.idx)">
                    <img :src="backSub.useImg" alt="">
                </div>
            </div>
            <div class="subs otherSubs"
                 v-if="edrieImgInfo.pro"
                 :style="{width:`${parseSubs.bW}px`,height:`${parseSubs.bH}px`,backgroundColor:`${backSub.backColor ? backSub.backColor : ''}`}">
                <div class="items upss" :class="{'hovers' : item.hovering}" v-for="(item,idx) in parseSubs.subList"
                     :style="item | subsStyle"
                     @mousedown.stop="moveBack($event,idx)" @click.stop="hoverThis(idx)">
                    <div v-if="item.type===2" :contenteditable="item.contenteditable" class="text"
                         style="font-weight:inherit;border: 0;"
                         @input="setBlur($event,idx)">{{item.title}}
                    </div>
                    <div v-if="[1,3].includes(item.type)" class="Imgs">
                        <img :src="item.useImg" alt="">
                    </div>
                </div>
                <div class="items initBack" :class="{'hovers' : backSub.hovering}" :style="backSub | subsStyle"
                     @click.stop="hoverThis(backSub.idx)" v-if="backSub.idx>-1 && !backSub.backColor"
                     @mousedown.stop="moveBack($event,backSub.idx)">
                    <img :src="backSub.useImg" alt="">
                </div>
            </div>
            <div class="fivePoint"
                 @mousedown.stop="moveBack($event,hoverSub.idx)"
                 @click.stop="hoverThis(hoverSub.idx)"
                 v-if="hoverSub.idx>-1"
                 :style="{left:`${mainx.x+hoverSub.x}px`,top:`${mainx.y+hoverSub.y}px`,width:`${parseInt(hoverSub.w)}px`,height:`${parseInt(hoverSub.h)}px`,transform:`rotateZ(${hoverSub.rotate}deg)`}">
                <span class="el-icon-refresh downIcon" style="z-index: 666"></span>
                <!--                         :style="{left:`${parseInt(mainx.x+hoverSub.x+hoverSub.w/2-9)}px`,top:`${parseInt(mainx.y+hoverSub.y+hoverSub.h+16)}px`,transformOrigin:`9px ${-(hoverSub.h/2+16)}px`,transform:`${rotateHover}`}"></span>-->
                <!--                :style=" pointStyle(it)"-->
                <i v-for="it in 8" :key="'a'+it"
                   class="teI icon iconfont"
                   @click.stop="setOImg(it)"
                   :class="{'iOne' : it===1,'iTwo' : it===2,'iTh' : it===3,'iFor' : it===4,'iFive' : it===5,'icon-shanchu' : it===6,'icon-dashujukeshihuaico-1':it===7,'icon-dashujukeshihuaico-' : it===8}"
                   style="z-index: 666"
                   :style="pointcursor(it)"></i>
            </div>
            <div class="nowMsg flex a-i">
                <i class="el-icon-minus cu" @click="wheelFun({deltaY:1})"></i>
                <span>{{parseInt(parseSubs.scale*100)}}%</span>
                <i class="el-icon-plus cu" @click="wheelFun({deltaY:-1})"></i>
                <span class="cu" @click="initRest">1:1</span>
                <img src="../../assets/image/preview.png" alt="" class="cu" @click="initRestore">
            </div>
            <div class="loadingss" v-if="loading.show">
                <i class="el-icon-loading" style="display: block;font-size: 24px;margin:0 auto 6px;"></i>
                {{loading.text}}
            </div>
        </div>
        <div class="e_rLast">
            <div class="initLast" v-show="![0,1,2,3].includes(hoverSub.type)">
                <h4>画布尺寸</h4>
                <div class="flex c_input j-b">
                    <div><input type="number" v-model="pxWidth" @input="changeSize({w:pxWidth,h:pxHeight})"><i>宽(px)</i>
                    </div>
                    <div><input type="number" v-model="pxHeight"
                                @input="changeSize({w:pxWidth,h:pxHeight})"><i>高(px)</i></div>
                </div>
                <h4>选择画布尺寸(px)</h4>
                <div class="jc">
                    <div v-for="(item,idx) in cansSize" :key="idx" class="cu" :class="{'active' : sizeType===idx}"
                         @click="changeSize(item)"><span>{{item.text}}</span>{{item.w +'*'+ item.h}}
                    </div>
                </div>
            </div>
            <v-mune v-show="[0,1,3].includes(hoverSub.type)" ref="Munes" @mattingImgs="mattingImgs"
                    @effectsImg="effectsImg" @loading="loadings"></v-mune>
            <f-mune v-show="hoverSub.type===2" @initFont="initFont" ref="fontMune"></f-mune>
        </div>
        <div class="dialogs" :style="{backgroundImage: `url(${edrieImgInfo.bgImg})`}" v-if="showUpload">
            <div class="sons">
                <div class="title">请输入你需要替换背景的图片</div>
                <div class="flex types">
                    <img src="@/assets/edtwo.png" alt="" @click="upLoad(1)">
                    <img src="@/assets/edone.png" alt="" @click="upLoad(2)">
                </div>
            </div>
        </div>
        <div class="zheR" v-if="showUpload"></div>
        <el-dialog
                :close-on-click-modal="false"
                title="修复"
                top="0vh"
                :width=" openScreen ? '95%' : '1200px'"
                :visible.sync="dialogVisible">
            <matting-img :edrieImgInfo="hoverSub" @close="closeSetMap" v-if="dialogVisible" :openScreen="openScreen"
                         @changeScree="openScreen=!openScreen"></matting-img>
        </el-dialog>
    </div>
</template>

<script>
    // @ is an alias to /src
    import vMune from '@/components/editMune';
    import fMune from '@/components/fontMune';
    import mattingImg from '@/components/mattingImg';
    import {myBrowser, findLastIdx, setRad} from '@/utils';
    import scale from '../../assets/image/scale.png';
    import {mixins} from '@/minxins';
    import {getTanDeg} from '@/utils'
    import opacity from '@/assets/opacity.jpg';
    import fupa from '@/assets/image/fopa.png';
    import color from '@/assets/image/color.png';
    import jsMulit from '@/utils/jsmanipulate.js';

    import {uploadImgApi, getMattingInfo, downloadMattedImage, catImgList, copyUpload, uploadossBg} from '@/apis';
    import {mapGetters, mapActions} from 'vuex';
    import {getToken} from "@/utils/auth";

    export default {
        name: 'editPictures',
        mixins: [mixins],
        data() {
            return {
                openclearAll: true,
                initcolorList: [color, fupa, '#000', '#fff', '#BFBFBF', '#2862F4', '#FED835', '#28F5B4', '#F62897', '#F57B28', '#00FFFF', '#90C320'],
                e_btn_list: [//左侧菜单按钮
                    {url: 'icon-shangchuan', title: '上传'},
                    {url: 'icon-background', title: '背景'},
                    {url: 'icon-wenzi', title: '文字'},
                    {url: 'icon-tiezhi', title: '贴纸'},
                ],
                seachWords: '',
                cansSize: [
                    {text: '手机海报', w: 750, h: 1334},
                    {text: '淘宝主图', w: 800, h: 800},
                    {text: '手机壁纸', w: 720, h: 1280},
                    {text: '淘宝钻展', w: 1180, h: 500},
                    {text: '公众号', w: 900, h: 383},
                    {text: '小程序封面', w: 520, h: 416},
                    {text: '广告banner', w: 900, h: 800},
                    {text: '电商全屏海报', w: 1920, h: 700},
                ],
                ttList: [
                    {
                        title: '卡通', list: ['https://deeplor.oss-cn-hangzhou.aliyuncs.com/matting2/2020/07/kt/kt1.png']
                    },
                    {title: '头像', list: ['https://deeplor.oss-cn-hangzhou.aliyuncs.com/matting2/2020/07/ktC/1.jpg']},
                    {
                        title: '形状',
                        list: ['https://deeplor.oss-cn-hangzhou.aliyuncs.com/matting2/2020/07/xzhuang/1.png']
                    },
                ],
                tzType: 0,
                sizeType: -1,
                selectType: 1,//当前左侧选中菜单的下标
                fontList: [{
                    title: '描边',
                    val: {textShadow: '#000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0'}
                }, {title: '阴影', val: {textShadow: '0 5px 5px #333'}}],//'立体', '渐变', '鎏金', '抖音', '印章', '浮雕'
                iconList: [],
                choseBack: 0,//背景模式下（ 透明 、纯色 、黑白、模糊）当前选中的下标
                showcolorList: false,//是否显示颜色选择的弹框
                // bgType: 1,//更换背景的类型中当前选中的下标
                cWH: {cWidth: 0, cHeight: 0},//实际canvas  width、height属性值 （和css中width height不同）
                pxWidth: 1000,//初始化 canvas   css的宽（canvas的width、height属性和css中的width、height不同）此处是css表现大小
                pxHeight: 2000,//初始化 canvas   css的高（canvas的width、height属性和css中的width、height不同）此处是css表现大小
                scale: '',//图片width/height比例系数
                selfImg: '',//自定义背景对象
                bgobj: '',//选中的背景对象
                colorValue: '',//纯色背景
                setScale: 0,//整体放大系数（css表现的width除以实际图片的width）
                oCantl: '',//主要用于记录当前canvas相对于屏幕的位置
                historyList: [],//存放上层canvas的历史记录
                hisIdx: 0,//当前处于历史记录的哪个位置的对应记录id（储存记录时会存一个对应id）
                downType: 0,//下载时的状态 0 初始状态 1 纯色背景 2 背景图片状态
                edrieImgInfo: {
                    imageMsg: {
                        "previewHeight": "346",
                        "original": "http://deeplor.oss-cn-hangzhou.aliyuncs.com/matting_original/2020/07/06/b9d0c7af5a5d44b4a3edb2ffeb204488.jpg",
                        "originalHeight": "346",
                        "bgRemovedPreview": "http://deeplor.oss-cn-hangzhou.aliyuncs.com/matting_preview/2020/07/06/e6fe04b2e45b424faaaecc216706f973.png",
                        "queueNumber": "-1",
                        "originalWidth": "520",
                        "status": "success",
                        "fileId": "705694",
                        "previewWidth": "520"
                    },
                    pro: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/matting_preview/2020/07/06/e6fe04b2e45b424faaaecc216706f973.png',
                    ori: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/matting_original/2020/07/06/b9d0c7af5a5d44b4a3edb2ffeb204488.jpg'
                },//图片的信息（预览图尺寸，原图尺寸，下载按钮处显示的信息）
                showUpload: true,//从背景库页面进入本页面时，要显示上传弹框
                upType: 0,//从背景库页面进入本页面时，要显示上传弹框 ，上传图片的类型 0 自定义背景  1人抠图 2物抠图
                loading: {show: false, text: '处理中...'},//loading
                savepointList: [],//储存当前预览图进行擦除还原放大缩小操作的点的位置和操作类型  this.pointList方法内有详解
                loadingInstance: null,//下载时的loading效果
                dialogVisible: false,//修复弹框
                openScreen: false,//是否全屏
                oDiv_w: {w: 0, h: 0},
                parseSubs: {
                    bW: 0,
                    bH: 0,
                    scale: 1,
                    subList: [],
                },
                mattingMsg: {id: '', type: ''},//公用
            }
        },
        components: {vMune, fMune, mattingImg},
        computed: {
            ...mapGetters( ['userSubscribeData'] ),
            tzList() {//贴纸list
                let a = [22, 10, 14][this.tzType], b = [], c = ['kt', 'ktC', 'xzhuang'];
                for (let i = 0; i < a; i++) {
                    const s = `https://deeplor.oss-cn-hangzhou.aliyuncs.com/matting2/2020/07/${c[this.tzType]}/${this.tzType ? i + 1 : 'kt' + (i + 1)}.png`;
                    b.push( s )
                }
                return b
            },
            hoverSub() {//聚焦组件
                const idx = this.parseSubs.subList.findIndex( item => item.hovering );
                const item = idx > -1 ? this.parseSubs.subList[idx] : {type: ''};
                return {...item, idx: idx}
            },
            rotateHover() {//旋转的hover组件
                const a = Math.cos( setRad( this.hoverSub.rotate ) ), b = Math.sin( setRad( this.hoverSub.rotate ) ),
                    c = -Math.sin( setRad( this.hoverSub.rotate ) ), d = Math.cos( setRad( this.hoverSub.rotate ) );
                return `matrix(${a}, ${b}, ${c}, ${d}, 0, 0)`;
            },
            backSub() {//背景组件
                const i = this.parseSubs.subList.findIndex( item => item.type === 0 );
                const item = i > -1 ? JSON.parse( JSON.stringify( this.parseSubs.subList[i] ) ) : {};
                item.idx = i;
                return item
            },
            mainx() {//内容区的left
                // let oDiv_w=document.getElementById('e_r').offsetWidth;
                return {x: this.oDiv_w.w / 2 - this.parseSubs.bW / 2, y: this.oDiv_w.h / 2 - this.parseSubs.bH / 2}
            },
            noOperation() {//这些情况下不能移动 缩放图片
                if (!this.selectType) return false;
                else if (this.selectType === 1 && [2, 3].includes( this.choseBack )) return false;
                else return true;
            },
            savepoint() {//找到储存点save前面最后一个type为3||4（当前状态最后一次缩放移动点，为下载原图使用）
                let arr = JSON.parse( JSON.stringify( this.savepointList ) );
                const idx = arr.findIndex( item => item.save );
                if (idx > -1) arr.splice( idx, arr.length );
                const ix = arr.reverse().findIndex( item => [3, 4].includes( item.type ) )
                if (ix > -1) return arr[ix];
                else return null;
            },
            pointLists() {//过滤历史记录中当前状态前擦除还原的点，去掉放大缩小移动的点
                const idx = this.savepointList.findIndex( item => item.save );
                if (idx > -1) return this.savepointList.filter( (item, ix) => ([1, 2].includes( item.type ) && ix < idx) )
                else return this.savepointList.filter( (item, ix) => ([1, 2].includes( item.type )) )
            },
        },
        filters: {
            subsStyle(item) {
                let data = {
                    left: item.x === '50%' ? '50%' : parseInt( item.x ) + 'px',
                    top: item.y === '50%' ? '50%' : parseInt( item.y ) + 'px',
                    // zIndex: item.zIndex,
                    transform: `rotateZ(${item.rotate}deg)`,
                    width: parseInt( item.w ) + 'px',
                    height: parseInt( item.h ) + 'px',
                    // marginLeft:`-${item.type ? 0 : item.w/2}px`,
                    // marginTop:`-${item.type ? 0 : item.h/2}px`,
                };
                if (item.type === 2) {
                    data.fontSize = item.fontSize + 'px';
                    data.fontWeight = item.fontWeight;
                    data.letterSpacing = item.letterSpace + 'px';
                    data.lineHeight = item.lineHeight + 'px';
                    data.color = item.color;
                    data.fontFamily = item.fontFamily;
                    data.backgroundColor = item.backgroundColor;
                    data.fontStyle = item.fontStyle;//是否是斜体
                    data.textDecoration = item.textDecoration;//画线
                    data.textAlign = item.textAlign;//对齐方式
                    data.textShadow = item.textShadow;//对齐方式
                    if (item.flexDirection) {
                        // writing-mode:horizontal-tb;//默认：水平方向，从上到下
                        data['writing-mode'] = 'vertical-rl';//垂直方向，从右向左
                        // data.width= parseInt( item.h ) + 'px';
                        // data.height=parseInt( item.w ) + 'px';
                        // writing-mode:  vertical-lr;//垂直方向，从左向右
                    }
                }
                return data
            },
        },
        methods: {
            ...mapActions( [
                'userGetscribe'
            ] ),
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
                } else if (ix === 5) {
                    if (deg >= -15 && deg <= 15) data = {cursor: a[ix - 1]};
                    else if ((deg >= -70 && deg < -15) || (deg >= 15 && deg < 75)) data = {cursor: deg > 0 ? 'w-resize' : 's-resize'};
                    else if ((deg >= -100 && deg < -70) || (deg >= 70 && deg < 100)) data = {cursor: 'se-resize'};
                    else if ((deg >= -160 && deg < -100) || (deg >= 100 && deg < 160)) data = {cursor: deg > 0 ? 'w-resize' : 's-resize'};
                    else if ((deg >= -180 && deg < -150) || (deg >= 150 && deg < 180)) data = {cursor: 'ne-resize'};
                }

                return data
            },
            // pointStyle(it) {//5点位置计算
            //     if (it === 1) return {
            //         left: parseInt( this.mainx.x + this.hoverSub.x + this.hoverSub.w / 2 - 7 ) + 'px',
            //         top: parseInt( this.mainx.y + this.hoverSub.y - 7 ) + 'px',
            //         transform: this.rotateHover,
            //         transformOrigin: `7px ${this.hoverSub.h / 2 + 7}px`,
            //     };
            //     else if (it === 2) return {
            //         left: parseInt( this.mainx.x + this.hoverSub.x + this.hoverSub.w - 7 ) + 'px',
            //         top: parseInt( this.mainx.y + this.hoverSub.y - 6 + this.hoverSub.h / 2 - 7 ) + 'px',
            //         transformOrigin: `${-this.hoverSub.w / 2 + 7}px 7px`,
            //         transform: this.rotateHover,
            //     };
            //     else if (it === 3) return {
            //         left: parseInt( this.mainx.x + this.hoverSub.x + this.hoverSub.w / 2 - 7 ) + 'px',
            //         top: parseInt( this.mainx.y + this.hoverSub.y + this.hoverSub.h - 7 ) + 'px',
            //         transformOrigin: `7px ${-this.hoverSub.h / 2 + 7}px`,
            //         transform: this.rotateHover,
            //     };
            //     else if (it === 4) return {
            //         left: parseInt( this.mainx.x + this.hoverSub.x - 7 ) + 'px',
            //         top: parseInt( this.mainx.y + this.hoverSub.y + this.hoverSub.h / 2 - 7 ) + 'px',
            //         transformOrigin: `${this.hoverSub.w / 2 + 7}px 7px`,
            //         transform: this.rotateHover,
            //     }; else if (it === 5) return {
            //         left: parseInt( this.mainx.x + this.hoverSub.x + this.hoverSub.w - 7 ) + 'px',
            //         top: parseInt( this.mainx.y + this.hoverSub.y - 7 ) + 'px',
            //         transformOrigin: `${-this.hoverSub.w / 2 + 7}px ${this.hoverSub.h / 2 + 7}px`,
            //         transform: this.rotateHover,
            //     };
            // },
            hoverThis(idx) {
                this.parseSubs.subList.map( item => item.hovering = false );
                this.parseSubs.subList[idx].hovering = true;
                if ([0, 1, 3].includes( this.parseSubs.subList[idx].type )) this.$refs.Munes.filterUrl( this.parseSubs.subList[idx] );
                else if (this.parseSubs.subList[idx].type === 2) this.$refs.fontMune.initCanshu( this.parseSubs.subList[idx] );
            },
            blurAll() {
                if (!this.openclearAll) return;
                this.parseSubs.subList.map( item => item.hovering = false );
            },
            setData(idx) {

            },
            initFont(data) {//设置字体组件
                const list = Object.keys( data ), idx = this.parseSubs.subList.findIndex( item => item.hovering );
                if (idx < 0) return;
                list.map( item => {
                    this.parseSubs.subList[idx][item] = data[item];
                    if (item === 'flexDirection') {
                        const w = this.parseSubs.subList[idx].w, h = this.parseSubs.subList[idx].h;
                        this.parseSubs.subList[idx].w = h;
                        this.parseSubs.subList[idx].h = w;
                    }
                } )
            },
            setBlur(e, idx) {
                const detail = e.target.innerText;
                this.parseSubs.subList[idx].title=detail;
            },
            changetz(idx) {//贴纸类目
                if (this.tzType === idx) return;
                this.tzType = idx;
                // this.iconList = [];
                // this.$nextTick( () => {
                //     this.iconList = this.ttList[idx].list
                // } )
            },
            addImgsSub(url) {
                this.loading.show = true;
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    const [w, h] = [this.parseSubs.bW * 0.4, this.parseSubs.bW * 0.4 * oImg.height / oImg.width]
                    let data = {
                        type: 3,//图片组件
                        title: '图片组件',
                        w,
                        h,
                        x: this.parseSubs.bW / 2 - w / 2,
                        y: this.parseSubs.bH / 2 - h / 2,
                        id: `img${Math.random()}`,
                        rotate: 0,
                        useImg: url,
                        pro: url,
                        ori: url,
                        proObj: oImg,////抠图过加载后的对象
                        hovering: false,
                        // zIndex: this.parseSubs.subList[this.parseSubs.subList.length - 1].zIndex + 1,
                        mattingType: -1,//抠图模式
                    }
                    this.parseSubs.subList.push( data );
                    this.loadStatus( this.parseSubs.subList[this.parseSubs.subList.length - 1] )
                };
                oImg.src = url + `?id=${Math.random()}`

            },
            mattingImgs(idx) {//抠图
                if (idx === -1) this.dialogVisible = true;
                else this.mattingbyUrl( idx )
            },
            effectsImg(data) {//添加特效
                let idx = this.parseSubs.subList.findIndex( item => item.hovering ), list = Object.keys( data );
                if (idx > -1) {
                    list.map( item => {
                        this.parseSubs.subList[idx][item] = data[item]
                    } )
                    // this.parseSubs.subList[idx].useImg=data.url;
                }
                this.$nextTick( () => {
                    this.loading.show = false;
                } )

            },
            loadings(v) {
                this.loading.show = v;
            },
            upLoad(k) {//上传图片（k值0自定义背景，1人像抠图 2物体抠图）
                // if (k === 0) {
                //     this.$confirm( `确定要重新上传主图重新制作么, 是否继续?`, '提示', {
                //         showClose: false,
                //         confirmButtonText: '确定',
                //         cancelButtonText: '取消',
                //         type: 'warning'
                //     } ).then( () => {
                //         this.upType = k;
                //         this.$refs.selfImg.click()
                //     } ).catch( () => {
                //
                //     } );
                // } else {
                this.upType = k;
                this.$refs.selfImg.click()
                // }
            },
            changeselfImg(e) {//input chang事件
                const file = e.target.files[0];
                if (!file) return;
                if (this.upType === -1) this.initSelfImg( file );
                else {
                    // this.parseSubs.subList = [];
                    this.upimgsLoad( file );
                }
            },
            upimgsLoad(file) {//上传图片抠图
                if (!file) return;
                this.loading.show = true;
                if (this.upType === 0) {
                    this.initUpImgs( file )
                    return
                }
                this.edrieImgInfo.filename = file.name;
                let param = new FormData();
                param.append( 'file', file );
                param.set( 'mattingType', this.upType );
                uploadImgApi( param ).then( res => {
                    if (!res.code) {
                        this.edrieImgInfo.fileId = res.data.fileId;//此次抠图的结果图id
                        if (res.data.status == 'success') {
                            this.edrieImgInfo.pro = res.data.bgRemovedPreview;
                            this.edrieImgInfo.ori = res.data.original;
                            this.edrieImgInfo.imageMsg = res.data;
                            this.initSize();
                            this.showUpload = false;
                        } else setTimeout( this.pollingImg, 2000 )//有排队情况，轮训查看（可以websocket）
                    }
                } ).catch( re => this.loading.show = false )
            },
            pollingImg() {//轮询
                getMattingInfo( {fileId: this.edrieImgInfo.fileId} ).then( res => {//根据id查询
                    if (!res.code) {
                        if (res.data.status === 'success') {
                            this.edrieImgInfo.pro = res.data.bgRemovedPreview;
                            this.edrieImgInfo.ori = res.data.original;
                            this.edrieImgInfo.imageMsg = res.data;
                            this.initSize();
                            this.showUpload = false;
                        } else {
                            this.loading.text = `当前排队位置为 ${res.data.queueNumber}，请稍后...`
                            setTimeout( this.pollingImg, 2000 )
                        }
                    }
                } ).catch( re => this.loading.show = false )
            },
            pollingImg2() {//轮询
                getMattingInfo( {fileId: this.mattingMsg.id} ).then( res => {//根据id查询
                    if (!res.code) {
                        if (res.data.status === 'success') {
                            const idx = this.parseSubs.subList.findIndex( item => item.hovering );
                            this.parseSubs.subList[idx].pro = res.data.bgRemovedPreview;
                            this.parseSubs.subList[idx].useImg = res.data.bgRemovedPreview;
                            this.parseSubs.subList[idx].mattingType = this.mattingMsg.type;
                            let oImg = new Image();
                            oImg.crossOrigin = '';
                            oImg.onload = () => {
                                this.parseSubs.subList[idx].proObj = oImg;
                                this.loadStatus( this.parseSubs.subList[idx], idx )
                            };
                            oImg.src = res.data.bgRemovedPreview + `?id=${Math.random()}`;
                            // this.hoverThis( idx )//特效也需要替换
                        } else {
                            this.loading.text = `当前排队位置为 ${res.data.queueNumber}，请稍后...`
                            setTimeout( this.pollingImg2, 2000 )
                        }
                    }
                } ).catch( re => this.loading.show = false )
            },
            mattingbyUrl(type) {
                this.loading.show = true;
                this.mattingMsg.type = type;
                let obj = {url: type === 4 ? this.hoverSub.pro : this.hoverSub.ori, mattingType: type};
                copyUpload( obj ).then( res => {
                    if (!res.code) {
                        this.mattingMsg.id = res.data.fileId;
                        if (res.data.status == 'success') {
                            const idx = this.parseSubs.subList.findIndex( item => item.hovering );
                            this.parseSubs.subList[idx].mattingType = type;
                            this.parseSubs.subList[idx].pro = res.data.bgRemovedPreview;
                            this.parseSubs.subList[idx].useImg = res.data.bgRemovedPreview;
                            let oImg = new Image();
                            oImg.crossOrigin = '';
                            oImg.onload = () => {
                                this.parseSubs.subList[idx].proObj = oImg;
                                this.loadStatus( this.parseSubs.subList[idx], idx )
                            };
                            oImg.src = res.data.bgRemovedPreview + `?id=${Math.random()}`;
                            // this.hoverThis( idx )//特效也需要替换
                        } else setTimeout( this.pollingImg2, 2000 )//有排队情况，轮训查看（可以websocket）
                    }
                } ).catch( re => this.loading.show = false )
            },
            initMainSub() {
                const idx = this.parseSubs.subList.findIndex( item => item.type === 1 ), data = {
                    type: 1,//主图
                    x: 0,
                    y: 0,
                    id: 0,
                    rotate: 0,
                    w: this.edrieImgInfo.imageMsg.originalWidth * parseFloat( this.parseSubs.scale ),
                    h: this.edrieImgInfo.imageMsg.originalHeight * parseFloat( this.parseSubs.scale ),
                    hovering: false,
                    // zIndex: 1,
                    useImg: this.edrieImgInfo.pro,//显示用的
                    ori: this.edrieImgInfo.ori,//原图
                    pro: this.edrieImgInfo.pro,//抠图过后的
                    proObj: null,////抠图过加载后的对象
                    mattingType: 0
                };
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    data.proObj = oImg;
                    data.x = (this.parseSubs.bW / 2 - data.w / 2);
                    data.y = (this.parseSubs.bH / 2 - data.h / 2);
                    if (idx > -1) this.parseSubs.subList.splice( idx, 1, data );
                    else this.parseSubs.subList.push( data );
                    this.loadStatus( data )
                };
                oImg.src = this.edrieImgInfo.pro + `?id=${Math.random()}`;

            },
            initSelfImg(file) {//自定义背景加载后对象储存
                this.loading.show = true;
                let formData = new FormData(), yw = this.parseSubs.bW + 100, yh = this.parseSubs.bH + 100;
                formData.append( 'file', file );
                uploadossBg( formData ).then( res => {
                    let data = {
                        type: 0,//背景
                        rotate: 0,
                        hovering: false,
                        // zIndex: 0,
                        id: `img${Math.random()}`,
                        useImg: res.data,
                        pro: res.data,
                        ori: res.data,
                        proObj: null,////抠图过加载后的对象
                        mattingType: -1,
                    }, oImg = new Image();
                    oImg.crossOrigin = '';
                    oImg.onload = () => {
                        // data.w = oImg.width > oImg.height ? yw : yh * oImg.width / oImg.height;
                        data.w = yw > yh ? yw : yh * oImg.width / oImg.height;
                        // data.h = oImg.width > oImg.height ? yw * oImg.height / oImg.width : yh;
                        data.h = yw > yh ? yw * oImg.height / oImg.width : yh;
                        data.x = this.parseSubs.bW / 2 - data.w / 2;
                        data.y = this.parseSubs.bH / 2 - data.h / 2;
                        data.proObj = oImg;
                        const idx = this.parseSubs.subList.findIndex( item => item.type === 0 );
                        if (idx > -1) this.parseSubs.subList.splice( idx, 1, data );
                        else this.parseSubs.subList.unshift( data );
                        this.loadStatus( data );
                    };
                    oImg.src = res.data;
                } )
            },
            loadStatus(data, k) {//加载特效，并保存store
                console.log(data)
                let oCan = document.createElement( 'canvas' ), list = Array.from( {length: 9}, v => '' );
                let oCanTxt = oCan.getContext( '2d' );
                oCan.width = data.proObj.width;
                oCan.height = data.proObj.height;
                oCanTxt.drawImage( data.proObj, 0, 0 );
                list.map( (item, idx) => {
                    const pro = oCanTxt.getImageData( 0, 0, data.proObj.width, data.proObj.height );
                    if (!idx) list[idx] = data.ori;
                    else if (idx === 1) list[idx] = data.pro;
                    else if (idx === 2) list[idx] = this.jsMulitData( pro, 'emboss', );
                    else if (idx === 3) list[idx] = this.jsMulitData( pro, 'grayscale', );
                    else if (idx === 4) list[idx] = this.jsMulitData( pro, 'dither', );
                    else if (idx === 5) list[idx] = this.jsMulitData( pro, 'triangleripple', );
                    else if (idx === 6) list[idx] = this.jsMulitData( pro, 'blur', {amount: 5.0} );
                    else if (idx === 7) list[idx] = this.jsMulitData( pro, 'threshold', {threshold: 100} );
                    else if (idx === 8) list[idx] = this.jsMulitData( pro, 'twirl', {
                        radius: data.proObj.width,
                        angle: 90,
                        centerX: 0.5,
                        centerY: 0.5
                    } );
                    if (!list.some( item => item === '' )) {
                        this.$store.commit( 'SET_EFFECTSIMG', {id: data.id, list: list} );
                        if (k > -1) this.hoverThis( k );
                        this.loading = {show: false, text: '处理中...'}
                    }
                } )
            },
            jsMulitData(proData, name, obj = {}) {
                let ocan = document.createElement( 'canvas' ), newImgdata = proData;
                let ocanTxt = ocan.getContext( '2d' );
                jsMulit[name].filter( newImgdata, obj );
                ocan.width = proData.width;
                ocan.height = proData.height;
                ocanTxt.putImageData( newImgdata, 0, 0 );
                return ocan.toDataURL()
            },
            goback(k) {//前进(k=1)   返回(k=0)
                if (this.historyList.length < 2) return;
                const idx = this.historyList.findIndex( item => item.id === this.hisIdx );
                if ((!k && idx < 1) || (k && idx + 1 > (this.historyList.length - 1))) return;
                const nexidx = k ? idx + 1 : idx - 1;//下一个点或上一个点的下标

            },
            choseBackColor(color, index) {//4种背景切换（透明、纯色、黑白、模糊）
                const idx = this.parseSubs.subList.findIndex( item => item.type === 0 )
                if (!index) this.showcolorList = !this.showcolorList;
                else if (index === 1) this.parseSubs.subList.splice( idx, 1 )//透明背景
                else {
                    if (idx > -1) this.$set( this.parseSubs.subList[idx], 'backColor', color )
                    else this.parseSubs.subList.push( {type: 0, backColor: color, id: `back${Math.random()}`,} )
                }
                if (index) {
                    this.showcolorList = false;
                    this.choseBack = index;
                }
            },
            moveBack(ev, idx) {
                this.openclearAll = false;
                const oDivs = document.querySelector( `.otherSubs` ),
                    oSubs = document.querySelector( `.otherSubs .items:nth-child(${idx + 1})` ),
                    oright = document.getElementById( 'e_r' ).getBoundingClientRect();
                this.parseSubs.subList.map( item => item.hover = false );
                this.parseSubs.subList[idx].hover = true;
                let oDiv = this.parseSubs.subList[idx].type ? document.querySelector( `.otherSubs .items:nth-child(${idx + 1})` ) : document.querySelector( '.initBack' );
                let [x, y] = [ev.clientX - oDiv.offsetLeft, ev.clientY - oDiv.offsetTop];
                let [w, h, top, left] = [oDiv.offsetWidth, oDiv.offsetHeight, oDiv.offsetTop, oDiv.offsetLeft];
                document.onmousemove = (e) => {
                    const xx = oSubs.offsetLeft + oDivs.offsetLeft - this.parseSubs.bW / 2 + this.parseSubs.subList[idx].w / 2,
                        yy = oSubs.offsetTop + oDivs.offsetTop - this.parseSubs.bH / 2 + this.parseSubs.subList[idx].h / 2;
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
                        this.parseSubs.subList[idx].rotate = d;
                    } else if (cn.includes( 'iOne' )) {
                        this.parseSubs.subList[idx].h = h - (mx2 - mx);
                        this.parseSubs.subList[idx].y = top + (mx2 - mx);
                    } else if (cn.includes( 'iTwo' )) {
                        this.parseSubs.subList[idx].w = w - (mx2 - mx);
                    } else if (cn.includes( 'iTh' )) {
                        this.parseSubs.subList[idx].h = h - (mx2 - mx);
                    } else if (cn.includes( 'iFor' )) {
                        this.parseSubs.subList[idx].w = w - (mx2 - mx);
                        this.parseSubs.subList[idx].x = left + (mx2 - mx);
                    } else if (cn.includes( 'iFive' )) {
                        this.parseSubs.subList[idx].w = w - (mx2 - mx);
                        this.parseSubs.subList[idx].h = (w - (mx2 - mx)) * h / w;
                        this.parseSubs.subList[idx].y = top + (h - (w - (mx2 - mx)) * h / w);
                    } else {
                        this.parseSubs.subList[idx].x = l;
                        this.parseSubs.subList[idx].y = t;
                    }

                }
                document.onmouseup = (e) => {
                    document.onmousemove = null;
                    document.onmouseup = null;
                    this.$nextTick( () => {
                        this.openclearAll = true;
                    } )
                }

            },
            choseColor(color) {//选择颜色背景，颜色选择器
                this.choseBack = 0;
                const idx = this.parseSubs.subList.findIndex( item => item.type === 0 );
                if (idx > -1) this.$set( this.parseSubs.subList[idx], 'backColor', color );
                else this.parseSubs.subList.push( {type: 0, backColor: color, id: `back${Math.random()}`,} );
            },
            changeSelecType(idx) {
                if (this.selectType === idx || !this.edrieImgInfo.pro) return;
                this.selectType = idx;

            },
            changeBgType(idx) {//切换背景图片的类型
                if (this.bgType === idx) return;
                this.bgType = idx;
                this.oneItemBg2 = [];//防止网速慢图片转换不过来，所有先清空
                if (this.imgList[this.bgType].length > 0) {
                    this.$nextTick( () => {
                        this.oneItemBg2 = this.imgList[idx]
                    } )
                } else {
                    catImgList( {catId: this.imgCatList[this.bgType].id} ).then( res => {
                        this.oneItemBg2 = res.data.content;
                        this.imgList[this.bgType] = res.data.content;
                    } )
                }
                this.$refs.bTypeList.style.left = -(this.bgType - 1) * 80 + 'px'
            },
            moveItem(k) {
                if ((!k && !this.bgType) || (k && this.bgType === this.imgList.length - 1)) return;
                const l = k ? this.bgType + 1 : this.bgType - 1;
                this.changeBgType( l )
            },
            selectBg(item, ix) {
                this.loading.show = true;
                const idx = this.parseSubs.subList.findIndex( item => item.type === 0 ), yw = this.parseSubs.bW + 100,
                    yh = this.parseSubs.bH + 100;
                if (idx > -1 && item.url === this.parseSubs.subList[idx].useImg && !this.parseSubs.subList[idx].backColor) return;
                let data = {
                    type: 0,//背景
                    rotate: 0,
                    hovering: false,
                    // zIndex: 0,
                    useImg: item.url,
                    pro: item.url,
                    ori: item.url,
                    proObj: null,////抠图过加载后的对象
                    mattingType: -1,
                    id: idx > -1 ? this.parseSubs.subList[idx].id : this.parseSubs.subList[this.parseSubs.subList.length - 1].id + 1
                }, oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    data.w = yw > yh ? yw : yh * oImg.width / oImg.height;
                    data.h = yw > yh ? yw * oImg.height / oImg.width : yh;
                    data.x = this.parseSubs.bW / 2 - data.w / 2;
                    data.y = this.parseSubs.bH / 2 - data.h / 2;
                    data.proObj = oImg;
                    if (idx > -1) this.parseSubs.subList.splice( idx, 1, data );
                    else this.parseSubs.subList.unshift( data );
                    this.loadStatus( data );
                };
                oImg.src = item.url + `?id=${Math.random()}`;
            },
            addTextSub(item) {
                let data = {
                    type: 2,//文字组件
                    title: '可编辑文字',
                    fontFamily: 'systi',//文字类型
                    fontSize: 24,//大小
                    letterSpace: 0,//字间距
                    lineHeight: 40,//行高
                    color: '#f9f9f9',//颜色
                    backgroundColor: '',//背景色
                    fontStyle: 'initial',//是否斜体
                    textDecoration: 'initial',//下划线，删除线
                    textAlign: 'center',
                    flexDirection: 0,//0代表横向，1代表竖向
                    fontWeight: 'initial',
                    textShadow:'none',
                    w: 120,
                    h: 40,
                    id: `text${Math.random()}`,
                    rotate: 0,
                    hovering: false,
                    // zIndex: this.parseSubs.subList[this.parseSubs.subList.length - 1].zIndex + 1,
                    contenteditable: true,
                };
                if(item){
                    Object.keys(item).map(it=>{
                        data[it]=item[it]
                    })
                }
                data.x = this.parseSubs.bW / 2 - data.w / 2;
                data.y = this.parseSubs.bH / 2 - data.h / 2;
                this.parseSubs.subList.push( data );
                this.hoverThis( this.parseSubs.subList.length - 1 )
            },
            setOImg(k) {
                if (k === 6) this.parseSubs.subList.splice( this.hoverSub.idx, 1 );
                if ([7, 8].includes( k )) {
                    // let a=JSON.parse(JSON.stringify(this.parseSubs.subList)).sort((a,b)=>a.zIndex-b.zIndex),n=this.hoverSub.zIndex;
                    let list = [];
                    this.parseSubs.subList.map( (item, idx) => {
                        if (!(item.x >= this.hoverSub.x + this.hoverSub.w || item.x + item.w <= this.hoverSub.x || item.y >= this.hoverSub.y + this.hoverSub.h || item.y + item.h <= this.hoverSub.y) && idx !== this.hoverSub.idx && item.type !== 0) {
                            list.push( {...item, idx: idx} );
                        }
                    } );
                    if (list.length < 1) return;
                    if (k === 7 && this.hoverSub.idx > list[list.length - 1].idx) return;
                    if (k === 8 && this.hoverSub.idx < list[0].idx) return;
                    if (k === 7) {
                        const c = list.find( item => item.idx > this.hoverSub.idx );
                        this.parseSubs.subList.splice( c.idx + 1, 0, this.parseSubs.subList[this.hoverSub.idx] );
                        this.parseSubs.subList.splice( this.hoverSub.idx, 1 );
                    } else {
                        const d = list.findIndex( item => item.idx > this.hoverSub.idx ),
                            e = JSON.parse( JSON.stringify( this.hoverSub ) );
                        console.log( this.hoverSub.idx, list )
                        this.parseSubs.subList.splice( this.hoverSub.idx, 1 );
                        if (d < 0) {
                            this.parseSubs.subList.splice( list[list.length - 1].idx, 0, e );
                        } else {
                            console.log( list[d - 1].idx, list[d - 1] )
                            this.parseSubs.subList.splice( list[d - 1].idx, 0, e );
                        }
                    }
                }
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
            downLoadImg(e, k) {
                this.loadingInstance = this.$loading( {
                    lock: true,
                    text: '处理中，请稍后......',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                } );
                if (k) {//下载原图
                    downloadMattedImage( {fileId: this.edrieImgInfo.fileId} ).then( res => {
                        if (!res.code) {
                            this.initSmallTag( e, '次数 -1' );
                            let oImg = new Image(), c = document.createElement( 'canvas' ),
                                cc = document.createElement( 'canvas' );
                            const ct = c.getContext( '2d' ), cct = cc.getContext( '2d' );
                            oImg.crossOrigin = '';
                            oImg.onload = () => {
                                [c.width, cc.width, c.height, cc.height] = [oImg.width, oImg.width, oImg.height, oImg.height];
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
                                if (this.savepoint) {//这一步是吧最后一次放大缩小作用在原图上
                                    cct.clearRect( 0, 0, c.width, c.height );
                                    cct.putImageData( ct.getImageData( 0, 0, c.width, c.height ), 0, 0 );
                                    ct.clearRect( 0, 0, c.width, c.height );
                                    ct.drawImage( cc, this.savepoint.offsetx, this.savepoint.offsety, this.savepoint.initw, this.savepoint.inith );
                                }
                                const url = c.toDataURL();
                                this.whichDown( url )
                            }
                            oImg.src = res.data
                        }
                    } )
                    return
                }
                const url = this.cans.toDataURL();
                this.whichDown( url )
            },
            whichDown(url) {//通用提起
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
                        ctxs.fillStyle = color;
                        ctxs.fillRect( 0, 0, cans.width, cans.height );
                    }
                    if (bg) this.initBgimg( bg, cans, ctxs );
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
            changeSize(item) {//画布尺寸输入
                let oH = document.getElementById( 'e_r' ).offsetHeight * 0.6,
                    oW = document.getElementById( 'e_r' ).offsetWidth * 0.6;
                this.pxWidth = item.w;
                this.pxHeight = item.h;
                this.parseSubs.bW = item.w > item.h ? (item.w > oW ? oW : item.w) : (item.h > oH ? oH * item.w / item.h : item.w);
                this.parseSubs.bH = item.w > item.h ? (item.w > oW ? oW * item.h / item.w : item.h) : (item.h > oH ? oH : item.h);
                const idx = this.parseSubs.subList.findIndex( item => item.type === 0 );
                if (idx > -1) {
                    this.parseSubs.subList[idx].x = this.parseSubs.bW / 2 - this.parseSubs.subList[idx].w / 2;
                    this.parseSubs.subList[idx].y = this.parseSubs.bH / 2 - this.parseSubs.subList[idx].h / 2;
                }
                this.parseSubs.scale = parseFloat( this.parseSubs.bW / item.w ).toFixed( 2 );
            },
            initRestore() {//重置按钮
                // this.$confirm( `确定要重新制作么, 是否继续?`, '提示', {
                //     showClose: false,
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // } ).then( () => {
                //     const item=this.parseSubs.subList.find(item=>item.type===1);
                //     this.parseSubs.subList=[item]
                //     console.log(this.parseSubs.subList)
                // } ).catch( () => {
                // } );

            },
            initRest() {//1:1
                this.pxWidth = this.preimgObj.width;
                this.pxHeight = this.preimgObj.height;
                if (this.noOperation) this.initborder()
                this.$nextTick( () => {
                    this.oCantl = document.getElementById( `b_g` ).getBoundingClientRect()
                } )
            },
            initAllInfo() {//初始化时操作信息
                this.edrieImgInfo = JSON.parse( localStorage.getItem( 'editImg' ) )
                if (this.edrieImgInfo.bgImg) this.showUpload = true;
                else {
                    this.showUpload = false;
                    // this.initImgs( this.edrieImgInfo )
                }
                this.edrieImgInfo['type'] = this.showUpload ? 1 : 2;//1代表背景过来的，2代表抠图后过来的
            },
            reloads() {//重新上传
                this.$confirm( `确定要重置, 是否继续?`, '提示', {
                    showClose: false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                } ).then( () => {
                    const item = this.parseSubs.subList.find( item => item.type === 1 );
                    this.parseSubs.subList = [item]
                } ).catch( () => {

                } );
            },
            closeSetMap(data) {
                const idx = this.parseSubs.subList.findIndex( item => item.hovering );
                this.savepointList = data.hisList;
                this.parseSubs.subList[idx].useImg = data.img;
                this.parseSubs.subList[idx].pro = data.img;
                this.parseSubs.subList[idx].proObj = null;
                this.dialogVisible = false;
                this.publicFun( idx, idx );
                // this.hoverThis( idx )
            },
            publicFun(idx, k) {
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    this.parseSubs.subList[idx].proObj = oImg;
                    this.loadStatus( this.parseSubs.subList[idx], k );
                };
                oImg.src = this.parseSubs.subList[idx].useImg + `?id=${Math.random()}`;
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
                        mattingType: 0,//抠图模式
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
                        this.loadStatus( data )
                    };
                    oImg.src = res.data + `?id=${Math.random()}`

                } )

            },
            initSize(url) {//初始化尺寸
                let oImg = new Image(), oH = document.getElementById( 'e_r' ).offsetHeight * 0.6,
                    oW = document.getElementById( 'e_r' ).offsetWidth * 0.6;
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    this.pxWidth = oImg.width;
                    this.pxHeight = oImg.height;
                    this.parseSubs.bW = oImg.width > oImg.height ? (oImg.width > oW ? oW : oImg.width) : (oImg.height > oH ? oH * oImg.width / oImg.height : oImg.width);
                    this.parseSubs.bH = oImg.width > oImg.height ? (oImg.width > oW ? oW * oImg.height / oImg.width : oImg.height) : (oImg.height > oH ? oH : oImg.height);
                    this.parseSubs.scale = parseFloat( this.parseSubs.bW / oImg.width ).toFixed( 2 );
                    this.initMainSub()
                };
                oImg.src = this.edrieImgInfo.ori + `?id=${Math.random()}`
            },
        },
        created() {//透明背景储存

        },
        mounted() {//初始化参数
            const oDiv = document.getElementById( 'e_r' )
            this.oDiv_w = {w: oDiv.offsetWidth, h: oDiv.offsetHeight};
            if (getToken()) this.userGetscribe();
            // this.oCantl = document.getElementById( `b_g` ).getBoundingClientRect()
            // document.getElementById( 'e_r' ).addEventListener( 'wheel', this.wheelFun )
            document.addEventListener( 'click', () => {
                this.showcolorList = false
            } )
            // document.addEventListener( 'keydown', (e) => {
            //     const keynum = window.event ? e.keyCode : e.which;
            //     // console.log(keynum)
            //     if (keynum === 32) this.downSpace = true;
            // } )
            // document.addEventListener( 'keyup', (e) => {
            //     this.downSpace = false;
            //     // const  keynum = window.event ? e.keyCode : e.which;
            //     // if(keynum===32)this.downSpace=true;
            // } )
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
            background-color: #000;
            font-size: 12px;
            color: #ADAEB2;
            text-align: center;
            line-height: 1;
            padding-top: 60px;

            & > div {
                padding: 20px 0;
                position: relative;
                cursor: pointer;

                i {
                    font-size: 20px;
                    margin: 0 auto 10px;
                    display: block;
                }
            }

            .active {
                background-color: #2A2F35;
                color: #fff;
            }
        }

        .e_c {
            padding: 0 25px;
            padding-top: 80px;
            width: 230px;
            background-color: #2A2F35;
            color: #ADAEB2;

            .first {
                font-size: 12px;
                height: 100%;
                overflow-y: auto;

                .el-button {
                    background-color: $co;
                    border-color: $co;
                    color: #fff;
                    margin-bottom: 10px;
                }

                .list {
                    margin-top: 30px;
                    justify-content: space-around;

                    div {
                        position: relative;
                        width: 100px;
                        height: 100px;
                        overflow: hidden;
                        border-radius: 10px;
                        box-shadow: 0 0 2px #9c9c9c;
                        margin-bottom: 10px;

                        img {
                            position: absolute;
                            width: 100%;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                        }
                    }
                }
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
                .smallBtn {
                    margin-top: 20px;
                    margin-bottom: 35px;
                    background-color: initial;
                }

                .el-button {
                    border-color: $co;
                    background-color: #2A2F35;
                    color: $co;
                    margin-top: 20px;
                }

                .el-input {
                    margin-top: 15px;
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

                & .bordershow.cu {
                    box-shadow: 0 0 10px $co;
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
                    position: relative;
                    height: 40px;
                    overflow: hidden;
                    margin: 15px 0 20px;

                    & > i {
                        position: absolute;
                        font-size: 16px;
                        color: #fff;
                        z-index: 88;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);

                        &:last-child {
                            left: initial;
                            right: 0px;
                        }
                    }

                    & > div {
                        transition: all .3s linear;
                        position: absolute;
                        left: 0;
                        top: 0;
                        height: 100%;

                        div {
                            width: 70px;
                            margin-right: 10px;
                            border-radius: 5px;
                            overflow: hidden;
                            position: relative;

                            &:after {
                                position: absolute;
                                width: 100%;
                                height: 100%;
                                z-index: 2;
                                content: '';
                                top: 0;
                                left: 0;
                                background-color: rgba(0, 0, 0, .4);
                            }

                            img {
                                position: absolute;
                                width: 100%;
                                top: 50%;
                                left: 0;
                                transform: translateY(-50%);
                            }

                            p {
                                line-height: 40px;
                                text-align: center;
                                position: relative;
                                z-index: 10;
                                color: #fff;
                                font-weight: bold;
                            }
                        }
                    }
                }

                .bgimgs {
                    overflow-y: scroll;
                    justify-content: space-between;
                    height: 380px;

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

            .thred {
                .addText {
                    background-color: #40444D;
                    color: #e82255;
                    margin-bottom: 50px;
                }

                & > p {
                    font-size: 14px;
                    margin-bottom: 20px;
                }

                .fontList {
                    & > div {
                        width: 110px;
                        height: 110px;
                        line-height: 110px;
                        text-align: center;
                        border-radius: 10px;
                        background-color: #fff;
                        font-size: 32px;
                        margin-bottom: 10px;

                        &:first-child {
                            color: #fff;
                            text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
                            /*-webkit-text-stroke: 1px #333;*/
                        }

                        &:nth-child(2) {
                            color: #000;
                            text-shadow: 0 5px 5px #333;
                        }

                        &:nth-child(3) {
                            color: #FFD300;
                            text-shadow: 0px 0px 0 #b89800,
                            1px -1px 0 #b39400,
                            2px -2px 0 #ad8f00,
                            3px -3px 0 #a88b00,
                            4px -4px 0 #a38700,
                            5px -5px 0 #9e8300,
                            6px -6px 0 #997f00,
                            7px -7px 0 #947a00,
                            8px -8px 0 #8f7600,
                            9px -9px 0 #8a7200,
                            10px -10px 0 #856e00,
                            11px -11px 0 #806a00,
                            12px -12px 0 #7a6500,
                            13px -13px 12px rgba(0, 0, 0, 0.55),
                            13px -13px 1px rgba(0, 0, 0, 0.5);
                        }

                        &:nth-child(4) {
                            background: linear-gradient(to right, #D7A003, $co);
                            -webkit-background-clip: text;
                            color: transparent;
                            background-color: #fff;
                        }

                        &:nth-child(5) {
                            color: #E2BE62;
                            font-weight: bold;
                        }

                        &:nth-child(6) {
                            color: #333;
                            text-shadow: #E64FE8 -1px -3px, #2addfd 3px 0px; /*抖音字体效果*/
                        }

                        &:nth-child(7) {
                            color: #333;
                            font-family: "qwer";
                        }

                        &:nth-child(8) {
                            color: #2addfd;
                            text-shadow: 1px 1px 1px #000, -1px -1px 1px #fff;
                        }
                    }
                }
            }

            .fource {
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

                    span {
                        padding: 0 5px;
                    }

                    .active {
                        color: #fff;
                        border-bottom: 2px solid #fff;
                    }
                }

                .iconList {
                    div {
                        width: 70px;
                        height: 70px;
                        position: relative;
                        margin-bottom: 10px;
                        overflow: hidden;

                        img {
                            position: absolute;
                            width: 100%;
                            left: 0;
                            top: 50%;
                            transform: translateY(-50%);
                        }
                    }
                }
            }
        }

        .e_r {
            padding-top: 60px;
            flex: 1;
            position: relative;
            overflow: hidden;

            .fivePoint {
                position: absolute;
                border: 1px solid #3a8ee6;
                pointer-events: none;

                i {
                    pointer-events: initial;
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    border: 1px solid #3a8ee6;
                    background-color: #fff;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    cursor: nesw-resize;
                    z-index: 66;
                    font-size: 24px;
                    color: #000;

                    &.iOne {
                        top: 0;
                        left: 50%;
                        cursor: n-resize;
                    }

                    &.iTwo {
                        top: 50%;
                        right: 0;
                        cursor: e-resize;
                        transform: translate(50%, -50%);
                    }

                    &.iTh {
                        bottom: 0;
                        left: 50%;
                        cursor: n-resize;
                        transform: translate(-50%, 50%);
                    }

                    &.iFor {
                        top: 50%;
                        left: 0;
                        cursor: e-resize;
                    }

                    &.iFive {
                        top: 0;
                        right: 0;
                        transform: translate(50%, -50%);

                        & ~ i {
                            background-color: initial;
                            border: none;
                            cursor: pointer;
                        }
                    }

                    &.icon-shanchu {
                        top: 10px;
                        right: -25px;
                    }

                    &.icon-dashujukeshihuaico-1 {
                        top: 40px;
                        right: -25px;
                    }

                    &.icon-dashujukeshihuaico- {
                        top: 70px;
                        right: -25px;
                    }
                }

                span.downIcon {
                    pointer-events: initial;
                    position: absolute;
                    left: 50%;
                    bottom: -34px;
                    transform: translate(-50%, 0);
                    border: none;
                    letter-spacing: 0 !important;
                    background-color: initial;
                    color: #3a8ee6;
                    font-size: 18px;
                    cursor: url(../../assets/image/rotate.svg) 11 9, pointer
                }
            }

            i.teI {
                position: absolute;
                width: 12px;
                height: 12px;
                border: 1px solid #3a8ee6;
                background-color: #fff;
                border-radius: 50%;
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
                position: absolute;
                right: 5%;
                bottom: 5%;
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
                    overflow: hidden;
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
                        cursor: text;
                        position: relative;
                        z-index: 22;
                        width: 100%;
                        height: 100%;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }

        }

        .e_rLast {
            width: 220px;
            padding: 60px 20px 0;
            background-color: #fff;

            .initLast {
                padding-top: 25px;
            }

            h4 {
                font-size: 14px;
                margin-bottom: 10px;
            }

            .c_input {
                font-size: 12px;
                line-height: 38px;
                margin-bottom: 30px;

                input {
                    width: 40px;
                    border: none;
                    margin-right: 10px;
                }

                & > div {
                    padding: 0 10px;
                    border: 1px solid #E7E7E7;
                }
            }

            .jc {
                padding: 15px 30px;
                border: 1px solid #eee;
                text-align: left;
                line-height: 32px;
                font-size: 12px;
                color: #333;
                margin-bottom: 20px;

                span {
                    display: inline-block;
                    margin-right: 10px;
                }

                .active {
                    color: $co;
                }

                img {
                    display: block;
                    margin: 0 auto 5px;
                }
            }

            .jcList > div {
                width: 70px;
                height: 70px;
                background-color: #eee;
                font-size: 12px;
                color: #8a8a8a;
                text-align: center;
                margin-bottom: 5px;
                border-radius: 5px;

                i {
                    display: inline-block;
                    font-size: 24px;
                    margin: 14px auto 8px;
                }
            }
        }
    }

    .editPictures {

        .dialogs {
            padding-top: 0;
            z-index: 88;
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

            & > img {
                width: 120px;
                margin-left: 20px;
            }

            .hDown {
                margin-right: 20px;
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
    }

    .el-dialog {
        border-radius: 15px;
    }

    .zheR {
        z-index: 77;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        padding-top: 0 !important;
        background-color: rgba(255, 255, 255, .1);
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
