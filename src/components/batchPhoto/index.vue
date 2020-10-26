<template>
    <div class="batchPhoto cu" :class="{'afterDom' : !dreepAfter}" @click="toEdior">
        <div class="wait" v-if="!dreepAfter">
            <img :src="oriImg" alt="">
        </div>
        <div class="loadingStatus flex a-i" v-if="!dreepAfter">
            <div>
                <i :class="iconList[stutasMsg]"
                   style="font-size: 28px;"></i>
                <p style="margin-top: 10px;padding: 0 10px;">{{stutasMsg===2 ? realTimeRes.msg : tooltip[stutasMsg]}}</p>
            </div>
        </div>
        <div class="dreepSuccess" v-if="dreepAfter" :style="initPhoto[1]">
            <img :src="realTimeRes.data.bgRemovedPreview" alt="" :style="initPhoto[0]">
            <div class="downBtns flex">
                <span @click.stop="$emit('downLoad',$event,realTimeRes.data.fileId)">下载</span>
                <span>编辑</span>
            </div>
        </div>
        <i class="el-icon-delete" @click.stop="delItem"></i>
    </div>
</template>

<script>
    import {uploadImgApi, downloadMattedImage, getMattingInfo, copyUpload, uploadossBg} from "../../apis";
    import {base64Toblob} from "../../utils";
    export default {
        name: "batchPhoto",
        props: {
            dataMsg: Object,
            faceBeauty: {
                type: Boolean,
                value: false
            },
            sizeMsg: Object,
            colorVal: String
        },
        data() {
            return {
                result: null,
                faceResult: null,
                oriImg: '',
                oriBgromve:'',
                iconList:['el-icon-s-flag','el-icon-loading','el-icon-circle-close','el-icon-success'],
                tooltip:['等待处理中...','正在处理中...','','处理完成']
            }
        },
        watch: {
            // faceBeauty(n, o) {
            //     if(n && !this.faceResult)
            // }
        },
        computed: {
            dreepAfter() {
                const str=this.faceBeauty ? 'faceResult' : 'result'
                return this[str] && !this[str].code && this[str].data.status === 'success';
            },
            stutasMsg() {
                let msg = '',str=this.faceBeauty ? 'faceResult' : 'result';
                if (!this.dataMsg.switch) msg = 0;//'等待处理中...';
                else {
                    if (this[str] && this[str].code) msg = 2;//this[str].msg;//处理完成且失败
                    else if(this[str] && !this[str].code && this[str].data.status==='success')msg = 3;//'处理完成'//处理完成且成功;
                    else msg = 1;//'正在处理中...';
                }
                return msg
            },
            initPhoto() {
                const str=this.faceBeauty ? 'faceResult' : 'result'
                let {width, height} = this.sizeMsg, mattingMsg = this[str].data, scnum = 200,
                    color = this.colorVal.split( ',' );
                let pw = width > height ? scnum * 0.9 : width * (scnum * 0.9) / height,
                    ph = width > height ? height * (scnum * 0.9) / width : scnum * 0.9;
                let scaleW = 0.55 * ph / pw;
                let iw = pw * scaleW * mattingMsg.originalWidth / (mattingMsg.headData.right - mattingMsg.headData.left);//缩放后的图片宽
                let ih = iw * mattingMsg.originalHeight / mattingMsg.originalWidth;
                let top = -(ih * mattingMsg.headData.top / mattingMsg.originalHeight) + ph * 0.05;
                let left = pw / 2 - ((mattingMsg.headData.right - mattingMsg.headData.left) / 2 + mattingMsg.headData.left) * iw / mattingMsg.originalWidth;
                // let afterPoint={
                //     right:iw*mattingMsg.headData.right/mattingMsg.originalWidth,
                //     left:iw*mattingMsg.headData.left/mattingMsg.originalWidth,
                // }
                // if(afterPoint.right-afterPoint.left<pw){
                //     iw=
                // }
                const a = {
                        width: `${iw}px`,
                        top: (top + ih < ph ? ph - ih : top) + 'px',
                        left: `${left}px`,
                        transform: 'translate(0,0)',
                        height: `${ih}px`
                    },//图片样式
                    b = {
                        width: parseInt( pw ) + 'px',
                        height: parseInt( ph ) + 'px',
                        marginLeft: (-parseInt( pw ) / 2 - 10) + 'px',
                        marginTop: (-parseInt( ph ) / 2) + 'px',
                        background: color.length > 1 ? `linear-gradient(${color[0]},${color[1]})` : this.colorVal
                    };
                return [a, b]
            },
            realTimeRes(){
                return this.faceBeauty ? this.faceResult : this.result;
            },
            fileName(){
                return this.dataMsg.type ? this.dataMsg.img.name : this.dataMsg.img
            }
        },
        mounted() {
            this.oriImg =this.dataMsg.type? URL.createObjectURL( this.dataMsg.img ) : this.dataMsg.img ;
        },
        destroyed(){
            URL.revokeObjectURL(this.oriImg);
        },
        methods: {
            dreepFile(){
                if (this.dataMsg.type) this.getImgData();
                else this.dreepByurl();
            },
            delItem(){
                this.$emit('del',this.dataMsg.id)
            },
            getImgData() {//文件抠图开始
                let file = this.dataMsg.img,str=this.faceBeauty ? 'faceResult' : 'result';
                if(file.size/1024/1024>15){
                    this[str]={code:300,data:'',msg:'网络出现中断，请重试！请选择—个不超过15M的图片进行处理'};
                    this.$emit('initEnd',this.dataMsg.id);
                    return;
                }
                //监听文件读取结束后事件
                let param = new FormData();
                param.append( 'file', file, file.name );
                param.append( 'bodyData', 1 );
                param.append( 'mattingType', 8 );
                if (this.faceBeauty) param.append( 'faceBeauty', 1 );
                uploadImgApi( param ).then( res => {
                    this[str] = res;
                    if (res.code == 0) {
                        if (res.data.status !== 'success') {
                            this.pollingImg();
                            return
                        } ;
                    }
                    if(res.code ||(!res.code && res.data.status === 'success')) this.$emit('initEnd',this.dataMsg.id);
                } ).catch( err => {

                } )
            },
            dreepByurl(){
                let file = this.dataMsg.img,str=this.faceBeauty ? 'faceResult' : 'result';
                //监听文件读取结束后事件
                let obj = {url: file, mattingType: 8,bodyData:1};
                if (this.faceBeauty) obj.faceBeauty=1;
                // if (this.faceBeauty) obj.append( 'faceBeauty', 1 );
                if(this.dataMsg.fileId)obj.fileId=this.dataMsg.fileId;
                copyUpload( obj ).then( res => {
                    this[str] = res;
                    if (res.code == 0) {
                        if (res.data.status !== 'success') {
                            this.pollingImg();
                            return
                        } ;
                    }
                    if(res.code ||(!res.code && res.data.status === 'success')) this.$emit('initEnd',this.dataMsg.id);
                } ).catch( err => {

                } )
            },
            pollingImg() {//轮询
                const str=this.faceBeauty ? 'faceResult' : 'result';
                getMattingInfo( {fileId: this[str].fileId} ).then( res => {
                    this[str] = res;
                    if (!res.code) {
                        if (res.data.status !== 'success') {
                            setTimeout( this.pollingImg, 2000 )
                        }
                    }
                    if(res.code ||(!res.code && res.data.status === 'success')) this.$emit('initEnd',this.dataMsg.id);
                } )
            },
            toEdior() {//跳转编辑器
                if (!this.dreepAfter) return;
                const str=this.faceBeauty ? 'faceResult' : 'result';
                const mattingMsg = this[str].data;
                const data = {
                    ...mattingMsg,
                    ori: mattingMsg.original,
                    pro: mattingMsg.bgRemovedPreview,
                    w: this.sizeMsg.width,
                    h: this.sizeMsg.height,
                    color: this.colorVal,
                    filename: this.sizeMsg.name,
                    downName: this.fileName,
                    fileId: mattingMsg.fileId,
                    mattingType: 8
                }
                localStorage.setItem( 'photoMsg', JSON.stringify( data ) );
                window.open( 'idPhotoEdit.html' );
            },
           async downThis(k,e){//单个下载
                const oCan=document.createElement('canvas'),oTxt=oCan.getContext('2d'),{width,height}=this.sizeMsg,str=this.faceBeauty ? 'faceResult' : 'result',mattingMsg=this[str].data;
                oCan.width=width;
                oCan.height=height;
                let scaleW = 0.55 * height / width,colors=this.colorVal.split(',');
                let iw = width * scaleW * mattingMsg.originalWidth / (mattingMsg.headData.right - mattingMsg.headData.left);//缩放后的图片宽
                let ih = iw * mattingMsg.originalHeight / mattingMsg.originalWidth;
                let top = -(ih * mattingMsg.headData.top / mattingMsg.originalHeight) + height * 0.05;
                let left = width / 2 - ((mattingMsg.headData.right - mattingMsg.headData.left) / 2 + mattingMsg.headData.left) * iw / mattingMsg.originalWidth;
                top=top + ih < height ? height - ih : top;//吸底判断
                const url=this.oriBgromve || (await downloadMattedImage({fileId: mattingMsg.fileId})).data;
                let oImg=new Image();
               oImg.crossOrigin='';
               oImg.onload=()=>{
                   if(colors.length>1){
                       let g=oTxt.createLinearGradient(0,0,0,height);
                       g.addColorStop(0,colors[0]);
                       g.addColorStop(1,colors[1]);
                       oTxt.fillStyle=g;
                   }oTxt.fillStyle=colors[0];
                   oTxt.fillRect(0,0,width,height);
                   oTxt.drawImage(oImg,left,top,iw,ih)
                   let type = k ? 'image/jpeg' : 'image/png', nametype = k ? '.jpg' : '.png',name=this.fileName.substring( 0, this.fileName.lastIndexOf( '.' ) );
                   if (window.navigator.msSaveOrOpenBlob) {
                       let imgData = oCan.msToBlob( function () {
                       }, type );
                       let blobObj = new Blob( [imgData] );
                       window.navigator.msSaveOrOpenBlob( blobObj, name + nametype );
                       // window.navigator.msSaveOrOpenBlob( blobObj );
                   } else {
                       let oA = document.createElement( 'a' );
                       oA.href = base64Toblob(oCan.toDataURL( type ));
                       oA.download = name + nametype;
                       oA.click();
                   }
               };
               oImg.src=addUrlQuery(url)
            }

        }
    }
</script>

<style scoped lang="scss">
    .batchPhoto {
        position: relative;
        width: 200px;
        height: 200px;

        &.afterDom:after {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .6);
            z-index: 11;
            left: 0;
            top: 0;
        }

        .wait img {
            display: block;
            max-width: 200px;
            max-height: 200px;
            display: block;
            margin: 0 auto;
        }

        .loadingStatus {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            font-size: 14px;
            color: #fff;
            z-index: 33;
            justify-content: center;
        }

        .dreepSuccess {
            position: absolute;
            left: 50%;
            top: 50%;
            overflow: hidden;
            border: 8px solid #fff;
            box-shadow: 0 0 10px #eee;
            &:hover > .downBtns {
                transform: translateY(0);
            }


            img {
                position: absolute;
            }
        }

        .downBtns {
            transition: all 0.2s linear;
            position: absolute;
            width: 100%;
            background-color: rgba(0, 0, 0, .6);
            color: #fff;
            font-size: 12px;
            line-height: 20px;
            height: 20px;
            padding: 2px 0;
            left: 0;
            bottom: 0;
            transform: translateY(100%);

            span {
                flex: 1;
                text-align: center;

                &:first-child {
                    border-right: 1px solid #999;
                }

                &:hover {
                    color: #e82255;
                }
            }
        }
        &:hover > i {
            top: 6px;
            visibility: initial;
            opacity: 1;
        }

        & > i {
            position: absolute;
            font-size: 16px;
            right: 6px;
            top: 6px;
            visibility: hidden;
            opacity: 0;
            transition: all 0.2s linear;
            color: #fff;
            background-color: rgba(0, 0, 0, .4);
            padding: 3px;
            z-index: 44;
        }
    }


</style>
