<template>
    <div class="seach_page">
        <v-header></v-header>
        <div class="item flex">
            <div class="left">
                <img :src="imgInfo">
                <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="添加你的评论..."
                        v-model="textarea"
                        clearable>
                </el-input>
                <div class="comment">
                    <div v-for="(item,idx) in commentList" :key="idx">
                        <div><span>{{item.user}}</span><span>{{item.time}}</span></div>
                        <p>{{item.content}}</p>
                    </div>
                </div>
            </div>
            <div class="right">
                <!--                <el-button icon="el-icon-download" @click="downLoad">免费下载</el-button>-->
                <div class="flex a-i user">
                    <img src="../../assets/image/userHeader.png" alt="">
                    <div>
                        <p>186****1234</p>
                        <span>共发布9张</span>
                    </div>
                </div>
                <div class="flex a-i otehrWatch">
                    <div class="flex a-i">
                        <img src="../../assets/image/watch.png" alt="">
                        <span>1458</span>
                    </div>
                    <div class="flex a-i">
                        <img src="../../assets/image/pl.png" alt="">
                        <span>50</span>
                    </div>
                </div>
                <div class="imginfos">
                    <div class="flex">
                        <span>尺寸</span>
                        <span>消耗次数</span>
                    </div>
                    <div class="flex">
                        <span>612 x 408</span>
                        <span>0</span>
                        <div class="cu">下载</div>
                    </div>
                    <div class="flex">
                        <span>1200 x 940</span>
                        <span>0</span>
                        <div class="te cu">下载</div>
                    </div>
                    <div>
                        当前可用次数：50 <i>去充值</i>
                    </div>
                </div>
                <div>
                    <h6>其他图像</h6>
                    <div class="flex tags f-w" id="tags">

                    </div>
                </div>
                <div class="msg">
                    <p>图片类型：PNG</p>
                    <p>图片版权：免费可商用<a href="copyright.html">查看</a></p>
                    <p>上传时间：3天</p>
                    <p>下载次数：895</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import vHeader from '@/components/header'
    import '@/utils/iboot.js'
    import {myBrowser} from '@/utils'

    export default {
        name: 'home',
        data() {
            return {
                imgInfo: 'https://cdn.pixabay.com/photo/2019/10/16/10/12/double-exposure-4554077_960_720.jpg',
                textarea:'',
                commentList: [
                    {
                        user: '16605813145',
                        content: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
                        time: '2019-08-09 12:25:36'
                    },{
                        user: '16605813145',
                        content: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
                        time: '2019-08-09 12:25:36'
                    },{
                        user: '16605813145',
                        content: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
                        time: '2019-08-09 12:25:36'
                    },{
                        user: '16605813145',
                        content: '评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容',
                        time: '2019-08-09 12:25:36'
                    },
                ],
                imgs: [
                    {
                        "name": "Red, Twigs, Red Leaves, Autumn, Collapse",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/10/16/40/red-4540013_960_720.jpg"
                    }, {
                        "name": "Angel, Cemetery, Sculpture, Statue",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/11/22/20/06/alpengluhen-4645644_960_720.jpg"
                    }, {
                        "name": "Angel, Cemetery, Sculpture, Statue",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/12/12/30/angel-4543833_960_720.jpg"
                    }, {
                        "name": "Double Exposure, Fantasy, Man, Model",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/16/10/12/double-exposure-4554077_960_720.jpg"
                    }, {
                        "name": "Redhead, Redhair, Ginger, Love, Model",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/11/13/34/redhead-4541897_960_720.jpg"
                    }, {
                        "name": "Laptop, Autumn, Internet, Bench, Senior",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/15/08/17/laptop-4551026_960_720.jpg"
                    }, {
                        "name": "Moon, Fire, Explosion, Sky, Woman, Cloud",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/12/21/19/moon-4544929_960_720.jpg"
                    }, {
                        "name": "Outdoors, Mist, Walking, Fog, Nature",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/15/13/36/outdoors-4551688_960_720.jpg"
                    }, {
                        "name": "Quantum Physics, Wave, Particles",
                        "page": "1",
                        "src": "https://cdn.pixabay.com/photo/2019/10/15/05/15/quantum-physics-4550602_960_720.jpg"
                    },
                ]
            }
        },
        components: {
            vHeader
        },
        methods: {
            pageChange(page) {
                console.log( page, this.page, this.list.length )
            },
            downLoad() {
                let cans = document.createElement( 'canvas' );
                let ctxs = cans.getContext( '2d' );
                let oImg = new Image();
                oImg.crossOrigin = "";
                oImg.onload = function () {
                    cans.width = oImg.width;
                    cans.height = oImg.height;
                    ctxs.drawImage( oImg, 0, 0, cans.width, cans.height );
                    if (myBrowser() === 'IE' || myBrowser() === 'Edge') {//ie下载图片
                        let url = cans.msToBlob();
                        let blobObj = new Blob( [url] );
                        window.navigator.msSaveOrOpenBlob( blobObj, this.bgOriginal.name + ".png" );
                    } else {
                        let url = cans.toDataURL( "image/png" );
                        let arr = url.split( ',' ), mime = arr[0].match( /:(.*?);/ )[1], bstr = atob( arr[1] ),
                            n = bstr.length, u8arr = new Uint8Array( n );
                        while (n--) {
                            u8arr[n] = bstr.charCodeAt( n );
                        }
                        let objurl = URL.createObjectURL( new Blob( [u8arr], {type: mime} ) );
                        let save_link = document.createElement( 'a' );
                        save_link.href = objurl;
                        save_link.download = 'pictrue.png';
                        let event = document.createEvent( 'MouseEvents' );
                        event.initMouseEvent( 'click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null );
                        save_link.dispatchEvent( event );
                    }
                }
                oImg.src = this.imgInfo + `?str=${Math.random()}`
            }
        },
        mounted() {
            const _self = this
            var iboot = new Iboot( '#tags', {
                list: _self.imgs,
                baseHeight: 100,
            } )
            $( window ).resize( function () {
                iboot.resize()
            } )
        }
    }
</script>
<style scoped lang="scss">
    .seach_page {
        padding-top: 40px;
    }

    .block {
        text-align: center;
    }

    .item {
        justify-content: center;
        margin-top: 60px;

        & > div:first-child {
            max-width: 500px;

            img {
                display: block;
                width: 100%;
            }

            .el-textarea {
                margin-top: 50px;
            }
            .comment{
                & > div{
                    margin:25px 0 ;
                    font-size: 14px;
                    color: #333;
                    line-height: 34px;
                    span:last-child{
                        color: #999;
                        display: inline-block;
                        margin-left:30px ;
                    }
                    p{line-height: 24px}
                }
            }
        }

        .right {
            margin-left: 188px;
            width: 18.5%;

            .user {
                font-size: 20px;
                color: #333;
                line-height: 1;
                margin-bottom: 20px;

                img {
                    width: 52px;
                    margin: 0 15px 0 0;
                }

                span {
                    color: rgb(152, 152, 152);
                    font-size: 14px;
                }
            }

            .otehrWatch {
                font-size: 14px;
                color: rgb(152, 152, 152);
                padding-left: 67px;
                margin-bottom: 28px;

                & > div {
                    margin-right: 30px;
                }

                img {
                    margin-right: 5px;
                }
            }

            .imginfos {
                flex: 1;
                background-color: #f5f5f7;
                padding: 10px 25px;
                font-size: 14px;
                color: #333;
                line-height: 40px;
                margin-bottom: 15px;

                .flex {
                    margin-bottom: 15px;

                    .cu {
                        width: 100px;
                        color: #fff;
                        background-color: $co;
                        text-align: center;
                        line-height: 40px;
                        border-radius: 20px;
                    }

                    .cu.te {
                        color: $co;
                        background-color: inherit;
                        border: 1px solid $co;
                        line-height: 38px;
                    }
                }

                .flex:first-child {
                    color: #999;
                }

                span:first-child {
                    width: 40%;
                }

                span:nth-child(2) {
                    width: 25%;
                }

                i {
                    color: $to;
                    margin-left: 20px;
                    border-bottom: 1px solid $to;
                }
            }

            .msg {
                font-size: 14px;
                color: #a5a5a5;
                line-height: 26px;
                margin-bottom: 42px;
                padding: 25px;
                background-color: #f5f5f7;
                margin-top: 15px;

                a {
                    display: inline-block;
                    line-height: 1;
                    padding: 2px 3px;
                    color: $co;
                    border: 1px solid $co;
                    border-radius: 2px;
                    margin-left: 10px;
                }
            }

            h6 {
                font-size: 14px;
                color: #333;
                margin-bottom: 24px;
                font-weight: 500;
                background-color: #f5f5f7;
                line-height: 40px;
                text-indent: 1em;
            }
        }
    }
</style>
