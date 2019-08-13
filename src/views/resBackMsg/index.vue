<template>
  <div class="resBackMsg">
    <header-sub :userData="userInfo"></header-sub>
        <div class="margin" v-if="backType==0">
            <i class="el-icon-success"></i>
            <div class="msg">Email has been sucessfully sent </div>
            <p>The active link has been sent to your email {{emailStr}}, please go and check it</p>
    <!--        <el-button type="primary" round>激活成功</el-button>-->
        </div>
         <div class="margin" v-else-if="backType==1">
              <i class="el-icon-success"></i>
              <div class="msg">Email has been sucessfully sent</div>
              <p>You are retrieving your password, The reset link has been sent to your email {{emailStr}}, please go and check it</p>
              <!--        <el-button type="primary" round>激活成功</el-button>-->
         </div>
    <!--      注册成功返回-->
         <div class="margin" v-else-if="backType==2">
              <i class="el-icon-success"></i>
              <div class="msg">Welcome</div>
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
        backmsg:'Activating...',
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
                  this.backmsg='You are now a member of picup.ai, you are be able to use more functions'
                  this.userInfo=res.data
                  let token=res.data.token
                  setToken(token)
                  setCookie('token',token)
              }else{
                  this.backmsg='Activation failed, please re-register'
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
