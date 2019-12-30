<template>
    <div class="login">
        <header-sub></header-sub>
        <div class="userContent">
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
                    <el-button type="primary" @click="sendMobileCode" v-show="btnType!=0">{{timer ? timer : '发送验证码'}}</el-button>
                </div>

                <!--                <el-input v-model="usersurepass" placeholder="确认您的密码" type="password" v-if="btnType==1"  @keyup.enter.native="regestUser()" ></el-input>-->
            </div>
            <div class="rember flex j-b a-i" v-if="btnType==0">
                <el-checkbox v-model="checked">记住我</el-checkbox>
                <span class="cu" @click="forgetPass()"><!--Forgot your password-->忘记密码?</span>
            </div>
            <el-button type="primary" @click="regestUser()">登录</el-button>
            <div class="forgot">
                还没有账号？ <span class="cu" @click="goRegister()">注册</span>
                <!--                <p v-else>&lt;!&ndash;By clicking the register buttion, you are agree with the&ndash;&gt;点击注册按钮，即表示您同意 <span class="cu" @click="selfXy()">&lt;!&ndash;Terms of Service, General Terms and Conditions and Privacy Policy&ndash;&gt;服务条款、一般条款和条件以及隐私政策</span></p>-->
            </div>
        </div>
    </div>
</template>

<script>
    import headerSub from '@/components/header/index.vue'
    import sliderYz from '@/components/sliderYz/index.vue'
    import {toRouter, basrUrls} from '@/utils'
    import {setToken, getToken, setCookie, getAccount, setAccount, reAccount} from "../../utils/auth";
    import {usercheckEmail, userLogin,loginByMobile,sendCode} from "../../apis";

    export default {
        name: 'login',
        data() {
            return {
                btnType: 0,
                loginBtn: ['密码登录', '短信登录'],
                username: '',
                userpass: '',
                basrUrl: basrUrls(),
                checked: true,
                showCode: false,
                timer:0
                // moveMsg:'请按住滑块拖动到最右边'
            }
        },
        computed: {
            passmsg() {
                if (this.btnType == 0) return '密码';
                else return '短信验证码'
            },
            typeBtn() {
                return this.$route.query.type;
            },
            hasBack() {
                return this.$route.query.hasback;
            },
        },
        methods: {
            changeBtn(index) {
                this.btnType = index;
                this.username = '';
                this.userpass = '';
                this.showCode = false
            },
            toShowCode(item) {
                this.showCode = false;
                const data={
                    mobile:this.username,
                    image_code:item,
                }
                sendCode(data).then(res=>{
                    if(!res.code){
                        this.$message( {type: 'success', message: '短信发送成功'} )
                        this.timer=60;
                        let timer=setInterval(()=>{
                            this.timer--
                            if(!this.timer)clearInterval(timer)
                        },1000)
                    }
                })
            },
            regestUser() {
                this.$message.closeAll()
                //登录
                    if (!this.username || !this.userpass) {
                        this.$message( {type: 'error', message: '信息不可为空'} );
                        return
                    }
                    if( !this.btnType){
                        userLogin( {username: this.username, password: this.userpass} ).then( res => {
                            if (!res.code) {
                                const data = {username: this.username, password: this.userpass};
                                this.checked ? setAccount( data ) : reAccount();
                                let token = res.data.token
                                setToken( token )
                                setCookie( 'token', token )
                                // setTimeout(()=>{
                                    if(window.history.length<3 || document.referrer.indexOf('register')>-1){window.location.replace('index.html')}
                                    else if (document.referrer.includes('docsify')) window.location.replace('docsify/#/apidoc_api.md')
                                    else window.location.replace(document.referrer)
                                // },10000)
                            }
                        } )
                    }else{
                        loginByMobile({mobile:this.username,validate_code:this.userpass}).then(res=>{
                            if (!res.code) {
                                let token = res.data.token
                                setToken( token )
                                setCookie( 'token', token )
                                // if (this.hasBack) window.history.go( -1 );
                                // else window.location.replace( `${this.basrUrl}/index.html#/` )
                                if(window.history.length<3 || document.referrer.indexOf('register')>-1){window.location.replace('index.html')}
                                else if (document.referrer.includes('docsify')) window.location.replace('docsify/#/apidoc_api.md')
                                else window.location.replace(document.referrer)
                            }
                        })
                    }
            },
            sendMobileCode(){
                if(this.timer)return;
                if (!this.username || this.username.length!==11) {
                    this.$message( {type: 'error', message: '手机号格式不正确'} )
                    return
                }
                this.showCode = true
            },
            forgetPass() {
                toRouter( 'changePass' )
            },
            goRegister() {
                window.location.replace('register.html')
            },
            initAccount() {
                const Account = getAccount();
                // console.log( Account );
                this.username = Account ? Account.username : '';
                this.userpass = Account ? Account.password : '';

            }
        },
        components: {
            headerSub, sliderYz
        },
        mounted() {
            this.initAccount()
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .login {
        background-color: #f5f5f7;

        .userContent {
            background-color: #fff;
            width: 400px;
            padding: 22px 50px 60px;
            margin: 175px auto 0;
            border-radius: 10px;

            & > .el-button {
                display: block;
                width: 100%;
                background-color: #e82255;
                border: none;
                margin: 50px 0 34px 0;
            }
        }

        .tag {
            font-size: 24px;
            color: #7a7a7a;
            text-align: center;
            margin-bottom: 54px;

            span {
                display: inline-block;
                cursor: pointer;
                margin: 0 30px;
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
            margin-bottom: 90px;

            span {
                color: #e82255;
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
