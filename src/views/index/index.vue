<template>
    <div class="helloFirst">
        <header-sub></header-sub>
        <div class="seachHeader">
            <div class="margin seachI flex a-i">
                <div>
                    <input type="file" style="display: none" ref="upImg" @change="changeImg($event,1)" :multiple="multiple">
                    <p class="flex a-i" style="line-height: 1.2;">Cut out picture foreground without moving your finger<img src="../../assets/image/free2.png" alt="" style="margin-left: 15px"></p><!--智能一键抠图神器-->
                    <p class="m-boonte">  Fully automatic, ~3 seconds, free background templates</p><!--&nbsp;1 0 0 % 自 动 - 5 秒 - 免 费 背 景 模 板-->
                    <div class="flex dwoBtn">
                        <el-button type="primary" round icon="el-icon-upload2" @click="upLoadimg()">Upload a single picture</el-button><!--上传1张图片-->
                        <el-button type="primary" round icon="el-icon-upload2" @click="upLoadimg(2)">Upload multiple pictures</el-button><!--批量上传-->
                    </div>
                    <div class="flex input">
                        <input placeholder=" Paste a URL " v-model="imgUrl" @keyup.enter="copyImgUrl"/><!--粘贴URL地址-->
                        <div class="cu" @click="copyImgUrl()">OK</div><!--确定-->
                    </div>
                </div>
                <div class="imgRR">
                    <img src="../../assets/morepeople.png" alt="">
                </div>
            </div>
        </div>
        <!--    <img :src="test" alt="">-->
        <div class="margin" ref="contentImg" style="margin-top: 30px;margin-bottom: 40px">
<!--            这里的key不能使用index-->
            <div  v-for="(item,index) in files" :key="item.name">
                <img-sub :files="item" @to-parse="collectBg" @close="closeItem" :index="index" @openImgSet="openImgSet"></img-sub>
            </div>
        </div>
        <div class="AllDown" v-if="allbgImg.length>1">
            共上传<span>{{files.length}}</span>张图片，已处理<span>{{allbgImg.length}}</span>张
            <el-button type="primary" round
                       style="background-color: #27a9f4;border-color: #27a9f4;color: #fff;position: relative;left: 365px;width: 200px;position: relative;"
                       icon="el-icon-download">
                批量下载
                <div class="sizeChoses">
                    <!--                            v-for="(item,index) in sizeArr" :key="index"-->
                    <div class="flex a-i j-b" @click="saveMove(0)">
                        <span>下载预览图（ 免费 ）</span>
                    </div>
                    <div class="flex a-i j-b" @click="saveMove(1)">
                        <span>下载原图（ 原图比例 ）</span>
                    </div>
                </div>
            </el-button>
        </div>
        <div class="zhezhao" v-if="showSetImg"></div>
        <img-set-sub v-if="showSetImg" :imgMsg="imgMsg" @closeImgSet="closeImgSet"></img-set-sub>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import {mapActions} from 'vuex'
    import JSZip from 'jszip'
    import { saveAs } from "file-saver";
    import headerSub from '@/components/header/index.vue'
    import imgSub from '@/components/showImgSub/index.vue'
    import {getToken} from "../../utils/auth";
    import { basrUrls } from "../../utils";
    import imgSetSub from '@/components/setImgSub/index.vue'
    import { getMattedImageMultiple } from "../../apis";
    export default {
        name: 'HelloWorld',
        data() {
            return {
                multiple:false,
                imgMsg:{},
                showSetImg:false,
                allbgImg:[],
                basrUrls:basrUrls(),
                sizeArr: [
                    // {width: 500, height: 500},
                    // {width: 800, height: 800},
                    // {width: 1600, height: 1200}
                ],
                files: [],
                timer: '',//上传过度动画
                percentValue: 0,//上传百份比
                imgUrl: '',//图片链接
            }
        },
        mounted() {

        },
        computed: {
            ...mapGetters([])
        },
        components: {
            headerSub,imgSub,imgSetSub
        },
        methods: {
            ...mapActions([]),
            closeImgSet(val){//关闭操作台
                    this.showSetImg=false;
                    this.imgMsg={};
            },
            openImgSet(obj){//打开操作台
                this.imgMsg=obj;
                this.showSetImg=true;
            },
            collectBg(obj){
                if(obj.color==='add')this.allbgImg.push(obj)
                else{
                    this.allbgImg.filter((val,index)=>{
                        if(val.name===obj.name) val.color=obj.color
                    })
                }

            },
            closeItem(item){
                this.files.splice(item.index,1)
                this.allbgImg.map((val,index)=>{
                    if(val.name===item.name) this.allbgImg.splice(index,1)
                })
            },
            upLoadimg(key) {//点击上传
                if(key)this.multiple=true
                else this.multiple=false
                if(!getToken() && key){
                    this.$confirm('该功能需要登录后操作, 前往登录?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                        center: true,
                        showClose:false
                    }).then(() => {
                        window.location.href=`${this.basrUrls}/loginOrRegister.html#/?type=1`
                    }).catch(() => {

                    });
                    return
                }
                this.$refs.upImg.value = ''
                this.percentValue = 0
                this.$nextTick(()=>{
                    this.$refs.upImg.click()
                })
            },
            //下载多张抠图
            saveMove(key) {
                this.$message.closeAll()
                if( this.files.length!==this.allbgImg.length){
                    this.$message({type:'warning',message:'图片尚未处理完,请稍后...'})
                    return
                }
                const loading = this.$loading({
                    lock: true,
                    text: '处理中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let arr = this.allbgImg.filter((val, index) => {
                    return val.img
                })
                if(key===0)this.StoreDowQrcode(arr,loading)
                else{
                    let filedId=[]
                    arr.map((item,index)=>{
                        filedId.push(item.fileId)
                    })
                    getMattedImageMultiple(filedId).then(res=>{
                        if(!res.code){
                            let newArr=res.data
                            arr.map((item,index)=>{
                                item.img=newArr[index]
                            })
                            this.StoreDowQrcode(arr,loading)
                        }else{
                            loading.close()
                        }
                    })
                }

            },

            //批量下载图片
            StoreDowQrcode(arr,loading, blogTitle = "图片包") {
                var zip = new JSZip();
                var imgs = zip.folder(blogTitle);
                var baseList = [];
                var _this = this;
                for (var i = 0; i < arr.length; i++) {
                    let name = arr[i].name; //图片名称
                    let color=arr[i]['color']
                    let image = new Image();
                    image.crossOrigin = '';
                    image.onload = function () {
                        let canvas = document.createElement("canvas");
                        canvas.width = image.width;
                        canvas.height = image.height;
                        let context = canvas.getContext("2d");
                        if(color !=='add' && color ){
                            context.fillStyle=color
                            context.fillRect(0,0, canvas.width,canvas.height)
                        }
                        context.drawImage(image, 0, 0, image.width, image.height);
                        let url = canvas.toDataURL("image/png"); // 得到图片的base64编码数据 let url =
                        // canvas.toDataURL();
                        baseList.push({name: name, img: url.substring(22)});
                        if (baseList.length === arr.length) {
                            if (baseList.length > 0) {
                                for (let k = 0; k < baseList.length; k++) {
                                    imgs.file(baseList[k].name + ".png", baseList[k].img, {
                                        base64: true
                                    });
                                }
                                zip.generateAsync({type: "blob"}).then(function (content) {
                                    // see FileSaver.js
                                    saveAs(content, blogTitle + ".zip");
                                });
                                loading.close()
                            } else {
                                _this.$message.error({
                                    title: "error",
                                    message: "暂无图片可下载"
                                });
                            }
                        }
                    };
                    image.src = arr[i].img;
                }
            },
            copyImgUrl() {//粘贴图片链接确定
                if (!this.imgUrl) {
                    this.$message({
                        message: '图片路径不可为空',
                        type: 'warning'
                    })
                    return
                }
                let hsaOwn=this.files.some((val)=>{
                    return val.url===this.imgUrl
                })
                if(hsaOwn){
                    this.$message({type:'warning',message:'重复图片已过滤。'})
                    return
                }
                if(this.files.length+1>20){
                    this.$message({type:'warning',message:'最高可上传20张图片，请分批次处理！'})
                    return
                }
                this.toscroll()
                let name=Math.random().toString().substring(2)
                this.files.unshift({url:this.imgUrl,name:name,type:'copy'})
            },
            changeImg(e) {//图片上传
                let NewLength=this.$refs.upImg.files.length
                if(NewLength + this.files.length>20){
                    this.$message({type:'warning',message:'最高可上传20张图片，请分批次处理！'})
                    return
                }
                // if(){}
                    this.toscroll()
                    for (let i = 0; i < this.$refs.upImg.files.length; i++) {
                        this.$message.closeAll()
                        let hsaOwn=this.files.some((val)=>{
                            return val.name===this.$refs.upImg.files[i].name
                        })
                        if(hsaOwn)this.$message({type:'warning',message:'重复图片已过滤。'})
                        else this.files.unshift({url:this.$refs.upImg.files[i],name:this.$refs.upImg.files[i].name,type:'file'})

                    }
            },
            toscroll() {
                let oDiv = this.$refs.contentImg.offsetTop;
                $('body,html').animate({scrollTop: oDiv - 30}, 500);
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    .helloFirst {
        background-color: #f5f5f6;
        /*padding-top:24px ;*/
        min-width: 1200px;
        .seachHeader {
            min-width: 1200px;
            background-color: #5093b0;
            padding: 81px 0 108px 0;
        }

        .seachI, .seachDiv {
            font-size: 24px;
            color: #fff;
            position: relative;
            & > div:first-child{
                width: 50%;
            }
            & > .imgRR {
                width: 455px;
                height: 410px;
                margin-left: 116px;
                img{
                    display: block;
                    width:100%;
                    height: 100%;
                }
            }

            p.flex {
                font-size: 54px;
                margin-bottom: 15px;
            }

            .m-boonte {
                margin-bottom: 44px;
                line-height: 1;
            }

            .el-button {
                font-size: 16px;
                line-height: 50px;
                width: 220px;
                border-radius: 25px;
                padding: 0;
                background-color: #2fb9f7;
                border: none;
                margin-bottom: 15px;
            }

            .el-button:nth-child(2) {
                background-color: #40e0c4;
            }

            input {
                border: none;
                font-size: 16px;
                text-indent: 1em;
                width: 340px;
            }

            .input {
                width: 450px;
                height: 50px;
                line-height: 50px;
                border-radius: 25px;
                overflow: hidden;
                background-color: #2fb9f7;
                /*border: 1px solid #333;*/
                & > div {
                    font-size: 16px;
                    flex: 1;
                    text-align: center;
                }
            }
        }

    }

.AllDown{
    text-align: center;
    font-size: 14px;
    color: #333;
    line-height: 90px;
    background-color: #fff;
    /*margin-bottom: 30px;*/
    text-indent: 60px;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    & > span{
        font-size: 22px;
        color: #27a9f4;
    }
    .el-button:hover .sizeChoses{
        display: block;
    }
}
    .sizeChoses {
        display: none;
        position: absolute;
        width: 260px;
        border: 1px solid #efefef;
        border-radius: 10px;
        font-size: 12px;
        line-height: 30px;
        color: #727272;
        padding: 10px 0;
        background-color: #fff;
        z-index: 99;
        top: -82px;
        right: 0;
        & > div:hover {
            background-color: #f1f1f1;
        }

        & > div {
            cursor: pointer;
            padding: 0 12px;
        }
        &:hover{
            display: block;
        }
    }
</style>
