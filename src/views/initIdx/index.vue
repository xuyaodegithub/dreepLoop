<template>
  <section>
    <header-sub></header-sub>
    <div class="flex">
      <move-chunk :imgss="arrm"></move-chunk>
      <move-chunk :imgss="arrm1"></move-chunk>
      <move-chunk :imgss="arrm2"></move-chunk>
      <move-chunk :imgss="arrm3"></move-chunk>
      <move-chunk :imgss="arrm4"></move-chunk>
      <move-chunk :imgss="arrm5"></move-chunk>
      <move-chunk :imgss="arrm6"></move-chunk>
      <move-chunk :imgss="arrm7"></move-chunk>
      <move-chunk :imgss="arrm8"></move-chunk>
      <move-chunk :imgss="arrm9"></move-chunk>
      <move-chunk :imgss="arrm10"></move-chunk>
      <move-chunk :imgss="arrm11"></move-chunk>
      <move-chunk :imgss="arrm12"></move-chunk>
      <move-chunk :imgss="arrm13"></move-chunk>
    </div>
  </section>
</template>

<script>
  import m1 from '@/assets/image/move1.png'
  import m2 from '@/assets/image/move2.png'
  import m3 from '@/assets/image/move3.png'
  import m4 from '@/assets/image/move4.png'
  import m5 from '@/assets/image/move5.png'
  import m6 from '@/assets/image/move6.png'
  import m7 from '@/assets/image/move7.png'
  import m8 from '@/assets/image/move8.png'
  import m9 from '@/assets/image/move9.png'
  import m10 from '@/assets/image/move10.png'
  import m11 from '@/assets/image/move11.png'
  import m12 from '@/assets/image/move12.png'
  import m13 from '@/assets/image/move13.png'
  import m14 from '@/assets/image/move14.png'
  import m15 from '@/assets/image/move15.png'
  import m16 from '@/assets/image/move16.png'
  import m17 from '@/assets/image/move17.png'
  import m18 from '@/assets/image/move18.png'
  import m19 from '@/assets/image/move19.png'
  import m20 from '@/assets/image/move20.png'
  import m21 from '@/assets/image/move21.png'
  import m22 from '@/assets/image/move22.png'
  import m23 from '@/assets/image/move23.png'
  import m24 from '@/assets/image/move24.png'
  import m25 from '@/assets/image/move25.png'
  import m26 from '@/assets/image/move26.png'
  import m27 from '@/assets/image/move27.png'
  import m28 from '@/assets/image/move28.png'
  import headerSub from '@/components/header/index.vue'
  import MoveChunk from '@/components/movesChunk/index.vue'
  export default {
    name: 'index',
    data () {
      return {
        arrm:[m1,m2,'',''],
        arrm1:[m3,m4,'',''],
        arrm2:[m5,m6,'',''],
        arrm3:[m7,m8,'',''],
        arrm4:[m9,m10,'',''],
        arrm5:[m11,m12,'',''],
        arrm6:[m13,m14,'',''],
        arrm7:[m15,m16,'',''],
        arrm8:[m17,m18,'',''],
        arrm9:[m19,m20,'',''],
        arrm10:[m21,m22,'',''],
        arrm11:[m23,m24,'',''],
        arrm12:[m25,m26,'',''],
        arrm13:[m27,m28,'',''],
      }
    },
    computed:{

    },
    methods:{

    },
    components:{
      headerSub,MoveChunk,
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.flex{
  flex-wrap: wrap;
  justify-content: center;
  & > div{
    margin:0 20px 20px 0;
  }
}
</style>
