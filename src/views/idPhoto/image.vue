<template>
    <div class="helloFirst">
        <header-sub></header-sub>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    import headerSub from '@/components/header/index.vue'
    import {getToken, getSecImgs, setSecImgs} from "../../utils/auth";

    export default {
        name: 'HelloWorld',
        data() {
            return {

            }
        },
        filters: {

        },
        watch: {},
        mounted() {

            // $('.hisimgs').niceScroll({cursorcolor :'#999999',boxzoom:true});
        },
        destroyed() {
        },
        computed: {
            ...mapGetters( [] ),
        },
        components: {
            headerSub,
        },
        methods: {
            ...mapActions( [
                'userGetscribe'
            ] ),

        },
        created() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .helloFirst {
        background-color: #f5f5f6;
        .apps.tactive {
            padding-right: 85px;
        }

        .Operator {
            line-height: 1;
            color: #333;
            width: 244px;
            background-color: #fff;
            font-size: 14px;
            height: 100%;
            position: fixed;
            left: 0;
            top: 60px;
            z-index: 1001;

            .el-button {
                border-radius: 0;
                width: 160px;
                height: 40px;
                background-color: #e82255;
                color: #fff;
                border-color: #e82255;
                margin: 34px 0 14px 42px;
            }

            .bottonLast {
                padding: 30px 0 30px 34px;
                font-size: 14px;
                /*font-weight: 600;*/
                flex-direction: column;
                justify-content: space-between;

                .flex img {
                    margin-right: 10px;
                }

                & > div:first-child {
                    margin-bottom: 30px;
                }

                & > div:nth-child(2) {
                    /*margin-bottom: 376px;*/
                }

                h5 {
                    margin-bottom: 24px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #666;
                }

                .fixedB {
                    position: absolute;
                    left: 34px;
                    bottom: 100px;

                    .flex {
                        position: relative;
                        margin-bottom: 15px;

                        &:hover .noC {
                            display: block;
                        }

                        .noC {
                            position: absolute;
                            bottom: 0;
                            right: -116px;
                            display: none;
                        }
                    }

                    a {
                        color: #333;
                    }
                }
            }

            .diops {
                text-align: center;
                font-size: 12px;
                margin-bottom: 24px;

                img {
                    margin-right: 10px;
                }
            }

            h4 {
                line-height: 1;
                font-size: 14px;
                color: #333;
                margin-bottom: 20px;
                /*text-align: center;*/
                padding: 0 30px;
            }

            .photoHisList {
                overflow: auto;
                justify-content: center;
                flex-wrap: wrap;

                .itmes {
                    cursor: pointer;
                    margin: 0 8px 8px 0;
                    width: 88px;
                    height: auto;

                    img {
                        display: block;
                        width: 100%;
                    }
                }
            }
        }

        .OperatorRight {
            margin: 76px 0 0 260px;
            flex: 1;
            padding: 40px 0 40px 50px;
            background-color: #fff;
            .sizeClass{
                font-size: 34px;
                color: #333;
                font-weight: bold;
                .el-input{
                    width: 400px;
                    margin-left: 60px;
                }
            }
           & > label{
                position: relative;
                text-indent: 1em;
                display: block;
                margin-top: 42px;
                font-size: 18px;
                color: #333;
                margin-bottom: 20px;
                line-height: 1;
               font-weight: bold;
                &:before{
                    position: absolute;
                    content: '';
                    width: 6px;
                    height: 100%;
                    left: 0;
                    top: 0;
                    background-color: #e82255;
                }
            }
            .cList{
                flex-wrap: wrap;
                & > div{
                    margin: 0 20px 30px 0;
                }
                .its{
                    position: relative;
                    width: 235px;
                    height: 235px;
                    box-shadow: 0 0 5px #9e9e9e;
                    border-radius: 5px;
                    &>div{
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                        overflow: hidden;
                        img{
                            position: absolute;
                            height: 100%;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%,-50%);
                        }
                    }
                }
                p{
                    font-size: 14px;
                    color: #000;
                    line-height: 44px;
                    font-weight: bold;
                    width: 235px;
                }
            }
        }

    }

</style>
