<template>
    <div class="Subscribe">
        <h3>账户设置</h3>
        <h4>电子邮箱：{{userInfo.email}}</h4>
<!--        <p>密码：123456</p>-->
        <div class="btn">
            <el-button type="primary" round @click="changePass()">更改密码</el-button>
        </div>
    </div>
</template>

<script>
   import { basrUrls,toRouter } from "../../utils";
   export default {
       props:{
           userInfo:{
               type:Object
           }
       },
        name: 'set',
        data () {
            return {
                basrUrls:basrUrls()
            }
        },
        computed:{

        },
        components:{

        },
        methods:{
            changePass(){
                toRouter('updataPass')
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .Subscribe{
        min-height: 500px;
        h3{
            font-size: 28px;
            color: #333;
            margin-bottom: 38px;
            font-weight: 500;
        }
        h4{
            font-size: 16px;
            color: #333;
            margin-bottom: 14px;
        }
        & > p{
            font-size: 12px;
            color: #b1b1b1;
        }
        .btn{
            margin-top: 58px;
            /*margin-bottom: 56px;*/
            .el-button{
                margin-right: 12px;
                font-size: 14px;
                line-height: 40px;
                padding: 0;
                border-color:#27adf6 ;
                color: #fff;
                background-color: #27adf6;
                width: 120px;
            }
            .el-button+.el-button{
                margin: 0;
            }
        }
    }
</style>
