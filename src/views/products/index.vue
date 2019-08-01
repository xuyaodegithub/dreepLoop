<template>
    <div class="products">
        <header-sub></header-sub>
        <div class="product margin">
            <div class="imgSeach">
                <h3>Reverse image search</h3>
                <p>Having dificultyt in describing what you want? This content based image retrieval tool helps you find related images for both personal and business (e.g. searching for similar or same products on e commerce platforms) uses. It' s quick and easy!</p>
                <img src="../../assets/image/clother.jpg" alt="">
            </div>
            <div class="transfer">
                <h3>Neural style transfer</h3>
                <p>Transform photographs into artworks by applying appearance of style paintings to the content of user provided pictures. Creation of art pieces is easier than ever before!</p>
                <img src="../../assets/image/mounted.jpg" alt="">
            </div>
            <div class="imgInpainting">
                <h3>Image inpainting</h3>
                <p>Restore the missing parts of photos in just a few seconds. Replace any portions (lost, deteriorated, or unwanted such as watermarks) of the pictures without being noticed.</p>
                <img src="../../assets/image/women.jpg" alt="">
            </div>
            <div class="videoInpainting">
                <h3>Video inpainting</h3>
                <p>Reconstruct the missing parts of video frames at fast speed. High quality results are generated on high definition videos, capturing dynamic textures and moving objects.</p>
                <div class="flex videos a-i">
                    <div v-for="(item,index) in videoList" :key="index" @mouseenter="videoList[index].pause=true" @mouseleave="videoList[index].pause=false">
                        <video :src="item.item" muted ref="videoss" loop>
                            <source :src="item" type="video/mp4">
                            <source :src="item" type="video/ogg">
                            <source :src="item" type="video/webm">
                            Your browser does not support video playback
                        </video>
                        <img src="../../assets/image/play.png" alt="" v-show="item.pause && !item.status"  @click="palys(index)"  class="cu">
                        <img src="../../assets/image/stop.png" alt=""  v-show="item.status"  @click="palys(index)"  class="cu">
                    </div>
                </div>
                <div class="flex Vtext">
                    <span>Original video</span>
                    <span>Masked video</span>
                    <span>Inpainted video</span>
                </div>
            </div>
            <div class="photoTouch">
                <h3>Automated photo retouching</h3>
                <p>No time to edit your photos? This AI powered tool can enhance the aesthetic quality of pictures with just a single click. Anyone can become a pro without any hassle.</p>
                <img src="../../assets/image/water.jpg" alt="">
            </div>
            <div class="aiDesigner">
                <h3>AI designer</h3>
                <p>Ever runs out of innovative ideas? This Generative Adversarial Network (GAN) powered AI designer helps you in many aspects of your work and life: haistyle design, handbag design, shoes design, and many more! No need to hallucinate by yourself anymore.</p>
                <div class="videoOne" @mouseenter="video4Pause=true" @mouseleave="video4Pause=false">
                    <video :src="video4" ref="video4" muted loop>
                        <source :src="video4" type="video/mp4">
                        <source :src="video4" type="video/ogg">
                        <source :src="video4" type="video/webm">
                        Your browser does not support video playback
                    </video>
                    <img src="../../assets/image/play.png" alt=""  @click="paly()" class="cu" v-show="video4Pause && !video4status">
                    <img src="../../assets/image/stop.png" alt=""  @click="paly()" class="cu" v-show="video4status">
                    <div class="zheA"></div>
                </div>
                <div>Dreamed shoes on the run</div>
            </div>
            <div class="face">
                <h3>Face recognition</h3>
                <p>Rapidly detecting and capturing the facial biometrics to identify a person, our face recognition technology based upon deep learning provides robust performance with superb accuracy. Even at low light conditions, reliable results are always achieved with the application of infrared spectrum. No pictures can cheat the system! It can be easily deployed in many categories such as security-law enforcement, health, marketing or retail.</p>
                <img src="../../assets/image/face.jpg" alt="">
            </div>
            <div class="imageClass">
                <h3>Image classification with localization</h3>
                <p>This product can not only assign a class label, but also show the location of an object in the image. Guess what, you don’t have to provide labelled data with object locations. Our model figures out the locations automatically for you. It will your work so much easier in various use cases: automobile, gaming, healthcare, retail, security, social media platform, and many more.</p>
                <img src="../../assets/image/computed.jpg" alt="">
            </div>
            <div class="super">
                <h3>Super Resolution</h3>
                <p>Need to increase the resolution of your poor-quality pictures? this is the right tool for you. Want to experience the stunning effects? Contact us now!</p>
                <img src="../../assets/image/katong.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    import headerSub from '@/components/header/index.vue'
    import video1 from '@/assets/videos/video1.mp4'
    import video2 from '@/assets/videos/video2.mp4'
    import video3 from '@/assets/videos/video3.mp4'
    import video4 from '@/assets/videos/shose.mp4'
    export default {
        name: 'product',
        data () {
            return {
                videoList:[{item:video1,status:true,pause:false},{item:video2,status:true,pause:false},{item:video3,status:true,pause:false}],
                video4,
                video4status:true,
                video4Pause:false
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
            headerSub
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
        margin-top: 55px;
        justify-content: space-between;
        & > div{
            position: relative;
            img{
                position: absolute;
                top: 50%;
                left: 50%;
                margin: -25px 0 0 -25px;
            }
        }
        video{
            width: 340px;
            height: 240px;
            object-fit: fill;
        }
    }
    .videoInpainting{
        .Vtext{
            justify-content: space-between;
            text-align: center;
            padding: 20px 0 60px 0;
            span{
                flex: 1;
            }
        }
    }
    .imgSeach img{
        margin: 45px 0 63px 0;
    }
    .transfer img{
        margin: 55px 0 70px 0;
    }
 .imgInpainting img{
        margin: 65px 0 97px 0;
    }
 .photoTouch img{
        margin:42px 0 90px 0;
    }
    .imageClass img{
        margin:46px 0 65px 0;
    }
    .super img{
        margin:48px 0 84px 0;
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
    .aiDesigner > div:last-child{
        margin-top: 15px;
        padding-bottom: 70px;
    }
.face{
    text-align: center;
    img{
        margin: 36px 0 70px 0;
    }
}
}

</style>

