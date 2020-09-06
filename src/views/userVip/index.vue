<template>
    <div class="vip">
        <header-sub></header-sub>
        <div class="section margin">
            <h3>获取高分辨率图像</h3><!--获取全分辨率图像-->
            <p>1图像消耗1次</p><!--1图像=1能量-->
            <div class="flex a-i">
                <div class="left">
                    <div class="title">免费账号</div><!--订阅计划-->
                    <p>邀请好友注册可获得5次免费下载赠送</p>
                    <div class="Lbtn cu" @click="yaoqing">立即邀请</div>
                    <p>填写好友邀请码可获得5次免费下载赠送</p>
                    <div class="Lbtn cu" @click="showLoginDilogAction">立即填写</div>
<!--                    <p>微信扫一扫关注公众号获取5次免费下载赠送</p>-->
<!--                    <img src="@/assets/image/wechatEwm.jpg" alt="">-->
                </div>
                <div class="center">
                    <div class="title">包月用不完，累积5个月</div><!--订阅计划-->
                    <div class="price" v-show="radio!=='other'"><span>￥{{selectRadio | Calculation(radio3)}}</span>/次
                    </div>
                    <!--图像-->
                    <div class="price" v-show="radio==='other'"><span>其他方案</span></div><!--图像-->
                    <div class="raidos">
                        <el-radio-group v-model="radio" @change="changeRadio">
                            <el-radio :label="item.id" v-for="(item,index) in choseList" :key="index">
                            <span class="clear">
                                <span>{{item.num}}次</span><!--能量/月-->
                                <span>￥{{item.price}}</span>
                                <span>￥{{item | Calculation}}/次</span>
                            </span>
                            </el-radio>
                            <el-radio label="other">
                            <span class="clear">
                                <span>多QPS包月，请联系技术顾问<!--<i @click.stop="dialogVisible2=true"
                                                        style="color: #21a9e8;border-bottom: 1px solid #21a9e8;position: absolute;">什么是QPS</i>--></span>
                            </span>
                            </el-radio>
                            <!--                        <el-radio :label="99">企业-联系我们</el-radio>-->
                        </el-radio-group>
                    </div>
                    <div class="raidos2">
                        <el-radio-group v-model="radio3">
                            <el-radio :label="1"><span>按月付费</span></el-radio>
                            <el-radio :label="12"><span>按年付费</span> <span style="color: #e82255;">节省10%</span></el-radio>
                        </el-radio-group>
                    </div>
                    <el-button type="primary" round @click="tobuyitem(1)">{{radio!=='other' ? '立即购买' : '联系我们'}}
                    </el-button><!--立即购买-->
                    <img src="@/assets/chaozhi.png" class="chaozhi" alt="">
                </div>
                <div class="right">
                    <div class="title">按次购买，永久使用</div><!--订阅计划-->
                    <div class="price" v-show="radio2!=='other'"><span>￥{{selectRadio2 | Calculation}}</span>/次</div>
                    <!--图像-->
                    <div class="price" v-show="radio2==='other'"><span>其他方案</span></div><!--图像-->
                    <div class="raidos">
                        <el-radio-group v-model="radio2" @change="changeRadio2">
                            <el-radio :label="item.id" v-for="(item,index) in choseList2" :key="index">
                            <span class="clear">
                                <span>{{item.num}}次</span><!--能量/月-->
                                <span>￥{{item.price}}</span>
                                <span>￥{{item | Calculation}}/次</span>
                            </span>
                            </el-radio>
                            <el-radio label="other">
                            <span class="clear">
                                <span>企业客户大批量或包月方案，请联系我们</span>
                            </span>
                            </el-radio>
                            <!--                        <el-radio :label="99">企业-联系我们</el-radio>-->
                        </el-radio-group>
                    </div>
                    <el-button type="primary" round @click="tobuyitem(2)">{{radio2!=='other' ? '立即购买' : '联系我们'}}
                    </el-button><!--立即购买-->
                    <!--                    <div class="lasts">-->
                    <!--                        <p>* 购买的次数没有使用时间限制</p>-->
                    <!--                        <div>注册即可获得10次免费下载赠送。<span class="cu" @click="userRegest">马上注册领取</span></div>-->
                    <!--                        <div style="margin-top: 10px">邀请好友注册可获得20次免费下载赠送。<a  href="userCenter.html#/userCenter/invitation">立即邀请</a></div>-->
                    <!--                    </div>-->
                </div>
            </div>
            <div class="ques">
                <h2>常见问题</h2>
                <div class="res" style="width: 900px;margin: 0 auto">
                    <el-collapse accordion>
                        <el-collapse-item title="应该按次购买还是包月？" name="1">
                            <div>对于一次性用途，或者抠图难度高的图片，建议按次购买。</div>
                            <div>对于量比较大，并且可能会增长的情况，包月会很省钱，当月用不完也没关系，持续包月就可以累积到下个月继续使用，最多可以累积5个月哦。</div>
                        </el-collapse-item>
                        <el-collapse-item title="什么时候会消耗次数？" name="2">
                            <div>网站上的预览图是免费使用。只有下载高清图的时候才会消耗次数。API按调用的次数消耗。</div>
                        </el-collapse-item>
                        <el-collapse-item title="图片格式有什么要求?" name="3">
                            <div>支持PNG、JPG、JPEG、BMP、GIF，图片文件大小15MB以下，图像分辨率 4096 x 4096 像素以下。</div>
                        </el-collapse-item>
                        <el-collapse-item title="什么是预览图？" name="4">
                            <div>预览图的分辨率是500x500以下。网站上的预览图都是免费使用的。</div>
                        </el-collapse-item>
                        <el-collapse-item title="可以升级或降级包月吗？" name="5">
                            <div>
                                在你包月用完时，你可以随时升级更多的包月，例如你包月100次用完了，可以升级包月1000次的，并且马上生效。降级就是你购买下个月小一点的套餐，这个月用不完的，也可以累积到下个月去的，只是5倍的累计量是按最新的套餐计算，降级后100每月，那最多可以再叠加500，100+500
                                = 600
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="可以取消包月吗？" name="6">
                            <div>只要不续费，包月就会自动取消，但是之前累积的5个月抠图次数，也会自动清空。</div>
                        </el-collapse-item>
                        <el-collapse-item title="包月用不完怎么办？" name="7">
                            <div>如果到月底您还没有用完包月次数，剩余的次数将会结转至下个月——因此您完全不需担心会被浪费。</div>
                            <div>您可以结转最多 5 倍的每月预存包月次数至下个月。持续包月就可以累积到下个月继续使用，最多可以累积5个月。例如，如果您的包月是 500 的次数，则每月可获得 500 点
                                次数，除此以外，您还可以从前一个月转存最多 2,500 次到这个月，一共是 3000次。
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="包月后充值的次数会保留吗？" name="8">
                            <div>充值的次数依然保留。优先扣除付费点数，例如：在抠图次数剩余10张情况下，包月100张，优先扣除按月付费100张，再扣除按次付费的10张。</div>
                        </el-collapse-item>
                        <el-collapse-item title="API是干什么的？" name="9">
                            <div>如果你有网站、APP、小程序、H5页面等想要集成抠图的能力，就可以使用API。这个是 <a href="apis.html" style="color: #e82255;">API文档链接</a>
                            </div>
                            <div>我们的Windows、Mac <a href="downLoad.html" style="color: #e82255;">客户端</a>也是基于API制作的。</div>
                        </el-collapse-item>
                        <el-collapse-item title="可以批量抠图吗？" name="10">
                            <div>网站、客户端，都支持批量抠图。多选文件进入即可。 网站一次性可以放30张。 客户端可以一次性放入100张。每秒处理1张。如果有更大的并发需求，可以联系我们。</div>
                        </el-collapse-item>
<!--                        <el-collapse-item title="QPS是什么？" name="11">-->
<!--                            <div>QPS指每秒钟能向抠图服务 API 发起的请求次数。QPS越高，同一时段内能够处理的业务量就越多。例如：购买调用QPS为1的抠图服务，则在1秒钟内可以进行1次抠图。-->
<!--                                用QPS计算器，可以轻松计算调用量和QPS需求的关系。-->
<!--                            </div>-->
<!--                        </el-collapse-item>-->
                    </el-collapse>
                    <div style="font-size: 24px;margin-top: 46px;text-align: center;">如果您仍有疑惑，可以 <span class="cu"
                                                                                                       @click="openConcat"
                                                                                                       style="color: #e82255;">联系技术顾问</span>
                    </div>
                </div>
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
                <div class="title">{{lastSelect!=='other' ? `${lastSelect.productType===2 ? '充值账户' : '包月套餐'}：${lastSelect.num} 次` : '联系我们私聊哦~'}}</div>
                <div class="price" v-if="lastSelect!=='other'">{{lastSelect.productType===2 ? '' : (radio3===1 ? '按月支付：' : '按年付费：')}}￥{{orderMSg.price}}</div>
                <p style="margin-bottom: 0;" v-if="lastSelect.productType===3 && radio3===12">月费￥{{lastSelect.price}} X 12个月 X 0.9折扣</p>
                <img :src="ermUrl" alt="" :class="{imgs : ermUrl!==successImg}">
                <p v-if="lastSelect!=='other' && ermUrl!==successImg">微信扫码支付</p>
                <!--                <p>time</p>-->
                <el-button @click="goUserCenter" v-show="ermUrl===successImg">立即查看</el-button><!--继续-->
            </div>
        </el-dialog>
        <el-dialog
                custom-class="Dlog Dlog2"
                :close-on-click-modal="false"
                :visible.sync="dialogVisible2"
                width="400px">
            <div class="Dcontent tDlog">
                <div class="title">什么是QPS</div>
                <p>QPS概念：指每秒钟能向抠图服务API发起的请求次数。QPS越高，同一时段内能够处理的业务量就越多。例如:购买调用QPS为1的抠图服务,则在1秒钟内可以进行1次抠图。</p>
                <p>QPS计算方式：每天的调用量80%集中在9个小时内，算出来每秒的平均请求量，乘于3， 得到需要的峰值QPS</p>
                <p>QPS计算器</p>
                <div style="margin-top: 15px;">
                    <el-input placeholder="请输入每天大概调用次数" type="number" v-model="input2">
                        <el-button slot="append" style="border-radius: 0" @click="getres">计算QPS</el-button>
                    </el-input>
                </div>
                <div class="result" v-show="result">
                    每天{{input2}}调用量，需要 <i style="color: #e82255">{{result}}QPS</i>
                </div>
                <div class="concat cu" @click="">
                    联系技术顾问
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import headerSub from '@/components/header/index.vue'
    import footerSub from '@/components/footer/index.vue'
    import {subscriptionPlans, userCreatePayment, judgeIsPaly, getQrCode} from "../../apis";
    import {getToken} from "../../utils/auth";
    import {basrUrls} from "../../utils";
    import ewm from '../../assets/caoewm.png'
    import successImg from '../../assets/image/paySuccess.png'
    import { mapGetters,mapActions } from 'vuex'

    export default {
        name: 'vip',
        data() {
            return {
                ewm,
                successImg,
                choseList: [],
                choseList2: [],
                feedbackList: [
                    // {name:'王女士',tag:'跨境店铺店主',content:'他能帮我快速处理图片背景，节约了我大量的时间，让我有更多的时间运营我的店铺，并且他处理图片背景的效果非常强大。',img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3677209778,3519789803&fm=27&gp=0.jpg'},
                    // {name:'王女士',tag:'跨境店铺店主',content:'他能帮我快速处理图片背景，节约了我大量的时间，让我有更多的时间运营我的店铺，并且他处理图片背景的效果非常强大。',img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3677209778,3519789803&fm=27&gp=0.jpg'},
                    // {name:'王女士',tag:'跨境店铺店主',content:'他能帮我快速处理图片背景，节约了我大量的时间，让我有更多的时间运营我的店铺，并且他处理图片背景的效果非常强大。',img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3677209778,3519789803&fm=27&gp=0.jpg'},
                    {
                        name: 'Ms. Wang',
                        tag: 'Cross-border e-commerce business owner',
                        content: 'Picup helps me quickly process the foreground of the picture, saving me a lot of time, giving me more time to run my business, and the effect on the processed pictures is very amazing!',
                        img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3677209778,3519789803&fm=27&gp=0.jpg'
                    },
                    {
                        name: 'Ms. Wang',
                        tag: 'Cross-border e-commerce business owner',
                        content: 'Picup helps me quickly process the foreground of the picture, saving me a lot of time, giving me more time to run my business, and the effect on the processed pictures is very amazing!',
                        img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3677209778,3519789803&fm=27&gp=0.jpg'
                    },
                    {
                        name: 'Ms. Wang',
                        tag: 'Cross-border e-commerce business owner',
                        content: 'Picup helps me quickly process the foreground of the picture, saving me a lot of time, giving me more time to run my business, and the effect on the processed pictures is very amazing!',
                        img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3677209778,3519789803&fm=27&gp=0.jpg'
                    },
                ],
                radio: 1,
                radio2: 1,
                radio3: 1,
                input2: '',
                dialogVisible: false,
                dialogVisible2: false,
                value: '1',
                options: [
                    {label: '中国', value: '1'},
                    {label: '美国', value: '2'},
                    {label: '德国', value: '3'},
                    {label: '英国', value: '4'},
                    {label: '澳大利亚', value: '5'},
                    {label: '新加坡', value: '6'},
                ],
                selectRadio2: {},
                selectRadio: {},
                lastSelect: {},
                basrUrls: basrUrls(),
                ermUrl: '',
                orderMSg: '',
                timer: '',
                result: 0
            }
        },
        computed: {},
        watch: {},
        mounted() {
            this.getPlansList()
        },
        methods: {
            ...mapActions(['showLoginDilogAction']),
            yaoqing(){
                if(getToken())window.location.href='userCenter.html#/userCenter/invitation';
                else this.showLoginDilogAction();
            },
            changeRadio(e) {
                if (e === 'other') this.selectRadio = 'other';
                else this.selectRadio = this.choseList.filter( val => val.id == e )[0]
            },
            changeRadio2(e) {
                if (e === 'other') this.selectRadio2 = 'other';
                else this.selectRadio2 = this.choseList2.filter( val => val.id == e )[0]
            },
            getPlansList() {
                subscriptionPlans( {productType: 3} ).then( res => {
                    if (!res.code) {
                        this.choseList = res.data;
                        this.radio = res.data[2].id;
                        this.changeRadio( this.radio );
                    }
                } )
                subscriptionPlans( {productType: 2} ).then( res => {
                    if (!res.code) {
                        this.choseList2 = res.data;
                        this.radio2 = res.data[2].id;
                        this.changeRadio2( this.radio2 );
                    }
                } )
            },
            userRegest() {
                if (getToken()) {
                    this.$message( {message: '您已经注册过啦！', type: 'success'} );
                    return
                }
                window.location.href = `${this.basrUrls}/register.html`
            },
            userContinue() {
                if (!getToken()) this.showLoginDilogAction();
                else {
                    const loading = this.$loading( {
                        lock: true,
                        text: '处理中，请稍等...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    } );
                    userCreatePayment( {planId: this.selectRadio2.planId} ).then( res => {
                        if (!res.code) {
                            window.location.href = res.data
                            loading.close()
                        }
                    } )
                }
            },
            tobuyitem(k) {

                if ((this.radio2 === 'other' && k === 2) || (this.radio === 'other' && k === 1)) {
                    this.lastSelect = 'other';
                    this.dialogVisible = true;
                    this.ermUrl = this.ewm;
                    return
                }
                if (!getToken()) this.showLoginDilogAction();
                else {
                    let data = {};
                    this.lastSelect = k === 1 ? this.selectRadio : this.selectRadio2;
                    const loading = this.$loading( {
                        lock: true,
                        text: '订单生成中...',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    } );
                    data['productId'] = this.lastSelect.id;
                    if (k === 1) data['num'] = this.radio3;
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
            openConcat() {
                this.lastSelect = 'other';
                this.ermUrl = this.ewm;
                this.dialogVisible = true;
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
    .section {
        padding-top: 152px;
        text-align: center;
        margin-bottom: 108px;

        .flex {
            justify-content: space-around;
        }

        h3 {
            font-family: "Microsoft YaHei";
            font-size: 44px;
            color: #333;
            margin-bottom: 28px;
        }

        & > p {
            font-size: 16px;
            color: #626262;
            margin-bottom: 40px;
        }

        .left, .center, .right {
            width: 500px;
            /*overflow: hidden;*/
            border-radius: 15px;
            text-align: center;
            background-color: #fff;
            padding-bottom: 30px;
            min-height: 570px;
            position: relative;

            .title {
                font-size: 24px;
                color: #000;
                margin: 50px 0 37px;
            }

            .raidos2 {
                margin: 20px 0;
                span{
                    color: #333;
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
                    font-size: 30px;
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
                            border-bottom: 1px solid #eee;
                        }
                    }

                }
            }

            .clear span {
                display: inline-block;
                width: 31%;
                color: #333;

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

            .lasts {
                p {
                    margin-bottom: 10px;
                    color: #e82255
                }

                font-size: 14px;

                span, a {
                    color: $to
                }
            }

            & > p {
                font-size: 12px;
                margin-bottom: 93px;
                line-height: 1;
            }

            .share {
                font-size: 14px;
                line-height: 1;
                color: #333;
                margin-bottom: 55px;
            }
            & > .chaozhi{
                position: absolute;
                top: -8px;
                right: -8px;
            }
        }

        .center {
            margin: 0 15px;

            & > .el-button {
                margin: 0;
            }
        }

        .left .price {
            font-size: 30px;
            color: #333;
        }

        .left .price.yi {
            width: 30px;
            margin: 0 auto 34px;
            padding: 15px 0;
            border-bottom: 3px solid #333;
            height: 1px;
        }

        .left {
            font-size: 14px;
            color: #333;

            img {
                display: block;
                margin: 20px auto 0;
                width: 110px;
                height: 110px;
            }

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

    .tDlog {
        .el-button {
            margin: 0;
            border: 1px solid $co;
        }

        & > p {
            line-height: 20px;
            margin-bottom: 18px;
            color: #000;
            text-align: left;
            padding: 0 30px;
        }

        & > div {
            padding: 0 30px;
        }

        .title {
            font-size: 24px;
            color: #000;
        }

        .result {
            line-height: 54px;
            text-align: left;
            font-size: 14px;
        }

        .concat {
            margin-top: 15px;
            padding: 0;
            font-size: 18px;
            color: #e82255;
            background-color: rgb(245, 243, 244);
            line-height: 80px;
        }
    }

    .ques {
        margin-top: 120px;
        text-align: left;

        h2 {
            font-size: 36px;
            text-align: center;
            margin-bottom: 80px;
        }

        .res {
            background-color: rgba(0, 0, 0, 0);
        }
    }
</style>
<style lang="scss">
    .vip .el-collapse {
        background-color: initial;
        border: none;
    }

    .vip .el-collapse .el-collapse-item__header, .vip .el-collapse .el-collapse-item__wrap {
        background-color: rgba(0, 0, 0, 0);
        border-color: #999;
    }

    .vip .el-collapse .el-collapse-item__header {
        font-size: 24px;
        line-height: 84px;
        height: 84px;
        border-bottom: 1px solid #999;
    }

    .vip .el-collapse .is-active .el-collapse-item__header {
        border-bottom: none;
    }

    .vip .right .clear span {
        color: #333;
    }

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

    .vip .Dlog2 .el-dialog__body {
        padding: 0;
    }

    .vip .Dlog2 {
        overflow: hidden;
    }
</style>
