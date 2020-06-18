<template>
    <div class="pics">
        <h2>{{data.title}}</h2>
        <div class="des">{{data.des}}</div>
        <div class="pR">
            <moveSub :imgss="data.arrm"></moveSub>
        </div>
    </div>
</template>

<script>

    import moveSub from '../movesChunk'
    export default {
        name: "index",
        data(){
            return {

            }
        },
        props:{
            data:Object
        },
        computed:{

        },
        methods:{

        },
        components:{
            moveSub
        }
    }
</script>

<style scoped lang="scss">
 .pics{
     padding: 80px 0 84px;
     text-align: center;
     line-height: 1;
     background-color: #fff;
     margin-bottom: 20px;
     h2{
         font-size: 32px;
         font-weight: bold;
         line-height: 1;
         margin-bottom: 24px;
     }
     .des{
         font-size: 18px;
         margin-bottom: 52px;
         color: #646464;
     }
     .pR{
         width: 520px;
         margin: 0 auto;
     }
 }
</style>
