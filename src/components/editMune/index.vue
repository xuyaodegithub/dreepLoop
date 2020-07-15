<template>
    <!--    描边 投影组件-->
    <div class="mune"  v-loading="loading">
        <div class="header flex j-b">
            <span class="cu" :class="{'active' : tabType===idx}" v-for="(item,idx) in tabList" @click="changeTab(idx)"
                  :key="idx">{{item.name}}</span>
        </div>
        <div class="content">
            <div class="t1" v-show="!tabType">
                <h4>智能抠图模式</h4>
                <div class="btns flex j-b f-w">
                    <span class="cu" v-for="(it,idx) in btnList" :key="idx" :class="{'active' : btnType===idx }"
                          @click="changBtn(it.type,idx)">
                        {{it.name}}
                    </span>
                </div>
                <h4>修复</h4>
                <el-button plain @click="changBtn(-1)">手工修补</el-button>
            </div>
            <div class="t2 flex j-b f-w" v-show="tabType===2">
                <div class="item cu" v-for="(it,idx) in filterList" :key="idx">
                    <div @click="selectEdit(it,idx)" :class="{'active' : t2Idx===idx}">
                        <img :src="it.src ? it.src : preImg " alt="">
                    </div>
                    <span>{{it.name}}</span>
                </div>

            </div>
            <div class="t3" v-show="tabType===3">
                <el-checkbox v-model="checked" size="medium" @change="initsliderVal">投影</el-checkbox>
                <div class="flex a-i sec">
                    <label>角度：</label>
                    <div class="crils">
                        <div :style="{transform:`rotateZ(${angle}deg)`}"><p></p></div>
                    </div>
                    <el-input v-model="angle" placeholder="请输入内容" size="mini" type="number"
                              @input="changeAngle"></el-input>
                    度
                </div>
                <div class="flex a-i"><label>距离：</label>
                    <el-slider :show-tooltip="false" v-model="sliderVal.distance" :min="0" :max="200"></el-slider>
                    {{sliderVal.distance}}px
                </div>
                <div class="flex a-i"><label>透明：</label>
                    <el-slider :show-tooltip="false" v-model="sliderVal.extend"></el-slider>
                    {{sliderVal.extend}}%
                </div>
                <div class="flex a-i"><label>模糊：</label>
                    <el-slider :show-tooltip="false" v-model="sliderVal.size" :min="0" :max="100"></el-slider>
                    {{sliderVal.size}}%
                </div>
                <div class="otherss">
                    <el-checkbox v-model="checkedM" size="medium" @change="initsliderVal">描边</el-checkbox>
                    <div class="flex a-i size"><label>大小：</label>
                        <el-slider :show-tooltip="false" v-model="showDowVal.mSize" :min="1" :max="100"></el-slider>
                        {{showDowVal.mSize}}px
                    </div>
                    <h4>描边颜色：</h4>
                    <div class="flex a-i j-b colors">
                        <span v-for="(item,idx) in colors" :key="idx" class="cu" @click="changeColor(item)"
                              :style="{backgroundColor:item}"></span>
                        <el-color-picker v-model="showDowVal.colorVal" @change="changeColor"></el-color-picker>
                    </div>
                </div>
            </div>
            <div class="t4" v-show="tabType===1">
                <h4>一键处理劣质图片，生成精美图片</h4>
                <el-button plain @click="changBtn(4)">一键美化</el-button>
            </div>

        </div>
    </div>
</template>

<script>
    import jsMulit from '@/utils/jsmanipulate.js';
    import {uploadossBg} from '@/apis';
    import {setRad, colorRgb} from '@/utils'
    import * as StackBlur from 'stackblur-canvas';
    import {mapGetters} from 'vuex'
    export default {
        name: "index",
        data() {
            return {
                tabList: [
                    {name: '抠图', type: 1},
                    {name: '美化', type: 2},
                    {name: '特效', type: 3},
                    {name: '阴影', type: 4},
                ],
                tabType: 0,
                btnList: [
                    {name: '通用', type: 2},
                    {name: '人像', type: 1},
                    {name: '头像', type: 3},
                    // {name: '物体', type: 2},
                ],
                btnType: 0,
                filterList: [
                    {name: '原图', src: '', url: '', loadObj: ''},
                    {name: '透明背景', src: '', url: '', loadObj: ''},
                    {name: '浮雕', src: '', url: '', loadObj: ''},
                    {name: '黑白', src: '', url: '', loadObj: ''},
                    {name: '油画', src: '', url: '', loadObj: ''},
                    {name: '水纹', src: '', url: '', loadObj: ''},
                    {name: '模糊', src: '', url: '', loadObj: ''},
                    {name: '素描', src: '', url: '', loadObj: ''},
                    {name: '扭曲', src: '', url: '', loadObj: ''},
                ],
                proImgObj: null,
                preImg: '',
                checked: false,
                checkedM: false,
                angle: 180,//角度
                sliderVal: {
                    distance: 20,
                    extend: 50,
                    size: 10,
                },
                showDowVal: {
                    mSize: 20,
                    colorVal: '#fff',
                },
                colors: ['#fff', '#FED835', '#2862F4', '#28F5B4'],
                loading: false,
                t2Idx: 1,
                closeWatch:false,//每次切換組件時，不需要重复watch
            }
        },
        mounted() {
            // this.filterUrl()
        },
        watch: {
            sliderVal: {
                handler(newVal, oldVal) {
                    if(!this.closeWatch)this.initsliderVal();
                },
                deep: true
            },
            showDowVal: {
                handler(newVal, oldVal) {
                    if(!this.closeWatch)this.initsliderVal();

                },
                deep: true
            },
        },
        computed: {
            ...mapGetters([
                'effectsImgList'
            ]),
            initAngleDistance() {
                if (this.angle == 0 || this.angle == 360) return {x: -this.sliderVal.distance, y: 0};
                else if (this.angle > 0 && this.angle < 90) return {
                    x: -Math.cos( setRad( this.angle ) ) * this.sliderVal.distance,
                    y: -Math.sin( setRad( this.angle ) ) * this.sliderVal.distance
                };
                else if (this.angle == 90) return {x: 0, y: -this.sliderVal.distance};
                else if (this.angle > 90 && this.angle < 180) return {
                    x: Math.cos( setRad( 180 - this.angle ) ) * this.sliderVal.distance,
                    y: -Math.sin( setRad( 180 - this.angle ) ) * this.sliderVal.distance
                };
                else if (this.angle == 180) return {x: this.sliderVal.distance, y: 0};
                else if (this.angle > 180 && this.angle < 270) return {
                    x: Math.cos( setRad( this.angle - 180 ) ) * this.sliderVal.distance,
                    y: Math.sin( setRad( this.angle - 180 ) ) * this.sliderVal.distance
                };
                else if (this.angle == 270) return {x: 0, y: this.sliderVal.distance};
                else if (this.angle > 270 && this.angle < 360) return {
                    x: -Math.cos( setRad( 360 - this.angle ) ) * this.sliderVal.distance,
                    y: Math.sin( setRad( 360 - this.angle ) ) * this.sliderVal.distance
                };
                // else return{x:-Math.cos(360-this.angle)*this.sliderVal.distance,y:Math.sin(360-this.angle)*this.sliderVal.distance};
            },
            resliderVal() {
                let oCan = document.createElement( 'canvas' ), oCanTxt, oImg = this.filterList[this.t2Idx].loadObj;
                const [w, h] = [this.proImgObj.width, this.proImgObj.height];
                oCanTxt = oCan.getContext( '2d' );
                oCan.width = w;
                oCan.height = h;
                oCanTxt.drawImage( oImg, 0, 0, w, h );
                let imgData = oCanTxt.getImageData( 0, 0, oCan.width, oCan.height );
                if (this.checked) {
                    for (let y = 0; y < h; y++) {
                        for (let x = 0; x < w; x++) {
                            let pixel = (y * w + x) * 4;
                            if (imgData.data[pixel + 3] != 0) {
                                imgData.data[pixel] = 0;
                                imgData.data[pixel + 1] = 0;
                                imgData.data[pixel + 2] = 0;
                                imgData.data[pixel + 3] = (1 - this.sliderVal.extend / 100) * imgData.data[pixel + 3];
                            }
                        }
                    }
                    if (this.sliderVal.size > 0) StackBlur.imageDataRGBA( imgData, 0, 0, imgData.width, imgData.height, this.sliderVal.size );
                }
                oCanTxt.clearRect( 0, 0, w, h )
                oCanTxt.putImageData( imgData, 0, 0 )
                return oCan
            },
            initshowDowVal() {
                let oCan = document.createElement( 'canvas' ), oCanTxt, oImg = this.filterList[this.t2Idx].loadObj, imgData2;
                const [w, h] = [this.proImgObj.width, this.proImgObj.height], rgb = colorRgb( this.showDowVal.colorVal );
                oCanTxt = oCan.getContext( '2d' );
                if (this.checkedM) {
                    if(w>=h){
                        oCan.width = (h+this.showDowVal.mSize * 2)*w/h;
                        oCan.height = h+this.showDowVal.mSize * 2
                    }else{
                        oCan.width = w + this.showDowVal.mSize * 2;
                        oCan.height = (w + this.showDowVal.mSize * 2) * h / w;
                    }
                    // oCan.width = w+this.showDowVal.mSize * 2;
                    // oCan.height = h+this.showDowVal.mSize * 2;
                    oCanTxt.drawImage( oImg, 0, 0, oCan.width, oCan.height );
                    imgData2 = oCanTxt.getImageData( 0, 0, oCan.width, oCan.height );
                    for (let y = 0; y < oCan.height; y++) {
                        for (let x = 0; x < oCan.width; x++) {
                            let pixel = (y * oCan.width + x) * 4;
                            if (imgData2.data[pixel + 3] != 0) {
                                imgData2.data[pixel] = rgb[0];
                                imgData2.data[pixel + 1] = rgb[1];
                                imgData2.data[pixel + 2] = rgb[2];
                                // imgData2.data[pixel + 3] = 1;
                            }
                        }
                    }
                    oCanTxt.putImageData( imgData2, 0, 0 )
                }
                return oCan
            }
        },
        filters: {
            filterName(k) {
                const nameList = ['原图', '浮雕', '黑白', '油画', '水纹', '模糊', '素描', '扭曲',]
                return nameList[k - 1]
            }
        },
        methods: {
            changeAngle(){
                if(this.angle>360)this.angle=360;
                else if(this.angle<0)this.angle=0;
                this.initsliderVal()
            },
            initCanshu(data){
                this.closeWatch=true;
                let keys=Object.keys({...this.sliderVal,...this.showDowVal,checked:this.checked,checkedM:this.checkedM,t2Idx:this.t2Idx,mattingType:this.btnType});
                keys.map(item=>{
                    if(data.hasOwnProperty(item) && this.sliderVal.hasOwnProperty(item))this.sliderVal[item]=data[item];
                    else if(data.hasOwnProperty(item) && this.showDowVal.hasOwnProperty(item))this.showDowVal[item]=data[item];
                    else if(data.hasOwnProperty(item) && ['checked','checkedM','t2Idx'].includes(item))this[item]=data[item];
                    else if(data.hasOwnProperty(item) && item==='mattingType')this.btnType=this.btnList.findIndex(item=>item.type===data['mattingType']);
                } )
                if(!data.hasOwnProperty('checked'))this.checked=false;
                if(!data.hasOwnProperty('checkedM'))this.checkedM=false;
               this.$nextTick(()=>{
                   this.closeWatch=false;
               })
            },
            initsliderVal() {
                let oCan = document.createElement( 'canvas' ), oCanTxt;
                oCanTxt=oCan.getContext('2d');
                oCan.width=this.proImgObj.width;
                oCan.height=this.proImgObj.height;
                if (this.checked) oCanTxt.drawImage( this.resliderVal, this.initAngleDistance.x, this.initAngleDistance.y );
                if (this.checkedM) oCanTxt.drawImage( this.initshowDowVal, -(this.initshowDowVal.width-this.resliderVal.width)/2, -(this.initshowDowVal.height - this.resliderVal.height) / 2, this.initshowDowVal.width, this.initshowDowVal.height );//重复同位置putimgData会覆盖，需要画上去
                oCanTxt.drawImage( this.filterList[this.t2Idx].loadObj, 0, 0, oCan.width, oCan.height );
                this.$emit( 'effectsImg', {useImg:oCan.toDataURL(),...this.sliderVal,...this.showDowVal,checked:this.checked,checkedM:this.checkedM} );
            },
            changeTab(idx) {
                if (this.tabType === idx) return;
                this.tabType = idx;
            },
            changBtn(type, idx) {//抠图按钮
                if (this.btnType === idx) return;
                if (![-1, 4].includes( type )) this.btnType = idx;
                this.$emit( 'mattingImgs', type )
            },
            filterUrl(data) {//初始化特效
                if (data.pro === this.preImg) return;
                this.t2Idx = 1;
                this.initCanshu(data);
                this.preImg = data.pro;
                this.proImgObj = data.proObj;
                const list=this.effectsImgList.find(item=>item.id===data.id).list;
                this.filterList.map(item=>{
                    item.loadObj='';
                    item.url='';
                })
                list.map((item,idx)=>this.filterList[idx].src=item);
                this.filterList[0].url=data.ori;
                this.filterList[0].src=data.ori;
                this.filterList[1].url=data.pro;
                this.filterList[1].src=data.pro;
                this.filterList[1].loadObj=data.proObj;
                // let oCan = document.createElement( 'canvas' );
                // let oCanTxt = oCan.getContext( '2d' );
                // oCan.width = data.proObj.width;
                // oCan.height = data.proObj.height;
                // oCanTxt.drawImage( data.proObj, 0, 0 );
                // this.$nextTick(()=>{
                //     this.loadStatus( data, oCanTxt )
                // })
                // this.loadStatus( data, oCanTxt );

            },
            loadStatus(data, oCanTxt) {
                this.filterList.map( (item, idx) => {
                    const pro = oCanTxt.getImageData( 0, 0, data.proObj.width, data.proObj.height );
                    item.url = '';
                    if (!idx) {
                        item.src = data.ori;
                        item.url = data.ori;
                    } else if (idx === 1) {
                        item.src = data.pro;
                        item.url = data.pro;
                        item.loadObj = data.proObj;
                    } else if (idx === 2) item.src = this.jsMulitData( pro, 'emboss', );
                    else if (idx === 3) item.src = this.jsMulitData( pro, 'grayscale', );
                    else if (idx === 4) item.src = this.jsMulitData( pro, 'dither', );
                    else if (idx === 5) item.src = this.jsMulitData( pro, 'triangleripple', );
                    else if (idx === 6) item.src = this.jsMulitData( pro, 'blur', {amount: 5.0} );
                    else if (idx === 7) item.src = this.jsMulitData( pro, 'threshold', {threshold: 100} );
                    else if (idx === 8) item.src = this.jsMulitData( pro, 'twirl', {
                        radius: data.proObj.width,
                        angle: 90,
                        centerX: 0.5,
                        centerY: 0.5
                    } );
                    if (idx === this.filterList.length - 1) this.$nextTick( () => this.loading = false );
                } )
            },
            jsMulitData(proData, name, obj = {}) {
                let ocan = document.createElement( 'canvas' ), newImgdata = proData;
                let ocanTxt = ocan.getContext( '2d' );
                jsMulit[name].filter( newImgdata, obj );
                ocan.width = this.proImgObj.width;
                ocan.height = this.proImgObj.height;
                ocanTxt.putImageData( newImgdata, 0, 0 );
                return ocan.toDataURL()
            },
            changeColor(color) {
                this.showDowVal.colorVal = color;
            },
            selectEdit(it, idx) {
                if (idx === this.t2Idx) return;
                this.$emit('loadings',true)
                this.t2Idx = idx;
                this.checked= false;
                this.checkedM= false;
                if ((it.url && it.loadObj) || !idx) {
                    this.$emit( 'effectsImg', {useImg:it.url,t2Idx:this.t2Idx,checked: false,checkedM: false} );
                    return
                }
                let oImg = new Image(), oCan = document.createElement( 'canvas' ), oCanTxt;
                oCanTxt = oCan.getContext( '2d' );
                oImg.crossOrigin = '';
                oImg.onload = () => {
                    oCan.width = oImg.width;
                    oCan.height = oImg.height;
                    oCanTxt.drawImage( oImg, 0, 0 );
                    oCan.toBlob( bold => {
                        let fromData = new FormData();
                        fromData.append( 'file', bold );
                        uploadossBg( fromData ).then( res => {
                            this.filterList[idx].url = res.data;
                            this.filterList[idx].loadObj = oImg;
                            this.$emit( 'effectsImg', {useImg:res.data,t2Idx:this.t2Idx,checked:false,checkedM:false} );
                            this.$emit('loadings',false);
                        } )
                    } )
                };
                oImg.src = idx ? it.src : it.src + `?id=${Math.random()}`;
            },
        }
    }
</script>

<style scoped lang="scss">
    .mune{
        height: 100%;
        overflow-y: auto;
    }
    .header {
        font-size: 14px;
        color: #333;
        line-height: 32px;
        padding-top: 15px;
        border-bottom: 1px solid #E9E9E9;

        span {
            position: relative;

            &:after {
                transition: all .2s linear;
                position: absolute;
                width: 0;
                height: 2px;
                content: '';
                background-color: $co;
                left: 50%;
                transform: translateX(-50%);
                bottom: 0;
            }

            &.active {
                color: $co;

                &:after {
                    width: 100%;
                }
            }
        }

    }

    .content {
        font-size: 14px;
        line-height: 1;
        color: #333;

        .t1, .t4, .t3 {
            padding-top: 30px;

            h4 {
                margin-bottom: 16px;
            }

            .btns {
                margin-bottom: 20px;
            }

            .btns span {
                width: 102px;
                line-height: 40px;
                border: 1px solid #e9e9e9;
                text-align: center;
                border-radius: 5px;
                margin-bottom: 10px;

                &.active {
                    color: #fff;
                    background-color: $co;
                    border-color: $co;
                }
            }

            .el-button {
                border-color: $co;
                color: $co;
                width: 100%;
            }
        }

        .t4 h4 {
            color: #9C9C9C;
        }

        .t2 {
            padding-top: 20px;

            .item {
                position: relative;
                width: 100px;
                text-align: center;
                margin-bottom: 20px;

                img {
                    display: block;
                    width: 100%;
                }

                & > div {
                    margin-bottom: 10px;
                }

                .active {
                    border: 1px solid $co;
                }
            }
        }

        .t3 {
            .sec {
                font-size: 12px;
                color: #333;
                margin: 35px 0;

                .crils {
                    /*label{*/
                    /*    !*width: ;*!*/
                    /*}*/
                    border: 1px solid #9c9c9c;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    position: relative;
                    margin: 0 15px;

                    &:after {
                        position: absolute;
                        content: '';
                        width: 8px;
                        height: 8px;
                        background-color: #B2B2B2;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        border-radius: 50%;
                    }

                    div {
                        width: 100%;
                        height: 2px;
                        position: absolute;
                        top: 50%;
                        left: 0;
                        transform: translateY(-50%);

                        p {
                            width: 50%;
                            height: 100%;
                            background-color: #B2B2B2;
                        }
                    }
                }

                .el-input {
                    width: 60px;
                    line-height: 24px;
                    height: 24px;
                    background-color: #eee;
                    margin-right: 8px;
                }

                & ~ div.flex {
                    font-size: 12px;
                    line-height: 38px;
                    margin-bottom: 10px;
                }
            }

            .otherss {
                margin-top: 30px;
                border-top: 1px solid #eee;
                font-size: 12px;

                .el-checkbox {
                    font-size: 14px;
                    margin-top: 30px;
                }

                .size {
                    margin: 30px 0;
                }

                h4 {
                    margin-bottom: 20px;
                    line-height: 1;
                }

                .colors span {
                    width: 28px;
                    height: 28px;
                    border: 1px solid #ECECEC;
                    position: relative;

                    /*&:first-child:after {*/
                    /*    position: absolute;*/
                    /*    width: 120%;*/
                    /*    height: 2px;*/
                    /*<!--    background-color: $co;-->*/
                    /*top: 50%;*/
                    /*left: 0;*/
                    /*content: '';*/
                    /*<!--transform: translateY(-50%) rotateZ(-45deg);-->*/
                    /*}*/
                }

            }

            .el-slider {
                width: 50%;
                margin: 10px;
            }
        }
    }
</style>
