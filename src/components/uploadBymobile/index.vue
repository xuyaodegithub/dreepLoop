<template>
    <div class="upload_mobile">
        <el-button round @click="upbymobile"
                   :style="style"><img style="height: 20px;margin-right: 10px;" :src="imgSrc" alt=""> 手机上传
        </el-button>
        <div class="diglog diglogbymobile" v-show="showCode">
            <i class="cu" @click="showCode=false"></i>
            <h4>扫码上传图片</h4>
            <div ref="qrcode"></div>
            <p>手机上传图片时，请不要关闭弹框</p>
        </div>
        <div class="zhezhao" v-show="showCode"></div>
    </div>
</template>

<script>
    import QRCode from 'qrcodejs2';
    import {uploadBymobile, uploadFrommobile} from '@/apis';

    export default {
        name: "index",
        props: {
            color: Number
        },
        data() {
            return {
                qrcode: '',
                timer: 0,
                showCode: false,
                urlhref: process.env.VUE_APP_NAME === 'formal' ? 'http://www.picup.shop' : 'http://wwwdev.picup.shop',
                taskFlag: ''
            }
        },
        computed: {
            style() {
                const colors = ['', '#e82255', '#e82255', '#F75191', '#21a9e8', '#2ED8B4', '#4254E6']
                return {
                    borderColor: colors[this.color], color: colors[this.color], backgroundColor: '#fff'
                }
            },
            imgSrc() {
                const src = ['', 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200811/1900436f3be2442980cb8e2887fc0d21.png',
                    'http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200811/1900436f3be2442980cb8e2887fc0d21.png',
                    'http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200907/8dd28f53abdf4aea9dd0fad16b5597f6.png',
                    'http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200907/4c4777e0797f4433b483f0e474e5b299.png',
                    'http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200907/38cfad168d894c17aafbf2b90cf6081f.png',
                    'http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200907/bf9cad21383644ca854aff2a772cd71c.png',
                ]
                return src[this.color]
            }
        },
        watch: {
            showCode(n, o) {
                if (!n) clearTimeout( this.timer )
            }
        },
        methods: {
            upbymobile() {
                uploadBymobile().then( res => {
                    if (!res.code) {
                        this.taskFlag = res.data;
                        this.qrcode.makeCode( this.urlhref + "/uploadBymobile.html?taskFlag=" + this.taskFlag );
                        this.showCode = true;
                        this.lunxun()
                    }
                } )
            },
            lunxun() {
                uploadFrommobile( {taskFlag: this.taskFlag} ).then( res => {
                    if (!res.code) {
                        if (res.data.status === 2) {
                            this.showCode = false;
                            this.$emit( 'success', res.data.url )
                        } else this.timer = setTimeout( this.lunxun, 2000 )
                    }
                } )
            }
        },
        mounted() {
            this.qrcode = new QRCode( this.$refs.qrcode, {
                text: this.urlhref + "/uploadBymobile.html",
                width: 128,
                height: 128,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            } );
        }
    }
</script>

<style scoped lang="scss">
    .upload_mobile {
        width: initial !important;
        height: initial !important;
        margin-right: 0 !important;
    }

    .btn {
        font-size: 14px;
        line-height: 50px;
        height: 50px;
        color: $co;
        border: 1px solid $co;
        border-radius: 10px;

        img {
            margin-right: 10px;
        }
    }

    .diglog {
        position: fixed;
        padding: 40px 60px;
        background-color: #fff;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        z-index: 1222;
        border-radius: 15px;
    }

    .diglog h4 {
        font-size: 16px;
        color: #333;
        margin-bottom: 20px;
    }

    .diglog img {
        display: block;
        width: 140px;
        margin: 0 auto 20px;
    }

    .diglog p {
        font-size: 14px;
        color: #9c9c9c;
    }

    .diglog i {
        position: absolute;
        font-size: 24px;
        width: 20px;
        height: 20px;
        top: 10px;
        right: 10px;
        background: url("http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200812/5e3d6826bc0045a4b8808d4fb1d50724.png") no-repeat center;

    }

    .zhezhao {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 1111;
        background-color: rgba(0, 0, 0, .4);
    }
</style>
