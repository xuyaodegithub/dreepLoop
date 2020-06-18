<template>
    <div class="helloFirst">
        <input type="file" style="display: none" ref="upImg" @change="changeImg($event)"
               accept="image/*"/>
        <header-sub></header-sub>
        <div class=" apps">
            <div class="Operator">
                <h6><!--Local images-->本地图像</h6>
                <el-button type="primary" round icon="el-icon-upload2" @click="upLoadimg()"><!--Upload-->上传</el-button>
<!--                <p class="afterbtn" v-if="!LoginStatus"><span class="cu" @click="userlogin(0)">登录</span>-->
<!--                    &lt;!&ndash;for batch upload&ndash;&gt;后批量上传</p>-->
                <div class="center">
                    <h5>Web 图片</h5>
                    <div style="position: relative;">
                        <img src="../../assets/image/inputImg.png" alt=""
                             style="position: absolute;left: 8px;top: 12px;">
                        <input type="text" placeholder="CTRL+V图像或URL" v-model="imgUrl"
                               @focus="$event.target.select()" class="upcas">
                    </div>
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
                            <img src="../../assets/image/wxl.png" alt="" class="noC">
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
                                    <img :src="item.originalImage" alt="" class="cu" @click="deepItem(item.originalImage)">
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
                    <h2>智能图像修复</h2>
                    <p>想修哪里修哪里、-秒抹去瑕疵、毫无痕迹</p>
                    <div class="flex">
                        <div class="gif"><img src="../../assets/image/fix.gif" alt=""></div>
                        <div class="gifright">
                            <el-button type="primary" round icon="el-icon-upload2" @click="upLoadimg()"><!--Upload-->
                                上传图像
                            </el-button>
                            <el-input v-model="imgUrl" class="upcas" placeholder="CTRL+V粘贴图像或者URL"
                                      @focus="$event.target.select()"></el-input>
                            <div class="titlips">
                                <!--                                <a href="docsify/#/apidoc_api.md" target="_blank">人像API:可带人体关键点位置></a>-->
                                <a href="https://www.google.cn/chrome/" target="_blank">推荐使用：谷歌游览器 <img
                                        src="@/assets/image/img1.png" alt="">，防止兼容问题</a>
                            </div>
                            <p>没有图像？试试以下图片看看效果</p>
                            <div class="flex a-i">
                                <div :style="{backgroundImage:`url(${item})`,backgroundSize:'cover',backgroundPosition:'center'}"
                                     v-for="(item,idx) in initimgsList" :key="idx" @click="deepItem(item)"
                                     class="cu"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="subList" v-for="(item,idx) in picDes" :key="idx">
                    <pic-sub :data="item"/>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    import headerSub from '@/components/header/index.vue'
    import {getToken} from "../../utils/auth";
    import {compressImg} from "../../utils";
    import { userHistoryList,uploadossBg} from "../../apis";
    import picSub from '@/components/picSub'
    import m1 from '@/assets/image/1.1.jpg'
    import m11 from '@/assets/image/1.jpg'
    import m2 from '@/assets/image/2.1.jpg'
    import m22 from '@/assets/image/2.jpg'
    import m3 from '@/assets/image/3.1.jpg'
    import m33 from '@/assets/image/3.jpg'
    import m4 from '@/assets/image/4.1.jpg'
    import m44 from '@/assets/image/4.jpg'
    import m5 from '@/assets/image/5.1.jpg'
    import m55 from '@/assets/image/5.jpg'

    export default {
        name: 'HelloWorld',
        data() {
            return {
                initimgsList: [
                    'https://deeplor.oss-cn-hangzhou.aliyuncs.com/matting2/2020/06/12/1.png',
                    'https://deeplor.oss-cn-hangzhou.aliyuncs.com/matting2/2020/06/12/2.jpg',
                    'https://deeplor.oss-cn-hangzhou.aliyuncs.com/matting2/2020/06/12/3.png',
                    'https://deeplor.oss-cn-hangzhou.aliyuncs.com/matting2/2020/06/12/4.png',
                ],
                historyList: {},
                showHistory: false,
                files: [],
                imgUrl: '',//图片链接
                page: 1,
                rows: 30,
                stopUpdata: false,//停止滑动加载
                picDes: [
                    {title: '图片去水印', des: '不论是文字水印，还是logo水印。1秒恢复加水印前的样子', arrm: [m1, m11, '', '']},
                    {title: '老照片翻新', des: '时间是把杀猪刀，砍了爸妈的结婚证，我们萌萌的小脸，同学欢笑的时光。1秒抹平岁月的褶皱', arrm: [m2, m22, '', '']},
                    {title: '去除皱纹和雀斑', des: '我们崇尚自然的美，也追求那定格的极致。1秒让美丽无痕', arrm: [m3, m33, '', '']},
                    {title: '误入镜头的人物', des: '旅游的美好回忆，等了好久才拍的照片，有人闯了进来。1秒让回忆更加美好', arrm: [m4, m44, '', '']},
                    {title: '去掉不需要的物体', des: '那些诗与远方，不应该有栏杆、垃圾桶、电线杆相伴。1秒让风景变纯粹。', arrm: [m5, m55, '', '']},
                ]
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
        },
        watch: {},
        mounted() {
            this.stopPrevent();
            if (getToken()) this.userGetscribe();
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

        },
        computed: {
            ...mapGetters( [] ),
            LoginStatus() {//登录状态
                return getToken() ? true : false;
            },
        },
        components: {
            headerSub, picSub
        },
        methods: {
            ...mapActions( [
                'userGetscribe'
            ] ),
            deepItem(item) {
                compressImg(item,1).then(blob=>{
                    let fromData=new FormData();
                    fromData.set('file',blob);
                    uploadossBg(fromData).then(res=>{
                        const data={
                            img:res.data,
                            name:item
                        }
                        window.localStorage.setItem('repairInfo',JSON.stringify(data));
                        window.open('repairEdit.html');
                    })
                })
                // let data={
                //     img:item,
                //     name:item
                // }
                // window.localStorage.setItem('repairInfo',JSON.stringify(data))
                // window.open('repairEdit.html');
            },
            userlogin(key) {
                window.location.href = 'loginOrRegister.html'
            },
            upLoadimg() {//点击上传
                this.$refs.upImg.value = '';
                this.$nextTick( () => {
                    this.$refs.upImg.click()
                } )
            },
            copyImgUrl(url, k) {//粘贴图片链接确定

            },
            changeImg(ev) {//图片上传
                const file = ev.target.files[0];
                compressImg(file).then(blob=>{
                    let fromData=new FormData();
                    fromData.set('file',blob)
                    uploadossBg(fromData).then(res=>{
                        const data={
                            img:res.data,
                            name:file.name
                        }
                        window.localStorage.setItem('repairInfo',JSON.stringify(data))
                        window.open('repairEdit.html');
                    })
                })
            },
            toApi() {
                window.location.href = 'apis.html'
            },
            openHistory() {
                this.showHistory = true;
                let data = {
                    page: this.page,
                    pageSize: this.rows,
                    mattingType:5
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
                console.log( historyList.offsetHeight, historyList.scrollHeight )
                if (scrollTop + historyList.offsetHeight > historyList.scrollHeight - 20) {
                    if (!this.stopUpdata) {
                        this.rows += 10;
                        this.openHistory()
                    }
                }
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
                        if (files.length > 1) {
                            _self.$message( {type: 'error', message: '请单张图片上传'} )
                            return
                        }
                        _self.changeImg({target:{files:[files[0]]}})
                    } )
                }
            },

        },
        created() {

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
                background-color: $pic;
                color: #fff;
                border-color: $pic;
                margin: 0 0 14px 42px;
            }

            .afterbtn {
                padding: 0 0 0 42px;

                span {
                    color: $pic;
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

                    .el-button {
                        background-color: $pic;
                        border-color: $pic;
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
                        margin-bottom: 60px;
                        background-color: rgb(243, 243, 243);
                    }

                    p {
                        font-size: 14px;
                        color: #999;
                        line-height: 28px;
                        margin-bottom: 8px;
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
                            display: block;
                            line-height: 28px;
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
                border: 1px solid $pic;
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
                background-color: $pic;

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
                color: $pic;
                border: 1px solid $pic;
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
                border: 1px solid $pic;
                border-radius: 13px;
                color: $pic;
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
            border-color: $pic;
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
