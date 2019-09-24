<template>
    <div class="Subscribe">
        <h3><!--Account Setting-->账户设置</h3>
        <h4><!--email-->手机号：{{userInfo.mobile}}</h4>
<!--        <p>密码：123456</p>-->
        <div class="btn">
            <el-button type="primary" round @click="changePass()"><!--Change password-->修改密码</el-button>
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
                padding: 0 15px;
                border-color:#e82255 ;
                color: #fff;
                background-color: #e82255;
                min-width: 120px;
            }
            .el-button+.el-button{
                margin: 0;
            }
        }
    }
</style>
