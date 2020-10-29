<template>
    <div class="helloFirst">
        <input type="file" style="display: none" ref="upImg" @change="changeImg($event)" :multiple="multiple"
               accept="image/*,video/*,video/mp4,video/x-m4v,image/gif"/>
        <!--        -->
        <header-sub></header-sub>
        <div class=" apps">
            <div class="Operator">
                <h6><!--Local images-->本地图像</h6>
                <el-button type="primary" round @click="upLoadimg()"><img style="height: 20px;margin-right: 10px;"
                                                                          src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200811/f74e8180882a4cc282dc70c541c7712e.png"
                                                                          alt=""> 上传图片/视频
                </el-button>
                <uploadBymobile @success="deepItem" ref="uploadSub" :color="2"></uploadBymobile>
                <p class="afterbtn" v-if="!LoginStatus"><span class="cu" @click="showLoginDilogAction">登录</span>
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
<!--                    <div class="flex a-i cu" @click="openHistory()">-->
<!--                        <img src="../../assets/image/img2.png" alt="">-->
<!--                        <span>&lt;!&ndash;History&ndash;&gt;历史记录</span>-->
<!--                    </div>-->
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
                    <h2>黑科技，一键变卡通</h2>
                    <p>头像、人像、照片、视频，上传就可以变成漫画、动漫、动画片</p>
                    <div class="flex a-i">
                        <div class="gif"><img
                                src="https://deeplor.oss-cn-hangzhou.aliyuncs.com/matting2/2020/10/19/cartoon.gif"
                                alt=""></div>
                        <div class="gifrights">
                            <div>
                                <el-button type="primary" round @click="upLoadimg()"><img
                                        style="height: 20px;margin-right: 10px;"
                                        src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200811/f74e8180882a4cc282dc70c541c7712e.png"
                                        alt=""> 上传图片/视频
                                </el-button>
                                <uploadBymobile @success="deepItem" ref="uploadSub" :color="2"></uploadBymobile>
                            </div>
<!--                            <el-input v-model="imgUrl" class="upcas" placeholder="CTRL+V粘贴图像或者URL"-->
<!--                                      @focus="$event.target.select()"></el-input>-->
                            <div class="imgVideo" style="margin-bottom: 20px;">
                                <div>支持格式：图片+视频
                                    <el-tooltip class="item" effect="dark" placement="bottom">
                                    <div slot="content" style="line-height: 22px;padding: 10px 20px;">
                                        <h3>图片</h3>
                                        <p>支持格式：.png, .jpg, .jpeg, .bmp, .gif</p>
                                        <p>最大文件大小：15M</p>
                                        <p>最大图片像素：4096 x 4096</p>
                                        <br>
                                        <h3>视频</h3>
                                        <p>支持格式：.mp4, .webm, .mov, .gif</p>
                                        <p>最大文件大小：500M</p>
                                        <p>最大视频清晰度：1080P</p>
                                    </div>
                                    <i class="el-icon-question" style="font-size: 14px;color: #999;"></i>
                                    </el-tooltip>
                                </div>
                                <div>CTRL+V粘贴图像/视频或者URL</div>
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
                <div v-for="(item,index) in files" :key="item.id" class="imgRef"
                     :id="item.id">
                    <!--                    :class="{'active' : index===files.length-1}"-->
                    <div v-if="item.subType===1">
                        <img-sub :files="item" @close="closeItem" :id="item.id" ref="subs"></img-sub>
                    </div>
                    <div v-else-if="item.subType===2">
                        <matting-video :filesMsg="item" ref="videoSubs" @close="closeItem" @preVideo="preVideo"
                                       :white="true" :mattingType="11"></matting-video>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog
                title="视频预览"
                :close-on-click-modal="false"
                custom-class="dialogVidoe"
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="beforClose">
            <div>
                <video :src="videoUrl" controls :style="colorList[backIdx] | backColor" autoplay loop>
                    <source :src="videoUrl" type="video/webm">
                </video>
                <!--                <div class="colorList flex">-->
                <!--                <span :style="item | backColor" v-for="(item,idx) in colorList" class="cu" @click="backIdx=idx"-->
                <!--                      :key="idx">{{item.val ? '' : '原视频'}}</span>-->
                <!--                </div>-->
            </div>

        </el-dialog>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';
    import JSZip from 'jszip';
    import {saveAs} from "file-saver";
    import headerSub from '@/components/header/index.vue';
    import imgSub from '@/components/showImgSub/cartoonSub.vue';
    import mattingVideo from '@/components/mattingVideo/index.vue';
    import {getToken, getSecImgs, setSecImgs} from "../../utils/auth";
    import {getMattedImageMultiple, userHistoryList, videoDelete} from "../../apis";
    import {niceScroll} from 'jquery.nicescroll';
    import uploadBymobile from '@/components/uploadBymobile';
    import {BrowserInfo} from '@/utils'

    export default {
        name: 'HelloWorld',
        data() {
            return {
                initimgsList: [
                    'https://deeplor.oss-cn-hangzhou.aliyuncs.com/matting2/2020/10/19/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20201024113731.png',
                    'https://deeplor.oss-cn-hangzhou.aliyuncs.com/matting2/2020/10/19/1ce01eff46d94a09a887d42bc040bcd1.png',
                    'https://deeplor.oss-cn-hangzhou.aliyuncs.com/matting2/2020/10/19/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20201024114436.png',
                    'https://deeplor.oss-cn-hangzhou.aliyuncs.com/matting2/2020/10/19/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20201024114551.png',
                ],
                selectImg: 0,
                multiple: false,
                allbgImg: [],
                historyList: {},
                showHistory: false,
                files: [],
                imgUrl: '',//图片链接
                page: 1,
                rows: 30,
                classType: 0,
                stopUpdata: false,//停止滑动加载
                scrollStop: true,
                dialogVisible: false,
                videoUrl: '',
                colorList: [{title: '原视频', val: ''}, {title: '绿色', val: '#00ff00'}, {
                    title: '蓝色',
                    val: '#0000ff'
                }, {title: '黑色', val: '#000000'}, {title: '白色', val: '#ffffff'},],
                backIdx: 0
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
            backColor(item) {
                return item.val ? {backgroundColor: item.val} : {
                    backgroundImage: `url(http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200908/df33b43838364e9bad916013d3c116f6.jpg)`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }
            }
        },
        watch: {},
        mounted() {
            this.stopPrevent();
            if (getToken()) this.userGetscribe();
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
            // $('.hisimgs').niceScroll({cursorcolor :'#999999',boxzoom:0true});
        },
        destroyed() {
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
            headerSub, imgSub, uploadBymobile, mattingVideo
        },
        methods: {
            ...mapActions( [
                'userGetscribe', 'showLoginDilogAction'
            ] ),
            beforClose(done) {
                this.videoUrl = '';
                this.backIdx = 0;
                done()
            },
            fileType(type) {
                return (type.includes( 'video' ) || type.includes( 'gif' )) ? 2 : 1;//1图片  2视频
            },
            preVideo(item) {//预览视频
                if (BrowserInfo.isSafari) {
                    this.$confirm( '目前Safari游览器不支持视频预览，建议使用谷歌游览器体验?', '提示', {
                        confirmButtonText: '前往下载谷歌游览器',
                        cancelButtonText: '取消',
                        type: 'warning'
                    } ).then( () => {
                        window.open( 'https://www.google.cn/chrome/' )
                    } ).catch( () => {

                    } );
                    return;
                }
                this.videoUrl = item;
                this.dialogVisible = true;
            },
            deepItem(item) {
                this.imgUrl = item;
                this.copyImgUrl( this.imgUrl )
            },
            closeItem(taskFlag, id) {
                const idx = this.files.findIndex( item => item.id === id );
                if (taskFlag) {
                    videoDelete( {taskFlag} ).then( res => {
                        if (!res.code) {
                            this.$message( {message: '删除成功', type: 'success'} );
                            this.files.splice( idx, 1 );
                        }
                    } )
                } else this.files.splice( idx, 1 );

            },
            upLoadimg() {//点击上传
                if (!getToken()) this.multiple = false;
                else this.multiple = true;
                this.$refs.upImg.value = '';
                this.$nextTick( () => {
                    this.$refs.upImg.click();
                } )
            },
            //批量下载图片
            copyImgUrl(url, id) {//粘贴图片链接确定
                this.toscroll();
                this.files.unshift( {
                    file: url,
                    id: this.files.length ? this.files[0].id + 1 : 0,
                    type: 'url',
                    subType: 1,
                    fileId: id ? id : ''
                } )
                this.imgUrl = ''
            },
            changeImg(ev) {//图片上传
                const e = ev.target;
                if (e.files.length > 30) {
                    this.$message( {
                        type: 'warning',
                        message: '最多同时上传30张图片，请分批次进行上传。'
                    } )
                    return
                }
                if((e.files.length >1 && !getToken()) || (e.files.length ===1 && this.fileType( e.files[0].type )===2 && !getToken())){
                    this.showLoginDilogAction()
                    return
                }
                this.toscroll();
                for (let i = 0; i < e.files.length; i++) {
                    const fileItem = e.files[i];
                    this.files.unshift( {
                        file: fileItem,
                        id: this.files.length ? this.files[0].id + 1 : 0,
                        type: 'file',
                        subType: this.fileType( fileItem.type ),
                    } );
                }
            },
            toscroll() {
                // let oDiv = this.$refs.contentImg.offsetTop;
                $( 'body,html' ).animate( {scrollTop: 620}, 500 );
            },
            openHistory() {
                this.showHistory = true;
                let data = {
                    page: this.page,
                    pageSize: this.rows,
                    mattingType: 11
                }
                userHistoryList( data ).then( res => {
                    if (!res.code) {
                        this.historyList = res.data;
                        let newArr = Object.keys( res.data ), num = 0;
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
            getmoveHis(e) {
                let historyList = this.$refs.historyList, scrollTop = e.target.scrollTop;
                // console.log( historyList.offsetHeight, historyList.scrollHeight )
                if (scrollTop + historyList.offsetHeight > historyList.scrollHeight - 20) {
                    if (!this.stopUpdata) {
                        this.rows += 10;
                        this.openHistory()
                    }
                }
            },
            addItem(item) {
                this.copyImgUrl( item.originalImage, item.id )
            },
            stopPrevent() {//阻止游览器默认打开图片
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
                document.addEventListener( "drop", (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    let files = e.dataTransfer.files;
                    if (!files.length) return;
                    if (!getToken() && files.length > 1) {
                        this.$message( {type: 'error', message: '登录后可批量上传'} )
                        return
                    }
                    this.toscroll();
                    for (let i = 0; i < files.length; i++) {
                        const fileItem = files[i];
                        this.files.unshift( {
                            file: fileItem,
                            id: this.files.length ? this.files[0].id + 1 : 0,
                            type: 'file',
                            subType: this.fileType( fileItem.type ),
                        } )
                    }
                } )
            },
            initHisImage() {
                let data = {page: 1, pageSize: 20, mattingType: 11};
                userHistoryList( data ).then( res => {
                    if (!res.code) {
                        const obj = res.data;
                        if(obj.length<1)return;
                        obj.reverse().map( item => {
                            let itemson={id: this.files.length ? this.files[0].id + 1 : 0,}
                            if(item.hasOwnProperty('taskFlag'))itemson={...itemson,file: item,type:'obj', subType: 2,}
                            else itemson={...itemson,file: item.originalImage,type:'url', subType: 1,fileId: item.id}
                            this.files.unshift(itemson )
                        } )
                       this.toscroll();
                    }
                } )
            }
        },
        created() {
            this.initHisImage()
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

                .gifrights {
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

                    .el-input {
                        margin-bottom: 15px;
                        background-color: rgb(243, 243, 243);
                    }

                    p {
                        font-size: 12px;
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
                        font-size: 12px;

                        a {
                            color: #999;
                        }
                    }
                    .imgVideo{
                        font-size: 12px;
                        color: #333;
                        line-height: 22px;
                        h3{
                            margin-bottom: 15px;
                        }
                        p{
                            color: #333;
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

    .dialogVidoe {
        background-color: #202020 !important;

        .el-dialog__title {
            color: #fff;
        }

        .el-dialog__body {
            padding: 0;
        }

        .el-dialog__headerbtn .el-dialog__close {
            font-size: 18px;
            font-weight: 600;
        }

        video {
            display: block;
            max-width: 100%;
            max-height: 500px;
            object-fit: fill;
            margin: 0 auto;
        }

        .colorList {
            padding: 15px 0;
            justify-content: space-between;
            text-align: center;
            background-color: #202020;

            span {
                line-height: 40px;
                margin: 0 8px;
                height: 40px;
                flex: 1;
            }
        }
    }
</style>
