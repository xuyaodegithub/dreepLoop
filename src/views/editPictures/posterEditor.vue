<template>
    <div class="posterEditor flex ">
        <div class="left">
            <div v-for="(item,idx) in leftList" :key="idx" class="cu" :class="{'active' : typeIdx===idx}">
                <i :class="item.icon"></i>
                <p>{{item.name}}</p>
            </div>
        </div>
        <div class="right">
            <div class="subs opas"  @mousedown="moveBack($event,1)" :style="{width:`${parseSubs.bW}px`,height:`${parseSubs.bH}px`}">
                <img :src="parseSubs.baImage" alt="">
                <span class="el-icon-refresh downIcon" v-show="parseSubs.hover" style="z-index: 666"></span>
                <i v-for="it in 5" :key="'a'+it" v-show="parseSubs.hover"
                   :class="{'iOne' : it===1,'iTwo' : it===2,'iTh' : it===3,'iFor' : it===4,'iFive' : it===5}"  style="z-index: 666"></i>
            </div>
            <div class="subs" :style="{width:`${parseSubs.width}px`,height:`${parseSubs.height}px`}">
                <div class="initBack" @mousedown="moveBack" :style="{width:`${parseSubs.bW}px`,height:`${parseSubs.bH}px`}">
                    <img :src="parseSubs.baImage" alt="">
                </div>
                <div class="items" :class="{'hovers' : item.hover}" v-for="(item,idx) in parseSubs.subList"
                     :style="{width:`${item.width}px`,height:`${item.height}px`,lineHeight:`${item.lineH}px`,color:`${item.color}`,left:`${item.x}px`,top:`${item.y}px`,zIndex:`${item.zIndex}`,transform:`rotateZ(${item.rotate}deg)`}"
                     v-drag @mousedown="hoverThis(idx)" @mouseup="setData(idx)">
                    <div v-if="item.type===2" :contenteditable="item.contenteditable" class="text"
                         @blur="setBlur($event,idx)" @dblclick.stop="openSet(idx)">{{item.title}}
                    </div>
                    <div v-if="item.type===4" class="Imgs">
                        <img :src="item.src" alt="">
                    </div>
                    <div v-if="item.type===6" class="flex">
                        <div class="text" v-show="item.title" @blur="setBlur($event,idx)" @dblclick.stop="openSet(idx)"
                             :contenteditable="item.contenteditable">{{item.title}}
                        </div>
                        <div class="Imgs"><img :src="item.src" alt=""></div>
                    </div>
                    <span class="el-icon-refresh downIcon" v-show="item.hover"></span>
                    <i v-for="it in 5" :key="'a'+it" v-show="item.hover"
                       :class="{'iOne' : it===1,'iTwo' : it===2,'iTh' : it===3,'iFor' : it===4,'iFive' : it===5}"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {getTanDeg} from '@/utils'

    export default {
        name: "posterEditor",
        data() {
            return {
                typeIdx: 0,
                leftList: [
                    {name: '模板', type: 1, icon: 'el-icon-tickets'},
                    {name: '文字', type: 2, icon: 'el-icon-edit'},
                    {name: '元素', type: 3, icon: 'el-icon-receiving'},
                    {name: '图片', type: 4, icon: 'el-icon-picture-outline'},
                    {name: '背景', type: 5, icon: 'el-icon-picture-outline-round'},
                    {name: '组合', type: 6, icon: 'el-icon-help'},
                ],
                parseSubs: {
                    baImage: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/resource/img/26/26502.png',
                    zIndex: 1,
                    width: 350,
                    height: 600,
                    hover: false,
                    rotate: 0,
                    x: 0,
                    y: 0,
                    bW:990,
                    bH:1500,
                    subList: [
                        // {
                        //     type: 0,
                        //     x: 0,
                        //     y: 0,
                        //     rotate: 0,
                        //     hover: false,
                        //     zIndex: 1,
                        //     baImage: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/resource/img/25/25781.png',
                        // },
                        {
                            type: 2,
                            title: '文字组件',
                            width: 120,
                            height: 40,
                            x: 0,
                            y: 0,
                            rotate: 0,
                            hover: false,
                            zIndex: 2,
                            color: '#e82255',
                            contenteditable: false,
                            lineH: 24,
                        },
                        {
                            type: 4,
                            title: '图片组件',
                            width: 80,
                            height: 80,
                            x: 0,
                            y: 100,
                            rotate: 0,
                            src: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/resource/img/18/18594.png',
                            hover: false,
                            zIndex: 3
                        },
                        {
                            type: 6,
                            title: '组合组件',
                            width: 200,
                            height: 100,
                            lineH: 24,
                            x: 0,
                            y: 200,
                            rotate: 0,
                            src: 'http://deeplor.oss-cn-hangzhou.aliyuncs.com/matting_preview/2020/06/20/c667b7a73ed24bed82ecb0103ebd3881.png',
                            hover: false,
                            zIndex: 4,
                            contenteditable: false
                        },
                    ]
                }
            }
        },
        mounted() {
        },
        methods: {
            hoverThis(idx) {
                this.parseSubs.hover=false;
                console.log(this.parseSubs.subList[idx].hover)
                this.parseSubs.subList.map( item => item.hover = false )
                this.parseSubs.subList[idx].hover = true
                console.log(this.parseSubs.subList[idx].hover)
                // console.log(this.parseSubs)
            },
            downPinat(i) {

            },
            setData(idx) {
                const oItems = document.querySelectorAll( '.items' )[idx];
                const rotates = idx ? oItems.style.transform.split( '(' )[1].split( 'd' )[0] : 0;
                // console.log( rotates )
                // console.log(oItems.offsetWidth,oItems.offsetHeight)
                this.parseSubs.subList[idx].x = oItems.offsetLeft;
                this.parseSubs.subList[idx].y = oItems.offsetTop;
                this.parseSubs.subList[idx].width = oItems.offsetWidth;
                this.parseSubs.subList[idx].height = oItems.offsetHeight;
                this.parseSubs.subList[idx].rotate = rotates;
                // this.parseSubs.subList[idx].rotate=oItems.offsetRotate;
            },
            moveBack(ev,k) {
                this.parseSubs.subList.map( item => item.hover = false );
                this.parseSubs.hover=true;
                console.log(ev.target.nodeName)
                let oDiv = ['I','SPAN'].includes(ev.target.nodeName) ? document.querySelector('.opas') : ev.target,oBig=!k ? document.querySelector('.opas') : document.querySelector('.initBack') ;
                let [ w, h, top, left, top2, left2] = [ oDiv.offsetWidth, oDiv.offsetHeight, oDiv.offsetTop, oDiv.offsetLeft, oBig.offsetTop, oBig.offsetLeft];
                const rotates = oDiv.style.transform ? oDiv.style.transform.split( '(' )[1].split( 'd' )[0] : 0;
                let [x,x2] = [ev.clientX - oDiv.offsetLeft,ev.clientX - oBig.offsetLeft];
                let [y,y2] = [ev.clientY - oDiv.offsetTop,ev.clientY - oBig.offsetTop];
                document.onmousemove = (e) => {
                    const cn = ev.target.className, mx = e.clientX - ev.clientX, my = e.clientY - ev.clientY;
                    let [l,l2] = [e.clientX - x,e.clientX - x2];
                    let [t,t2 ]= [e.clientY - y,e.clientY - y2];
                    if (cn.includes( 'downIcon' )) {
                        const db = e.clientX - ev.clientX;
                        const res = 180 - getTanDeg( Math.sqrt( Math.pow( db, 2 ) + Math.pow( e.clientY - ev.clientY, 2 ) ) / 2 / (h / 2) ) * 2;
                        oDiv.style.transform = `translate(-50%,-50%),rotateZ(${db > 0 ? -res + parseFloat( rotates ) : res + parseFloat( rotates )}deg)`;
                        oBig.style.transform = `translate(-50%,-50%),rotateZ(${db > 0 ? -res + parseFloat( rotates ) : res + parseFloat( rotates )}deg)`;
                        // console.log(res,rotates)
                    } else if (cn === 'iOne') {
                        oDiv.style.height = h - my + 'px';
                        oDiv.style.top = top +my/2 + 'px';
                        oBig.style.height = h - my + 'px';
                        oBig.style.top = top2 + my/2 + 'px';
                    } else if (cn === 'iTwo') {
                        oDiv.style.width = w + mx + 'px';
                        oDiv.style.left = left+mx/2 + 'px';
                        oBig.style.left = left2+mx/2 + 'px';
                        oBig.style.width = w + mx + 'px';
                    } else if (cn === 'iTh') {
                        oDiv.style.height = h + my + 'px';
                        oDiv.style.top = top +my/2 + 'px';
                        oBig.style.top = top2 +my/2 + 'px';
                        oBig.style.height = h + my + 'px';
                    }
                    else if (cn === 'iFor') {
                        oDiv.style.width = w - mx + 'px';
                        oDiv.style.left = left + mx/2 + 'px';
                        oBig.style.width = w - mx + 'px';
                        oBig.style.left = left2 + mx/2 + 'px'
                    } else if (cn === 'iFive') {
                        oDiv.style.width = w + mx + 'px';
                        oDiv.style.height = (w + mx) * h / w + 'px';
                        oDiv.style.top = top + (h - (w + mx) * h / w)/2 + 'px';
                        oDiv.style.left = left + mx/2 + 'px';
                        oBig.style.width = w + mx + 'px';
                        oBig.style.height = (w + mx) * h / w + 'px';
                        oBig.style.top = top2 + (h - (w + mx) * h / w)/2 + 'px';
                        oBig.style.left = left2 + mx/2 + 'px';
                    } else {
                        oDiv.style.left = l + 'px';
                        oBig.style.left = l2 + 'px';
                        oDiv.style.top = t + 'px';
                        oBig.style.top = t2 + 'px';
                    }

                }
                document.onmouseup = (e) => {
                    console.log(oDiv.style.left)
                    document.onmousemove = null;
                    document.onmouseup = null;
                }

            },
            openSet(idx) {
                const oItems = document.querySelectorAll( '.items' )[idx].getElementsByClassName( 'text' )[0];
                this.parseSubs.subList[idx].contenteditable = true;
                console.log( oItems, 'pppppppppppp' )
                oItems.focus()
            },
            setBlur(e, idx) {
                console.log( e )
            },
        }
    }
</script>

<style scoped lang="scss">
    .posterEditor {
        height: 100%;
        overflow: hidden;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        & > div {
            height: 100%;
        }

        .left {
            width: 80px;
            background-color: #000;
            color: #fff;

            & > div {
                padding: 20px 0;
                font-size: 14px;
                text-align: center;

                i {
                    font-size: 18px;
                }

                &.active {
                    background-color: #9c9c9c;
                }
            }
        }

        .right {
            flex: 1;
            position: relative;

            .opas.subs {
                opacity: .6;
                overflow: initial;
                i{
                    width: 15px;
                    height: 15px;
                }
                span.downIcon{
                    font-size: 30px;
                    color: #3a8ee6;
                    bottom: -40px;
                }
                &:after {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    content: '';
                    left: 0;
                    top: 0;
                }
                & > img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }

            .subs {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 0 0 15px #9c9c9c;
                overflow: hidden;
                i {
                    position: absolute;
                    width: 6px;
                    height: 6px;
                    border: 1px solid #3a8ee6;
                    background-color: #fff;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    cursor: nesw-resize;
                    z-index: 66;

                    &.iOne {
                        top: 0;
                        left: 50%;
                        cursor: n-resize;
                    }

                    &.iTwo {
                        top: 50%;
                        right: 0;
                        cursor: e-resize;
                        transform: translate(50%, -50%);
                    }

                    &.iTh {
                        bottom: 0;
                        left: 50%;
                        cursor: n-resize;
                        transform: translate(-50%, 50%);
                    }

                    &.iFor {
                        top: 50%;
                        left: 0;
                        cursor: e-resize;
                    }

                    &:last-child {
                        top: 0;
                        right: 0;
                        transform: translate(50%, -50%);
                    }
                }

                span.downIcon {
                    position: absolute;
                    left: 50%;
                    bottom: -25px;
                    transform: translate(-50%, 0);
                    border: none;
                    background-color: initial;
                    color: #fff;
                    font-size: 18px;
                    cursor: url(../../assets/image/rotate.svg) 11 9, pointer
                }
                & > img {
                    display: block;
                }

                & > .initBack {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }

                .initBack img {
                    display: block;
                    width: 100%;
                    height: 100%;
                }

                & > div {
                    &:after {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        content: '';
                        left: 0;
                        top: 0;
                    }

                    position: absolute;
                    text-align: center;

                    .Imgs {
                        position: relative;
                        flex: 1;

                        img {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                            left: 0;
                            top: 0;
                        }
                    }


                    .flex {
                        flex-direction: column;
                        height: 100%;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    & > .Imgs {
                        height: 100%;
                    }

                    &.hovers {
                        cursor: move;

                        &:after {
                            border: 1px dashed #3a8ee6;
                        }
                    }
                    .text {
                        cursor: text;
                        position: relative;
                        z-index: 22;
                    }
                }
            }
        }
    }
</style>
