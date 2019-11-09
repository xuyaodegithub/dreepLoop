<template>
    <div class="showobject">
        <!--            <div class="Uploading flex a-i" v-show="upLoading" style="margin-top: 30px">-->
        <!--                <el-progress type="circle" :percentage="percentValue" :stroke-width='strokeWidth'></el-progress>-->
        <!--            </div>-->
        <div class="dreepAfter">
            <i class="el-icon-close cu" @click="deleteItem()"></i>
            <div class="flex j-b a-i imgs">
                <p>原图</p>
                <p>抠图结果</p>
            </div>
            <div class="flex imgs">
                <div>
                    <img :src="Original" alt="">
                </div>
                <div>
                    <!--                        <img :src="bgOriginal.img" alt="">-->
                    <div v-show="bgOriginal.status===0" :style="backg" class="activeDiv"><canvas :id="'canvas'+ramdId" >当前游览器不支持此功能，换一个试试吧！</canvas></div>
                    <div v-show="bgOriginal.status===1" class="errmsg">
                        <i class="el-icon-circle-close"></i>
                        这张图片当前不支持，不能识别前景
<!--                        Error occured, the foreground can not be recognized-->
                        <p>
                        	请选择一个有明确区分前景和背景的图片。例如:试着一个人的照片，产品、动物、汽车或另一个对象
<!--                        	Try picture that contains person, more categories will be supported in future-->
                        </p>
                    </div>
                    <div v-show="bgOriginal.status===2" class="errmsg">
                        <i class="el-icon-s-flag"></i>
                        当前正在排队,请稍后...
<!--                        Waiting in the queue,-->
                        <p>
                        	排队位置{{imageMsg.queueNumber}}
<!--                            Sequence number: {{imageMsg.queueNumber}}-->
                        </p>
                    </div>
                    <div class="close flex" v-show="![0,1,2].includes(bgOriginal.status)">
                        <i class="el-icon-loading"></i>
                        处理中...
<!--                        Processing...-->
                    </div>
                    <div class="otherBtn flex a-i"  v-if="bgOriginal.img">
                        <span><!--Background-->背景</span>
                        <div v-for="(items,indexs) in color" :key="indexs" :style="backBtn"
                             @click="choseBackColor(items,indexs)"
                             class="cu" :class="{'bordershow' : indexs==choseBack}" v-if="indexs===0"></div>
                        <div v-for="(items,indexs) in color" :key="indexs" :style="{'background':items }"
                             @click="choseBackColor(items,indexs,)" class="cu" :class="{'bordershow' : indexs==choseBack}"
                             v-if="indexs!==0"></div>
                        <span style="height: 28px;"><el-color-picker v-model="colorValue" size="mini"
                                                                     @change="choseColor(index)"
                                                                     :class="{'bordershow': choseBack=='span'}"></el-color-picker></span>
<!--                        <el-button type="primary" icon="el-icon-edit" circle style="background-color: #27adf6;border-color: #27adf6;margin: 0 70px 0 60px" size="small" @click="updataThis()"></el-button>-->
                    </div>
                    <div class="downLoadBtn" v-if="bgOriginal.img">
                        <el-button type="primary" round
                                   icon="el-icon-download"
                                   :class="{'opacitys' : showSize}"
                                   @mouseenter.native="showSize=true" @mouseleave.native="choseSize()" @click="save(0,1)">
                            <!--Download-->下载<i class="el-icon-caret-bottom" style="position: absolute;margin-left: 12px;transition: .3s all;" :class="{'rotates' : showSize}" v-if="imageMsg.previewWidth!==imageMsg.originalWidth && imageMsg.previewHeight!==imageMsg.originalHeight"></i>
                        </el-button>
                        <div class="sizeChose" v-if="showSize && (imageMsg.previewWidth!==imageMsg.originalWidth && imageMsg.previewHeight!==imageMsg.originalHeight)" @mouseenter="showSizeStop=true" @mouseleave="boxLeave()" :class="{'lessTop' : !(imageMsg.previewWidth!==imageMsg.originalWidth && imageMsg.previewHeight!==imageMsg.originalHeight)}">
                            <div class="flex a-i">
                                <span>尺寸</span>
                                <span>消耗次数</span>
                            </div>
                            <div class="flex a-i j-b" >
                             <span>{{imageMsg.previewWidth + ' X ' + imageMsg.previewHeight}}</span>
                             <span>0</span>
                             <span class="cu" @click="save(0)">下载</span>
                            </div>
                            <div class="flex a-i j-b" v-if="imageMsg.previewWidth!==imageMsg.originalWidth && imageMsg.previewHeight!==imageMsg.originalHeight">
                                <span>{{imageMsg.originalWidth + ' X ' + imageMsg.originalHeight}}</span>
                                <span>1</span>
                                <span class="cu"  @click="save(1)">下载</span>
                            </div>
                            <div>
<!--                                当前可用次数： 0 <i class="cu">去充值</i>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import opacity from '@/assets/opacity.jpg'
    import mohu1 from '@/assets/image/mohu1.png'
    import mohu2 from '@/assets/image/mohu2.png'
    import {uploadImgApi, downloadMattedImage, getMattingInfo,copyUpload} from "../../apis";
    import {myBrowser,getrandom} from "../../utils";
    import JSManipulate from '../../utils/jsmanipulate.js'
    export default {
        name: "imgsub",
        props: {
            files: Object,
            index: Number
        },
        data() {
            return {
                opacity,
                imageMUrl: '',//原图
                imageMsg: {},
                Original: '',
                bgOriginal: {},
                color: ['rgba(255,255,255,0)', '#ffffff', '#eeeeee', '#5d5d5d',`url(${mohu2})`,`url(${mohu1})`],
                colorValue: '#409EFF',
                backBtn: {
                    backgroundImage: "url(" + opacity + ")",
                    backgroundRepeat: 'mo-repeat',
                    backgroundSize: 'center',
                },
                backg: {
                    backgroundImage: "url(" +opacity + ")",
                    backgroundRepeat: 'mo-repeat',
                    backgroundSize: 'center'
                },
                choseBack: 0,
                showSizeStop: false,
                showSize: false,
                sizeArr: [],
                timer: null,
                fileId: '',
                imgname:'',//下载的图片名称
                file:null,
                canvas:'',
                canvasText:'',
                canveaContentW:500,
                canveaContentH:500,
                ramdId:Math.random(),
                canvasinitNum:'',
                loadImg:''
            }
        },
        watch:{
            bgOriginal(newval,oldval){
                if(newval.img){
                    // this.$nextTick(()=>{
                        this.drameImg(newval.img)
                    // })
                }
            }
        },
        mounted() {
            let windowW=document.documentElement.clientWidth
            if(windowW>1500) this.canvasinitNum=500
            else this.canvasinitNum=380
            // window.onresize = function(){
            //     let windowW=document.documentElement.clientWidth
            //     if(windowW>1500) this.canvasinitNum=500
            //     else this.canvasinitNum=380
            // }
            this.file=this.files.url
            if( this.files.type === 'copy') {
                this.imgname=`copy_${getrandom(0,1000000000)}`;
                this.getImgMsgByurl()
            }else {
                this.imgname=this.file.name.substring(0, this.file.name.lastIndexOf('.'));
                this.getImgData()
            }
        },
        methods: {
            pollingImg() {//轮询
                this.timer = setInterval(() => {
                    // this.getImgData()
                    getMattingInfo({fileId: this.fileId}).then(res => {
                        if (!res.code) {
                            this.imageMsg = res.data;
                            if (res.data.status === 'success') {
                                clearInterval(this.timer)
                                let obj = {
                                    name: this.imgname,
                                    img: res.data.bgRemovedPreview,
                                    status: 0,
                                    fileId:this.fileId
                                }
                                this.Original = res.data.original
                                this.bgOriginal = obj
                                this.$emit('to-parse', {
                                    id: this.index,
                                    img: res.data.bgRemovedPreview,
                                    name: this.files.type === 'copy' ? this.imgname : this.files.name,
                                    color: 'add',
                                    fileId:this.fileId,
                                    Original:this.Original
                                })
                            }
                        } else {
                            clearInterval(this.timer)
                            this.$emit('to-parse', {id: this.index, img: '', color: 'add', name:this.files.type === 'copy' ? this.imgname : this.files.name, fileId:this.fileId,Original:this.Original,noSave:true})
                            this.bgOriginal = {name: this.imgname, img: '', status: 1, fileId:this.fileId}
                        }
                    })
                }, 1000)
            },
            updataThis() {
                if (this.bgOriginal.status !== 0) {//当前图片不可编辑
                    this.$message({type: 'error', message: '当前图片不可编辑'})
                    return
                }
                this.$emit('openImgSet', this.imageMsg)
            },
            getImgData() {
                let file = this.file, _self = this
                if (window.FileReader) {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    //监听文件读取结束后事件
                    reader.onloadend = function (e) {
                        _self.Original = e.target.result
                        let param = new FormData();
                        param.append('file', file, file.name)
                        param.set('mattingType', 2)
                        uploadImgApi(param).then(res => {
                            if (res.code == 0) {
                                _self.fileId = res.data.fileId
                                _self.imageMsg = res.data
                                if (res.data.status !== 'success') {
                                    _self.bgOriginal = {
                                        name: _self.imgname,
                                        img: '',
                                        status: 2,
                                        fileId:_self.fileId
                                    }
                                    _self.pollingImg()
                                    return
                                }
                                let obj = {
                                    name: _self.imgname,
                                    img: res.data.bgRemovedPreview,
                                    status: 0,
                                    fileId:_self.fileId
                                }
                                _self.Original = res.data.original
                                _self.bgOriginal = obj
                                _self.$emit('to-parse', {
                                    id: _self.index,
                                    img: res.data.bgRemovedPreview,
                                    name: _self.files.name,
                                    color: 'add',
                                    fileId:_self.fileId,
                                    Original:_self.Original
                                })
                            } else {
                                let obj = {
                                    name: _self.imgname,
                                    img: '',
                                    status: 1,
                                    fileId:_self.fileId
                                }
                                _self.$emit('to-parse', {id: _self.index, img: '', color: 'add', name: _self.files.name, fileId:_self.fileId,Original:_self.Original,noSave:true})
                                _self.bgOriginal = obj
                            }
                        }).catch(err => {
                            console.log(err)
                        })
                    };
                }
            },
            getImgMsgByurl(){//通过粘贴请求
                this.Original = this.file
                let obj={url:this.file,mattingType:2}
                if(this.files.fileId)obj.fileId=this.files.fileId
                copyUpload(obj).then(res=>{
                    if (res.code == 0) {
                        this.fileId = res.data.fileId
                        this.imageMsg = res.data
                        if (res.data.status !== 'success') {
                            this.bgOriginal = {
                                name: this.imgname,
                                img: '',
                                status: 2,
                                fileId:this.fileId
                            }
                            this.pollingImg()
                            return
                        }
                        let obj = {
                            name: this.imgname,
                            img: res.data.bgRemovedPreview,
                            status: 0,
                            fileId:this.fileId
                        }
                        this.Original = res.data.original
                        this.bgOriginal = obj
                        this.$emit('to-parse', {
                            id: this.index,
                            img: res.data.bgRemovedPreview,
                            name: obj.name,
                            color: 'add',
                            fileId:this.fileId,
                            Original:this.Original
                        })
                    } else {
                        let obj = {
                            name:this.imgname,
                            img: '',
                            status: 1,
                            fileId:this.fileId
                        }
                        this.$emit('to-parse', {id: this.index, img: '', color: 'add', name: obj.name, fileId:this.fileId, Original:this.Original,noSave:true})
                        this.bgOriginal = obj
                    }
                }).catch(err=>{
                    console.log(err)
                })
            },
            choseBackColor(color, index) {//纯色背景切换
                // let imgData = this.canvasText.getImageData(0, 0, this.canvas.width, this.canvas.height);
                this.choseBack = index;
                if (index === 0){
                    // this.drameImg(this.bgOriginal.img)
                    this.drawImgAfterFirst(this.loadImg)
                    this.backg = {backgroundImage: `url("${this.opacity}")`,backgroundRepeat: 'mo-repeat',backgroundPasition: 'center'};
                } else if(index===4)this.drawStyleBg(this.Original+`?str=${Math.random()}`,this.bgOriginal.img+`?str=${Math.random()}`,1);
                  else if(index===5)this.drawStyleBg(this.Original+`?str=${Math.random()}`,this.bgOriginal.img+`?str=${Math.random()}`,2);
                  else {
                    // this.drameImg(this.bgOriginal.img)
                    this.drawImgAfterFirst(this.loadImg)
                    this.backg = {background: color}
                }
                // let name=  this.files.type == 'copy' ? this.imgname : this.file.name;
                // this.$emit('to-parse', {name: name, color: index == 0 ? '' : color})
            },
            choseColor(index) {//选择颜色背景，颜色选择器
                // this.drameImg(this.bgOriginal.img)
                this.drawImgAfterFirst(this.loadImg)
                this.choseBack = 'span'
                this.backg = {background: this.colorValue}
                // let name= this.files.type == 'copy' ? this.imgname : this.file.name;
                // this.$emit('to-parse', {name: name, color: this.colorValue})
            },
            save(index,key) {//保存下载
                if(key && this.imageMsg.previewWidth!==this.imageMsg.originalWidth && this.imageMsg.previewHeight!==this.imageMsg.originalHeight) return;
                if (index === 0) {
                    let url = this.bgOriginal.img
                    this.downOldImg(url)
                } else {
                    if (this.imageMUrl) {
                        this.downOldImg(this.imageMUrl)
                        return
                    }
                    downloadMattedImage({fileId: this.fileId}).then(res => {
                        if (!res.code) {
                            this.imageMUrl = res.data
                            this.downOldImg(res.data)
                        }
                    })
                }
            },
            // 下载
            downOldImg(urls) {
                // console.log(urls,this.choseBack)
                let urlss=urls+`?str=${Math.random()}`
                let _self = this
                let cans = document.createElement('canvas');
                let ctxs = cans.getContext('2d');
                if(_self.choseBack===4 || _self.choseBack===5){
                    let callback=(objs)=>{
                        cans.width=objs.bgRemovedImg.width;
                        cans.height=objs.bgRemovedImg.height;
                        ctxs.putImageData(objs.dwonBg, 0, 0);
                        ctxs.drawImage(objs.bgRemovedImg, 0, 0);
                        _self.downFunc(cans)
                    }
                    this.drawStyleBg(this.Original+`?str=${Math.random()}`,urlss,1,_self.choseBack,callback)
                    return
                }
                let oImg = new Image();
                oImg.crossOrigin = "";
                oImg.onload = function () {
                    cans.width = oImg.width;
                    cans.height = oImg.height;
                    if (_self.choseBack > 0  && _self.choseBack < 4 && _self.choseBack !== 'span') {
                        ctxs.fillStyle = _self.color[_self.choseBack]
                        ctxs.fillRect(0, 0, oImg.width, oImg.height)
                    } else if (_self.choseBack == 'span') {
                        ctxs.fillStyle = _self.colorValue;
                        ctxs.fillRect(0, 0, oImg.width, oImg.height)
                    }
                    ctxs.drawImage(oImg, 0, 0, cans.width, cans.height);
                  _self.downFunc(cans)
                }
                oImg.src = urlss
            },
            downFunc(cans){//下载方法提取
                if (myBrowser() === 'IE' || myBrowser() === 'Edge') {//ie下载图片
                    let url = cans.msToBlob();
                    let blobObj = new Blob([url]);
                    window.navigator.msSaveOrOpenBlob(blobObj, this.bgOriginal.name + ".png");
                } else {
                    let url = cans.toDataURL("image/png");
                    let arr = url.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                    while(n--){
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    let objurl = URL.createObjectURL(new Blob([u8arr], {type:mime}));
                    let save_link = document.createElement('a');
                    save_link.href = objurl;
                    save_link.download = this.bgOriginal.name+'.png';
                    let event = document.createEvent('MouseEvents');
                    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    save_link.dispatchEvent(event);
                }
            },
            deleteItem() {//删除某一个
                let name='';
                if(this.timer) clearInterval(this.timer)
                if(this.files.type == 'copy') name=this.imgname
                else name=this.files.name
                this.$emit('close', {index: this.index, name: name})
            },
            choseSize() {
                let _self = this
                setTimeout(() => {
                    if (this.showSizeStop) return
                    _self.showSize = false
                }, 200)
            },
            boxLeave() {
                this.showSizeStop = false
                this.showSize = false
            },
            fingBig(val) {//找最大
                let big = val[0];
                val.map((v, i) => {
                    if (big < v) {
                        big = v
                    }
                });
                return big
            },
            drameImg(url){
                if(!this.canvas){
                    this.canvas=document.getElementById(`canvas${this.ramdId}`);
                    this.canvasText=this.canvas.getContext('2d');
                }
                let _self = this
                let image = new Image()
                image.src = url
                image.onload = function () {
                    _self.loadImg=image
                    let arrThis = [image.width, image.height]
                    let bigOne = _self.fingBig(arrThis)
                    if (bigOne == arrThis[0]) {
                        if (bigOne > _self.canvasinitNum) {
                            image.height = _self.canvasinitNum * image.height / image.width
                            image.width = _self.canvasinitNum
                        }
                    } else {
                        if (bigOne > _self.canvasinitNum) {
                            image.width = _self.canvasinitNum * image.width / image.height
                            image.height = _self.canvasinitNum
                        }
                    }
                    _self.canvas.width=2*image.width
                    _self.canvas.height=2*image.height
                    _self.canvas.style.width=image.width+'px'
                    _self.canvas.style.height=image.height+'px'
                    _self.canveaContentW = 2*image.width//画到画布上的位置
                    _self.canveaContentH = 2*image.height
                    _self.canvasText.clearRect(0,0,_self.canvas.width,_self.canvas.height)
                    _self.canvasText.drawImage(image,0,0,_self.canveaContentW,_self.canveaContentH)
                }
            },
            drawStyleBg(originalImgUrl, bgRemovedImgUrl,index,key,callback){
                let that=this;
                let imgLoaded = false;
                let originalImgLoaded = false;
                let img = new Image();
                img.crossOrigin = '';
                img.onload = function() {
                    imgLoaded = true;
                    if(imgLoaded && originalImgLoaded && !key) {
                        that.drawStyleBg2(originalImg,img,index)
                    }else if(imgLoaded && originalImgLoaded && key===4){
                        that.downOthers({oldImg:originalImg,bgImg:img},4,callback)
                    }else if(imgLoaded && originalImgLoaded && key===5){
                        that.downOthers({oldImg:originalImg,bgImg:img},5,callback)
                    }
                }
                img.src = bgRemovedImgUrl;
                let originalImg = new Image();
                originalImg.crossOrigin = '';
                originalImg.onload = function() {
                    originalImgLoaded = true;
                    if(imgLoaded && originalImgLoaded  && !key) {
                        that.drawStyleBg2(originalImg,img,index)
                    }else if(imgLoaded && originalImgLoaded && key===4) {
                        that.downOthers({oldImg:originalImg,bgImg:img},4,callback)
                    }else if(imgLoaded && originalImgLoaded && key===5){
                        that.downOthers({oldImg:originalImg,bgImg:img},5,callback)
                    }
                }
                originalImg.src = originalImgUrl;

            },
            drawStyleBg2(originalImg,bgRemovedImg,index){
                let canvas = document.createElement('canvas');
                canvas.width = this.canvas.width; //☜
                canvas.height = this.canvas.height;
                let ctx = canvas.getContext("2d");
                // let canvas=this.canvas,ctx=this.canvasText;
                ctx.drawImage(originalImg, 0, 0,canvas.width,canvas.height);
                let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let newBg1 = imgData;
                // let newBg2 = ctx.getImageData(0, 0, canvas.width, canvas.height);
                // let newBg3 = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let newBg4 = ctx.getImageData(0, 0, canvas.width, canvas.height);
                // let newBg5 = ctx.getImageData(0, 0, canvas.width, canvas.height);
                //var newBg1 = imageEffects.edge(imgData);
                JSManipulate.blur.filter(newBg1, {amount: 5.0});
                //JSManipulate.dither.filter(newBg2, {amount: 1.0});
                //JSManipulate.edge.filter(newBg2);
                // JSManipulate.emboss.filter(newBg2,{height:1,angle:135,elevation:30});
                // JSManipulate.diffusion.filter(newBg3,{scale:22});
                //JSManipulate.circlesmear.filter(newBg4,{size:10,density:1.0,mix:0.5});
                JSManipulate.grayscale.filter(newBg4);
                // JSManipulate.brightness.filter(newBg5,{amount:-0.5})
                // let whiteBg = ctx.createImageData(canvas.width,canvas.height);
                // for (let i=0;i<whiteBg.data.length;i+=4)
                // {
                //     whiteBg.data[i+0]=255;
                //     whiteBg.data[i+1]=255;
                //     whiteBg.data[i+2]=255;
                //     whiteBg.data[i+3]=255;
                // }
                if(index===1)this.showStyleBgCanvas(newBg4,bgRemovedImg,"前景彩色，背景黑白");
                else  this.showStyleBgCanvas(newBg1,bgRemovedImg,"模糊聚焦");
                // this.showStyleBgCanvas(whiteBg,bgRemovedImg,"纯白背景");
                // this.showStyleBgCanvas(newBg1,bgRemovedImg,"模糊聚焦");
                // this.showStyleBgCanvas(newBg2,bgRemovedImg,"背景浮雕");
                // this.showStyleBgCanvas(newBg3,bgRemovedImg,"背景磨砂玻璃");
                // this.showStyleBgCanvas(newBg4,bgRemovedImg,"前景彩色，背景黑白");
                // this.showStyleBgCanvas(newBg5,bgRemovedImg,"前景高亮，背景暗化");
            },
            showStyleBgCanvas(newBg,bgRemovedImg){
                this.canvasText.clearRect(0,0,this.canvas.width,this.canvas.height);
                this.canvasText.putImageData(newBg, 0, 0);
                // this.canvasText.scale(0.5,0.5);
                this.canvasText.drawImage(bgRemovedImg, 0, 0,this.canveaContentW,this.canveaContentH);
                // this.canvasText.setTransform(1, 0, 0, 1, 0, 0);
            },
            downOthers(imgObjs,index,callback){//效果图下载
                let canvasTemp = document.createElement('canvas');
                canvasTemp.width = imgObjs.bgImg.width; //☜
                canvasTemp.height = imgObjs.bgImg.height;
                let ctx = canvasTemp.getContext("2d");
                ctx.drawImage(imgObjs.oldImg, 0, 0,canvasTemp.width,canvasTemp.height);
                let imgData = ctx.getImageData(0, 0, canvasTemp.width, canvasTemp.height);
                let newBg1 = imgData;
                let newBg4 = ctx.getImageData(0, 0, canvasTemp.width, canvasTemp.height);
                JSManipulate.blur.filter(newBg1, {amount: 5.0});
                JSManipulate.grayscale.filter(newBg4);
                callback({
                    dwonBg:index===4 ? newBg4 : newBg1,
                    bgRemovedImg:imgObjs.bgImg
                })
            },
            drawImgAfterFirst(img){
                this.canvasText.clearRect(0,0,this.canvas.width,this.canvas.height);
                this.canvasText.drawImage(img,0,0,this.canveaContentW,this.canveaContentH);
            }
        }
    }
</script>

<style lang="scss" >
    .showobject{
        background-color: #fff;
        margin-bottom: 15px;
    }
    .dreepAfter {
        position: relative;
        padding: 0 15px 25px;
        border-radius: 15px;
        background-color: #ffffff;
        /*margin-top: 25px;*/
        margin: 0 auto;
        /*min-width: 1024px;*/
        & > .j-b > p{
            color: #999;
            font-size: 14px;
        }
        .imgs{
            justify-content: center;
           & > div:first-child{
                margin-right: 50px;
            }
        }
        .el-icon-close {
            position: absolute;
            right: 20px;
            top: 10px;
            font-size: 16px;
        }
        .imgs > div:last-child{
            max-height: none;
        }
        .imgs > div {
            position: relative;
            width: 500px;
            /*max-height: 500px;*/
            text-align: center;
            /*canvas{*/
            /*    width: 250px;*/
            /*    height: 187.5px;*/
            /*}*/
            img {
                max-width: 500px;
                border-radius: 8px;
                max-height: 500px;
            }

            .activeDiv {
                border-radius: 8px;
                display: inline-block;
                margin: 0;
                background-position: center;
                overflow: hidden;
                padding: 0;
                line-height: 0;
            }

            .errmsg {
                border-radius: 15px;
                background-color: #f9f1ef;
                font-size: 18px;
                color: #a74d45;
                padding: 40px 70px 60px;
                line-height: 1;

                i {
                    font-size: 40px;
                    display: block;
                    margin-bottom: 18px;
                }

                p {
                    font-size: 14px;
                    margin-top: 20px;
                    line-height: 24px;
                    color: #585453;
                }
            }

            .close {
                font-size: 16px;
                color: $to;
                width: 500px;
                /*max-height:500px;*/
                height: 100%;
                background-color: #f5f5f7;
                border-radius: 15px;
                align-items: center;
                justify-content: center;
                flex-direction: column;

                i {
                    display: block;
                    font-size: 32px;
                    margin-bottom: 15px;
                }

                /*margin: ;*/
            }
        }

        .imgs > p {
            width: 500px;
            /*flex: 1;*/
            text-align: center;
            font-size: 14px;
            line-height: 32px;
            margin: 10px 0;
        }
        .imgs > p:first-child {
            margin-right: 50px;
        }
    }

    .otherBtn {
        font-size: 12px;
        line-height: 28px;
        color: #b4b4b4;
        margin: 15px 0 0 0;
        & > span {
            margin-right: 16px;
        }

        .bordershow.cu {
            border: 1px solid $to;
        }

        .bordershow .el-color-picker__trigger {
            border-color: $to;
        }

        & > div {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 1px solid #c7c7c7;
            margin-right: 8px;
            background-repeat: no-repeat;
            background-position: -5px -5px;
        }

        p {
            text-align: center;
            margin-left: 20px;
            line-height: 30px;
            font-size: 12px;
            color: #fff;
            width: 100px;
            border-radius: 15px;

            i {
                margin-right: 5px;
            }
        }

        .el-color-picker__trigger {
            /*border: none;*/
            /*border-radius: 50%;*/
            width: 60px;
            border-radius: 13px;
            border-color: #c7c7c7;

            .el-color-picker__color-inner {
                display: none;
            }

            .el-icon-arrow-down:before {
                content: "\e794";
                color: #000;
            }

            .el-color-picker__color {
                /*display: none;*/
                border: none;
            }
        }
    }

    .downLoadBtn {
        /*width: 160px;*/
        text-align: left;
        margin: 25px auto 0;
        position: relative;
        .opacitys{
            opacity: .6;
        }
        .rotates{
            transform: rotateZ(180deg);
        }
        & > .el-button,& > .el-button:hover{
            background-color: $to;
            border-color: $to;
            width: 160px;
        }
        .sizeChose {
            position: absolute;
            margin-top: 10px;
            border: 1px solid #efefef;
            border-radius: 10px;
            font-size: 12px;
            line-height: 30px;
            color: #ffffff;
            padding: 10px 6px;
            background-color: rgba(0,0,0,.9);
            left: -100px;
            top: -150px;
            z-index: 99;
            & > div {
                padding: 0 12px;
                margin-bottom: 8px;
                &:last-child{
                    text-align: right;
                    margin: 10px 0 0 0;
                    i{border-bottom: 1px solid #a1a0a0;margin-left: 10px;}
                    color: #a1a0a0;
                }
                &:first-child span:last-child{border: 0;text-align: left;color: #a1a0a0;}
                &:first-child span{color: #a1a0a0;}
                span{
                    width: 100px;
                    &:nth-child(2){
                        width: 80px;
                    }
                    &:last-child{
                        border: 1px solid $to;
                        width: 50px;
                        line-height: 24px;
                        border-radius: 13px;
                        text-align: center;
                        color: $to;
                    }
                }
            }
        }
        .sizeChose.lessTop{
            top: -65px;
        }
    }

    .bordershow .el-color-picker__trigger {
        border-color: #26adf5;
    }

    .el-color-picker__trigger {
        /*border: none;*/
        /*border-radius: 50%;*/
        width: 60px !important;
        border-radius: 13px;
        border-color: #c7c7c7;
    }

    .el-color-picker__color-inner {
        display: none;
    }

    .el-icon-arrow-down:before {
        content: "\e794";
        color: #000;
    }

    .el-color-picker__color {
        /*display: none;*/
        border: none;
    }
    .el-color-dropdown__btns .el-button--text{
        display: none;
    }
    @media screen and (max-width:1500px){
        .dreepAfter {
            .imgs.flex > div {
                max-width: 380px;
                /*max-height: 380px;*/
                img{
                    max-width: 380px;
                    max-height: 380px;
                }
                .close{
                    max-width: 380px;
                }
                canvas{
                    max-width: 380px;
                    max-height: 380px;
                }
            }
            .imgs.flex > p{
                max-width: 380px;
            }
        }
    }
</style>
