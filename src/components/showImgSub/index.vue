<template>
    <div class="showImgOut">
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
                    <div class="bg_img flex" v-show="showBgList">
                        <div class="title flex a-i">
                            <h4>背景图片</h4>
                            <input type="file" name="file" accept="image/*" :multiple="false" ref="selfImg"
                                   @change="changeselfImg" style="display: none;">
                            <el-button round icon="el-icon-upload2"
                                       style="margin-left:30px;width:120px;font-size: 12px;line-height: 28px;border-color: #e82255;padding: 0 8px;color: #e82255;"
                                       @click="upselfImg">自定义背景
                            </el-button>
                            <i class="el-icon-close cu" style="right: 0;" @click="showBgList=false"></i>
                        </div>
                        <div class="flex bgType a-i">
                            <span class="cu" v-for="(item,idx) in bgclass" :key="idx" :class="{active : bgType===idx}"
                                  @click="changeBgType(idx)">{{item}}</span>
                        </div>
                        <div class="flex a-i bgimgs f-w">
                            <div v-for="(item,idx) in oneItemBg" :key="idx" class="cu"
                                 :class="{active : selectIdx===idx}" @click="selectBg(item,idx)">
                                <img :src="item" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <!--                        <img :src="bgOriginal.img" alt="">-->
                    <div v-show="bgOriginal.status===0" :style="backg" class="activeDiv" ref="activeImg"
                         @mousedown="down">
                        <canvas :id="'canvas'+ramdId">当前游览器不支持此功能，换一个试试吧！</canvas>
                        <canvas :id="'canvas'+index" class="bgss">当前游览器不支持此功能，换一个试试吧！</canvas>
                        <div class="img" ref="oIImg" :style="{backgroundImage:`url(${scale})`}"
                             v-show="!canDown && choseBack==='bg'">
                            <!--                            <img src="../../assets/image/scale.png" alt="" style="border-radius: 0">-->
                        </div>
                        <img src="../../assets/image/mmmmm.png" alt="" ref="mmmmm"
                             v-show="choseBack==='bg' && initfirst">
                    </div>
                    <div v-show="bgOriginal.status===1" class="errmsg">
                        <i class="el-icon-circle-close"></i>
                        这张图片当前不支持，不能识别前景
                        <!--                        Error occured, the foreground can not be recognized-->
                        <p>
                            请选择一个有明确区分前景和背景的图片。例如:试着一个人的照片，产品、动物、汽车或另一个对象
                            <!--                        	Try picture that contains person, more categories will be supported in future-->
                        </p>
                    </div>
                    <div v-show="[3,4].includes(bgOriginal.status)" class="errmsg">
                        <i class="el-icon-circle-close"></i>
                        {{this.bgOriginal.status===3 ? '网络出现中断，请重试' : '次数受限'}}
                        <!--                        Error occured, the foreground can not be recognized-->
                        <p>
                            {{this.bgOriginal.status===3 ? '请选择一个不超过15M的图片进行处理' : '未登录使用次数已达上限，'}}<br>
                            <span v-show="bgOriginal.status===4">请 <span @click="showLoginDilogAction" class="cu"
                                                                      style="color: #e82255">登录</span> 后继续操作！</span>
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
                    <div class="close flex" v-show="![0,1,2,3,4 ].includes(bgOriginal.status)">
                        <i class="el-icon-loading"></i>
                        处理中...
                        <!--                        Processing...-->
                    </div>
                    <div class="otherBtn flex a-i" v-if="bgOriginal.img && type!==3">
                        <span><!--Background-->背景</span>
                        <div v-for="(items,indexs) in color" :key="indexs"
                             @click.stop="choseBackColor(items,indexs)"
                             class="cu" :class="{'bordershow' : indexs==choseBack}">
                            <div class="flex color_List" v-show="showcolorList && indexs===1">
                                <span v-for="(color,idx) in colorList" :key="idx" :style="{backgroundColor:color}"
                                      @click.stop="choseColor(color)"></span>
                            </div>
                            <img :src="items" alt=""
                                 style="position: absolute;left: 0;top: 0;width: 28px;height: 28px;border-radius: 50%;"
                                 :title="indexs | imgtitle">
                        </div>
                        <span class="el-icon-picture-outline cu bg_img" @click="showBgList=!showBgList"
                              :class="{'bordershow': choseBack=='bg'}">更换背景</span>
                        <i class="el-icon-more cu"
                           style="font-size: 28px;color: #999;position: relative;margin-left: auto;">
                            <el-checkbox v-model="offNo" style="position: absolute;top: 100%;left: -200%;"
                                         @change="setInitStatus">设置为默认背景
                            </el-checkbox>
                        </i>
                        <!--                        <el-button type="primary" icon="el-icon-edit" circle style="background-color: #27adf6;border-color: #27adf6;margin: 0 70px 0 60px" size="small" @click="updataThis()"></el-button>-->
                    </div>
                    <div class="flex">
                        <down-btn v-if="bgOriginal.img" :imageMsg="imageMsg" @edireThis="edireThis" @save="save"
                                  :type="1" :mattingType="type ? type : 1"></down-btn>
                        <down-btn v-if="bgOriginal.img" :imageMsg="imageMsg" @edireThis="edireThis" @save="save"
                                  :type="1" down :mattingType="type ? type : 1"></down-btn>
                    </div>
                    <loading-sub text="为了更好的高清边缘细节，我们正在努力为你处理中" v-if="showLoading" color="#e82255"></loading-sub>
                </div>
            </div>
        </div>
        <!--        <span id="s_tag" ref="s_tag" v-show="showTag" :class="{'active' : showTag}">-1</span>-->
    </div>
</template>

<script>
    import scale from '../../assets/image/scale.png'
    import opacity from '@/assets/opacity.jpg'
    import {uploadImgApi, downloadMattedImage, getMattingInfo, copyUpload, uploadossBg} from "../../apis";
    import {myBrowser, getrandom} from "../../utils";
    import {getToken} from "../../utils/auth";
    import JSManipulate from '../../utils/jsmanipulate.js'
    import {mapGetters,mapActions} from 'vuex'
    import {mixins} from '@/minxins'
    import downBtn from '../downLoadBtn'
    import loadingSub from '../loadingSub'

    export default {
        name: "imgsub",
        props: {
            files: Object,
            index: Number,
            type: Number
        },
        mixins: [mixins],
        data() {
            return {
                offNo: false,
                scale,
                opacity,
                imageMUrl: '',//原图
                imageMsg: {},
                Original: '',
                bgOriginal: {},
                colorValue: '',
                backg: {
                    backgroundImage: "url(" + opacity + ")",
                    backgroundRepeat: 'mo-repeat',
                    backgroundSize: 'center'
                },
                choseBack: 0,
                timer: null,
                fileId: '',
                imgname: '',//下载的图片名称
                filename: '',//下载的图片名称
                file: null,
                canvas: '',
                bgcanvas: '',
                canvasText: '',
                bgcanvasText: '',
                canveaContentW: 500,
                canveaContentH: 500,
                ramdId: Math.random(),
                canvasinitNum: '',
                loadImg: '',
                subs: 0,
                bgclass: ['摄影', '手绘', '颜色'],
                showBgList: false,
                bgType: 0,
                selectIdx: -1,
                bgobj: '',
                selfImg: '',//自定义上传背景对象
                selfimgurl: '',//自定义背景链接
                showcolorList: false,//显示色板
                canDown: false,//移动开关
                btnDown: false,//放大缩小开关
                Offsetxy: {x: 0, y: 0},//偏移量坐标
                downxy: {x: 0, y: 0},//鼠标按下坐标
                initwh: {w: 0, h: 0},//缩放后的图片大小
                oCantl: {},
                oDDiv: '',
                oIImg: '',
                initfirst: true,
                showLoading: false
            }
        },
        watch: {
            bgOriginal(newval, oldval) {
                if (newval.img) {
                    // this.$nextTick(()=>{
                    this.drameImg( newval.img )
                    // })
                }
            },
            initStatusResult: {
                handler(n, o) {
                    this.offNo = this.seleceStatus//检测状态
                },
                immediate: true,//初始化执行一次
            }
        },
        components: {
            downBtn, loadingSub
        },
        computed: {
            ...mapGetters( [
                'initStatusResult', 'userSubscribeData'
            ] ),
            seleceStatus() {
                const nowStatus = this.initStatusResult;
                if (!nowStatus) return false;
                if (nowStatus.type === this.choseBack && nowStatus.type !== 4 && nowStatus.type !== 1) return true;
                else if (nowStatus.type === this.choseBack && nowStatus.type === 2 && nowStatus.value === this.colorValue) return true;
                else if (nowStatus.type === 4 && this.choseBack === 'bg' && Array.isArray( nowStatus.value ) && nowStatus.value[0] === this.bgType && nowStatus.value[1] === this.selectIdx) return true;
                else if (nowStatus.type === 4 && this.choseBack === 'bg' && !Array.isArray( nowStatus.value ) && nowStatus.value === this.selfimgurl) return true;
                else if (nowStatus.type === this.choseBack && nowStatus.type === 1 && nowStatus.value === this.colorValue) return true;
                else return false;
            }
        },
        created() {
            // this.initsub()
        },
        mounted() {
            let windowW = document.documentElement.clientWidth
            if (windowW > 1500) this.canvasinitNum = 500
            else this.canvasinitNum = 380
            this.file = this.files.url;
            this.filename = this.files.filename
            if (this.files.type === 'copy') {
                this.imgname = `copy_${getrandom( 0, 1000000000 )}`;
                this.getImgMsgByurl()
            } else {
                this.imgname = this.file.name.substring( 0, this.file.name.lastIndexOf( '.' ) );
                this.getImgData()
            }
            document.addEventListener( 'click', () => {
                this.showcolorList = false
            } )
            this.oDDiv = this.$refs.activeImg
            this.oIImg = this.$refs.oIImg
            document.addEventListener( 'mousemove', this.moves )
            document.addEventListener( 'mouseup', this.ups )
        },
        methods: {
            ...mapActions(['showLoginDilogAction']),
            setInitStatus(e) {//s设置初始化状态
                let sObj = {
                    type: this.choseBack === 'bg' ? 4 : this.choseBack
                }
                if (sObj.type === 1 && this.colorValue) sObj.value = this.colorValue
                else if (sObj.type === 4 && this.selectIdx > -1) sObj.value = [this.bgType, this.selectIdx]
                else if (sObj.type === 4 && this.selfImg) sObj.value = this.selfimgurl
                if (this.offNo) {
                    localStorage.setItem( 'initStatus', JSON.stringify( sObj ) )
                    this.$store.commit( 'SET_INIT_STATUS', sObj )
                } else {
                    localStorage.removeItem( 'initStatus' )
                    this.$store.commit( 'SET_INIT_STATUS', '' )
                }
            },
            initsetwh(movexy) {//缩放后重置dx,dy,initw.inith
                let afterw, zoom = movexy.x - this.downxy.x > 0;
                if (zoom) afterw = this.initwh.w + movexy.x - this.downxy.x//变化后宽度
                else afterw = this.initwh.w - Math.abs( movexy.x - this.downxy.x )//变化后宽度
                const [w, h] = [afterw, afterw * this.initwh.h / this.initwh.w]//缩放后宽//缩放后高
                return [w, h]

            },
            dropMove(x, y) {//移动提取
                let initw, inith
                this.canvasText.clearRect( 0, 0, this.canveaContentW, this.canveaContentH )
                if ((this.Offsetxy.x + x) > (this.canveaContentW - this.initwh.w / 2)) initw = this.canveaContentW - this.initwh.w / 2;
                else if ((this.Offsetxy.x + x) < -(this.initwh.w / 2)) initw = -(this.initwh.w / 2);
                else initw = this.Offsetxy.x + x;
                if ((this.Offsetxy.y + y) > (this.canveaContentH - this.initwh.h / 2)) inith = this.canveaContentH - this.initwh.h / 2;
                else if ((this.Offsetxy.y + y) < -(this.initwh.h / 2)) inith = -this.initwh.h / 2;
                else inith = this.Offsetxy.y + y;
                this.canvasText.drawImage( this.loadImg, initw, inith, this.initwh.w, this.initwh.h )
            },
            initfour(x, y) {//计算鼠标是否再四个角范围内
                const alldian = [[(this.Offsetxy.x + this.initwh.w) * this.oDDiv.offsetWidth / this.canveaContentW - 26, this.Offsetxy.y * this.oDDiv.offsetHeight / this.canveaContentH], [(this.Offsetxy.x + this.initwh.w) * this.oDDiv.offsetWidth / this.canveaContentW, this.Offsetxy.y * this.oDDiv.offsetHeight / this.canveaContentH + 26]];
                let result = false;
                for (let k in alldian) {
                    if (x >= alldian[0][0] && x <= alldian[1][0] && y >= alldian[0][1] && y <= alldian[1][1]) {
                        result = true
                        break
                    }
                }
                return result
            },
            initborder(x = 0, y = 0, w, h) {//周边虚线和四个角
                const [tw, th] = [w ? w : this.initwh.w, h ? h : this.initwh.h]
                this.oIImg.style.left = (this.Offsetxy.x + tw + x) * this.oDDiv.offsetWidth / this.canveaContentW - 26 + 'px'
                this.oIImg.style.top = (this.Offsetxy.y + y) * this.oDDiv.offsetHeight / this.canveaContentH + 'px'
                this.canvasText.beginPath()
                this.canvasText.setLineDash( [5, 5] );
                this.canvasText.lineWidth = 5;
                this.canvasText.strokeStyle = '#fff'
                this.canvasText.rect( this.Offsetxy.x + x, this.Offsetxy.y + y, tw, th )
                this.canvasText.stroke()
            },
            down(e) {//鼠标按下
                if (this.choseBack !== 'bg') return;
                this.initfirst = false;
                const ev = e || window.event;
                this.oCantl = document.getElementById( `canvas${this.ramdId}` ).getBoundingClientRect()
                this.downxy = {
                    x: (ev.clientX - this.oCantl.left) * this.canveaContentW / this.oDDiv.offsetWidth,
                    y: (ev.clientY - this.oCantl.top) * this.canveaContentH / this.oDDiv.offsetHeight
                }//每次鼠标按下的位置
                const bigit = this.canvasText.isPointInPath( this.downxy.x, this.downxy.y ),
                    smallit = this.initfour( ev.clientX - this.oCantl.left, ev.clientY - this.oCantl.top );
                if (!smallit && bigit) {
                    this.canDown = true
                    // imgData=ctx.getImageData(dx,dy,initw,inith)
                } else if (smallit) {
                    this.btnDown = true;
                    // const fPint = {//鼠标所在的斜对面的点
                    //     lt: [dx + oImgObj.width, dy + oImgObj.height],
                    //     rt: [dx, dy + oImgObj.height],
                    //     lb: [dx + oImgObj.width, dy],
                    //     rb: [dx, dy]
                    // }
                    // fixedPinat = fPint[smallit.v]//放大缩小时的固定点坐标
                }
            },
            ups(e) {//鼠标弹起
                if (this.choseBack !== 'bg') return;
                const ev = e || window.event;
                const upxy = {
                    x: (ev.clientX - this.oCantl.left) * this.canveaContentW / this.oDDiv.offsetWidth,
                    y: (ev.clientY - this.oCantl.top) * this.canveaContentH / this.oDDiv.offsetHeight
                }
                if (this.canDown) {
                    this.canDown = false
                    let initw, inith
                    if ((this.Offsetxy.x + upxy.x - this.downxy.x) > (this.canveaContentW - this.initwh.w / 2)) initw = this.canveaContentW - this.initwh.w / 2;
                    else if ((this.Offsetxy.x + upxy.x - this.downxy.x) < -(this.initwh.w / 2)) initw = -(this.initwh.w / 2);
                    else initw = this.Offsetxy.x + upxy.x - this.downxy.x;
                    if ((this.Offsetxy.y + upxy.y - this.downxy.y) > (this.canveaContentH - this.initwh.h / 2)) inith = this.canveaContentH - this.initwh.h / 2;
                    else if ((this.Offsetxy.y + upxy.y - this.downxy.y) < -(this.initwh.h / 2)) inith = -this.initwh.h / 2;
                    else inith = this.Offsetxy.y + (upxy.y - this.downxy.y);
                    this.Offsetxy.x = initw;
                    this.Offsetxy.y = inith;
                    this.initborder( 0, 0 )
                } else if (this.btnDown) {
                    this.btnDown = false
                    const zoom = upxy.x - this.downxy.x > 0;
                    const [w, h] = this.initsetwh( upxy );
                    // if (zoom) {
                    this.Offsetxy.y = this.Offsetxy.y - h + this.initwh.h
                    // } else this.Offsetxy.y = this.Offsetxy.y + Math.abs( h - this.initwh.h );
                    this.initwh.w = w;
                    this.initwh.h = h;
                }
            },
            moves(e) {//鼠标移动
                if (this.choseBack !== 'bg') return;
                const ev = e || window.event;
                const movexy = {
                    x: (ev.clientX - this.oCantl.left) * this.canveaContentW / this.oDDiv.offsetWidth,
                    y: (ev.clientY - this.oCantl.top) * this.canveaContentH / this.oDDiv.offsetHeight
                }
                if (this.canDown) {//移动时开关
                    const x = movexy.x - this.downxy.x, y = movexy.y - this.downxy.y;
                    this.dropMove( x, y )
                }
                if (this.btnDown) {//放大缩小时开关
                    let afterw, zoom = movexy.x - this.downxy.x > 0;
                    if (zoom) {
                        afterw = this.initwh.w + (movexy.x - this.downxy.x)//变化后宽度
                    } else afterw = this.initwh.w - Math.abs( movexy.x - this.downxy.x )//变化后宽度
                    const [w, h] = [afterw, afterw * this.initwh.h / this.initwh.w]//缩放后宽//缩放后高
                    this.canvasText.clearRect( 0, 0, this.canveaContentW, this.canveaContentH )
                    this.canvasText.drawImage( this.loadImg, this.Offsetxy.x, this.Offsetxy.y - h + this.initwh.h, w, h )
                    this.initborder( 0, -(h - this.initwh.h), w, h )
                }
            },
            changeselfImg(e, k) {
                if (this.choseBack !== 'bg') this.clearBefor();
                this.selectIdx = -1;
                this.choseBack = 'bg';
                if (k) {
                    this.selfimgurl = e;
                    let imgs = new Image();
                    imgs.crossOrigin = '';
                    imgs.onload = () => {
                        this.selfImg = imgs
                        this.initBgimg( imgs, this.bgcanvas, this.bgcanvasText )
                        this.offNo = this.seleceStatus//检测状态
                    }
                    imgs.src = e;
                    return
                }
                const file = e.target.files[0]
                // console.log(file.size / 1024)
                if (window.FileReader) {
                    let reader = new FileReader();
                    reader.readAsDataURL( file );
                    //监听文件读取结束后事件
                    reader.onloadend = (ev) => {
                        let param = new FormData();
                        param.append( 'file', file, file.name )
                        let imgs = new Image()
                        imgs.crossOrigin = ''
                        imgs.onload = () => {
                            this.selfImg = imgs
                            this.initBgimg( imgs, this.bgcanvas, this.bgcanvasText )
                        }
                        imgs.src = ev.target.result
                        uploadossBg( param ).then( res => {
                            if (!res.code) {
                                this.selfimgurl = res.data
                                this.offNo = this.seleceStatus//检测状态
                            }
                        } )

                    }
                }

            },
            upselfImg() {//自定义背景上传
                this.$refs.selfImg.click()
            },
            initBgimg(bg_img, cans, ctx) {//生成背景通用方法
                ctx.clearRect( 0, 0, cans.width, cans.height )
                const oBg = bg_img, can = cans;
                const h = can.width * oBg.height / oBg.width;
                const w = can.height * oBg.width / oBg.height;
                // console.log( h, can.width, can.height, oBg.width, oBg.height );
                if (h > can.height) {
                    const bh = ((h - can.height) / 2) * oBg.height / h;
                    ctx.drawImage( oBg, 0, bh, oBg.width, oBg.height - 2 * bh, 0, 0, can.width, can.height );
                } else {
                    const bw = ((w - can.width) / 2) * oBg.width / w;
                    ctx.drawImage( oBg, bw, 0, oBg.width - 2 * bw, oBg.height, 0, 0, can.width, can.height );
                }
                this.backg = {}
                // if(pr_img)ctx.drawImage( pr_img, 0, 0, can.width, can.height );
            },
            changeBgType(idx) {
                if (this.bgType === idx) return;
                this.bgType = idx;
                this.selectIdx = -1;
                this.oneItemBg = []
                this.$nextTick( () => {
                    this.oneItemBg = this.bgList[idx]
                } )
            },
            selectBg(item, idx, z) {
                this.selfImg = '';
                this.selfimgurl = '';
                this.selectIdx = idx;
                if (this.choseBack !== 'bg') this.clearBefor();
                this.choseBack = 'bg';
                this.offNo = this.seleceStatus//检测状态
                let bgimg = new Image();
                bgimg.crossOrigin = '';
                bgimg.onload = () => {
                    this.bgobj = bgimg;
                    this.initBgimg( bgimg, this.bgcanvas, this.bgcanvasText );
                }
                bgimg.src = z ? this.bgList[item][idx] : item;
            },
            clearBefor() {//前景清除重画
                this.Offsetxy = {x: 0, y: 0}
                this.initwh = {w: this.canveaContentW, h: this.canveaContentH}
                this.canvasText.clearRect( 0, 0, this.canvas.width, this.canvas.height )
                this.canvasText.drawImage( this.loadImg, this.Offsetxy.x, this.Offsetxy.y, this.initwh.w, this.initwh.h )
                this.initborder( 0, 0 )
            },
            handleExceed() {//背景图上传成功回调函数

            },
            // initsub(){
            //     if(!getToken())return;
            //     else {
            //         userSubscribe().then(res=>this.subs=res.data)
            //     }
            // },
            pollingImg() {//轮询
                this.timer = setTimeout( () => {
                    // this.getImgData()
                    // console.log('timeout')
                    getMattingInfo( {fileId: this.fileId} ).then( res => {
                        if (!res.code) {
                            this.imageMsg = res.data;
                            if (res.data.status === 'success') {
                                // clearInterval( this.timer )
                                let obj = {
                                    name: this.imgname,
                                    img: res.data.bgRemovedPreview,
                                    status: 0,
                                    fileId: this.fileId
                                }
                                this.Original = res.data.original;
                                this.bgOriginal = obj;
                                this.$emit( 'to-parse', {
                                    id: this.index,
                                    img: res.data.bgRemovedPreview,
                                    name: this.files.type === 'copy' ? this.imgname : this.files.name,
                                    color: 'add',
                                    fileId: this.fileId,
                                    Original: this.Original,
                                    filename: this.filename
                                } )
                            }else this.pollingImg();
                        } else {
                            // clearInterval( this.timer )
                            this.$emit( 'to-parse', {
                                id: this.index,
                                img: '',
                                color: 'add',
                                name: this.files.type === 'copy' ? this.imgname : this.files.name,
                                fileId: this.fileId,
                                Original: this.Original,
                                noSave: true
                            } )
                            this.bgOriginal = {name: this.imgname, img: '', status: 1, fileId: this.fileId}
                        }
                    } )
                }, 2000 )
            },
            updataThis() {
                if (this.bgOriginal.status !== 0) {//当前图片不可编辑
                    this.$message( {type: 'error', message: '当前图片不可编辑'} )
                    return
                }
                this.$emit( 'openImgSet', this.imageMsg )
            },
            getImgData() {
                let file = this.file, _self = this
                if (window.FileReader) {
                    let reader = new FileReader();
                    reader.readAsDataURL( file );
                    //监听文件读取结束后事件
                    reader.onloadend = function (e) {
                        _self.Original = e.target.result
                        let param = new FormData();
                        param.append( 'file', file, file.name )
                        param.set( 'mattingType', _self.type ? _self.type : 1 )
                        if (_self.type && _self.type === 3) param.set( 'crop', 1 )
                        uploadImgApi( param ).then( res => {
                            if (res.code == 0) {
                                _self.fileId = res.data.fileId
                                _self.imageMsg = res.data
                                if (res.data.status !== 'success') {
                                    _self.bgOriginal = {
                                        name: _self.imgname,
                                        img: '',
                                        status: 2,
                                        fileId: _self.fileId
                                    }
                                    _self.pollingImg()
                                    return
                                }
                                let obj = {
                                    name: _self.imgname,
                                    img: res.data.bgRemovedPreview,
                                    status: 0,
                                    fileId: _self.fileId
                                }
                                _self.Original = res.data.original
                                _self.bgOriginal = obj
                                _self.$emit( 'to-parse', {
                                    id: _self.index,
                                    img: res.data.bgRemovedPreview,
                                    name: _self.files.name,
                                    color: 'add',
                                    fileId: _self.fileId,
                                    Original: _self.Original,
                                    filename: _self.filename
                                } )
                            } else if (res.code === 4003) {
                                let obj = {
                                    name: _self.imgname,
                                    img: '',
                                    status: 4,
                                    fileId: _self.fileId
                                }
                                _self.$emit( 'to-parse', {
                                    id: _self.index,
                                    img: '',
                                    color: 'add',
                                    name: _self.files.name,
                                    fileId: _self.fileId,
                                    Original: _self.Original,
                                    noSave: true
                                } )
                                _self.bgOriginal = obj
                            } else {
                                let obj = {
                                    name: _self.imgname,
                                    img: '',
                                    status: 1,
                                    fileId: _self.fileId
                                }
                                _self.$emit( 'to-parse', {
                                    id: _self.index,
                                    img: '',
                                    color: 'add',
                                    name: _self.files.name,
                                    fileId: _self.fileId,
                                    Original: _self.Original,
                                    noSave: true
                                } )
                                _self.bgOriginal = obj
                            }
                        } ).catch( err => {
                            let obj = {
                                name: _self.imgname,
                                img: '',
                                status: 3,
                                fileId: _self.fileId
                            }
                            _self.$emit( 'to-parse', {
                                id: _self.index,
                                img: '',
                                color: 'add',
                                name: _self.files.name,
                                fileId: _self.fileId,
                                Original: _self.Original,
                                noSave: true
                            } )
                            _self.bgOriginal = obj
                        } )
                    };
                }
            },
            getImgMsgByurl() {//通过粘贴请求
                this.Original = this.file
                let obj = {url: this.file, mattingType: this.type ? this.type : 1}
                if (this.type && this.type === 3) obj['crop'] = 1;
                if (this.files.fileId) obj.fileId = this.files.fileId
                copyUpload( obj ).then( res => {
                    if (res.code == 0) {
                        this.fileId = res.data.fileId
                        this.imageMsg = res.data
                        if (res.data.status !== 'success') {
                            this.bgOriginal = {
                                name: this.imgname,
                                img: '',
                                status: 2,
                                fileId: this.fileId
                            }
                            this.pollingImg()
                            return
                        }
                        let obj = {
                            name: this.imgname,
                            img: res.data.bgRemovedPreview,
                            status: 0,
                            fileId: this.fileId
                        }
                        this.Original = res.data.original
                        this.bgOriginal = obj
                        this.$emit( 'to-parse', {
                            id: this.index,
                            img: res.data.bgRemovedPreview,
                            name: obj.name,
                            color: 'add',
                            fileId: this.fileId,
                            Original: this.Original,
                            filename: this.filename
                        } )
                    } else if (res.code === 4003) {
                        let obj = {
                            name: this.imgname,
                            img: '',
                            status: 4,
                            fileId: this.fileId
                        }
                        this.$emit( 'to-parse', {
                            id: this.index,
                            img: '',
                            color: 'add',
                            name: this.files.name,
                            fileId: this.fileId,
                            Original: this.Original,
                            noSave: true
                        } )
                        this.bgOriginal = obj
                    } else {
                        let obj = {
                            name: this.imgname,
                            img: '',
                            status: 1,
                            fileId: this.fileId
                        }
                        this.$emit( 'to-parse', {
                            id: this.index,
                            img: '',
                            color: 'add',
                            name: obj.name,
                            fileId: this.fileId,
                            Original: this.Original,
                            noSave: true
                        } )
                        this.bgOriginal = obj
                    }
                } ).catch( err => {
                    console.log( err, this.fileId )
                    let obj = {
                        name: this.imgname,
                        img: '',
                        status: 3,
                        fileId: this.fileId
                    }
                    this.$emit( 'to-parse', {
                        id: this.index,
                        img: '',
                        color: 'add',
                        name: this.files.name,
                        fileId: this.fileId,
                        Original: this.Original,
                        noSave: true
                    } )
                    this.bgOriginal = obj
                } )
            },
            choseBackColor(color, index) {//纯色背景切换
                this.choseBack = index;
                this.offNo = this.seleceStatus//检测状态
                this.selfImg = '';
                this.selfimgurl = '';
                this.showBgList = false;
                this.showcolorList = false;
                if (index === 0) {
                    this.drawImgAfterFirst( this.loadImg )
                    this.backg = {
                        backgroundImage: `url("${this.opacity}")`,
                        backgroundRepeat: 'mo-repeat',
                        backgroundPasition: 'center'
                    };
                } else if (index === 2) this.drawStyleBg( this.Original + `?str=${Math.random()}`, this.bgOriginal.img + `?str=${Math.random()}`, 1 );
                else if (index === 3) this.drawStyleBg( this.Original + `?str=${Math.random()}`, this.bgOriginal.img + `?str=${Math.random()}`, 2 );
                else {
                    this.showcolorList = !this.showcolorList
                }
            },
            choseColor(color) {//选择颜色背景，颜色选择器
                this.colorValue = color
                this.offNo = this.seleceStatus//检测状态
                this.selfImg = '';
                this.selfimgurl = '';
                this.showBgList = false;
                this.drawImgAfterFirst( this.loadImg );
                this.backg = {background: this.colorValue}
            },
            save(index, e, all, mattingType) {//保存下载
                if (index === 0) {
                    let url = this.bgOriginal.img;
                    this.initSmallTag( e, '免费 :）' );
                    this.downOldImg( url, all )
                } else {
                    if (this.imageMUrl) {
                        if(!all) this.initSmallTag( e, '免费 :）' );
                        this.downOldImg( this.imageMUrl, all );
                        return
                    }
                    let data = {fileId: this.fileId};
                    if (mattingType && mattingType !== 3) {
                        this.showLoading = true;
                        data['highQuality'] = 1;//高清下载
                    }
                    downloadMattedImage( data ).then( res => {
                        if (!res.code) {
                           if(!all) this.initSmallTag( e, '次数 -1' );
                            this.imageMUrl = res.data;
                            this.downOldImg( res.data, all );
                        } else this.showLoading = false;
                    } )
                }
            },
            // 下载
            downOldImg(urls, all) {
                let urlss = urls + `?str=${Math.random()}`
                let _self = this
                let cans = document.createElement( 'canvas' );
                let ctxs = cans.getContext( '2d' );
                if (_self.choseBack === 2 || _self.choseBack === 3) {
                    let callback = (objs) => {
                        cans.width = objs.bgRemovedImg.width;
                        cans.height = objs.bgRemovedImg.height;
                        ctxs.putImageData( objs.dwonBg, 0, 0 );
                        ctxs.drawImage( objs.bgRemovedImg, 0, 0 );
                        _self.downFunc( cans, all )
                    }
                    this.drawStyleBg( this.Original + `?str=${Math.random()}`, urlss + `?str=${Math.random()}`, 1, _self.choseBack, callback )
                    return
                }
                let oImg = new Image();
                oImg.crossOrigin = "";
                oImg.onload = function () {
                    cans.width = oImg.width;
                    cans.height = oImg.height;
                    if (_self.choseBack === 1 && _self.colorValue) {
                        ctxs.fillStyle = _self.colorValue;
                        ctxs.fillRect( 0, 0, oImg.width, oImg.height )
                    } else if (_self.choseBack === 'bg') {
                        const bg = _self.selfImg ? _self.selfImg : _self.bgobj
                        _self.initBgimg( bg, cans, ctxs )
                        ctxs.drawImage( oImg, _self.Offsetxy.x / 2 * oImg.width / (_self.canveaContentW / 2), _self.Offsetxy.y / 2 * oImg.height / (_self.canveaContentH / 2), _self.initwh.w / 2 * oImg.width / (_self.canveaContentW / 2), _self.initwh.h / 2 * oImg.height / (_self.canveaContentH / 2) );
                    }
                    if (_self.choseBack !== 'bg') ctxs.drawImage( oImg, 0, 0, cans.width, cans.height );
                    _self.downFunc( cans, all )
                }
                oImg.src = urlss
            },
            downFunc(cans, all) {//下载方法提取
                this.showLoading = false;
                if (myBrowser() === 'IE' || myBrowser() === 'Edge') {//ie下载图片
                    let url = cans.msToBlob();
                    let blobObj = new Blob( [url] );
                    window.navigator.msSaveOrOpenBlob( blobObj, this.filename.substring( 0, this.filename.lastIndexOf( '.' ) ) + ".png" );
                    if (all) {
                        this.$emit( 'downall', {obj: url, filename: this.filename} )
                        return
                    }
                } else {
                    let url = cans.toDataURL( "image/png" );
                    if (all) {
                        this.$emit( 'downall', {obj: url, filename: this.filename} )
                        return
                    }
                    let arr = url.split( ',' ), mime = arr[0].match( /:(.*?);/ )[1], bstr = atob( arr[1] ),//base64  to blob
                        n = bstr.length, u8arr = new Uint8Array( n );
                    while (n--) {
                        u8arr[n] = bstr.charCodeAt( n );
                    }
                    let objurl = URL.createObjectURL( new Blob( [u8arr], {type: mime} ) );
                    let save_link = document.createElement( 'a' );
                    save_link.href = objurl;
                    save_link.download = this.filename.substring( 0, this.filename.lastIndexOf( '.' ) ) + '.png';
                    let event = document.createEvent( 'MouseEvents' );
                    event.initMouseEvent( 'click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null );
                    save_link.dispatchEvent( event );
                }
            },
            deleteItem() {//删除某一个
                let name = '';
                if (this.timer) clearTimeout( this.timer )
                if (this.files.type == 'copy') name = this.imgname
                else name = this.files.name
                this.$emit( 'close', {index: this.index, name: name} )
            },
            fingBig(val) {//找最大
                let big = val[0];
                val.map( (v, i) => {
                    if (big < v) {
                        big = v
                    }
                } );
                return big
            },
            drameImg(url) {
                if (!this.canvas) {
                    this.canvas = document.getElementById( `canvas${this.ramdId}` );
                    this.canvasText = this.canvas.getContext( '2d' );
                    this.bgcanvas = document.getElementById( `canvas${this.index}` );
                    this.bgcanvasText = this.bgcanvas.getContext( '2d' );
                }
                let _self = this
                let image = new Image(), w, h;
                image.src = url
                image.onload = function () {
                    w = image.width
                    h = image.height
                    _self.loadImg = image
                    let arrThis = [image.width, image.height]
                    let bigOne = _self.fingBig( arrThis )
                    if (bigOne == arrThis[0]) {
                        if (bigOne > _self.canvasinitNum) {
                            h = _self.canvasinitNum * image.height / image.width
                            w = _self.canvasinitNum
                        }
                    } else {
                        if (bigOne > _self.canvasinitNum) {
                            w = _self.canvasinitNum * image.width / image.height
                            h = _self.canvasinitNum
                        }
                    }
                    _self.canvas.width = 2 * image.width
                    _self.canvas.height = 2 * image.height
                    _self.bgcanvas.width = 2 * image.width
                    _self.bgcanvas.height = 2 * image.height
                    _self.canvas.style.width = w + 'px'
                    _self.canvas.style.height = h + 'px'
                    _self.bgcanvas.style.width = w + 'px'
                    _self.bgcanvas.style.height = h + 'px'
                    _self.canveaContentW = 2 * image.width//画到画布上的位置
                    _self.canveaContentH = 2 * image.height
                    const initsue = _self.initStatusResult;
                    if (!initsue || initsue.type === 0) {
                        _self.canvasText.clearRect( 0, 0, _self.canvas.width, _self.canvas.height );
                        _self.canvasText.drawImage( image, 0, 0, _self.canveaContentW, _self.canveaContentH );
                    } else if (initsue.type === 1) _self.choseColor( initsue.value );
                    else if (initsue.type === 2) _self.choseBackColor( '', 2 );
                    else if (initsue.type === 3) _self.choseBackColor( '', 3 );
                    else if (initsue.type === 4 && Array.isArray( initsue.value )) {
                        _self.canvasText.clearRect( 0, 0, _self.canvas.width, _self.canvas.height );
                        _self.canvasText.drawImage( image, 0, 0, _self.canveaContentW, _self.canveaContentH );
                        _self.selectBg( initsue.value[0], initsue.value[1], 4 )
                        _self.bgType = initsue.value[0]
                        _self.selectIdx = initsue.value[1]
                        _self.oneItemBg = _self.bgList[_self.bgType]
                    } else _self.changeselfImg( initsue.value, 1 )
                    _self.choseBack = initsue ? initsue.type === 4 ? 'bg' : initsue.type : 0;
                    _self.$nextTick( () => {
                        _self.offNo = _self.seleceStatus//检测状态
                    } )
                }
            },
            drawStyleBg(originalImgUrl, bgRemovedImgUrl, index, key, callback) {
                let that = this;
                let imgLoaded = false;
                let originalImgLoaded = false;
                let img = new Image();
                img.crossOrigin = '';
                img.onload = function () {
                    imgLoaded = true;
                    if (imgLoaded && originalImgLoaded && !key) {
                        that.drawStyleBg2( originalImg, img, index )
                    } else if (imgLoaded && originalImgLoaded && key === 2) {
                        that.downOthers( {oldImg: originalImg, bgImg: img}, 2, callback )
                    } else if (imgLoaded && originalImgLoaded && key === 3) {
                        that.downOthers( {oldImg: originalImg, bgImg: img}, 3, callback )
                    }
                }
                img.src = bgRemovedImgUrl;
                let originalImg = new Image();
                originalImg.crossOrigin = '';
                originalImg.onload = function () {
                    originalImgLoaded = true;
                    if (imgLoaded && originalImgLoaded && !key) {
                        that.drawStyleBg2( originalImg, img, index )
                    } else if (imgLoaded && originalImgLoaded && key === 2) {
                        that.downOthers( {oldImg: originalImg, bgImg: img}, 2, callback )
                    } else if (imgLoaded && originalImgLoaded && key === 3) {
                        that.downOthers( {oldImg: originalImg, bgImg: img}, 3, callback )
                    }
                }
                originalImg.src = originalImgUrl;

            },
            drawStyleBg2(originalImg, bgRemovedImg, index) {
                let canvas = document.createElement( 'canvas' );
                canvas.width = this.canvas.width; //☜
                canvas.height = this.canvas.height;
                let ctx = canvas.getContext( "2d" );
                // let canvas=this.canvas,ctx=this.canvasText;
                ctx.drawImage( originalImg, 0, 0, canvas.width, canvas.height );
                let imgData = ctx.getImageData( 0, 0, canvas.width, canvas.height );
                let newBg1 = imgData;
                // let newBg2 = ctx.getImageData(0, 0, canvas.width, canvas.height);
                // let newBg3 = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let newBg4 = ctx.getImageData( 0, 0, canvas.width, canvas.height );
                // let newBg5 = ctx.getImageData(0, 0, canvas.width, canvas.height);
                //var newBg1 = imageEffects.edge(imgData);
                JSManipulate.blur.filter( newBg1, {amount: 5.0} );
                //JSManipulate.dither.filter(newBg2, {amount: 1.0});
                //JSManipulate.edge.filter(newBg2);
                // JSManipulate.emboss.filter(newBg2,{height:1,angle:135,elevation:30});
                // JSManipulate.diffusion.filter(newBg3,{scale:22});
                //JSManipulate.circlesmear.filter(newBg4,{size:10,density:1.0,mix:0.5});
                JSManipulate.grayscale.filter( newBg4 );
                // JSManipulate.brightness.filter(newBg5,{amount:-0.5})
                // let whiteBg = ctx.createImageData(canvas.width,canvas.height);
                // for (let i=0;i<whiteBg.data.length;i+=4)
                // {
                //     whiteBg.data[i+0]=255;
                //     whiteBg.data[i+1]=255;
                //     whiteBg.data[i+2]=255;
                //     whiteBg.data[i+3]=255;
                // }
                if (index === 1) this.showStyleBgCanvas( newBg4, bgRemovedImg, "前景彩色，背景黑白" );
                else this.showStyleBgCanvas( newBg1, bgRemovedImg, "模糊聚焦" );
                // this.showStyleBgCanvas(whiteBg,bgRemovedImg,"纯白背景");
                // this.showStyleBgCanvas(newBg1,bgRemovedImg,"模糊聚焦");
                // this.showStyleBgCanvas(newBg2,bgRemovedImg,"背景浮雕");
                // this.showStyleBgCanvas(newBg3,bgRemovedImg,"背景磨砂玻璃");
                // this.showStyleBgCanvas(newBg4,bgRemovedImg,"前景彩色，背景黑白");
                // this.showStyleBgCanvas(newBg5,bgRemovedImg,"前景高亮，背景暗化");
            },
            showStyleBgCanvas(newBg, bgRemovedImg) {
                this.canvasText.clearRect( 0, 0, this.canvas.width, this.canvas.height );
                this.canvasText.putImageData( newBg, 0, 0 );
                // this.canvasText.scale(0.5,0.5);
                this.canvasText.drawImage( bgRemovedImg, 0, 0, this.canveaContentW, this.canveaContentH );
                this.bgcanvasText.clearRect( 0, 0, this.bgcanvas.width, this.bgcanvas.height )
                // this.canvasText.setTransform(1, 0, 0, 1, 0, 0);
            },
            downOthers(imgObjs, index, callback) {//效果图下载
                let canvasTemp = document.createElement( 'canvas' );
                canvasTemp.width = imgObjs.bgImg.width; //☜
                canvasTemp.height = imgObjs.bgImg.height;
                let ctx = canvasTemp.getContext( "2d" );
                ctx.drawImage( imgObjs.oldImg, 0, 0, canvasTemp.width, canvasTemp.height );
                let imgData = ctx.getImageData( 0, 0, canvasTemp.width, canvasTemp.height );
                let newBg1 = imgData;
                let newBg4 = ctx.getImageData( 0, 0, canvasTemp.width, canvasTemp.height );
                JSManipulate.blur.filter( newBg1, {amount: 5.0} );
                JSManipulate.grayscale.filter( newBg4 );
                // console.log( index, 'pppp' )
                callback( {
                    dwonBg: index === 2 ? newBg4 : newBg1,
                    bgRemovedImg: imgObjs.bgImg
                } )
            },
            drawImgAfterFirst(img) {
                this.bgcanvasText.clearRect( 0, 0, this.bgcanvas.width, this.bgcanvas.height )
                this.canvasText.clearRect( 0, 0, this.canvas.width, this.canvas.height );
                this.canvasText.drawImage( img, 0, 0, this.canveaContentW, this.canveaContentH );
            },
        }
    }
</script>

<style lang="scss">
    .showImgOut {
        position: relative;
        background-color: #fff;
        margin-bottom: 15px;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Chrome/Safari/Opera */
        -khtml-user-select: none; /* Konqueror */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently*/
    }

    .dreepAfter {
        position: relative;
        padding: 0 15px 25px;
        border-radius: 15px;
        background-color: #ffffff;
        /*margin-top: 25px;*/
        margin: 0 auto;
        /*min-width: 1024px;*/
        & > .j-b > p {
            color: #999;
            font-size: 14px;
        }

        .imgs {
            justify-content: center;

            & > div:first-child {
                margin-right: 50px;
                position: relative;

                .bg_img {
                    position: absolute;
                    top: -42px;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    flex-direction: column;
                    background-color: #fff;

                    .title {
                        margin-bottom: 12px;
                    }

                    h4 {
                        font-size: 18px;
                        font-weight: 500;
                    }

                    .bgType {
                        font-size: 14px;
                        line-height: 40px;
                        border-bottom: 1px solid #d8d8d8;

                        span {
                            margin-right: 24px;
                        }

                        .active {
                            border-bottom: 2px solid $co;
                            color: $co;
                        }
                    }

                    .bgimgs {
                        padding: 20px 10px 0;
                        overflow-y: scroll;
                        flex: 1;

                        .active {
                            box-shadow: 0 0 10px $co;
                        }
                    }

                    .bgimgs > div {
                        width: 110px;
                        height: 110px;
                        border-radius: 10px;
                        margin: 0 5px 5px 0;
                        background-color: #eee;

                        &:nth-child(4n) {
                            margin-right: 0;
                        }

                        img {
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }

        .el-icon-close {
            position: absolute;
            right: 20px;
            top: 10px;
            font-size: 16px;
        }

        .imgs > div:last-child {
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
                position: relative;

                canvas:first-child {
                    position: relative;
                    z-index: 10;
                }

                .bgss {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

                .img {
                    position: absolute;
                    z-index: 33;
                    background-color: #fff;
                    background-position: center;
                    background-repeat: no-repeat;
                    width: 26px;
                    height: 26px;

                    &:hover {
                        cursor: nesw-resize;
                    }
                }

                img {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin: -15px 0 0 -90px;
                    z-index: 44;
                }
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
                color: #e82255;
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

        & > span.bg_img {
            line-height: 28px;
            font-size: 12px;
            border-radius: 15px;
            color: #333;
            padding: 0 10px;
            border: 1px solid #b4b4b4;

            &::before {
                display: inline-block;
                margin-right: 5px;
                font-size: 14px;
            }
        }

        & .bordershow.cu {
            border: 1px solid #e82255;
            color: $co;
        }

        .color_List {
            position: absolute;
            top: -250px;
            left: 50%;
            margin-left: -100px;
            width: 240px;
            flex-wrap: wrap;
            box-shadow: 0 0 10px #333;
            margin-top: 10px;
            z-index: 88;
            background-color: #fff;

            span:first-child {
                margin-bottom: 10px;
            }

            span {
                width: 20px;
                height: 20px;
            }
        }

        & > div {
            position: relative;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 1px solid #c7c7c7;
            margin-right: 8px;
        }

        i label {
            display: none;
        }

        i:hover label {
            display: block;
        }
    }

    .el-icon-arrow-down:before {
        content: "\e794";
        color: #000;
    }

    .el-color-dropdown__btns .el-button--text {
        display: none;
    }

    @media screen and (max-width: 1500px) {
        .dreepAfter {
            .imgs.flex > div {
                max-width: 380px;
                /*max-height: 380px;*/
                img {
                    max-width: 380px;
                    max-height: 380px;
                }

                .close {
                    max-width: 380px;
                }

                canvas {
                    max-width: 380px;
                    max-height: 380px;
                }
            }

            .imgs.flex > p {
                max-width: 380px;
            }
        }
    }
</style>
