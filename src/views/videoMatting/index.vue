<template>
    <div class="box">
        <input
                type="file"
                style="display: none"
                ref="upImg"
                @change="changeImg($event)"
                :multiple="multiple"
                accept="video/*"
        />
        <header-sub></header-sub>
        <div class="apps">
            <div class="Operator">
                <h6>
                    <!--Local images-->
                    本地视频
                </h6>
                <el-button
                        type="primary"
                        round
                        icon="el-icon-upload2"
                        @click="upLoadimg()"
                >
                    <!--Upload-->
                    上传
                </el-button>
                <div class="center">
                    <h5>Web 图片</h5>
                    <div style="position: relative;">
                        <img
                                src="../../assets/image/inputImg.png"
                                alt
                                style="position: absolute;left: 8px;top: 12px;"
                        />
                        <!--                        @keyup.enter="copyImgUrl()"-->
                        <input
                                type="text"
                                placeholder="CTRL+V图像或URL"
                                v-model="imgUrl"
                                @focus="$event.target.select()"
                                class="upcas"
                        />
                        <!--                        <img src="../../assets/image/img5.png" alt="" style="margin-left:-14px;" class="cu"-->
                        <!--                             @click="copyImgUrl()">-->
                    </div>
                    <!--                    <div class="flex a-i cu">-->
                    <!--                        <img src="../../assets/image/img1.png" alt="">-->
                    <!--                        <p>Chrome &lt;!&ndash;extension&ndash;&gt;插件</p>-->
                    <!--                    </div>-->
                </div>
                <div class="bottonLast">
                    <div class="fixedB">
                        <h5>
                            <!--Contact us-->
                            联系我们
                        </h5>
                        <div class="flex a-i cu">
                            <img src="../../assets/image/wx.png" alt/>
                            <p>roymind</p>
                            <img
                                    src="../../assets/image/ewm.png"
                                    alt
                                    style="margin-left: 20px;margin-right: 0;"
                            />
                            <img
                                    src="../../assets/image/wxl.png"
                                    alt
                                    class="noC"
                                    style="width:120px;"
                            />
                        </div>
                        <div class="flex a-i cu">
                            <img src="../../assets/image/img3.png" alt/>
                            <p>
                                <a href="mailto:pikachu@picup.ai">pikachu@picup.ai</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="OperatorRight">
                <div class="matting">
                    <p>一键视频抠图</p>
                    <p>100%自动，免费，在线视频去背景</p>
                    <div class="imgbox">
                        <img src="../../assets/matt-demo.png" alt/>
                        <div class="inline upload">
                            <el-button
                                    type="primary"
                                    round
                                    icon="el-icon-upload2"
                                    @click="upLoadimg()"
                            >
                                <!--Upload-->
                                上传视频
                            </el-button>
                            <el-input
                                    v-model="imgUrl"
                                    class="upcas"
                                    placeholder="CTRL+V粘贴图像或者URL"
                                    @focus="$event.target.select()"
                            ></el-input>
                            <p>支持格式：.mp4,.webm,.ogg,.mov,.gif</p>
                            <p>最大文件大小：500M</p>
                            <p>最大视频清晰度：1080P</p>
                            <p>
                                更大的文件和超清视频，请联系
                                <span>技术顾问</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div v-for="(item,idx) in upList" :key="idx">
                    <matting-video :files="item" ref="videoSubs"></matting-video>
                </div>
                <uploader
                        ref="uploader"
                        class="uploader-app"
                        :options="options"
                        :autoStart="false"
                        @file-added="onFileAdded"
                        @file-success="onFileSuccess"
                        @file-progress="onFileProgress"
                        @file-error="onFileError"
                >
                    <uploader-btn id="`uploadButton${getTime}`" class="uploader-btn">
                        选择文件
                    </uploader-btn>
                </uploader>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {mapActions} from "vuex";
    import headerSub from "@/components/header/index.vue";
    import {getToken, getSecImgs, setSecImgs} from "../../utils/auth";
    import {videoMatting, BySha256} from "../../apis";
    import mattingVideo from '@/components/mattingVideo'

    let sha256 = require( "js-sha256" );
    let SparkMD5 = require( "spark-md5" );
    export default {
        components: {headerSub, mattingVideo},
        data() {
            return {
                upList: [],
                upIng: 50,
                imgUrl: "", //图片链接
                multiple: false,
                // 选择文件后显示
                options: {
                    // 目标上传地址 写自己要上传到的地址即可
                    target: process.env.VUE_APP_BASEURL + "/oss/append",
                    // 分块大小
                    chunkSize: "1024*1024*10",
                    // 是否开启服务器分片校验
                    testChunks: true,
                    // 服务器分片校验函数 秒传及断点续传的基础
                    checkChunkUploadedByResponse: (chunk, message) => {
                        console.log( 123456 );
                        let objMessage = JSON.parse( message );
                        console.log( objMessage );
                        // 这里根据实际业务来 uploaded是后端返给我的字段 用来判断哪些片已经上传过了 不用再重复上传了objMessage.data.uploaded
                        return (objMessage.uploaded || []).indexOf( chunk.offset + 1 ) >= 0;
                    },
                    query: {},
                    headers: {
                        // 在header中添加的验证，请根据实际业务来
                        token: "998dcd833364ecf8c58f",
                    },
                    attrs: {
                        // 接受的文件类型，形如['.png', '.jpg', '.jpeg', '.gif', '.bmp'...] 这里我封装了一下
                        accept: ['.mp4'],
                    },
                },

                getTime: new Date().getTime() / 1000,
            };
        },
        created() {
            console.log( process.env.VUE_APP_BASEURL )
        },
        mounted() {
            if (getToken()) this.userGetscribe();
            // videoMatting({
            //   token: this.username,
            //   file: this.userpass,
            //   sha256:'',
            //   position:'',
            //   contentLength:"",
            //   taskFlag:""
            // }).then((res) => {});
        },
        methods: {
            ...mapActions( ["userGetscribe"] ),
            upLoadimg() {
                //点击上传
                if (!getToken()) this.multiple = false;
                else this.multiple = true;
                this.$refs.upImg.value = "";
                this.$nextTick( () => {
                    this.$refs.upImg.click();
                } );
            },
            changeImg(ev) {
                //图片上传
                const e = ev.target;
                let selectedFile = e.files; // 得到当前选中的文件
              console.log(e.files[0],e.files[0].slice(0,36817714))
                for(let i=0;i<e.files.length;i++){
                  this.upList.unshift(e.files[i])
                }
                // 使用SHA-512算法生成一个标志文件的hash字符串
                // const {
                //     name,
                //     lastModified,
                //     size,
                //     type,
                //     webkitRelativePath,
                // } = selectedFile;
                // let fileStr = `${name}${lastModified}${size}${type}${webkitRelativePath}`;
                // console.log( selectedFile, fileStr, selectedFile.prototype );
                // console.log( sha256( fileStr ) );
                this.toscroll();
                // this.imgUrlss( e.files );
            },
            toscroll() {
                // let oDiv = this.$refs.contentImg.offsetTop;
                $( "body,html" ).animate( {scrollTop: 620}, 500 );
            },
            imgUrlss(obj) {

            },
            onFileAdded(file) {
                console.log( file );
                // 使用SHA-512算法生成一个标志文件的hash字符串
                const {name, lastModified, size, type, webkitRelativePath} = file.file;
                let fileStr = `${name}${lastModified}${size}${type}${webkitRelativePath}`;
                let str = sha256( fileStr );
                BySha256( {
                    sha256: str,
                } ).then( (res) => {
                    if (!res.data) {
                        this.computeMD5( file );
                    }
                } );
                //  this.computeMD5(file);
            },
            onFileSuccess(rootFile, file, response, chunk) {
                let res = JSON.parse( response );
                // 服务器自定义的错误，这种错误是Uploader无法拦截的
                if (!res.result) {
                    this.$message( {message: res.message, type: "error"} );
                    return;
                }
            },
            onFileError() {
                console.log( "xxxxxxxxxxxxxxxx" );
            },
            onFileProgress(rootFile, file, chunk) {
                console.log(
                    `上传中 ${file.name}，chunk：${chunk.startByte /
                    1024 /
                    1024} ~ ${chunk.endByte / 1024 / 1024}`
                );
            },
            computeMD5(file) {
                let fileReader = new FileReader();
                let time = new Date().getTime();
                let blobSlice =
                    File.prototype.slice ||
                    File.prototype.mozSlice ||
                    File.prototype.webkitSlice;
                let currentChunk = 0;
                const chunkSize = 1024 * 1024 * 10;
                let chunks = Math.ceil( file.size / chunkSize );
                let spark = new SparkMD5.ArrayBuffer();

                file.pause();

                loadNext();

                fileReader.onload = (e) => {
                    console.log( e.target.result, fileReader, '..........' )
                    spark.append( e.target.result );
                    if (currentChunk < chunks) {
                        currentChunk++;
                        loadNext();
                        // 实时展示MD5的计算进度
                        this.$nextTick( () => {
                            $( `.myStatus_${file.id}` ).text(
                                "校验MD5 " + ((currentChunk / chunks) * 100).toFixed( 0 ) + "%"
                            );
                        } );
                    } else {
                        let md5 = spark.end();
                        this.computeMD5Success( md5, file );
                        console.log(
                            `MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${
                                file.size
                            } 用时：${new Date().getTime() - time} ms`
                        );
                    }
                };
                fileReader.onerror = function () {
                    this.error( `文件${file.name}读取出错，请检查该文件` );
                    file.cancel();
                };

                function loadNext() {
                    let start = currentChunk * chunkSize;
                    let end =
                        start + chunkSize >= file.size ? file.size : start + chunkSize;
                    fileReader.readAsArrayBuffer( blobSlice.call( file.file, start, end ) );
                }
            },
            computeMD5Success(md5, file) {
                // 文件的唯一标识
                this.options.query.sha256 = md5;
                this.options.query.position = 0;
                this.options.query.contentLength = 22008727;
                file.resume();
                console.log( file );
                console.log( "开始上场" );
            },
        },
    };
</script>

<style lang="scss" scoped>
    .inline {
        display: inline-block;
    }

    .box {
        background: #000;

        .apps {
            padding-right: 75px;
        }

        .apps.tactive {
            padding-right: 85px;
        }

        .OperatorRight {
            margin: 60px 0 0 244px;
            flex: 1;
            padding: 15px 0 0 15px;

            .matting {
                width: 100%;
                min-height: 624px;
                background-color: #202020;
                padding-top: 70px;
                box-sizing: border-box;
                margin-bottom: 15px;

                .list {
                    width: 100%;
                    margin-top: 60px;

                    li {
                        width: 100%;
                        margin-bottom: 80px;

                        .inline-box {
                            width: 900px;
                            margin: 0 auto;
                        }

                        .inline:first-child {
                            margin-right: 50px;
                        }

                        .inline {
                            float: left;
                            max-width: 415px;

                            p {
                                font-size: 15px;
                                text-align: left;
                            }

                            p:first-child {
                                font-size: 30px;
                                margin-top: 30px;
                            }
                        }

                        .list1 {
                            width: 415px;
                            height: 240px;
                        }

                        .list2 {
                            width: 375px;
                            height: 240px;
                        }

                        .list3 {
                            height: 350px;
                            margin-bottom: 62px;
                        }
                    }

                    li:last-child {
                        margin-bottom: 0;
                    }
                }

                p {
                    width: 100%;
                    text-align: center;
                    color: rgba(217, 217, 217, 1);
                    font-size: 19px;
                    margin-bottom: 60px;
                }

                p:first-child {
                    font-size: 40px;
                    margin-bottom: 20px;
                }

                p.bot-tip {
                    margin-top: -60px;
                    font-size: 14px;
                }

                p.bot-tip-mb {
                    font-size: 14px;
                }

                .imgbox {
                    width: 900px;
                    margin: 0 auto;

                    img {
                        width: 481px;
                        height: 340px;
                        margin-right: 77px;
                        float: left;
                    }

                    .matt-user {
                        width: 852px;
                        height: 281px;
                        margin-top: 78px;
                    }

                    .upload {
                        width: 281px;
                        height: 340px;

                        .el-button {
                            border-radius: 4px;
                            width: 100%;
                            height: 40px;
                            background-color: #e82255;
                            color: #fff;
                            border-color: #e82255;
                            margin-bottom: 20px;
                            margin-top: 5px;
                        }

                        .el-input {
                            margin-bottom: 27px;
                        }

                        p {
                            font-size: 14px;
                            margin-bottom: 15px;
                            color: #9f9f9f;
                            text-align: left;
                        }

                        p:last-child {
                            margin-top: 84px;

                            span {
                                color: #e82255;
                            }
                        }
                    }
                }

                .lm,
                .mb {
                    width: 546px;
                    height: 427px;
                    margin: 0 auto;
                    display: block;
                    margin-top: -30px;
                }

                .mb {
                    width: 544px;
                    height: 323px;
                    margin-bottom: 30px;
                }

                .matt-wechat {
                    width: 260px;
                    height: 260px;
                    display: block;
                    margin: 0 auto;
                    margin-top: 50px;
                    margin-bottom: 24px;
                    font-size: 15px;
                }
            }
        }

        .Operator {
            line-height: 1;
            color: rgba(217, 217, 217, 1);
            width: 244px;
            background-color: #202020;
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
                color: rgba(217, 217, 217, 1);
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
                border-top: 1px solid #3d3d3d;

                .flex img {
                    margin-right: 6px;
                }

                h5 {
                    font-weight: 500;
                    font-size: 14px;
                    margin-bottom: 24px;
                    color: rgba(217, 217, 217, 1);
                }

                input {
                    border: none;
                    border-bottom: 1px solid rgba(217, 217, 217, 1);
                    line-height: 40px;
                    height: 40px;
                    margin-left: 8px;
                    margin-bottom: 22px;
                    padding-left: 25px;
                    background: #202020;
                    color: rgba(217, 217, 217, 1);
                }

                input::-webkit-input-placeholder {
                    /* WebKit, Blink, Edge */
                    color: rgba(217, 217, 217, 1);
                }

                input:-moz-placeholder {
                    /* Mozilla Firefox 4 to 18 */
                    color: rgba(217, 217, 217, 1);
                }

                input::-moz-placeholder {
                    /* Mozilla Firefox 19+ */
                    color: rgba(217, 217, 217, 1);
                }

                input:-ms-input-placeholder {
                    /* Internet Explorer 10-11 */
                    color: rgba(217, 217, 217, 1);
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
                    color: rgba(217, 217, 217, 1);
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
                        color: rgba(217, 217, 217, 1);
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
                box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);

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
                    font-weight: 500;
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
    }
</style>
