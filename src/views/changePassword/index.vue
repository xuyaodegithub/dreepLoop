<template>
  <div class="login">
    <header-sub></header-sub>
    <div class="userContent">
      <div class="tag">
        <span>找回密码</span>
      </div>
      <div class="userinfo">
        <el-input v-model="username" placeholder="电子邮箱" ></el-input>
      </div>
      <el-button type="primary">查看邮件重置密码</el-button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import headerSub from '@/components/header/index.vue'
  export default {
    name: 'login',
    data () {
      return {
        loginBtn:['注册','登录'],
        username:'',
      }
    },
    computed:{

    },
    methods:{
      changeBtn(index){
        this.btnType=index
        this.username=''
        this.userpass=''
        this.usersurepass=''
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
      background-color: #29b2f6;
      border: none;
    }
  }
</style>
