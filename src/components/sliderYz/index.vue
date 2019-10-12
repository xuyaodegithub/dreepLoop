<template>
    <div class="all" v-if="visible">
        <div class="title">
            请完成安全验证
            <i class="el-icon-close cu" @click="close()"></i>
        </div>
        <div class="ybutt">
            <div class="imgss" v-loading="loadings" element-loading-spinner="el-icon-loading"
                 element-loading-background="rgba(250, 250, 250, 0.8)">
                <img :style="{left:iLeft+5+'px'}" :class="{'addTr' : !openMoves}" :src="imgInfo.target"
                     alt="" class="is_small" @mousedown.prevent="downs">
                <i class="el-icon-refresh-right cu" @click="initImg"></i>
                <!--                <i class="el-icon-loading loadings" v-show="loadings"></i>-->
                <img :src="imgInfo.img"
                     alt="" class="is_big">
            </div>
            <div class="moveDom" ref="imgs">
                <p :style="{width:ws}" :class="{'addTr' : !openMoves,'s2' : status===1,'s3' : status===2,}"></p>
                <i class=" cu"
                   :class="{'addTr' : !openMoves, 'el-icon-check' : status===2,'el-icon-right' : !status,'el-icon-close' : status===1,'hovers' : openMoves}"
                   :style="{left:iLeft+'px'}" ref="movess" @mousedown.prevent="downs"></i>
                向右拖动滑块填充拼图
            </div>
        </div>
    </div>
</template>

<script>
    import {userGetCaptcha, userGetvalidate} from '@/apis'

    export default {
        name: "index",
        props:{
            visible:Boolean
        },
        data() {
            return {
                ws: 0,
                openMoves: false,
                iLeft: 0,
                initX: 0,
                status: 0,//状态 0未验证 1验证未通过 2验证通过
                imgInfo: {},
                loadings: true,
                oxtx: '',
            }
        },
        computed: {},
        watch: {
            status(newVal) {
                if (newVal === 1 || newVal === 2) {
                    setTimeout( () => {
                        this.status = 0;
                        this.iLeft = 0;
                        this.ws = 0;
                        this.initImg()
                        if(newVal === 2)this.$emit( 'success', this.imgInfo.id );
                    }, 500 )
                 }
            }
        },
        methods: {
            close(){
                this.$emit( 'update:visible', false );
            },
            initImg() {
                this.loadings = true;
                userGetCaptcha().then( res => {
                    if (!res.code) {
                        this.imgInfo = res.data
                        this.getImgMsg()
                    }
                    this.loadings = false
                } )
            },
            validateResult() {
                let data = {
                    id: this.imgInfo.id,
                    x: Math.ceil( (this.iLeft + 5) * this.oxtx / 340 )
                }
                userGetvalidate( data ).then( res => {
                    if (!res.code) {
                        // this.$message( {type: 'success', message: '验证成功'} )
                        this.status = 2;
                    } else this.status = 1
                } )
            },
            downs(e) {
                this.openMoves = true;
                this.initX = e.clientX - this.$refs.movess.getBoundingClientRect().left
            },
            moves(e) {
                if (!this.openMoves) return;
                const cBoxW = this.$refs.imgs.getBoundingClientRect().left;
                const l = e.clientX - cBoxW;
                if (l - this.initX >= this.$refs.imgs.offsetWidth - this.$refs.movess.offsetWidth) {
                    this.ws = '100%';
                    this.iLeft = this.$refs.imgs.offsetWidth - this.$refs.movess.offsetWidth;
                } else if ((l - this.initX) <= 0) {
                    this.ws = 0;
                    this.iLeft = 0;
                } else {
                    this.ws = (l - this.initX) / this.$refs.imgs.offsetWidth * 100 + '%';
                    this.iLeft = l - this.initX;
                }
            },
            ups(e) {
                if (!this.openMoves) return;
                this.openMoves = false;
                this.validateResult()
                // if(this.iLeft<this.$refs.imgs.offsetWidth-this.$refs.movess.offsetWidth){
                //     this.status= 1
                // }else if(this.iLeft===this.$refs.imgs.offsetWidth-this.$refs.movess.offsetWidth) this.status= 2
            },
            getImgMsg() {
                let oneImg = new Image();
                oneImg.src = this.imgInfo.img;
                oneImg.onload = () => {
                    this.oxtx = oneImg.width
                }
            }
        },
        mounted() {
            console.log(this.$listeners)
            this.initImg()
            window.addEventListener( 'mousemove', this.moves )
            window.addEventListener( 'mouseup', this.ups )
        },
        destroyed() {
            window.removeEventListener( 'mousemove', this.moves )
            window.removeEventListener( 'mouseup', this.ups )
        }
    }
</script>

<style scoped lang="scss">
    .all {
        z-index: 99;
        width: 400px;
        padding-bottom: 20px;
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, .3);
        margin: 0 auto;
        font-size: 16px;
        line-height: 50px;
        position: fixed;
        top: 150px;
        left: 50%;
        margin-left: -200px;

        .ybutt {
            padding: 0 30px;
        }

        .title {
            border-bottom: 1px solid #e4e7eb;
            margin-bottom: 15px;
            padding: 0 30px;

            i {
                position: absolute;
                top: 15px;
                right: 10px;
                font-size: 18px;
            }
        }

        .imgss {
            position: relative;
            margin-bottom: 15px;

            i.cu {
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 26px;
                color: #fff;
                text-shadow: 0 0 5px rgba(0, 0, 0, .5);
            }

            .loadings {
                position: absolute;
                top: 50%;
                left: 50%;
                margin: -25px 0 0px -25px;
                font-size: 36px;
                color: #fff;
            }

            .is_big {
                display: block;
                width: 100%;
            }

            .is_small {
                position: absolute;
                top: 0;
                left: 5px;
                height: 100%;
                /*box-shadow: 0 0 5px rgba(0,0,0,.3);*/
            }
        }
    }

    .addTr {
        transition: all .3s;
    }

    .moveDom {
        font-size: 12px;
        color: #45494c;
        background-color: #ebebeb;
        line-height: 40px;
        position: relative;
        text-align: center;

        i {
            text-align: center;
            position: absolute;
            left: 0;
            top: 0;
            font-size: 14px;
            line-height: 38px;
            width: 38px;
            border: 1px solid #cecece;
            background-color: #fff;

            &:hover {
                background-color: #1991fa;
                color: #fff;
            }

            &.el-icon-close:hover {
                background-color: #f57a7a;
            }

            &.el-icon-check:hover {
                background-color: #7ac23c;
            }

        }

        .el-icon-close, .s2 {
            background-color: #f57a7a;
        }

        .s2 {
            border-color: #f57a7a;
        }

        .el-icon-check, .s3 {
            background-color: #7ac23c;
            color: #fff;
        }

        .s3 {
            border-color: #7ac23c;
        }

        .hovers {
            background-color: #1991fa;
            color: #fff;
        }

        p {
            position: absolute;
            overflow: hidden;
            left: 0;
            top: 0;
            height: 38px;
            width: 0;
            background-color: skyblue;
            color: #fff;
            border: 1px solid #1991fa;
            border-right: 0;
        }
    }
</style>
