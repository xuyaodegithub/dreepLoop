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
                <div class="list flex f-w j-b">
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
                <el-button plain icon="el-icon-plus" style="width: 100%" @click="upLoad(0)">自定义背景</el-button>
                <input type="file" name="file" accept="image/*" :multiple="false" ref="selfImg" @change="changeselfImg"
                       style="display: none;">
                <el-input v-model="seachWords" placeholder="搜索背景" suffix-icon="el-icon-search"></el-input>
                <div class="bgbtn ">
                    <!--                    <el-button v-for="(item,idx) in bgBtn" :key="idx" :type="bgType===idx ? 'primary' : ''"-->
                    <!--                               @click="changeBgType(idx)">{{item}}-->
                    <!--                    </el-button>-->
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
                    <div v-for="(item,idx) in oneItemBg2" :key="idx" class="cu" :class="{active : selectIdx===idx}"
                         @click="selectBg(item,idx)">
                        <img :src="item.url" alt="">
                    </div>
                    <p style="width: 100%;text-align: center;margin: 10px 0;">
                        图片不够？试试精确搜索一下！
                    </p>
                </div>
            </div>
            <div class="thred" v-show="selectType===2">
                <el-button plain icon="el-icon-plus" class="addText" style="width: 100%" size="small">添加文本</el-button>
                <p>字体样式</p>
                <div class="fontList flex f-w j-b">
                    <div v-for="(ite,idxs) in fontList" :key="idxs" class="cu">
                        {{ite}}
                    </div>
                </div>
            </div>
            <div class="fource" v-show="selectType===3">
                <el-button plain icon="el-icon-plus" style="width: 100%">上传自己的照片</el-button>
                <div class="Fbtn flex j-b">
                    <span v-for="(item,idx) in Fbtn" :key="idx" :class="{'active' : !idx}" class="cu">
                        {{item.name}}
                    </span>
                </div>
                <div class="iconList flex f-w j-b">
                    <div v-for="(son,ix) in iconList" :key="ix" class="cu">
                        <i class="icon iconfont" :class="son"
                           :style="{color:`${colorList[parseInt(Math.random()*colorList.length)]}`}"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="e_r" id="e_r" @click="blurAll">
            <div class="subs"
                 :style="{width:`${edrieImgInfo.imageMsg.previewWidth}px`,height:`${edrieImgInfo.imageMsg.previewHeight}px`}">
                <div class="items" :class="{'hovers' : item.hover}" v-for="(item,idx) in parseSubs.subList"
                     :style="item | subsStyle"
                     v-drag @mousedown.stop="hoverThis(idx)" @mouseup="setData(idx)" @click.stop="hoverThis(idx,2)">
                    <div v-if="item.type===2" :contenteditable="item.contenteditable" class="text"
                         @blur="setBlur($event,idx)" @dblclick.stop="openSet(idx)">{{item.title}}
                    </div>
                    <div v-if="[1,3].includes(item.type)" class="Imgs">
                        <img :src="item.useImg" alt="">
                    </div>
                    <div v-if="item.type===4" class="flex">
                        <div class="text" v-show="item.title" @blur="setBlur($event,idx)" @dblclick.stop="openSet(idx)"
                             :contenteditable="item.contenteditable">{{item.title}}
                        </div>
                        <div class="Imgs"><img :src="item.useImg" alt=""></div>
                    </div>
                    <span class="el-icon-refresh downIcon" v-show="item.hover"></span>
                    <i v-for="it in 5" :key="'a'+it" v-show="item.hover"
                       :class="{'iOne' : it===1,'iTwo' : it===2,'iTh' : it===3,'iFor' : it===4,'iFive' : it===5}"></i>
                </div>

            </div>
            <div class="nowMsg flex a-i">
                <i class="el-icon-minus cu" @click="wheelFun({deltaY:1})"></i>
                <span>{{preimgObj ? Math.round(pxWidth/preimgObj.width*100) : 0}}%</span>
                <i class="el-icon-plus cu" @click="wheelFun({deltaY:-1})"></i>
                <span class="cu" @click="initRest">1:1</span>
                <img src="../../assets/image/preview.png" alt="" class="cu" @click="initRestore">
            </div>
            <div class="loadingss" v-if="loading.show">{{loading.text}}</div>
        </div>
        <div class="e_rLast">
            <div class="initLast" v-show="![0,1,2,3].includes(hoverSub.type)">
                <h4>画布尺寸</h4>
                <div class="flex c_input j-b">
                    <div><input type="number" v-model="pxWidth" @input="changeSize(1)"><i>宽(px)</i></div>
                    <div><input type="number" v-model="pxHeight" @input="changeSize(2)"><i>高(px)</i></div>
                </div>
                <h4>画布剪裁</h4>
                <div class="jc cu">
                    <img src="@/assets/image/jcai.png" alt="">
                    <p>剪裁到边缘</p>
                </div>
                <div class="flex jcList j-b f-w">
                    <div v-for="(item,idx) in jcList" :key="idx" class="cu">
                        <i :class="item.icon"></i>
                        <p>{{item.text}}</p>
                    </div>
                </div>
            </div>
            <v-mune v-show="[1,3].includes(hoverSub.type)" ref="Munes" @mattingImgs="mattingImgs"
                    @effectsImg="effectsImg" ></v-mune>
            <f-mune v-show="hoverSub.type===2"></f-mune>
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
            <matting-img :edrieImgInfo="hoverSub" @close="closeSetMap" v-if="dialogVisible" :openScreen="openScreen" @changeScree="openScreen=!openScreen"></matting-img>
        </el-dialog>
    </div>
</template>

<script>
    // @ is an alias to /src
    import vMune from '@/components/editMune';
    import fMune from '@/components/fontMune';
    import mattingImg from '@/components/mattingImg';
    import {myBrowser, findLastIdx} from '@/utils';
    import scale from '../../assets/image/scale.png';
    import {mixins} from '@/minxins';
    import opacity from '@/assets/opacity.jpg';
    import fupa from '@/assets/image/fopa.png';
    import color from '@/assets/image/color.png';
    import JSManipulate from '@/utils/jsmanipulate.js';
    import {uploadImgApi, getMattingInfo, downloadMattedImage, catImgList, copyUpload} from '@/apis';
    import {mapGetters, mapActions} from 'vuex';
    import {getToken} from "@/utils/auth";

    export default {
        name: 'editPictures',
        mixins: [mixins],
        data() {
            return {
                showDa: 0,//canvas聚焦，显示移动框  0失焦 1聚焦  2字体
                initcolorList: [color, fupa, '#000', '#fff', '#BFBFBF', '#2862F4', '#FED835', '#28F5B4', '#F62897', '#F57B28', '#00FFFF', '#90C320'],
                e_btn_list: [//左侧菜单按钮
                    {url: 'icon-shangchuan', title: '上传'},
                    {url: 'icon-background', title: '背景'},
                    {url: 'icon-wenzi', title: '文字'},
                    {url: 'icon-tiezhi', title: '贴纸'},
                ],
                seachWords: '',
                bTypeList: [{
                    name: '风景',
                    img: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/resource/img/22/22573.png'
                }, {
                    name: '抽象绘画',
                    img: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/resource/img/16/16382.png'
                }, {name: '建筑', img: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/resource/img/14/14209.png'}, {
                    name: '户外',
                    img: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/resource/img/24/24397.png'
                }, {name: '街道', img: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/resource/img/19/19783.png'}, {
                    name: '商场',
                    img: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/resource/img/7/7505.png'
                }, {name: '会议室', img: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/resource/img/6/6764.png'}],
                jcList: [
                    {icon: 'el-icon-picture', text: '原图'},
                    {icon: 'el-icon-full-screen', text: '自定义'},
                    {icon: 'el-icon-full-screen', text: '自定义'},
                    {icon: 'el-icon-full-screen', text: '自定义'},
                    {icon: 'el-icon-full-screen', text: '自定义'},
                    {icon: 'el-icon-full-screen', text: '自定义'},
                ],
                selectType: 1,//当前左侧选中菜单的下标
                fontList: ['描边', '阴影', '立体', '渐变', '鎏金', '抖音', '印章', '浮雕'],
                Fbtn: [{name: '全部', type: 0}, {name: '卡通', type: 0}, {name: '形状', type: 0}, {name: '毕业照', type: 0},],
                iconList: ['icon-shu', 'icon-shu1', 'icon-yinliao', 'icon-konglong', 'icon-yinliao1', 'icon-regou', 'icon-nvyisheng', 'icon-qiatongxingxiang', 'icon-qiatongtouxiang', 'icon-lanqiu', 'icon-icon-test', 'icon-nanhai',],
                choseBack: 0,//背景模式下（ 透明 、纯色 、黑白、模糊）当前选中的下标
                showcolorList: false,//是否显示颜色选择的弹框
                // bgType: 1,//更换背景的类型中当前选中的下标
                selectIdx: -1,//当前选中背景的下标，初始化不选择背景   所以为-1
                cWH: {cWidth: 0, cHeight: 0},//实际canvas  width、height属性值 （和css中width height不同）
                pxWidth: 500,//初始化 canvas   css的宽（canvas的width、height属性和css中的width、height不同）此处是css表现大小
                pxHeight: 500,//初始化 canvas   css的高（canvas的width、height属性和css中的width、height不同）此处是css表现大小
                canvasinitNum: 500,//初始化基数  （控制canvas  css表现的大小  可以修改 如修改为600  则初始化时大于600的图片css会等比例缩放到600，小于600的会显示图片的尺寸）
                OriginalObj: '',//原图片加载后的对象
                preimgObj: '',//抠图后接口返回的图片加载后的对象
                scale: '',//图片width/height比例系数
                selfImg: '',//自定义背景对象
                bgobj: '',//选中的背景对象
                colorValue: '',//纯色背景
                setScale: 0,//整体放大系数（css表现的width除以实际图片的width）
                oCantl: '',//主要用于记录当前canvas相对于屏幕的位置
                historyList: [],//存放上层canvas的历史记录
                hisIdx: 0,//当前处于历史记录的哪个位置的对应记录id（储存记录时会存一个对应id）
                downType: 0,//下载时的状态 0 初始状态 1 纯色背景 2 背景图片状态
                filename: 'picture',//文件名称，下载时要是源文件名称
                downSpace: false,//是否按下了空格键
                edrieImgInfo: {imageMsg: {previewWidth: 500, previewHeight: 500}},//图片的信息（预览图尺寸，原图尺寸，下载按钮处显示的信息）
                showUpload: true,//从背景库页面进入本页面时，要显示上传弹框
                upType: 0,//从背景库页面进入本页面时，要显示上传弹框 ，上传图片的类型 0 自定义背景  1人抠图 2物抠图
                loading: {show: false, text: '处理中...'},//loading
                savepointList: [],//储存当前预览图进行擦除还原放大缩小操作的点的位置和操作类型  this.pointList方法内有详解
                loadingInstance: null,//下载时的loading效果
                dialogVisible: false,//修复弹框
                openScreen:false,//是否全屏
                parseSubs: {
                    bW: 990,
                    bH: 1500,
                    subList: [
                        {
                            type: 0,//背景
                            x: 0,
                            y: 0,
                            rotate: 0,
                            hover: false,
                            zIndex: 0,
                            useImg: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/resource/img/25/25781.png',
                            pro: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/resource/img/25/25781.png',
                            ori: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/resource/img/25/25781.png',
                            proObj:null,////抠图过加载后的对象
                        },
                        {
                            type: 2,//文字组件
                            title: '文字组件',
                            fontFamily: 'initial',//文字类型
                            size: 12,//大小
                            letterSpace: 0,//字间距
                            lineHeight: 40,//行高
                            color: '#e82255',//颜色
                            backgroundColor: '',//背景色
                            fontStyle: false,//是否斜体
                            textDecoration: '',//下划线，删除线
                            textAlign: 'center',
                            flexDirection: 1,//1代表横向，0代表竖向
                            w: 120,
                            h: 40,
                            x: 0,
                            y: 0,
                            rotate: 0,
                            hover: false,
                            zIndex: 2,
                            contenteditable: false,
                        },
                        {
                            type: 3,//图片组件
                            title: '图片组件',
                            w: 80,
                            h: 80,
                            x: 0,
                            y: 100,
                            rotate: 0,
                            useImg: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/resource/img/15/15866.png',
                            pro: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/resource/img/15/15866.png',
                            ori: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/resource/img/15/15866.png',
                            proObj:null,////抠图过加载后的对象
                            hover: false,
                            zIndex: 3
                        },
                    ],
                    fileId: '',//公用
                }
            }
        },
        components: {vMune, fMune, mattingImg},
        computed: {
            ...mapGetters( ['userSubscribeData'] ),
            hoverSub() {
                const item = this.parseSubs.subList.find( item => item.hover )
                return item ? item : {type: ''}
            },
            mainSub() {
                const item = this.parseSubs.subList.find( item => item.type === 1 )
                return item
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
                    left: item.x + 'px',
                    top: item.y + 'px',
                    zIndex: item.zIndex,
                    transform: `rotateZ(${item.rotate}deg)`,
                    width: item.w + 'px',
                    height: item.h + 'px',
                };
                if (item.type === 2) {
                    data.fontSize = item.size + 'px';
                    data.letterSpacing = item.letterSpace + 'px';
                    data.lineHeight = item.lineHeight + 'px';
                    data.color = item.color;
                    data.fontFamily = item.fontFamily;
                    data.backgroundColor = item.backgroundColor;
                    data.fontStyle = item.fontStyle ? 'italic' : 'initial';//是否是斜体
                    data.textDecoration = item.textDecoration ? item.textDecoration : 'initial';//是否是斜体
                    data.textAlign = item.textAlign;//对齐方式
                    data.width = item.flexDirection ? item.w + 'px' : item.size + 'px';//对齐方式
                    data.padding = item.flexDirection ? 0 : '0 8px';
                }
                return data
            }
        },
        methods: {
            ...mapActions( [
                'userGetscribe'
            ] ),
            hoverThis(idx, j) {
                this.parseSubs.subList.map( item => item.hover = false );
                this.parseSubs.subList[idx].hover = true;
                if (j && [0, 1, 3].includes( this.parseSubs.subList[idx].type )){
                    if(this.parseSubs.subList[idx].proObj) this.$refs.Munes.filterUrl( this.parseSubs.subList[idx] );
                    else {
                        let oImg=new Image();
                        oImg.crossOrigin='';
                        oImg.onload=()=>{
                            this.parseSubs.subList[idx].proObj=oImg;
                            this.$refs.Munes.filterUrl( this.parseSubs.subList[idx] )
                        }
                        oImg.src=this.parseSubs.subList[idx].pro+`?id=${Math.random()}`
                    }
                }
                // console.log(this.parseSubs)
            },
            blurAll() {
                this.parseSubs.subList.map( item => item.hover = false );
            },
            setData(idx) {

            },
            setBlur(e, idx) {

            },
            openSet(idx) {

            },
            mattingImgs(idx) {//抠图
                if (idx === -1) this.dialogVisible = true;
                else this.mattingbyUrl( idx )
            },
            effectsImg(url) {//添加特效
                let idx = this.parseSubs.subList.findIndex(item=>item.hover);
                if(idx>-1)this.parseSubs.subList[idx].useImg=url
            },
            upLoad(k) {//上传图片（k值0自定义背景，1人像抠图 2物体抠图）
                this.upType = k;
                this.$refs.selfImg.click()
            },
            changeselfImg(e) {//input chang事件
                const file = e.target.files[0];
                if (!this.upType) this.initSelfImg( file );
                else this.upimgsLoad( file );
            },
            upimgsLoad(file) {//上传图片抠图
                if (!file) return;
                this.loading.show = true;
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
                            this.initMainSub();
                            this.showUpload = false;
                            this.loading.show = false;
                            this.loading.text = '处理中...';
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
                            this.initMainSub();
                            this.showUpload = false;
                            this.loading.show = false;
                            this.loading.text = '处理中...';
                        } else {
                            this.loading.text = `当前排队位置为 ${res.data.queueNumber}，请稍后...`
                            setTimeout( this.pollingImg, 2000 )
                        }
                    }
                } ).catch( re => this.loading.show = false )
            },
            pollingImg2() {//轮询
                getMattingInfo( {fileId: this.fileId} ).then( res => {//根据id查询
                    if (!res.code) {
                        if (res.data.status === 'success') {
                            const idx = this.parseSubs.subList.findIndex( item => item.hover );
                            this.parseSubs.subList[idx].pro = res.data.bgRemovedPreview;
                            this.parseSubs.subList[idx].useImg = res.data.bgRemovedPreview;
                            this.parseSubs.subList[idx].proObj = null;
                            this.loading ={show:false,text:'处理中...'};
                            this.hoverThis(idx,1)//特效也需要替换
                        } else {
                            this.loading.text = `当前排队位置为 ${res.data.queueNumber}，请稍后...`
                            setTimeout( this.pollingImg2, 2000 )
                        }
                    }
                } ).catch( re => this.loading.show = false )
            },
            mattingbyUrl(type) {
                this.loading.show = true;
                let obj = {url: this.hoverSub.ori, mattingType: type};
                copyUpload( obj ).then( res => {
                    if (!res.code) {
                        this.fileId = res.data.fileId;
                        if (res.data.status == 'success') {
                            const idx = this.parseSubs.subList.findIndex( item => item.hover );
                            this.parseSubs.subList[idx].pro = res.data.bgRemovedPreview;
                            this.parseSubs.subList[idx].useImg = res.data.bgRemovedPreview;
                            this.parseSubs.subList[idx].proObj = null;
                            this.loading ={show:false,text:'处理中...'};
                            this.hoverThis(idx,1)//特效也需要替换
                        } else setTimeout( this.pollingImg2, 2000 )//有排队情况，轮训查看（可以websocket）
                    }
                } ).catch( re => this.loading.show = false )
            },
            initMainSub() {
                const idx = this.parseSubs.subList.findIndex( item => item.type === 1 ), data = {
                    type: 1,//主图
                    x: 0,
                    y: 0,
                    rotate: 0,
                    w: this.edrieImgInfo.imageMsg.previewWidth,
                    h: this.edrieImgInfo.imageMsg.previewHeight,
                    hover: false,
                    zIndex: 1,
                    useImg: this.edrieImgInfo.pro,//显示用的
                    ori: this.edrieImgInfo.ori,//原图
                    pro: this.edrieImgInfo.pro,//抠图过后的
                    proObj:null////抠图过加载后的对象
                };

                if (idx > -1) this.parseSubs.subList.splice( idx, 1, data );
                else this.parseSubs.subList.push( data );
                // this.$refs.Munes.filterUrl( this.edrieImgInfo )
            },
            initSelfImg(file) {//自定义背景加载后对象储存
                let reader = new FileReader();
                reader.readAsDataURL( file );
                //监听文件读取结束后事件
                reader.onloadend = (ev) => {
                    let imgs = new Image();
                    imgs.crossOrigin = '';
                    imgs.onload = () => {
                        this.selfImg = imgs;
                        this.drawImgAfterFirst( this.secondobj, imgs, 1 );
                        this.bgobj = '';
                        this.downType = 2
                    }
                    imgs.src = ev.target.result
                }
            },
            goback(k) {//前进(k=1)   返回(k=0)
                if (this.historyList.length < 2) return;
                const idx = this.historyList.findIndex( item => item.id === this.hisIdx );
                if ((!k && idx < 1) || (k && idx + 1 > (this.historyList.length - 1))) return;
                const nexidx = k ? idx + 1 : idx - 1;//下一个点或上一个点的下标

            },
            choseBackColor(color, index) {//4种背景切换（透明、纯色、黑白、模糊）
                if (!index) this.showcolorList = !this.showcolorList;
                else if (index === 1) this.drawImgAfterFirst( this.secondobj, this.opacity, 1 );//透明背景
                else {
                    this.colorValue = color;
                    this.drawImgAfterFirst( this.secondobj, color, 2 );
                }
                if (index) {
                    this.showcolorList = false;
                    this.choseBack = index;
                }
                console.log( this.showcolorList )
                this.downType = index > 1 ? 1 : 0;
                // else if (index === 2) this.drawStyleBg2( this.OriginalObj, this.secondobj, 1 );//背景黑白
                // else if (index === 3) this.drawStyleBg2( this.OriginalObj, this.secondobj, 2 );//背景模糊
                // else  this.showcolorList = !this.showcolorList;//打开颜色面板
            },
            choseColor(color) {//选择颜色背景，颜色选择器
                this.choseBack = 0;
                this.colorValue = color;
                this.downType = 1;
                this.drawImgAfterFirst( this.secondobj, color, 2 );
            },
            changeSelecType(idx) {//每次切换菜单都把procan上的图片保存为图片对象
                if (this.selectType === idx || !this.edrieImgInfo.pro) return;
                this.selectType = idx;

            },
            changeBgType(idx) {//切换背景图片的类型
                if (this.bgType === idx) return;
                this.bgType = idx;
                this.selectIdx = -1;
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
            selectBg(item, idx, z) {
                this.selfImg = '';//清空自定义的背景图片
                this.selectIdx = idx;
                this.choseBack = 0;
                this.downType = 2;
                // let bgimg = new Image();
                // bgimg.crossOrigin = '';
                // bgimg.onload = () => {
                //     this.bgobj = bgimg;
                //     this.drawImgAfterFirst( this.secondobj, bgimg, 1 );
                // }
                // bgimg.src = z ? this.bgList[item][idx] : item;
            },
            initCans(data) {//初始化画布
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    [this.cans.width, this.cans.height, this.bgCans.width] = [oImg.width, oImg.height, oImg.width];
                    [this.bgCans.height, this.proCans.width, this.proCans.height] = [oImg.height, oImg.width, oImg.height];
                    this.preimgObj = oImg;//预览图对象
                    this.secondobj = oImg;//未操作也赋值预览图对象
                    this.scale = oImg.width / oImg.height;
                    this.cWH.cWidth = oImg.width;
                    this.cWH.cHeight = oImg.height;
                    this.initwh = {w: oImg.width, h: oImg.height};
                    if (oImg.width >= oImg.height) {
                        this.pxWidth = oImg.width >= this.canvasinitNum ? this.canvasinitNum : oImg.width;
                        this.pxHeight = oImg.width >= this.canvasinitNum ? this.canvasinitNum / this.scale : oImg.height;
                    } else {
                        this.pxHeight = oImg.height >= this.canvasinitNum ? this.canvasinitNum : oImg.height;
                        this.pxWidth = oImg.height >= this.canvasinitNum ? this.canvasinitNum * this.scale : oImg.width;
                    }
                    this.cansTxt.drawImage( oImg, this.Offsetxy.x, this.Offsetxy.y, this.initwh.w, this.initwh.h );
                    this.proCansTxt.drawImage( oImg, 0, 0, this.proCans.width, this.proCans.height );
                    if (this.edrieImgInfo.bgImg) this.initBgInfo();//存在背景就把背景画出来
                    else this.initBgimg( this.opacity, this.bgCans, this.bgCansTxt );
                    this.historyList.push( {//初始状态存入历史内
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
                    // this.$refs.Munes.filterUrl( this.preimgObj, this.Original )
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
            // drawStyleBg(originalImgUrl, bgRemovedImgUrl, index, key, callback) {
            //     if (!key) this.drawStyleBg2( originalImgUrl, bgRemovedImgUrl, index );
            //      else if (key === 2) this.downOthers( {oldImg: originalImg, bgImg: img}, 4, callback );
            //      else if (key === 3) this.downOthers( {oldImg: originalImg, bgImg: img}, 5, callback );
            //
            // },
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
            changeSize(k) {//画布尺寸输入
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
                this.setScale = parseFloat( (this.pxWidth / this.preimgObj.width).toFixed( 1 ) ) - 1;
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
            initRest() {//1:1
                this.pxWidth = this.preimgObj.width;
                this.pxHeight = this.preimgObj.height;
                if (this.noOperation) this.initborder()
                this.$nextTick( () => {
                    this.oCantl = document.getElementById( `b_g` ).getBoundingClientRect()
                } )
            },
            initborder(x = 0, y = 0, w, h) {//周边线和缩放指针位置
                const [tw, th] = [w ? w : this.initwh.w, h ? h : this.initwh.h]
                this.$refs.oIImg.style.left = (this.Offsetxy.x + tw + x) * this.pxWidth / this.cWH.cWidth - 26 + 'px'
                this.$refs.oIImg.style.top = (this.Offsetxy.y + y) * this.pxHeight / this.cWH.cHeight + 'px'
                this.$refs.dashed.style.left = (this.Offsetxy.x + x) / this.cWH.cWidth * this.pxWidth + 'px'
                this.$refs.dashed.style.top = (this.Offsetxy.y + y) / this.cWH.cHeight * this.pxHeight + 'px'
                this.$refs.dashed.style.width = tw / this.cWH.cWidth * this.pxWidth - 2 + 'px'
                this.$refs.dashed.style.height = th / this.cWH.cHeight * this.pxHeight - 2 + 'px'
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
                this.$confirm( `确定要${this.edrieImgInfo.type === 1 ? '重新上传' : '重置'}, 是否继续?`, '提示', {
                    showClose: false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                } ).then( () => {
                    window.location.reload()
                } ).catch( () => {

                } );
            },
            closeSetMap(data) {
                const idx=this.parseSubs.subList.findIndex(item=>item.hover);
                this.savepointList=data.hisList;
                this.parseSubs.subList[idx].useImg=data.img;
                this.parseSubs.subList[idx].pro=data.img;
                this.parseSubs.subList[idx].proObj=null;
                this.dialogVisible=false;
                this.hoverThis(idx,1)
            }
        },
        created() {//透明背景储存

        },
        mounted() {//初始化参数
            // this.initAllInfo()
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

                .el-button {
                    background-color: $co;
                    border-color: $co;
                    color: #fff;
                    margin-bottom: 10px;
                }

                .list {
                    margin-top: 30px;

                    div {
                        position: relative;
                        width: 110px;
                        height: 110px;
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
                    margin-bottom: 40px;

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
                        text-align: center;

                        i {
                            display: inline-block;
                            line-height: 70px;
                            font-size: 58px;
                            max-width: 100%;
                            overflow: hidden;
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

            .loadingss {
                position: absolute;
                top: 50%;
                color: #fff;
                left: 50%;
                padding: 15px;
                font-size: 14px;
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

            .subs {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 15px #9c9c9c;
                /*overflow: hidden;*/

                i {
                    position: absolute;
                    width: 8px;
                    height: 8px;
                    border: 1px solid #3a8ee6;
                    background-color: #fff;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    cursor: nesw-resize;
                    z-index: 66;

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

                    &:last-child {
                        top: 0;
                        right: 0;
                        transform: translate(50%, -50%);
                    }
                }

                span.downIcon {
                    position: absolute;
                    left: 50%;
                    bottom: -25px;
                    transform: translate(-50%, 0);
                    border: none;
                    background-color: initial;
                    color: #3a8ee6;
                    font-size: 18px;
                    cursor: url(../../assets/image/rotate.svg) 11 9, pointer
                }

                & > img {
                    display: block;
                }

                & > .initBack {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }

                .initBack img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }

                & > div {
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

                        &:after {
                            border: 1px dashed #3a8ee6;
                        }
                    }

                    .text {
                        cursor: text;
                        position: relative;
                        z-index: 22;
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
                padding: 15px 0;
                background-color: #eee;
                text-align: center;
                line-height: 1;
                font-size: 12px;
                color: #8a8a8a;
                margin-bottom: 20px;

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
