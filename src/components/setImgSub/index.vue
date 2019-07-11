<template>
<!--  v-show="canvasShow && this.files.length<2"-->
  <div class=" flex j-b content">
    <i style="position: absolute;right: 10px;top: 10px;font-size: 24px;color: #999;" class="el-icon-close cu"
       @click="clearFile()"></i>
    <div class="left">
      <div class="img">
<!--        &lt;!&ndash;              <img :src="other" alt="" v-if="!backimgShow">&ndash;&gt; v-show="!backimgShow"-->
        <div style="position: relative;">
          <canvas id="hiddenCanvas" width="500" height="500">您的游览器不支持此功能，请换别的游览器试试...</canvas>
          <canvas id="hiddenCanvasTwo" width="500" height="500">您的游览器不支持此功能，请换别的游览器试试...</canvas>
          <canvas id="hiddenCanvasThree" :width="TwoW" :height="TwoH">您的游览器不支持此功能，请换别的游览器试试...</canvas>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="canvas" @mousedown="mouseDown($event)" @mousemove.prevent="moeseMove($event)"
           @mouseup="mouseUp($event)" :class="{'cours' : clearOrdraw===3}" :style="styleCours">
        <canvas id="cDown" width="500" height="500">您的游览器不支持此功能，请换别的游览器试试...</canvas>
        <canvas id="cUp" width="500" height="500">您的游览器不支持此功能，请换别的游览器试试...</canvas>
        <div class="border" v-show="borderShow"
             :style="{'top':borderLocal.y,'left':borderLocal.x,'width':borderLocal.width,'height': borderLocal.height}">
        </div>
      </div>
      <div class="btns clear">
        <span>前景</span>
        <div>
          <div class="cu btn" :class="{'active':clearOrdraw===1}" @click="clearOrdraw=1" slot="reference"><i
            class="icon iconfont icon-xiangpi"></i>擦除
          </div>
          <div class="cu btn" :class="{'active':clearOrdraw===2}" @click="clearOrdraw=2"><i
            class="icon iconfont icon-qianbi"></i>还原
          </div>
        </div>
        <div class="cu btn" :class="{'active':clearOrdraw===3}" @click="clearOrdraw=3"><i
          class="el-icon-rank"></i>移动
        </div>
        <div class="back">
          <div class="cu re" @click="backReset()"><i
            class="icon iconfont icon-chexiaofanhuichehuishangyibu"></i>撤回
          </div>
          <div class="cu re" @click="reset()"><i class="icon iconfont icon-zhongzhi"></i>复位</div>
        </div>
      </div>
      <div style="padding-left: 20px;line-height: 38px;" class="flex">
        <div style="width:200px;margin-right: 10px;">
          <el-slider v-model="eraserWidthSelect" tooltip-effect="light" :min="1" :max="20"
                     :show-tooltip="showThost"></el-slider>
        </div>
        <span>{{eraserWidthSelect}}px</span>
      </div>
      <div class="otherBtn flex a-i">
        <span>背景</span>
        <div v-for="(item,index) in color" :key="index" :style="backg" @click="choseBackColor(item,index)"
             class="cu" :class="{'bordershow' : index==choseBack}" v-if="index===0"></div>
        <div v-for="(item,index) in color" :key="index" :style="{'background':item }"
             @click="choseBackColor(item,index)" class="cu" :class="{'bordershow' : index==choseBack}"
             v-if="index!==0"></div>
        <!--              <el-button round icon="el-icon-more" size="mini" @click="choseColor()"></el-button>-->
        <span style="height: 28px;"><el-color-picker v-model="colorValue" size="mini" ref="colorS"
                                                     @change="choseColor()"
                                                     :class="{'bordershow': choseBack=='span'}"></el-color-picker></span>
      </div>
      <el-button type="primary" round icon="el-icon-download" style="width:160px;margin: 30px 0 0 150px;"
                 @click="save()">下载
      </el-button>
      <div style="position: absolute;top:60px; right: 6px;margin-right: 6px">
        <el-slider
          v-model="clunmValue"
          vertical
          :min="-400"
          :max="400"
          height="460px"
          :marks="marks"
          @change="changeClunmValue(0,0,1)">
        </el-slider>
      </div>
    </div>
  </div>
</template>

<script>
  import opacity from '@/assets/opacity.jpg'
  import { myBrowser } from "../../utils";
  import pen from'@/assets/image/pen.png'
  import ca from'@/assets/image/xiangpica.png'
  export default {
      name: "index",
      props:{
        imgMsg:Object
      },
      data(){
        return {
          imgMsgdata:[],
          marks: {
            0: {
              style: {
                color: '#1989FA'
              },
              label: this.$createElement('strong', '原点')
            }
          },
          historySet: [],//储存历史记录
          opacity: opacity,//默认透明背景
          showThost: false,
          borderShow: false,//鼠标圆圈显示
          borderLocal: {x: '', y: '', width: '', height: ''},//鼠标圆圈位置
          eraserWidthSelect: 5,//鼠标圆大小
          downOrup: false,//鼠标滑动变量
          mousedown: {x: '', y: ''},//鼠标按下位置记录
          lastLocal: {x: '', y: ''},//鼠标弹起位置
          // upOrCopy: true,//上传还是粘贴
          copyBackImg: '',//粘贴确认后返回的处理图片
          strokeWidth: 10,
          upLoading: false,
          color: ['rgba(255,255,255,0)', '#ffffff', '#eeeeee', '#5d5d5d'],
          colorValue: '#409EFF',
          back: {
            backgroundImage: "url(" + require("@/assets/btnback.png") + ")",
            backgroundRepeat: 'mo-repeat',
            backgroundSize: 'cover'
          },
          backg: {
            backgroundImage: "url(" + require("@/assets/opacity.jpg") + ")",
            backgroundRepeat: 'mo-repeat',
            backgroundSize: 'center'
          },
          cDown: '',//下层canvas
          cDownTxt: '',
          cUp: '',//上层canvas
          cUpTxt: '',
          hiddenCanvas: '',//左边原图canvas
          hiddenCanvasTxt: '',
          hiddenCanvasTwo: '',//左边隐藏原图canvas
          hiddenCanvasTwoTxt: '',
          hiddenCanvasThree: '',
          hiddenCanvasThreeTxt: '',
          TwoW: 500,
          TwoH: 500,
          clearOrdraw: 1,//擦除//复原//拖拽
          choseBack: 0,//选中的背景色
          upImgUrl: '',//上传图片链接http://deeplor.oss-cn-hangzhou.aliyuncs.com/matting2/2019/06/12/9fdf1a6c-a832-464a-b6b0-f6465996363e.png
          upImgUrlTwo: '',//上传图片链接(原图)
          // titleList: ['最热', '风景', '沙滩', '都市'],//背景图分类
          canveaContentW: 500,//画布内容宽高
          canveaContentH: 500,
          backImgW: 500,//背景图片大小
          backImgH: 500,
          clunmValue: 0,
          moveXY: {x: 0, y: 0},//拖拽偏移量
          moveXYTwo: {x: 0, y: 0},//放大后隐藏偏移量
          imgobj: {left: '', right: ''},
          // leftwhichcanvas: false,//普通模式//拖拽模式
          setImgOne: '',//模式一处理过后的图片储存
        }
      },
    computed:{
        styleCours(){
          if(this.clearOrdraw===1)return { cursor:`url(${ca}),auto`}
          else if(this.clearOrdraw===2) return { cursor:`url(${pen}),auto`}
          else return {}
        }
    },
      mounted(){
        this.hiddenCanvas = document.getElementById('hiddenCanvas')
        this.hiddenCanvasTxt = this.hiddenCanvas.getContext('2d')
        this.hiddenCanvasTwo = document.getElementById('hiddenCanvasTwo')
        this.hiddenCanvasTwoTxt = this.hiddenCanvasTwo.getContext('2d')
        this.hiddenCanvasThree = document.getElementById('hiddenCanvasThree')
        this.hiddenCanvasThreeTxt = this.hiddenCanvasThree.getContext('2d')
        this.cDown = document.getElementById('cDown')
        this.cDownTxt = this.cDown.getContext('2d')
        this.cUp = document.getElementById('cUp')
        this.cUpTxt = this.cUp.getContext('2d');
        this.initImgData()
        this.setImgInitialization()
      },
      methods:{
        initImgData(){
          let oldImgData = this.cUpTxt.getImageData(this.eraserWidthSelect, this.eraserWidthSelect, 2 * this.eraserWidthSelect, 2 * this.eraserWidthSelect)
          let oldImgData2 = this.hiddenCanvasTwoTxt.getImageData(this.eraserWidthSelect, this.eraserWidthSelect, 2 * this.eraserWidthSelect, 2 * this.eraserWidthSelect)
          let oldImgData3 = this.hiddenCanvasTxt.getImageData(this.eraserWidthSelect, this.eraserWidthSelect, 2 * this.eraserWidthSelect, 2 * this.eraserWidthSelect)
          let oldImgData4 = this.hiddenCanvasThreeTxt.getImageData(this.eraserWidthSelect, this.eraserWidthSelect, 2 * this.eraserWidthSelect, 2 * this.eraserWidthSelect)
        },
        initData() {//每次上传图片是初始化数据
          this.historySet = [];//储存历史记录
          // this.imgUrl='';
          this.setImgOne = '';
          this.imgobj = {left: '', right: ''};
          this.clearOrdraw = 1;
          this.moveXY = {x: 250 - this.canveaContentW / 2, y: 250 - this.canveaContentH / 2};
          this.clunmValue = 0;
          this.moveXYTwo = {x: 250 - this.canveaContentW / 2, y: 250 - this.canveaContentH / 2};
        },
        resetBImg() {//重置背景大小
          this.backImgW = 500//背景图片大小
          this.backImgH = 500
        },
        clearFile() {//关闭画布
          this.$emit('closeImgSet','')
        },
        choseColor() {//选择颜色背景
          this.choseBack = 'span'
          this.cDownTxt.clearRect(0, 0, this.cDown.width, this.cDown.height)
          this.cDownTxt.fillStyle = this.colorValue
          this.cDownTxt.fillRect(250 - this.canveaContentW / 2, 250 - this.canveaContentH / 2, this.canveaContentW, this.canveaContentH)
        },
        choseBackColor(color, index) {//纯色背景切换
          this.choseBack = index
          if (index == 0) {
            this.resetBImg();
            this.drawImg(this.opacity, [this.cDown], 0, 1);
            return
          }
          // this.clearCanvas()
          this.cDownTxt.clearRect(0, 0, this.cDown.width, this.cDown.height);
          this.cDownTxt.fillStyle = color;
          this.cDownTxt.fillRect(250 - this.canveaContentW / 2, 250 - this.canveaContentH / 2, this.canveaContentW, this.canveaContentH)
        },
        backReset() {//返回上一步
          let _self = this
          let x = this.moveXY.x
          let y = this.moveXY.y
          if (this.historySet.length > 0) {
            this.hiddenCanvasTwoTxt.clearRect(0, 0, this.hiddenCanvasTwo.width, this.hiddenCanvasTwo.height);
            this.hiddenCanvasTwoTxt.putImageData(this.historySet[this.historySet.length - 1], 250 - this.canveaContentW / 2, 250 - this.canveaContentH / 2);
            let url = this.initImg(1)
            let img = new Image()
            img.crossOrigin = ""
            img.src = url
            img.onload = function () {
              _self.cUpTxt.clearRect(0, 0, _self.cUp.width, _self.cUp.height);
              _self.cUpTxt.drawImage(img, x, y, _self.canveaContentW - _self.clunmValue, (_self.canveaContentW - _self.clunmValue) * _self.canveaContentH / _self.canveaContentW)
            }
            this.historySet.pop();
          } else {
            this.$message({
              message: '不能再继续撤回了',
              type: 'warning'
            })
          }
        },
        reset() {//重置
          this.initData()
          this.TwoW = 500
          this.TwoH = 500
          this.hiddenCanvasThreeTxt.clearRect(0, 0, this.TwoW, this.TwoH)
          let url = this.imgMsg.bgRemovedPreview;
          // if (this.upOrCopy) url = this.upImgUrl;
          // else url = this.copyBackImg;
          this.choseBack = 0;
          // this.clearOrdraw = 1;
          this.resetBImg();
          this.clearCanvas();
          this.drawImg(url, [this.cUp]);
          this.drawImg(url, [this.hiddenCanvasTwo]);
          this.drawImg(this.upImgUrlTwo, [this.hiddenCanvasThree]);
          this.drawImg(this.opacity, [this.cDown])
        },
        // 下载原图比例图
        downOldImg() {
          // let  _self=this
          let oImg = new Image();
          oImg.crossOrigin = "";
          oImg.onload = function () {
            let cans = document.createElement('canvas');
            let ctxs = cans.getContext('2d');
            cans.width = oImg.width;
            cans.height = oImg.height;
            ctxs.drawImage(oImg, 0, 0, cans.width, cans.height);
            let url = cans.toDataURL("image/png");
            let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
            save_link.href = url;
            save_link.download = 'test.png';
            let event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            save_link.dispatchEvent(event);
          }
          oImg.src = this.imgMsg.bgRemovedPreview
        },
        // //下载多张抠图
        // saveMove(){
        //   let arr=this.rightMove.filter((val,index)=>{
        //     return !val.status
        //   })
        //   this.StoreDowQrcode(arr)
        // },

        //批量下载图片
        // StoreDowQrcode(arr, blogTitle = "图片包") {
        //   var zip = new JSZip();
        //   var imgs = zip.folder(blogTitle);
        //   var baseList = [];
        //   var _this = this;
        //   for (var i = 0; i < arr.length; i++) {
        //     let name = arr[i].name; //图片名称
        //     let image = new Image();
        //     image.crossOrigin='';
        //     image.onload = function() {
        //       let canvas = document.createElement("canvas");
        //       canvas.width = image.width;
        //       canvas.height = image.height;
        //       let context = canvas.getContext("2d");
        //       context.drawImage(image, 0, 0, image.width, image.height);
        //       let url = canvas.toDataURL(); // 得到图片的base64编码数据 let url =
        //       canvas.toDataURL("image/png");
        //       baseList.push({ name: name, img: url.substring(22) });
        //       if (baseList.length === arr.length) {
        //         if (baseList.length > 0) {
        //           for (let k = 0; k < baseList.length; k++) {
        //             imgs.file(baseList[k].name + ".png", baseList[k].img, {
        //               base64: true
        //             });
        //           }
        //           zip.generateAsync({ type: "blob" }).then(function(content) {
        //             // see FileSaver.js
        //             FileSaver.saveAs(content, blogTitle + ".zip");
        //           });
        //         } else {
        //           _this.$message.error({
        //             title: "错误",
        //             message: "暂无图片可下载"
        //           });
        //         }
        //       }
        //     };
        //     image.src = arr[i].img;
        //   }
        // },
        save() {//保存下载
          // if (this.historySet.length <= 0 && this.choseBack == 0 && !this.clunmValue) {
          //   this.downOldImg()
          //   return
          // }
          let _self = this
          let can = document.createElement('canvas')
          can.width = this.canveaContentW
          can.height = this.canveaContentH
          let ctx = can.getContext('2d')
          if (this.choseBack !== 0) {
            let backData = this.cDownTxt.getImageData(250 - _self.canveaContentW / 2, 250 - _self.canveaContentH / 2, _self.canveaContentW, _self.canveaContentH)
            ctx.putImageData(backData, 0, 0)
            _self.saveTwo(can, ctx)
          } else {
            _self.saveTwo(can, ctx)
          }
        },
        saveTwo(can, ctx) {//保存方法提取
          let _self = this
          let can2 = document.createElement('canvas')
          can2.width = this.canveaContentW
          can2.height = this.canveaContentH
          let ctx2 = can2.getContext('2d')
          let upData = this.cUpTxt.getImageData(250 - _self.canveaContentW / 2, 250 - _self.canveaContentH / 2, _self.canveaContentW, _self.canveaContentH)
          ctx2.putImageData(upData, 0, 0)
          let dataURL = can2.toDataURL("image/png");
          let imgA = new Image()
          imgA.src = dataURL
          imgA.crossOrigin = ""
          imgA.onload = (e) => {
            ctx.drawImage(imgA, 0, 0, can.width, can.height)
            if(myBrowser()==='IE' || myBrowser()==='Edge'){//ie下载图片
              let url=can.msToBlob();
              let blobObj = new Blob([url]);
              window.navigator.msSaveOrOpenBlob(blobObj, 'test' + ".png");
            }else {
              let url = can.toDataURL("image/png");
              let save_link = document.createElement('a');
              // let event = new MouseEvent("click"); // 创建一个单击事件
              save_link.href = url;
              save_link.download = 'test.png';
              let event = document.createEvent('MouseEvents');
              event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
              save_link.dispatchEvent(event);
              // save_link.click()
            }
          }
        },
        clearCanvas(k) {//清除画布
          if (k) this.hiddenCanvasTxt.clearRect(0, 0, this.hiddenCanvas.width, this.hiddenCanvas.height)
          this.cUpTxt.clearRect(0, 0, this.cUp.width, this.cUp.height)
          this.cDownTxt.clearRect(0, 0, this.cUp.width, this.cUp.height)
          this.hiddenCanvasTwoTxt.clearRect(0, 0, this.hiddenCanvasTwo.width, this.hiddenCanvasTwo.height)
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
        drawImg(url, arr, close, clear) {//画图封装
          let _self = this;
          let image = new Image();
          image.crossOrigin = ""
          image.onload = function (ev) {
            arr.map((obj, index) => {
              if (obj == _self.cDown) {
                obj.getContext('2d').drawImage(image, _self.backImgW / 2 - _self.canveaContentW / 2, _self.backImgH / 2 - _self.canveaContentH / 2, _self.canveaContentW, _self.canveaContentH, 250 - _self.canveaContentW / 2, 250 - _self.canveaContentH / 2, _self.canveaContentW, _self.canveaContentH);
              } else obj.getContext('2d').drawImage(image, 250 - _self.canveaContentW / 2, 250 - _self.canveaContentH / 2, _self.canveaContentW, _self.canveaContentH);
            })
          }
          image.src = url
        },
        windowToCanvas(x, y) { //这个函数的作用是捕捉鼠标点在canvas上的坐标
          let bbox = this.cUp.getBoundingClientRect()
          return {
            x: x - bbox.left,
            y: y - bbox.top
          }
        },
        setImgInitialization(file, e) {//画图
          let _self = this
          console.log(_self.imgMsg)
          // _self.clearCanvas('all')
            let image = new Image()
            image.src = this.imgMsg.bgRemovedPreview
            image.onload = function () {
              let arrThis = [image.width, image.height]
              let bigOne = _self.fingBig(arrThis)
              if (bigOne == arrThis[0]) {
                if (bigOne > 500) {
                  image.height = 500 * image.height / image.width
                  image.width = 500
                }
              } else {
                if (bigOne > 500) {
                  image.width = 500 * image.width / image.height
                  image.height = 500
                }
              }
              _self.canveaContentW = image.width//画到画布上的位置
              _self.canveaContentH = image.height
              _self.drawImg(_self.imgMsg.original, [_self.hiddenCanvas])
              _self.drawImg(_self.imgMsg.bgRemovedPreview, [_self.hiddenCanvasTwo])//隐藏扣过的
              _self.drawImg(_self.imgMsg.original, [_self.hiddenCanvasThree])//隐藏原图的
              _self.upImgUrlTwo = _self.imgMsg.original
              _self.upImgUrl = _self.imgMsg.bgRemovedPreview
              _self.drawImg(_self.imgMsg.bgRemovedPreview, [_self.cUp], 'closeLoading')
              _self.drawImg(_self.opacity, [_self.cDown])
              _self.initData()//初始化数据
            }
            // } else _self.$message({message: res.data.msg, type: 'warning'});
        },
        //圆圈位置
        setLocal(e, key) {
          // let scrollTop=document.documentElement.scrollTop || document.body.scrollTop
          let loc = this.windowToCanvas(e.clientX, e.clientY)
          if (key) this.borderShow = true
          else this.borderShow = false
          this.borderLocal.width = 2 * this.eraserWidthSelect + 'px'
          this.borderLocal.height = 2 * this.eraserWidthSelect + 'px'
          this.borderLocal.x = (loc.x - this.eraserWidthSelect) + 'px'
          this.borderLocal.y = (loc.y - this.eraserWidthSelect) + 'px'
        },
        setImgData(obj,num,obj2){
          for(let i=0;i<obj2.data.length;i++){
            obj.data[(num-1)*4+i]=obj2.data[i]
          }
        },
        setImgDataNum(x, y, r, key,or) {//计算鼠标圆像素
          let  imgData=this.cUpTxt.createImageData(or,or);
          let num=0;
          for (let i = y - r; i < y + r; i++) {//计算离鼠标圆圆心的距离
            for (let j = x - r; j < x + r; j++) {
              num+=1;
              let radius = Math.sqrt((x - j) * (x - j) + (y - i) * (y - i));//坐标离鼠标的距离
              if (radius > r) {
                if (key === 1) this.setImgData(imgData,num,this.hiddenCanvasTwoTxt.getImageData(j, i, 1, 1));
                else  this.setImgData(imgData,num,this.cUpTxt.getImageData(j - this.moveXYTwo.x + this.moveXY.x, i - this.moveXYTwo.y + this.moveXY.y, 1, 1));
              } else {
                if (key === 1)  this.setImgData(imgData,num,this.hiddenCanvasTxt.getImageData(j, i, 1, 1));
                else this.setImgData(imgData,num,this.hiddenCanvasThreeTxt.getImageData(j, i, 1, 1));
              }
            }
          }
          return imgData
        },
        drawCri(x, y, z) {//复原状态填充
          let lx = (x - this.moveXY.x) / (this.canveaContentW - this.clunmValue) * this.canveaContentW;
          let ly = (y - this.moveXY.y) / ((this.canveaContentW - this.clunmValue) * this.canveaContentH / this.canveaContentW) * this.canveaContentH;
          let px = 250 - this.canveaContentW / 2;
          let py = 250 - this.canveaContentH / 2;
          let or = Math.round(this.eraserWidthSelect / (this.canveaContentW - this.clunmValue) * this.canveaContentW);
          let xx = Math.floor(lx + px);
          let yy = Math.floor(ly + py);
          let rightx = (x - this.moveXY.x) + this.moveXYTwo.x;
          let righty = (y - this.moveXY.y) + this.moveXYTwo.y;
          if (!z) {
            let dataArr2 = this.setImgDataNum(rightx, righty, this.eraserWidthSelect, 0,2 * this.eraserWidthSelect);
            this.cUpTxt.putImageData(dataArr2, x - this.eraserWidthSelect, y - this.eraserWidthSelect)
          } else {
            let dataArr = this.setImgDataNum(xx, yy, or, 1,2 * or);
            this.hiddenCanvasTwoTxt.putImageData(dataArr, xx - or, yy - or)
          }


        },
        drawrubber(x, y, z) {//绘制中心圆
          if (!z) {
            this.cUpTxt.beginPath();
            this.cUpTxt.arc(x, y, this.eraserWidthSelect, 0, Math.PI * 2, false);
            this.cUpTxt.clip();
          } else {
            let lx = (x - this.moveXY.x) / (this.canveaContentW - this.clunmValue) * this.canveaContentW
            let ly = (y - this.moveXY.y) / ((this.canveaContentW - this.clunmValue) * this.canveaContentH / this.canveaContentW) * this.canveaContentH
            let px = 250 - this.canveaContentW / 2
            let py = 250 - this.canveaContentH / 2
            let o = Math.sqrt((this.canveaContentW * this.canveaContentH * this.eraserWidthSelect * this.eraserWidthSelect) / ((this.canveaContentW - this.clunmValue) * ((this.canveaContentW - this.clunmValue) * this.canveaContentH / this.canveaContentW)))
            let xx = lx + px;
            let yy = ly + py;
            this.hiddenCanvasTwoTxt.beginPath();
            this.hiddenCanvasTwoTxt.arc(xx, yy, o, 0, Math.PI * 2, false);
            this.hiddenCanvasTwoTxt.clip()
          }
        },
        drawGrid(key) { //这个函数的作用是填充进橡皮擦的剪辑区域
          if (key === 1) this.cUpTxt.clearRect(0, 0, this.cUp.width, this.cUp.height);
          else this.hiddenCanvasTwoTxt.clearRect(0, 0, this.hiddenCanvasTwo.width, this.hiddenCanvasTwo.height);
        },
        mouseDown(e) {
          if (this.clearOrdraw !== 3) this.historySet.push(this.hiddenCanvasTwoTxt.getImageData(250 - this.canveaContentW / 2, 250 - this.canveaContentH / 2, this.canveaContentW, this.canveaContentH));
          let loc = this.windowToCanvas(e.clientX, e.clientY);
          this.mousedown.x = loc.x//画布中鼠标x坐标
          this.mousedown.y = loc.y//画布中鼠标y坐标
          this.lastLocal.x = loc.x
          this.lastLocal.y = loc.y
          this.downOrup = true
          // context.save()
          this.setLocal(e, 1)
        },
        moeseMove(e) {
          if (this.downOrup) {
            this.setLocal(e, 1)
            let loc = this.windowToCanvas(e.clientX, e.clientY)
            if (this.clearOrdraw === 2) { //如果复原状态
              this.cUpTxt.save()//保存当前画布状态
              this.drawCri(loc.x, loc.y)
              this.cUpTxt.restore()//恢复画布之前状态
              this.hiddenCanvasTwoTxt.save()//保存当前画布状态
              this.drawCri(loc.x, loc.y, 1)
              this.hiddenCanvasTwoTxt.restore()//恢复画布之前状态
            } else if (this.clearOrdraw === 1) { //如果是橡皮擦状态
              this.cUpTxt.save()//保存当前画布状态
              this.drawrubber(loc.x, loc.y)//绘制鼠标中心圆
              this.drawGrid(1)//填充中心圆
              this.cUpTxt.restore()//恢复画布之前状态
              //
              this.hiddenCanvasTwoTxt.save()//保存当前画布状态
              this.drawrubber(loc.x, loc.y, 'Two')//绘制鼠标中心圆
              this.drawGrid(2)//填充中心圆
              this.hiddenCanvasTwoTxt.restore()//恢复画布之前状态
            } else {//移动状态
              let x = loc.x - this.mousedown.x;
              let y = loc.y - this.mousedown.y;
              this.changeMoveValue(x, y)
            }
          }
        },
        mouseUp(e) {
          this.downOrup = false;
          let loc = this.windowToCanvas(e.clientX, e.clientY)
          if (this.clearOrdraw === 2) {
            this.lastLocal.x = loc.x;
            this.lastLocal.y = loc.y;
            // restoreDrawingSurface()
            this.drawCri(this.lastLocal.x, this.lastLocal.y)
            this.drawCri(this.lastLocal.x, this.lastLocal.y, 1)
          } else if (this.clearOrdraw === 1) {
            this.cUpTxt.save()
            this.drawrubber(loc.x, loc.y)
            this.drawGrid(1)
            this.cUpTxt.restore()
            //
            this.hiddenCanvasTwoTxt.save()//保存当前画布状态
            this.drawrubber(loc.x, loc.y, 'Two')//绘制鼠标中心圆
            this.drawGrid(2)//填充中心圆
            this.hiddenCanvasTwoTxt.restore()//恢复画布之前状态
          } else {
            let x = loc.x - this.mousedown.x;
            let y = loc.y - this.mousedown.y;
            let _self = this
            if (this.moveXY.x === 0 || this.moveXY.y === 0) {
              this.moveXY = {
                x: 250 - ((this.canveaContentW - this.clunmValue) / 2) + x,
                y: 250 - (((this.canveaContentW - this.clunmValue) * (this.canveaContentH)) / this.canveaContentW / 2) + y
              }
            } else this.moveXY = {x: this.moveXY.x + x, y: this.moveXY.y + y}
            this.imgobj.right = ''
          }
          // restoreDrawingSurface()
          this.setLocal(e)
        },
        changeClunmValue(x = 0, y = 0, z) {
          this.initImg();
          let _self = this;
          let num = this.clunmValue;
          let xx, yy;
          xx = 250 - ((_self.canveaContentW - num) / 2) + x;
          yy = 250 - (((_self.canveaContentW - num) * (_self.canveaContentH)) / _self.canveaContentW / 2) + y;
          this.moveXY = {x: xx, y: yy};
          _self.cUpTxt.clearRect(0, 0, _self.cUp.width, _self.cUp.height);
          let image = new Image();
          image.crossOrigin = "";
          image.src = this.setImgOne;
          image.onload = function (ev) {
            _self.cUpTxt.drawImage(image, xx, yy, _self.canveaContentW - num, ((_self.canveaContentW - num) * (_self.canveaContentH)) / _self.canveaContentW);
          }
          ////////
          _self.hiddenCanvasThreeTxt.clearRect(0, 0, _self.hiddenCanvasThree.width, _self.hiddenCanvasThree.height)
          let w = 500 * (_self.canveaContentW - num) / _self.canveaContentW
          _self.TwoW = w
          _self.TwoH = w
          _self.moveXYTwo = {
            x: w / 2 - (_self.canveaContentW - num) / 2,
            y: w / 2 - (((_self.canveaContentW - num) * (_self.canveaContentH)) / _self.canveaContentW / 2)
          }
          let imageleft = new Image();
          imageleft.crossOrigin = "";
          imageleft.src = this.upImgUrlTwo;
          imageleft.onload = function (ev) {
            _self.hiddenCanvasThreeTxt.drawImage(imageleft, _self.moveXYTwo.x, _self.moveXYTwo.y, _self.canveaContentW - num, ((_self.canveaContentW - num) * (_self.canveaContentH)) / _self.canveaContentW);
          }
          this.initImgData()
        },
        changeMoveValue(x, y) {
          let _self = this
          let num = this.clunmValue
          let xx, yy;
          if (_self.moveXY.x === 0 || _self.moveXY.y === 0) {
            xx = 250 - ((_self.canveaContentW - num) / 2) + x;
            yy = 250 - (((_self.canveaContentW - num) * (_self.canveaContentH)) / _self.canveaContentW / 2) + y;
          } else {
            xx = _self.moveXY.x + x;
            yy = _self.moveXY.y + y;
          }
          _self.cUpTxt.clearRect(0, 0, _self.cUp.width, _self.cUp.height);
          if (this.imgobj.right) {//this.imgobj.left &&
            _self.cUpTxt.drawImage(this.imgobj.right, xx, yy, _self.canveaContentW - num, ((_self.canveaContentW - num) * (_self.canveaContentH)) / _self.canveaContentW);
          } else {
            this.initImg()
            let image = new Image();
            image.crossOrigin = "";
            image.src = this.setImgOne
            image.onload = function (ev) {
              _self.imgobj.right = image
              _self.cUpTxt.drawImage(image, xx, yy, _self.canveaContentW - num, ((_self.canveaContentW - num) * (_self.canveaContentH)) / _self.canveaContentW);
            }
          }
          this.initImgData()
        },
        initImg(x) {//每次拖拽或放大缩小都操作左边隐藏的图
          let can2 = document.createElement('canvas');
          can2.width = this.canveaContentW;
          can2.height = this.canveaContentH;
          let ctx2 = can2.getContext('2d');
          let upData = this.hiddenCanvasTwoTxt.getImageData(250 - this.canveaContentW / 2, 250 - this.canveaContentH / 2, this.canveaContentW, this.canveaContentH);
          ctx2.putImageData(upData, 0, 0);
          if (x) return can2.toDataURL("image/png");
          else this.setImgOne = can2.toDataURL("image/png");
        },
      }
    }
</script>

<style scoped lang="scss">
  .content {
    background-color: #ffffff;
    padding:20px 40px;
    border-radius: 15px;
    /*margin-bottom: 80px;*/
     width: 1200px;
     position: fixed;
     top: 50%;
     left: 50%;
     margin: -400px 0 0 -600px;
    canvas{
      border-radius: 15px;
    }
    & > div {
      width: 500px;
      border-radius: 8px;
      /*overflow: hidden;*/
    }
    .right {
      margin-right: 10px;
      .otherBtn {
        font-size: 12px;
        line-height: 28px;
        color: #b4b4b4;
        justify-content: flex-start;
        margin: 0;
        & > span {
          margin-right: 16px;
        }

        .bordershow.cu {
          border: 1px solid #26adf5;
        }

        .bordershow .el-color-picker__trigger {
          border-color: #26adf5;
        }

        & > div {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 1px solid #c7c7c7;
          margin-right: 8px;
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

      .btns {
        font-size: 12px;
        line-height: 28px;
        height: 30px;
        color: #b4b4b4;

        & > div, & .btn, & .re {
          display: inline-block;
        }

        & > span {
          margin-right: 16px;
        }

        .btn {
          width: 72px;
          text-align: center;
          border: 1px solid #dcdcdc;
          border-radius: 15px;
          justify-content: center;
          margin-right: 12px;

          i {
            margin-right: 8px;
            font-size: 12px;
            font-weight: 600;
          }
        }

        .active {
          background-color: #26adf5;
          color: #fff;
        }

        div.back {
          float: right;
          margin-right: 10px;
        }

        .re:first-child {
          margin-right: 15px;
        }

        .re i {
          font-weight: 600;
          margin-right: 5px;
        }
      }

      .canvas {
        position: relative;
        width: 500px;
        height: 500px;
        margin-bottom: 16px;

        #cUp {
          z-index: 99;
        }

        canvas {
          position: absolute;
          top: 0;
          left: 0;
        }
      }

      .cours {
        cursor: all-scroll;
      }
    }

    .imgList {
      .j-b {
        font-size: 18px;
        line-height: 40px;
        color: #000;
        margin-bottom: 20px;
      }

      .titleList {
        font-size: 12px;
        line-height: 30px;
        color: #333333;
        border-bottom: 1px solid #b4b4b4;

        .active {
          color: #26adf5;
          border-bottom: 2px solid #26adf5;
        }

        span {
          height: 30px;
          display: inline-block;
          margin-right: 50px;
        }
      }

      .imgAll {
        padding: 20px 20px 0 0;
        flex-wrap: wrap;
        height: 400px;
        overflow-y: auto;

        img {
          width: 100px;
          height: 100px;
          margin: 0 15px 15px 0;
          border-radius: 10px;
        }
      }
    }
  }
  .border {
    position: absolute;
    border: 1px solid red;
    left: 0;
    top: 0;
    border-radius: 50%;
    z-index: 100;
  }
  #hiddenCanvas {
    position: relative;
    z-index: 111;
    background-color: #ffffff;
  }

  #hiddenCanvasTwo, #hiddenCanvasThree {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    /*background-color: #ffffff;*/
  }

  #hiddenCanvasThree {
    z-index: 99;
    visibility: hidden;
  }
  div.propeo, .el-popover, .el-popper[x-placement^=bottom] {
    padding: 0 !important;
  }
</style>
