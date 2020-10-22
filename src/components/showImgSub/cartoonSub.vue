<template>
    <div class="cartoon">
        <i class="el-icon-close cu" @click="deleteItem()"></i>
        <p>图片预览</p>
        <div class="beauTy flex">
            <div class="left">
                <div class="imgS">
                    <img :src="Original"
                         alt="">
                </div>
            </div>
            <div class="right">
                <div class="imgS">
                    <img :src="bgOriginal.img" alt="" v-show="bgOriginal.status===0">
                    <div v-show="bgOriginal.status===1" class="errmsg">
                        <i class="el-icon-circle-close"></i>
                        这张图片当前不支持，不能识别前景
                        <p>
                            请选择一个有明确区分前景和背景的图片。例如:试着一个人的照片，产品、动物、汽车或另一个对象
                        </p>
                    </div>
                    <div v-show="[3,4].includes(bgOriginal.status)" class="errmsg">
                        <i class="el-icon-circle-close"></i>
                        {{this.bgOriginal.status===3 ? '网络出现中断，请重试' : '次数受限'}}
                        <p>
                            {{this.bgOriginal.status===3 ? '请选择一个不超过15M的图片进行处理' : '未登录使用次数已达上限，'}}<br>
                            <span v-show="bgOriginal.status===4">请 <span @click="showLoginDilogAction"
                                                                         style="color: #e82255">登录</span> 后继续操作！</span>
                        </p>
                    </div>
                    <div v-show="bgOriginal.status===2" class="errmsg">
                        <i class="el-icon-s-flag"></i>
                        当前正在排队,请稍后...
                        <p>
                            排队位置{{imageMsg.queueNumber}}
                        </p>
                    </div>
                    <div class="close" v-show="![0,1,2,3,4].includes(bgOriginal.status)">
                        <i class="el-icon-loading"></i>
                        处理中...
                    </div>
                </div>
                <el-button type="primary" icon="el-icon-download" v-show="bgOriginal.status===0">下载
                    <table class="downBtn">
                        <tr>
                            <td>尺寸</td>
                            <td>消耗次数</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>{{imageMsg.previewWidth + ' X ' + imageMsg.previewHeight}}
                            </td>
                            <td>0</td>
                            <td>
                                <el-button type="danger" round size="mini" @click="downLoadImg($event)">下载
                                </el-button>
                            </td>
                        </tr>
                        <tr v-if="imageMsg.previewWidth!==imageMsg.originalWidth || imageMsg.previewHeight!==imageMsg.originalHeight">
                            <td>{{imageMsg.originalWidth + ' X ' +
                                imageMsg.originalHeight}}
                            </td>
                            <td>1</td>
                            <td>
                                <el-button type="danger" round size="mini" @click="downLoadImg($event,1)">下载
                                </el-button>
                            </td>
                        </tr>
                        <tr>{{(userSubscribeData.monthExpireDate && userSubscribeData.monthExpireDate>noeTime &&
                            userSubscribeData.monthRemaining>0) ? `包月剩余次数:${userSubscribeData.monthRemaining}` :
                            `永久剩余次数:${userSubscribeData.freeRemaining >0 ? userSubscribeData.freeRemaining : 0 }`}} <a
                                    href="userVip.html" class="cu" target="_blank"
                                    style="color: #a1a0a0;margin-left: 20px;border-bottom: 1px solid #a1a0a0;">去充值</a>
                        </tr>
                    </table>
                </el-button>
            </div>
        </div>
    </div>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import {getrandom, initSmallTag, base64Toblob} from "../../utils";
    import {uploadImgApi, downloadMattedImage, getMattingInfo, copyUpload, uploadossBg} from "../../apis";

    export default {
        name: "beauTy",
        props: {
            files: Object,
            id: Number
        },
        data() {
            return {
                bgOriginal: {},
                imageMsg: {},
                loadingInstance: '',
                canvasinitNum: '',
                filename: '',
                Original: '',
                fileId: '',
                noeTime: new Date().getTime()
            }
        },
        watch: {
            // bgOriginal(newval, oldval) {
            //     if (newval.img) {
            //         // this.$nextTick(()=>{
            //         this.drameImg( newval.img )
            //         // })
            //     }
            // },
        },
        computed: {
            ...mapGetters( ['userSubscribeData'] ),
        },
        methods: {
            ...mapActions( ['showLoginDilogAction'] ),
            downLoadImg(e, k) {
                let oImg = new Image(), c = document.createElement( 'canvas' ),name= this.filename.substring( 0, this.filename.lastIndexOf( '.' ) )+'.png';
                const ct = c.getContext( '2d' );
                if (k) {
                    downloadMattedImage( {fileId: this.fileId} ).then( res => {
                        if (!res.code) {
                            initSmallTag( e, '次数 -1' );
                            oImg.crossOrigin = '';
                            oImg.onload = () => {
                                c.width = oImg.width;
                                c.height = oImg.height;
                                ct.drawImage( oImg, 0, 0 );
                                if (window.navigator.msSaveOrOpenBlob) {
                                    var imgData = c.msToBlob();
                                    var blobObj = new Blob( [imgData] );
                                    window.navigator.msSaveOrOpenBlob( blobObj,name  );
                                } else {
                                    let oA = document.createElement( 'a' );
                                    oA.href = base64Toblob( c.toDataURL() );
                                    oA.download = name;
                                    oA.click();
                                }
                            }
                            oImg.src = res.data;
                        }
                    } )
                } else {
                    initSmallTag( e, '免费' );
                    oImg.crossOrigin = '';
                    oImg.onload = () => {
                        c.width = oImg.width;
                        c.height = oImg.height;
                        ct.drawImage( oImg, 0, 0 );
                        if (window.navigator.msSaveOrOpenBlob) {
                            var imgData = c.msToBlob();
                            var blobObj = new Blob( [imgData] );
                            window.navigator.msSaveOrOpenBlob( blobObj, name );
                        } else {
                            let oA = document.createElement( 'a' );
                            oA.href = base64Toblob( c.toDataURL() );
                            oA.download = name;
                            oA.click();
                        }
                    }
                    oImg.src = addUrlQuery( this.bgOriginal.img );
                }
            },
            deleteItem() {//删除某一个
                if (this.timer) clearTimeout( this.timer );
                this.$emit( 'close', '', this.id)
            },
            getImgData() {
                let file = this.files.file;
                this.Original = URL.createObjectURL( file );
                if(file.size/1024/1024>15){
                    this.bgOriginal = {img: '', status: 3, fileId: this.fileId};
                    return;
                }
                let param = new FormData();
                param.append( 'file', file, file.name );
                param.append( 'mattingType', 11 );
                uploadImgApi( param ).then( res => {
                    if (res.code == 0) {
                        this.fileId = res.data.fileId
                        this.imageMsg = res.data;
                        if (res.data.status !== 'success') {
                            this.bgOriginal = {img: '', status: 2, fileId: this.fileId}
                            this.pollingImg()
                            return
                        }
                        this.Original = res.data.original;
                        this.bgOriginal = {img: res.data.bgRemovedPreview, status: 0, fileId: this.fileId}
                    } else if (res.code === 4003) {
                        this.bgOriginal = {img: '', status: 4, fileId: this.fileId}
                    } else {
                        this.bgOriginal = {img: '', status: 1, fileId: this.fileId}
                    }
                } ).catch( err => {

                } )
            },
            getImgMsgByurl() {//通过粘贴请求
                this.Original = this.files.file;
                let obj = {url: this.files.file, mattingType: 11};
                if (this.files.fileId) obj.fileId = this.files.fileId;
                copyUpload( obj ).then( res => {
                    if (res.code == 0) {
                        this.fileId = res.data.fileId;
                        this.imageMsg = res.data;
                        if (res.data.status !== 'success') {
                            this.bgOriginal = {img: '', status: 2, fileId: this.fileId}
                            this.pollingImg()
                            return
                        }
                        this.bgOriginal= {img: res.data.bgRemovedPreview, status: 0, fileId: this.fileId}
                        this.Original = res.data.original
                    } else if (res.code === 4003) {
                        this.bgOriginal = {img: '', status: 4, fileId: this.fileId}
                    } else {
                        this.bgOriginal= {img: '', status: 1, fileId: this.fileId}
                    }
                } ).catch( err => {
                    let obj = {
                        img: '',
                        status: 3,
                        fileId: this.fileId
                    }
                    this.bgOriginal = obj
                } )
            },
            pollingImg() {//轮询
                getMattingInfo( {fileId: this.fileId} ).then( res => {
                    if (!res.code) {
                        this.imageMsg = res.data;
                        if (res.data.status === 'success') {
                            this.Original = res.data.original;
                            this.bgOriginal = {img: res.data.bgRemovedPreview, status: 0, fileId: this.fileId}
                        } else setTimeout( this.pollingImg, 2000 )
                    } else {
                        this.bgOriginal = {img: '', status: 1, fileId: this.fileId}
                    }
                } )
            },
        },
        mounted() {
            let windowW = document.documentElement.clientWidth,type=Boolean((typeof this.files.file)==='object');
            if (windowW > 1500) this.canvasinitNum = 500
            else this.canvasinitNum = 380
            this.filename =type ? this.files.file.name : this.files.file;
            if (!type) {
                this.getImgMsgByurl()
            } else {
                this.getImgData()
            }
        },
        destroyed() {
            window.URL.revokeObjectURL(this.Original);
        }
    }
</script>

<style scoped lang="scss">
    .cartoon {
        background-color: #fff;
        padding: 30px 0;
        position: relative;
        margin-bottom: 15px;

        & > p {
            font-size: 14px;
            text-align: center;
            color: #999;
            margin-bottom: 20px;
        }

        .el-icon-close {
            position: absolute;
            font-size: 16px;
            top: 10px;
            right: 20px;
        }
    }

    .beauTy {
        font-size: 14px;
        line-height: 32px;
        text-align: center;
        justify-content: center;
        background-color: #fff;
        position: relative;

        & > div {
            margin: 0 25px;
            width: 500px;

            & > p {
                margin: 10px 0;
                color: #999;
            }

            .imgS {
                max-width: 500px;
                border-radius: 10px;
                overflow: hidden;
                color: $co;

                .close {
                    background-color: #f5f5f7;
                }

                .errmsg {
                    background-color: #f9f1ef;
                    font-size: 18px;
                    color: #a74d45;
                    line-height: 1;

                    p {
                        font-size: 14px;
                        margin-top: 20px;
                        line-height: 24px;
                        color: #585453;
                    }
                }

                /*max-height: 500px;*/
                & > div {
                    padding: 80px 70px;
                    text-align: center;
                }

                img {
                    display: block;
                    max-width: 500px;
                    max-height: 500px;
                    margin: 0 auto;
                }

                i {
                    display: block;
                    font-size: 32px;
                    margin: 0 auto 15px;
                }
            }

            .el-button {
                width: 162px;
                height: 54px;
                color: #fff;
                background-color: $co;
                border-color: $co;
                position: relative;
                display: block;
                margin-top: 25px;

                &:hover .downBtn {
                    display: block;
                }

                .downBtn {
                    display: none;
                    text-align: left;
                    padding: 10px 0;
                    width: 300px;
                    position: absolute;
                    left: 50%;
                    top: 0;
                    transform: translate(-50%, -100%);
                    line-height: 30px;
                    font-size: 12px;
                    background-color: rgba(0, 0, 0, .8);
                    border-radius: 5px;

                    tr {
                        padding: 5px 20px;
                        display: block;

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
                                margin: 0;
                            }
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 1500px) {
        .beauTy {
            & > div {
                width: 380px;

                .imgS {
                    max-width: 380px;
                    /*max-height: 500px;*/
                    img {
                        display: block;
                        max-width: 380px;
                        max-height: 380px;
                    }
                }
            }
        }

    }

</style>
