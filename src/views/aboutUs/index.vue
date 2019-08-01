<template>
    <div class="aboutUs">
        <header-sub></header-sub>
        <div class="about flex a-i">
            <div class="aboutLeft">
                <img src="../../assets/image/about.jpg" alt="">
            </div>
            <div class="aboutRight">
                <h3>About us</h3>
                <p>With a group of technomaniacs, PicUP AI leverages the power of artificial intelligence and computer
                    vision to deliver a wide range of products that make your life much easier and your work more
                    productive. Whether it is portrait cut-out, style transfer, inpainting, image enhancing, inverse
                    image search niche or generic image classification, detection, or semantic segmentation task, we
                    will cater to your need. Together, let’s make humanity smarter!
                </p>
                <h4>Contact us</h4>
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
            h3{
                line-height: 1;
                font-size: 34px;
                color: #333;
                margin-bottom: 22px;
            }
            p{
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
