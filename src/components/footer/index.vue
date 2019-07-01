<template>
    <footer id="foter">
        <div class="margin">
            <ul class="flex">
                <li>
                    <img src="static/images/logo.png" alt="">
                    <p>自助构建人工智能服务视觉应用平台，开创全球首个自助式图像引擎，实现快速服务创建、扩展和维护。企业可以通过简单、快速的API调用，一站式获得多种人工智能技术服务，实现技术与业务的无缝连接。</p>
                </li>
                <li>
                    <h4>联系我们</h4>
                    <p>business@deeplor.com</p>
                </li>
                <li>
                    <h4>关于我们</h4>
                    <p>上传图片</p>
                    <p>API介绍</p>
                    <p>会员定价</p>
                </li>
                <li>
                    <h4>研究成果</h4>
                    <p>人脸识别</p>
                    <p>步态识别</p>
                    <p>只能语音</p>
                </li>
            </ul>
        </div>
        <div class="last">
            @ Copyright Deeplor 2018. All Rights reserved
        </div>
    </footer>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="scss">
    footer {
        background-color: #191919;
        color: #fff;
        font-size: 12px;
        line-height: 20px;
        padding-top: 62px;
        min-width: 1200px;
    }
    footer img{
        display: block;
        width: 124px;
        height: 40px;
        margin-bottom: 15px;
    }
    footer ul {
        padding-bottom: 40px;
        border-bottom: 1px solid #474747;
    }
    footer ul h4{
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 24px;
    }
    footer ul li{
        flex: 1;
        text-align: center;
    }
    footer ul li:first-child{
        width: 300px;
        margin-right: 110px;
        text-align: left;
    }
    footer .last{
        line-height: 58px;
        text-align: center;
    }
    footer ul li .flex p{
        margin-right: 24px;
    }
</style>
