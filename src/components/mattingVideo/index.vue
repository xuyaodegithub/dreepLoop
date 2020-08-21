<template>
    <div class="mattingVideo">
        <div class="vupload">
            <p>预览</p>
            <p class="name">文件名-ahc.mp4</p>
            <el-progress :stroke-width="16" :percentage="upIng" color="#E82256" :show-text="false"></el-progress>
            <p class="jd">上传进度：{{upIng}}%</p>
            <i class="close cu el-icon-close"></i>
        </div>
        <div class="preview">
            <p>预览</p>
            <p class="title">
                文件名<span>时长：00：58</span><span>每秒35帧</span>
            </p>
            <div class="viewBox">
                <img src="../../assets/image/matt-view.png" alt=""/>
                <img src="../../assets/image/matt-view.png" alt=""/>
            </div>
        </div>

    </div>
</template>

<script>
    import sha256  from "js-sha256" ;
    import { BySha256,videoMatting } from '@/apis';
    export default {
        name: "index",
        props:{
            files:File
        },
        data(){
            return {
                upIng: 50,
            }
        },
        methods:{

        },
        mounted(){
            let reader = new FileReader();
            reader.readAsArrayBuffer(this.files);
            reader.onload = function () {
                console.log(sha256(reader.result),reader.result,555)
            };


        }
    }
</script>

<style scoped lang="scss">
    .vupload {
        width: 100%;
        height: 260px;
        background-color: #202020;
        position: relative;
        box-sizing: border-box;
        padding: 27px 110px;

        .close {
            color: #fff;
            width: 15px;
            height: 16px;
            right: 19px;
            top: 17px;
            font-size: 16px;
            position: absolute;
        }

        p {
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(217, 217, 217, 1);
            line-height: 23px;
            text-align: center;
        }

        .name {
            margin-top: 55px;
            font-size: 20px;
            text-align: left;
        }

        .el-progress {
            margin: 28px 0 22px 0;
        }

        .jd {
            color: #999;
            font-size: 14px;
        }
    }
    .preview {
        width: 100%;
        height: 616px;
        background-color: #202020;
        position: relative;
        box-sizing: border-box;
        padding: 27px 110px;
        margin-top: 15px;

        .viewBox {
            margin-top: 20px;
            margin-bottom: 34px;

            img {
                width: 50%;
                display: inline-block;
            }
        }

        p {
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(217, 217, 217, 1);
            line-height: 23px;
            text-align: center;
        }

        .title {
            font-size: 20px;
            text-align: left;

            span {
                font-size: 13px;
                color: #999;
                margin-left: 19px;
            }
        }
    }


</style>
