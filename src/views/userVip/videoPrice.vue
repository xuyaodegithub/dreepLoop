<template>
    <div class="vip">
        <header-sub></header-sub>
        <div class="section margin">
            <h3>获取高清视频抠图</h3><!--获取全分辨率图像-->
            <p>按秒计费</p><!--1图像=1能量-->
            <div class="flex">
                <div class="left">
                    <div class="title">免费账号</div><!--订阅计划-->
                    <p>360P 5秒 免费视频抠图去背景</p>
                    <div class="Lbtn cu" @click="showLoginDilogAction">立即注册</div>
                </div>
                <div class="center">
                    <div class="title">按时长充值，永久使用</div><!--订阅计划-->
                    <div class="price" v-show="radio!=='other'"><span>￥{{selectRadio | Calculation(1)}}</span>/秒
                    </div>
                    <!--图像-->
                    <div class="price" v-show="radio==='other'"><span>其他方案</span></div><!--图像-->
                    <div class="raidos">
                        <el-radio-group v-model="radio" @change="changeRadio">
                            <el-radio :label="item.id" v-for="(item,index) in choseList" :key="index">
                            <span class="clear">
                                <span>{{item.productName}}</span><!--能量/月-->
                                <span>￥{{item.price}}</span>
                                <span>￥{{item | Calculation}}/秒</span>
                            </span>
                            </el-radio>
                            <el-radio label="other">
                            <span class="clear">
                                <span>更大文件/清晰度/帧率，请联系技术顾问<!--<i @click.stop="dialogVisible2=true"
                                                        style="color: #21a9e8;border-bottom: 1px solid #21a9e8;position: absolute;">什么是QPS</i>--></span>
                            </span>
                            </el-radio>
                            <!--                        <el-radio :label="99">企业-联系我们</el-radio>-->
                        </el-radio-group>
                    </div>
                    <el-button type="primary" round @click="tobuyitem(1)">{{radio!=='other' ? '立即购买' : '联系我们'}}
                    </el-button><!--立即购买-->
                    <img src="@/assets/chaozhi.png" class="chaozhi" alt="">
                </div>
            </div>
            <div class="flex limt">
                <div>最大文件大小：<span>500M</span></div>
                <div>最大视频清晰度：<span>1080P</span></div>
                <div>最大帧率：<span>30FPS</span></div>
            </div>
            <div class="concat">
                <h1>有问题可以联系技术顾问</h1>
                <img src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200821/baa528a86fad49fe88eb6588dbaf2129.png" alt="">
                <p>微信扫一扫添加技术顾问好友</p>
            </div>
        </div>
        <!--        <footer-sub></footer-sub>-->
        <el-dialog
                @close="closeDlog"
                custom-class="Dlog"
                :close-on-click-modal="false"
                :visible.sync="dialogVisible"
                width="400px">
            <div class="Dcontent">
                <div class="title">{{lastSelect!=='other' ? `充值账户:${lastSelect.productName} ` : '联系我们私聊哦~'}}</div>
                <div class="price" v-if="lastSelect!=='other'">￥{{orderMSg.price}}</div>
                <img :src="ermUrl" alt="" :class="{imgs : ermUrl!==successImg}">
                <p v-if="lastSelect!=='other' && ermUrl!==successImg">微信扫码支付</p>
                <!--                <p>time</p>-->
                <el-button @click="goUserCenter" v-show="ermUrl===successImg">立即查看</el-button><!--继续-->
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import headerSub from '@/components/header/index.vue'
    import footerSub from '@/components/footer/index.vue'
    import {subscriptionPlans, userCreatePayment, judgeIsPaly, getQrCode} from "../../apis";
    import {getToken} from "../../utils/auth";
    import ewm from '../../assets/caoewm.png'
    import successImg from '../../assets/image/paySuccess.png'
    import { mapActions } from 'vuex';
    export default {
        name: 'vip',
        data() {
            return {
                ewm,
                successImg,
                choseList: [],
                choseList2: [],
                radio: 1,
                radio2: 1,
                input2: '',
                dialogVisible: false,
                options: [
                    {label: '中国', value: '1'},
                    {label: '美国', value: '2'},
                    {label: '德国', value: '3'},
                    {label: '英国', value: '4'},
                    {label: '澳大利亚', value: '5'},
                    {label: '新加坡', value: '6'},
                ],
                selectRadio: {},
                lastSelect: {},
                ermUrl: '',
                orderMSg: '',
                timer: '',
            }
        },
        computed: {},
        watch: {},
        mounted() {
            this.getPlansList()
        },
        methods: {
            ...mapActions(['showLoginDilogAction']),
            changeRadio(e) {
                if (e === 'other') this.selectRadio = 'other';
                else this.selectRadio = this.choseList.filter( val => val.id == e )[0]
            },
            getPlansList() {
                subscriptionPlans( {productType: 4} ).then( res => {
                    if (!res.code) {
                        this.choseList = res.data;
                        this.radio = res.data[2].id;
                        this.changeRadio( this.radio );
                    }
                } )
            },
            tobuyitem(k) {
                if ((this.radio2 === 'other' && k === 2) || (this.radio === 'other' && k === 1)) {
                    this.lastSelect = 'other';
                    this.dialogVisible = true;
                    this.ermUrl = this.ewm;
                    return
                }
                if (!getToken())this.showLoginDilogAction();
                else {
                    let data = {};
                    this.lastSelect =  this.selectRadio;
                    const loading = this.$loading( {
                        lock: true,
                        text: '订单生成中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    } );
                    data['productId'] = this.lastSelect.id;
                    userCreatePayment( data ).then( res => {
                        if (!res.code) {
                            this.orderMSg = res.data;
                            getQrCode( {codeUrl: res.data.codeURL} ).then( res => {
                                if (!res.code) {
                                    this.ermUrl = res.data;
                                    this.dialogVisible = true;
                                    this.checkStatus()
                                    loading.close()
                                }
                            } )
                        }
                    } ).catch( err => loading.close() )
                    // this.dialogVisible=true
                }
            },
            checkStatus() {
                judgeIsPaly( {orderId: this.orderMSg.orderId} ).then( res => {
                    if (res.data) this.ermUrl = this.successImg;
                    else {
                        this.timer = setTimeout( () => {
                            this.checkStatus()
                        }, 2000 )
                    }
                } )
            },
            closeDlog() {
                clearInterval( this.timer )
            },
            goUserCenter() {
                window.location.href = 'userCenter.html'
            },
            getres() {

            }
        },
        components: {
            headerSub, footerSub
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .vip{
        background-color: #000;
        min-height: 100%;
    }
    .section {
        padding-top: 152px;
        text-align: center;
        .flex {
            justify-content: center;
            .left{
                margin-right: 20px;
            }
        }

        h3 {
            font-family: "Microsoft YaHei";
            font-size: 44px;
            color: #D9D9D9;
            margin-bottom: 28px;
        }

        & > p {
            font-size: 16px;
            color: #D9D9D9;
            margin-bottom: 40px;
        }

        .left, .center, .right {
            width: 500px;
            /*overflow: hidden;*/
            border-radius: 15px;
            text-align: center;
            background-color: #202020;
            padding-bottom: 30px;
            position: relative;
            color: #D9D9D9;

            .title {
                font-size: 30px;
                color: #D9D9D9;
                margin: 40px 0 37px;
            }

            .raidos2 {
                margin: 20px 0;
                span{
                    color: #D9D9D9;
                }
                .el-radio-group {
                    display: flex;
                    justify-content: center;

                    label {
                        width: auto;
                        margin-bottom: 0;
                    }
                }
            }

            .price {
                font-size: 12px;
                color: #e82255;
                margin-bottom: 34px;
                line-height: 1;
                font-weight: bold;

                span {
                    font-size: 48px;
                }
            }

            .raidos {
                .el-radio-group {
                    text-align: left;
                    display: block;
                    padding: 0 24px;
                    color: #a2a2a2;

                    .el-radio {
                        width: 100%;
                        height: 32px;

                        &:last-child {
                            padding-bottom: 14px;
                        }
                    }

                }
            }

            .clear span {
                display: inline-block;
                width: 31%;
                color: #D9D9D9;

                &:last-child {
                    text-align: right;
                }

                &:nth-child(2) {
                    text-align: center;
                }
            }

            .el-button {
                background-color: #e82255;
                width: 160px;
                border-color: #e82255;
                margin-top: 54px;
                margin-bottom: 20px;
            }
            & > p {
                font-size: 12px;
                margin-bottom: 93px;
                line-height: 1;
            }

            & > .chaozhi{
                position: absolute;
                top: -8px;
                right: -8px;
            }
        }
        .left .title{
            margin-bottom: 88px;
        }
        .center {
            margin: 0 15px;

            & > .el-button {
                margin: 0;
            }
        }

        .left .price {
            font-size: 30px;
            color: #D9D9D9;
        }

        .left {
            font-size: 14px;
            color: #D9D9D9;
            .Lbtn {
                margin: 24px auto 64px;
                width: 140px;
                text-align: center;
                border: 1px solid $co;
                line-height: 30px;
                border-radius: 15px;
                color: $co;
            }

            & > p {
                margin: 0;
            }
        }
        .limt{
            font-size: 18px;
            margin: 35px 0 124px;
            color: #9F9F9F;
            justify-content: center;
            div:nth-child(2){
                margin: 0 66px;
            }
            span{
                color: #D1D1D1;
            }
        }
        .concat{
            color: #D9D9D9;
            font-size: 18px;
            text-align: center;
            padding-bottom: 150px;
            h1{
                font-size: 30px;
                color: #D9D9D9;
                margin-bottom: 60px;
            }
            img{
                display: block;
                width: 260px;
                margin: 0 auto 25px;
            }
        }
    }

    .Dcontent {
        .title {
            font-size: 20px;
            color: #5c5c5c;
            margin-bottom: 20px;
        }

        img {
            display: block;
            margin: 15px auto;
        }

        .imgs {
            width: 180px;
        }

        .price {
            font-size: 24px;
            color: #e82255;
            margin-bottom: 25px;
        }

        & > p {
            font-size: 14px;
            color: #5c5c5c;
            margin-bottom: 28px;
            line-height: 1;

            i {
                font-size: 20px;
                display: inline-block;
                vertical-align: middle;
            }
        }

        .el-select {
            display: block;
            margin-bottom: 40px;
        }

        .el-button {
            border-color: #e82255;
            background-color: #e82255;
            color: #fff;
            margin-top: 20px;
        }
    }
</style>
<style lang="scss">

    .vip .el-radio__input.is-checked + .el-radio__label, .vip .el-radio {
        color: #a2a2a2;
    }

    .vip .el-radio__input.is-checked .el-radio__inner {
        border-color: #e82255;
        background-color: #e82255;
    }

    .vip .el-radio__input .el-radio__inner {
        border-color: #666;
    }

    .vip .Dlog .el-dialog__body {
        padding: 16px 22px 32px;
        text-align: center;
    }

    .vip {
        .Dlog {
            border-radius: 15px;
        }

        .el-dialog__headerbtn {
            top: 15px;
            right: 15px;
        }
    }

    .vip div.el-input-group__append {
        padding: 0;
        border: 0;
    }
</style>
