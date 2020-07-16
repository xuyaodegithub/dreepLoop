<template>
    <div class="aboutUs">
        <header-sub></header-sub>
        <div class="about flex a-i">
            <div class="aboutLeft">
                <img src="../../assets/image/about.jpg" alt="">
            </div>
            <div class="aboutRight">
                <h3>关于我们</h3>
<!--                <p>With a group of technomaniacs, PicUP AI leverages the power of artificial intelligence and computer-->
<!--                    vision to deliver a wide range of products that make your life much easier and your work more-->
<!--                    productive. Whether it is portrait cut-out, style transfer, inpainting, image enhancing, inverse-->
<!--                    image search niche or generic image classification, detection, or semantic segmentation task, we-->
<!--                    will cater to your need. Together, let’s make humanity smarter!-->
<!--                </p>-->
                <p>有了一群技术狂人，picup ai利用人工智能和计算机视觉的力量，提供各种各样的产品，使您的生活更容易，工作更富有成效。无论是人像裁剪、风格转换、绘画、图像增强、逆向图像搜索利基或通用图像分类、检测或语义分割任务，我们都能满足您的需求。让我们一起让人类变得更聪明！</p>
                <h4>联系我们</h4>
                <div class="flex a-i cu ac">
                    <img src="../../assets/image/wx.png" alt="">
                    <p>roymind</p>
                    <img src="../../assets/image/ewm.png" alt="" style="margin-left: 20px;margin-right: 0;">
                    <img src="../../assets/image/wxl.png" alt="" class="noC" style="width:120px;">
                </div>
                <div class="flex a-i">
                    <img src="../../assets/image/img3.png" alt="">
                    <a href="mailto:pikachu@picup.ai">pikachu@picup.ai</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headerSub from '@/components/header/index.vue'

    export default {
        name: 'aboutUs',
        data() {
            return {}
        },
        computed: {},
        watch: {},
        mounted() {

        },
        methods: {},
        components: {
            headerSub
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.aboutUs{
    padding-top: 80px;
    line-height: 1;
    .about{
        width: 1010px;
        margin: 0 auto;
        background-color: #fff;
        padding: 80px 110px 90px 80px;
        justify-content: space-between;
        .aboutRight{
            width: 536px;
            .ac{
                position: relative;
                margin-bottom: 15px;
                font-size: 16px;
                text-align: center;
                width: 150px;
                p{
                    margin-left: 20px;
                }
                &:hover .noC{display: block;}
                .noC{
                    position: absolute;
                    bottom: 0;
                    right: -116px;
                    display: none;
                }
            }
            h3{
                line-height: 1;
                font-size: 34px;
                color: #333;
                margin-bottom: 22px;
            }
            & > p{
                font-size: 16px;
                color: #777;
                line-height: 28px;
                margin-bottom: 35px;
            }
            h4{
                font-size: 16px;
                color: #777;
                margin-bottom: 22px;
                font-weight: 500;
            }
            a{
                font-size: 16px;
                color: #333;
                margin-left: 16px;
            }
        }
    }
}

</style>
