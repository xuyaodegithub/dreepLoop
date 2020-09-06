<template>
    <div class="box boxVideo">
        <input
                type="file"
                style="display: none"
                ref="upImg"
                @change="changeImg($event)"
                :multiple="multiple"
                accept="video/*,image/gif"
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
<!--                    <h5>Web 视频</h5>-->
<!--                    <div style="position: relative;">-->
<!--                        <img-->
<!--                                src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200828/c9a899a86cd54edba3439aff522987bc.png"-->
<!--                                alt-->
<!--                                style="position: absolute;left: 8px;top: 12px;"-->
<!--                        />-->
<!--                        &lt;!&ndash;                        @keyup.enter="copyImgUrl()"&ndash;&gt;-->
<!--                        <input-->
<!--                                type="text"-->
<!--                                placeholder="CTRL+V视频或URL"-->
<!--                                v-model="imgUrl"-->
<!--                                @focus="$event.target.select()"-->
<!--                                class="upcas"-->
<!--                        />-->
<!--                    </div>-->
                </div>
                <div class="bottonLast">
                    <div class="fixedB">
                        <h5>
                            <!--Contact us-->
                            联系我们
                        </h5>
                        <div class="flex a-i cu">
                            <img src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200824/03440efd79cd4ab1808fe8228a0b1c23.png"
                                 alt/>
                            <p>roymind</p>
                            <img
                                    src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200824/5c0bf0b72752424797c27d7468845d44.png"
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
                            <img src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200824/2256cdc7cc2c46b3950d5ce82a22c82e.png"
                                 alt/>
                            <p>
                                <a href="mailto:pikachu@picup.ai">pikachu@picup.ai</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="OperatorRight drops">
                <div class="matting">
                    <p>一键视频抠图</p>
                    <p>100%自动，免费，在线视频去背景</p>
                    <div class="imgbox flex a-i">
                        <div class="secImg">
                            <img src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200828/7c9d753a883245d89ed08b9f6b4da5db.png"
                                 alt/>
                            <img src="@/assets/image/mixkit-woman-preparing-to-jog--unscreen.gif" alt/>
                        </div>
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
<!--                            <el-input-->
<!--                                    v-model="imgUrl"-->
<!--                                    class="upcas"-->
<!--                                    placeholder="CTRL+V粘贴视频或者URL"-->
<!--                                    @focus="$event.target.select()"-->
<!--                            ></el-input>-->
                            <p>支持格式：.mp4, .webm, .mov, .gif</p>
                            <p>最大文件大小：500M</p>
                            <p>最大视频清晰度：1080P</p>
                            <p>
                                更大的文件和超清视频，请联系
                                <span class="cu" @click="golast">技术顾问</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div v-for="(item,idx) in upList" :key="item.id">
                    <matting-video :filesMsg="item" ref="videoSubs" @close="close"></matting-video>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex'
    import headerSub from "@/components/header/index.vue";
    import {getToken, getSecImgs, setSecImgs} from "../../utils/auth";
    import mattingVideo from '@/components/mattingVideo';
    import {videoHisList, videoDelete} from '@/apis';

    export default {
        components: {headerSub, mattingVideo},
        data() {
            return {
                upList: [],
                imgUrl: "", //图片链接
                multiple: false,
            };
        },
        created() {
            // console.log( process.env.VUE_APP_BASEURL )
        },
        mounted() {
            if (getToken()) {
                this.userGetscribe();
                this.initHisList();
            }
            this.stopPrevent();
        },
        methods: {
            ...mapActions( ["userGetscribe",'showLoginDilogAction'] ),
            upLoadimg() {
                //点击上传
                if (!getToken()) {
                    this.multiple = false;
                    this.showLoginDilogAction();
                    return;
                } else this.multiple = true;
                this.$refs.upImg.value = "";
                this.$nextTick( () => {
                    this.$refs.upImg.click();
                } );
            },
            changeImg(ev) {
                //图片上传
                const e = ev.target;
                this.toscroll();
                for (let i = 0; i < e.files.length; i++) {
                    this.upList.unshift( {file: e.files[i], id: e.files[i].name + Math.random(), type: 'file'} )
                }
            },
            toscroll() {
                $( "body,html" ).animate( {scrollTop: 620}, 500 );
            },
            close(task, id) {
                const taskFlag = task, idx =this.upList.findIndex(item=>item.id===id) ;
                console.log( taskFlag, idx )
                if (!taskFlag) {
                    this.upList.splice( idx, 1 )
                    return;
                }
                videoDelete( {taskFlag} ).then( res => {
                    if (!res.code) {
                        this.$message( {message: '删除成功', type: 'success'} );
                        this.upList.splice( idx, 1 )
                    }
                } )


            },
            golast() {
                let top = $( '.content' ).height(), top2 = $( '.box' ).height();
                $( 'html,body' ).animate( {scrollTop: top + top2}, 500 )
            },
            initHisList() {
                videoHisList( {page: 1, pageSize: 20} ).then( res => {
                    if (!res.code) {
                        let a = JSON.parse( JSON.stringify( res.data ) );
                        a.map( item => {
                            this.upList.push( {file: item, id: item.originalName + Math.random(), type: 'obj'} )
                        } );
                    }
                } )
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
                let oDrops = document.getElementsByClassName( 'drops' )[0];
                    oDrops.addEventListener( "drop", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        // e.cancelable=true
                        let files = e.dataTransfer.files;
                        // console.log(files)
                        if (!files.length) return;
                        if (!getToken() && files.length > 1) {
                            _self.$message( {type: 'error', message: '登录后可批量上传'} )
                            return
                        }
                        _self.toscroll();
                        for (let i = 0; i < files.length; i++) {
                            _self.upList.unshift( {file: files[i], id: files[i].name + Math.random(), type: 'file'} )
                        }
                    } )
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
                    font-weight: bold;
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
                    position: relative;

                    img {
                        width: 480px;
                    }

                    .secImg {
                        position: relative;
                        margin-right: 77px;
                        img:last-child{
                            width: 460px;
                            position: absolute;
                            left: 50%;
                            top: 10px;
                            transform: translateX(-50%);
                        }
                    }

                    .matt-user {
                        width: 852px;
                        height: 281px;
                        margin-top: 78px;
                    }

                    .upload {
                        width: 280px;

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

                        p {
                            font-size: 14px;
                            margin-bottom: 15px;
                            color: #9f9f9f;
                            text-align: left;
                        }

                        p:last-child {
                            margin-top: 50px;

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
                /*border-top: 1px solid #3d3d3d;*/

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
                    background: initial;
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
<style lang="scss">
    .inline.upload {
        .el-input {
            margin-bottom: 27px;

            .el-input__inner {
                background-color: rgba(52, 53, 57, 1);
                border-color: rgba(52, 53, 57, 1);
            }
        }
    }
</style>
