<template>
<!--    图片滑块组件-->
    <div>
        <div class="relative" ref="imgs"  @mousedown.prevent="downs" @mousemove.prevent="moves" @mouseup="ups" @mouseleave.prevent="openMoves=false">
            <div class="posi" :style="{width:ws}"><img :src="imgss[0]" alt=""></div>
            <img :src="imgss[1]" alt="">
            <img src="../../assets/image/moveW.png" alt="" class="move cu" :style="{left:ws}">
        </div>
        <div class="flex j-b" v-if="imgss.length>2">
            <p>{{imgss[2]}}</p>
            <p>{{imgss[3]}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        props:{
            imgss:{type:Array}
        },
        data(){
            return {
                openMoves:false,
                ws:'50%',
            }
        },
        methods:{
            downs(e){
                this.openMoves=true
                this.moves(e)
            },
            moves(e){
                // e.preventDefault()
                if(!this.openMoves) return;
                let cBoxW=this.$refs.imgs.getBoundingClientRect().left;//对比offset 的方向值需要考虑到父级，如果父级是定位元素，那么子元素的offset值相对于父元素，如果父元素不是定位元素，那么子元素的offset值相对于 可视区窗口。getBoundingClientRect() 的值只相对于可视去窗口。
                let l=e.clientX-cBoxW;
                if(l>=this.$refs.imgs.offsetWidth)this.ws='100%';
                else if(l<0)this.ws=0;
                else this.ws= l/this.$refs.imgs.offsetWidth*100+'%';
            },
            ups(e){
                this.openMoves=false;
            },
        },
        mounted() {

        }
    }
</script>

<style scoped lang="scss">
    .relative{
        position: relative;
        .posi{
            position: absolute;
            left: 0;
            top: 0;
            width: 50%;
            overflow: hidden;
        }
        .move{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
        .move:hover{
            cursor:w-resize
        }
    }
    .flex{
        font-size: 12px;
        color: #333;
        line-height: 40px;
        text-align: center;
        p{
            flex: 1;
        }
    }
</style>
