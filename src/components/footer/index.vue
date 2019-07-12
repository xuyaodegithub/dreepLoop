<template>
    <footer id="foter">
        <div class="margin">
            <ul class="flex">
                <li>
                    <img src="static/images/sureLogo.png" alt="">
                    <!--        自助构建人工智能服务视觉应用平台，开创全球首个自助式图像引擎，实现快速服务创建、扩展和维护。企业可以通过简单、快速的API调用，一站式获得多种人工智能技术服务，实现技术与业务的无缝连接。-->
                    <p>Artificial intelligence visual application development platform, forging the world's first self-service image engine to achieve rapid service creation, extension and maintenance. Enterprises acquire a variety of artificial intelligence technology services at one-stop via simple and fast API calls, enabling seamless connection between technology and businesses.</p>
                </li>
                <li>
                    <h4> Contact Us</h4><!--联系我们-->
                    <p>business@deeplor.com</p>
                </li>
                <li>
                    <h4>About Us</h4><!--关于我们-->
                    <p>Upload pictures</p><!--上传图片-->
                    <p>API introduction</p><!--API介绍-->
                    <p>Member Pricing</p><!--会员定价-->
                </li>
                <li>
                    <h4>Research Outcome</h4><!--研究成果-->
                    <p>Face Recognition</p><!--人脸识别-->
                    <p>Gait Recognition</p><!--步态识别-->
                    <p>Intelligent Voice</p><!--智能语音-->
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
        /*width: 124px;*/
        /*height: 40px;*/
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
