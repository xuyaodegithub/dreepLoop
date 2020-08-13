<template>
    <div class="helloFirst">
        <input type="file" style="display: none" ref="upImg" @change="changeImg($event)" :multiple="multiple"
               accept="image/*"/>
        <header-sub></header-sub>
        <div class=" apps">
            <div class="Operator">
                <h6><!--Local images-->本地图像</h6>
                <el-button type="primary" round icon="el-icon-upload2" @click="upLoadimg()"><!--Upload-->上传</el-button>
                <p class="afterbtn" v-if="!LoginStatus"><span class="cu" @click="userlogin(0)">登录</span>
                    <!--for batch upload-->后批量上传</p>
                <div class="center">
                    <h5>Web 图片</h5>
                    <div style="position: relative;">
                        <img src="../../assets/image/inputImg.png" alt=""
                             style="position: absolute;left: 8px;top: 12px;">
                        <!--                        @keyup.enter="copyImgUrl()"-->
                        <input type="text" placeholder="CTRL+V图像或URL" v-model="imgUrl"
                               @focus="$event.target.select()" class="upcas">
                        <!--                        <img src="../../assets/image/img5.png" alt="" style="margin-left:-14px;" class="cu"-->
                        <!--                             @click="copyImgUrl()">-->
                    </div>
                    <!--                    <div class="flex a-i cu">-->
                    <!--                        <img src="../../assets/image/img1.png" alt="">-->
                    <!--                        <p>Chrome &lt;!&ndash;extension&ndash;&gt;插件</p>-->
                    <!--                    </div>-->
                </div>
                <div class="bottonLast">
                    <div class="flex a-i cu" @click="toApi()">
                        <img src="../../assets/image/img4.png" alt="">
                        <span>API</span>
                    </div>
                    <div class="flex a-i cu" @click="openHistory()">
                        <img src="../../assets/image/img2.png" alt="">
                        <span><!--History-->历史记录</span>
                    </div>
                    <div class="fixedB">
                        <h5><!--Contact us-->联系我们</h5>
                        <div class="flex a-i cu">
                            <img src="../../assets/image/wx.png" alt="">
                            <p>roymind</p>
                            <img src="../../assets/image/ewm.png" alt="" style="margin-left: 20px;margin-right: 0;">
                            <img src="../../assets/image/wxl.png" alt="" class="noC" style="width:120px;">
                        </div>
                        <div class="flex a-i cu">
                            <img src="../../assets/image/img3.png" alt="">
                            <p><a href="mailto:pikachu@picup.ai">pikachu@picup.ai</a></p>
                        </div>
                    </div>
                </div>
                <div class="historyList" v-show="showHistory">
                    <i class="el-icon-close cu" @click="closeHistory()"></i>
                    <div v-show="Object.keys(historyList).length<1" style="margin-top: 60px;text-align: center;">
                        <!--No record-->暂无记录
                    </div>
                    <div class="hisimgs" v-show="Object.keys(historyList).length>0" ref="historyList"
                         @scroll="getmoveHis($event)">
                        <div v-for="(value,name) in historyList" :key="name" class="oneDate" :class="">
                            <h4>{{name | datafilter}}</h4>
                            <div class="flex a-i">
                                <div v-for="(item,index) in value" :key="item.id">
                                    <img :src="item.originalImage" alt="" class="cu" @click="addItem(item)">
                                </div>
                            </div>
                        </div>
                        <p style="text-align: center;margin-bottom: 15px;margin-top: 15px;" v-if="stopUpdata">
                            <!--No more~~~~~-->没有更多了```</p>
                    </div>
                </div>
            </div>
            <div class="OperatorRight drops">
                <div class="newChunk">
                    <h2>通用抠图</h2>
                    <p>人像、商品、卡通、动物全部搞定</p>
                    <div class="flex a-i">
                        <div class="gif"><img src="../../assets/image/tygif.gif" alt=""></div>
                        <div class="gifright">
                            <el-button type="primary" round icon="el-icon-upload2" @click="upLoadimg()"><!--Upload-->
                                上传图像
                            </el-button>
                            <el-input v-model="imgUrl" class="upcas" placeholder="CTRL+V粘贴图像或者URL"
                                      @focus="$event.target.select()"></el-input>
                            <div class="aList flex">
                                <!--                                <a href="//picup.shop/apidoc/_book/human.html" target="_blank">人体API></a>-->
                                <!--                                <a href="//picup.shop/apidoc/_book/human.html#%E4%BA%BA%E5%83%8F%E6%8A%A0%E5%9B%BE%E5%92%8C%E5%85%B3%E9%94%AE%E7%82%B9%E6%A3%80%E6%B5%8Bapi" target="_blank">人体API带人体关键点></a>-->
                            </div>
                            <div class="titlips"><a href="https://www.google.cn/chrome/" target="_blank">推荐使用：谷歌游览器 <img
                                    src="@/assets/image/img1.png" alt="">，防止兼容问题</a></div>
                            <p>没有图像？试试以下图片看看效果</p>
                            <div class="flex a-i">
                                <div :style="{backgroundImage:`url(${item})`,backgroundSize:'cover',backgroundPosition:'center'}"
                                     v-for="(item,idx) in initimgsList" :key="idx" @click="deepItem(item)"
                                     class="cu"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-for="(item,index) in files" :key="item.name" class="imgRef"
                     :id="item.name">
                    <!--                    :class="{'active' : index===files.length-1}"-->
                    <img-sub :files="item" @to-parse="collectBg" @close="closeItem" :index="index" ref="subs"
                             @downall="downAllinit"
                             :type="6"></img-sub>
                </div>
            </div>
            <div class="ImgLists" v-show="rightImgList.length>1">
                <!--                <el-scrollbar>-->
                <div class="imgs" id="niceScrolls">
                    <div v-for="(item,index) in rightImgList" :key="index" :class="{'active' : selectImg ===index}"
                         class="cu" @click="goThisImg(index)">
                        <img :src="item.url" alt="">
                    </div>
                </div>
                <!--                </el-scrollbar>-->
                <div class="downBtn" @mouseenter="classType=0">
                    <span><!--Download all-->下载全部</span>
                    <div class="sizeChoses">
                        <div class="flex a-i btn j-b">
                            <div v-for="(val,index) in color" :key="index"
                                 :class="{'active' : classType===index}" @click="classType=index" class="cu">
                                <div class="flex color_List" v-show="classType===2 && index===2">
                                    <span v-for="(color,idx) in colorList" :key="idx" :style="{backgroundColor:color}"
                                          @click.stop="selectColor=color"
                                          :class="{selectC : selectColor===color}"></span>
                                </div>
                                <img :src="val" alt=""
                                     style="position: absolute;left: 0;top: 0;width: 24px;height: 24px"
                                     :title="index | imgtitle">
                            </div>
                        </div>
                        <div class="flex a-i">
                            <span>尺寸</span>
                            <span>消耗次数</span>
                        </div>
                        <div class="flex a-i">
                            <span>下载预览图</span>
                            <span>0</span>
                            <span class="cu" @click="saveMove(0,$event)">下载</span>
                        </div>
                        <div class="flex a-i ">
                            <span>下载原图比例</span>
                            <span>{{allbgImg.length}}</span>
                            <span class="cu" @click="saveMove(1,$event)">下载</span>
                        </div>
                        <div>
                            <!--                            当前可用次数： 0 <i class="cu">去充值</i>-->
                        </div>
                    </div>
                </div>
                <div class="deAll cu" @click="deleteAllImg">删除全部</div>
            </div>
        </div>
        <div class="zhezhao" v-if="showSetImg"></div>
        <div>
            <img-set-sub v-if="showSetImg" :imgMsg="imgMsg" @closeImgSet="closeImgSet"></img-set-sub>
        </div>

    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    import JSZip from 'jszip'
    import {saveAs} from "file-saver";
    import headerSub from '@/components/header/index.vue'
    import imgSub from '@/components/showImgSub/index.vue'
    import {getToken, getSecImgs, setSecImgs} from "../../utils/auth";
    import {basrUrls,setVsource} from "../../utils";
    import imgSetSub from '@/components/setImgSub/index.vue'
    import {getMattedImageMultiple, userHistoryList} from "../../apis";
    import mohu1 from '@/assets/image/mohu1.png'
    import mohu2 from '@/assets/image/mohu2.png'
    import init from '@/assets/image/init.png'
    import opacity from '@/assets/image/fopa.png'
    import bscolor from '@/assets/image/color.png'
    import JSManipulate from '../../utils/jsmanipulate.js'
    import {niceScroll} from 'jquery.nicescroll';

    export default {
        name: 'HelloWorld',
        data() {
            return {
                initimgsList: [
                    'http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200721/6ed6a205f75d4f4c88fb403700712191.jpg',
                    'http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200721/117ec41b300c4e7e9ec22a1af76ca5e5.jpg',
                    'http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200721/395180e142634ee78e2a23d0b160f95e.jpg',
                    'http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200721/33f148ed018c49ad87b00a25b19deec3.jpg',
                ],
                rightImgList: [],
                selectImg: 0,
                multiple: false,
                imgMsg: {},
                showSetImg: false,
                allbgImg: [],
                basrUrls: basrUrls(),
                sizeArr: [],
                historyList: {},
                showHistory: false,
                files: [],
                imgUrl: '',//图片链接
                page: 1,
                rows: 30,
                color: [init, opacity, bscolor, mohu2, mohu1],
                classType: 0,
                stopUpdata: false,//停止滑动加载
                Percentile: 0,
                loading: null,
                scrollStop: true,
                colorList: [
                    '#fc0615', '#ff7f02', '#ffff11', '#1cff12', '#1bffff', '#0000fe', '#fc01fc', '#7f0f7f', '#986633', '#ffffff', '#7f7f7f', '#000000',
                    '#ffffff', '#ebebeb', '#d6d6d6', '#c2c2c2', '#adadad', '#999999', '#858585', '#707070', '#5c5c5c', '#474747', '#333333', '#000000',
                    '#12374a', '#061a55', '#10033b', '#2e063b', '#3c091a', '#5c0f07', '#5b1f05', '#563309', '#583c0c', '#676113', '#4f5613', '#273e14',
                    '#154d66', '#0f2f7c', '#190950', '#451058', '#551428', '#81190c', '#7b2a0c', '#7b4a10', '#795813', '#8c8614', '#71761a', '#38571c',
                    '#0a6d8d', '#1542a9', '#2a0876', '#621c7e', '#781d3e', '#b51d12', '#ae3d13', '#aa6917', '#a77a15', '#c3bc14', '#9aa40d', '#4f7a28',
                    '#158cb4', '#1855d4', '#371b94', '#7a259e', '#982550', '#e32316', '#db5017', '#d4810b', '#d39c0c', '#f5eb17', '#c3d119', '#689d31',
                    '#06a1d7', '#1260fe', '#4e22b5', '#972abb', '#ba2c5c', '#ff3f1a', '#fe690b', '#fcaa18', '#fec810', '#fffc45', '#d9ec38', '#76bc3f',
                    '#0fc7fd', '#3c87fe', '#5f2eec', '#bf36f5', '#e73a7c', '#ff6050', '#ff8647', '#ffb43f', '#fecb3e', '#fef769', '#e3ef65', '#97d45f',
                    '#54d6fa', '#75a7ff', '#874efd', '#d257fd', '#ef71a0', '#fe8c82', '#fea57d', '#fec775', '#fdda76', '#fdf892', '#ebf390', '#b2dd8b',
                    '#96e2fa', '#a9c6fe', '#b18cfd', '#e391fd', '#f4a4c1', '#ffb4ae', '#fec5aa', '#ffd9a8', '#fee4a9', '#fefaba', '#f4f6b7', '#cce8b5',
                    '#ccf0fe', '#d3e2ff', '#d9c8fe', '#efcafe', '#f9d3e0', '#fedbd9', '#ffe3d7', '#feedd3', '#fff1d4', '#fffdde', '#f7fadd', '#e0eed5',
                ],//色板
                selectColor: '',
                baseList: []//全部下载自定义
            }
        },
        filters: {
            datafilter(val) {
                let now = new Date();
                let y = now.getFullYear(), m = now.getMonth() + 1, d = now.getDate();
                if (m < 10) m = '0' + m;
                if (d < 10) d = '0' + d;
                let arr = val.split( '-' );
                if (arr[0] == y && arr[1] == m && arr[2] == d) return '今天';
                else if (arr[0] == y && arr[1] == m && arr[2] == d - 1) return '昨天';
                else return val
            },
            imgtitle(i) {
                if (i === 0) return '自定义后';
                else if (i === 1) return '背景透明';
                else if (i === 2) return '纯色背景';
                else if (i === 3) return '背景黑白';
                else if (i === 4) return '背景模糊';
            }
        },
        watch: {
            // files: {
            //     handler(newName, oldName) {
            //         if (newName.length>0) setShow(0)
            //         else setShow(1)
            //      },
            //     immediate: true,
            //     }
        },
        mounted() {
            setVsource()
            this.stopPrevent();
            this.getsesImgsSet();
            this.initindexImg();
            if (getToken()) this.userGetscribe();
            window.addEventListener( 'scroll', this.scrollFun );
            $( '#niceScrolls' ).niceScroll( {cursorcolor: '#999999'} );
            document.addEventListener( 'paste', (e) => {
                let clipboardData = e.clipboardData,//谷歌
                    i = 0,
                    items, item, types;
                if (clipboardData) {
                    items = clipboardData.items;
                    if (!items) {
                        return;
                    }
                    item = items[0];
                    types = clipboardData.types || [];
                    for (; i < types.length; i++) {
                        if (types[i] === 'Files') {
                            item = items[i];
                            break;
                        }
                    }
                    if (item && item.kind === 'string' && item.type.match( /^text\//i )) {
                        this.deepItem( clipboardData.getData( "Text" ) )
                    }
                    if (item && item.kind === 'file' && item.type.match( /^image\//i )) {
                        this.changeImg( {target: {files: [item.getAsFile()]}} )
                    }
                }
            } )
            // $('.hisimgs').niceScroll({cursorcolor :'#999999',boxzoom:true});
        },
        destroyed() {
            window.removeEventListener( 'scroll', this.scrollFun )
        },
        computed: {
            ...mapGetters( [] ),
            LoginStatus() {//登录状态
                return getToken() ? true : false;
            },
            // filesList(){
            //     const arrr=this.files.filter((item,idx)=>idx<this.limitIdx+2)
            //     return arrr
            // }
        },
        components: {
            headerSub, imgSub, imgSetSub
        },
        methods: {
            ...mapActions( [
                'userGetscribe'
            ] ),
            downAllinit(objs, blogTitle = 'picture') {//下载全部自定义后的图片
                const allNum = this.$refs.subs.length, _this = this;
                let zip = new JSZip(), imgs = zip.folder( blogTitle );
                const name = objs.filename.substring( 0, objs.filename.lastIndexOf( '.' ) ).replace( /\//g, '%' )
                this.baseList.push( {name: name + '.png', img: objs.obj.substring( 22 )} );
                this.Percentile += 1;
                this.loading.text = this.Percentile + '/' + this.allbgImg.length + ' 已完成';
                console.log( this.Percentile, this.allbgImg.length, '.....' )
                if (this.baseList.length === this.allbgImg.length) {
                    if (this.baseList.length > 0) {
                        this.loading.text = '打包中...'
                        for (let k = 0; k < this.baseList.length; k++) {
                            imgs.file( this.baseList[k].name, this.baseList[k].img, {
                                base64: true
                            } );
                        }
                        zip.generateAsync( {type: "blob"} ).then( function (content) {
                            saveAs( content, blogTitle + ".zip" );
                            _this.loading.close()
                            _this.Percentile = 0
                            _this.baseList = []
                        } );
                    } else {
                        _this.$message.error( {
                            title: "error",
                            message: "没有图片可下载"
                        } );
                    }
                }
            },
            deepItem(item) {
                this.imgUrl = item
                this.copyImgUrl()
            },
            userlogin(key) {
                let urls = window.location.href.split( '#/' )[0];
                let baseUrl = urls.substring( 0, urls.lastIndexOf( '/' ) );
                window.location.href = baseUrl + '/loginOrRegister.html#/?type=' + key
            },
            closeImgSet(val) {//关闭操作台
                this.showSetImg = false;
                this.imgMsg = {};
            },
            openImgSet(obj) {//打开操作台
                this.imgMsg = obj;
                this.showSetImg = true;
            },
            collectBg(obj) {
                // this.limitIdx++;
                this.allbgImg[obj.id] = obj
                if (!getSecImgs( 1 )) {
                    this.sesImgsSet( this.allbgImg );
                    return
                }
                let hasown = JSON.parse( getSecImgs( 1 ) ).some( (item) => {
                    return item.fileId == obj.fileId
                } );
                if (!hasown) this.sesImgsSet( this.allbgImg )
            },
            closeItem(item) {
                this.files.splice( item.index, 1 );
                this.rightImgList.splice( item.index, 1 );
                // console.log(this.$refs.imgRef)
                this.allbgImg.map( (val, index) => {
                    if (val.name === item.name || !val) this.allbgImg.splice( index, 1 )
                } )
                this.sesImgsSet( this.allbgImg )
            },
            upLoadimg() {//点击上传
                if (!getToken()) this.multiple = false;
                else this.multiple = true;
                this.$refs.upImg.value = '';
                this.$nextTick( () => {
                    this.$refs.upImg.click()
                } )
            },
            //下载多张抠图
            saveMove(key, e) {
                let that = this
                this.$message.closeAll()
                if (this.files.length !== this.allbgImg.length) {
                    this.$message( {type: 'warning', message: '正在处理中，请稍后...'} );
                    return
                }
                this.loading = this.$loading( {
                    lock: true,
                    text: '0 已完成',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                } );
                if (!this.classType) {
                    const allSub = this.$refs.subs
                    allSub.map( (item) => item.save( key, e, 'all' ) )
                    return
                }
                let allImgs = JSON.parse( JSON.stringify( this.allbgImg ) );
                let arr = allImgs.filter( (val, index) => {
                    return val.img
                } );
                // console.log(arr)
                if (key === 0) this.StoreDowQrcode( arr );
                else {
                    let filedId = [];
                    arr.map( (item, index) => {
                        filedId.push( item.fileId )
                    } );
                    getMattedImageMultiple( filedId ).then( res => {
                        if (!res.code) {
                            let newArr = res.data;
                            arr.map( (item, index) => {
                                item.img = newArr[index]
                            } );
                            this.StoreDowQrcode( arr )
                        } else {
                            this.loading.close()
                        }
                    } )
                }

            },

            //批量下载图片
            StoreDowQrcode(arr, blogTitle = "pictures") {
                console.log( arr )
                let zip = new JSZip();
                let imgs = zip.folder( blogTitle );
                let baseList = [];
                let _this = this;
                let callback = (objs) => {
                    let cans = document.createElement( 'canvas' )
                    let ctxs = cans.getContext( '2d' )
                    cans.width = objs.bgRemovedImg.width;
                    cans.height = objs.bgRemovedImg.height;
                    if (this.classType === 2) {
                        ctxs.fillStyle = this.selectColor;
                        ctxs.fillRect( 0, 0, cans.width, cans.height )
                    } else if (this.classType > 2) ctxs.putImageData( objs.dwonBg, 0, 0 );
                    ctxs.drawImage( objs.bgRemovedImg, 0, 0 );
                    let url = cans.toDataURL( "image/png" ); // 得到图片的base64编码数据 let url =
                    const name = objs.is.substring( 0, objs.is.lastIndexOf( '.' ) ).replace( /\//g, '%' )
                    console.log( objs.is, name )
                    baseList.push( {name: name + '.png', img: url.substring( 22 )} );
                    _this.Percentile += 1
                    _this.loading.text = _this.Percentile + '/' + arr.length + ' 已完成'
                    if (baseList.length === arr.length) {
                        if (baseList.length > 0) {
                            _this.loading.text = '打包中...'
                            for (let k = 0; k < baseList.length; k++) {
                                imgs.file( baseList[k].name, baseList[k].img, {
                                    base64: true
                                } );
                            }
                            zip.generateAsync( {type: "blob"} ).then( function (content) {
                                saveAs( content, blogTitle + ".zip" );
                                _this.loading.close()
                                _this.Percentile = 0
                            } );
                        } else {
                            _this.$message.error( {
                                title: "error",
                                message: "没有图片可下载"
                            } );
                        }
                    }
                }
                for (let i = 0; i < arr.length; i++) {
                    this.drawStyleBg( arr[i], this.classType, callback, arr[i].filename )
                }
            },
            copyImgUrl(url, k) {//粘贴图片链接确定
                if (!this.imgUrl && !url) {
                    this.$message( {
                        message: '图片地址不可为空',
                        type: 'warning'
                    } );
                    return
                }
                k ? '' : this.toscroll();
                let name = parseInt( Math.random() * 100000000000 );
                this.files.unshift( {
                    url: url ? url.url : this.imgUrl,
                    name: name,
                    filename: url ? (url.filename ? url.filename : url.url) : this.imgUrl,
                    type: 'copy',
                    fileId: url ? url.fileId : ''
                } )
                this.imgUrlss( {
                    url: url ? url.url : this.imgUrl,
                    name: name,
                    filename: url ? (url.filename ? url.filename : url.url) : this.imgUrl,
                    type: 'copy',
                    fileId: url ? url.fileId : ''
                } )
                this.imgUrl = ''
            },
            changeImg(ev) {//图片上传
                const e = ev.target
                if (e.files.length > 30) {
                    this.$message( {
                        type: 'warning',
                        message: '最多同时上传30张图片，请分批次进行上传。'
                    } )
                    return
                }
                this.toscroll();
                for (let i = 0; i < e.files.length; i++) {
                    this.files.unshift( {
                        url: e.files[i],
                        name: parseInt( Math.random() * 100000000000 ),
                        type: 'file',
                        filename: e.files[i].name
                    } );
                }
                this.imgUrlss( e.files )
            },
            toscroll() {
                // let oDiv = this.$refs.contentImg.offsetTop;
                $( 'body,html' ).animate( {scrollTop: 620}, 500 );
            },
            toApi() {
                window.location.href = 'apis.html'
            },
            imgUrlss(obj) {//rightImgList
                let _self = this
                let newArr = new Array( obj.length ).fill( 0 );
                if (obj.type === 'copy') {
                    this.rightImgList.unshift( {url: obj.url, name: obj.name} )
                    this.allbgImg = [0, ...this.allbgImg]
                } else {
                    for (let i = 0; i < obj.length; i++) {
                        let reader = new FileReader();
                        reader.readAsDataURL( obj[i] );
                        //监听文件读取结束后事件
                        reader.onloadend = function (e) {
                            newArr[i] = {url: e.target.result, name: obj[i].name}
                            let t = newArr.every( (item, index) => {
                                return item !== 0
                            } )
                            if (t) _self.rightImgList = [...newArr.reverse(), ..._self.rightImgList]
                            // console.log(_self.allbgImg,"11111111111111111111111")
                        }
                    }
                    this.allbgImg = [...new Array( obj.length ).fill( 0 ), ...this.allbgImg]
                }
            },
            goThisImg(index) {
                let _self = this
                this.scrollStop = false
                this.selectImg = index;
                let dome = document.getElementsByClassName( 'imgRef' );
                $( 'body,html' ).animate( {scrollTop: dome[index].offsetTop - 75}, 500, () => {
                    _self.scrollStop = true
                } );
                // setTimeout(()=>{
                //
                // },500)
            },
            openHistory() {
                this.showHistory = true
                let data = {
                    page: this.page,
                    pageSize: this.rows,
                    mattingType: 6
                }
                userHistoryList( data ).then( res => {
                    if (!res.code) {
                        this.historyList = res.data;
                        let newArr = Object.keys( res.data ), num = 0
                        for (let i = 0; i < newArr.length; i++) {
                            num += res.data[newArr[i]].length
                        }
                        if (num < data.pageSize) this.stopUpdata = true
                    }
                } )
            },
            closeHistory() {
                this.showHistory = false
            },
            drawStyleBg(obj, key, callback, i) {//批量下载封装
                let that = this
                let imgLoaded = false;
                let originalImgLoaded = false;
                let img = new Image()
                img.crossOrigin = '';
                img.onload = function () {
                    imgLoaded = true;
                    if (imgLoaded && originalImgLoaded) {
                        that.downOthers( {oldImg: originalImg, bgImg: img, name: obj.name}, key, callback, i )
                    }
                }
                img.src = obj.img + `?str=${Math.random()}`;
                let originalImg = new Image();
                originalImg.crossOrigin = '';
                originalImg.onload = function () {
                    originalImgLoaded = true;
                    if (imgLoaded && originalImgLoaded) {
                        that.downOthers( {oldImg: originalImg, bgImg: img, name: obj.name}, key, callback, i )
                    }
                }
                originalImg.src = obj.Original + `?str=${Math.random()}`;
            },
            downOthers(imgObjs, index, callback, i) {//效果图下载
                let canvasTemp = document.createElement( 'canvas' );
                canvasTemp.width = imgObjs.bgImg.width; //☜
                canvasTemp.height = imgObjs.bgImg.height;
                let ctx = canvasTemp.getContext( "2d" );
                ctx.drawImage( imgObjs.oldImg, 0, 0, canvasTemp.width, canvasTemp.height );
                let imgData = ctx.getImageData( 0, 0, canvasTemp.width, canvasTemp.height );
                let newBg1 = imgData;
                let newBg4 = ctx.getImageData( 0, 0, canvasTemp.width, canvasTemp.height );
                JSManipulate.blur.filter( newBg1, {amount: 5.0} );
                JSManipulate.grayscale.filter( newBg4 );
                callback( {
                    dwonBg: index === 3 ? newBg4 : newBg1,
                    bgRemovedImg: imgObjs.bgImg,
                    name: imgObjs.name,
                    is: i//下载名称
                } )
            },
            getmoveHis(e) {
                let historyList = this.$refs.historyList, scrollTop = e.target.scrollTop;
                console.log( historyList.offsetHeight, historyList.scrollHeight )
                if (scrollTop + historyList.offsetHeight > historyList.scrollHeight - 20) {
                    if (!this.stopUpdata) {
                        this.rows += 10;
                        this.openHistory()
                    }
                }
            },
            addItem(item) {
                this.copyImgUrl( {url: item.originalImage, fileId: item.id} )
            },
            stopPrevent() {//阻止游览器默认打开图片
                let _self = this
                document.addEventListener( "drop", function (e) {  //拖离
                    e.preventDefault();
                } );
                document.addEventListener( "dragleave", function (e) {  //拖后放
                    e.preventDefault();
                } );
                document.addEventListener( "dragenter", function (e) {  //拖进
                    e.preventDefault();
                } );
                document.addEventListener( "dragover", function (e) {  //拖来拖去
                    e.preventDefault();
                } );
                let oDrops = document.getElementsByClassName( 'drops' );
                for (let i = 0; i < oDrops.length; i++) {
                    oDrops[i].addEventListener( "drop", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        // e.cancelable=true
                        let files = e.dataTransfer.files;
                        // console.log(files)
                        if (!files.length) return;
                        if (!getToken() && files.length > 1) {
                            console.log( files )
                            _self.$message( {type: 'error', message: '登录后可批量上传'} )
                            return
                        }
                        _self.toscroll();
                        for (let i = 0; i < files.length; i++) {
                            console.log( files )
                            _self.files.unshift( {
                                url: files[i],
                                name: parseInt( Math.random() * 100000000000 ),
                                type: 'file',
                                filename: files[i].name
                            } )
                        }
                        _self.imgUrlss( files )
                    } )
                }
            },
            scrollFun() {
                if (!this.scrollStop || this.rightImgList.length < 2) return;
                let oDiv = document.getElementsByClassName( 'imgRef' )
                // let oImg=document.querySelector('.ImgLists .imgs div')
                if (oDiv.length < 2) return;
                let _self = this
                Array.prototype.slice.call( oDiv ).map( (item, index) => {
                    let t = item.getBoundingClientRect().top;
                    if (t > 0 && t < 100) {
                        _self.selectImg = index;
                        // console.log(document.querySelectorAll('.ImgLists .imgs > div')[index])
                        let o = document.querySelectorAll( '.ImgLists .imgs > div' )[index].offsetTop;
                        // console.log(document.querySelectorAll('.ImgLists .imgs > div')[index])
                        $( "#niceScrolls" ).getNiceScroll( 0 ).doScrollTop( o );
                        return
                    }
                } )
            },
            sesImgsSet(files) {
                let arr = []
                files.map( (item, index) => {
                    if (!item.noSave) {
                        arr.push( {Original: item.Original, fileId: item.fileId, filename: item.filename} )
                    }
                } )
                setSecImgs( JSON.stringify( arr ), 5 )
            },
            getsesImgsSet() {
                if (!getSecImgs( 5 )) return;
                let arr = JSON.parse( getSecImgs( 5 ) ).reverse();
                if (!arr) return;
                arr.map( (item) => {
                    this.copyImgUrl( {url: item.Original, fileId: item.fileId, filename: item.filename}, 1 )
                } )
            },
            deleteAllImg() {//删除全部
                this.$confirm( '确定要删除全部么', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                } ).then( () => {
                    this.files = [];
                    this.rightImgList = [];
                    // console.log(this.$refs.imgRef)
                    this.allbgImg = [];
                    this.sesImgsSet( this.allbgImg );
                    $( 'body,html' ).animate( {scrollTop: 0}, 500 );
                    this.$message( {
                        type: 'success',
                        message: '删除成功!'
                    } );
                } ).catch( () => {

                } );
            },
            initindexImg(){//接收从首页过来的图片
                let imgUrl=window.localStorage.getItem('initImg');
                if(imgUrl){
                    window.localStorage.removeItem('initImg');
                    this.deepItem(imgUrl)
                }
            }

        },
        created() {
            const data = localStorage.getItem( 'initStatus' ) ? JSON.parse( localStorage.getItem( 'initStatus' ) ) : '';
            this.$store.commit( 'SET_INIT_STATUS', data )
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .helloFirst {
        background-color: #f5f5f6;

        .apps {
            padding-right: 75px;
        }

        .apps.tactive {
            padding-right: 85px;
        }

        .Operator {
            line-height: 1;
            color: #333;
            width: 244px;
            background-color: #fff;
            font-size: 14px;
            height: 100%;
            position: fixed;
            left: 0;
            top: 60px;
            z-index: 1001;

            h6 {
                padding: 27px 0 25px 34px;
                font-weight: 500;
                font-size: 14px;
                color: #666;
            }

            .el-button {
                border-radius: 0;
                width: 160px;
                height: 40px;
                background-color: #e82255;
                color: #fff;
                border-color: #e82255;
                margin: 0 0 14px 42px;
            }

            .afterbtn {
                padding: 0 0 0 42px;

                span {
                    color: #e82255;
                }
            }

            .center {
                margin-top: 24px;
                padding: 24px 0 27px 34px;
                border-top: 1px solid #e5e5e5;
                border-bottom: 1px solid #e5e5e5;

                .flex img {
                    margin-right: 6px;
                }

                h5 {
                    font-weight: 500;
                    font-size: 14px;
                    margin-bottom: 24px;
                    color: #666;
                }

                input {
                    border: none;
                    border-bottom: 1px solid #333;
                    line-height: 40px;
                    height: 40px;
                    margin-left: 8px;
                    margin-bottom: 22px;
                    padding-left: 25px;
                }

                input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
                    color: #333;
                }

                input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                    color: #333;
                }

                input::-moz-placeholder { /* Mozilla Firefox 19+ */
                    color: #333;
                }

                input:-ms-input-placeholder { /* Internet Explorer 10-11 */
                    color: #333;
                }

                .flex {
                    margin: 0 0 0 8px;
                }
            }

            .bottonLast {
                padding: 30px 0 30px 34px;
                font-size: 14px;
                /*font-weight: 600;*/
                flex-direction: column;
                justify-content: space-between;

                .flex img {
                    margin-right: 10px;
                }

                & > div:first-child {
                    margin-bottom: 30px;
                }

                & > div:nth-child(2) {
                    /*margin-bottom: 376px;*/
                }

                h5 {
                    margin-bottom: 24px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #666;
                }

                .fixedB {
                    position: absolute;
                    left: 34px;
                    bottom: 100px;

                    .flex {
                        position: relative;
                        margin-bottom: 15px;

                        &:hover .noC {
                            display: block;
                        }

                        .noC {
                            position: absolute;
                            bottom: 0;
                            right: -116px;
                            display: none;
                        }
                    }

                    a {
                        color: #333;
                    }
                }
            }

            .historyList {
                position: absolute;
                width: 570px;
                background-color: #fff;
                right: -644px;
                top: 8px;
                height: 80%;
                padding: 24px 34px 0;
                z-index: 1001;
                box-shadow: 0 0 3px rgba(0, 0, 0, .4);

                .hisimgs {
                    height: 95%;
                    overflow-y: auto;
                }

                i {
                    font-size: 20px;
                    position: absolute;
                    top: 8px;
                    right: 8px;
                }

                .oneDate {
                    margin-bottom: 30px;
                }

                .oneDate:nth-last-child(2) {
                    margin-bottom: 0;
                }

                h4 {
                    font-size: 26px;
                    line-height: 1;
                    margin-bottom: 20px;
                    font-weight: 500
                }

                .flex {
                    flex-wrap: wrap;

                    & > div {
                        width: 100px;
                        height: 100px;
                        margin-right: 12px;
                        margin-bottom: 15px;
                        overflow: hidden;

                        img {
                            display: block;
                            width: 100%;
                            /*height: 100%;*/
                        }

                        &:nth-child(5n) {
                            margin-right: 0;
                        }
                    }
                }
            }
        }

        .OperatorRight {
            margin: 60px 0 0 244px;
            flex: 1;
            padding: 15px 0 0 15px;

            .imgRef.active {
                margin-bottom: 85px;
            }

            .newChunk {
                background-color: #fff;
                padding: 60px 0 80px;
                line-height: 1;
                text-align: center;
                margin-bottom: 15px;

                h2 {
                    font-size: 34px;
                    font-weight: bold;
                }

                & > p {
                    font-size: 20px;
                    margin: 20px 0 50px 0;
                    color: #777;
                }

                & > .flex {
                    justify-content: center;
                }

                .gifright {
                    text-align: left;
                    width: 280px;
                    margin-left: 78px;

                    & > .aList {
                        font-size: 14px;
                        justify-content: space-between;
                        margin-bottom: 50px;
                        padding-right: 20px;

                        a {
                            color: #333;

                            &:hover {
                                color: #e82255;
                            }
                        }
                    }

                    .el-button, .el-input {
                        display: block;
                        width: 100%;
                        border-radius: 10px;
                        height: 50px;
                        margin-bottom: 20px;

                        input {
                            height: 100%;
                            background-color: rgb(243, 243, 243);
                            border-color: #fff;
                        }
                    }

                    .el-input {
                        margin-bottom: 15px;
                        background-color: rgb(243, 243, 243);
                    }

                    p {
                        font-size: 14px;
                        color: #999;
                        line-height: 28px;
                    }

                    .flex div {
                        width: 62px;
                        height: 62px;
                        border-radius: 5px;
                        margin-right: 12px;
                    }

                    .titlips {
                        font-size: 14px;

                        a {
                            color: #999;
                        }
                    }
                }
            }
        }

        .ImgLists {
            position: fixed;
            right: 25px;
            top: 75px;
            width: 40px;
            max-height: 70%;
            z-index: 88;

            .el-scrollbar {
                z-index: 999;
            }

            .imgs {
                max-height: 450px;
                /*overflow-y: auto;*/
                /*overflow-x: hidden;*/
            }

            .imgs > div {
                margin-bottom: 8px;
                height: 40px;
                width: 100%;

                img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }

            .imgs > div.active {
                border: 1px solid #e82255;
                width: 38px;
                height: 38px;
            }

            .downBtn {
                line-height: 40px;
                position: relative;
                right: 0;
                min-width: 40px;
                text-align: center;
                color: #fff;
                background-color: #e82255;

                & > span {
                    display: block;
                    height: 100%;
                    line-height: 16px;
                    font-size: 12px;
                    padding: 5px;
                }

                &:hover .sizeChoses {
                    display: block;
                }
            }

            .deAll {
                display: block;
                line-height: 16px;
                font-size: 12px;
                padding: 5px;
                color: #e82255;
                border: 1px solid #e82255;
                text-align: center;
            }
        }
    }

    .sizeChoses {
        display: none;
        position: absolute;
        border: 1px solid #efefef;
        border-radius: 10px;
        font-size: 12px;
        line-height: 30px;
        color: #333;
        padding: 10px 12px;
        background-color: #fff;
        z-index: 99;
        right: 40px;
        top: 0;
        text-align: left;

        & > div {
            margin-bottom: 10px;

            span:first-child {
                width: 130px;
            }

            span:nth-child(2) {
                width: 110px;
            }

            span.cu {
                width: 50px;
                text-align: center;
                line-height: 24px;
                border: 1px solid #e82255;
                border-radius: 13px;
                color: #e82255;
            }

            &:last-child {
                margin-bottom: 0;
                text-align: right;

                i {
                    border-bottom: 1px solid #a1a0a0;
                    margin-left: 10px;
                }

                color: #a1a0a0;
            }
        }

        &:hover {
            display: block;
        }

        .btn {
            height: 40px;
            padding: 0 10px 8px;
            border-bottom: 1px solid #ececec;
            margin-bottom: 8px;

            & > div {
                position: relative;
            }

            .color_List {
                position: relative;
                top: -250px;
                left: 50%;
                margin-left: -100px;
                width: 240px;
                flex-wrap: wrap;
                box-shadow: 0 0 10px #333;
                margin-top: 10px;
                z-index: 88;
                background-color: #fff;

                span:first-child {
                    margin-bottom: 10px;
                }

                span {
                    width: 20px;
                    height: 20px;
                }

                .selectC {
                    box-shadow: 0 0 8px #fff inset;
                }
            }
        }

        .btn > div {
            background-repeat: no-repeat;
            background-position: center;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 2px solid #999;
            margin-right: 12px;
            background-size: cover;
        }

        .btn .active {
            border-color: #e82255;
        }
    }

    .el-icon-loading {
        font-size: 36px;
    }

    .el-loading-spinner p.el-loading-text {
        font-size: 24px;
    }


    @media screen and (max-width: 1500px) {
        .helloFirst .apps {
            padding-right: 55px;
        }
        .helloFirst .ImgLists {
            right: 10px;
        }
        .helloFirst .ImgLists {
            .imgs {
                max-height: 380px;
            }

            .sizeChoses {
                bottom: auto;
                right: 40px;
                top: -100px;
            }
        }
        .content .rightBig {
            padding-right: 55px;

            .bigimg {
                max-width: 862px;
            }
        }
    }
</style>
