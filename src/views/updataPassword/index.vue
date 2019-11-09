<template>
  <div class="login">
    <header-sub></header-sub>
    <div class="userContent">
      <div class="tag">
      <!-- Change password-->修改密码
      </div>
      <div class="userinfo">
        <el-input v-model="oldpass" placeholder="旧密码" v-if="!userToken" type="password"></el-input>
        <el-input v-model="newpass" placeholder="新密码" type="password" ></el-input>
        <el-input v-model="usersurepass" placeholder="重复新密码" type="password"></el-input>
      </div>
      <el-button type="primary" @click="regestUser()">确认</el-button>
    </div>
  </div>
</template>

<script>
  import headerSub from '@/components/header/index.vue'
  import { toRouter,basrUrls } from '@/utils'
  import { userResetPassword,userResetbyEmail } from "../../apis";

  export default {
    name: 'login',
    data () {
      return {
        btnType:this.$route.query.type,
        loginBtn:['Sign up','Login'],
        oldpass:'',
        newpass:'',
        usersurepass:'',
        basrUrl:basrUrls()
      }
    },
    mounted(){

    },
    computed:{
        userToken(){
          return this.$route.query.token
        }
    },
    watch:{

    },
    methods:{
      regestUser(){
        this.$message.closeAll()
        if(!this.userToken){
          if(!this.oldpass || !this.newpass || !this.usersurepass){
            this.$message({type:'warning',message:'密码不可为空'})
            return
          }
          if(this.newpass!==this.usersurepass){
            this.$message({type:'warning',message:'两次新密码不一致'})
            return
          }
          userResetPassword({oldPassword:this.oldpass,newPassword:this.newpass}).then(res=>{
            if(!res.code){
              this.$message({type:'warning',message:'密码已修改完成'})
              window.location.replace=`loginOrRegister.html#/`
            }
          })
        }else{
          if(!this.newpass || !this.usersurepass){
            this.$message({type:'warning',message:'密码不可为空'})
            return
          }
          if(this.newpass!==this.usersurepass){
            this.$message({type:'warning',message:'两次密码不一致'})
            return
          }
          userResetbyEmail({newPassword:this.newpass,token:this.userToken}).then(res=>{
            if(!res.code){
              this.$message({type:'warning',message:'密码已修改完成'})
              window.location.replace(`${this.basrUrl}/loginOrRegister.html#/?type=0`)
            }
          })
        }
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
      margin: 175px auto 0;
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
        color: #e82255;
        border-bottom: 2px solid #e82255;
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
      margin-bottom: 60px;
    }
    .forgot{
      font-size: 14px;
      /*color: #29b2f6;*/
      text-align: center;
      span {
        color: #e82255;
      }
    }
  }
</style>
