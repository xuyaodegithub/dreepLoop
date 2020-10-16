<template>
    <div class="matting" v-loading="loading">
        <div class="back flex a-i">
            <div :style="{color:historyList.findIndex(item=>item.id===hisIdx) <1 ? '#BDBEC1' : '#333'}" @click="setBack(0)"><i class="icon iconfont icon-qianjin rotate"></i>上一步</div>
            <div :style="{color:historyList.findIndex(item=>item.id===hisIdx) < historyList.length-1 ? '#333' : '#BDBEC1'}" @click="setBack(1)"><i class="icon iconfont icon-qianjin"></i>下一步</div>
            <div @click="reset"><i class="el-icon-refresh-right"></i>重置</div>
        </div>
        <span class="screen cu" :class="openScreen ? 'el-icon-copy-document' : 'el-icon-full-screen'" @click="$emit('changeScree',1)"></span>
        <div class="flex topSet a-i">
            <div class="flex btns">
             <span class="cu" v-for="(item,idx) in btns" :key="idx" @click="operationType=idx"
                   :class="{active : operationType===idx}">{{item}}</span>
                <transition name="el-fade-in-linear">
                    <div class="silders" v-show="!isPaint">
                        画笔大小：
                        <el-slider v-model="penSize" :min="1" :max="30"></el-slider>
                    </div>
                </transition>
            </div>
            <div class="ships">
                小提示：按住“空格键”拖动鼠标可以移动画板哦
            </div>
            <el-button plain @click="domain">修复完成</el-button>
        </div>
        <div class="flex j-b " id="content" :class="openScreen ? 'mhe' : 'mhs'" :style="{height:`${openScreen ? clientH+'px' : 'auto'}`}">
            <div class="mleft">
                <div :style="{width:`${initW}px`,height:`${initH}px`,left:canXy.x,top:canXy.y}" @mousedown="downs" class="nowCans" ref="parseDiv">
                    <canvas id="ori"></canvas>
                    <canvas id="oriup" style="opacity: .4"></canvas>
                    <span class="bords"
                          :style="{width:`${borderWh.w}px`,height:`${borderWh.h}px`,left:`${arcXy.x}px`,top:`${arcXy.y}px`}"></span>
                </div>
            </div>
            <div class="mright">
                <div class="opacity" :style="{width:`${initW}px`,height:`${initH}px`,left:canXy.x,top:canXy.y}"  @mousedown="downs($event,3)" >
                    <canvas id="pre"></canvas>
                    <span class="bords"
                          :style="{width:`${borderWh.w}px`,height:`${borderWh.h}px`,left:`${arcXy.x}px`,top:`${arcXy.y}px`}"></span>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { uploadossBg } from '@/apis';
    import { findLastIdx } from '@/utils'
    export default {
        name: "index",
        props: {
            edrieImgInfo: Object,
            openScreen:Boolean,
            hisList:Array,
            oriMsg:Object
        },
        data() {
            return {
                btns: ['擦除', '还原'],
                operationType: 0,
                initnum: 400,
                initW: 500,
                initH: 500,
                oPre: null,
                oPreTxt: null,
                oOri: null,
                oOriTxt: null,
                oOriup: null,
                oOriupTxt: null,
                preObj: {width: 0, height: 0},
                oriObj: null,
                scale: 0,
                loading: true,
                penSize: 10,
                isPaint: 0,//0无模式 1擦除 2复原,3移动
                downXy: {x: '', y: '',pxx:'',pxy:''},
                canXy:{x:'50%',y:'50%'},
                arcXy: {x: -100, y: -100},
                oDivContent: null,
                historyList:[],
                hisIdx:0,//当前状态的id
                pointList:[],
                setScale:0,
                clientH:document.documentElement.clientHeight*0.7,
                downSpace:false
            }
        },
        watch:{
            openScreen(){
                this.$nextTick(()=>{
                    this.oDivContent = document.querySelector( '.mleft .nowCans' ).getBoundingClientRect();
                })
            }
        },
        computed: {
            borderWh() {
                let w = this.initW * 4 * this.penSize / this.preObj.width,
                    h = this.initH * 4 * this.penSize / this.preObj.height;
                return {w, h}
            }
        },
        mounted() {
            console.log(111);
            [this.oPre, this.oOri, this.oOriup] = [document.getElementById( 'pre' ), document.getElementById( 'ori' ), document.getElementById( 'oriup' )];
            [this.oPreTxt, this.oOriTxt, this.oOriupTxt] = [this.oPre.getContext( '2d' ), this.oOri.getContext( '2d' ), this.oOriup.getContext( '2d' )];
            this.initallCans();
            document.addEventListener( 'mousemove', this.mouses );
            document.addEventListener( 'mouseup', this.ups );
            document.getElementById( 'content' ).addEventListener( 'wheel', this.wheelFun );
            document.addEventListener( 'keydown', (e) => {
                const keynum = window.event ? e.keyCode : e.which;
                if (keynum === 32) this.downSpace = true;
            } )
            document.addEventListener( 'keyup', (e) => {
                this.downSpace = false;
            } )
            this.initHis();
        },
        destroyed(){
            document.removeEventListener('mousemove',this.mouses)
            document.removeEventListener('mouseup',this.ups)
        },
        methods: {
            initHis(){
                if(this.edrieImgInfo.type===1){
                    this.pointList=JSON.parse(JSON.stringify(this.hisList))
                }
            },
            initallCans() {//初始化canvas
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    [this.oPre.width, this.oOri.width, this.oOriup.width] = [oImg.width, oImg.width, oImg.width];
                    [this.oPre.height, this.oOri.height, this.oOriup.height] = [oImg.height, oImg.height, oImg.height];
                    this.preObj = oImg;//预览图对象
                    this.scale = oImg.width / oImg.height;
                    if (oImg.width >= oImg.height) {
                        this.initW = oImg.width >= this.initnum ? this.initnum : oImg.width;
                        this.initH = oImg.width >= this.initnum ? this.initnum / this.scale : oImg.height;
                    } else {
                        this.initH = oImg.height >= this.initnum ? this.initnum : oImg.height;
                        this.initW = oImg.height >= this.initnum ? this.initnum * this.scale : oImg.width;
                    }
                    this.initOri();
                    this.oPreTxt.drawImage( oImg, 0, 0 );
                    this.initoriUp();
                    this.hisIdx=0;
                    this.historyList=[{
                        pre:this.oPreTxt.getImageData(0,0,this.oPre.width,this.oPre.height),
                        oriUp:this.oOriupTxt.getImageData(0,0,this.oOriup.width,this.oOriup.height),
                        id:this.hisIdx
                    }]
                    this.$nextTick(()=>{
                        this.oDivContent = document.querySelector( '.mleft .nowCans' ).getBoundingClientRect();
                    })
                }
                oImg.src = addUrlQuery(this.edrieImgInfo.pro);
            },
            initOri() {//加载原图
                let oImg = new Image();
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    this.oriObj = oImg;
                    this.oOriTxt.drawImage( oImg, 0, 0, this.oOri.width, this.oOri.height );
                    this.loading = false;
                };
                oImg.src = addUrlQuery(this.edrieImgInfo.ori);
            },
            initoriUp(){
                const [w,h]=[this.oPre.width,this.oPre.height];
                let imgData = this.oPreTxt.getImageData(0,0,this.oPre.width,this.oPre.height);
                for (let y = 0; y < h; y++) {
                    for (let x = 0; x < w; x++) {
                        let pixel = (y*w + x)*4;
                        // let luma = inputData[pixel]*0.3 + inputData[pixel+1]*0.59 + inputData[pixel+2]*0.11 + inputData[pixel+3]*0.11;
                        if(imgData.data[pixel + 3] != 0){
                            imgData.data[pixel]=238;
                            imgData.data[pixel+1]=73;
                            imgData.data[pixel+2]=112;
                        }
                    }
                }
                this.oOriupTxt.putImageData(imgData,0,0)
            },
            domain() {
                this.oPre.toBlob(bold=>{
                    let fromData=new FormData();
                    fromData.set('file',bold);
                    uploadossBg(fromData).then(res=>{
                        const data={
                            img:res.data,
                            hisList:this.pointList
                        }
                        this.$emit( 'close', data )
                    })
                })

            },
            toRepair(x, y) {//还原提取//每次操作都需要操作2个canvas  除了背景canvas除外的两个
                const list = [this.oPreTxt, this.oOriupTxt];
                list.map( (item, idx) => {
                    item.save();
                    item.fillStyle = '#EE4970';
                    item.beginPath();
                    item.arc( x, y, 2 * this.penSize, 0, Math.PI * 2, false );
                    item.clip();
                    if (!idx) item.drawImage( this.oriObj, 0, 0, this.preObj.width, this.preObj.height );
                    else item.fillRect( 0, 0, this.preObj.width, this.preObj.height )
                    item.restore();
                } )
            },
            toclear(x, y) {//擦除功能提取//每次操作都需要操作2个canvas  除了背景canvas除外的两个
                const list = [this.oPreTxt, this.oOriupTxt];
                list.map( item => {
                    item.save();
                    item.beginPath();
                    item.arc( x, y, 2 * this.penSize, 0, Math.PI * 2, false );//圆的半径我放大了两倍
                    //这步是根据点的位置  计算出 点在proCans上的位置 （相当于等比放大缩小）圆的半径也一样
                    item.clip();
                    item.clearRect( 0, 0, this.oPre.width, this.oPre.height );
                    item.restore();
                } )
            },
            initarcXy(x, y) {
                this.arcXy.x = x - this.borderWh.w / 2;
                this.arcXy.y = y - this.borderWh.h / 2;
            },
            downs(e,k) {
                const ev = e || window.event;
                this.oDivContent = document.querySelector( '.mleft .nowCans' ).getBoundingClientRect();
                this.downXy.x = (ev.clientX - this.oDivContent.left) * this.preObj.width / this.initW;//计算当前鼠标在原图上的位置
                this.downXy.y = (ev.clientY - this.oDivContent.top) * this.preObj.height / this.initH// 计算当前鼠标在原图上的位置，每次鼠标按下的位置
                this.downXy.pxx = ev.clientX - this.oDivContent.left;
                this.downXy.pxy = ev.clientY - this.oDivContent.top;
                this.downXy.ol = this.$refs.parseDiv.offsetLeft;
                this.downXy.ot = this.$refs.parseDiv.offsetTop;
                if(this.downSpace || k){
                    this.isPaint=3;
                    return;
                }
                this.isPaint = this.operationType ? 2 : 1;
                if (this.isPaint === 1) this.toclear( this.downXy.x, this.downXy.y )
                else if (this.isPaint === 2) this.toRepair( this.downXy.x, this.downXy.y )
                this.savepointList(this.downXy,1);
            },
            mouses(e) {
                const ev = e || window.event;
                let mouseXy = {
                    x: (ev.clientX - this.oDivContent.left) * this.preObj.width / this.initW,
                    y: (ev.clientY - this.oDivContent.top) * this.preObj.height / this.initH
                }
                if (this.isPaint === 1) this.toclear( mouseXy.x, mouseXy.y );
                else if (this.isPaint === 2) this.toRepair( mouseXy.x, mouseXy.y );
                if(this.isPaint === 3){
                    const oPares = document.querySelector( '.mleft' );
                    let cl, ct;
                    if ((this.downXy.ol + ev.clientX - this.oDivContent.left - this.downXy.pxx) > (oPares.offsetWidth)) cl = oPares.offsetWidth;//canvas不能超出视角50%  原canvas已transform:translate(-50%,-50%) 计算要注意
                    else if ((this.downXy.ol + ev.clientX - this.oDivContent.left - this.downXy.pxx) < 0) cl = 0;
                    else cl = this.downXy.ol + (ev.clientX - this.oDivContent.left - this.downXy.pxx);
                    if ((this.downXy.ot + ev.clientY - this.oDivContent.top - this.downXy.pxy) > (oPares.offsetHeight)) ct = oPares.offsetHeight;
                    else if ((this.downXy.ot + ev.clientY - this.oDivContent.top - this.downXy.pxy) < 0) ct = 0;
                    else ct = this.downXy.ot + (ev.clientY - this.oDivContent.top - this.downXy.pxy);
                    this.canXy.x=cl + 'px';
                    this.canXy.y=ct + 'px'
                    return
                }
                if(!this.isPaint)this.oDivContent = document.querySelector( '.mleft .nowCans' ).getBoundingClientRect();
                this.initarcXy( ev.clientX - this.oDivContent.left, ev.clientY - this.oDivContent.top );
                this.savepointList(mouseXy);
            },
            ups(e) {
                const ev = e || window.event;
                let upXy = {
                    x: (ev.clientX - this.oDivContent.left) * this.preObj.width / this.initW,
                    y: (ev.clientY - this.oDivContent.top) * this.preObj.height / this.initH
                }
                if (this.isPaint === 1) this.toclear( upXy.x, upXy.y );
                else if (this.isPaint === 2) this.toRepair( upXy.x, upXy.y );
                if([1,2].includes(this.isPaint)){
                    const idx=this.historyList.findIndex(item=>item.id===this.hisIdx);
                    if(idx!==this.historyList.length-1)this.historyList.splice(idx+1,this.historyList.length);
                    this.hisIdx=this.historyList[idx].id+1;
                    this.historyList.push({
                        pre:this.oPreTxt.getImageData(0,0,this.oPre.width,this.oPre.height),
                        oriUp:this.oOriupTxt.getImageData(0,0,this.oOriup.width,this.oOriup.height),
                        id:this.hisIdx
                    })
                    this.savepointList(upXy);
                }
                this.$nextTick(()=>{
                    this.oDivContent = document.querySelector( '.mleft .nowCans' ).getBoundingClientRect();
                })
                this.isPaint = 0;
            },
            setBack(k){//前进/后退
                let idx=this.historyList.findIndex(item=>item.id===this.hisIdx),nextIdx;
                if((!k && idx<1) || (k && idx===this.historyList.length-1))return;
                // this.oPreTxt.clearRect(0,0,this.preObj.width,this.preObj.height);
                // this.oOriupTxt.clearRect(0,0,this.preObj.width,this.preObj.height);
                nextIdx=k ? idx+1 : idx-1;
                this.oPreTxt.putImageData(this.historyList[nextIdx].pre,0,0);
                this.oOriupTxt.putImageData(this.historyList[nextIdx].oriUp,0,0);
                this.hisIdx=this.historyList[nextIdx].id;
                let ix=this.pointList.findIndex(item=>item.save),j;
                if (!k) {
                    j = findLastIdx( this.pointList, ix > -1 ? ix : this.pointList.length, (item, i) => item.node );//找到当前状态前上次操作开始点的下标
                    this.pointList[j].save = 1//此点变为当前状态点
                } else {
                    if (ix > -1) this.pointList[ix].save = 0;//前进时把当前状态改为0
                }
            },
            savepointList(point,k){//此时处理的是预览图，需要存处理过的点的位置和类型
                const w=this.oriMsg ? this.oriMsg.originalWidth : this.oriObj.width,h=this.oriMsg ? this.oriMsg.originalHeight : this.oriObj.height;
                const data={
                    x: point.x * w / this.preObj.width,//在原图中的x位置
                    y: point.y * h / this.preObj.height,//在原图中的y位置
                    type:this.isPaint,
                    node:k ? 1 : 0,
                    r:this.penSize*w / this.preObj.width,
                    save:0,//1为当前状态
                }
                if ([1, 2].includes( this.isPaint )) {//每次push记录前都要确保save为1点以及后面的删掉在push
                    const idx = this.pointList.findIndex( item => item.save );
                    if (idx > -1) this.pointList.splice( idx, this.pointList.length );
                    this.pointList.push( data )
                }
            },
            reset(){
                this.$confirm( `确定重置, 是否继续?`, '提示', {
                    showClose: false,
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                } ).then( () => {
                    this.loading=true;
                    this.canXy={x:'50%',y:'50%'};
                    this.initallCans();
                } ).catch( () => {

                } );
            },
            wheelFun(e) {//滚轮事件
                this.setScale = parseFloat( (this.initW / this.preObj.width).toFixed( 1 ) ) - 1;
                if (e.deltaY < 0 && this.setScale >= 1) return;
                if (e.deltaY > 0 && this.setScale <= -0.5) return;
                if (e.deltaY < 0) this.setScale = parseFloat( (this.setScale + 0.1).toFixed( 1 ) );//放大
                else this.setScale = parseFloat( (this.setScale - 0.1).toFixed( 1 ) );//放大
                this.initW = parseInt( this.preObj.width * (1 + this.setScale) );
                this.initH = parseInt( this.initW / this.scale );
                this.$nextTick(()=>{
                    this.oDivContent = document.querySelector( '.mleft .nowCans' ).getBoundingClientRect();
                    this.initarcXy( e.clientX - this.oDivContent.left, e.clientY - this.oDivContent.top );
                })
            },
        }
    }
</script>

<style scoped lang="scss">
    .matting {
        border-top: 1px solid #e9e9e9;
        position: relative;
        background-color: #fff;
        .screen{
            position: absolute;
            right: 32px;
            top: -65px;
            font-size: 16px;
        }
        .back{
            position: absolute;
            left: 50%;
            top: -65px;
            transform: translateX(-50%);
            font-size: 12px;
            color: #333;
            i{
                font-size: 16px;
            }
            .rotate{
                display: inline-block;
                transform: rotateY(180deg);
            }
            div{
                cursor: pointer;
            }
            div:nth-child(2){
                margin:0 15px;
            }
        }
        .topSet {
            padding: 10px 40px;
            border-bottom: 1px solid #e9e9e9;
            .el-button {
                border-color: $co;
                display: block;
                margin-left: auto;
                background-color: $co;
                color: #fff;
                line-height: 28px;
                height: 28px;
                padding: 0 8px;
            }
            .ships{
                color: #e82255;
                font-size: 12px;
                margin-left: auto;
            }
        }
        .mhe{
            /*height: 600px;*/
            overflow: hidden;
        }
        .mhs{
            max-height: 600px;
            min-height: 500px;
            overflow: hidden;
        }
        .btns {
            position: relative;
            font-size: 14px;
            color: #63686B;
            line-height: 28px;
            border: 1px solid #63686B;
            border-radius: 5px;

            span {
                width: 80px;
                text-align: center;
            }

            .active {
                color: #fff;
                background-color: #63686B;
            }
        }

        .silders {
            position: absolute;
            padding: 5px 10px;
            font-size: 12px;
            width: 100px;
            color: #666;
            box-shadow: 0 0 2px #333;
            line-height: 24px;
            left: 0;
            bottom: 0;
            z-index: 66;
            background-color: #fff;
            transform: translate(0, 110%);
        }

        .mleft {
            border-right: 1px solid #666;

            .nowCans {
                cursor: none;
            }
        }

        .mleft, .mright {
            flex: 1;
            padding: 40px 0;
            position: relative;
            overflow: hidden;
            .opacity {
                background-image: url("../../assets/opacity.jpg");
                background-size: cover;
                background-position: center;
                &:hover{
                    cursor: url("http://deeplor.oss-cn-hangzhou.aliyuncs.com/upload/image/20200803/35a4756d972544b9aca3959a99f04e20.png") ,auto;
                }
            }

            & > div {
                /*margin: 0 auto;*/
                position: absolute;
                transform: translate(-50%,-50%);
                overflow: hidden;

                canvas {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top: 0;
                }

                .bords {
                    position: absolute;
                    border-radius: 50%;
                    background-color: rgba(230, 48, 60, 0.6);
                    box-shadow: 0 0 10px rgba(18, 241, 6, 1) inset;
                }
            }
        }

    }
</style>
