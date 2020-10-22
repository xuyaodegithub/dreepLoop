<template>
    <div class="helloFirst helloFirstte">
        <input type="file" style="display: none" id="upImg" @change="changeImg" :multiple="true"
               accept="image/*"/>
        <!--        批量证件照-->
        <header-sub></header-sub>
        <div class="mselect">
            <el-select v-model="photoSize" placeholder="请选择" @change="changeSize" filterable>
                <el-option
                        v-for="item in idPhotolist"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
        </div>
        <div class="flex a-i sublist f-w">
            <div v-for="item in files" :key="item.id">
                <batch-photo ref="dreepSub" :dataMsg="item" :faceBeauty="faceBeauty" :sizeMsg="sizeStatus"
                             :colorVal="colorVal" @del="delItme" @initEnd="initEnd" @downLoad="downLoad"></batch-photo>
            </div>
            <div class="item cu" @click="upLoadimg">
                <div class="flex a-i">
                    <div>
                        <i class="el-icon-plus"></i>
                        <p>上传图片</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapGetters, mapActions} from 'vuex'
    import headerSub from '@/components/header/index.vue'
    import {getToken, getSecImgs, setSecImgs} from "../../utils/auth";
    import {getMattedImageMultiple} from "../../apis";
    import {initSmallTag} from '@/utils'
    import {idPhotolist} from '../editPictures/subList3';
    import batchPhoto from '@/components/batchPhoto'
    import JSZip from 'jszip'
    import {saveAs} from "file-saver";
    import {Message, Notification} from 'element-ui'

    export default {
        name: 'HelloWorld',
        data() {
            return {
                photoSize: "一寸(25*35mm)",
                idPhotolist,
                colorVal: '#FF0000',
                files: [],
                faceBeauty: false,
                startDreep: false,
                loading: null,
                downType: 0,
                Percentile: 0,
                allOrItem: 0,//>0单个  0全部
            }
        },
        filters: {},
        watch: {},
        mounted() {
            let oSelect = document.getElementById( 'select' ).getBoundingClientRect();
            let oDiv= $( '.helloFirstte .mselect' )
            oDiv.css( {top: oSelect.top-60, left: oSelect.left} )
            $('#select').append(oDiv)
            // $( '.helloFirstte' ).removeChild('.mselect');
            window._self = this;
            const a = ['upLoadimg', 'showLoginDilogAction', '$confirm', 'changeType', 'delAllItem', 'downLoadAll', 'downLoad', 'showNotification','dreepByurl'];
            a.map( it => window[it] = this[it] )
            window.initSmallTag = initSmallTag;
            this.pasteTomatting();
            this.stopPrevent();
        },
        destroyed() {
        },
        computed: {
            ...mapGetters( [] ),
            sizeStatus() {
                return this.idPhotolist.find( item => item.name === this.photoSize )
            }
        },
        components: {
            headerSub, batchPhoto
        },
        methods: {
            ...mapActions( [
                'userGetscribe', 'showLoginDilogAction'
            ] ),
            showNotification(str) {
                Notification( {
                    type: 'error',
                    message: str
                } )
            },
            startSwitch() {
                if (this.startDreep) return;
                const oDivs = this.$refs.dreepSub, ix = this.files.findIndex( item => !item.switch );
                this.startDreep = true;
                this.files.map( (item, idx) => {
                    if (idx < ix + 5 && !item.switch) {
                        item.switch = true;
                        oDivs[idx].dreepFile();
                    }
                } )
            },
            initEnd(id) {
                const ix = this.files.findIndex( item => item.switch === false );
                if (ix > -1) {
                    this.files[ix].switch = true;
                    this.$refs.dreepSub[ix].dreepFile()
                } else this.startDreep = false;

            },
            delItme(id) {
                const idx = this.files.findIndex( it => it.id === id );
                this.files.splice( idx, 1 );
            },
            delAllItem() {
                if(this.files.length<1)return;
                this.$confirm('确定要删除全部么, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.files = [];
                }).catch(() => {

                });
            },
            downLoadAll(k, blogTitle = 'pictureZip') {
                const str = this.faceBeauty ? 'faceResult' : 'result'
                if (this.allOrItem) {//下载单个
                    const subItem = this.$refs.dreepSub.find( item => item[str].data.fileId === this.allOrItem );
                    subItem.downThis( k );
                    return
                }
                if (this.startDreep) {
                    this.$message( {type: 'warning', message: '尚未全部处理完成，请稍后再试'} );
                    return;
                }
                this.downType = k;
                this.Percentile = 0;
                const allSubs = this.$refs.dreepSub.filter( it => (!it[str].code && it[str].data.fileId) );
                if (allSubs.length < 1) return;
                const allId = allSubs.reduce( (pre, item, idx) => {
                    pre.push( item[str].data.fileId );
                    return pre
                }, [] ), nametype = this.downType ? '.jpg' : '.png';
                let zip = new JSZip(), imgs = zip.folder( blogTitle );
                this.loading = this.$loading( {
                    lock: true,
                    text: `0 / ${allSubs.length}已完成`,
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                } );
                getMattedImageMultiple( allId ).then( res => {
                    if (!res.code) {
                        const results = res.data;
                        results.map( (item, idx) => {
                            let oImg = new Image;
                            oImg.crossOrigin = '';
                            oImg.onload = _ => {
                                const urlMsg = this.initPhoto( oImg, allSubs, idx )
                                imgs.file( urlMsg.name.substring( 0, urlMsg.name.lastIndexOf( '.' ) ) + nametype, urlMsg.url.substring( 22 ), {
                                    base64: true
                                } );
                                this.Percentile += 1;
                                this.loading.text = `${this.Percentile} / ${allSubs.length} 已完成`;
                                if (this.Percentile === allSubs.length) {
                                    this.loading.text = '打包中...'
                                    zip.generateAsync( {type: "blob"} ).then( (content) => {
                                        saveAs( content, blogTitle + ".zip" );
                                        this.loading.close()
                                    } );
                                }
                            }
                            oImg.src = addUrlQuery( item )
                        } )
                    } else this.loading.close()
                } )

            },
            initPhoto(imgObj, allSubs, idx) {
                const {width, height} = this.sizeStatus, colors = this.colorVal.split( ',' ),
                    str = this.faceBeauty ? 'faceResult' : 'result', mattingMsg = allSubs[idx][str].data;
                let scaleW = 0.55 * height / width, oCan = document.createElement( 'canvas' ),
                    oTxt = oCan.getContext( '2d' );
                oCan.width = width;
                oCan.height = height;
                let iw = width * scaleW * mattingMsg.originalWidth / (mattingMsg.headData.right - mattingMsg.headData.left);//缩放后的图片宽
                let ih = iw * mattingMsg.originalHeight / mattingMsg.originalWidth;
                let top = -(ih * mattingMsg.headData.top / mattingMsg.originalHeight) + height * 0.05;
                let left = width / 2 - ((mattingMsg.headData.right - mattingMsg.headData.left) / 2 + mattingMsg.headData.left) * iw / mattingMsg.originalWidth;
                top = top + ih < height ? height - ih : top;
                if (colors.length > 1) {
                    let g = oTxt.createLinearGradient( 0, 0, 0, height );
                    g.addColorStop( 0, colors[0] );
                    g.addColorStop( 1, colors[1] );
                    oTxt.fillStyle = g;
                } else oTxt.fillStyle = colors[0];
                oTxt.fillRect( 0, 0, width, height )
                oTxt.drawImage( imgObj, left, top, iw, ih );
                let type = this.downType ? 'image/jpeg' : 'image/png', nametype = this.downType ? '.jpg' : '.png',
                    name = allSubs[idx].fileName.replace( /\//g, '-' );//吧路径中/替换掉 不然会产生多层嵌套文件夹
                return {url: oCan.toDataURL( type ), name: name}
            },
            downLoad(e, k) {
                if (this.files.length < 1) return;
                let ev = e || window.event;
                ev.stopPropagation();
                let ch = $( window ).height(), cw = $( window ).width(), ih = $( '.saveJpg' ).height(),
                    iw = $( '.saveJpg' ).width(), l, t;
                $( '.saveJpg' ).show();
                if (ev.clientY + ih > ch) t = ev.clientY - ih - 20;
                else t = ev.clientY;
                if (ev.clientX + iw > cw) l = ev.clientX - iw;
                else l = ev.clientX;
                $( '.saveJpg' ).css( {left: l, top: t} )
                this.allOrItem = k || 0;
            },
            changeType() {
                this.faceBeauty = !this.faceBeauty;
                if (this.faceBeauty) $( '.sizeClass .swith' ).removeClass( 'cancal' );
                else $( '.sizeClass .swith' ).addClass( 'cancal' );
            },
            changeImg(e) {
                const list = e.target.files;
                if (list.length > 30) {
                    this.$message( {
                        type: 'warning',
                        message: '单次上传不得超过30张图片，请分批次进行上传。'
                    } )
                    return
                }
                for (let i = 0; i < list.length; i++) {
                    this.files.push( {img: list[i], id: this.files.length ? this.files[this.files.length-1].id+1 : 0, type: 1, switch: false} )//1代表file 0代表url
                }
                this.$nextTick( _ => {
                    this.startSwitch()
                } )
            },
            changeSize(e) {
                this.photoSize = e;
            },
            upLoadimg() {//点击上传
                $( '#upImg' ).val( '' )
                if (getToken()) $( '#upImg' ).click();
                else this.showLoginDilogAction()
            },
            stopPrevent() {//阻止游览器默认打开图片
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
                let oDrops = document.getElementsByClassName( 'OperatorRight' );
                for (let i = 0; i < oDrops.length; i++) {
                    oDrops[i].addEventListener( "drop", (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // e.cancelable=true
                        let files = e.dataTransfer.files;
                        if (!files.length) return;
                        if (!getToken()) {
                            this.showLoginDilogAction()
                            return
                        } else if (files.length > 30) {
                            this.$message( {
                                type: 'warning',
                                message: '单次上传不得超过30张图片，请分批次进行上传。'
                            } )
                            return
                        }
                        for (let i = 0; i < files.length; i++) {
                            this.files.push( {img: files[i], id: this.files.length ? this.files[this.files.length-1].id+1 : 0, type: 1, switch: false} )//1代表file 0代表url
                        }
                        this.$nextTick( _ => {
                            this.toscroll();
                            this.startSwitch()
                        } )
                    } )
                }
            },
            pasteTomatting() {//复制粘贴抠图
                document.addEventListener( 'paste', (e) => {
                    var clipboardData = e.clipboardData,//谷歌
                        i = 0,
                        items, item, types;
                    if (clipboardData) {
                        items = clipboardData.items;
                        if (!items) {
                            return;
                        }
                        item = items[0];
                        types = clipboardData.types || [];
                        for (; i < types.length; i++) {
                            if (types[i] === 'Files') {
                                item = items[i];
                                break;
                            }
                        }
                        if (item && item.kind === 'string' && item.type.match( /^text\//i )) {
                            this.dreepByurl( clipboardData.getData( "Text" ) )
                        }
                        if (item && item.kind === 'file' && item.type.match( /^image\//i )) {
                            this.changeImg( {target: {files: [item.getAsFile()]}} )
                        }
                    }
                } )
            },
            toscroll() {
                // let oDiv = this.$refs.contentImg.offsetTop;
                $( 'body,html' ).animate( {scrollTop: 620}, 500 );
            },
            dreepByurl(url,id) {
                let data={img: url, id: this.files.length ? this.files[this.files.length-1].id+1 : 0, type: 0, switch: false};
                if(id)data.fileId=id;
                this.files.push( data )//1代表file 0代表url
                this.$nextTick( _ => {
                    this.startSwitch()
                } )
            }


        },
        created() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .helloFirst {
        background-color: #fff;
        padding: 30px 0;

        .sublist {
            font-size: 14px;
            color: #000;
            text-align: center;

            .el-icon-plus {
                display: inline-block;
                margin-bottom: 15px;
                font-size: 30px;
            }

            .item {
                border: 8px solid #fff;
                box-shadow: 0 0 10px #eee;

                & > div {
                    width: 164px;
                    height: 164px;
                    justify-content: center;
                    border: 1px dashed #999;
                }

            }

            & > div {
                margin-right: 15px;
                margin-bottom: 10px;
            }
        }
        .el-select {
            width: 180px;
            height: 40px;
        }
    }

</style>
<style>
    .el-icon-loading {
        font-size: 36px;
    }

    .el-loading-spinner p.el-loading-text {
        font-size: 24px;
    }

</style>
