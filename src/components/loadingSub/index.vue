<template>
    <div class="loadingSub">
        <div>
            <h4>{{text}}</h4>
            <el-progress  type="circle" :percentage="time" :color="color"></el-progress>
        </div>
    </div>
</template>

<script>

    export default {
        name: "index",
        data() {
            return {
                time: 0,
                initval: ''
            }
        },
        props: {
            text: String,
            color:String
        },
        mounted() {
            this.initTime()
        },
        destroyed(){
            clearInterval( this.initval )
        },
        computed: {},
        methods: {
            initTime() {
                this.initval = setInterval( () => {
                    if (this.time >= 99) {
                        clearInterval( this.initval )
                    } else this.time += 1;
                }, 150 )
            }
        },
        components: {}
    }
</script>

<style scoped lang="scss">
    .loadingSub {
        border-radius: 15px;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.4);
        left: 0;
        top:0;
        color: #fff;
        z-index:1088;
        text-shadow: 0 0 5px #000;
        text-align: center;
        font-size: 16px;
        & > div{
            position: absolute;
            left:50%;
            top: 50%;
            transform: translate(-50%,-50%);
        }
        .el-progress{
            margin: 25px auto;
        }

    }
</style>
