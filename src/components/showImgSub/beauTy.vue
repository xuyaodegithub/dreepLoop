<template>
    <div class="beauTy flex">
        <i class="el-icon-close cu" @click="deleteItem()"></i>
        <div class="left">
            <p>原图</p>
            <div class="imgS">
                <img src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/matting_original/2020/05/12/57042f45515547acb6403eb633fe887d.jpg"
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
                <div v-show="bgOriginal.status===3" class="errmsg">
                    <i class="el-icon-circle-close"></i>
                    图片过大，暂时无法处理
                    <p>
                        请选择一个不超过15M的图片进行处理
                    </p>
                </div>
                <div v-show="bgOriginal.status===2" class="errmsg">
                    <i class="el-icon-s-flag"></i>
                    当前正在排队,请稍后...
                    <p>
                        排队位置{{imageMsg.queueNumber}}
                    </p>
                </div>
                <div class="close" v-show="![0,1,2,3].includes(bgOriginal.status)">
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
                    <tr>当前可用次数：{{userSubscribeData ? userSubscribeData.freeRemaining +
                        userSubscribeData.monthRemaining : 0}} <a href="userVip.html" class="cu" target="_blank"
                                                                  style="color: #a1a0a0;margin-left: 20px;border-bottom: 1px solid #a1a0a0;">去充值</a>
                    </tr>
                </table>
            </el-button>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import {myBrowser} from '@/utils'

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
                loadingInstance:''
            }
        },
        computed: {
            ...mapGetters( ['userSubscribeData'] ),
        },
        methods: {
            downLoadImg(e, k) {
                this.loadingInstance = this.$loading( {
                    lock: true,
                    text: '处理中，请稍后......',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                } );
                if (k) {
                    downloadMattedImage( {fileId: this.edrieImgInfo.fileId} ).then( res => {
                        if (!res.code) {
                            this.initSmallTag( e, '次数 -1' );
                            let oImg = new Image(), c = document.createElement( 'canvas' );
                            const ct = c.getContext( '2d' );
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
                                    oA.download = 'tup.png';
                                    oA.click();
                                }
                            }
                            oImg.src = res.data;
                        }
                    } )
                }
            },
            deleteItem() {//删除某一个
                let name = '';
                if (this.timer) clearInterval( this.timer )
                if (this.files.type == 'copy') name = this.imgname
                else name = this.files.name
                this.$emit( 'close', {index: this.index, name: name} )
            },
        },
        mounted() {

        }
    }
</script>

<style scoped lang="scss">
    .beauTy {
        font-size: 14px;
        line-height: 32px;
        padding: 10px 0;
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
                        padding: 0 20px;
                        display: block;
                        width: 100%;

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
                    }
                }
            }
        }

    }

</style>
