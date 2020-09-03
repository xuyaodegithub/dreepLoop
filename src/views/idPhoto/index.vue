<template>
    <div class="helloFirst">
<!--        <input type="file" style="display: none" ref="upImg" @change="changeImg($event)"-->
<!--               accept="image/*"/>-->
        <header-sub></header-sub>
<!--        <div class=" apps">-->
<!--            <div class="Operator">-->
<!--                <el-button type="primary" round icon="el-icon-upload2" @click="upLoadimg()">&lt;!&ndash;Upload&ndash;&gt;上传</el-button>-->
<!--                <div class="diops"><img src="@/assets/image/laba.png" alt="">照片请上传正面照，露耳朵</div>-->
<!--                <h4>证件照上传记录</h4>-->
<!--                <el-scrollbar style="overflow-x: hidden;height:300px" >-->
<!--                    <div class="photoHisList flex ">-->
<!--                        <div class="itmes" v-for="item in 4" :key="item"><img-->
<!--                                src="http://deeplor.oss-cn-hangzhou.aliyuncs.com/matting_original/2020/08/11/0bc49d7dc82742dc80ef15e99898e861.png"-->
<!--                                alt=""></div>-->
<!--                    </div>-->
<!--                </el-scrollbar>-->
<!--                <div class="bottonLast">-->
<!--                    <div class="fixedB">-->
<!--                        <h5>&lt;!&ndash;Contact us&ndash;&gt;联系我们</h5>-->
<!--                        <div class="flex a-i cu">-->
<!--                            <img src="../../assets/image/wx.png" alt="">-->
<!--                            <p>roymind</p>-->
<!--                            <img src="../../assets/image/ewm.png" alt="" style="margin-left: 20px;margin-right: 0;">-->
<!--                            <img src="../../assets/image/wxl.png" alt="" class="noC" style="width:120px;">-->
<!--                        </div>-->
<!--                        <div class="flex a-i cu">-->
<!--                            <img src="../../assets/image/img3.png" alt="">-->
<!--                            <p><a href="mailto:pikachu@picup.ai">pikachu@picup.ai</a></p>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--            <div class="OperatorRight drops">-->
<!--                <div class="sizeClass flex a-i">-->
<!--                    <label>请选择证件照规格</label> <el-input placeholder="输入规格名称，如：一寸照" suffix-icon="el-icon-search" v-model="input2"></el-input>-->
<!--                </div>-->
<!--                <label>常用尺寸:</label>-->
<!--                <div class="cList flex">-->
<!--                    <div class="cu">-->
<!--                        <div class="its">-->

<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <label>全部尺寸:</label>-->
<!--                <div class="cList flex">-->
<!--                    <div class="cu" v-for="(item,idx) in list" :key="idx">-->
<!--                        <div class="its">-->
<!--                            <div :style="item | styleWh">-->
<!--                                <img :src="imgUrl" alt="">-->
<!--                            </div>-->
<!--                        </div>-->
<!--                        <p class="over">{{item.name}}</p>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->

    </div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex'
    import headerSub from '@/components/header/index.vue'
    import {getToken, getSecImgs, setSecImgs} from "../../utils/auth";
    import {Message, Notification} from 'element-ui'
    export default {
        name: 'HelloWorld',
        data() {
            return {
                imgUrl:'http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200724/aa742c4ea6a045d79d3256e170c48118.png',
                input2:'',
                list:[
                    {name:'一寸（25*35mm）',width:295,height:413,color:'#e82255'},
                    {name:'小一寸（22*32mm）',width:260,height:378,color:'#e82255'},
                    {name:'大一寸（33*48）',width:390,height:569,color:'rgb(0, 191, 243)'},
                    {name:'二寸（35*49mm）',width:413,height:579,color:'#e82255'},
                    {name:'小二寸（35*45mm）',width:260,height:378,color:'#e82255'},
                    {name:'大二寸（35*53mm）',width:413,height:626,color:'#e82255'},
                    {name:'美国签证（51*51mm）',width:591,height:591,color:'#e82255'},
                    {name:'日本签证（45*45）',width:531,height:531,color:'rgb(0, 191, 243)'},
                    {name:'越南签证（40*60）',width:260,height:378,color:'rgb(0, 191, 243)'},
                    {name:'身份证(无回执)（26*32mm）',width:260,height:378,color:'#e82255'},
                    {name:'居住证（26*32mm）',width:260,height:378,color:'#e82255'},
                    {name:'社保卡（）',width:260,height:378,color:'#e82255'},
                    {name:'导游证（）',width:260,height:378,color:'#e82255'},
                    {name:'教师资格证（25*35mm）',width:260,height:378,color:'#e82255'},
                    {name:'驾驶证、驾照（22*32mm）',width:260,height:378,color:'#e82255'},
                    {name:'入学照（25*35mm）',width:260,height:378,color:'#e82255'},
                    {name:'简历照片(一寸)（25*35mm）',width:260,height:378,color:'#e82255'},
                    {name:'三寸（54*84mm）',width:260,height:378,color:'#e82255'},
                    {name:'四寸（76*102mm）',width:260,height:378,color:'#e82255'},
                    {name:'五寸（89*127mm）',width:260,height:378,color:'#e82255'},
                    {name:'国考(二寸)（35*45mm）',width:260,height:378,color:'#e82255'},
                    {name:'国家司法考试（）',width:260,height:378,color:'#e82255'},
                    {name:'医保证（）',width:260,height:378,color:'#e82255'},
                    {name:'健康证(一寸)（25*35mm）',width:260,height:378,color:'#e82255'},
                    {name:'执法证（）',width:260,height:378,color:'#e82255'},
                    {name:'校园卡（）',width:260,height:378,color:'#e82255'},
                    {name:'入台证(小二寸)（35*45mm）',width:260,height:378,color:'#e82255'},
                    {name:'二级建造师证（）',width:260,height:378,color:'#e82255'},
                    {name:'职业兽医资格证（）',width:260,height:378,color:'#e82255'},
                    {name:'成人自考（）',width:260,height:378,color:'#e82255'},
                    {name:'公务员考试（35*45mm）',width:260,height:378,color:'#e82255'},
                    {name:'电子护照人像照片（33*48mm）',width:260,height:378,color:'#e82255'},
                    {name:'海外申请护照在线预约照片（33*48mm）',width:260,height:378,color:'#e82255'},
                    {name:'会计从业资格证（25*35mm）',width:260,height:378,color:'#e82255'},
                    {name:'英语四六级考试（）',width:260,height:378,color:'#e82255'},
                    {name:'学位英语（）',width:260,height:378,color:'#e82255'},
                    {name:'英语AB级考试（）',width:260,height:378,color:'#e82255'},
                    {name:'普通话水平测试（）',width:260,height:378,color:'#e82255'},
                    {name:'全国计算机考试（）',width:260,height:378,color:'#e82255'},
                    {name:'职业药师资格考试（）',width:260,height:378,color:'#e82255'},
                    {name:'职业医师资格报名（）',width:260,height:378,color:'#e82255'},
                    {name:'学籍照片（）',width:260,height:378,color:'#e82255'},
                    {name:'入学报名（25*35mm）',width:260,height:378,color:'#e82255'},
                    {name:'大学入学（35*45mm）',width:260,height:378,color:'#e82255'},
                    {name:'高考报名（）',width:260,height:378,color:'#e82255'},
                    {name:'世界通行签证（35*45mm）',width:260,height:378,color:'#e82255'},
                    {name:'港澳通行证（33*48mm）',width:260,height:378,color:'#e82255'},
                    {name:'韩国签证（35*45mm）',width:260,height:378,color:'#e82255'},
                    {name:'泰国签证（35*45mm）',width:260,height:378,color:'#e82255'},
                    {name:'印度签证（51*51mm）',width:260,height:378,color:'#e82255'},
                    {name:'以色列签证（51*51mm）',width:260,height:378,color:'#e82255'},
                    {name:'签证采集（30*40mm）',width:260,height:378,color:'#e82255'},
                    {name:'马来西亚签证（35*45mm）',width:260,height:378,color:'#e82255'},
                    {name:'新西兰签证（76*102mm）',width:260,height:378,color:'#e82255'},
                    {name:'意大利签证（35*40mm）',width:260,height:378,color:'#e82255'},
                    {name:'阿根廷签证（40*40mm）',width:260,height:378,color:'#e82255'},
                    {name:'巴西、冰岛签证（40*50mm）',width:260,height:378,color:'#e82255'},
                    {name:'肯尼亚签证（50*50mm）',width:260,height:378,color:'#e82255'},
                    {name:'入金证（）',width:260,height:378,color:'#e82255'},
                    {name:'成人自考（）',width:260,height:378,color:'#e82255'},
                    {name:'自考学位外语考试（）',width:260,height:378,color:'#e82255'},
                    {name:'保险职业认证（）',width:260,height:378,color:'#e82255'},
                    {name:'事业单位招聘（）',width:260,height:378,color:'#e82255'},
                    {name:'英语三级（33*48mm）',width:260,height:378,color:'#e82255'},
                    {name:'半身职业照（）',width:260,height:378,color:'#e82255'},
                    {name:'成人自考（）',width:260,height:378,color:'#e82255'},
                    {name:'高清证件照（）',width:260,height:378,color:'#e82255'},
                    {name:'成人高考报名（）',width:260,height:378,color:'#e82255'},
                    {name:'计算机初级考试（33/48mm）',width:260,height:378,color:'#e82255'},
                    {name:'车载终端照片（）',width:260,height:378,color:'#e82255'},
                ]
            }
        },
        filters: {
            styleWh(item){
                const pw=235;
                const data={
                    width:(item.width > item.height ? 235*0.9 : item.width*(235*0.9)/item.height)+'px',
                    height:(item.width > item.height ? item.height*(235*0.9)/item.width : 235*0.9)+'px',
                    backgroundColor:item.color
                }
                return data;
            }
        },
        watch: {},
        mounted() {
            window.showloginDialog=this.showloginDialog;
            window.Notification=this.showNotification;
            // var showloginDialog= this.showLoginDilogAction()
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
                'userGetscribe','showLoginDilogAction'
            ] ),
            showNotification(str){
                Notification( {
                    type: 'error',
                    message: str
                } )
            },
            showloginDialog(){
                this.showLoginDilogAction()
            },
            upLoadimg() {//点击上传
                this.showLoginDilogAction()
                // this.$refs.upImg.value = '';
                // this.$nextTick( () => {
                //     this.$refs.upImg.click()
                // } )
            },
            stopPrevent() {//阻止游览器默认打开图片
                let _self = this
                document.addEventListener( "drop", function (e) {  //拖离
                    e.preventDefault();
                } );
                document.addEventListener( "dragleave", function (e) {  //拖后放
                    e.preventDefault();
                } );
                document.addEventListener( "dragenter", function (e) {  //拖进
                    e.preventDefault();
                } );
                document.addEventListener( "dragover", function (e) {  //拖来拖去
                    e.preventDefault();
                } );
                let oDrops = document.getElementsByClassName( 'drops' );
                for (let i = 0; i < oDrops.length; i++) {
                    oDrops[i].addEventListener( "drop", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        // e.cancelable=true
                        let files = e.dataTransfer.files;
                        // console.log(files)
                        if (!files.length) return;
                        if (!getToken() && files.length > 1) {
                            console.log( files )
                            _self.$message( {type: 'error', message: '登录后可批量上传'} )
                            return
                        }
                        _self.toscroll();
                        for (let i = 0; i < files.length; i++) {
                            console.log( files )
                            _self.files.unshift( {
                                url: files[i],
                                name: parseInt( Math.random() * 100000000000 ),
                                type: 'file',
                                filename: files[i].name
                            } )
                        }
                        _self.imgUrlss( files )
                    } )
                }
            },

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
