<template>
    <header>
        <div class="margins flex j-b a-i first">
            <ul class="flex">
                <li><img src="../../assets/image/sureLogo.png" alt="" class="cu" @click="backindex()" style="width: 120px;height: 30px;"></li>
                <li class="cu" :class="{'red' : urls.indexOf('index')>-1 || urls.indexOf('/#/')>-1}" @click="backindex()">Portrait cut-out</li><!--智能抠图-->
                <li class="cu" :class="{'red' : urls.indexOf('product')>-1}" @click="toProduct()">More products</li>
                <li class="cu" :class="{'red' : urls.indexOf('aboutUs')>-1}" @click="toAbout()">About us</li><!--会员-->
                <!--            <li class="cu">登录</li>-->
            </ul>
            <div class="right">
                <div v-if="!loginAfter">
                    <span :class="{'red' : urls.indexOf('userVip')>-1}" @click="userCenter()">Pricing</span>
<!--                    <span @click="userlogin(1)">Sign In</span>&lt;!&ndash;登录&ndash;&gt;-->
                    <span @click="userlogin(0)" class="active">Login/Register</span><!--注册-->
                </div>
                <div class="cu" v-else>
                    <span :class="{'red' : urls.indexOf('userVip')>-1}" @click="userCenter()">Pricing</span>
                    <el-dropdown placement="bottom-end" @command="handleCommand">
                      <span class="el-dropdown-link" @click="toMyCount()">
                       {{userInfo.email}}
                      </span>
                      <el-dropdown-menu slot="dropdown">
                         <el-dropdown-item command="1">My Account</el-dropdown-item>
                         <el-dropdown-item command="0">Logout</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <!--      <div class="margin big">-->
        <!--        <p class="flex a-i">智能一键抠图神器<img src="static/images/free.png" alt=""></p>-->
        <!--        <p>1 0 0 % 自 动  -  5 秒  -  免 费 背 景 模 板</p>-->
        <!--      </div>-->
    </header>
</template>

<script>
    import { toRouter } from '@/utils'
    import {setToken, getToken, removeToken, clearCookie} from "../../utils/auth";
    import { getUserInfo } from "../../apis";
    import { basrUrls } from "../../utils";

    export default {
        name: "index",
        data(){
            return {
                loginAfter:false,
                userInfo:'',
                basrUrls:basrUrls(),
                navList:['index','product','aboutUs','userVip'],
                urls:window.location.href
            }
        },
        methods:{
            toApi(){
                window.location.href=this.basrUrls+'/docsify/#/test.md'
            },
            getUserinfo(){
                if(!getToken()) return
                getUserInfo().then(res=>{
                    if(!res.code){
                        this.userInfo=res.data
                        this.loginAfter=true
                        this.$emit('to-parses',res.data)
                    }else{
                        this.loginAfter=false
                        removeToken()
                        clearCookie('token')
                    }
                })
            },
             backindex(){
                 let url=window.location.href
                 if(url.indexOf('index') > -1) return;
                 else toRouter('index')
            },
            userlogin(key){
                let urls = window.location.href.split('#/')[0]
                let baseUrl = urls.substring(0,urls.lastIndexOf('/'))
                let url=window.location.href
                if(url.indexOf('login')>-1 || url.indexOf('Register')>-1) window.location.replace(baseUrl+'/loginOrRegister.html#/?type='+key)
                else window.location.href=baseUrl+'/loginOrRegister.html#/?type='+key
            },
            userCenter(){
                if(window.location.href.indexOf('userVip')>-1) return;
                toRouter('userVip')
            },
            toProduct(){
                if(window.location.href.indexOf('product')>-1) return;
                toRouter('product')
            },
            toAbout(){
                if(window.location.href.indexOf('aboutUs')>-1) return;
                toRouter('aboutUs')
            },
            handleCommand(ev){
                 let url=window.location.href
                 if( ev==1 && url.indexOf('userCenter') > -1 ) return;
                 if(ev==1) toRouter('userCenter')
                 else {
                     removeToken()
                     clearCookie('token')
                     // if(){}
                     toRouter('index')
                 }
            },
            toMyCount(){
                let url=window.location.href
                if(url.indexOf('userCenter') > -1 ) return
                toRouter('userCenter')
            }
        },
        mounted() {
            this.getUserinfo()
        }
    }
</script>

<style scoped lang="scss">
    .el-dropdown-link {
        cursor: pointer;
        color: #e82255;
    }
    header{
        z-index: 1100;
        position: fixed;
        top: 0;
        left: 0;
       box-shadow: 0 2px 2px rgba(0,0,0,0.06);
        font-size: 14px;
        color: #333;
        line-height:60px ;
        background-color: #fff;
        width: 100%;
        font-weight: 500;
        /*background: url("static/images/back.jpg") no-repeat center;*/
        .margins{
            padding: 0 30px 0;
        }
    }
    header li{
        margin: 0 40px;
        &.red{
            color: #e82255;
        }
    }
    header .right .red{
        color: #e82255;
    }
    header .right span{
        display: inline-block;
        padding: 0 15px;
        line-height: 32px;
        cursor:pointer;
    }
    header .right span.active{
        border: 1px solid #e82255;
        border-radius: 16px;
        margin-left: 10px;
        color: #e82255;
    }
    header li:first-child{
        margin-left: 0;
        margin-right: 65px;
    }
</style>
