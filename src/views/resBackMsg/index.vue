<template>
  <div class="resBackMsg">
    <header-sub></header-sub>
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
              <p>You are now a member of picup.ai, you are be able to use more functions</p>
              <!--        <el-button type="primary" round>激活成功</el-button>-->
         </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import headerSub from '@/components/header/index.vue'

export default {
  name: 'resBackMsg',
  data () {
    return {

    }
  },
  computed:{
    ...mapGetters([
    ]),
      backType(){
        return this.$route.query.type
      },
      emailStr(){
          return this.$route.query.email
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
  padding-top: 190px;
  line-height: 1;
  i{
    font-size: 60px;
    color: #27adf6;
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
    color: #4dace4;
    background-color: rgba(0,0,0,0);
    border-color: #4dace4;
    border-radius: 25px;
    font-size: 16px;
  }
}

</style>
