<template>
    <div class="margin" ref="contentImg">
        <!--            <div class="Uploading flex a-i" v-show="upLoading" style="margin-top: 30px">-->
        <!--                <el-progress type="circle" :percentage="percentValue" :stroke-width='strokeWidth'></el-progress>-->
        <!--            </div>-->
        <div class="dreepAfter">
            <i class="el-icon-close cu" @click="deleteItem()"></i>
            <div class="flex j-b a-i imgs">
                <p>Original picture</p>
                <p>Matted picture</p>
            </div>
            <div class="flex j-b imgs">
                <div>
                    <img :src="Original" alt="">
                </div>
                <div>
                    <div v-if="bgOriginal.status===0" :style="backg" class="activeDiv"><img :src="bgOriginal.img"
                                                                                            alt=""></div>
                    <div v-else-if="bgOriginal.status===1" class="errmsg">
                        <i class="el-icon-circle-close"></i>
                        <!--这张图片当前不支持，不能识别前景-->
                        Error occured, the foreground can not be recognized
                        <p>
                        	<!--请选择一个有明确区分前景和背景的图片。例如:试着一个人的照片，产品、动物、汽车或另一个对象-->
                        	Try picture that contains person, more categories will be supported in future
                        </p>
                    </div>
                    <div v-else-if="bgOriginal.status===2" class="errmsg">
                        <i class="el-icon-s-flag"></i>
                        <!--当前正在排队,请稍后...-->
                        Currently queued, please
                        <p>
                        	<!--排队位置{{imageMsg.queueNumber}}-->
                        	Your queue number: {{imageMsg.queueNumber}}
                        </p>
                    </div>
                    <div class="close flex" v-else>
                        <i class="el-icon-loading"></i>
                        Processing...
                    </div>
                </div>
            </div>
            <div class="otherBtn flex a-i">
                <span>Background</span>
                <div v-for="(items,indexs) in color" :key="indexs" :style="backBtn"
                     @click="choseBackColor(items,indexs)"
                     class="cu" :class="{'bordershow' : indexs==choseBack}" v-if="indexs===0"></div>
                <div v-for="(items,indexs) in color" :key="indexs" :style="{'background':items }"
                     @click="choseBackColor(items,indexs,)" class="cu" :class="{'bordershow' : indexs==choseBack}"
                     v-if="indexs!==0"></div>
                <span style="height: 28px;"><el-color-picker v-model="colorValue" size="mini" ref="colorS"
                                                             @change="choseColor(index)"
                                                             :class="{'bordershow': choseBack=='span'}"></el-color-picker></span>
<!--                <el-button type="primary" icon="el-icon-edit-outline" round-->
<!--                           style="background-color: #27adf6;border-color: #27adf6;font-size: 14px;margin: 0 70px 0 60px"-->
<!--                           size="small" @click="updataThis()">编辑-->
<!--                </el-button>-->
                <el-button type="primary" icon="el-icon-edit" circle style="background-color: #27adf6;border-color: #27adf6;margin: 0 70px 0 60px" size="small" @click="updataThis()"></el-button>
            </div>
            <div class="downLoadBtn" v-if="bgOriginal.img">
                <el-button type="primary" round
                           style="background-color: #27adf6;border-color: #27adf6;width: 160px;margin-right: 170px"
                           icon="el-icon-download"
                           @mouseenter.native="showSize=true" @mouseleave.native="choseSize()">
                    Download<i class="el-icon-caret-bottom" style="position: absolute;margin-left: 12px"></i>
                </el-button>
                <div class="sizeChose" v-if="showSize" @mouseenter="showSizeStop=true" @mouseleave="boxLeave()">
                    <!--                            v-for="(item,index) in sizeArr" :key="index"-->
                    <div class="flex a-i j-b" @click="save(0)">
                        <span>Download Preview Image (Free)</span> <span>{{imageMsg.previewWidth + ' X ' + imageMsg.previewHeight}}</span>
                    </div>
                    <div class="flex a-i j-b" @click="save(1)">
                        <span>Download Full Image</span>
                        <span>{{imageMsg.originalWidth + ' X ' + imageMsg.originalHeight}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import opacity from '@/assets/opacity.jpg'
    import {uploadImgApi, downloadMattedImage, getMattingInfo,copyUpload} from "../../apis";
    import {myBrowser,getrandom} from "../../utils";

    export default {
        name: "imgsub",
        props: {
            files: Object,
            index: Number
        },
        data() {
            return {
                opacity,
                imageMUrl: '',//原图
                imageMsg: {},
                Original: '',
                bgOriginal: '',
                color: ['rgba(255,255,255,0)', '#ffffff', '#eeeeee', '#5d5d5d'],
                colorValue: '#409EFF',
                backBtn: {
                    backgroundImage: "url(" + require("@/assets/opacity.jpg") + ")",
                    backgroundRepeat: 'mo-repeat',
                    backgroundSize: 'center'
                },
                backg: {
                    backgroundImage: "url(" + require("@/assets/opacity.jpg") + ")",
                    backgroundRepeat: 'mo-repeat',
                    backgroundSize: 'center'
                },
                choseBack: 0,
                showSizeStop: false,
                showSize: false,
                sizeArr: [],
                timer: null,
                fileId: '',
                imgname:'',//下载的图片名称
                file:null
            }
        },
        mounted() {
            this.file=this.files.url
            if( this.files.type === 'copy') {
                this.imgname=`copy_${getrandom(0,10000000)}`
                this.getImgMsgByurl()
            } else {
                this.imgname=this.file.name.substring(0, this.file.name.lastIndexOf('.'))
                this.getImgData()
            }
        },
        methods: {
            pollingImg() {//轮询
                this.timer = setInterval(() => {
                    // this.getImgData()
                    getMattingInfo({fileId: this.fileId}).then(res => {
                        if (!res.code) {
                            this.imageMsg = res.data;
                            if (res.data.status === 'success') {
                                clearInterval(this.timer)
                                let obj = {
                                    name: this.imgname,
                                    img: res.data.bgRemovedPreview,
                                    status: 0,
                                    fileId:this.fileId
                                }
                                this.Original = res.data.original
                                this.bgOriginal = obj
                                this.$emit('to-parse', {
                                    id: this.index,
                                    img: res.data.bgRemovedPreview,
                                    name: this.files.type === 'copy' ? this.imgname : this.file.name,
                                    color: 'add',
                                    fileId:this.fileId
                                })
                            }/*else if(res.data.status === 'faild'){
                                this.$emit('to-parse', {id: this.index, img: '', color: 'add', name:this.files.type === 'copy' ? this.imgname : this.file.name, fileId:this.fileId})
                                this.bgOriginal = {name: this.imgname, img: '', status: 1, fileId:this.fileId}
                            }*/
                        } else {
                            clearInterval(this.timer)
                            this.$emit('to-parse', {id: this.index, img: '', color: 'add', name:this.files.type === 'copy' ? this.imgname : this.file.name, fileId:this.fileId})
                            this.bgOriginal = {name: this.imgname, img: '', status: 1, fileId:this.fileId}
                        }
                    })
                }, 1000)
            },
            updataThis() {
                if (this.bgOriginal.status !== 0) {
                    this.$message({type: 'warning', message: '当前图片不可编辑'})
                    return
                }
                this.$emit('openImgSet', this.imageMsg)
            },
            getImgData() {
                let file = this.file, _self = this
                if (window.FileReader) {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    //监听文件读取结束后事件
                    reader.onloadend = function (e) {
                        _self.Original = e.target.result
                        let param = new FormData();
                        param.append('file', file, file.name)
                        uploadImgApi(param).then(res => {
                            if (res.code == 0) {
                                _self.fileId = res.data.fileId
                                _self.imageMsg = res.data
                                if (res.data.status !== 'success') {
                                    _self.bgOriginal = {
                                        name: _self.imgname,
                                        img: '',
                                        status: 2,
                                        fileId:_self.fileId
                                    }
                                    _self.pollingImg()
                                    return
                                }
                                let obj = {
                                    name: _self.imgname,
                                    img: res.data.bgRemovedPreview,
                                    status: 0,
                                    fileId:_self.fileId
                                }
                                _self.Original = res.data.original
                                _self.bgOriginal = obj
                                _self.$emit('to-parse', {
                                    id: _self.index,
                                    img: res.data.bgRemovedPreview,
                                    name: file.name,
                                    color: 'add',
                                    fileId:_self.fileId
                                })
                            } else {
                                let obj = {
                                    name: _self.imgname,
                                    img: '',
                                    status: 1,
                                    fileId:_self.fileId
                                }
                                _self.$emit('to-parse', {id: _self.index, img: '', color: 'add', name: file.name, fileId:_self.fileId})
                                _self.bgOriginal = obj
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    };
                }
            },
            getImgMsgByurl(){//通过粘贴请求
                this.Original = this.file
                copyUpload({url:this.file}).then(res=>{
                    if (res.code == 0) {
                        this.fileId = res.data.fileId
                        this.imageMsg = res.data
                        if (res.data.status !== 'success') {
                            this.bgOriginal = {
                                name: this.imgname,
                                img: '',
                                status: 2,
                                fileId:this.fileId
                            }
                            this.pollingImg()
                            return
                        }
                        let obj = {
                            name: this.imgname,
                            img: res.data.bgRemovedPreview,
                            status: 0,
                            fileId:this.fileId
                        }
                        this.Original = res.data.original
                        this.bgOriginal = obj
                        this.$emit('to-parse', {
                            id: this.index,
                            img: res.data.bgRemovedPreview,
                            name: obj.name,
                            color: 'add',
                            fileId:this.fileId
                        })
                    } else {
                        let obj = {
                            name:this.imgname,
                            img: '',
                            status: 1,
                            fileId:this.fileId
                        }
                        this.$emit('to-parse', {id: this.index, img: '', color: 'add', name: obj.name, fileId:this.fileId})
                        this.bgOriginal = obj
                    }
                })
            },
            choseBackColor(color, index) {//纯色背景切换
                this.choseBack = index;
                if (index == 0) this.backg = {
                    backgroundImage: `url("${this.opacity}")`,
                    backgroundRepeat: 'mo-repeat',
                    backgroundPasition: 'center'
                }
                else this.backg = {background: color}
                let name=  this.files.type == 'copy' ? this.imgname : this.file.name;
                this.$emit('to-parse', {name: name, color: index == 0 ? '' : color})
            },
            choseColor(index) {//选择颜色背景，颜色选择器
                this.choseBack = 'span'
                this.backg = {background: this.colorValue}
                let name= this.files.type == 'copy' ? this.imgname : this.file.name;
                this.$emit('to-parse', {name: name, color: this.colorValue})
            },
            save(index) {//保存下载
                if (index === 0) {
                    let url = this.bgOriginal.img
                    this.downOldImg(url)
                } else {
                    if (this.imageMUrl) {
                        this.downOldImg(this.imageMUrl)
                        return
                    }
                    downloadMattedImage({fileId: this.fileId}).then(res => {
                        if (!res.code) {
                            this.imageMUrl = res.data
                            this.downOldImg(res.data)
                        }
                    })
                }
            },
            // 下载
            downOldImg(urls) {
                let _self = this
                let oImg = new Image();
                oImg.crossOrigin = "";
                oImg.onload = function () {
                    let cans = document.createElement('canvas');
                    let ctxs = cans.getContext('2d');
                    cans.width = oImg.width;
                    cans.height = oImg.height;
                    if (_self.choseBack !== 0 && _self.choseBack !== 'span') {
                        ctxs.fillStyle = _self.color[_self.choseBack]
                        ctxs.fillRect(0, 0, oImg.width, oImg.height)
                    } else if (_self.choseBack == 'span') {
                        ctxs.fillStyle = _self.colorValue;
                        ctxs.fillRect(0, 0, oImg.width, oImg.height)
                    }
                    ctxs.drawImage(oImg, 0, 0, cans.width, cans.height);
                    if (myBrowser() === 'IE' || myBrowser() === 'Edge') {//ie下载图片
                        let url = cans.msToBlob();
                        let blobObj = new Blob([url]);
                        window.navigator.msSaveOrOpenBlob(blobObj, _self.bgOriginal.name + ".png");
                    } else {
                        let url = cans.toDataURL("image/png");
                        let save_link = document.createElement('a');
                        save_link.href = url;
                        save_link.download = _self.bgOriginal.name+'.png';
                        let event = document.createEvent('MouseEvents');
                        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                        save_link.dispatchEvent(event);
                    }
                }
                oImg.src = urls
            },
            deleteItem() {//删除某一个
                let name='';
                if(this.timer) clearInterval(this.timer)
                if(this.files.type == 'copy') name=this.imgname
                else name=this.file.name
                this.$emit('close', {index: this.index, name: name})
            },
            choseSize() {
                let _self = this
                setTimeout(() => {
                    if (this.showSizeStop) return
                    _self.showSize = false
                }, 300)
            },
            boxLeave() {
                this.showSizeStop = false
                this.showSize = false
            }
        }
    }
</script>

<style lang="scss">
    .dreepAfter {
        position: relative;
        padding: 0 25px 25px;
        border-radius: 15px;
        background-color: #ffffff;
        margin-top: 25px;

        .el-icon-close {
            position: absolute;
            right: 20px;
            top: 10px;
            font-size: 16px;
        }

        .imgs > div {
            position: relative;
            width: 500px;
            /*max-height: 500px;*/
            text-align: center;

            img {
                max-width: 500px;
                border-radius: 15px;
            }

            .activeDiv {
                border-radius: 15px;
                display: inline-block;
                margin: 0 auto;
                background-position: center;

            }

            .errmsg {
                border-radius: 15px;
                background-color: #f9f1ef;
                font-size: 18px;
                color: #a74d45;
                padding: 40px 70px 60px;
                line-height: 1;

                i {
                    font-size: 40px;
                    display: block;
                    margin-bottom: 18px;
                }

                p {
                    font-size: 14px;
                    margin-top: 20px;
                    line-height: 24px;
                    color: #585453;
                }
            }

            .close {
                font-size: 16px;
                color: #26adf5;
                width: 500px;
                height: 100%;
                background-color: #f5f5f7;
                border-radius: 15px;
                align-items: center;
                justify-content: center;
                flex-direction: column;

                i {
                    display: block;
                    font-size: 32px;
                    margin-bottom: 15px;
                }

                /*margin: ;*/
            }
        }

        .imgs > p {
            width: 500px;
            text-align: center;
            font-size: 16px;
            line-height: 32px;
            margin: 10px 0;
        }
    }

    .otherBtn {
        font-size: 12px;
        line-height: 28px;
        color: #b4b4b4;
        justify-content: flex-end;
        margin: 15px 0 0 0;

        & > span {
            margin-right: 16px;
        }

        .bordershow.cu {
            border: 1px solid #26adf5;
        }

        .bordershow .el-color-picker__trigger {
            border-color: #26adf5;
        }

        & > div {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            border: 1px solid #c7c7c7;
            margin-right: 8px;
        }

        p {
            text-align: center;
            margin-left: 20px;
            line-height: 30px;
            font-size: 12px;
            color: #fff;
            width: 100px;
            border-radius: 15px;

            i {
                margin-right: 5px;
            }
        }

        .el-color-picker__trigger {
            /*border: none;*/
            /*border-radius: 50%;*/
            width: 60px;
            border-radius: 13px;
            border-color: #c7c7c7;

            .el-color-picker__color-inner {
                display: none;
            }

            .el-icon-arrow-down:before {
                content: "\e794";
                color: #000;
            }

            .el-color-picker__color {
                /*display: none;*/
                border: none;
            }
        }
    }

    .downLoadBtn {
        /*width: 160px;*/
        margin: 25px auto 0;
        position: relative;
        text-align: right;

        .sizeChose {
            position: absolute;
            margin-top: 10px;
            /*width: 260px;*/
            border: 1px solid #efefef;
            border-radius: 10px;
            font-size: 12px;
            line-height: 30px;
            color: #727272;
            padding: 10px 0;
            background-color: #fff;
            right: 170px;
            z-index: 99;

            & > div:hover {
                background-color: #f1f1f1;
            }

            & > div {
                cursor: pointer;
                padding: 0 12px;
                span:first-child{
                    margin-right: 25px;
                }
            }
        }
    }

    .bordershow .el-color-picker__trigger {
        border-color: #26adf5;
    }

    .el-color-picker__trigger {
        /*border: none;*/
        /*border-radius: 50%;*/
        width: 60px !important;
        border-radius: 13px;
        border-color: #c7c7c7;
    }

    .el-color-picker__color-inner {
        display: none;
    }

    .el-icon-arrow-down:before {
        content: "\e794";
        color: #000;
    }

    .el-color-picker__color {
        /*display: none;*/
        border: none;
    }
</style>
