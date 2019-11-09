<template>
    <div class="login">
        <header-sub></header-sub>
        <div class="userContent">
            <div class="tag">
                <span><!--Reset password-->找回密码</span>
            </div>
            <div class="userinfo">
                <el-input v-model="phone" placeholder="手机号" type="number" :maxlength="11"></el-input>
                <sliderYz @success="toShowCode" :visible.sync="showCode"></sliderYz>
                <div class="flex dxzz a-i">
                    <el-input v-model="code" placeholder="短信验证码" type="number">
                    </el-input>
                    <el-button type="primary" @click="sendMobileCode">发送验证码</el-button>
                </div>

                <!--                <el-input v-model="usersurepass" placeholder="确认您的密码" type="password" v-if="btnType==1"  @keyup.enter.native="regestUser()" ></el-input>-->
            </div>
            <el-button type="primary" @click="resetPass()"><!--Check your email to reset password-->下一步</el-button>
        </div>
    </div>
</template>

<script>
    import headerSub from '@/components/header/index.vue'
    import sliderYz from '@/components/sliderYz/index.vue'
    import {sendChangePasswordEmail, sendCode, getResetPasswordToken} from "../../apis";
    import {basrUrls} from "../../utils";

    export default {
        name: 'login',
        data() {
            return {
                phone: '',
                code: '',
                basrUrls: basrUrls(),
                showCode: false
            }
        },
        computed: {},
        methods: {
            sendMobileCode() {
                if (!this.phone || this.phone.length !== 11) {
                    this.$message( {type: 'error', message: '手机号格式不正确'} )
                    return
                }
                this.showCode = true;
            },
            resetPass() {
                // this.showCode=true;
                if (!this.phone || !this.code) {
                    Toast( '信息不可为空' )
                    return
                }
                if (this.phone.length !== 11) {
                    Toast( '手机号格式不正确' )
                    return
                }
                const data = {
                    mobile: this.phone,
                    validate_code: this.code
                }
                getResetPasswordToken( data ).then( res => {
                    if (!res.code) {
                        window.location.href = `${this.basrUrls}/updataPass.html#/?token=${res.data}`
                    }
                } )
            },
            toShowCode(item) {
                this.showCode = false;
                const data = {
                    mobile: this.phone,
                    image_code: item,
                }
                sendCode( data ).then( res => {
                    if (!res.code) {
                        this.$message( {type: 'success', message: '短信发送成功'} )
                    }
                } )
                // window.location.href=`${this.basrUrls}/updataPass.html#/?token=a9daaea9c9e24fc5b8f5ea6ec3ed196b`
            }
        },
        components: {
            headerSub, sliderYz
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
            padding: 38px 50px 170px;
            margin: 115px auto 0;
            border-radius: 10px;

            & > .el-button {
                display: block;
                width: 100%;
                background-color: #e82255;
                margin-top: 50px;
            }
        }

        .tag {
            font-size: 26px;
            color: #7a7a7a;
            text-align: center;
            margin-bottom: 70px;

            span {
                display: inline-block;
                line-height: 50px;
            }
        }

        .el-input {
            height: 46px;
            line-height: 46px;
            margin-bottom: 15px;

            &:last-child {
                margin-bottom: 45px;
            }
        }

        .userinfo > .el-input {
            height: 46px;
            line-height: 46px;
            margin-bottom: 15px;
        }

        .dxzz {
            margin-bottom: 15px;

            .el-input {
                margin-bottom: 0;
            }

            .el-button {
                width: 35%;
                border-radius: 0;
                border-left: 0;
            }
        }
    }

</style>
<style>
    .dxzz .el-input__inner {
        border-right: 0;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }
</style>
