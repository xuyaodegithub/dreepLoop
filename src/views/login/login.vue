<template>
    <div class="login">
        <header-sub></header-sub>
        <div class="userContent">
            <div class="tag">
                <span v-for="(item,index) in loginBtn" :key="index" :class="{'active' : index==btnType}" @click="changeBtn(index)">{{item}}</span>
            </div>
            <div class="userinfo">
                <el-input v-model="username" placeholder="邮箱" ></el-input>
                <el-input v-model="userpass" :placeholder="passmsg" type="password" @keyup.enter.native="regestUser()" ></el-input>
                <el-input v-model="usersurepass" placeholder="确认您的密码" type="password" v-if="btnType==1"  @keyup.enter.native="regestUser()" ></el-input>
            </div>
            <el-button type="primary" @click="regestUser()">{{btnType == 0 ? '登录' : '注册'}}</el-button>
            <div class="forgot">
                <span class="cu"  v-if="btnType==0" @click="forgetPass()"><!--Forgot your password-->忘记密码?</span>
                <p v-else><!--By clicking the register buttion, you are agree with the-->点击注册按钮，即表示您同意 <span class="cu" @click="selfXy()"><!--Terms of Service, General Terms and Conditions and Privacy Policy-->服务条款、一般条款和条件以及隐私政策</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    import headerSub from '@/components/header/index.vue'
    import { toRouter,basrUrls } from '@/utils'
    import {setToken, getToken, setCookie} from "../../utils/auth";
    import { usercheckEmail,userLogin,userRegister } from "../../apis";
    export default {
        name: 'login',
        data () {
            return {
                btnType:this.$route.query.type,
                loginBtn:['登录','注册'],
                username:'',
                userpass:'',
                usersurepass:'',
                basrUrl:basrUrls()
            }
        },
        computed:{
            passmsg(){
                if(this.btnType == 0) return '密码';
                else return '密码(不少于6位)'
            },
            typeBtn(){
                return this.$route.query.type
            },
            hasBack(){
                return this.$route.query.hasBack
            },
        },
        watch:{
            $route(newVal,oldVal){
                this.username=''
                this.userpass=''
                this.usersurepass=''
                this.btnType=newVal.query.type
            }
        },
        methods:{
            changeBtn(index){
                // this.$message.closeAll()
                // this.$message({
                //     type:'success',
                //     message:'成功'
                // })
                this.btnType=index
                this.username=''
                this.userpass=''
                this.usersurepass=''
            },
            regestUser(){
                this.$message.closeAll()
                if(this.btnType==1){
                    if(!this.username || !this.userpass || !this.usersurepass){
                        // this.$message({type:'warning',message:'邮箱或密码不可为空'})
                        this.$message({type:'error',message:'邮箱或密码不可为空'})
                        return
                    }
                    if(this.userpass!==this.usersurepass){
                        // this.$message({type:'warning',message:'两次输入密码不一致'})
                        this.$message({type:'error',message:'密码不一致'})
                        return
                    }
                    usercheckEmail({email:this.username}).then(res=>{
                        if(!res.code) {
                            userRegister({email:this.username,password:this.userpass}).then(res=>{
                                if(!res.code){
                                    window.location.replace(`${this.basrUrl}/resBackMsg.html#/?type=0&email=${this.username}`)
                                }
                            })
                        }
                    })
                } else {
                    if(!this.username || !this.userpass){
                        // this.$message({type:'warning',message:'邮箱或密码不可为空'})
                        this.$message({type:'error',message:'邮箱或密码不可为空'});
                        return
                    }
                    userLogin({email:this.username,password:this.userpass}).then(res=>{
                        if(!res.code){
                            let token=res.data.token
                            setToken(token)
                            setCookie('token',token)
                            if(this.hasBack) window.history.go(-1);
                            else window.location.replace(`${this.basrUrl}/index.html#/`)
                        }
                    })
                }
            },
            forgetPass(){
                toRouter('changePass')
            },
            selfXy(){
                window.open(this.basrUrl+'/docsify/#/terms.md')
            }
        },
        components:{
            headerSub
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .login{
        background-color: #f5f5f7;
        .userContent{
            background-color: #fff;
            width: 400px;
            padding: 22px 50px 60px;
            margin: 175px auto 0;
            border-radius: 10px;
        }
        .tag{
            font-size: 24px;
            color: #7a7a7a;
            text-align: center;
            margin-bottom: 70px;
            span{
                display: inline-block;
                cursor: pointer;
                margin: 0 18px;
                line-height: 50px;
                height: 50px;
            }
            span.active{
                color: #e82255;
                border-bottom: 2px solid #e82255;
            }
        }
        .el-input{
            height: 46px;
            line-height: 46px;
            margin-bottom: 15px;
            &:last-child{
                margin-bottom: 45px;
            }
        }
        .el-button{
            display: block;
            width: 100%;
            background-color: #e82255;
            border: none;
            margin-bottom: 60px;
        }
        .forgot{
            font-size: 14px;
            /*color: #29b2f6;*/
            text-align: center;
            span {
                color: #e82255;
            }
        }
    }
</style>
