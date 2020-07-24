<template>
    <div class="beauTy flex">
        <i class="el-icon-close cu" @click="deleteItem()"></i>
        <div class="left">
            <p>原图</p>
            <div class="imgS">
                <img :src="Original"
                     alt="">
            </div>
        </div>
        <div class="right">
            <p>美化结果</p>
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
                    {{this.bgOriginal.status===3 ? '图片过大，暂时无法处理' : '本天限制次数已达上限'}}
                    <p>
                        {{this.bgOriginal.status===3 ? '请选择一个不超过15M的图片进行处理' :  '未登录状态上传次数已达上限，请登录后继续操作！'}}
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
                        `永久剩余次数:${userSubscribeData.freeRemaining >0 ? userSubscribeData.freeRemaining : 0 }`}} <a href="userVip.html" class="cu" target="_blank"
                                                                  style="color: #a1a0a0;margin-left: 20px;border-bottom: 1px solid #a1a0a0;">去充值</a>
                    </tr>
                </table>
            </el-button>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import {myBrowser, getrandom,initSmallTag} from "../../utils";
    import {uploadImgApi, downloadMattedImage, getMattingInfo, copyUpload, uploadossBg} from "../../apis";

    export default {
        name: "beauTy",
        props: {
            files: Object,
            index: Number
        },
        data() {
            return {
                bgOriginal: {},
                imageMsg: {},
                loadingInstance:'',
                canvasinitNum: '',
                file:'',
                filename:'',
                imgname:'',
                Original:'',
                fileId:'',
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
            downLoadImg(e, k) {
                let oImg = new Image(), c = document.createElement( 'canvas' );
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
                                    window.navigator.msSaveOrOpenBlob( blobObj, 'this' + ".png" );
                                } else {
                                    let oA = document.createElement( 'a' );
                                    oA.href = c.toDataURL();
                                    oA.download = this.filename;
                                    oA.click();
                                }
                            }
                            oImg.src = res.data;
                        }
                    } )
                }else{
                    initSmallTag( e, '免费' );
                    oImg.crossOrigin = '';
                    oImg.onload = () => {
                        c.width = oImg.width;
                        c.height = oImg.height;
                        ct.drawImage( oImg, 0, 0 );
                        if (window.navigator.msSaveOrOpenBlob) {
                            var imgData = c.msToBlob();
                            var blobObj = new Blob( [imgData] );
                            window.navigator.msSaveOrOpenBlob( blobObj, 'this' + ".png" );
                        } else {
                            let oA = document.createElement( 'a' );
                            oA.href = c.toDataURL();
                            oA.download = this.filename;
                            oA.click();
                        }
                    }
                    oImg.src = this.bgOriginal.img+`?str=${getrandom( 0, 1000000000 )}`;
                }
            },
            deleteItem() {//删除某一个
                let name = '';
                if (this.timer) clearInterval( this.timer )
                if (this.files.type == 'copy') name = this.imgname
                else name = this.files.name
                this.$emit( 'close', {index: this.index, name: name} )
            },
            getImgData() {
                let file = this.file, _self = this
                if (window.FileReader) {
                    let reader = new FileReader();
                    reader.readAsDataURL( file );
                    //监听文件读取结束后事件
                    reader.onloadend = function (e) {
                        _self.Original = e.target.result
                        let param = new FormData();
                        param.append( 'file', file, file.name )
                        param.set( 'mattingType', 4 )
                        uploadImgApi( param ).then( res => {
                            if (res.code == 0) {
                                _self.fileId = res.data.fileId
                                _self.imageMsg = res.data
                                if (res.data.status !== 'success') {
                                    _self.bgOriginal = {
                                        name: _self.imgname,
                                        img: '',
                                        status: 2,
                                        fileId: _self.fileId
                                    }
                                    _self.pollingImg()
                                    return
                                }
                                let obj = {
                                    name: _self.imgname,
                                    img: res.data.bgRemovedPreview,
                                    status: 0,
                                    fileId: _self.fileId
                                }
                                _self.Original = res.data.original
                                _self.bgOriginal = obj
                                _self.$emit( 'to-parse', {
                                    id: _self.index,
                                    img: res.data.bgRemovedPreview,
                                    name: _self.files.name,
                                    color: 'add',
                                    fileId: _self.fileId,
                                    Original: _self.Original,
                                    filename: _self.filename
                                } )
                            } else if(res.code ===4003){
                                let obj = {
                                    name: _self.imgname,
                                    img: '',
                                    status: 4,
                                    fileId: _self.fileId
                                }
                                _self.$emit( 'to-parse', {
                                    id: _self.index,
                                    img: '',
                                    color: 'add',
                                    name: _self.files.name,
                                    fileId: _self.fileId,
                                    Original: _self.Original,
                                    noSave: true
                                } )
                                _self.bgOriginal = obj
                            }else {
                                let obj = {
                                    name: _self.imgname,
                                    img: '',
                                    status: 1,
                                    fileId: _self.fileId
                                }
                                _self.$emit( 'to-parse', {
                                    id: _self.index,
                                    img: '',
                                    color: 'add',
                                    name: _self.files.name,
                                    fileId: _self.fileId,
                                    Original: _self.Original,
                                    noSave: true
                                } )
                                _self.bgOriginal = obj
                            }
                        } ).catch( err => {
                            console.log( err, 111111, _self.fileId )
                            let obj = {
                                name: _self.imgname,
                                img: '',
                                status: 3,
                                fileId: _self.fileId
                            }
                            _self.$emit( 'to-parse', {
                                id: _self.index,
                                img: '',
                                color: 'add',
                                name: _self.files.name,
                                fileId: _self.fileId,
                                Original: _self.Original,
                                noSave: true
                            } )
                            _self.bgOriginal = obj
                        } )
                    };
                }
            },
            getImgMsgByurl() {//通过粘贴请求
                this.Original = this.file
                let obj = {url: this.file, mattingType: 4}
                if (this.files.fileId) obj.fileId = this.files.fileId
                copyUpload( obj ).then( res => {
                    if (res.code == 0) {
                        this.fileId = res.data.fileId
                        this.imageMsg = res.data
                        if (res.data.status !== 'success') {
                            this.bgOriginal = {
                                name: this.imgname,
                                img: '',
                                status: 2,
                                fileId: this.fileId
                            }
                            this.pollingImg()
                            return
                        }
                        let obj = {
                            name: this.imgname,
                            img: res.data.bgRemovedPreview,
                            status: 0,
                            fileId: this.fileId
                        }
                        this.Original = res.data.original
                        this.bgOriginal = obj
                        this.$emit( 'to-parse', {
                            id: this.index,
                            img: res.data.bgRemovedPreview,
                            name: obj.name,
                            color: 'add',
                            fileId: this.fileId,
                            Original: this.Original,
                            filename: this.filename
                        } )
                    }else if(res.code ===4003){
                        let obj = {
                            name: this.imgname,
                            img: '',
                            status: 4,
                            fileId: this.fileId
                        }
                        this.$emit( 'to-parse', {
                            id: this.index,
                            img: '',
                            color: 'add',
                            name: this.files.name,
                            fileId: this.fileId,
                            Original: this.Original,
                            noSave: true
                        } )
                        this.bgOriginal = obj
                    } else {
                        let obj = {
                            name: this.imgname,
                            img: '',
                            status: 1,
                            fileId: this.fileId
                        }
                        this.$emit( 'to-parse', {
                            id: this.index,
                            img: '',
                            color: 'add',
                            name: obj.name,
                            fileId: this.fileId,
                            Original: this.Original,
                            noSave: true
                        } )
                        this.bgOriginal = obj
                    }
                } ).catch( err => {
                    console.log( err ,this.fileId)
                    let obj = {
                        name: this.imgname,
                        img: '',
                        status: 3,
                        fileId: this.fileId
                    }
                    this.$emit( 'to-parse', {
                        id: this.index,
                        img: '',
                        color: 'add',
                        name: this.files.name,
                        fileId: this.fileId,
                        Original: this.Original,
                        noSave: true
                    } )
                    this.bgOriginal = obj
                } )
            },
            pollingImg() {//轮询
                    getMattingInfo( {fileId: this.fileId} ).then( res => {
                        if (!res.code) {
                            this.imageMsg = res.data;
                            if (res.data.status === 'success') {
                                let obj = {
                                    name: this.imgname,
                                    img: res.data.bgRemovedPreview,
                                    status: 0,
                                    fileId: this.fileId
                                }
                                this.Original = res.data.original
                                this.bgOriginal = obj
                                this.$emit( 'to-parse', {
                                    id: this.index,
                                    img: res.data.bgRemovedPreview,
                                    name: this.files.type === 'copy' ? this.imgname : this.files.name,
                                    color: 'add',
                                    fileId: this.fileId,
                                    Original: this.Original,
                                    filename: this.filename
                                } )
                            }else setTimeout(this.pollingImg,2000)
                        } else {
                            this.$emit( 'to-parse', {
                                id: this.index,
                                img: '',
                                color: 'add',
                                name: this.files.type === 'copy' ? this.imgname : this.files.name,
                                fileId: this.fileId,
                                Original: this.Original,
                                noSave: true
                            } )
                            this.bgOriginal = {name: this.imgname, img: '', status: 1, fileId: this.fileId}
                        }
                    } )
            },
        },
        mounted() {
            let windowW = document.documentElement.clientWidth
            if (windowW > 1500) this.canvasinitNum = 500
            else this.canvasinitNum = 380
            this.file = this.files.url;
            this.filename = this.files.filename
            if (this.files.type === 'copy') {
                this.imgname = `copy_${getrandom( 0, 1000000000 )}`;
                this.getImgMsgByurl()
            } else {
                this.imgname = this.file.name.substring( 0, this.file.name.lastIndexOf( '.' ) );
                this.getImgData()
            }
        }
    }
</script>

<style scoped lang="scss">
    .beauTy {
        font-size: 14px;
        line-height: 32px;
        padding: 20px 0;
        text-align: center;
        justify-content: center;
        background-color: #fff;
        margin-bottom: 15px;
        position: relative;

        .el-icon-close {
            position: absolute;
            font-size: 16px;
            top: 10px;
            right: 20px;
        }

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
                color: $be;

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
                    max-height:500px;
                    margin: 0 auto;
                }

                i {
                    display: block;
                    font-size: 32px;
                    margin: 0 auto 15px;
                }
            }

            .el-button {
                width: 150px;
                height: 36px;
                color: #fff;
                background-color: $be;
                border-color: $be;
                position: relative;
                border-radius: 18px;
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
                                background-color: $be;
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
