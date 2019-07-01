<template>
    <div>
        <header-sub></header-sub>
        <div class="my clear margin">
            <div class="left">
                <div v-for="(item,index) in leftBtn" :key="index" :class="{'active' : $route.path==item.path}" @click="openType(item)">
                    {{item.title}}
                </div>
            </div>
            <div class="right">
                <router-view></router-view>
            </div>
        </div>
        <footer-sub></footer-sub>
    </div>
</template>

<script>
    import headerSub from '@/components/header/index.vue'
    import footerSub from '@/components/footer/index.vue'
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'
    export default {
        name: 'my',
        data () {
            return {
                leftBtn:[
                    {title:'我的订阅',path:'/'},
                    {title:'我的学分',path:'/userCenter/user-credit'},
                    {title:'API密钥',path:'/userCenter/secret'},
                    {title:'赚取学分',path:'/userCenter/earn'},
                    {title:'历史记录',path:'/userCenter/history'},
                    {title:'账户设置',path:'/userCenter/set'},
                ]
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
