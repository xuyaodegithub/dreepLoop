<template>
    <div class="login">
        <div class="loginByWechat" v-if="!loginSetup">
            <h3 class="mb-50"><img style="vertical-align: top;"
                                   src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200901/8b073ccbf3c947e6886b2d7c4de617ef.png"
                                   alt="">微信扫码登录/注册</h3>
            <div class="ewm mb-20" v-loading="!qrCodeMsg.qrCodeSrc">
                <img :src="qrCodeMsg.qrCodeSrc"
                     alt="">
            </div>
            <p class="mb-15">扫码关注 “皮卡智能PicUP.AI公众号”完成登录/注册</p>
            <p class="mb-30">或 <span style="color: #e82255;" class="cu" @click="loginSetup=2">手机号注册</span></p>
            <div class="flex j-b pt-20 bt">
                <p>登录即表明您同意 <a href="servicePrivacy.html" target="_blank">用户协议和隐私策略</a></p>
                <span class="cu" @click="loginSetup=4">手机号登录 ></span>
            </div>
        </div>
        <div class="widthPhone" v-else-if="[2,3].includes(loginSetup)">
            <input-sub :title="subTitle" ref="phoneCode" @bindPhone="bindPhone"></input-sub>
            <div v-if="loginSetup===2" style="text-align: left;">
                <el-input v-model="newpass" placeholder="设置新密码" type="password" class="mt-15"></el-input>
                <el-input v-model="yqcode" placeholder="填写邀请码（选填）" class="mt-15"></el-input>
                <el-popover
                        placement="right"
                        trigger="click">
                    <div style="text-align: center;font-size: 12px;padding: 10px;">
                        <p>您可以咨询您身边的朋友，还可以加我微信索取</p>
                        <img style="width: 150px;margin: 15px 0;" src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200827/f6917493237e4f6ba158cedd4d8d414d.jpg" alt="">
                        <h4>扫一扫，添加微信好友咨询</h4>
                    </div>
                    <span style="display:inline-block;color: #21a9e8;margin: 10px  0;" class="cu"  slot="reference">如何获取邀请码</span>
                </el-popover>

                <p style="color: #999">注册即表明您同意 <a href="servicePrivacy.html" target="_blank" style="color: #333;">用户协议和隐私策略</a></p>
            </div>
            <el-button :class="loginSetup===2 ? 'mt-20' : 'mt-45'" type="primary" @click="bindPhone">{{btnName}}</el-button>
            <div class="flex mt-10 tebtnlist pb-15">
                <el-button  type="primary" @click="loginSetup = 0">微信扫码登录/注册</el-button>
                <el-button  type="primary" @click="loginSetup = 4" v-if="loginSetup===2">手机号登录</el-button>
            </div>
        </div>
        <div class="widthPhone" v-else-if="[5].includes(loginSetup)">
            <h3 class="mb-50">修改密码</h3>
            <el-input v-model="pass1" placeholder="新密码" type="password" class="mb-15"></el-input>
            <el-input v-model="pass2" placeholder="确认新密码" type="password"></el-input>
            <el-button class="mt-45" type="primary" @click="updatapass">{{btnName}}</el-button>
            <el-button class="mt-20 tebtn" type="primary" @click="loginSetup = 0">微信扫码登录/注册</el-button>
        </div>
        <div class="userContent" v-else-if="loginSetup===4">
            <div class="tag">
                <span v-for="(item,index) in loginBtn" :key="index" :class="{'active' : index==btnType}"
                      @click="changeBtn(index)">{{item}}</span>
            </div>
            <div class="userinfo">
                <el-input v-model="username" placeholder="手机号" type="number" :maxlength="11"></el-input>
                <sliderYz @success="toShowCode" :visible.sync="showCode"></sliderYz>
                <div class="flex dxzz a-i" :class="{'m-b' : btnType!=0}">
                    <el-input v-model="userpass" :placeholder="passmsg" :type="btnType==0? 'password' : 'number'"
                              @keyup.enter.native="regestUser()">
                    </el-input>
                    <el-button type="primary" @click="sendMobileCode" v-show="btnType!=0">{{timer ? timer : '发送验证码'}}
                    </el-button>
                </div>
            </div>
            <div class="rember flex j-b a-i" v-if="btnType==0">
                <el-checkbox v-model="checked">记住我</el-checkbox>
                <span class="cu" @click="loginSetup = 3"><!--Forgot your password-->忘记密码?</span>
            </div>
            <el-button class="mt-30" :class="{'mt-45' : btnType}" type="primary" @click="regestUser()">登录</el-button>
            <div class="flex mt-10 tebtnlist">
                <el-button  type="primary" @click="loginSetup = 0">微信扫码登录/注册</el-button>
                <el-button  type="primary" @click="loginSetup = 2" v-if="!btnType">手机号注册</el-button>
            </div>
        </div>
        <div v-else class="sixOld">
            <div><span>我是<br>新人</span></div>
            <el-button class="out" @click="showLoginDilogAction">直接跳过</el-button>
            <p>或</p>
            <div><span>我是<br>老客户</span></div>
            <el-button class="todo" type="primary" @click="loginSetup=2">立即绑定</el-button>
        </div>
    </div>
</template>

<script>
    import sliderYz from '@/components/sliderYz/index.vue'
    import inputSub from './inputSub.vue'
    import {setToken, setCookie, getAccount, setAccount, reAccount} from "../../utils/auth";
    import {userLogin, loginByMobile, sendCode, wechatCode, toSureWatch,userResetbyEmail,getResetPasswordToken,userRegister} from "../../apis";
    import Cookies from 'js-cookie';
    import {mapActions} from 'vuex'

    export default {
        name: 'login',
        data() {
            return {
                loginSetup: 0,//登录步骤 0扫码 1区分新老 2手机号注册 3找回密码 4密码登录  5修改密码 6区分新老
                btnType: 0,
                loginBtn: ['密码登录', '短信登录'],
                username: '',
                userpass: '',
                pass1: '',
                pass2: '',
                newpass:'',
                yqcode:'',
                checked: true,
                showCode: false,
                timer: 0,
                userToken: '',
                qrCodeMsg: {tempToken: '', qrCodeSrc: ''},
                timer2:null,
                findToken:''

                // moveMsg:'请按住滑块拖动到最右边'
            }
        },
        computed: {
            passmsg() {
                if (this.btnType == 0) return '密码';
                else return '短信验证码'
            },
            subTitle() {
                const a = ['', '', '手机号注册', '找回密码', '', '修改密码'];
                return a[this.loginSetup]
            },
            btnName() {
                const a = ['', '', '注册', '下一步', '', '确定'];
                return a[this.loginSetup]
            }
        },
        methods: {
            ...mapActions( ['showLoginDilogAction'] ),
            changeBtn(index) {
                this.btnType = index;
                this.username = '';
                this.userpass = '';
                this.showCode = false
            },
            toShowCode(item) {
                this.showCode = false;
                const data = {
                    mobile: this.username,
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
            regestUser() {
                this.$message.closeAll()
                //登录
                if (!this.username || !this.userpass) {
                    this.$message( {type: 'error', message: '信息不可为空'} );
                    return
                }
                if(this.username.length !== 11){
                    this.$message( {type: 'error', message: '手机号格式不正确'} );
                    return
                }
                if (!this.btnType) {
                    userLogin( {username: this.username, password: this.userpass} ).then( res => {
                        if (!res.code) {
                            const data = {username: this.username, password: this.userpass};
                            this.checked ? setAccount( data ) : reAccount();
                            let token = res.data.token;
                            setToken( token );
                            setCookie( 'token', token );
                            this.$emit('getUserinfo','')
                            this.showLoginDilogAction();
                            this.$message( {message: '登录成功', type: 'success'} );
                        }
                    } )
                } else {
                    let data = {mobile: this.username, validate_code: this.userpass},
                        vsource = Cookies.get( 'vsource' );
                    if (vsource) data.vsource = vsource;
                    else data.vsource = document.referrer;
                    loginByMobile( data ).then( res => {
                        if (!res.code) {
                            let token = res.data.token;
                            setToken( token );
                            setCookie( 'token', token );
                            // this.$emit( 'success', false );
                            this.$emit('getUserinfo','')
                            this.showLoginDilogAction();
                            this.$message( {message: '登录成功', type: 'success'} );
                        }
                    } )
                }
            },
            sendMobileCode() {
                if (this.timer) return;
                if (!this.username || this.username.length !== 11) {
                    this.$message( {type: 'error', message: '手机号格式不正确'} )
                    return
                }
                this.showCode = true
            },
            initAccount() {
                const Account = getAccount();
                // console.log( Account );
                this.username = Account ? Account.username : '';
                this.userpass = Account ? Account.password : '';
            },
            bindPhone() {//手机号绑定
                const parseMsg=this.$refs.phoneCode;
                if (this.loginSetup === 2) {//手机号注册
                    console.log( this.$refs.phoneCode.username, this.$refs.phoneCode.userpass, )
                    if (!parseMsg.username || !parseMsg.userpass || !this.newpass) {
                        this.$message( {type: 'error', message: '内容不可为空'} )
                        return
                    }
                    if (parseMsg.username.length !== 11) {
                        this.$message( {type: 'error', message: '手机号格式不正确'} )
                        return
                    }
                    // this.showCode=true
                    let data = {
                        mobile: parseMsg.username,
                        password: this.newpass,
                        validate_code: parseMsg.userpass,
                    }
                    const vsource = Cookies.get('vsource');
                    if (vsource) data.vsource = vsource;
                    else data.vsource = document.referrer;
                    if (this.yqcode) data.invitation = this.yqcode;
                    userRegister( data ).then( res => {
                        if (!res.code) {
                           this.$message({message:'注册成功',type:'success'})
                            this.loginSetup=4;
                        }
                    } )
                } else {//找回密码
                    if (!parseMsg.username || !parseMsg.userpass) {
                        this.$message( {type: 'warning', message: '信息不可为空'} )
                        return
                    }
                    if (parseMsg.username.length !== 11) {
                        this.$message( {type: 'warning', message: '手机号格式不正确'} )
                        return
                    }
                    const data = {
                        mobile: parseMsg.username,
                        validate_code: parseMsg.userpass
                    }
                    getResetPasswordToken( data ).then( res => {
                        if (!res.code) {
                            this.findToken=res.data;
                            this.loginSetup=5;
                        }
                    } )
                }
            },
            updatapass() {//修改密码
                if (!this.pass1 || !this.pass2) {
                    this.$message( {type: 'warning', message: '密码不可为空'} );
                    return
                }
                if (this.pass1 !== this.pass2) {
                    this.$message( {type: 'warning', message: '两次密码不一致'} );
                    return
                }
                userResetbyEmail( {newPassword: this.pass1, token: this.findToken} ).then( res => {
                    if (!res.code) {
                        this.$message( {type: 'success', message: '密码已修改完成'} );
                        this.loginSetup = 4;
                    }
                } )
            },
            initWechCode() {
                let vsource = Cookies.get( 'vsource' ), data = {};
                if (vsource) data.vsource = vsource;
                else data.vsource = document.referrer;
                wechatCode( data ).then( res => {
                    if (!res.code) {
                        this.qrCodeMsg = res.data;
                        this.timer2=setTimeout(this.getFollow,2000);
                    }
                } )
            },
            getFollow() {
                let data = {tempToken: this.qrCodeMsg.tempToken};
                toSureWatch( data ).then( res => {
                    if (res.data) {
                        const token = res.data.token;
                        console.log(token)
                        setToken( token );
                        setCookie( 'token', token );
                        this.$emit('getUserinfo','')
                        this.showLoginDilogAction();
                    }else this.timer2=setTimeout(this.getFollow,2000);
                } )
            }
        },
        components: {
            sliderYz, inputSub
        },
        mounted() {
            this.initAccount();
            this.initWechCode();
        },
        destroyed() {
            if(this.timer2)clearTimeout(this.timer2)
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .login {
        line-height: 1;
        background-color: #fff;
        border-radius: 5px;
        padding: 20px 30px;
        min-height: 370px;

        .tebtn {
            color: $co !important;
            background-color: #F3F3F3 !important;
            margin: 20px 0 0 0 !important;
            border: none;
        }
        .tebtnlist .el-button{
            background-color: #F3F3F3;
            color: $co;
            border-color: #fff;
            &:last-child{
                flex: 1;
            }
        }
        .loginByWechat, .widthPhone {
            line-height: 1;
            text-align: center;
            color: #333333;
            font-size: 14px;
            .bt{
                border-top: 1px solid #e5e5e5;
                color: #999;
                span{
                    color: $co;
                }
            }
            .ewm img {
                display: block;
                width: 200px;
                height: 200px;
                margin: 0 auto;
            }

            h3 {
                font-size: 28px;
                color: #333333;

                img {
                    margin-right: 8px;
                }
            }
        }

        .widthPhone .el-button {
            display: block;
            width: 100%;
        }

        .userContent {
            background-color: #fff;
            padding: 0 30px 20px;
            border-radius: 10px;

            & > .el-button {
                display: block;
                width: 100%;
                background-color: #e82255;
                border: none;
            }
        }

        .tag {
            font-size: 28px;
            color: #7a7a7a;
            text-align: center;
            margin-bottom: 54px;

            span {
                display: inline-block;
                cursor: pointer;
                margin: 0 15px;
                line-height: 50px;
                height: 50px;
            }

            span.active {
                color: #e82255;
                border-bottom: 2px solid #e82255;
            }
        }

        .userinfo > .el-input {
            height: 46px;
            line-height: 46px;
            margin-bottom: 15px;
        }

        .dxzz {
            margin-bottom: 15px;

            .el-button {
                border-radius: 0;
                border-left: 0;
            }
        }

        .rember {
            margin-bottom: 32px;

            & > span {
                color: #e82255;
            }
        }

        .forgot {
            font-size: 14px;
            /*color: #29b2f6;*/
            text-align: center;

            span {
                color: #e82255;
            }
        }

        .sixOld {
            font-size: 18px;
            color: #999999;
            text-align: center;
            line-height: 1;

            div {
                width: 80px;
                height: 80px;
                background-color: #F3F3F3;
                border-radius: 50%;
                margin: 20px auto;
                position: relative;

                span {
                    position: absolute;
                    white-space: nowrap;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
            }

            div:first-child {
                margin-top: 0;
            }

            .el-button {
                display: block;
                width: 290px;
                margin: 0 auto;
            }

            .out {
                color: $co;
                border-color: #e82255;
            }

            p {
                font-size: 12px;
                margin: 28px auto;
            }

        }
    }
</style>
<style>
    .m-b .el-input__inner {
        border-right: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
</style>
