<template>
    <div>
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
                    {title:'My Subscription',path:'/'},
                    // {title:'我的能量',path:'/userCenter/user-credit'},
                    {title:'API Key',path:'/userCenter/secret'},
                    // {title:'赚取学分',path:'/userCenter/earn'},
                    // {title:'历史记录',path:'/userCenter/history'},
                    {title:'Account Setting',path:'/userCenter/set'},
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
                this.$router.push(item.path)
            },
            Userinfos(val){
                this.userInfo=val
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .my{
        margin-top: 27px;
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
                color: #23b0e8;
                background-color: #e0f2fc;
                border-left: 2px solid #25b0f3;
            }
            & > div{
                cursor: pointer;
            }
        }
    }
</style>
