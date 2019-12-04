<template>
    <div class="user flex">
        <header-sub @to-parses="Userinfos" />
        <div class="my clear margin">
            <div class="left">
                <div v-for="(item,index) in leftBtn" :key="index" :class="{'active' : $route.path==item.path}" @click="openType(item)">
                    {{item.title}}
                </div>
            </div>
            <div class="right">
                <router-view :userInfo="userInfo"></router-view>
            </div>
        </div>
        <footer-sub />
    </div>
</template>

<script>
    import headerSub from '@/components/header/index.vue'
    import footerSub from '@/components/footer/index.vue'
    export default {
        name: 'my',
        data () {
            return {
                leftBtn:[
                    {title:'我的账户',path:'/'},
                    // {title:'我的能量',path:'/userCenter/user-credit'},
                    {title:'API密钥',path:'/userCenter/secret'},
                    // {title:'赚取学分',path:'/userCenter/earn'},
                    {title:'邀请码',path:'/userCenter/invitation'},
                    {title:'账户设置',path:'/userCenter/set'},
                ],
                userInfo:{}
            }
        },
        computed:{

        },
        components:{
            headerSub,footerSub
        },
        methods:{
            openType(item){
                this.$router.replace(item.path)
            },
            Userinfos(val){
                this.userInfo=val
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .user{
        min-height: 100%;
        flex-direction: column;
        justify-content: space-between;
    }
    .my{
        padding-top: 87px;
        margin-bottom: 72px;
        .right{
            background-color: #fff;
            margin-left: 206px;
            padding:30px;
        }
        .left{
            float: left;
            background-color: #fff;
        }
        .left{
            margin-right: 16px;
            font-size: 16px;
            line-height: 50px;
            color: #333;
            padding: 16px 0;
            width: 190px;
            text-align: center;
            & > div.active{
                color: #e82255;
                background-color: #f7e7ea;
                border-left: 2px solid #e82255;
            }
            & > div{
                cursor: pointer;
            }
        }
    }
</style>
