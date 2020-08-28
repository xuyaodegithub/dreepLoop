<template>
    <div class="mattingVideo">
        <el-popover
                placement="left"
                width="160"
                v-model="visible">
            <p>确定要删除这个视频，是否继续？</p>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="text" size="mini" @click="close">确定</el-button>
            </div>
            <i class="close cu el-icon-delete" slot="reference"></i>
        </el-popover>
        <div class="vupload" v-if="!upStatus">
            <div v-show="errStep<3">
                <p class="over">上传</p>
                <p class="name over">{{files.name}}</p>
                <el-progress :stroke-width="16" :percentage="upIng" color="#E82256" :show-text="false"></el-progress>
                <p class="jd">上传进度：{{upIng}}%</p>
            </div>
            <div v-show="errStep>2" class="err">
                <div class="title">上传失败</div>
                <div class="des">网络错误，请先确认网络正常后，重新上传！ <span @click="retry">点击重试</span></div>
            </div>
        </div>
        <div class="preview" v-else-if="upStatus===1">
            <p>预览</p>
            <div class="viewBox" v-loading="!preImglist.time"
                 element-loading-text="拼命加载中"
                 element-loading-spinner="el-icon-loading"
                 element-loading-background="rgba(0, 0, 0, 0.5)">
                <div class="title flex a-i">
                    <p class="over">{{files.name}}</p>
                    <span>时长：{{preImglist.time}}s</span><span>每秒{{preImglist.fps}}帧</span>
                </div>
                <el-carousel indicator-position="none" arrow="never" :height="imgH" :interval="3000"
                             @change="changIdx" ref="swiper"
                             :autoplay="autoplay">
                    <el-carousel-item v-for="(item,key) in preImglist.image" :key="key">
                        <div class="flex" style="height: 100%;">
                            <div><img :src="item" alt=""></div>
                            <div><img :src="preImglist.matting[key]" alt=""></div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
                <div class="flex point" @mouseenter="autoplay=false" @mouseleave="autoplay=true">
                    <span v-for="(it,idx) in preImglist.timeList" :key="idx" :class="{active :initialIdx == idx}"
                          @click="moveImg(idx)">
                        <i v-show="initialIdx == idx">{{parseInt(it) | minsfilter}}</i>
                    </span>
                </div>
            </div>
            <div class="setBtns flex a-i" v-show="preImglist.time">
                <div class="flex a-i">
                    <!--                    <div class="left_1">-->
                    <!--                        <div class="tit">背景为</div>-->
                    <!--                        <el-color-picker v-model="color" show-alpha :disabled="true"></el-color-picker>-->
                    <!--                    </div>-->
                    <div class="left_2">
                        <div class="tit">输出格式：</div>
                        <p>MOV文件</p>
                        <p></p>
                    </div>
                </div>
                <div class="flex a-i">
                    <div class="lright_1">
<!--                        <div class="tit">预览视频下载</div>-->
                        <p>预览时长：5秒</p>
                        <p>消耗秒数：0</p>
                    </div>
                    <div class="lright_btn_2 cu" v-show="!downMsg.open && !downMsg.err" @click="downPreVideo">
                                                {{preVideoUrl ? '保存预览视频' : '下载预览视频'}}
<!--                        下载预览视频-->
                    </div>
                    <div class="lright_btn_2 cu noback" v-show="downMsg.open">
                        <p>正在处理：<span class="co">{{downMsg.time}}%</span></p>
                        <el-progress :stroke-width="8" :percentage="downMsg.time" color="#E82256"
                                     :show-text="false"></el-progress>
                    </div>
                    <div class="err_mini" v-show="downMsg.err">
                        <div class="title"><i class="el-icon-circle-close"></i></div>
                        <div class="des">{{downMsg.des}} <br><span @click="retry">重新下载</span></div>
                    </div>
                </div>
                <div class="flex a-i">
                    <div class="lright_2">
<!--                        <div class="tit">全部视频下载</div>-->
                        <p>视频时长：{{parseInt(preImglist.time) | minsfilter}}</p>
                        <p>消耗秒数：{{parseInt(preImglist.time) | minsfilter}}</p>
                        <p>视频账户余额：{{userSubscribeData.videoRemaining | minsfilter}} &nbsp;<a href="videoPrice.html" style="color: #e82255;border-bottom: 1px solid #e82255;">去充值</a></p>
                        <!--                        <p>价格：40点</p>-->
                    </div>
                    <div class="lright_btn_1 cu" v-show="!downAllMsg.open && !downAllMsg.err" @click="toSureDown">
                        {{fullVideoUrl ? '保存全部视频' : '下载全部视频'}}
                    </div>
                    <div class="lright_btn_2 cu noback" v-show="downAllMsg.open">
                        <p>正在处理：<span class="co">{{downAllMsg.time}}%</span></p>
                        <el-progress :stroke-width="8" :percentage="downAllMsg.time" color="#E82256"
                                     :show-text="false"></el-progress>
                    </div>
                    <div class="err_mini" v-show="downAllMsg.err">
                        <div class="title"><i class="el-icon-circle-close"></i></div>
                        <div class="des">{{downAllMsg.des}} <br>
                            <span @click="retry" v-if="!downAllMsg.noPoint">重新下载</span>
                            <a href="videoPrice.html" v-else>前往充值</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="lastMes">
                <p>检查以上预览帧，以评估整个视频的质量，然后再进行处理。一旦开始，大约需要{{parseInt(preImglist.time*2.5) | minsfilter}}</p>
                <p>你需要一个视频剪辑软件来添加新的背景。<!--更多信息--></p>
            </div>
        </div>
        <div v-else class="errDiv">
            <div class="err">
                <div class="title">{{errMsg.title}}</div>
                <div class="des">{{errMsg.des}} <span @click="retry">点击重试</span></div>
            </div>
        </div>
    </div>
</template>

<script>
    import CryptoJS from "crypto-js" ;
    import { mapGetters } from 'vuex'
    import {BySha256, videoMatting, videoImgsPreview, videoPreview, videoMattingInfo, videoFullMatting} from '@/apis';
    import SparkMD5 from "spark-md5";
    import {getToken} from '@/utils/auth'

    export default {
        name: "index",
        props: {
            filesMsg: Object
        },
        data() {
            return {
                files: {},
                visible: false,
                autoplay: true,
                imgH: '300px',
                upIng: 0,
                initialIdx: 0,//轮播下标
                sha256s: '',
                stepNum: 0,//第几次上传
                stepAllNum: 0,//初始化上传次数
                taskFlag: '',//任务标记
                preImglist: {time: 0, fps: 0, name: '', image: [], matting: [], timeList: []},
                upStatus: 0,//0上传前 1上传后 2失败提示信息
                color: 'rgba(255,255,255,0)',
                timeOut: '',
                timeOut1: '',
                downMsg: {open: false, time: 0, err: false, des: '网络错误，请先确认网络正常后，重新操作！'},//下载预览图进度
                downAllMsg: {open: false, time: 0, err: false, des: '网络错误，请先确认网络正常后，重新操作！',noPoint:false},//下载预览图进度
                errStep: 0,//连续超过三次失败就报错
                errMsg: {title: '加载失败', des: '网络错误，请先确认网络正常后，重新操作！', errWhere: 0},
                preVideoUrl: '',
                fullVideoUrl: '',
                loadImg:''
            }
        },
        computed:{
        ...mapGetters( [
                'userSubscribeData'
            ] ),
        },
        methods: {
            initUp() {
                this.stepAllNum = Math.ceil( this.files.size / 1024 / 1024 / 2 );
                BySha256( {sha256: this.sha256s} ).then( res => {
                    if (!res.code) {
                        this.startMattingVideo()
                    }
                } )
            },
            startMattingVideo() {
                if (this.stepNum >= this.stepAllNum) {//上传完成后
                    this.upStatus = 1;
                    this.$nextTick( _ => {
                        let oView = document.documentElement.clientWidth > 1500 ? 500 : 400;
                        videoImgsPreview( {taskFlag: this.taskFlag} ).then( res => {//加载预览图轮播
                            if (!res.code) {
                                const result = res.data;
                                let oImg = new Image();
                                oImg.onload = () => {
                                    this.loadImg=oImg;
                                    this.imgH = oImg.width > oImg.height ? oImg.height * oView / oImg.width + 'px' : oView + 'px';
                                    this.preImglist = {
                                        time: result.seconds,
                                        timeList: result.previewImages.time,
                                        fps: result.fps,
                                        name: result.originalName,
                                        image: result.previewImages.image,
                                        matting: result.previewImages.matting
                                    };
                                };
                                oImg.src = result.previewImages.image[0]
                            } else {
                                this.upStatus = 2;
                                this.errMsg.errWhere = 1;//加载失败
                            }
                        } )
                    } )
                    return;
                }
                const step = Math.ceil( this.files.size / this.stepAllNum );
                let formData = new FormData(), start = this.stepNum * step, end = start + step;
                formData.append( 'file', this.files.slice( start, end ), this.files.name );
                // formData.append( 'sha256', this.sha256s );
                // formData.append( 'position', this.stepNum );
                // formData.append( 'contentLength', this.stepAllNum );
                let data = {
                    sha256: this.sha256s,
                    position: start,
                    contentLength: this.files.size
                }
                // if (this.taskFlag) formData.append( 'taskFlag', this.taskFlag );
                if (this.taskFlag) data['taskFlag'] = this.taskFlag;
                videoMatting( data, formData ).then( res => {
                    if (!res.code) {
                        this.errStep = 0;
                        this.stepNum += 1;
                        this.upIng = parseInt( end / this.files.size * 100 );
                        this.taskFlag = res.data.taskFlag;
                        this.timeOut = setTimeout( this.startMattingVideo, 500 );
                    } else {
                        if (this.errStep > 2) return;
                        else {
                            this.errStep += 1;
                            this.timeOut = setTimeout( this.startMattingVideo, 500 )
                        }
                    }
                } )
            },
            changIdx(n, o) {
                this.initialIdx = n;
            },
            moveImg(i) {
                this.$refs.swiper.setActiveItem( i )
            },
            close() {
                this.$emit( 'close', this.taskFlag,this.filesMsg.id )
            },
            retry() {//点击重试
                if (this.downMsg.err) {
                    this.downMsg.err = false;
                    this.downPreVideo();
                } else if (this.downAllMsg.err) {
                    this.downAllMsg.err = false;
                    this.toSureDown();
                    // this.downPreVideo2();
                } else if (!this.errMsg.errWhere) {
                    this.errStep = 0;
                    this.get_filemd5sum( this.files );
                } else if (this.errMsg.errWhere === 1) this.startMattingVideo()
            },
            get_filemd5sum(ofile) {//获取文件md5值
                var file = ofile;
                var tmp_md5;
                var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
                    // file = this.files[0],
                    chunkSize = 8097152, // Read in chunks of 2MB
                    chunks = Math.ceil( file.size / chunkSize ),
                    currentChunk = 0,
                    spark = new SparkMD5.ArrayBuffer(),
                    fileReader = new FileReader();
                fileReader.onload = (e) => {
                    spark.append( e.target.result ); // Append array buffer
                    currentChunk++;
                    if (currentChunk < chunks) {
                        loadNext();
                    } else {
                        tmp_md5 = spark.end();
                        this.sha256s = tmp_md5;
                        this.initUp();
                    }
                };

                fileReader.onerror = function () {
                    console.warn( 'oops, something went wrong.' );
                };

                function loadNext() {
                    var start = currentChunk * chunkSize,
                        end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
                    fileReader.readAsArrayBuffer( blobSlice.call( file, start, end ) );
                }

                loadNext();
            },
            downPreVideo() {//开始处理预览视频
                if (this.preVideoUrl) {
                    this.downVideo( this.preVideoUrl );
                    return;
                }
                this.downMsg.open = true;
                videoPreview( {taskFlag: this.taskFlag} ).then( res => {
                    if (!res.code) {
                        const result = res.data;
                        if (!result.previewVideoPath) {
                            this.downMsg.time = result.previewPercentage;
                            this.timeOut1 = setTimeout( this.videoMattingInfo, 2000 );
                        } else {
                            this.preVideoUrl = result.previewVideoPath;
                            this.downMsg.open = false;
                            this.downMsg.err = false;
                        }
                    } else {
                        this.downMsg.err = true;
                        this.downMsg.open = false;
                        this.downMsg.des = res.msg;
                    }
                } )
            },
            downPreVideo2() {//开始处理全视频
                if (this.fullVideoUrl) {
                    this.downVideo( this.fullVideoUrl );
                    return;
                }
                this.downAllMsg.open = true;
                videoFullMatting( {taskFlag: this.taskFlag} ).then( res => {
                    if (!res.code) {
                        const result = res.data;
                        if (!result.videoPath) {
                            this.downAllMsg.time = result.percentage;
                            this.timeOut1 = setTimeout( this.videoMattingInfo, 2000 );
                        } else {
                            this.fullVideoUrl = result.videoPath;
                            this.downAllMsg.open = false;
                            this.downAllMsg.err = false;
                        }
                    } else {
                        this.downAllMsg.err = true;
                        this.downAllMsg.open = false;
                        this.downAllMsg.des = res.msg;
                        this.downAllMsg.noPoint=(res.code===4001);//显示充值按钮
                    }
                } )
            },
            videoMattingInfo() {//获取视频处理进度预览和全视频
                let data = {taskFlag: this.taskFlag}
                videoMattingInfo( data ).then( res => {
                    if (!res.code) {
                        const result = res.data;
                        this.downMsg.time = result.previewPercentage;
                        this.downAllMsg.time = result.percentage;
                        this.preVideoUrl = result.previewVideoPath;
                        this.fullVideoUrl = result.videoPath;
                        if (this.downMsg.open) this.downMsg.open = this.preVideoUrl ? false : true;
                        if (this.downAllMsg.open) this.downAllMsg.open = this.fullVideoUrl ? false : true;
                        if ((this.downMsg.open && !result.previewVideoPath) || (this.downAllMsg.open && !result.videoPath)) {
                            this.timeOut1 = setTimeout( this.videoMattingInfo, 2000 )
                        }
                        // if( this.preVideoUrl)this.downVideo(this.preVideoUrl);
                        // if( this.fullVideoUrl)this.downVideo(this.fullVideoUrl);
                    } else {
                        this.downMsg.err = this.preVideoUrl ? false : true;
                        this.downAllMsg.err = this.fullVideoUrl ? false : true;
                        if (this.downMsg.err) this.downMsg.open = false;
                        if (this.downAllMsg.err) this.downAllMsg.open = false;
                        this.downMsg.des = '网络错误，请先确认网络正常后，请';
                        this.downAllMsg.des = '网络错误，请先确认网络正常后，请';
                    }
                } )
            },
            downVideo(url) {//下载
                console.log( url, 123456 )
                let save_link = document.createElement( 'a' );
                save_link.target = '_blank';
                save_link.href = url;
                save_link.download = this.files.name;
                let event = document.createEvent( 'MouseEvents' );
                event.initMouseEvent( 'click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null );
                save_link.dispatchEvent( event );
            },
            initWebscoket() {
                let token = getToken();
                if ("WebSocket" in window) {
                    // 打开一个 web socket
                    let ws = new WebSocket( `ws://restapidev.picup.shop/websocket/${token}` );
                    ws.onopen = () => {
                        // Web Socket 已连接上，使用 send() 方法发送数据
                        ws.send( this.taskFlag );
                        console.log( "数据发送中..." );
                    };
                    ws.onmessage = (evt) => {
                        var received_msg = evt.data;
                        console.log( "数据已接收...", received_msg );
                    };
                    ws.onclose = (e) => {
                        // 关闭 websocket
                        console.log( 'websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean, e )
                    };
                    ws.onerror = (e) => {
                        console.log( 'error000', e );
                        this.errMsg = {title: '下载失败', des: '网络错误，请先确认网络正常后，请', errWhere: 2};
                    }
                } else {
                    // 浏览器不支持 WebSocket
                    alert( "您的浏览器不支持 WebSocket!" );
                }
            },
            initVideo() {//初始化文件或历史
                this.files = this.filesMsg.file;
                if (this.filesMsg.type === 'file') this.get_filemd5sum( this.files );
                else {
                    let oView = document.documentElement.clientWidth > 1500 ? 500 : 400;
                    let oImg = new Image();
                    oImg.onload = () => {
                        this.loadImg=oImg;
                        this.imgH = oImg.width > oImg.height ? oImg.height * oView / oImg.width + 'px' : oView + 'px';
                        this.upStatus = 1;
                        this.preImglist = {
                            time: this.files.seconds,
                            timeList: this.files.previewImages.time,
                            fps: this.files.fps,
                            name: this.files.originalName,
                            image: this.files.previewImages.image,
                            matting: this.files.previewImages.matting
                        };
                        this.files['name'] = this.files.originalName;
                        this.taskFlag = this.files.taskFlag;
                        const [a, b] = [!this.files.previewVideoPath && this.files.previewPercentage > 0, !this.files.videoPath && this.files.percentage > 0]
                        if (a) this.downMsg.open = true;
                        if (b) this.downAllMsg.open = true;
                        if (a || b) this.videoMattingInfo();
                        if (this.files.previewVideoPath) this.preVideoUrl = this.files.previewVideoPath;
                        if (this.files.videoPath) this.fullVideoUrl = this.files.videoPath;
                    };
                    oImg.src = this.files.previewImages.image[0];
                }
            },
            toSureDown(){
                const n=this.preImglist.time ? parseInt(this.preImglist.time): 0;
                const sec=Math.floor(n/60),min=n % 60;
                this.$confirm(`下载需消耗 ${sec}分${min}秒 视频抠图余额, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.downPreVideo2()
                }).catch(() => {

                });
            }
        },
        mounted() {

        },
        created() {
            this.initVideo();
        },
        destroyed() {
            if (this.timeOut) clearTimeout( this.timeOut );
            if (this.timeOut1) clearTimeout( this.timeOut1 );
        }
    }
</script>

<style scoped lang="scss">
    .mattingVideo {
        background-color: #202020;
        position: relative;
        margin-bottom: 15px;

        .close {
            color: #fff;
            width: 15px;
            height: 16px;
            right: 19px;
            top: 17px;
            font-size: 16px;
            position: absolute;
            z-index: 88;
            border: none;
        }
    }

    .vupload {
        width: 100%;
        /*height: 260px;*/
        background-color: #202020;
        position: relative;
        box-sizing: border-box;
        padding: 27px 110px;

        p {
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(217, 217, 217, 1);
            line-height: 23px;
            text-align: center;
        }

        .name {
            margin-top: 55px;
            font-size: 20px;
            text-align: left;
        }

        .el-progress {
            margin: 28px 0 22px 0;
        }

        .jd {
            color: #999;
            font-size: 14px;
        }
    }

    .preview {
        width: 100%;
        position: relative;
        box-sizing: border-box;
        padding: 27px 110px;
        margin-top: 15px;

        .viewBox, .setBtns {
            max-width: 1000px;
            margin: 0 auto;
        }

        .viewBox {
            padding: 20px 20px 0;

            .flex > div {
                width: 50%;

                &:last-child img {
                    background-image: url("http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200821/d693060fc9604ccda7c91bd7360d4661.jpg");
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }
            }

            img {
                display: block;
                /*max-width: 500px;*/
                height: 100%;
                margin: 0 auto;
            }

            .point {
                margin: 34px 0 37px 0;
                height: 10px;
                border-radius: 5px;

                span, .el-tooltip {
                    position: relative;
                    cursor: pointer;
                    flex: 1;
                    margin-right: 4px;
                    background-color: #fff;
                    height: 100%;

                    &:last-child {
                        margin-right: 0;
                    }

                    i {
                        position: absolute;
                        padding: 2px 4px;
                        font-size: 12px;
                        color: #666;
                        left: 50%;
                        top: -8px;
                        background-color: #fff;
                        border-radius: 3px;
                        transform: translate(-50%, -100%);

                        &:after {
                            position: absolute;
                            left: 50%;
                            bottom: 0;
                            content: '';
                            border-top: 5px solid #fff;
                            border-left: 5px solid #202020;
                            border-right: 5px solid #202020;
                            transform: translate(-50%, 100%);
                        }
                    }
                }

                .active {
                    background-color: $co;
                }
            }
        }

        .setBtns {
            justify-content: space-between;
            padding-bottom: 37px;
            font-size: 12px;
            color: #D9D9D9;
            line-height: 17px;
            text-align: left;

            p {
                font-size: 12px;
                text-align: left;
            }

            .tit {
                margin-bottom: 3px;
            }

            .left_1 {
                /*width: 80px;*/
                margin-right: 25px;
            }

            .left_2 {
                width: 180px;
                word-break: break-all;
                /*margin-right: 80px;*/
            }

            .lright_1 {
                /*width: 85px;*/
                margin-right: 34px;
            }

            .lright_btn_2, .lright_btn_1 {
                font-size: 14px;
                line-height: 40px;
                /*width: 120px;*/
                padding: 0 10px;
                border-radius: 5px;
                text-align: center;
                color: #fff;
                background-color: $co;
                /*margin-right: 40px;*/
                &.noback {
                    background-color: initial;

                    .co {
                        color: $co;
                    }
                }

                p {
                    line-height: 18px;
                    margin-bottom: 6px;
                }
            }

            .err_mini {
                width: 120px;
                font-size: 12px;
                color: #e6a23c;
                text-align: center;

                .title {
                    text-align: center;
                    font-size: 24px;
                    margin-bottom: 6px;
                }

                span,a {
                    cursor: pointer;
                    color: #e82255;
                    border-bottom: 1px solid #e82255;
                }
            }

            .lright_2 {
                /*width: 95px;*/
                margin-right: 20px;
            }

            .lright_btn_1 {
                background-color: initial;
                color: $co;
                border: 1px solid $co;
                margin-right: 0;
            }
        }

        .lastMes {
            font-size: 12px;
            color: #9F9F9F;
            line-height: 24px;
            text-align: center;
            border-top: 1px solid #323232;

            p:first-child {
                margin: 25px 0 6px 0;
            }
        }

        & > p {
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(217, 217, 217, 1);
            line-height: 23px;
            text-align: center;
        }

        .title {
            text-align: left;
            margin-bottom: 20px;
            line-height: 1;

            .over {
                max-width: 300px;
                font-size: 20px;
                color: rgba(217, 217, 217, 1);
            }

            span {
                font-size: 13px;
                color: #999;
                margin-left: 19px;
            }
        }
    }

    .errDiv {
        padding: 27px 110px;
    }

    .err {
        max-width: 1000px;
        padding: 40px 0px;
        border-radius: 5px;
        font-size: 16px;
        margin: 0 auto;
        color: #e6a23c;
        background-color: #FDF6EC;
        line-height: 24px;
        text-align: center;

        .title {
            font-size: 24px;
            margin-bottom: 20px;
        }

        span {
            cursor: pointer;
            display: inline-block;
            margin-left: 15px;
            border-bottom: 1px solid #e6a23c;
        }
    }

    @media screen and (max-width: 1500px) {
        .preview {
            .viewBox, .setBtns {
                max-width: 800px;
                margin: 0 auto;
                font-size: 12px;
            }
        }
    }

</style>
