<template>
  <div class="Earn">
   赚取学分
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'

export default {
  name: 'Earn',
  data () {
    return {
      leftBtn:[
        {title:'我的订阅',},
        {title:'我的学分',},
        {title:'API密钥',},
        {title:'赚取学分',},
        {title:'历史记录',},
        {title:'账户设置',},
      ]
    }
  },
  computed:{

  },
  components:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
