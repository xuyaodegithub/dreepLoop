<template>
    <div class="mattingVideo" :style="{backgroundColor: white ? '#fff' : '#202020'}">
        <el-popover
                placement="left"
                width="160"
                v-model="visible">
            <p>确定要删除这个视频，是否继续？</p>
            <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="text" size="mini" @click="close">确定</el-button>
            </div>
            <i class="close cu el-icon-delete" slot="reference" :style="{color:white ? '#333' : '#fff'}"></i>
        </el-popover>
        <div class="vupload" v-if="!upStatus" :style="{backgroundColor: white ? '#fff' : '#202020'}">
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
            <p :style="{color: white ? '#999' : '#d9d9d9'}">视频预览</p>
            <div class="viewBox" v-loading="!preImglist.time"
                 element-loading-text="拼命加载中"
                 element-loading-spinner="el-icon-loading"
                 element-loading-background="rgba(0, 0, 0, 0.3)">
                <div class="title flex a-i">
                    <p class="over" :style="{color: white ? '#333' : '#d9d9d9'}">{{files.name}}</p>
                    <span>时长：{{parseInt(preImglist.time) | minsfilter(1)}}</span><span>每秒{{preImglist.fps}}帧</span>
                </div>
                <el-carousel indicator-position="none" arrow="never" :height="imgH" :interval="3000"
                             @change="changIdx" ref="swiper"
                             :autoplay="autoplay">
                    <el-carousel-item v-for="(item,key) in preImglist.image" :key="key">
                        <div class="flex" style="height: 100%;">
                            <div><img :src="item" alt=""></div>
                            <div><img :src="preImglist.matting[key]" alt="" :style="bgcolor"></div>
                        </div>
                    </el-carousel-item>
                </el-carousel>
                <div class="flex point" @mouseenter="autoplay=false" @mouseleave="autoplay=true">
                    <div v-for="(it,idx) in preImglist.timeList" :key="idx"
                         :class="{active :initialIdx == idx,'whiteBar' : white}"
                         @click="moveImg(idx)">
                        <span v-show="initialIdx == idx"
                              :class="{'white' : white}">{{parseInt(it) | minsfilter(1)}}</span>
                    </div>
                </div>
            </div>
            <div class="setBtns flex a-i" v-show="preImglist.time" :style="{color: white ? '#333' : '#d9d9d9'}">
                <!--                <div class="flex a-i">-->
                <!--                    &lt;!&ndash;                    <div class="left_1">&ndash;&gt;-->
                <!--                    &lt;!&ndash;                        <div class="tit">背景为</div>&ndash;&gt;-->
                <!--                    &lt;!&ndash;                        <el-color-picker v-model="color" show-alpha :disabled="true"></el-color-picker>&ndash;&gt;-->
                <!--                    &lt;!&ndash;                    </div>&ndash;&gt;-->
                <!--                    <div class="left_2">-->
                <!--                        <div class="tit">输出格式：</div>-->
                <!--                        <p>MOV文件</p>-->
                <!--                        <p></p>-->
                <!--                    </div>-->
                <!--                </div>-->
                <div class="flex a-i">
                    <!--                    <div class="lright_1">-->
                    <!--                        &lt;!&ndash;                        <div class="tit">预览视频下载</div>&ndash;&gt;-->
                    <!--                        <p>预览时长：5秒</p>-->
                    <!--                        <p>消耗秒数：0</p>-->
                    <!--                    </div>-->
                    <!--                    <div class="lright_btn_2 cu" v-show="!downMsg.open && !downMsg.err && !preVideoUrl"-->
                    <!--                         @click="downPreVideo">-->
                    <!--                        下载预览视频-->
                    <!--                        &lt;!&ndash;                        preVideoUrl下载预览视频&ndash;&gt;-->
                    <!--                    </div>-->
                    <div class="lright_btn_2 noback" v-show="downMsg.open">
                        <p style="margin-bottom:20px; ">在线预览处理：<span class="co">{{downMsg.time}}%</span></p>
                        <el-progress :stroke-width="8" :percentage="downMsg.time" color="#E82256"
                                     :show-text="false"></el-progress>
                    </div>
                    <div class="err_mini" v-show="downMsg.err">
                        <div class="title"><i class="el-icon-circle-close"></i></div>
                        <div class="des">{{downMsg.des}} <br><span @click="retry">点击重试</span></div>
                    </div>
                    <div class="err_mini play cu" v-show="preVideoUrl" @click="$emit('preVideo',preVideoUrl)">
                        <i class="el-icon-caret-right"></i>在线观看预览
                    </div>
                </div>
                <div class="h2Title">
                    <h2 style="font-size: 14px;margin-bottom: 15px">完整版视频下载</h2>
                    <div class="flex a-i">
                        <div class="lright_2">
                            <!--                        <div class="tit">全部视频下载</div>-->
                            <!--                        <p>视频时长：{{parseInt(preImglist.time) | minsfilter(1)}}</p>-->
                            <p>消耗秒数：{{parseInt(preImglist.time) | minsfilter}}</p>
                            <p>视频账户余额：{{userSubscribeData.videoRemaining | minsfilter}} &nbsp;<a href="videoPrice.html"
                                                                                                 style="border-bottom: 1px solid #D9D9D9;"
                                                                                                 :style="{color: white ? '#333' : '#d9d9d9',borderColor: white ? '#333' : '#d9d9d9'}"
                                                                                                 target="_blank">去充值</a>
                            </p>
                        </div>
                        <div class="left_1 flex a-i"
                             v-show="!downAllMsg.open && !fullVideoUrl && !downAllMsg.err && !white">
                            <div class="tit">背景：</div>
                            <el-select v-model="color" placeholder="请选择" size="mini" popper-class="seleDrop">
                                <el-option
                                        v-for="item in colorList"
                                        :key="item.value"
                                        :label="item.title"
                                        :value="item.val">
                                </el-option>
                            </el-select>
                            <el-tooltip class="item" effect="dark" placement="top">
                                <div slot="content" style="line-height: 22px;">透明背景，为mov格式，文件比较大<br/>纯色背景，为mp4格式，文件小很多
                                </div>
                                <i class="el-icon-question" style="font-size: 14px;"></i>
                            </el-tooltip>
                        </div>
                        <div class="lright_btn_1 cu" v-show="!downAllMsg.open && !fullVideoUrl && !downAllMsg.err"
                             @click="toSureDown">
                            下载
                        </div>
                        <div class="lright_btn_2 noback" v-show="downAllMsg.open">
                            <p class="flex a-i">正在处理：
                                <el-progress :stroke-width="8" :percentage="downAllMsg.time" color="#E82256"
                                             :show-text="false" style="width: 90px;margin-right: 10px;"></el-progress>
                                <span class="co">{{downAllMsg.time}}%</span></p>
                            <p>预计剩余处理时间：<span class="co">{{(Math.ceil(remainingTime)+10) | minsfilter}}</span></p>
                        </div>
                        <div class="err_mini flex a-i" v-show="downAllMsg.err">
                            <div class="title" style="margin-right: 10px;margin-bottom: 0;"><i
                                    class="el-icon-circle-close"></i></div>
                            <div class="des">{{downAllMsg.des}} <br>
                                <span @click="retry" v-if="!downAllMsg.noPoint">点击重试</span>
                                <a href="videoPrice.html" v-else target="_blank">前往充值</a>
                            </div>
                        </div>
                        <div class="err_mini flex a-i" v-show="fullVideoUrl">
                            <div class="title" style="color: #67C23A;margin-right: 10px;"><i
                                    class="el-icon-circle-check"></i></div>
                            <div class="des">处理完成<br>
                                <span @click="toSureDown">点击下载</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="lastMes" :style="{borderColor: white ? '#eee' : '#323232'}">
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
    import {mapGetters} from 'vuex'
    import {BySha256, videoMatting, videoImgsPreview, videoPreview, videoMattingInfo, videoFullMatting} from '@/apis';
    import SparkMD5 from "spark-md5";
    import {getToken} from '@/utils/auth'

    export default {
        name: "index",
        props: {
            filesMsg: Object,
            white: Boolean
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
                preImglist: {time: 0, fps: 0, name: '', image: [], matting: [], timeList: [], minwh: 0},
                upStatus: 0,//0上传前 1上传后 2失败提示信息
                color: '',
                timeOut: '',
                timeOut1: '',
                downMsg: {open: false, time: 0, err: false, des: '网络错误，请先确认网络正常后，重新操作！'},//下载预览图进度
                downAllMsg: {open: false, time: 0, err: false, des: '网络错误，请先确认网络正常后，重新操作！', noPoint: false},//下载预览图进度
                errStep: 0,//连续超过三次失败就报错
                errMsg: {title: '加载失败', des: '网络错误，请先确认网络正常后，重新操作！', errWhere: 0},
                preVideoUrl: '',
                fullVideoUrl: '',
                colorList: [{title: '透明', val: ''}, {title: '绿色', val: '#00FF00'}, {
                    title: '蓝色',
                    val: '#0000FF'
                }, {title: '黑色', val: '#000000'}, {title: '白色', val: '#FFFFFF'},],
                startUpkeys: [],//含有1 代表预览图  2代表预览视频  3代表完整视频
            }
        },
        computed: {
            ...mapGetters( [
                'userSubscribeData'
            ] ),
            remainingTime() {
                let a = this.preImglist, b = 0;
                if (a.minwh <= 360) b = 5;
                else if (a.minwh <= 720) b = 8;
                else if (a.minwh <= 1080) b = 10;
                return b * this.preImglist.time * (1 - this.downAllMsg.time / 100)
            },
            keyLength() {
                return this.startUpkeys.length
            },
            bgcolor() {
                const key = this.color ? 'background' : 'backgroundImage';
                return {
                    [key]: this.color || 'url(http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200821/d693060fc9604ccda7c91bd7360d4661.jpg)'
                }
            }
        },
        watch: {
            keyLength(n, o) {
                if (n > 0 && !this.timeOut1) this.timeOut1 = setInterval( this.videoMattingInfo, 2000 );
                else if (!n) {
                    clearInterval( this.timeOut1 );
                    this.timeOut1 = null;
                }
            }
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
                        videoImgsPreview( {taskFlag: this.taskFlag} ).then( res => {//加载预览图轮播
                            if (!res.code) {
                                this.startUpkeys.push( 1 );
                                videoPreview( {taskFlag: this.taskFlag} ).then( relt => {
                                    if (!res.code) {
                                        this.startUpkeys.push( 2 );
                                    } else {
                                        this.downMsg.err = true;
                                        this.downMsg.open = false;
                                        this.downMsg.des = res.msg;
                                    }
                                } )
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
                            this.timeOut = setTimeout( this.startMattingVideo, 500 );
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
                this.$emit( 'close', this.taskFlag, this.filesMsg.id )
            },
            retry() {//点击重试
                if (this.downMsg.err) {
                    this.downMsg.err = false;
                    this.downPreVideo();
                } else if (this.downAllMsg.err) {
                    // this.downAllMsg.err = false;
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
                    this.$emit( 'preVideo', this.preVideoUrl );
                    return;
                }
                videoPreview( {taskFlag: this.taskFlag} ).then( res => {
                    if (!res.code) {
                        this.startUpkeys.push( 2 );
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
                const bgColor = this.color ? this.color.split( '#' )[1] : '';
                videoFullMatting( {taskFlag: this.taskFlag, bgColor} ).then( res => {
                    if (!res.code) {
                        this.startUpkeys.push( 3 );
                        this.videoMattingInfo()
                    } else {
                        this.downAllMsg.err = true;
                        this.downAllMsg.open = false;
                        this.downAllMsg.des = res.msg;
                        this.downAllMsg.noPoint = (res.code === 4001);//显示充值按钮
                    }
                } )
            },
            videoMattingInfo() {//获取视频处理进度预览和全视频
                this.upStatus = 1;
                if (this.startUpkeys.includes( 2 )) this.downMsg.open = true;
                if (this.startUpkeys.includes( 3 )) this.downAllMsg.open = true;
                let data = {taskFlag: this.taskFlag}
                videoMattingInfo( data ).then( res => {
                    if (!res.code) {
                        const result = res.data, oView = document.documentElement.clientWidth > 1500 ? 500 : 400;
                        if (this.startUpkeys.includes( 1 )) {
                            if (result.previewImages) {
                                let oImg = new Image();
                                oImg.onload = () => {
                                    this.imgH = oImg.width > oImg.height ? oImg.height * oView / oImg.width + 'px' : oView + 'px';
                                    this.preImglist = {
                                        time: result.seconds,
                                        timeList: result.previewImages.time,
                                        fps: result.fps,
                                        name: result.originalName,
                                        image: result.previewImages.image,
                                        matting: result.previewImages.matting,
                                        minwh: result.width > result.height ? result.height : result.width
                                    };
                                    const idx = this.startUpkeys.findIndex( item => item === 1 );
                                    this.startUpkeys.splice( idx, 1 );
                                };
                                oImg.src = result.previewImages.image[0];
                            }
                        }
                        if (this.startUpkeys.includes( 2 )) {
                            this.downMsg.time = result.previewPercentage;
                            this.preVideoUrl = result.previewVideoPath;
                            if (this.downMsg.open) this.downMsg.open = this.preVideoUrl ? false : true;
                            if (result.previewStatus === '预览处理失败') this.downMsg = {
                                open: false,
                                time: 0,
                                err: true,
                                des: '预览处理失败！'
                            };
                            if (this.preVideoUrl || result.previewStatus === '预览处理失败') {
                                const idx = this.startUpkeys.findIndex( item => item === 2 );
                                this.startUpkeys.splice( idx, 1 );
                            }
                        }
                        if (this.startUpkeys.includes( 3 )) {
                            this.downAllMsg.time = result.percentage;
                            this.fullVideoUrl = result.videoPath;
                            if (this.downAllMsg.open) this.downAllMsg.open = this.fullVideoUrl ? false : true;
                            if (result.status === '处理失败') this.downAllMsg = {
                                open: false,
                                time: 0,
                                err: true,
                                des: '处理失败！'
                            };
                            if (this.fullVideoUrl || result.status === '处理失败') {
                                const idx = this.startUpkeys.findIndex( item => item === 3 );
                                this.startUpkeys.splice( idx, 1 );
                            }
                        }
                    } /*else {
                        if(this.downMsg.open){
                            this.downMsg.err = this.preVideoUrl ? false : true;
                            this.downMsg.open = false;
                            this.downMsg.des = '网络错误，请先确认网络正常后，请';
                        }
                        if(this.downMsg.open){
                            this.downAllMsg.err = this.fullVideoUrl ? false : true;
                            this.downAllMsg.open = false;
                            this.downAllMsg.des = '网络错误，请先确认网络正常后，请';
                        }
                        // if (this.downMsg.err)
                        // if (this.downAllMsg.err)
                    }*/
                } )
            },
            downVideo(url) {//下载
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
                    this.taskFlag = this.files.taskFlag;
                    this.files['name'] = this.files.originalName;
                    if (!this.files.previewImages) {
                        this.upStatus = 1;
                        this.startUpkeys.push( 1 );
                        this.startUpkeys.push( 2 );
                        return;
                    }
                    let oView = document.documentElement.clientWidth > 1500 ? 500 : 400;
                    let oImg = new Image();
                    oImg.onload = () => {
                        this.imgH = oImg.width > oImg.height ? oImg.height * oView / oImg.width + 'px' : oView + 'px';
                        this.upStatus = 1;
                        this.preImglist = {
                            time: this.files.seconds,
                            timeList: this.files.previewImages.time,
                            fps: this.files.fps,
                            name: this.files.originalName,
                            image: this.files.previewImages.image,
                            matting: this.files.previewImages.matting,
                            minwh: this.files.width > this.files.height ? this.files.height : this.files.width
                        };
                    };
                    oImg.src = this.files.previewImages.image[0];
                    const [a, b] = [!this.files.previewVideoPath && this.files.previewPercentage > 0, !this.files.videoPath && this.files.percentage > 0]
                    if (a) this.startUpkeys.push( 2 );
                    if (b) this.startUpkeys.push( 3 );
                    // if (a || b) this.startUpkeys.push();
                    if (this.files.previewVideoPath) this.preVideoUrl = this.files.previewVideoPath;
                    if (this.files.videoPath) this.fullVideoUrl = this.files.videoPath;
                }
            },
            toSureDown() {
                if (this.fullVideoUrl) {
                    this.downVideo( this.fullVideoUrl );
                    return;
                }
                if (this.downAllMsg.err) {
                    this.downAllMsg.err = false;
                    this.downPreVideo2();
                    return;
                }
                const n = this.preImglist.time ? parseInt( this.preImglist.time ) : 0;
                const sec = Math.floor( n / 60 ), min = n % 60;
                this.$confirm( `下载需消耗 ${sec}分${min}秒 视频抠图余额，且确认下载后背景类型不可更改， 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                } ).then( () => {
                    this.downPreVideo2()
                } ).catch( () => {

                } );
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
        padding: 27px 0;
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

                & > div, .el-tooltip {
                    position: relative;
                    cursor: pointer;
                    flex: 1;
                    margin-right: 4px;
                    background-color: #fff;
                    height: 100%;

                    &:last-child {
                        margin-right: 0;
                    }

                    span {
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

                        &.white {
                            background-color: #D9D9D9;
                        }

                        &.white:after {
                            border-top: 5px solid #D9D9D9;
                            border-left: 5px solid #fff;
                            border-right: 5px solid #fff;
                        }
                    }
                }

                .whiteBar {
                    background-color: #D9D9D9;
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

            .left_1 {
                /*width: 80px;*/
                margin-right: 40px;

                .el-select {
                    margin: 0 10px;
                    width: 80px;
                }


            }

            .left_2 {
                /*width: 180px;*/
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

                    p:last-child {
                        margin-top: 6px;
                    }

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
                /*color: #e6a23c;*/
                text-align: center;

                .title {
                    text-align: center;
                    font-size: 24px;
                    margin-bottom: 3px;
                }

                span, a {
                    cursor: pointer;
                    color: #e82255;
                    border-bottom: 1px solid #e82255;
                }
            }

            .play {
                border: 1px solid $co;
                border-radius: 5px;
                color: #e82255;
                font-size: 14px;
                line-height: 40px;
                height: 40px;
                width: 120px;
                text-align: center;

                i {
                    margin-right: 8px;
                    font-size: 16px;
                }
            }

            .lright_2 {
                /*width: 95px;*/
                margin-right: 60px;
            }

            .lright_btn_1 {
                padding: 0 20px;
                background-color: $co;
                color: #fff;
                border: 1px solid $co;
                margin-right: 0;
                line-height: 30px;
                height: 30px;
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
            /*line-height: 1;*/

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

    .seleDrop.el-select-dropdown {
        background-color: #202020 !important;
        color: #fff;

        .el-select-dropdown__item {
            font-size: 13px;
            line-height: 28px;
            height: 28px;
            color: #fff;
        }

        .el-select-dropdown__item:hover, .selected, .hover {
            background-color: $co;
            color: #fff;
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
