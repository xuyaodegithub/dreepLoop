<template>
    <section>
        <div class="register" v-if="beforSet">
            <header-sub></header-sub>
            <div class="userContent">
                <div class="tag">
                    <span><!--Reset password-->注册</span>
                </div>
                <div class="userinfo">
                    <el-input v-model="phone" placeholder="请输入手机号" type="number" :maxlength="11" required></el-input>
                    <sliderYz @success="toShowCode" :visible.sync="showCode"></sliderYz>
                    <div class="flex dxzz a-i">
                        <el-input v-model="userpass" placeholder="短信验证码" type="number">
                        </el-input>
                        <el-button type="primary" @click="sendMobileCode()">{{timer ? timer : '发送验证码'}}</el-button>
                    </div>
                    <!--                <el-input v-model="usersurepass" placeholder="确认您的密码" type="password" v-if="btnType==1"  @keyup.enter.native="regestUser()" ></el-input>-->
                    <el-input v-model="userMima" placeholder="请设置密码" type="password"></el-input>
                    <el-input v-model="yqma" placeholder="（可不填）邀请码，可以增加5次免费下载" style="margin-bottom: 0"
                              class="yqma"></el-input>
                    <span style="color: #3d8fd1;margin-bottom: 20px;display: inline-block;" class="cu"
                          @click="dialogVisible=true">如何获取邀请码？</span>
                    <p>完成此注册，即表明您同意了我们的<span class="cu" @click="selfXy()">使用条款和隐私策略</span></p>

                </div>
                <el-button type="primary" @click="resetPass()"><!--Check your email to reset password-->注册</el-button>
                <p>已有账号，<span class="cu" @click="goLogin()">马上登录</span></p>
            </div>
        </div>
        <div class="successAfter" v-else>
            <i class="el-icon-success"></i>
            <p>您已成功设置密码</p>
            <el-button type="primary" @click="goLogin()">马上登录</el-button>
        </div>
        <el-dialog
                custom-class="Dlog"
                :close-on-click-modal="false"
                :visible.sync="dialogVisible"
                width="400px">
            <div class="Dcontent">
                <div class="title">如何获取邀请码</div><!--订阅计划-{{selectRadio2.creditsPerMonth}}能量/月-->
                <div class="price">您可以咨询您身边的朋友，还可以加我微信索取
                </div>
                <img src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200827/f6917493237e4f6ba158cedd4d8d414d.jpg" alt="" style="display: block;width: 135px;margin: 20px auto;">
                <p style="font-size: 14px;font-weight: bold;text-align: center;">扫一扫，添加微信好友咨询</p>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import headerSub from '@/components/header/index.vue'
    import sliderYz from '@/components/sliderYz/index.vue'
    import {userRegister, sendCode} from "../../apis";
    import {basrUrls, toRouter} from "../../utils";
    import Cookies from 'js-cookie';

    export default {
        name: 'login',
        data() {
            return {
                phone: '',
                userpass: '',
                basrUrls: basrUrls(),
                showCode: false,
                userMima: '',
                beforSet: true,
                timer: 0,
                yqma: '',
                dialogVisible: false
            }
        },
        computed: {},
        methods: {
            selfXy() {
                window.open( this.basrUrls + '/docsify/#/registerdoc_terms.md' )
            },
            goLogin() {
                window.location.replace( 'loginOrRegister.html' )
                // toRouter('loginOrRegister')
            },
            toShowCode(item) {
                this.showCode = false
                const data = {
                    mobile: this.phone,
                    image_code: item,
                }
                sendCode( data ).then( res => {
                    if (!res.code) {
                        this.$message( {type: 'success', message: '短信发送成功'} )
                        this.timer = 60;
                        let timer = setInterval( () => {
                            this.timer--
                            if (!this.timer) clearInterval( timer )
                        }, 1000 )
                    }
                } )
            },
            sendMobileCode() {
                if (this.timer) return;
                if (!this.phone || this.phone.length !== 11) {
                    this.$message( {type: 'error', message: '手机号格式不正确'} )
                    return
                }
                this.showCode = true
            },
            resetPass() {
                if (!this.phone || !this.userpass || !this.userMima) {
                    this.$message( {type: 'error', message: '内容不可为空'} )
                    return
                }
                if (this.phone.length !== 11) {
                    this.$message( {type: 'error', message: '手机号格式不正确'} )
                    return
                }
                // this.showCode=true
                let data = {
                    mobile: this.phone,
                    password: this.userMima,
                    validate_code: this.userpass,
                }
                const vsource = Cookies.get('vsource');
                if (vsource) data.vsource = vsource;
                else data.vsource = document.referrer;
                if (this.yqma) data.invitation = this.yqma;
                userRegister( data ).then( res => {
                    if (!res.code) {
                        this.beforSet = false
                    }
                } )
            }
        },
        components: {
            headerSub, sliderYz
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .register {
        padding-top: 115px;
        background-color: #f5f5f7;

        .userContent {
            background-color: #fff;
            width: 400px;
            padding: 38px 50px 80px;
            margin: 0 auto 0;
            border-radius: 10px;

            & > .el-button {
                display: block;
                width: 100%;
                background-color: #e82255;
                margin-top: 50px;
            }

            & > p {
                font-size: 14px;
                color: #333;
                margin-top: 50px;
                text-align: center;

                span {
                    color: #e82255;
                }
            }
        }

        .tag {
            font-size: 26px;
            color: #7a7a7a;
            text-align: center;
            margin-bottom: 60px;

            span {
                display: inline-block;
                line-height: 50px;
            }
        }

        .el-input {
            height: 46px;
            line-height: 46px;
            margin-bottom: 20px;

            &:last-child {
                margin-bottom: 45px;
            }
        }

        .userinfo > .el-input {
            height: 46px;
            line-height: 46px;
            margin-bottom: 20px;

            &:before {
                content: "*";
                color: #f56c6c;
                position: absolute;
                top: 0;
                left: -10px;
                margin-right: 4px;
            }

            &.yqma:before {
                content: '';
            }
        }

        .userinfo > p {
            font-size: 14px;
            color: #acacac;
            line-height: 1;
            margin-bottom: 20px;

            span {
                color: #e82255;
            }
        }

        .dxzz {
            margin-bottom: 20px;

            .el-input {
                margin-bottom: 0;

                &:before {
                    content: "*";
                    color: #f56c6c;
                    position: absolute;
                    top: 0;
                    left: -10px;
                    margin-right: 4px;
                }
            }

            .el-button {
                width: 35%;
                border-radius: 0;
                border-left: 0;
            }
        }
    }

    .successAfter {
        padding: 100px 65px 200px;
        background-color: #fff;
        width: 400px;
        position: relative;
        top: 115px;
        border-radius: 10px;
        text-align: center;
        margin: 0 auto;

        i {
            font-size: 60px;
            color: #e82255;
            margin-bottom: 35px;
        }

        p {
            font-size: 24px;
            color: #333;
            margin-bottom: 84px;
        }

        .el-button {
            display: block;
            width: 100%;
        }
    }

    .Dcontent {
        text-align: center;
        border-radius: 15px;

        .title {
            font-size: 20px;
            color: #333;
            margin-bottom: 10px;
        }

        img {
            display: block;
            margin: 0 auto;
        }

        .price {
            font-size: 12px;
            color: rgb(168, 168, 168);
            margin-bottom: 25px;
        }
    }
</style>
<style>
    .dxzz .el-input__inner {
        border-right: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    section .el-dialog {
        border-radius: 15px;
    }
</style>
