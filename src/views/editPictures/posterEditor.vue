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
                <el-button type="primary" icon="el-icon-folder" @click="saveSubItem"
                           v-if="userInfo.userType==='admin' && loadSubObj">模板保存
                </el-button>
                <el-button class="doo" type="primary" icon="el-icon-download" @click="downLoadImg()">下载
                    <table class="downBtn">
                        <tr>{{(userSubscribeData.monthExpireDate && userSubscribeData.monthExpireDate>noeTime &&
                            userSubscribeData.monthRemaining>0) ? `包月剩余次数:${userSubscribeData.monthRemaining}` :
                            `永久剩余次数:${userSubscribeData.freeRemaining >0 ? userSubscribeData.freeRemaining : 0 }`}} <a
                                    href="userVip.html" class="cu" target="_blank"
                                    style="color: #a1a0a0;margin-left: 20px;border-bottom: 1px solid #a1a0a0;">去充值</a>
                        </tr>
                    </table>
                </el-button>
            </div>
        </header>
        <div class="e_l">
            <div v-for="(item,idx) in e_btn_list" :key="idx" :class="{active : selectType===idx}"
                 @click="changeSelecType(idx)">
                <img :src="selectType===idx ? item.securl : item.url"/>
                <span>{{item.title}}</span>
            </div>
        </div>
        <div class="e_c">
            <div class="first" v-show="selectType===4">
                <el-button type="primary" plain style="width: 100%" @click="upLoad(0)">上传</el-button>
                <!--                <p>CTRL + V粘贴图片或者URL</p>-->
                <!--                <div class="list flex f-w">-->
                <!--                    <div v-for="(it,idx) in 4" :key="idx">-->
                <!--                        <img src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/resource/img/26/26129.png" alt="">-->
                <!--                    </div>-->
                <!--                </div>-->
            </div>
            <div class="first2" v-show="selectType===0">
                <div v-if="moveIdx<0">
                    <div class="selfMoren" v-show="edrieImgInfo.pro">
                        <h4 style="color: #fff;">默认</h4>
                        <div class="selfMoren cu" style="width: 100px;margin-top: 15px;padding: 0"
                             :class="{active : loadId===-1}"
                             :style="{backgroundImage:`url(${opacity})`}" @click="reloads(1)">
                            <!--                            <i v-if="loadId===-1" class="el-icon-finished"></i>-->
                            <img style="width: 100%;" :src="edrieImgInfo.pro" fit="contain"/>
                        </div>
                    </div>
                    <div class="lists">
                        <el-scrollbar style="height: 630px;overflow-x: hidden;">
                            <div v-for="(item,idx) in subList" :key="idx" class="listsson">
                                <h4>{{item.category_name}}<span @click="getmove(idx)">更多 <i
                                        class="el-icon-arrow-right"></i></span>
                                </h4>
                                <div class="flex f-w">
                                    <div v-for="(it,ix) in item.templateList" :key="ix" @click="choseTrme(it,ix,idx)"
                                         class="cu itemT"
                                         :class="{active : loadId===it.id,noZhen : it.isOwnTwo,isblock :it.width>it.height*1.5}"
                                         :style="{backgroundColor:it.isOwnTwo? it.subList.find(its=>!its.type).backColor : ''}">
                                        <el-image style="width: 100%;" :src="it.cover" fit="contain"></el-image>
                                        <!--                                        <i v-if="loadId===it.id" class="el-icon-finished"></i>-->
                                        <div v-show="it.isOwnTwo" class="name">
                                            <p>{{it.title}}</p>
                                            <p>{{it.oriW}} X {{it.oriH}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
                <div class="moveSub lists" v-else>
                    <h4 @click="moveIdx=-1" class="cu" style="margin-bottom: 15px;"><i
                            class="el-icon-arrow-left"></i> {{subList[moveIdx].category_name}}</h4>
                    <el-scrollbar style="height: 650px;overflow-x: hidden;">
                        <div class="flex f-w">
                            <div v-for="(it,ix) in templateLists" :key="ix" @click="choseTrme(it,ix)"
                                 class="cu itemT"
                                 :class="{active : loadId===it.id,noZhen : it.isOwnTwo,isblock :it.width>it.height*1.5}"
                                 :style="{backgroundColor:it.isOwnTwo? it.subList.find(its=>!its.type).backColor : ''}">
                                <el-image style="width: 100%;" :src="it.cover" fit="contain"></el-image>
                                <!--                                <i v-if="loadId===it.id" class="el-icon-finished"></i>-->
                                <div v-show="it.isOwnTwo" class="name">
                                    <p>{{it.title}}</p>
                                    <p>{{it.oriW}} X {{it.oriH}}</p>
                                </div>
                            </div>
                        </div>
                    </el-scrollbar>
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
                <el-button plain icon="el-icon-plus" style="width: 100%" @click="upLoad(-1)">上传背景图</el-button>
                <input type="file" name="file" accept="image/*" :multiple="false" ref="selfImg" @change="changeselfImg"
                       style="display: none;">
                <el-input v-model="seachWords" placeholder="搜索背景" suffix-icon="el-icon-search"
                          @keydown.native.enter="seachBack"></el-input>
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
                <div class="flex a-i bgimgs f-w" v-loading="oneItemBg2.length<1" ref="oneItemBg2"
                     @scroll="moveoneItemBg2">
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
                <p>点击添加到页面的文本</p>
                <el-button plain icon="el-icon-plus" class="addText" style="width: 100%" size="small"
                           @click="addTextSub(3)">点击添加标题
                </el-button>
                <el-button plain icon="el-icon-plus" class="addText" style="width: 100%" size="small"
                           @click="addTextSub(2)">点击添加副标题
                </el-button>
                <el-button plain icon="el-icon-plus" class="addText" style="width: 100%" size="small"
                           @click="addTextSub(1)">点击添加正文
                </el-button>
                <p>字体样式</p>
                <div class="fontList flex f-w j-b">
                    <div v-for="(ite,idxs) in fontList" :key="idxs" class="cu" @click="addTextSub(1,ite.val,idxs)">
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
                <div class="iconList flex f-w j-b a-i">
                    <div v-for="(son,ix) in tzList" :key="ix" class="cu" @click="addImgsSub(son)">
                        <img :src="son" alt="">
                    </div>
                </div>
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
                             style="font-weight:inherit;border: 0;width:auto;height: auto;"
                             @dblclick="writeText(idx)"
                             @input="setBlur($event,idx)"
                             @blur="setBlur($event,idx,1)">
                            <div>{{item.title}}</div>
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
                        <span class="el-icon-refresh downIcon" style="z-index: 666"></span>
                    </el-tooltip>
                    <el-tooltip effect="dark" :content="it===6? '删除' : (it===7 ? '上一层' : '下一层')" placement="top"
                                v-for="it in 8" :key="'a'+it"
                                :disabled="it<6" :enterable="false">
                        <i class="teI icon iconfont"
                           @click.stop="setOImg(it)"
                           :class="{'iOne' : it===1,'iTwo' : it===2,'iTh' : it===3,'iFor' : it===4,'iFive' : it===5,'icon-shanchu' : it===6,'icon-dashujukeshihuaico-1':it===7,'icon-dashujukeshihuaico-' : it===8}"
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
            <div class="initLast" v-show="![0,1,2,3].includes(hoverSub.type)">
                <h4>画布尺寸</h4>
                <div class="flex c_input j-b">
                    <div><input type="number" v-model="oriW"
                                @input="changeSize({w:oriW,h:oriH})"><i>宽(px)</i>
                    </div>
                    <div><input type="number" v-model="oriH"
                                @input="changeSize({w:oriW,h:oriH})"><i>高(px)</i></div>
                </div>
                <h4>选择画布尺寸(px)</h4>
                <div class="jc">
                    <div v-for="(item,idx) in cansSize" :key="idx" class="cu" :class="{'active' : sizeType===idx}"
                         @click="changeSize(item,idx)"><span>{{item.text}}</span>{{item.w +'*'+ item.h}}
                    </div>
                </div>
            </div>
            <v-mune v-if="[0,1,3].includes(hoverSub.type)" ref="Munes" @mattingImgs="mattingImgs"
                    @effectsImg="effectsImg" @loading="loadings"
                    :mattingType="hoverSub.mattingType ? hoverSub.mattingType : 0"></v-mune>
            <f-mune v-show="hoverSub.type===2" @initFont="initFont" ref="fontMune"></f-mune>
        </div>
<!--        <div class="dialogs" :style="{backgroundImage: `url(${edrieImgInfo.bgImg})`}" v-if="showUpload">-->
<!--            <div class="sons">-->
<!--                <div class="title">请输入你需要替换背景的图片</div>-->
<!--                <div class="flex types">-->
<!--                    &lt;!&ndash;                    <img src="@/assets/edtwo.png" alt="" @click="upLoad(1)">&ndash;&gt;-->
<!--                    &lt;!&ndash;                    <img src="@/assets/edone.png" alt="" @click="upLoad(2)">&ndash;&gt;-->
<!--                    <el-button @click="upLoad(6)" type="primary">上传图片</el-button>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
        <div class="zheR" v-if="showUpload || loading.show"></div>
        <div class="zheR" v-if="loading.show"></div>
        <el-dialog
                :close-on-click-modal="false"
                title="修复"
                top="0vh"
                :width=" openScreen ? '95%' : '1200px'"
                :visible.sync="dialogVisible">
            <matting-img :edrieImgInfo="hoverSub" @close="closeSetMap" v-if="dialogVisible" :openScreen="openScreen"
                         @changeScree="openScreen=!openScreen"></matting-img>
        </el-dialog>
        <el-dialog
                :close-on-click-modal="false"
                top="10vh"
                width="500px"
                :visible.sync="dialogVisible2">
            <login-dialog @success="loginSuccess"></login-dialog>
        </el-dialog>
    </div>
</template>

<script>
    // @ is an alias to /src
    import vMune from '@/components/editMune';
    import fMune from '@/components/fontMune';
    import loginDialog from '@/components/login_dialog';
    import mattingImg from '@/components/mattingImg';
    import {myBrowser, findLastIdx, setRad, verticalText} from '@/utils';
    import {mixins} from '@/minxins';
    import {getTanDeg, letterText} from '@/utils'
    import _1 from '@/assets/image/1.png';
    import _11 from '@/assets/image/11.png';
    import _2 from '@/assets/image/2.png';
    import _22 from '@/assets/image/22.png';
    import _3 from '@/assets/image/3.png';
    import _33 from '@/assets/image/33.png';
    import _4 from '@/assets/image/4.png';
    import _44 from '@/assets/image/44.png';
    import _5 from '@/assets/image/5.png';
    import _55 from '@/assets/image/55.png';
    import opacity from '@/assets/opacity.jpg'
    import fupa from '@/assets/image/fopa.png';
    import color from '@/assets/image/color.png';
    import jsMulit from '@/utils/jsmanipulate.js';
    import {niceScroll} from 'jquery.nicescroll';
    import {getUserInfo, saveTemplate} from "@/apis";
    import {
        uploadImgApi,
        getMattingInfo,
        downloadMattedImage,
        templatedownload,
        catImgList,
        copyUpload,
        uploadossBg,
        templateList,
        templateDetial,
        templateCategoryList
    } from '@/apis';
    import {mapGetters, mapActions} from 'vuex';
    import {getToken} from "@/utils/auth";
    import {subList3} from './subList3';

    export default {
        name: 'editPictures',
        mixins: [mixins],
        data() {
            return {
                noeTime: new Date().getTime(),
                userInfo: {},
                opacity,
                subList: [],
                moveIdx: -1,
                openclearAll: true,
                initcolorList: [color, fupa, '#000', '#fff', '#BFBFBF', '#2862F4', '#FED835', '#28F5B4', '#F62897', '#F57B28', '#00FFFF', '#90C320'],
                e_btn_list: [//左侧菜单按钮
                    {url: _5, securl: _55, title: '模板'},
                    {url: _2, securl: _22, title: '背景'},
                    {url: _3, securl: _33, title: '文字'},
                    {url: _4, securl: _44, title: '贴纸'},
                    {url: _1, securl: _11, title: '上传'},
                    // {url: '_5',securl:'_55', title: '贴纸'},
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
                loadId: -1,//当前加载的模板下标
                loadSubObj: '',
                tzType: 0,
                selectType: 0,//当前左侧选中菜单的下标
                fontList: [{
                    title: '描边',
                    val: {textShadow: '#333 1px 0 0, #333 0 1px 0, #333 -1px 0 0, #333 0 -1px 0'}
                }, {title: '阴影', val: {textShadow: '0 5px 5px #333'}}],//'立体', '渐变', '鎏金', '抖音', '印章', '浮雕'
                iconList: [],
                choseBack: 0,//背景模式下（ 透明 、纯色 、黑白、模糊）当前选中的下标
                showcolorList: false,//是否显示颜色选择的弹框
                // bgType: 1,//更换背景的类型中当前选中的下标
                scale: '',//图片width/height比例系数
                edrieImgInfo: {
                    imageMsg: {},
                    oriObj: '',
                    pro: '',
                    ori: '',
                    filename: '皮卡智能'
                },//图片的信息（预览图尺寸，原图尺寸，下载按钮处显示的信息）
                showUpload: false,//从背景库页面进入本页面时，要显示上传弹框
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
                stopUpdata: true,
                enterIdx: -1,
                fivePoint: false,//移动时 透明
                moveNum: 0,
                loadSubing: 0,//加载模板进度
                loadIdx: [],
                templateLists:[],
                statusCode:0,//每次掉接口的code
            }
        },
        watch: {
            subsLength: {
                handler(n, o) {
                    if (this.parseSubs.subList.length > 0 && this.parseSubs.subList[this.parseSubs.subList.length - 1].type !== 2) this.parseSubs.subList.map( item => item.hovering = false );
                    if (!this.openBack) return;
                    this.initsave();
                }
            },
            statusCode(n,o){
                if(n===4003){
                    this.dialogVisible2=true;
                    this.statusCode=0;
                }
            }
        },
        components: {vMune, fMune, mattingImg,loginDialog},
        computed: {
            ...mapGetters( ['userSubscribeData', 'effectsImgList'] ),
            subsLength() {
                return this.parseSubs.subList.length;
            },
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
            enterSub() {//鼠标移入组件
                const item = this.enterIdx > -1 ? this.parseSubs.subList[this.enterIdx] : {};
                return item
            },
            rotateHover() {//旋转的hover组件
                const a = Math.cos( setRad( this.hoverSub.rotate ) ), b = Math.sin( setRad( this.hoverSub.rotate ) ),
                    c = -Math.sin( setRad( this.hoverSub.rotate ) ), d = Math.cos( setRad( this.hoverSub.rotate ) );
                return `matrix(${a}, ${b}, ${c}, ${d}, 0, 0)`;
            },
            backSub() {//背景组件
                const i = this.parseSubs.subList.findIndex( item => item.type === 0 );
                const item = i > -1 ? JSON.parse( JSON.stringify( this.parseSubs.subList[i] ) ) : {};
                item.proObj = i > -1 ? this.parseSubs.subList[i].proObj : {}
                item.idx = i;
                return item
            },
            mainx() {//内容区的left
                // let oDiv_w=document.getElementById('e_r').offsetWidth;
                return {x: this.oDiv_w.w / 2 - this.parseSubs.bW / 2, y: this.oDiv_w.h / 2 - this.parseSubs.bH / 2}
            },
            colorOrbImg() {//opacity
                if (this.backSub.backColor) return {backgroundColor: this.backSub.backColor};
                else return {backgroundImage: `url(${opacity})`, backgroundRepeat: 'repeat'};
            },
            sizeType() {
                const i = this.cansSize.findIndex( item => (item.w === parseInt( this.parseSubs.oriW ) && item.h === parseInt( this.parseSubs.oriH )) )
                return i
            },
            urlStr(){
              const url=  window.location.href
                return  url.split('?')[1] ? url.split('?')[1].includes('admin=1') : false;
            }
        },
        filters: {
            subsStyle(item) {
                let data = {
                    left: item.x === '50%' ? '50%' : parseInt( item.x ) + 'px',
                    top: item.y === '50%' ? '50%' : parseInt( item.y ) + 'px',
                    transform: `rotateZ(${item.rotate}deg)`,
                    width: parseInt( item.w ) + 'px',
                    height: parseInt( item.h ) + 'px',
                };
                if (item.type === 2) {
                    // if(item.hovering)data.top =-(parseInt( item.y )+parseInt(item.h)) + 'px';
                    data.fontSize = item.fontSize + 'px';
                    data.fontWeight = item.fontWeight;
                    data.letterSpacing = item.letterSpacing + 'px';
                    data.lineHeight = item.lineHeight + 'px';
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
        },
        methods: {
            ...mapActions( [
                'userGetscribe'
            ] ),
            loginSuccess(val){
                this.dialogVisible2=val;
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
            getmove(idx) {
                this.moveIdx = idx;
                this.templateLists=[];
                let data = {
                    category: this.subList[idx].category_name,
                    page: 1,
                    pageSize: 100
                }
                if(idx===this.subList.length-1){
                    this.templateLists=subList3;
                }else {
                    templateList(data).then(res=>{
                        this.templateLists=res.data.list;
                    })
                }
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
                    if ([1, 2, 3, 6].includes( this.parseSubs.subList[this.hoverSub.idx].mattingType )) {
                        this.mattingbyUrl( this.parseSubs.subList[this.hoverSub.idx].mattingType )
                    } else {
                        this.parseSubs.subList[this.hoverSub.idx].useImg = res.data;
                        oImg.crossOrigin = '';
                        oImg.onload = () => {
                            this.parseSubs.subList[this.hoverSub.idx].proObj = oImg;
                            this.parseSubs.subList[this.hoverSub.idx].id = `img${Math.random()}`;
                            this.loadStatus( this.parseSubs.subList[this.hoverSub.idx], this.hoverSub.idx )
                        };
                        oImg.src = res.data + `?id=${Math.random()}`
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
            hoverThis(idx) {
                this.parseSubs.subList.map( item => item.hovering = false );
                if (!(!this.parseSubs.subList[idx].type && this.parseSubs.subList[idx].backColor)) this.parseSubs.subList[idx].hovering = true;
                // if (this.parseSubs.subList[idx].type === 2) this.parseSubs.subList[idx].contenteditable = true;
                if ([0, 1, 3].includes( this.parseSubs.subList[idx].type )) {
                    this.$nextTick( () => {
                        this.$refs.Munes.filterUrl( this.parseSubs.subList[idx] );
                    } )
                } else if (this.parseSubs.subList[idx].type === 2) this.$refs.fontMune.initCanshu( this.parseSubs.subList[idx] );
                // if (this.parseSubs.subList[idx].type === 2) {
                //     this.$nextTick( () => {
                //         let oDiv = document.querySelector( `.otherSubs .items:nth-child(${idx + 1}) .text` );
                //         oDiv.focus();
                //     } )
                // }
            },
            blurAll() {
                if (!this.openclearAll) return;
                if (this.hoverSub.idx > -1 && this.hoverSub.type === 2) this.parseSubs.subList[this.hoverSub.idx].contenteditable = false;
                this.parseSubs.subList.map( item => item.hovering = false );
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
                this.$nextTick( () => {
                    let oDiv = document.querySelector( `.otherSubs .items:nth-child(${idx + 1}) .text` );
                    this.setBlur( oDiv, idx )
                } )
            },
            setBlur(e, idx, l) {
                let oDiv = document.querySelector( `.otherSubs .items:nth-child(${idx + 1}) .text` );
                const [detail, w, h] = [oDiv.innerText, oDiv.offsetWidth, oDiv.offsetHeight];
                this.parseSubs.subList[idx].w = w;
                this.parseSubs.subList[idx].h = h;
                if (l) {
                    this.parseSubs.subList[idx].title = detail;
                    this.parseSubs.subList[idx].contenteditable = false;
                    // oDiv.innerHTML=this.parseSubs.subList[idx].title;
                    // oDiv.innerHTML=this.parseSubs.subList[idx].title
                    // let oDiv = document.querySelector( `.otherSubs .items:nth-child(${idx + 1}) .text` );
                    // oDiv.innerText=detail;
                }
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
                // else if(idx===5)
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
                    this.initsave()
                } )

            },
            loadings(v) {
                this.loading.show = v;
            },
            upLoad(k) {//上传图片（k值0自定义背景，1人像抠图 2物体抠图）
                this.upType = k;
                this.$refs.selfImg.click()
            },
            seachBack() {
                if (!this.seachWords) return;
                this.stopUpdata = false;
                this.oneItemBg2 = [];
                this.page = 1;
                this.initseach();
            },
            initseach() {
                let data = {
                    label: this.seachWords,
                    page: this.page
                }
                catImgList( data ).then( res => {
                    this.oneItemBg2 = data.page === 1 ? res.data.content : [...this.oneItemBg2, ...res.data.content];
                    this.stopUpdata = res.data.content.length < 60 ? true : false;
                } )
            },
            moveoneItemBg2() {
                let h = this.$refs.oneItemBg2.offsetHeight, sc = this.$refs.oneItemBg2.scrollTop,
                    fh = this.$refs.oneItemBg2.scrollHeight;
                if (h + sc >= fh - 20 && !this.stopUpdata) {
                    this.page += 1;
                    this.initseach();
                }
            },
            changeselfImg(e) {//input chang事件
                const file = e.target.files[0];
                if (!file) return;
                this.showUpload = false;
                this.loading.show = true;
                if (this.upType === -1) this.initSelfImg( file );
                else {
                    // this.parseSubs.subList = [];
                    this.upimgsLoad( file );
                }
            },
            upimgsLoad(file) {//上传图片抠图
                if (!file) return;
                if (this.upType === 0) {
                    this.initUpImgs( file )
                    return
                }
                this.edrieImgInfo.filename = file.name;
                let param = new FormData();
                param.append( 'file', file );
                param.set( 'mattingType', this.upType );
                uploadImgApi( param ).then( res => {
                    this.statusCode=res.code;
                    if (!res.code) {
                        this.edrieImgInfo.fileId = res.data.fileId;//此次抠图的结果图id
                        if (res.data.status == 'success') {
                            this.edrieImgInfo.pro = res.data.bgRemovedPreview;
                            this.edrieImgInfo.ori = res.data.original;
                            this.edrieImgInfo.imageMsg = res.data;
                            this.initSize();
                            this.showUpload = false;
                        } else setTimeout( this.pollingImg, 2000 )//有排队情况，轮训查看（可以websocket）
                    } else this.loading.show = false;
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
                    } else this.loading.show = false;
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
                                this.parseSubs.subList[idx].id = `img${Math.random()}`;
                                this.loadStatus( this.parseSubs.subList[idx], idx )
                            };
                            oImg.src = res.data.bgRemovedPreview + `?id=${Math.random()}`;
                            // this.hoverThis( idx )//特效也需要替换
                        } else {
                            this.loading.text = `当前排队位置为 ${res.data.queueNumber}，请稍后...`
                            setTimeout( this.pollingImg2, 2000 )
                        }
                    } else this.loading.show = false;
                } ).catch( re => this.loading.show = false )
            },
            mattingbyUrl(type) {
                this.loading.show = true;
                this.mattingMsg.type = type;
                let obj = {url: type === 4 ? this.hoverSub.pro : this.hoverSub.ori, mattingType: type};
                if (type === 3) obj['crop'] = 1;
                copyUpload( obj ).then( res => {
                    this.statusCode=res.code;
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
                                this.parseSubs.subList[idx].w = oImg.width * this.parseSubs.subList[idx].h / oImg.height;
                                this.parseSubs.subList[idx].id = `img${Math.random()}`;
                                if (this.parseSubs.isOwnTwo) {////证件照替换时需要调整x位置
                                    this.parseSubs.subList[idx].x = this.parseSubs.bW / 2 - this.parseSubs.subList[idx].w / 2;
                                }
                                // else if([1,2,6].includes(type)){
                                //     this.parseSubs.subList[idx].w=oImg.width*this.parseSubs.subList[idx].h/oImg.height;
                                // }
                                this.loadStatus( this.parseSubs.subList[idx], idx )
                            };
                            oImg.src = res.data.bgRemovedPreview + `?id=${Math.random()}`;
                            // this.hoverThis( idx )//特效也需要替换
                        } else setTimeout( this.pollingImg2, 2000 )//有排队情况，轮训查看（可以websocket）
                    } else this.loading.show = false;
                } ).catch( re => this.loading.show = false )
            },
            initMainSub(loadImg) {
                const idx = this.parseSubs.subList.findIndex( item => item.type === 1 ), data = {
                        type: 1,//主图
                        x: 0,
                        y: 0,
                        id: 0,
                        rotate: 0,
                        // w: this.edrieImgInfo.imageMsg.originalWidth * parseFloat( this.parseSubs.scale ),
                        // h: this.edrieImgInfo.imageMsg.originalHeight * parseFloat( this.parseSubs.scale ),
                        hovering: false,
                        // zIndex: 1,
                        useImg: this.edrieImgInfo.pro,//显示用的
                        ori: this.edrieImgInfo.ori,//原图
                        pro: this.edrieImgInfo.pro,//抠图过后的
                        proObj: null,////抠图过加载后的对象
                        mattingType: this.edrieImgInfo.mattingType ? this.edrieImgInfo.mattingType : 6
                    }, oH = document.getElementById( 'e_r' ).offsetHeight * 0.7,
                    oW = document.getElementById( 'e_r' ).offsetWidth * 0.7;
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    data.proObj = oImg;
                    this.parseSubs.bW = loadImg.width > loadImg.height ? (loadImg.width > oW ? oW : loadImg.width) : (loadImg.height > oH ? oH * loadImg.width / loadImg.height : loadImg.width);
                    this.parseSubs.bH = loadImg.width > loadImg.height ? (loadImg.width > oW ? oW * loadImg.height / loadImg.width : loadImg.height) : (loadImg.height > oH ? oH : loadImg.height);
                    this.parseSubs.scale = parseFloat( this.parseSubs.bW / loadImg.width );
                    // if (this.edrieImgInfo.bgImg) {
                    //     this.loading.which = 1;
                    //     this.loading.text = '背景加载中...'
                    //     this.selectBg( {url: this.edrieImgInfo.bgImg} );//有背景图，加载背景图
                    // }
                    console.log(this.parseSubs.bW,this.parseSubs.bH,this.parseSubs.scale)
                    data.w = this.edrieImgInfo.mattingType===3 ?  oImg.width*parseFloat( this.parseSubs.scale ):this.edrieImgInfo.imageMsg.originalWidth * parseFloat( this.parseSubs.scale );
                    data.h = this.edrieImgInfo.mattingType===3 ?  oImg.height*parseFloat( this.parseSubs.scale ):this.edrieImgInfo.imageMsg.originalHeight * parseFloat( this.parseSubs.scale );
                    data.x = (this.parseSubs.bW / 2 - data.w / 2);
                    data.y = (this.parseSubs.bH / 2 - data.h / 2);
                    if (idx > -1) this.parseSubs.subList.splice( idx, 1, data );
                    else this.parseSubs.subList.push( data );
                    this.loadStatus( data )
                };
                oImg.src = this.edrieImgInfo.pro + `?id=${Math.random()}`;

            },
            initSelfImg(file) {//自定义背景加载后对象储存
                this.openBack = false;
                // this.loading.show = true;
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
                        if (idx > -1) this.parseSubs.subList.splice( idx, 1 );
                        this.parseSubs.subList.unshift( data );
                        this.$nextTick( () => {
                            this.initsave();
                            this.openBack = true;
                        } )
                        this.loadStatus( data );
                    };
                    oImg.src = res.data;
                } )
            },
            loadStatus(data, k, len, mItems) {//加载特效，并保存store
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
                        if (!len) {
                            if (k > -1) this.hoverThis( k );
                            if (this.loading.which === 1) this.loading.which = 0;
                            else this.loading = {show: false, text: '处理中...'}
                        } else {
                            this.loadSubing += 1;
                            if (len === this.loadSubing) {
                                this.$nextTick(_=>{
                                    this.parseSubs = mItems;
                                    this.loading = {show: false, text: '处理中...'};
                                    this.$nextTick( _ => {
                                        this.SubsDataList = [];
                                        this.hisIdx = -1;
                                        this.initsave();//模板加载后，重新存下数据
                                        this.openBack = true;
                                    } )
                                })
                            }
                        }

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
            choseBackColor(color, index) {//4种背景切换（透明、纯色、黑白、模糊）
                const idx = this.parseSubs.subList.findIndex( item => item.type === 0 )
                if (!index) this.showcolorList = !this.showcolorList;
                else if (index === 1) idx > -1 ? this.parseSubs.subList.splice( idx, 1 ) : '';//透明背景
                else {
                    if (idx > -1) {
                        this.$set( this.parseSubs.subList[idx], 'backColor', color );
                        this.initsave()
                    } else this.parseSubs.subList.unshift( {type: 0, backColor: color, id: `back${Math.random()}`,} );
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
                this.parseSubs.subList.map( item => item.hovering = false );
                if (!(!this.parseSubs.subList[idx].type && this.parseSubs.subList[idx].backColor)) this.parseSubs.subList[idx].hovering = true;
                else return;
                let oDiv = this.parseSubs.subList[idx].type ? document.querySelector( `.otherSubs .items:nth-child(${idx + 1})` ) : document.querySelector( '.initBack' );
                let [x, y] = [ev.clientX - oDiv.offsetLeft, ev.clientY - oDiv.offsetTop];
                let [w, h, top, left, size, lineHeight, letterSpacing] = [oDiv.offsetWidth, oDiv.offsetHeight, oDiv.offsetTop, oDiv.offsetLeft, this.parseSubs.subList[idx].type === 2 ? this.parseSubs.subList[idx].fontSize : 0, this.parseSubs.subList[idx].type === 2 ? this.parseSubs.subList[idx].lineHeight : 0, this.parseSubs.subList[idx].type === 2 ? this.parseSubs.subList[idx].letterSpacing : 0];
                let isMove = false;
                document.onmousemove = (e) => {
                    this.moveNum = 1;
                    isMove = true;
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
                        if (this.parseSubs.subList[idx].type === 2) {
                            this.parseSubs.subList[idx].fontSize = parseInt( size * this.parseSubs.subList[idx].w / w );
                            this.parseSubs.subList[idx].lineHeight = parseInt( lineHeight * this.parseSubs.subList[idx].w / w );
                            this.parseSubs.subList[idx].letterSpacing = parseInt( letterSpacing * this.parseSubs.subList[idx].w / w );
                        }
                    } else {
                        if (this.parseSubs.subList[idx].type === 2 && this.parseSubs.subList[idx].contenteditable) return;
                        this.parseSubs.subList[idx].x = l;
                        this.parseSubs.subList[idx].y = t;
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
            choseColor(color) {//选择颜色背景，颜色选择器
                this.choseBack = 0;
                const idx = this.parseSubs.subList.findIndex( item => item.type === 0 );
                if (idx > -1) {
                    this.$set( this.parseSubs.subList[idx], 'backColor', color );
                    this.initsave()
                } else this.parseSubs.subList.unshift( {type: 0, backColor: color, id: `back${Math.random()}`,} );
            },
            changeSelecType(idx) {
                if (this.selectType === idx) return;
                this.selectType = idx;

            },
            changeBgType(idx) {//切换背景图片的类型
                if (this.bgType === idx) return;
                this.bgType = idx;
                this.stopUpdata = true;
                this.seachWords = '';
                this.oneItemBg2 = [];//防止网速慢图片转换不过来，所有先清空
                if (this.imgList[this.bgType].length > 0) {
                    this.$nextTick( () => {
                        this.oneItemBg2 = this.imgList[idx]
                    } )
                } else {
                    catImgList( {catId: this.imgCatList[this.bgType].id} ).then( res => {
                        this.$nextTick( () => {
                            this.oneItemBg2 = res.data.content;
                            this.imgList[this.bgType] = res.data.content;
                        } )
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
                this.openBack = false;
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
                    id: `img${Math.random()}`
                }, oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    this.loading.text = '背景加载中...'
                    data.w = yw > yh ? yw : yh * oImg.width / oImg.height;
                    data.h = yw > yh ? yw * oImg.height / oImg.width : yh;
                    data.x = this.parseSubs.bW / 2 - data.w / 2;
                    data.y = this.parseSubs.bH / 2 - data.h / 2;
                    data.proObj = oImg;
                    if (idx > -1) this.parseSubs.subList.splice( idx, 1 );
                    this.parseSubs.subList.splice( 0, 0, data );
                    this.initsave();
                    this.$nextTick( () => {
                        this.openBack = true;
                        this.edrieImgInfo.bgImg = '';
                    } )
                    this.loadStatus( data );
                };
                oImg.src = item.url + `?id=${Math.random()}`;
            },
            addTextSub(k, item, i) {
                let data = {
                    type: 2,//文字组件
                    title: '双击编辑',
                    fontFamily: 'systi',//文字类型
                    fontSize: k === 1 ? 14 : (k === 2 ? 24 : 36),//大小
                    letterSpacing: 0,//字间距
                    lineHeight: k === 1 ? 30 : (k === 2 ? 36 : 48),//行高
                    color: i === 0 ? '#fff' : '#333',//颜色
                    backgroundColor: '',//背景色
                    fontStyle: 'normal',//是否斜体
                    textDecoration: 'none',//下划线，删除线
                    textAlign: 'center',
                    flexDirection: 0,//0代表横向，1代表竖向
                    fontWeight: 'normal',
                    textShadow: 'none',
                    w: 200,
                    h: k === 1 ? 30 : (k === 2 ? 36 : 48),
                    id: `text${Math.random()}`,
                    rotate: 0,
                    hovering: false,
                    // zIndex: this.parseSubs.subList[this.parseSubs.subList.length - 1].zIndex + 1,
                    contenteditable: false,
                };
                if (item) {
                    Object.keys( item ).map( it => {
                        data[it] = item[it]
                    } )
                }
                data.x = this.parseSubs.bW / 2 - data.w / 2;
                data.y = this.parseSubs.bH / 2 - data.h / 2;
                this.parseSubs.subList.push( data );
                this.hoverThis( this.parseSubs.subList.length - 1 )
            },
            setOImg(k) {
                if (k === 6) this.parseSubs.subList.splice( this.hoverSub.idx, 1 );
                if ([7, 8].includes( k )) {
                    this.openBack = false;
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
                        e.proObj = this.hoverSub.proObj;
                        this.parseSubs.subList.splice( this.hoverSub.idx, 1 );
                        if (d < 0) {
                            this.parseSubs.subList.splice( list[list.length - 1].idx, 0, e );
                        } else {
                            this.parseSubs.subList.splice( list[d - 1].idx, 0, e );
                        }
                    }
                    this.$nextTick( () => {
                        // let oText = document.querySelectorAll(`.otherSubs .items .text`), i = 0;
                        // this.parseSubs.subList.map((item, idx) => {
                        //     if (item.type === 2) {
                        //         oText[i].innerText = item.title;
                        //         i+=1;
                        //     }
                        // })
                        this.openBack = true;
                    } )
                }
            },
            keepLastIndex(obj) {
                if (window.getSelection) { //ie11 10 9 ff safari
                    obj.focus(); //解决ff不获取焦点无法定位问题
                    var range = window.getSelection(); //创建range
                    range.selectAllChildren( obj ); //range 选择obj下所有子内容
                    range.collapseToEnd(); //光标移至最后
                } else if (document.selection) { //ie10 9 8 7 6 5
                    var range = document.selection.createRange(); //创建选择对象
                    //var range = document.body.createTextRange();
                    range.moveToElementText( obj ); //range定位到obj
                    range.collapse( false ); //光标移至最后
                    range.select();
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
            downLoadImg(){
                let data={templateId:0}
                if(!this.loadSubObj && this.parseSubs.hasOwnProperty('isOwnTwo'))data.templateId=this.parseSubs.templateId;
                else if(this.loadSubObj) data.templateId=this.loadSubObj.id;
                templatedownload(data).then(res=>{
                    if(!res.code)this.downLoadImg2();
                    else if(res.code===1100) this.dialogVisible2=true;
                })
            },
            downLoadImg2(k) {
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
                }, [] ), reg = /^http*$/, dOrr = k ? k : '';
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
                    oImg.src = item.useImg.includes( 'http' ) ? item.useImg + `?id=${Math.random()}` : item.useImg;
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
                        oCanTxt.fillStyle = item.backColor;
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
                                        console.log( yc, oCanTxt.measureText( content[0].str.substring( 0, ix ) ).width, ix * size, 22222 )
                                        oCanTxt.fillTextVertical( it, x + w - (lineHeight - line_size) + size / 2, yc, stroke )
                                        // stroke === 1 ? oCanTxt.fillText( it, x + w - (lineHeight - line_size), yc ) : oCanTxt.strokeText( it, x + w + line_size, yc );
                                    } )
                                    this.initLineTo2( oCanTxt, size, x, y, 0, lineHeight, line_size, content[0], w, h, item.textAlign, textDecoration )
                                } else {
                                    const last = content[content.length - 1];
                                    content.map( (itemSon, idx) => {
                                        if (idx !== content.length - 1) {
                                            itemSon.str.split( '' ).map( (it, ix) => {
                                                const yc = item.textAlign === 'center' ? y + ix * letterSpacing + oCanTxt.measureText( content[0].str.substring( 0, ix ) ).width + h / 2 - content[0].len / 2 : y + ix * letterSpacing + oCanTxt.measureText( content[0].str.substring( 0, ix ) ).width;
                                                oCanTxt.fillTextVertical( it, x + w - (lineHeight - line_size) - idx * lineHeight + size / 2, yc, stroke )
                                                // stroke === 1 ? oCanTxt.fillText( it, x + w - (lineHeight - line_size) - idx * lineHeight, yc ) : oCanTxt.strokeText( it, x + w - idx * lineHeight + line_size, yc );
                                            } )
                                        }
                                        this.initLineTo2( oCanTxt, size, x, y, idx, lineHeight, line_size, itemSon, w, h, item.textAlign, textDecoration )
                                    } )
                                    last.str.split( '' ).map( (it, ix) => {
                                        const ys = item.textAlign === 'center' ? y + ix * letterSpacing + oCanTxt.measureText( content[0].str.substring( 0, ix ) ).width + h / 2 - last.len / 2 : y + ix * letterSpacing + oCanTxt.measureText( content[0].str.substring( 0, ix ) ).width;
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
                else {
                    let formData = new FormData();
                    oCan.toBlob( blob => {
                        formData.append( 'file', blob );
                        uploadossBg( formData ).then( res => {
                            // nowSub.cover=res.data;
                            if(this.loadIdx.length>1)this.subList[this.loadIdx[0]].templateList[this.loadIdx[1]].cover = res.data;
                            else this.templateLists[this.loadIdx[0]].cover = res.data;
                            this.saveTempelteSub( {...dOrr, cover: res.data}, res.data )
                        } )
                    } )
                }
            },
            initfontList(oCanTxt, str, letterSpacing, w, h, flexDirection, size) {
                let arr = str.split( '' ), brr, brr2;
                if (!flexDirection) {
                    brr = arr.reduce( (pre, item, idx) => {
                        const w1 = size,
                            w2 = pre.str !== '' ? oCanTxt.measureText( pre.str ).width + (pre.str.length - 1) * letterSpacing : 0;
                        if (w2 + letterSpacing + w1 > w && idx !== arr.length - 1) {
                            pre.list.push( {str: pre.str, len: w2} );
                            pre.str = item;
                        } else if (idx === arr.length - 1 && w2 + letterSpacing + w1 <= w) {
                            pre.list.push( {str: pre.str += item, len: w2 + w1 + letterSpacing} );
                            pre.str = item;
                        } else if (idx === arr.length - 1 && w2 + letterSpacing + w1 > w) {
                            pre.list.push( {str: pre.str, len: w2} );
                            pre.list.push( {str: item, len: w1} );
                            pre.str = item;
                        } else pre.str = pre.str + item;
                        return pre
                    }, {str: '', list: []} )
                } else {
                    brr = arr.reduce( (pre, item, idx) => {
                        const w1 = size,
                            w2 = pre.str !== '' ? oCanTxt.measureText( pre.str ).width + (pre.str.length - 1) * letterSpacing : 0;
                        if (w2 + letterSpacing + w1 > h && idx !== arr.length - 1) {
                            pre.list.push( {str: pre.str, len: w2} );
                            pre.str = item;
                        } else if (idx === arr.length - 1 && w2 + letterSpacing + w1 <= h) {
                            pre.list.push( {str: pre.str += item, len: w2 + w1 + letterSpacing} );
                            pre.str = item;
                        } else if (idx === arr.length - 1 && w2 + letterSpacing + w1 > h) {
                            pre.list.push( {str: pre.str, len: w2} );
                            pre.list.push( {str: item, len: w1} );
                            pre.str = item;
                        } else pre.str = pre.str + item;
                        return pre
                    }, {str: '', list: []} )
                }
                return brr.list
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
                if (myBrowser() === 'IE' || myBrowser() === 'Edge') {//ie下载图片
                    let url = cans.msToBlob();
                    let blobObj = new Blob( [url] );
                    window.navigator.msSaveOrOpenBlob( blobObj, this.edrieImgInfo.filename.substring( 0, this.filename.lastIndexOf( '.' ) ) + ".png" );
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
                    save_link.download = this.edrieImgInfo.filename.substring( 0, this.edrieImgInfo.filename.lastIndexOf( '.' ) ) + ".png";
                    let event = document.createEvent( 'MouseEvents' );
                    event.initMouseEvent( 'click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null );
                    save_link.dispatchEvent( event );
                    this.loadingInstance.close()
                }
            },
            changeSize(item, idx) {//画布尺寸输入
                // console.log( item, this.parseSubs )
                if (item.w === this.parseSubs.oriW && item.h === this.parseSubs.oriH) return;
                let oH = document.getElementById( 'e_r' ).offsetHeight * 0.6,
                    oW = document.getElementById( 'e_r' ).offsetWidth * 0.6,
                    prolist = ['w', 'fontSize', 'letterSpacing'],
                    prolist2 = ['h', 'lineHeight'],
                    w = this.parseSubs.bW, h = this.parseSubs.bH, ww = this.parseSubs.oriW, hh = this.parseSubs.oriH;
                this.parseSubs.oriW = item.w;
                this.oriW = item.w;
                this.parseSubs.oriH = item.h;
                this.oriH = item.h;
                this.parseSubs.bW = item.w > item.h ? (item.w > oW ? oW : item.w) : (item.h > oH ? oH * item.w / item.h : item.w);
                this.parseSubs.bH = item.w > item.h ? (item.w > oW ? oW * item.h / item.w : item.h) : (item.h > oH ? oH : item.h);
                this.parseSubs.scale = parseFloat( this.parseSubs.bW / item.w );
                this.parseSubs.subList.map( items => {
                    const afterw = item.w - ww, afterh = item.h - hh;
                    Object.keys( items ).map( it => {
                        if (prolist.includes( it )) items[it] = items[it] * ww / w * this.parseSubs.scale;
                        if (prolist2.includes( it )) items[it] = items[it] * hh / h * this.parseSubs.scale;
                        if (it === 'x') items[it] = (items[it] * ww / w + afterw / 2) * this.parseSubs.scale;
                        if (it === 'y') items[it] = (items[it] * hh / h + afterh / 2) * this.parseSubs.scale;
                    } )
                } )
                this.initsave()
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
                this.parseSubs.subList.map( (items,idx) => {
                    Object.keys( items ).map( it => {
                        if (prolist3.includes( it )) this.parseSubs.subList[idx][it] = this.parseSubs.subList[idx][it] / scale * newscale
                    } )
                } )
            },
            initAllInfo() {//初始化时操作信息
                const obj = localStorage.getItem( 'editImg' );
                if (!obj) return;
                this.edrieImgInfo = {...this.edrieImgInfo, ...JSON.parse( obj )};
                // this.edrieImgInfo.pro = 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200727/e8924b0ecc1049d99db0467ae5aa1e41.png';//默认图片
                this.loading.show = true;
                this.loading.text = '加载中...';
                if (this.edrieImgInfo.bgImg){
                    this.openBack=false;
                    let oImg = new Image(), oH = document.getElementById( 'e_r' ).offsetHeight * 0.6,
                        oW = document.getElementById( 'e_r' ).offsetWidth * 0.6;
                    oImg.crossOrigin = '';
                    oImg.onload = () => {
                        this.parseSubs.oriW = oImg.width;
                        this.oriW = oImg.width;
                        this.parseSubs.oriH = oImg.height;
                        this.oriH = oImg.height;
                        this.parseSubs.bW = oImg.width > oImg.height ? (oImg.width > oW ? oW : oImg.width) : (oImg.height > oH ? oH * oImg.width / oImg.height : oImg.width);
                        this.parseSubs.bH = oImg.width > oImg.height ? (oImg.width > oW ? oW * oImg.height / oImg.width : oImg.height) : (oImg.height > oH ? oH : oImg.height);
                        this.parseSubs.scale = parseFloat( this.parseSubs.bW / oImg.width );
                        let data = {
                            type: 0,//背景
                            rotate: 0,
                            hovering: false,
                            w:this.parseSubs.bW,
                            h:this.parseSubs.bH,
                            x:0,y:0,
                            useImg: this.edrieImgInfo.bgImg,
                            pro: this.edrieImgInfo.bgImg,
                            ori: this.edrieImgInfo.bgImg,
                            proObj: oImg,////抠图过加载后的对象
                            mattingType: -1,
                            id: `img${Math.random()}`
                        };
                            this.parseSubs.subList.splice( 0, 1, data );
                            this.initsave();
                            this.$nextTick( () => {
                                this.openBack = true;
                            } )
                            this.loadStatus( data );
                    };
                    oImg.src = this.edrieImgInfo.bgImg + `?id=${Math.random()}`
                } else {
                    this.showUpload = false;
                    this.initSize()
                }
                this.edrieImgInfo['type'] = this.showUpload ? 1 : 2;//1代表背景过来的，2代表抠图后过来的
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
                    this.loadId = -1;
                    this.SubsDataList = [];
                    this.initAllInfo();
                    this.$store.commit( 'SET_EFFECTSIMG', {clear: 1} );
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
                this.publicFun( idx, idx );
                // this.hoverThis( idx )
            },
            publicFun(idx, k) {
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    this.parseSubs.subList[idx].proObj = oImg;
                    this.parseSubs.subList[idx].id = `img${Math.random()}`;
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
                    this.parseSubs.oriW = oImg.width;
                    this.oriW = oImg.width;
                    this.parseSubs.oriH = oImg.height;
                    this.oriH = oImg.height;
                    this.edrieImgInfo.oriObj = oImg;
                    // this.parseSubs.bW = oImg.width > oImg.height ? (oImg.width > oW ? oW : oImg.width) : (oImg.height > oH ? oH * oImg.width / oImg.height : oImg.width);
                    // this.parseSubs.bH = oImg.width > oImg.height ? (oImg.width > oW ? oW * oImg.height / oImg.width : oImg.height) : (oImg.height > oH ? oH : oImg.height);
                    // this.parseSubs.scale = parseFloat( this.parseSubs.bW / oImg.width ).toFixed( 2 );
                    this.initMainSub( oImg )
                };
                oImg.src = this.edrieImgInfo.ori + `?id=${Math.random()}`
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
            choseTrme(it, ix, idx) {
                this.$confirm( `确定要选择此模板替换当前模板, 是否继续?`, '提示', {
                    showClose: false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                } ).then( () => {
                    this.openBack = false;
                    this.loading = {show: true, text: '加载中...'};
                    this.loadId = it.id;
                    this.parseSubs.subList=[];
                    if (it.isOwnTwo) {
                        this.$store.commit( 'SET_EFFECTSIMG', {clear: 1} );
                        this.loadSubObj = '';
                        this.loadIdx = [];
                        this.loadSubs( it );
                        return;
                    }
                    templateDetial( {id: this.loadId} ).then( res => {
                        this.$store.commit( 'SET_EFFECTSIMG', {clear: 1} );
                        this.loadSubObj = res.data;
                        if(idx || idx===0)this.loadIdx = [idx, ix];
                        else this.loadIdx = [ ix]
                        this.loadSubs( JSON.parse( res.data.data ) )
                    } )

                } ).catch( () => {

                } );

            },
            loadSubs(item) {
                let mItems = JSON.parse( JSON.stringify( item ) ),
                    mainSubidx = item.subList.findIndex( it => it.type === 1 ),
                    imgsList = item.subList.filter( it => ([0, 1, 3].includes( it.type ) && it.useImg) ),
                    oH = document.getElementById( 'e_r' ).offsetHeight * 0.6,
                    oW = document.getElementById( 'e_r' ).offsetWidth * 0.6;
                mItems['bW'] = mItems.oriW > mItems.oriH ? (mItems.oriW > oW ? oW : mItems.oriW) : (mItems.oriH > oH ? oH * mItems.oriW / mItems.oriH : mItems.oriW);
                mItems['bH'] = mItems.oriW > mItems.oriH ? (mItems.oriW > oW ? oW * mItems.oriH / mItems.oriW : mItems.oriH) : (mItems.oriH > oH ? oH : mItems.oriH);
                mItems['scale'] = parseFloat( mItems.bW / mItems.oriW );
                if (mainSubidx > -1 && this.edrieImgInfo.pro && !this.urlStr) {
                    const [x, y, w, h] = [mItems.subList[mainSubidx].x, mItems.subList[mainSubidx].y, mItems.subList[mainSubidx].w, mItems.subList[mainSubidx].h];
                    mItems.subList[mainSubidx].w = w > h ? w : this.edrieImgInfo.oriObj.width / this.edrieImgInfo.oriObj.height * h;
                    mItems.subList[mainSubidx].h = w > h ? w * this.edrieImgInfo.oriObj.height / this.edrieImgInfo.oriObj.width : h;
                    mItems.subList[mainSubidx].ori = this.edrieImgInfo.ori;
                    mItems.subList[mainSubidx].pro = this.edrieImgInfo.pro;
                    mItems.subList[mainSubidx].useImg = this.edrieImgInfo.pro;
                    mItems.subList[mainSubidx].mattingType = this.edrieImgInfo.mattingType;
                    mItems.subList[mainSubidx].x = mItems.subList[mainSubidx].w > w ? x - (mItems.subList[mainSubidx].w - w) / 2 : x + (w - mItems.subList[mainSubidx].w) / 2;
                    mItems.subList[mainSubidx].y = mItems.subList[mainSubidx].h > h ? y - (mItems.subList[mainSubidx].h - h) / 2 : y + (h - mItems.subList[mainSubidx].h) / 2;
                }
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
                    if ([0, 1, 3].includes( item.type ) && item.useImg) {
                        mItems.subList[idx]['id'] = `img${Math.random()}`;
                        mItems.subList[idx]['proObj'] = ``;
                        let oImg = new Image();
                        oImg.crossOrigin = '';
                        oImg.onload = () => {
                            mItems.subList[idx]['proObj'] = oImg;
                            this.loadStatus( mItems.subList[idx], idx, imgsList.length, mItems )
                        };
                        oImg.src = mItems.subList[idx].useImg + `?id=${Math.random()}`

                    }
                } )
            },
            inittemplteList(idx) {
                // const typeList = ['avatar', 'ebusiness', 'mobile']
                // let data = {
                //     category: typeList[idx],
                //     page: 1,
                //     pageSize: 100
                // }
                templateCategoryList().then( res => {
                    this.subList = [...res.data.list, {category_name: '证件照', templateList: subList3.slice( 0, 2 )}]
                } )
            },
            initUserinfo() {
                getUserInfo().then( res => {
                    this.userInfo = res.data;
                } )
            }
        },
        created() {//透明背景储存
            this.inittemplteList();
        },
        mounted() {//初始化参数
            const oDiv = document.getElementById( 'e_r' )
            this.oDiv_w = {w: oDiv.offsetWidth, h: oDiv.offsetHeight};
            if (getToken()) {
                this.userGetscribe();
                this.initUserinfo();
            }
            $( '#e_r' ).niceScroll( {cursorcolor: '#999999'} );
            document.addEventListener( 'click', () => {
                this.showcolorList = false
            } )
            letterText()//字间距
            verticalText()//字间距
            document.addEventListener( 'keydown', (e) => {
                const keynum = window.event ? e.keyCode : e.which;
                const idx = this.hoverSub.idx, type = this.hoverSub.type;
                if (idx < 0) return;
                if (keynum === 8 && !this.hoverSub.contenteditable) this.parseSubs.subList.splice( idx, 1 );
            } )
            window.addEventListener( 'resize', () => {
                const oDiv = document.getElementById( 'e_r' )
                this.oDiv_w = {w: oDiv.offsetWidth, h: oDiv.offsetHeight};
            } )
            this.initCats();
            this.initAllInfo();
        }
    }
</script>
<style scoped lang="scss">
    .editPictures {
        -webkit-text-size-adjust:none;
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

                img {
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
            overflow: hidden;

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

            .first2 {
                .selfMoren {
                    padding: 15px 0;
                    position: relative;

                    &.active {
                        box-shadow: 0 0 15px $co;
                    }

                    i {
                        font-weight: bold;
                        position: absolute;
                        font-size: 24px;
                        top: 0;
                        right: 0;
                        color: #e82255;
                        z-index: 99;
                    }
                }

                .lists {
                    /*height: 600px;*/
                    padding: 15px 0;

                    .listsson {
                        margin-bottom: 10px;
                    }

                    h4 {
                        margin-bottom: 10px;
                        position: relative;
                        color: #fff;

                        span {
                            color: #ADAEB2;
                            font-size: 12px;
                            position: absolute;
                            right: 10px;
                            top: 50%;
                            transform: translateY(-50%);
                            cursor: pointer;
                        }
                    }

                    .noZhen:after {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        top: 0;
                        content: '';
                        background-color: rgba(0, 0, 0, .4);
                    }

                    & .itemT.active {
                        box-shadow: 0 0 15px $co;
                    }

                    & .itemT {
                        position: relative;
                        width: 100px;
                        margin: 0 10px 10px 0;
                        overflow: hidden;
                    &.isblock{
                        width: 210px;
                        margin-right: 0;
                    }
                        &:nth-child(2n) {
                            margin-right: 0;
                        }

                        /*<!--img {-->*/
                        /*<!--    position: absolute;-->*/
                        /*<!--    width: 100%;-->*/
                        /*<!--    left: 0;-->*/
                        /*<!--    top: 50%;-->*/
                        /*<!--    transform: translateY(-50%);-->*/
                        /*<!--}-->*/
                        & > .name {
                            position: absolute;
                            width: 100%;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%, -50%);
                            font-size: 14px;
                            color: #fff;
                            text-align: center;
                            z-index: 3;
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
                    background-color: rgba(250, 250, 250, .1);
                    color: #fff;
                    margin-bottom: 14px;
                    margin-left: 0;
                    border: none;

                    &:hover {
                        border-color: #fff;
                    }

                    &:first-child {
                        font-size: 28px;
                        line-height: 52px;
                    }

                    &:nth-child(2) {
                        font-size: 20px;
                        line-height: 40px;
                    }

                    &:nth-child(3) {
                        font-size: 14px;
                        line-height: 32px;
                    }
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
                        width: 50px;
                        height: 50px;
                        position: relative;
                        margin-bottom: 10px;
                        overflow: hidden;
                        margin: 10px 0;

                        &:nth-child(2n) {
                            margin: 0 10px;
                        }

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

                        & ~ i {
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
                        cursor: text;
                        position: relative;
                        z-index: 22;
                        /*width: 100%;*/
                        /*height: 100%;*/

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
                padding: 15px 0;
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
                    background-color: #eee;
                }

                img {
                    display: block;
                    margin: 0 auto 5px;
                }

                & > div {
                    padding: 0 30px;
                }

                & > div:hover {
                    color: $co;
                    background-color: #eee;
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
