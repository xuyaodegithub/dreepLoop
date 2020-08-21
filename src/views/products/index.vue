<template>
    <div class="products">
        <header-sub></header-sub>
        <div class="product margin">
            <div class="imgInpainting">
                <h3><!--Image inpainting-->人物头像自动分割（抠头像）</h3>
                <!--                <p>Restore the missing parts of photos in just a few seconds. Replace any portions (lost, deteriorated, or unwanted such as watermarks) of the pictures without being noticed.</p>-->
                <!--                <img src="../../assets/image/women.jpg" alt="">-->
                <p>利用人工智能技术全自动分割出照片中的头像，分割精度高，准确率高，速度快。 发丝级抠图，对脸部、头发进行细粒度分析，实现发丝级的精细化分割效果。不论发型是披肩发，还是丸子头，都可以完整分割。非常适合在图像合成的场景中应用，比如：照片换头，制作专属表情包等。</p>
                <div class="flex">
                    <img src="../../assets/image/header_people.jpg" alt="">
                </div>
                <div class="flex deepname">
                    <p>原图效果</p>
                    <p>抠图效果</p>
                    <p>合成效果</p>
                </div>
                <a class="cancat"  href="mailto:pikachu@picup.ai">
                    <span>联系我们:</span>pikachu@picup.ai
                </a>
            </div>
            <div class="imgInpainting">
                <h3><!--Image inpainting-->图像修复</h3>
                <!--                <p>Restore the missing parts of photos in just a few seconds. Replace any portions (lost, deteriorated, or unwanted such as watermarks) of the pictures without being noticed.</p>-->
                <!--                <img src="../../assets/image/women.jpg" alt="">-->
                <p>在几秒钟内恢复丢失的部分照片。替换图片的任何部分（丢失、变质或不需要的部分，如水印），而不被注意。</p>
                <div class="flex j-b">
                    <move-chunk :imgss="arrw"></move-chunk>
                    <move-chunk :imgss="arrg"></move-chunk>
                </div>
                <a class="cancat"  href="mailto:pikachu@picup.ai">
                    <span>联系我们:</span>pikachu@picup.ai
                </a>
            </div>
            <div class="super">
                <h3><!--Super Resolution-->超分辨率</h3>
                <!--                <p>Need to increase the resolution of your poor-quality pictures? this is the right tool for you. Want to experience the stunning effects? Contact us now!</p>-->
                <p>需要提高劣质图片的分辨率吗？这是适合你的工具。想体验惊艳效果吗？现在联系我们！</p>
                <!--                <img src="../../assets/image/katong.jpg" alt="">-->
                <div class="flex" style="justify-content: center;">
                    <move-chunk :imgss="arrr"></move-chunk>
                </div>
                <a class="cancat"  href="mailto:pikachu@picup.ai">
                    <span>联系我们:</span>pikachu@picup.ai
                </a>
            </div>
            <div class="photoTouch">
                <h3><!--Automated photo retouching-->自动照片修饰</h3>
                <!--                <p>No time to edit your photos? This AI powered tool can enhance the aesthetic quality of pictures with just a single click. Anyone can become a pro without any hassle.</p>-->
                <p>没有时间编辑照片？这个人工智能驱动的工具只需点击一下就可以提高图片的美感。任何人都可以成为职业选手而不必麻烦。</p>
                <!--                <img src="../../assets/image/water.jpg" alt="">-->
                <div class="flex j-b">
                    <move-chunk :imgss="arrm"></move-chunk>
                    <move-chunk :imgss="arrf"></move-chunk>
                </div>
                <a class="cancat"  href="mailto:pikachu@picup.ai">
                    <span>联系我们:</span>pikachu@picup.ai
                </a>
            </div>
            <div class="imgSeach">
                <h3><!--Reverse image search-->以图搜款</h3>
<!--                <p>Having dificultyt in describing what you want? This content based image retrieval tool helps you find related images for both personal and business (e.g. searching for similar or same products on e commerce platforms) uses. It' s quick and easy!</p>-->
                <p>难以描述你想要什么？此基于内容的图像检索工具可帮助您查找个人和企业使用的相关图像（例如，在电子商务平台上搜索类似或相同的产品）。它既快又容易！</p>
                <img src="../../assets/image/clother.jpg" alt="">
                <a class="cancat"  href="mailto:pikachu@picup.ai">
                    <span><!--Contact us-->联系我们:</span>pikachu@picup.ai
                </a>
            </div>
            <div class="transfer">
                <h3><!--Neural style transfer-->图像风格转换</h3>
<!--                <p>Transform photographs into artworks by applying appearance of style paintings to the content of user provided pictures. Creation of art pieces is easier than ever before!</p>-->
                <p>通过将风格绘画的外观应用到用户提供的图片的内容，将照片转换为艺术品。创造艺术品比以往任何时候都容易！</p>
                <img src="../../assets/image/mounted.jpg" alt="">
                <a class="cancat"  href="mailto:pikachu@picup.ai">
                    <span>联系我们:</span>pikachu@picup.ai
                </a>
            </div>
            <div class="videoInpainting">
                <h3><!--Video inpainting-->视频修复</h3>
<!--                <p>Reconstruct the missing parts of video frames at fast speed. High quality results are generated on high definition videos, capturing dynamic textures and moving objects.</p>-->
                <p>快速重建视频帧的缺失部分。高质量的结果产生在高清晰度视频，捕捉动态纹理和移动对象。</p>
                <div class="flex videos a-i">
                    <div v-for="(item,index) in videoList" :key="index" @mouseenter="videoList[index].pause=true" @mouseleave="videoList[index].pause=false">
                        <video :src="item.item" muted ref="videoss" loop>
                            <source :src="item" type="video/mp4">
<!--                            <source :src="item" type="video/ogg">-->
<!--                            <source :src="item" type="video/webm">-->
                            你的游览器暂不支持视频播放，换一个试试吧！
                        </video>
                        <img src="../../assets/image/play.png" alt="" v-show="item.pause && !item.status"  @click="palys(index)"  class="cu">
                        <img src="../../assets/image/stop.png" alt=""  v-show="item.status"  @click="palys(index)"  class="cu">
                    </div>
                </div>
                <div class="flex Vtext">
                    <span><!--Original video-->原始视频</span>
                    <span><!--Masked video-->掩码视频</span>
                    <span><!--Inpainted video-->消漆视频</span>
                </div>
                <a class="cancat"  href="mailto:pikachu@picup.ai">
                    <span>联系我们:</span>pikachu@picup.ai
                </a>
            </div>

            <div class="aiDesigner">
                <h3><!--AI designer-->人工智能设计师</h3>
<!--                <p>Ever runs out of innovative ideas? This Generative Adversarial Network (GAN) powered AI designer helps you in many aspects of your work and life: haistyle design, handbag design, shoes design, and many more! No need to hallucinate by yourself anymore.</p>-->
                <p>创新想法用完了吗？这种生成对抗性网络（gan）驱动的人工智能设计师在您的工作和生活的许多方面帮助您：海派设计，手袋设计，鞋子设计，等等！不再需要自己产生幻觉了。</p>
                <div class="videoOne" @mouseenter="video4Pause=true" @mouseleave="video4Pause=false">
                    <video :src="video4" ref="video4" muted loop>
                        <source :src="video4" type="video/mp4">
<!--                        <source :src="video4" type="video/ogg">-->
<!--                        <source :src="video4" type="video/webm">-->
                        你的游览器暂不支持视频播放，换一个试试吧！
                    </video>
                    <img src="../../assets/image/play.png" alt=""  @click="paly()" class="cu" v-show="video4Pause && !video4status">
                    <img src="../../assets/image/stop.png" alt=""  @click="paly()" class="cu" v-show="video4status">
                    <div class="zheA"></div>
                </div>
                <div><!--Dreamed shoes on the run-->梦寐以求的跑鞋</div>
                <a class="cancat"  href="mailto:pikachu@picup.ai">
                    <span>联系我们:</span>pikachu@picup.ai
                </a>
            </div>
            <div class="face">
                <h3><!--Face recognition-->人脸识别</h3>
<!--                <p>Rapidly detecting and capturing the facial biometrics to identify a person, our face recognition technology based upon deep learning provides robust performance with superb accuracy. Even at low light conditions, reliable results are always achieved with the application of infrared spectrum. No pictures can cheat the system! It can be easily deployed in many categories such as security-law enforcement, health, marketing or retail.</p>-->
                <p>我们基于深度学习的人脸识别技术能够快速检测和捕捉面部生物特征，从而识别出一个人，并以极高的准确度提供强大的性能。即使在低光照条件下，红外光谱的应用也总能得到可靠的结果。没有图片可以欺骗系统！它可以很容易地部署在许多类别中，如安全执法、卫生、营销或零售。</p>
                <img src="../../assets/image/face.jpg" alt="">
                <a class="cancat"  href="mailto:pikachu@picup.ai">
                    <span>联系我们:</span>pikachu@picup.ai
                </a>
            </div>
            <div class="imageClass">
                <h3><!--Image classification with localization-->基于局部化的图像分类</h3>
<!--                <p>This product can not only assign a class label, but also show the location of an object in the image. Guess what, you don’t have to provide labelled data with object locations. Our model figures out the locations automatically for you. It will your work so much easier in various use cases: automobile, gaming, healthcare, retail, security, social media platform, and many more.</p>-->
                <p>此产品不仅可以指定类标签，还可以显示对象在图像中的位置。猜猜看，您不必提供带有对象位置的标记数据。我们的模型会自动为您计算出位置。它将使您的工作在各种各样的用例中更加容易：汽车、游戏、医疗保健、零售、安全、社交媒体平台等等。</p>
                <img src="../../assets/image/computed.jpg" alt="">
                <a class="cancat"  href="mailto:pikachu@picup.ai">
                    <span>联系我们:</span>pikachu@picup.ai
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import headerSub from '@/components/header/index.vue'
    import video1 from '@/assets/videos/video.mp4'
    import MoveChunk from '@/components/movesChunk/index.vue'
    import w from '@/assets/image/women.jpg'
    import w2 from '@/assets/image/women2.jpg'
    import g from '@/assets/image/gift.jpg'
    import g2 from '@/assets/image/gift2.jpg'
    import m from '@/assets/image/m.jpg'
    import m1 from '@/assets/image/m1.jpg'
    import f from '@/assets/image/f.jpg'
    import f1 from '@/assets/image/f1.jpg'
    import r from '@/assets/image/r.jpg'
    import r1 from '@/assets/image/r1.jpg'
    export default {
        name: 'product',
        data () {
            return {
                videoList:[{item:video1,status:true,pause:false}],
                video4:'https://deeplor.oss-cn-hangzhou.aliyuncs.com/site/video/shose.mp4',
                video4status:true,
                video4Pause:false,
                // arrw:[w,w2,'Damaged picure','Recovered picture'],
                arrw:[w,w2,'损坏的图片','恢复的图片'],
                // arrg:[g,g2,'Picture with watermark',' picture with watermark removed'],
                arrg:[g,g2,'带水印的图片','删除水印的图片'],
                // arrm:[m,m1,'Original picture','Enhanced picture'],
                arrm:[m,m1,'原始图片','增强型图片'],
                // arrf:[f,f1,'Original picture','Enhanced picture'],
                arrf:[f,f1,'原始图片','增强型图片'],
                // arrr:[r,r1,'Low resolution picture','High resolution picture'],
                arrr:[r,r1,'低分辨率图片','高分辨率图片'],
            }
        },
        computed:{

        },
        watch:{

        },
        mounted(){

        },
        methods:{
            paly(){
                let video=this.$refs.video4
                if(video.paused)video.play()
                else video.pause()
                this.video4status=!this.video4status
            },
            palys(index){
                let video=this.$refs.videoss
                if(video[index].paused)video[index].play()
                else video[index].pause()
                this.videoList[index].status= ! this.videoList[index].status
            },
        },
        components:{
            headerSub,MoveChunk
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.product{
    padding-top: 80px;
    & > div{
        background-color: #fff;
        padding: 60px 70px 0;
        text-align: center;
        color: #636363;
        font-size: 14px;
        line-height: 28px;
        margin-bottom: 20px;
        h3{
            font-size: 28px;
            color: #333;
            margin-bottom: 34px;
            line-height: 1;
        }
        p{
            width: 920px;
            margin: 0 auto;
            /*word-wrap:break-word;*/
            /*word-break:break-all;*/
        }
    }
    .videoInpainting .videos{
        margin-top: 35px;
        justify-content: space-between;
        & > div{
            position: relative;
            width: 100%;
            img{
                position: absolute;
                top: 50%;
                left: 50%;
                margin: -25px 0 0 -25px;
            }
        }
        video{
            width: 100%;
            /*width: 340px;*/
            /*height: 240px;*/
            object-fit: fill;
        }
    }
    .videoInpainting{
        .Vtext{
            justify-content: space-between;
            text-align: center;
            padding: 20px 0 0 0;
            span{
                flex: 1;
            }
        }
    }
    .imgSeach .cancat{
        margin-top: 45px ;
    }
    .transfer .cancat{
        margin-top: 55px;
    }
    .transfer img{
        margin-top: 30px;
    }
    .imgSeach,.transfer,.videoInpainting,.aiDesigner,.face,.imageClass{
        padding-bottom:50px;
    }
    .imgInpainting .flex{
        margin: 42px 0 0 0;
    }
    .imgInpainting{
        padding-bottom: 57px;
    }
    .imgInpainting .deepname{
        margin-top: 0;
        line-height: 40px;
        p{
            flex: 1;
            text-align: center;
        }
    }


 .photoTouch .flex{
        margin:42px 0 0 0;
    }
    .photoTouch{
        padding-bottom: 50px;
    }
    .imageClass img{
        margin:46px 0 0 0;
    }
    .super .flex{
        margin:48px 0 0 0;
    }
    .super{
        padding-bottom: 44px;
    }
.aiDesigner .videoOne{
        width: 256px;
        position: relative;
        margin:48px auto 0 ;
    .zheA{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.2);
        z-index: 10;
    }
    video{
        background-color: #cccccc;
    }
    img{
        position: absolute;
        top: 50%;
        left: 50%;
        margin: -25px 0 0 -25px;
        z-index: 22;
    }
    }
    .aiDesigner > div:nth-last-child(2){
        margin-top: 15px;
    }
.face{
    text-align: center;
    img{
        margin: 36px 0 0 0;
    }
}
    .cancat{
        display: block;
        width: 250px;
        margin: 40px auto 0;
        font-size:14px ;
        text-align: center;
        line-height: 40px;
        background-color: #e82255;
        color: #fff;
        border-radius: 20px;
        span{
            color: #e2e2e2;
            margin-right: 10px;
        }
    }
}

</style>

