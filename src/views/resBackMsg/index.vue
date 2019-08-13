<template>
  <div class="resBackMsg">
    <header-sub :userData="userInfo"></header-sub>
        <div class="margin" v-if="backType==0">
            <i class="el-icon-success"></i>
            <div class="msg"><!--Email has been sucessfully sent-->电子邮件已成功发送 </div>
            <p><!--The active link has been sent to your email-->激活链接已发送到您的电子邮件 {{emailStr}}, <!--please go and check it-->请去检查一下</p>
    <!--        <el-button type="primary" round>激活成功</el-button>-->
        </div>
         <div class="margin" v-else-if="backType==1">
              <i class="el-icon-success"></i>
              <div class="msg"><!--Email has been sucessfully sent-->电子邮件已成功发送</div>
              <p><!--You are retrieving your password, The reset link has been sent to your email-->您正在找回密码，重置链接已发送到您的电子邮件 {{emailStr}}, <!--please go and check it-->请去检查一下</p>
              <!--        <el-button type="primary" round>激活成功</el-button>-->
         </div>
    <!--      注册成功返回-->
         <div class="margin" v-else-if="backType==2">
              <i class="el-icon-success"></i>
              <div class="msg"><!--Welcome-->欢迎！</div>
              <p>{{backmsg}}</p>
              <!--        <el-button type="primary" round>激活成功</el-button>-->
         </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import headerSub from '@/components/header/index.vue'
  import { userActivationEmail } from "../../apis";
  import { setToken,setCookie } from "../../utils/auth";

  export default {
  name: 'resBackMsg',
  data () {
    return {
        backmsg:'激活中...',
        userInfo:{}
    }
  },
    mounted(){
        if(this.backType==2) this.regeistItem()
    },
  computed:{
    ...mapGetters([
    ]),
      backType(){
        return this.$route.query.type
      },
      emailStr(){
          return this.$route.query.email
      },
      userToken(){
          return this.$route.query.token
      }
  },
    methods:{
      regeistItem(){
          userActivationEmail({token:this.userToken}).then(res=>{
              if(!res.code){
                  this.backmsg='您现在是picup.ai的成员，可以使用更多的功能'
                  this.userInfo=res.data
                  let token=res.data.token
                  setToken(token)
                  setCookie('token',token)
              }else{
                  this.backmsg='激活失败，请重新注册'
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
.margin {
  text-align: center;
  padding-top: 250px;
  line-height: 1;
  i{
    font-size: 60px;
    color: #e82255;
    margin-bottom: 24px;
  }
  .msg{
    font-size: 28px;
    color: #333;
    margin-bottom: 22px;
  }
  p{
    font-size: 16px;
    color: #333;
    margin-bottom: 50px;
  }
  .el-button{
    height: 50px;
    width: 160px;
    color: #e82255;
    background-color: rgba(0,0,0,0);
    border-color: #e82255;
    border-radius: 25px;
    font-size: 16px;
  }
}

</style>
