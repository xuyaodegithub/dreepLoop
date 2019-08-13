<template>
  <div class="login">
    <header-sub></header-sub>
    <div class="userContent">
      <div class="tag">
        <span><!--Reset password-->重置密码</span>
      </div>
      <div class="userinfo">
        <el-input v-model="username" placeholder="邮箱" ></el-input>
      </div>
      <el-button type="primary" @click="resetPass()"><!--Check your email to reset password-->检查您的电子邮件以重置密码</el-button>
    </div>
  </div>
</template>

<script>
  import headerSub from '@/components/header/index.vue'
  import { sendChangePasswordEmail } from "../../apis";
  import { basrUrls } from "../../utils";

  export default {
    name: 'login',
    data () {
      return {
        username:'',
        basrUrls:basrUrls()
      }
    },
    computed:{

    },
    methods:{
      resetPass(){
        this.$message.closeAll()
        if(!this.username){
          this.$message({type:'warning', message:'邮箱不可为空'})
          return
        }
        sendChangePasswordEmail({email:this.username}).then(res=>{
          if(!res.code){
            window.location.href=`${this.basrUrls}/resBackMsg.html#/?type=1&email=${this.username}`
          }
        })
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
      padding: 38px 50px 170px;
      margin: 115px auto 0;
      border-radius: 10px;
    }
    .tag{
      font-size: 26px;
      color: #7a7a7a;
      text-align: center;
      margin-bottom: 100px;
      span{
        display: inline-block;
        line-height: 50px;
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
    }
  }
</style>
