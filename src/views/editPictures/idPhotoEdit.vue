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
                <el-popover
                        @show="setIndex"
                        popper-class="hDown2"
                        placement="bottom"
                        trigger="click">
                    <div class="saveJpg">
                        <h3>选择下载类型</h3>
                        <strong @click="downLoadImg($event,0)">PNG格式<br>高保真，适合打印 </strong>
                        <strong @click="downLoadImg($event,1)">JPG格式<br>文件小，适合上传 </strong>
                    </div>
                    <el-button class="doo" type="primary" icon="el-icon-download" slot="reference">下载
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
                </el-popover>
            </div>
        </header>
        <div class="e_c">
            <el-scrollbar style="overflow-x: hidden;height:100%;">
            <label>选择证件照规格</label>
            <el-select v-model="photoSize" placeholder="请选择" @change="changeSize">
                <el-option
                        v-for="item in idPhotolist"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
            <label>证件照背景色</label>
            <div class="flex colors f-w">
                <div v-for="(item,idx) in noArts" :key="idx">
                     <span class="cu"
                           :style="item.val | backColor"
                           @click="selectColor(item)">
                        <i class="el-icon-check" v-show="colorType===item.val"></i>
                     </span>
                    <strong>{{item.name}}</strong>
                </div>
            </div>
            <label>证件照艺术背景色</label>
            <div class="flex colors f-w">
                <div v-for="(item,idx) in ArtList" :key="idx">
                     <span class="cu"
                           :style="item.val | backColor"
                           @click="selectColor(item)">
                        <i class="el-icon-check" v-show="colorType===item.val"></i>
                     </span>
                    <strong>{{item.name}}</strong>
                </div>
            </div>
            <label style="margin-bottom: 10px">换正装</label>
            <div class="Fbtn flex j-b" :class="{fixeds : fixeds}">
                   <span v-for="(item,idx) in ttList" :key="idx" :class="{'active' : tzType===idx}" class="cu" @click="changetz(idx)">{{item.title}}</span>
            </div>
            <div class="fource" v-loading="!classItem.length">
                    <div class="iconList flex f-w j-b a-i">
                        <div v-for="(son,ix) in classItem" :key="ix" class="cu" @click="addImgsSub(son,ix)"
                             :class="{active : tzSonUrl===son.cover}">
                            <img :src="son.cover" alt="">
                        </div>
                    </div>
            </div>
            </el-scrollbar>
        </div>
        <div class="e_r" id="e_r" @mouseup="blurAll">
            <div class="subs opas"
                 :style="{width:`${parseSubs.bW}px`,height:`${parseSubs.bH}px`,opacity:'.4',overflow:'initial'}">
                <div class="items upss" :class="{'hovers' : item.hovering}" v-for="(item,idx) in parseSubs.subList"
                     :style="item | subsStyle"
                     @mousedown.stop="moveBack($event,idx)" @click.stop="hoverThis(idx)" @mouseenter="borderFun(idx)"
                     @mouseleave="borderFun(idx,1)">
                </div>
                <div class="items" :class="{'hovers' : backSub.hovering}" :style="backSub | subsStyle"
                     v-if="selectType===1 && !backSub.backColor && backSub.idx>-1"
                     @mouseenter="borderFun(backSub.idx)" @mouseleave="borderFun(backSub.idx,1)"
                     @click.stop="hoverThis(backSub.idx)"
                     @mousedown.stop="moveBack($event,backSub.idx)">
                    <img :src="backSub.useImg" alt="">
                </div>
            </div>
            <!--            ,margin:`${-parseSubs.bH/2}px 0 0 ${-parseSubs.bW/2}px`-->
            <div class="subs otherSubs"
                 v-if="parseSubs.bW>0 && parseSubs.bH>0"
                 :style="{width:`${parseSubs.bW}px`,height:`${parseSubs.bH}px`,...colorOrbImg}">
                <div class="items upss" :class="{'hovers' : item.hovering}" v-for="(item,idx) in parseSubs.subList"
                     :style="item | subsStyle"
                     @mousedown.stop="moveBack($event,idx)" @click.stop="hoverThis(idx)" @mouseenter="borderFun(idx)"
                     @mouseleave="borderFun(idx,1)">
                    <el-tooltip class="item" effect="dark" content="双击修改文字" placement="top"
                                :disabled="moveNum>0 || hoverSub.contenteditable">
                        <div v-if="item.type===2" :contenteditable="item.contenteditable" class="text"
                             :class="{texsst : item.contenteditable}"
                             style="font-weight:inherit;border: 0;width:auto;height: auto;"
                             @dblclick="writeText(idx)"
                             @input="setBlur($event,idx)"
                             @blur="setBlur($event,idx,1)"
                             v-html="item.title">
                            <!--                            <div>{{}}</div>-->
                        </div>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="双击替换图片" placement="top"
                                :disabled="moveNum>0">
                        <div v-if="[1,3].includes(item.type)" class="Imgs" @dblclick="writeText(idx)">
                            <img :src="item.useImg" alt="">
                        </div>
                    </el-tooltip>
                </div>
                <div class="items initBack" :class="{'hovers' : backSub.hovering}" :style="backSub | subsStyle"
                     @click.stop="hoverThis(backSub.idx)" v-if="backSub.idx>-1 && !backSub.backColor "
                     @mouseenter="borderFun(idx)" @mouseleave="borderFun(idx,1)"
                     @mousedown.stop="moveBack($event,backSub.idx)">
                    <img :src="backSub.useImg" alt="">
                </div>
            </div>
            <!--            操作框，放大缩小，-->
            <div class="fivePoint"
                 @mousedown.stop="moveBack($event,hoverSub.idx)"
                 @click.stop="hoverThis(hoverSub.idx)"
                 v-if="hoverSub.idx>-1"
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
            <!--            <h4>智能抠图模式</h4>-->
            <!--            <div class="btns flex j-b f-w">-->
            <!--                    <span class="cu" v-for="(it,idx) in btnList" :key="idx"-->
            <!--                          :class="{'active' : hoverSub.mattingType===it.type }"-->
            <!--                          @click="mattingbyUrl(it.type)">-->
            <!--                        {{it.name}}-->
            <!--                    </span>-->
            <!--            </div>-->
            <h4>修复</h4>
            <el-button plain @click="repireImg">手工修补</el-button>
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
    import vMune from '@/components/editMune';
    import loginDialog from '@/components/login_dialog/index2';
    import mattingImg from '@/components/mattingImg';
    import {myBrowser, verticalText, getTanDeg, letterText, initSmallTag} from '@/utils';
    import {mixins} from '@/minxins';
    import opacity from '@/assets/opacity.jpg'
    import {niceScroll} from 'jquery.nicescroll';
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
    import {idPhotolist} from './subList3';
    import {clothList, childClothList, womenClothList} from './clothersList'

    export default {
        name: 'editPictures',
        mixins: [mixins],
        data() {
            return {
                fixeds:false,
                idPhotolist,
                colorList: [
                    {name: '红', val: '#FF0000'}, {name: '蓝', val: '#438edb'}, {name: '白', val: '#fff'},
                    {name: '深蓝', val: '#2a385b'},{name: '青蓝', val: '#00BFF3'},
                    {name: '渐变蓝', val: '#66B5F2,#CBE8FB'}, {name: '心动粉', val: '#F7BEB3'},
                    {name: '默契蓝', val: '#B8DDE6'}, {name: '渐变灰', val: '#999999,#FFFFFF'},
                    {name: '钟情黄', val: '#E0B97E'}, {name: '倾心绿', val: '#CCE2D6'}, {name: '希望绿', val: '#40896E'},
                    {name: '绅士红', val: '#C42134'}, {name: '文艺灰', val: '#777E90,#ABB2C5'}, {name: '高贵蓝', val: '#3F64BF'} ,
                    {name: '温暖橙', val: '#D16541'}, {name: '芭比粉', val: '#FDDAE1'},{name: '深邃黑', val: '#000000'},
                ],
                listH: document.documentElement.clientHeight,
                colorType: '',
                noeTime: new Date().getTime(),
                userInfo: {},
                photoSize: {
                    color: "#fff",
                    height: 591,
                    name: "印度签证（51*51mm）",
                    width: 591
                },
                opacity,
                openclearAll: true,
                ttList: [
                    {title: '男装', list: clothList},
                    {title: '女装', list: womenClothList},
                    {title: '童装', list: childClothList},
                ],
                classItem: [...clothList],
                loadSubObj: '',
                tzType: 0,
                tzSonUrl: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200818/9af28d937387444eb97699dc532fceb5.jpg',
                selectType: 0,//当前左侧选中菜单的下标
                fontList: [{
                    title: '描边',
                    val: {textShadow: '#333 1px 0 0, #333 0 1px 0, #333 -1px 0 0, #333 0 -1px 0'}
                }, {title: '阴影', val: {textShadow: '0 5px 5px #333'}}],//'立体', '渐变', '鎏金', '抖音', '印章', '浮雕'
                scale: '',//图片width/height比例系数
                edrieImgInfo: {
                    bgRemovedPreview: "http://deeplor.oss-cn-hangzhou.aliyuncs.com/matting_preview/2020/08/19/0263ca4fcaab42a3a8a200e8e788a7ef.png",
                    color: "#FF0000",
                    fileId: "745955",
                    filename: "一寸(25*35mm)",
                    h: "413",
                    headData: {top: 6.7, left: 162.6, bottom: 398.9, mouseY: 352.5, right: 483.2},
                    mattingType: 8,
                    ori: "http://deeplor.oss-cn-hangzhou.aliyuncs.com/matting_original/2020/08/19/083015f94bc64f54962012ef3f146c49.jpg",
                    original: "http://deeplor.oss-cn-hangzhou.aliyuncs.com/matting_original/2020/08/19/083015f94bc64f54962012ef3f146c49.jpg",
                    originalHeight: "650",
                    originalWidth: "650",
                    previewHeight: "500",
                    previewWidth: "500",
                    pro: "http://deeplor.oss-cn-hangzhou.aliyuncs.com/matting_preview/2020/08/19/0263ca4fcaab42a3a8a200e8e788a7ef.png",
                    queueNumber: "24",
                    status: "success",
                    w: "295",
                },//图片的信息（预览图尺寸，原图尺寸，下载按钮处显示的信息）
                upType: 0,//从背景库页面进入本页面时，要显示上传弹框 ，上传图片的类型 0 自定义背景  1人抠图 2物抠图
                loading: {show: false, text: '处理中...', which: 0},//loading
                loadingInstance: null,//下载时的loading效果
                dialogVisible: false,//修复弹框
                dialogVisible2: false,//登录弹框
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
                statusCode: 0,//每次掉接口的code
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
            statusCode(n, o) {
                if (n === 4003) {
                    this.dialogVisible2 = true;
                    this.statusCode = 0;
                }
            },
            mainSubid(n, o) {
                console.log( this.edrieImgInfo.fileId, '000000' )
                this.mainOri = '';
            }
        },
        components: {vMune, mattingImg, loginDialog},
        computed: {
            ...mapGetters( ['userSubscribeData', 'effectsImgList', 'showLoginDilog'] ),
            noArts() {
                return this.colorList.slice( 0, 5 )
            },
            ArtList() {
                return this.colorList.slice( 5 )
            },
            subsLength() {
                return this.parseSubs.subList.length;
            },
            mainSubid() {
                // console.log(this.parseSubs.subList)
                return this.parseSubs.subList.find( item => item.type === 1 ) ? this.parseSubs.subList.find( item => item.type === 1 ).fileId : '';
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
                const i = this.parseSubs.subList.findIndex( item => item.type === 0 );
                const item = i > -1 ? JSON.parse( JSON.stringify( this.parseSubs.subList[i] ) ) : {};
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
            }
        },
        methods: {
            ...mapActions( [
                'userGetscribe', 'showLoginDilogAction'
            ] ),
            scrollThis(e){
                const {scrollHeight,scrollTop}=e.target;
                console.log(scrollHeight,scrollTop,e)
            },
            repireImg() {
                if (this.hoverSub.idx === -1) {
                    const idx = this.parseSubs.subList.findIndex( item => item.type === 1 )
                    this.parseSubs.subList[idx].hovering = true;
                }
                ;
                this.$nextTick( _ => {
                    this.dialogVisible = true;
                } )
            },
            loginSuccess(val) {
                this.dialogVisible2 = val;
            },
            selectColor(item) {
                const ix = this.parseSubs.subList.findIndex( it => !it.type );
                this.colorType = item.val;
                this.parseSubs.subList[ix].backColor = item.val;
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
                        oImg2.src = addUrlQuery( res.data );
                    }
                    if ([1, 2, 3, 6, 8].includes( this.hoverSub.mattingType )) {
                        this.mattingbyUrl( this.hoverSub.mattingType )//1额外参数表示  替换时传参
                    } else {
                        this.parseSubs.subList[this.hoverSub.idx].useImg = res.data;
                        oImg.crossOrigin = '';
                        oImg.onload = () => {
                            this.parseSubs.subList[this.hoverSub.idx].proObj = oImg;
                            this.parseSubs.subList[this.hoverSub.idx].id = `img${Math.random()}`;
                            this.loading.show = false;
                        };
                        oImg.src = addUrlQuery( res.data );
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
                } else if ([1, 3].includes( this.parseSubs.subList[idx].type )) {
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
                if (!(!this.parseSubs.subList[idx].type && this.parseSubs.subList[idx].backColor)) this.parseSubs.subList[idx].hovering = true;
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
            changetz(idx) {//贴纸类目
                if (this.tzType === idx) return;
                this.tzType = idx;
                this.classItem = [];
                this.$nextTick( _ => {
                    this.classItem = this.ttList[idx].list
                } )
            },
            addImgsSub(son, ix) {
                if (this.tzSonUrl === son.cover) return;
                this.tzSonUrl = son.cover;
                if (!ix) {
                    this.parseSubs.subList = this.parseSubs.subList.filter( item => item.type !== 3 )
                    return
                }
                this.loading.show = true;
                this.parseSubs.subList = this.parseSubs.subList.filter( ite => [0, 1].includes( ite.type ) );
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    const mainSub = this.parseSubs.subList.find( item => item.type === 1 );//主图组件
                    const mainIdx = this.parseSubs.subList.findIndex( item => item.type === 1 );//主图组件下标
                    const headW = mainSub.w * (this.edrieImgInfo.headData.right - this.edrieImgInfo.headData.left) / this.edrieImgInfo.originalWidth;//人物头宽度
                    const [w, h] = [headW * 0.5 * oImg.width / (son.right - son.left), headW * 0.5 * oImg.width / (son.right - son.left) * oImg.height / oImg.width];//衣服变化后宽高
                    son.list.map( (item, ix) => {
                        let data = {
                            type: 3,//图片组件
                            title: '图片组件',
                            w,
                            h,
                            x: this.parseSubs.bW / 2 - ((son.right - son.left) / 2 + son.left) * w / oImg.width,
                            y: mainSub.h * this.edrieImgInfo.headData.mouseY / this.edrieImgInfo.originalHeight + mainSub.y + this.parseSubs.bH * 0.03,
                            id: `img${Math.random()}`,
                            rotate: 0,
                            useImg: item,
                            pro: item,
                            ori: item,
                            proObj: oImg,////抠图过加载后的对象
                            hovering: false,
                            mattingType: -1,//抠图模式
                        }
                        if (!ix) this.parseSubs.subList.splice( mainIdx, 0, data );
                        else this.parseSubs.subList.push( data );
                    } )

                    this.loading.show = false;
                };
                oImg.src = addUrlQuery( son.list[0] );

            },
            upLoad(k) {//上传图片（k值0自定义背景，1人像抠图 2物体抠图）
                this.upType = k;
                this.$refs.selfImg.click()
            },
            pollingImg2() {//轮询
                getMattingInfo( {fileId: this.mattingMsg.id} ).then( res => {//根据id查询
                    if (!res.code) {
                        if (res.data.status === 'success') {
                            const idx = this.parseSubs.subList.findIndex( item => item.hovering ),
                                w = this.parseSubs.subList[idx].w;
                            this.parseSubs.subList[idx].pro = res.data.bgRemovedPreview;
                            this.parseSubs.subList[idx].useImg = res.data.bgRemovedPreview;
                            this.parseSubs.subList[idx].mattingType = this.mattingMsg.type;
                            if (this.parseSubs.subList[idx].type === 1) {
                                this.tzSonUrl = 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200818/9af28d937387444eb97699dc532fceb5.jpg';
                                this.parseSubs.subList[idx].fileId = res.data.fileId;
                                this.edrieImgInfo.fileId = res.data.fileId;
                                this.edrieImgInfo.pro = res.data.bgRemovedPreview;
                                this.edrieImgInfo = {...this.edrieImgInfo, ...res.data};
                                const [ww, hh] = [parseFloat( this.edrieImgInfo.w ), parseFloat( this.edrieImgInfo.h )];
                                let scaleW = 0.55 * hh / ww;
                                let iw = ww * scaleW * this.edrieImgInfo.originalWidth / (this.edrieImgInfo.headData.right - this.edrieImgInfo.headData.left);//缩放后的图片宽
                                let ih = iw * this.edrieImgInfo.originalHeight / this.edrieImgInfo.originalWidth;
                                let top = -(ih * this.edrieImgInfo.headData.top / this.edrieImgInfo.originalHeight) + hh * 0.05;
                                let left = ww / 2 - ((this.edrieImgInfo.headData.right - this.edrieImgInfo.headData.left) / 2 + this.edrieImgInfo.headData.left) * iw / this.edrieImgInfo.originalWidth;
                                this.parseSubs.subList[idx].w = iw * this.parseSubs.scale;
                                this.parseSubs.subList[idx].h = ih * this.parseSubs.scale;
                                this.parseSubs.subList[idx].x = left * this.parseSubs.scale;
                                this.parseSubs.subList[idx].y = top * this.parseSubs.scale;
                            }
                            this.loading.show = false;
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
                let obj = {url: type === 4 ? this.hoverSub.pro : this.hoverSub.ori, mattingType: type};
                if (type === 3) obj['crop'] = 1;
                if (type === 8) obj['bodyData'] = 1;
                copyUpload( obj ).then( res => {
                    this.statusCode = res.code;
                    if (!res.code) {
                        this.mattingMsg.id = res.data.fileId;
                        if (res.data.status == 'success') {
                            const idx = this.parseSubs.subList.findIndex( item => item.hovering );
                            this.parseSubs.subList[idx].mattingType = type;
                            this.parseSubs.subList[idx].pro = res.data.bgRemovedPreview;
                            this.parseSubs.subList[idx].useImg = res.data.bgRemovedPreview;
                            if (this.parseSubs.subList[idx].type === 1) {
                                this.tzSonUrl = 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200818/9af28d937387444eb97699dc532fceb5.jpg';
                                this.parseSubs.subList[idx].fileId = res.data.fileId;
                                this.edrieImgInfo.fileId = res.data.fileId;
                                this.edrieImgInfo.pro = res.data.bgRemovedPreview;
                                this.edrieImgInfo = {...this.edrieImgInfo, ...res.data};
                                const [ww, hh] = [parseFloat( this.edrieImgInfo.w ), parseFloat( this.edrieImgInfo.h )];
                                let scaleW = 0.55 * hh / ww;
                                let iw = ww * scaleW * this.edrieImgInfo.originalWidth / (this.edrieImgInfo.headData.right - this.edrieImgInfo.headData.left);//缩放后的图片宽
                                let ih = iw * this.edrieImgInfo.originalHeight / this.edrieImgInfo.originalWidth;
                                let top = -(ih * this.edrieImgInfo.headData.top / this.edrieImgInfo.originalHeight) + hh * 0.05;
                                let left = ww / 2 - ((this.edrieImgInfo.headData.right - this.edrieImgInfo.headData.left) / 2 + this.edrieImgInfo.headData.left) * iw / this.edrieImgInfo.originalWidth;
                                this.parseSubs.subList[idx].w = iw * this.parseSubs.scale;
                                this.parseSubs.subList[idx].h = ih * this.parseSubs.scale;
                                this.parseSubs.subList[idx].x = left * this.parseSubs.scale;
                                this.parseSubs.subList[idx].y = top * this.parseSubs.scale;
                            }
                            this.loading.show = false;
                        } else setTimeout( this.pollingImg2, 2000 )//有排队情况，轮训查看（可以websocket）
                    } else this.loading.show = false;
                } ).catch( re => this.loading.show = false )
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
                let isMove = false;
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
                        if (this.parseSubs.subList[idx].type === 2 && this.parseSubs.subList[idx].contenteditable) return;
                        if (this.parseSubs.subList[idx].type === 3) {
                            this.parseSubs.subList.map( (item, i) => {
                                if (item.type === 3) {
                                    item.x = l;
                                    item.y = t;
                                }
                            } )
                        } else {
                            this.parseSubs.subList[idx].x = l;
                            this.parseSubs.subList[idx].y = t;
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
                if (k) {
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
                    this.parseSubs.subList[idx].useImg = cans.toDataURL( "image/png" );
                    this.downLoadImg2();
                };
                oImg.src = addUrlQuery( url );
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
                            this.mainOri = res.data;
                            initSmallTag( e, '次数 -1' );
                            this.userGetscribe();
                            this.initOriRepir( this.mainOri, iidx );
                        } else if (res.code === 1100) this.dialogVisible2 = true;
                    } )
                } else if (this.mainOri && this.parseSubs.subList[iidx].fileId) {
                    initSmallTag( e, '免费' );
                    this.userGetscribe();
                    this.initOriRepir( this.mainOri, iidx );
                } else {
                    // templatedownload( data ).then( res => {
                    //     if (!res.code) {
                    initSmallTag( e, '免费' );
                    // this.parseSubs.subList[iidx].useImg=res.data;
                    this.downLoadImg2();
                    // } else if (res.code === 1100) this.dialogVisible2 = true;
                    // } )
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
                    oImg.src = reg.test( item.useImg ) ? item.useImg : addUrlQuery( item.useImg );
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
                        oCanTxt.drawImage( item.lastObj, item.x / scale, item.y / scale, item.w / scale, item.h / scale );
                        oCanTxt.setTransform( 1, 0, 0, 1, 0, 0 );
                    } else if (item.type == 0 && item.backColor) {
                        const a = item.backColor.split( ',' );
                        if (a.length > 1) {
                            var gradient = oCanTxt.createLinearGradient( 0, 0, 0, oCan.height );
                            gradient.addColorStop( 0, a[0] );
                            gradient.addColorStop( 1, a[1] );
                            // 设置填充样式为渐变
                            oCanTxt.fillStyle = gradient;
                        } else oCanTxt.fillStyle = item.backColor;
                        oCanTxt.fillRect( 0, 0, oCan.width, oCan.height );
                    } else if (item.type == 2) {
                        oCanTxt.textBaseline = 'top';
                        const [w, h, x, y, size, lineHeight, letterSpacing] = [item.w / scale, item.h / scale, item.x / scale, item.y / scale, parseInt( item.fontSize / scale ), parseInt( item.lineHeight / scale ), item.letterSpacing / scale],
                            textDecoration = ['none', 'underline', 'line-through'].indexOf( item.textDecoration );
                        // console.log( item.fontStyle, item.fontWeight, size, lineHeight, item.fontFamily, `${item.fontStyle} ${item.fontWeight} ${size}px/${lineHeight}px ${item.fontFamily}`, textDecoration )
                        oCanTxt.font = `${item.fontStyle} ${item.fontWeight} ${size}px/${lineHeight}px ${item.fontFamily}`;
                        oCanTxt.translate( x + w / 2, y + h / 2 );
                        oCanTxt.rotate( item.rotate * Math.PI / 180 );
                        oCanTxt.translate( -(x + w / 2), -(y + h / 2) );
                        if (item.backgroundColor) {
                            oCanTxt.fillStyle = item.backgroundColor;
                            oCanTxt.fillRect( x, y, w, h );
                        }
                        oCanTxt.strokeStyle = '#333'/*item.color*/;
                        oCanTxt.fillStyle = item.color;
                        if (item.textShadow !== 'none' && item.textShadow.split( ',' ).length > 1) {
                            // ctx.strokeText("空心文字:stroke",10,200);
                        } else if (item.textShadow !== 'none' && item.textShadow.split( ',' ).length === 1) {
                            oCanTxt.shadowColor = '#333';
                            oCanTxt.shadowBlur = 5;
                            oCanTxt.shadowOffsetY = 5;
                            oCanTxt.shadowOffsetX = 5;
                        } else {
                            oCanTxt.shadowColor = '';
                            oCanTxt.shadowBlur = 0;
                            oCanTxt.shadowOffsetY = 0;
                            oCanTxt.shadowOffsetX = 0;
                        }
                        let stroke = (item.textShadow !== 'none' && item.textShadow.split( ',' ).length > 1) ? 2 : 1;//2描边  1填充
                        if (!item.flexDirection) {
                            let content = this.initfontList( oCanTxt, item.title, letterSpacing, w, h, item.flexDirection, size ),
                                line_size = lineHeight / 2 - size / 2;
                            if (item.textAlign === 'left') {
                                content.map( (itemSon, idx) => {
                                    oCanTxt.letterSpacingText( itemSon.str, x, y + idx * lineHeight + line_size, letterSpacing, stroke )
                                    this.initLineTo( oCanTxt, size, x, y, idx, lineHeight, itemSon, w, item.textAlign, textDecoration )
                                } )
                            } else {
                                if (content.length === 1) {
                                    item.textAlign === 'center' ? oCanTxt.letterSpacingText( content[0].str, x + w / 2 - content[0].len / 2, y + line_size, letterSpacing, stroke ) : oCanTxt.letterSpacingText( content[0].str, x + w - content[0].len, y + line_size, letterSpacing, stroke );
                                    this.initLineTo( oCanTxt, size, x, y, 0, lineHeight, content[0], w, item.textAlign, textDecoration )
                                } else {
                                    const last = content[content.length - 1];
                                    content.map( (itemSon, idx) => {
                                        const xx = item.textAlign === 'center' ? x + w / 2 - itemSon.len / 2 : x;
                                        if (idx !== content.length - 1) oCanTxt.letterSpacingText( itemSon.str, xx, y + idx * lineHeight + line_size, letterSpacing, stroke );
                                        this.initLineTo( oCanTxt, size, x, y, idx, lineHeight, itemSon, w, item.textAlign, textDecoration )
                                    } )
                                    item.textAlign === 'center' ? oCanTxt.letterSpacingText( last.str, x + w / 2 - last.len / 2, y + (content.length - 1) * lineHeight + line_size, letterSpacing, stroke ) : oCanTxt.letterSpacingText( last.str, x + w - last.len, y + (content.length - 1) * lineHeight + line_size, letterSpacing, stroke )
                                }
                            }
                        } else {
                            let content = this.initfontList( oCanTxt, item.title, letterSpacing, w, h, item.flexDirection, size ),
                                regExt = /[a-zA-Z]/g,
                                line_size = lineHeight / 2 - size / 2;
                            if (item.textAlign === 'left') {
                                content.map( (itemSon, idx) => {
                                    itemSon.str.split( '' ).map( (it, ix) => {
                                        oCanTxt.fillTextVertical( it, x + w - (lineHeight - line_size) - idx * lineHeight + size / 2, y + ix * letterSpacing + size, stroke )
                                        // stroke === 1 ? oCanTxt.fillText( it, x + w - (lineHeight - line_size) - idx * lineHeight, y + ix * letterSpacing + ix * size ) : oCanTxt.strokeText( it, x + w - idx * lineHeight + line_size, y + ix * letterSpacing + ix * size );
                                    } )
                                    this.initLineTo2( oCanTxt, size, x, y, idx, lineHeight, line_size, itemSon, w, h, item.textAlign, textDecoration )
                                } )
                            } else {
                                if (content.length === 1) {
                                    content[0].str.split( '' ).map( (it, ix) => {
                                        const yc = item.textAlign === 'center' ? y + ix * letterSpacing + oCanTxt.measureText( content[0].str.substring( 0, ix ) ).width + h / 2 - content[0].len / 2 : y + ix * letterSpacing + oCanTxt.measureText( content[0].str.substring( 0, ix ) ).width;
                                        // console.log( yc, oCanTxt.measureText( content[0].str.substring( 0, ix ) ).width, ix * size, 22222 )
                                        oCanTxt.fillTextVertical( it, x + w - (lineHeight - line_size) + size / 2, yc, stroke )
                                        // stroke === 1 ? oCanTxt.fillText( it, x + w - (lineHeight - line_size), yc ) : oCanTxt.strokeText( it, x + w + line_size, yc );
                                    } )
                                    this.initLineTo2( oCanTxt, size, x, y, 0, lineHeight, line_size, content[0], w, h, item.textAlign, textDecoration )
                                } else {
                                    const last = content[content.length - 1];
                                    content.map( (itemSon, idx) => {
                                        if (idx !== content.length - 1) {
                                            itemSon.str.split( '' ).map( (it, ix) => {
                                                const yc = item.textAlign === 'center' ? y + ix * letterSpacing + oCanTxt.measureText( content[idx].str.substring( 0, ix ) ).width + h / 2 - content[idx].len / 2 : y + ix * letterSpacing + oCanTxt.measureText( content[idx].str.substring( 0, ix ) ).width;
                                                oCanTxt.fillTextVertical( it, x + w - (lineHeight - line_size) - idx * lineHeight + size / 2, yc, stroke )
                                                // stroke === 1 ? oCanTxt.fillText( it, x + w - (lineHeight - line_size) - idx * lineHeight, yc ) : oCanTxt.strokeText( it, x + w - idx * lineHeight + line_size, yc );
                                            } )
                                        }
                                        this.initLineTo2( oCanTxt, size, x, y, idx, lineHeight, line_size, itemSon, w, h, item.textAlign, textDecoration )
                                    } )
                                    last.str.split( '' ).map( (it, ix) => {
                                        const ys = item.textAlign === 'center' ? y + ix * letterSpacing + oCanTxt.measureText( last.str.substring( 0, ix ) ).width + h / 2 - last.len / 2 : y + ix * letterSpacing + oCanTxt.measureText( last.str.substring( 0, ix ) ).width;
                                        oCanTxt.fillTextVertical( it, x + w - (lineHeight - line_size) - (content.length - 1) * lineHeight + size / 2, ys, stroke )
                                        // stroke === 1 ? oCanTxt.fillText( it, x + w - (lineHeight - line_size) - (content.length - 1) * lineHeight, ys ) : oCanTxt.strokeText( it, x + w - (content.length - 1) * lineHeight + line_size, ys );
                                    } )
                                }
                            }
                        }
                        oCanTxt.setTransform( 1, 0, 0, 1, 0, 0 );
                    }
                } )
                if (!dOrr) this.downLoad( oCan )
            },
            initfontList(oCanTxt, str, letterSpacing, w, h, flexDirection, size) {
                let str1 = str.replace( /\<span.*?>(.*?)<\/span>/g, '$1' )//去除span标签
                let arr = (str1.replace( /\&nbsp;/g, ' ' )).replace( /\<\/div>/g, "" ).split( '<div>' ), lastArr = [];//根据几个子div，判断有几个内容，每个内容都必须另起一行，再然后每个内容在判断是否要换行
                if (!flexDirection) {
                    arr.map( itemP => {
                        if (oCanTxt.measureText( itemP ).width + (itemP.length - 1) * letterSpacing <= w) lastArr.push( {
                            str: itemP,
                            len: oCanTxt.measureText( itemP ).width + (itemP.length - 1) * letterSpacing
                        } );
                        else {
                            const listSon = itemP.split( '' );
                            let brr = listSon.reduce( (pre, item, idx) => {
                                const w1 = oCanTxt.measureText( item ).width,
                                    w2 = pre.str !== '' ? oCanTxt.measureText( pre.str ).width + (pre.str.length - 1) * letterSpacing : 0;
                                if (w2 + letterSpacing + w1 > w && idx !== listSon.length - 1) {
                                    pre.list.push( {str: pre.str, len: w2} );
                                    pre.str = item;
                                } else if (idx === listSon.length - 1 && w2 + letterSpacing + w1 <= w) {
                                    pre.list.push( {str: pre.str + item, len: w2 + w1 + letterSpacing} );
                                    pre.str = '';
                                } else if (idx === listSon.length - 1 && w2 + letterSpacing + w1 > w) {
                                    pre.list.push( {str: pre.str, len: w2} );
                                    pre.list.push( {str: item, len: w1} );
                                    pre.str = item;
                                } else pre.str = pre.str + item;
                                return pre
                            }, {str: '', list: []} )
                            lastArr = [...lastArr, ...brr.list]
                        }
                    } )
                } else {
                    arr.map( itemP => {
                        if (oCanTxt.measureText( itemP ).width + (itemP.length - 1) * letterSpacing <= h) lastArr.push( {
                            str: itemP,
                            len: oCanTxt.measureText( itemP ).width + (itemP.length - 1) * letterSpacing
                        } );
                        else {
                            const listSon = itemP.split( '' );
                            let brr = listSon.reduce( (pre, item, idx) => {
                                const w1 = size,
                                    w2 = pre.str !== '' ? oCanTxt.measureText( pre.str ).width + (pre.str.length - 1) * letterSpacing : 0;
                                if (w2 + letterSpacing + w1 > h && idx !== listSon.length - 1) {
                                    pre.list.push( {str: pre.str, len: w2} );
                                    pre.str = item;
                                } else if (idx === listSon.length - 1 && w2 + letterSpacing + w1 <= h) {
                                    pre.list.push( {str: pre.str + item, len: w2 + w1 + letterSpacing} );
                                    pre.str = '';
                                } else if (idx === listSon.length - 1 && w2 + letterSpacing + w1 > h) {
                                    pre.list.push( {str: pre.str, len: w2} );
                                    pre.list.push( {str: item, len: w1} );
                                    pre.str = item;
                                } else pre.str = pre.str + item;
                                return pre
                            }, {str: '', list: []} )
                            lastArr = [...lastArr, ...brr.list]
                        }
                    } )
                }
                return lastArr;
            },
            initLineTo(oCanTxt, size, x, y, idx, lineHeight, itemSon, w, textAlign, textDecoration) {
                if (!textDecoration) return;
                oCanTxt.beginPath();
                oCanTxt.lineWidth = 2;
                let sx, sy, ex, ey;
                if (textAlign === 'center') {
                    sx = x + w / 2 - itemSon.len / 2;
                    sy = y + idx * lineHeight + lineHeight / 2;
                    ex = x + w / 2 - itemSon.len / 2 + itemSon.len;
                    ey = y + idx * lineHeight + lineHeight / 2;
                } else if (textAlign === 'left') {
                    sx = x;
                    sy = y + idx * lineHeight + lineHeight / 2;
                    ex = x + itemSon.len;
                    ey = y + idx * lineHeight + lineHeight / 2;
                } else {
                    sx = x + w - itemSon.len;
                    sy = y + idx * lineHeight + lineHeight / 2;
                    ex = x + w;
                    ey = y + idx * lineHeight + lineHeight / 2;
                }
                oCanTxt.moveTo( sx, textDecoration === 2 ? sy : sy + size / 2 );
                oCanTxt.lineTo( ex, textDecoration === 2 ? ey : ey + size / 2 );
                oCanTxt.stroke();
            },
            initLineTo2(oCanTxt, size, x, y, idx, lineHeight, line_size, itemSon, w, h, textAlign, textDecoration) {
                // console.log( textDecoration )
                if (!textDecoration) return;
                oCanTxt.beginPath();
                oCanTxt.lineWidth = 2;
                let sx, sy, ex, ey;
                if (textAlign === 'center') {
                    sx = x + w - (lineHeight - line_size) - idx * lineHeight;
                    sy = y + h / 2 - itemSon.len / 2;
                    ex = x + w - (lineHeight - line_size) - idx * lineHeight;
                    ey = y + h / 2 - itemSon.len / 2 + itemSon.len;
                } else if (textAlign === 'left') {
                    sx = x + w - (lineHeight - line_size) - idx * lineHeight;
                    sy = y;
                    ex = x + w - (lineHeight - line_size) - idx * lineHeight;
                    ey = y + itemSon.len;
                } else {
                    sx = x + w - (lineHeight - line_size) - idx * lineHeight;
                    sy = y + h - itemSon.len;
                    ex = x + w - (lineHeight - line_size) - idx * lineHeight;
                    ey = y + h;
                }
                oCanTxt.moveTo( textDecoration === 2 ? sx + size / 2 : sx, sy );
                oCanTxt.lineTo( textDecoration === 2 ? ex + size / 2 : ex, ey );
                oCanTxt.stroke();
            },
            downLoad(cans) {
                const type = this.downType ? 'image/jpeg' : 'image/png';
                if (myBrowser() === 'IE' || myBrowser() === 'Edge') {//ie下载图片
                    let url = cans.msToBlob( _ => {
                    }, type );
                    let blobObj = new Blob( [url] );
                    window.navigator.msSaveOrOpenBlob( blobObj, this.edrieImgInfo.filename.replace( /.png/g, '' ) + (this.downType ? '.jpg' : '.png') );
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
                    save_link.download = this.edrieImgInfo.filename.replace( /.png/g, '' );
                    let event = document.createEvent( 'MouseEvents' );
                    event.initMouseEvent( 'click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null );
                    save_link.dispatchEvent( event );
                    this.loadingInstance.close()
                }
            },
            changeSize(val) {//画布尺寸输入
                const item = this.idPhotolist.find( it => it.name === val )
                let data = {
                    w: item.width,
                    h: item.height,
                    // pro: this.edrieImgInfo.pro,
                    // ori: this.edrieImgInfo.ori,
                    color: item.color,
                    filename: item.name,
                    // fileId: this.edrieImgInfo.fileId,
                    // mattingType: 8
                }
                this.initAllInfo( data )
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
                let obj = data ? data : JSON.parse( localStorage.getItem( 'photoMsg' ) );
                if (!obj) obj = {};
                this.edrieImgInfo = {...this.edrieImgInfo, ...obj};
                this.loading.show = true;
                this.loading.text = '加载中...';
                this.openBack = false;
                this.tzSonUrl = 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200818/9af28d937387444eb97699dc532fceb5.jpg';
                this.parseSubs.subList = [];
                this.loadSubObj = '';
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    const [w, h] = [parseFloat( this.edrieImgInfo.w ), parseFloat( this.edrieImgInfo.h )];
                    this.edrieImgInfo.oriObj = oImg;
                    let scaleW = 0.55 * h / w;//头部占尺寸的比例
                    let iw = w * scaleW * this.edrieImgInfo.originalWidth / (this.edrieImgInfo.headData.right - this.edrieImgInfo.headData.left);//缩放后的图片宽
                    let ih = iw * this.edrieImgInfo.originalHeight / this.edrieImgInfo.originalWidth;
                    let top = -(ih * this.edrieImgInfo.headData.top / this.edrieImgInfo.originalHeight) + h * 0.05;
                    let left = w / 2 - ((this.edrieImgInfo.headData.right - this.edrieImgInfo.headData.left) / 2 + this.edrieImgInfo.headData.left) * iw / this.edrieImgInfo.originalWidth;
                    let it = {
                        title: this.edrieImgInfo.filename,
                        oriW: w,
                        oriH: h,
                        isOwnTwo: 1,//证件照替换时需要调整x位置
                        id: 'is1',
                        templateId: 1,
                        cover: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200724/aa742c4ea6a045d79d3256e170c48118.png',
                        subList: [{
                            type: 0,
                            backColor: this.edrieImgInfo.color
                        }, {
                            "type": 1,
                            "title": "图片组件",
                            "w": iw,
                            "h": ih,
                            "x": left,
                            "y": top,
                            "rotate": 0,
                            "useImg": this.edrieImgInfo.pro,
                            "pro": this.edrieImgInfo.pro,
                            "ori": this.edrieImgInfo.ori,
                            "hovering": false,
                            "mattingType": 8,
                            fileId: this.edrieImgInfo.fileId,
                        }]
                    }
                    this.photoSize = this.idPhotolist.find( item => item.name === it.title ).name;
                    this.colorType = this.edrieImgInfo.color;
                    this.loadSubs( it );
                };
                oImg.src = addUrlQuery( this.edrieImgInfo.ori );
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
                oImg.src = addUrlQuery( this.parseSubs.subList[idx].useImg );
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
                    oImg.src = addUrlQuery( res.data );

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
                // dataImg=nowSub.subList.filter(item=>(item.type!==2 && !reg.test(item.useImg) && item.useImg && !item.backColor));
                // console.log(dataImg.length)
                // if(dataImg.length>0){
                //     dataImg.map(item=>{
                //         let oCan=document.createElement('canvas'),oCantxt,oImg=new Image(),formData=new FormData(),idx=nowSub.subList.findIndex(it=>it.id===item.id);
                //         oCantxt=oCan.getContext('2d')
                //         oImg.crossOrigin='';
                //         oImg.onload=()=>{
                //             oCan.width=oImg.width;
                //             oCan.height=oImg.height;
                //             oCantxt.drawImage(oImg,0,0)
                //             oCan.toBlob(blob=>{
                //                 formData.append('file',blob);
                //                 uploadossBg(formData).then(res=>{
                //                     upNum+=1;
                //                     nowSub.subList[idx].useImg=res.data;
                //                     if(upNum===dataImg.length) this.saveTempelteSub(nowSub)
                //                 })
                //             })
                //         };
                //         oImg.src=item.useImg;
                //     })
                // }else this.saveTempelteSub(nowSub)
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
                this.oriW = mItems.oriW;
                this.oriH = mItems.oriH;
                this.parseSubs = mItems;
                this.loading = {show: false, text: '处理中...'};
                this.$nextTick( _ => {
                    this.SubsDataList = [];
                    this.hisIdx = -1;
                    this.initsave();//模板加载后，重新存下数据
                    this.openBack = true;
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
            }
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
            letterText()//字间距
            verticalText()//字间距
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
            window.addEventListener( 'resize', () => {
                const oDiv = document.getElementById( 'e_r' )
                this.oDiv_w = {w: oDiv.offsetWidth, h: oDiv.offsetHeight};
            } )
            const obtn=document.querySelector('.Fbtn ').offsetTop;
            document.querySelector('.e_c .el-scrollbar__wrap').addEventListener('scroll',e=>{
               const {scrollHeight,scrollTop}=e.target;
               if(scrollTop>obtn)this.fixeds=true;
               else this.fixeds=false;
            });
            this.initAllInfo();
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

            .el-select {
                width: 100%;
                margin-bottom: 30px;
            }

            .colors {
                margin-bottom: 20px;

                & > div {
                    margin-right: 8px;
                    font-size: 12px;
                    color: #fff;
                    text-align: center;
                    line-height: 1;

                    strong {
                        display: block;
                        margin-bottom: 15px;
                    }

                    &:nth-child(5n) {
                        margin: 0;
                    }
                }

                span {
                    display: block;
                    position: relative;
                    width: 39px;
                    height: 39px;
                    border-radius: 5px;
                    margin-bottom: 6px;

                    i {
                        position: absolute;
                        font-size: 14px;
                        left: 50%;
                        color: #4254E6;
                        font-weight: bold;
                        top: 50%;
                        transform: translate(-50%, -50%);
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

            .Fbtn {
                z-index: 88;
                background-color: #2A2F35;
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
            .fixeds{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
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


                .iconList {
                    padding: 5px;
                    /*justify-content: center;*/
                    div {
                        width: 100px;
                        position: relative;
                        margin-bottom: 10px;
                        overflow: hidden;
                        background: url("http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200817/b80c2dd51d2b49e5885f8d4aff5032c6.jpg") no-repeat center;

                        /*&:nth-child(2n) {*/
                        /*    margin: 0 10px;*/
                        /*}*/

                        img {
                            display: block;
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

        }

        .e_rLast {
            width: 220px;
            padding: 80px 20px 0;
            background-color: #fff;

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
