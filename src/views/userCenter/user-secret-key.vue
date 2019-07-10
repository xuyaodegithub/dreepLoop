<template>
    <div class="Subscribe">
        <h3>API密钥</h3>
        <div class="flex">
            <p>{{ApiMsg}}</p>
            <i class="el-icon-refresh-right" @click="refreshApikey()"></i>
        </div>
        <div class="btn">
<!--            <el-button type="primary" round>上传图片</el-button>-->
            <el-button type="primary" round @click="toApi()">阅读API文档</el-button>
        </div>
    </div>
</template>

<script>
   import { userApikey, userRefreshApikey } from "../../apis";
    import { basrUrls } from "../../utils";

   export default {
        name: 'Subscribe',
        data () {
            return {
                ApiMsg:'',
                basrUrls:basrUrls()
            }
        },
        computed:{
        },
        components:{
        },
       methods:{
            getApiKey(){
                userApikey().then(res=>{
                    if(!res.code){
                        this.ApiMsg=res.data
                    }
                })
            },
          refreshApikey(){
              userRefreshApikey().then(res=>{
                  if(!res.code){
                      this.ApiMsg=res.data
                  }
              })
          },
           toApi(){
               window.location.href=this.basrUrls+'/docsify/#/test.md'
           }
       },
       mounted() {
            this.getApiKey()
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
            margin-bottom: 30px;
            font-weight: 500;
        }
      .flex{
          font-size: 20px;
          line-height: 34px;
          align-items: center;
          p{
              padding: 0 20px;
              background-color: #faf1f4;
              margin-right: 18px;
              color: #d45f4b;
          }
          i{
              font-size: 24px;
              cursor: pointer;
          }
      }
        .btn{
            margin-top: 70px;
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
            /*.el-button:last-child{*/
            /*    background-color: #fff;*/
            /*    color: #27adf6;*/
            /*}*/
            .el-button+.el-button{
                margin: 0;
            }
        }

    }
</style>
