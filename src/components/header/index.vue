<template>
    <header>
        <div class="margins flex j-b a-i first">
            <ul class="flex">
                <li><a href="index.html"><img src="../../assets/image/sureLogo.png" alt="" style="height: 30px;"></a>
                </li>
                <li class="cu" :class="{'red' : urls.indexOf('index')>-1 || urls.indexOf('/#/')>-1}">
                    <a href="index.html">首页</a></li><!--智能抠图-->
<!--                <li class="cu" :class="{'red' : urls.indexOf('transitionPage')>-1 }">-->
<!--                    <a href="transitionPage.html">一键抠图</a></li>&lt;!&ndash;智能抠图&ndash;&gt;-->
                <li class="cu hove" :class="{'redPS' : piliangList.findIndex(item=>urls.includes(item))>-1}">批量抠图 <i
                        class="el-icon-caret-bottom"></i>
                    <transition name="el-zoom-in-top">
                        <div class="link">
                            <a :href="item+'.html'" v-for="(item,idx) in piliangList" :key="idx"
                               :class="{'red' : urls.includes(item)}">{{nameList[idx]}}</a>
                        </div>
                    </transition>
                </li>
                <li class="cu hove" :class="{'redPS' : beauList.findIndex(item=>urls.includes(item))>-1}">美化修复 <i
                        class="el-icon-caret-bottom"></i>
                    <div class="link">
                        <a :href="item+'.html'" v-for="(item,idx) in beauList" :key="idx"
                           :class="{'red' : urls.includes(item)}">{{['去水印','一键美化','图片修复'][idx]}}</a>
                    </div>
                </li>
                <li class="cu hove" :class="{'redPS' : editList.findIndex(item=>urls.includes(item))>-1}">编辑器 <i
                        class="el-icon-caret-bottom"></i>
                    <transition name="el-zoom-in-top">
                        <div class="link">
                            <a :href="item+'.html'" v-for="(item,idx) in editList" :key="idx" :target="!idx ? '_blank' :''"
                               :class="{'red' : urls.includes(item)}">{{['自由编辑器','证件照编辑器','形象照编辑器','电商白底图'][idx]}}</a>
                        </div>
                    </transition>
                </li>
                <li class="cu"  :class="{'red' : urls.includes('videoMatting')}"><a href="videoMatting.html">视频抠图</a><img class="beta"
                        src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200903/0961ebc6bf6c406d8af72e975632bbf0.png" alt=""></li>
            </ul>
            <div class="right flex">
<!--                <div style="padding:0 15px;"><a href="https://mp.weixin.qq.com/s/AsVjcACbusdKXcheF_HHtw" target="_blank"><img src="../../assets/image/freeGet.gif" alt=""></a></div>-->
<!--                <div class="mobiles">手机端-->
<!--                    <i class="el-icon-caret-bottom"></i>-->
<!--                    <div>-->
<!--                        <img src="../../assets/image/wechatEwm.jpg" alt="" />-->
<!--                        <p>关注公众号送下载次数</p>-->
<!--                    </div>-->
<!--                </div>-->
                <div class="flex lastRight a-i">
                    <span :class="{'red' : urls.indexOf('downLoad')>-1}"><a href="downLoad.html">下载桌面端</a></span>
                    <a href="apis.html"><span>API</span></a><!--登录-->
                  <div class="cu hove" :class="{'redPS' : priceList.findIndex(item=>urls.includes(item))>-1}">定价 <i
                            class="el-icon-caret-bottom"></i>
                            <div class="link">
                               <a :href="item+'.html'" v-for="(item,idx) in priceList" :key="idx"
                                  :class="{'red' : urls.includes(item)}">{{['抠图定价','视频定价'][idx]}}</a>
                           </div>
                    </div>
<!--                   <span :class="{'red' : urls.indexOf('userVip')>-1}" @click="userCenter()">定价</span>-->
                    <span @click="userlogin(0)" class="active"  v-if="!loginAfter">登录/注册</span><!--注册-->
                    <el-dropdown placement="bottom-end" @command="handleCommand" v-else>
                      <span class="el-dropdown-link over" @click="toMyCount()" style="color:#e82255;max-width: 120px;vertical-align: middle;">
                       {{userInfo.userName || userInfo.mobile || userInfo.email}}
                      </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="1">我的账户</el-dropdown-item>
                            <el-dropdown-item command="0">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
        </div>
        <el-dialog
                :close-on-click-modal="false"
                destroy-on-close
                :modal-append-to-body="false"
                top="20vh"
                custom-class="loginDialog"
                width="420px"
                :before-close="showLoginDilogAction"
                :visible.sync="showLoginDilog">
            <login-dialog v-if="showLoginDilog" @getUserinfo="getUserinfo"></login-dialog>
        </el-dialog>
    </header>
</template>

<script>
    import {toRouter,setVsource} from '@/utils'
    import {setToken, getToken, removeToken, clearCookie} from "../../utils/auth";
    import {getUserInfo} from "../../apis";
    import loginDialog from '@/components/login_dialog/index2';
    import { mapGetters,mapActions } from 'vuex';
    import imagePhoto from "../../views/idPhoto/imagePhoto";

    export default {
        name: "index",
        props: {
            userData: {type: Object}
        },
        components:{
            loginDialog
        },
        data() {
            return {
                loginAfter: false,
                userInfo: '',
                navList: ['index', 'product', 'aboutUs', 'userVip'],
                urls: window.location.href,
                piliangList: ['currency', 'people', 'headCutout', 'objects','batchPhoto'],
                nameList: ['通用抠图', '人像抠图', '头像抠图', '物体抠图','批量证件照'],
                beauList: ['intelligentRepair','beautify', 'intelligentRepair'],
                editList: ['posterEditor','idPhoto','imagePhoto','onlineImage'],
                priceList: ['userVip','videoPrice'],
            }
        },
        computed:{
            ...mapGetters(['showLoginDilog'])
        },
        watch: {
            userData(newVal, oldVal) {
                if (newVal !== {}) {
                    this.userInfo = newVal;
                    this.loginAfter = true;
                    this.$emit( 'to-parses', newVal )
                }
            }
        },
        methods: {
            ...mapActions(['showLoginDilogAction']),
            getUserinfo() {
                if (!getToken()) return;
                getUserInfo().then( res => {
                    if (!res.code) {
                        this.userInfo = res.data;
                        this.loginAfter = true;
                        this.$emit( 'to-parses', res.data )
                    } else {
                        this.loginAfter = false
                        // removeToken()
                        // clearCookie('token')
                    }
                } )
            },
            userlogin(key) {
                this.showLoginDilogAction();
            },
            userCenter() {
                if (window.location.href.indexOf( 'userVip' ) > -1) return;
                toRouter( 'userVip' )
            },
            handleCommand(ev) {
                let url = window.location.href
                if (ev == 1 && url.indexOf( 'userCenter' ) > -1) return;
                if (ev == 1) toRouter( 'userCenter' )
                else {
                    removeToken()
                    clearCookie( 'token' )
                    // if(){}
                    toRouter( 'index' )
                }
            },
            toMyCount() {
                let url = window.location.href
                if (url.indexOf( 'userCenter' ) > -1) return
                toRouter( 'userCenter' )
            }
        },
        mounted() {
            setVsource();
            this.getUserinfo();
        }
    }
</script>

<style scoped lang="scss">
    .el-dropdown-link {
        cursor: pointer;
        color: #e82255;
    }

    header {
        z-index: 1100;
        position: fixed;
        top: 0;
        left: 0;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.06);
        font-size: 14px;
        color: #333;
        line-height: 60px;
        background-color: #fff;
        width: 100%;
        font-weight: 500;
        /*background: url("static/images/back.jpg") no-repeat center;*/
        .margins {
            padding: 0 30px 0;
        }
        .lastRight{
            .hove{
                padding: 0 15px;
                position: relative;
            }
           .redPS {
                color: #e82255;
            }
            .hove .link{
                transition: all .3s linear;
                display: none;
                text-align: center;
                position: absolute;
                left: 50%;
                bottom: 0;
                transform: translate(-50%,100%);
                background-color: #fff;
                border: 1px solid #eee;
                white-space: nowrap;
                a {
                    padding: 0 15px;
                    display: block;
                    line-height: 40px;
                }
                a:hover{
                    color: #e82255;
                    background-color: #F9EDEF;
                }
            }
            .hove:hover .link{
                display: block;
            }
            .hove:hover i {
                display: inline-block;
                transform: rotateZ(180deg);
            }
        }
    }

    header li {
        margin: 0 15px;
        position: relative;
        .beta{
            position: absolute;
            top: 50%;
            right: -5px;
            transform: translate(100%,-100%);
        }
        a {
            display: block;
            color: #333;
        }

        &.reds a {
            color: $to;
        }

        &.redss a {
            color: $be;
        }

        &.redH a {
            color: $head;
        }

        &.redP a {
            color: $pic;
        }

        &.red {
            color: #e82255;

            a {
                color: #e82255;
            }
        }

        &.redPS {
            color: #e82255;
        }

        .red, .link a:hover {
            color: #e82255;
            background-color: #F9EDEF;
        }

        &.hove:hover .link {
            display: block;
        }

        &.hove:hover i {
            display: inline-block;
            transform: rotateZ(180deg);
        }

        .link {
            transition: all .3s linear;
            display: none;
            text-align: center;
            position: absolute;
            left: -15px;
            bottom: 0;
            transform: translateY(100%);
            background-color: #fff;
            border: 1px solid #eee;
            white-space: nowrap;
            a {
                padding: 0 15px;
                display: block;
                line-height: 40px;
            }
        }
    }
    header .right {
        a,span{
            color: #333;
        }
    }
    header .right .red {
        color: #e82255;

        a {
            color: #e82255;
        }
    }

    header .right span {
        display: inline-block;
        padding: 0 15px;
        line-height: 32px;
        cursor: pointer;
    }

    header .right span.active {
        border: 1px solid #e82255;
        border-radius: 16px;
        margin-left: 10px;
        color: #e82255;
    }

    header li:first-child {
        margin-left: 0;
        margin-right: 65px;
    }

    header .right .mobiles {
        cursor: pointer;
        position: relative;
        padding: 0 15px;
        color: #333;
        &:hover{
            div{
                display: block;
            }
            i{
                display: inline-block;
                transform: rotateZ(180deg);
            }
        }
        & > div {
            display: none;
            background-color: #fff;
            left: 50%;
            bottom: 0;
            transform: translate(-50%,100%);
            position: absolute;
            width: 120px;
            padding: 15px;
            border: 1px solid #eee;
            line-height: 1;
            font-size: 12px;
            color: $co;
            text-align: center;

            img {
                display: block;
                width: 100%;
                margin-bottom: 10px;
            }
        }
    }
</style>
