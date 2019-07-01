<template>
    <div class="login">
        <header-sub></header-sub>
        <div class="userContent">
            <div class="tag">
                <span v-for="(item,index) in loginBtn" :key="index" :class="{'active' : index==btnType}" @click="changeBtn(index)">{{item}}</span>
            </div>
            <div class="userinfo">
                <el-input v-model="username" placeholder="电子邮箱" ></el-input>
                <el-input v-model="userpass" :placeholder="passmsg" type="password" ></el-input>
                <el-input v-model="usersurepass" placeholder="确认密码" type="password" v-if="btnType==0"></el-input>
            </div>
            <el-button type="primary" @click="regestUser()">{{btnType == 0 ? '注册' : '登录'}}</el-button>
            <div class="forgot">
                <span class="cu"  v-if="btnType==1" @click="forgetPass()">忘记密码</span>
                <p v-else>完成此注册,即表明您同意了我们的<span class="cu">使用条款和隐私策略</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    import headerSub from '@/components/header/index.vue'
    import { toRouter } from '@/utils'
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'
    export default {
        name: 'login',
        data () {
            return {
                btnType:this.$route.query.type,
                loginBtn:['注册','登录'],
                username:'',
                userpass:'',
                usersurepass:''
            }
        },
        computed:{
            passmsg(){
                if(this.btnType == 1) return '密码';
                else return '密码(最少6个字符)'
            },
            typeBtn(){
                return this.$route.query.type
            }
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
                if(this.btnType==0) toRouter('resBackMsg')
            },
            forgetPass(){
                toRouter('changePass')
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
            margin: 115px auto 0;
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
                color: #0aa5f7;
                border-bottom: 2px solid #0aa5f7;
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
            background-color: #29b2f6;
            border: none;
            margin-bottom: 60px;
        }
        .forgot{
            font-size: 14px;
            /*color: #29b2f6;*/
            text-align: center;
            span {
                color: #3cb2e0;
            }
        }
    }
</style>
