<template>
  <div class="box">
    <input
      type="file"
      style="display: none"
      ref="upImg"
      @change="changeImg($event)"
      :multiple="multiple"
      accept="image/*"
    />
    <header-sub></header-sub>
    <div class="apps">
      <div class="Operator">
        <h6>
          <!--Local images-->
          本地视频
        </h6>
        <el-button type="primary" round icon="el-icon-upload2" @click="upLoadimg()">
          <!--Upload-->
          上传
        </el-button>
        <div class="center">
          <h5>Web 图片</h5>
          <div style="position: relative;">
            <img
              src="../../assets/image/inputImg.png"
              alt
              style="position: absolute;left: 8px;top: 12px;"
            />
            <!--                        @keyup.enter="copyImgUrl()"-->
            <input
              type="text"
              placeholder="CTRL+V图像或URL"
              v-model="imgUrl"
              @focus="$event.target.select()"
              class="upcas"
            />
            <!--                        <img src="../../assets/image/img5.png" alt="" style="margin-left:-14px;" class="cu"-->
            <!--                             @click="copyImgUrl()">-->
          </div>
          <!--                    <div class="flex a-i cu">-->
          <!--                        <img src="../../assets/image/img1.png" alt="">-->
          <!--                        <p>Chrome &lt;!&ndash;extension&ndash;&gt;插件</p>-->
          <!--                    </div>-->
        </div>
        <div class="bottonLast">
          <div class="fixedB">
            <h5>
              <!--Contact us-->
              联系我们
            </h5>
            <div class="flex a-i cu">
              <img src="../../assets/image/wx.png" alt />
              <p>roymind</p>
              <img src="../../assets/image/ewm.png" alt style="margin-left: 20px;margin-right: 0;" />
              <img src="../../assets/image/wxl.png" alt class="noC" style="width:120px;" />
            </div>
            <div class="flex a-i cu">
              <img src="../../assets/image/img3.png" alt />
              <p>
                <a href="mailto:pikachu@picup.ai">pikachu@picup.ai</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="OperatorRight">
        <div class="matting">
          <p>一键视频抠图</p>
          <p>100%自动，免费，在线视频去背景</p>
          <div class="imgbox">
            <img src="../../assets/matt-demo.png" alt />
            <div class="inline upload">
              <el-button type="primary" round icon="el-icon-upload2" @click="upLoadimg()">
                <!--Upload-->
                上传图像
              </el-button>
              <el-input
                v-model="imgUrl"
                class="upcas"
                placeholder="CTRL+V粘贴图像或者URL"
                @focus="$event.target.select()"
              ></el-input>
              <p>支持格式：.mp4,.webm,.ogg,.mov,.gif</p>
              <p>最大文件大小：500M</p>
              <p>最大视频清晰度：1080P</p>
              <p>
                更大的文件和超清视频，请联系
                <span>技术顾问</span>
              </p>
            </div>
          </div>
        </div>
        <div class="matting">
          <p>无需绿幕，实景视频抠图</p>
          <p>专业的绿幕布景，昂贵的场地，复杂的技术，通通再见</p>
          <img src="../../assets/image/matt-lm.png" alt class="lm" style="margin-top:-50px" />
          <p class="bot-tip">皮卡智能在线视频抠图，随时随地拍摄，智能去背景</p>
        </div>
        <div class="matting">
          <p>100%全自动，真的一键视频去背景</p>
          <p>无需像素点击，颜色拾取，画蒙版，移动路径。</p>
          <img src="../../assets/image/matt-mb.png" alt class="mb" style="margin-top:-30px" />
          <p class="bot-tip-mb">皮卡智能在线视频抠图，随时随地拍摄，智能去背景</p>
        </div>
        <div class="matting">
          <p>视频抠图去背景场景</p>
          <ul class="list">
            <li>
              <div class="inline-box">
                <div class="inline">
                  <p>影视特效、惊险大片</p>
                  <p>从钢铁侠的上天入地、蜘蛛侠的飞檐走壁，到隐秘到角落里张东升推落山崖的场面，全都是要绿幕抠图，如今有了皮卡智能一键抠视频,你也能轻松制作惊险大片了</p>
                </div>
                <div class="inline">
                  <img src="../../assets/image/matt-list1.png" alt class="list1" />
                </div>
                <div style="clear:both"></div>
              </div>
            </li>
            <li>
              <div class="inline-box">
                <div class="inline">
                  <img src="../../assets/image/matt-list2.png" alt class="list1" />
                </div>
                <div class="inline">
                  <p>宅舞、广场舞、瑜伽健身</p>
                  <p>家里、公园、健身房、学校，世界都是你的舞台，拍摄视频，一键去背景，换上远方的风景，酷炫的电子光，B站、抖音、快手粉丝在召唤。</p>
                </div>
                <div style="clear:both"></div>
              </div>
            </li>
            <li>
              <div class="inline-box">
                <div class="inline">
                  <p>在线教育、视频课程、专家演讲</p>
                  <p>K12英语数学语文，在线视频课程，在家就能录制视频，让教育没有门槛、没有边界。电影讲解、游戏讲解、音乐课程，轻松和内容相结合，露脸讲解不遮挡。</p>
                </div>
                <div class="inline">
                  <img src="../../assets/image/matt-list4.png" alt class="list1" />
                </div>
                <div style="clear:both"></div>
              </div>
            </li>
            <li>
              <div class="inline-box">
                <div class="inline">
                  <img src="../../assets/image/matt-list3.png" alt class="list3" />
                </div>
                <div class="inline">
                  <p>电商短视频、旅游路线讲解</p>
                  <p>每一组电商图片、视频的经费都是昂贵的，拍摄完了，如果要做一个新的热门场景，或者是一个因为经费或者疫情到不了的国外沙滩用一键视频抠图，想去哪里去哪里。</p>
                </div>
                <div style="clear:both"></div>
              </div>
            </li>
          </ul>
        </div>
        <div class="matting">
          <p>示例视频</p>
          <div class="demo"></div>
        </div>
        <div class="matting">
          <p>我们的用户来自</p>
          <div class="imgbox">
            <img src="../../assets/image/matt-user.png" alt class="matt-user" />
          </div>
        </div>
        <div class="matting">
          <p>保持联系</p>
           <img src="../../assets/image/matt-wechat.png" alt class="matt-wechat" />
          <p>微信扫一扫添加技术顾问好友</p>
        </div>
        <div style="height:100px"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import headerSub from "@/components/header/index.vue";
import { getToken, getSecImgs, setSecImgs } from "../../utils/auth";
export default {
  components: { headerSub },
  data() {
    return {
      imgUrl: "", //图片链接
      multiple: false
    };
  },
  created() {},
  mounted() {
    if (getToken()) this.userGetscribe();
  },
  methods: {
    ...mapActions(["userGetscribe"]),
    upLoadimg() {
      //点击上传
      if (!getToken()) this.multiple = false;
      else this.multiple = true;
      this.$refs.upImg.value = "";
      this.$nextTick(() => {
        this.$refs.upImg.click();
      });
    },
    changeImg(ev) {
      //图片上传
      const e = ev.target;
      if (e.files.length > 30) {
        this.$message({
          type: "warning",
          message: "最多同时上传30张图片，请分批次进行上传。"
        });
        return;
      }
      this.toscroll();
      for (let i = 0; i < e.files.length; i++) {
        this.files.unshift({
          url: e.files[i],
          name: parseInt(Math.random() * 100000000000),
          type: "file",
          filename: e.files[i].name
        });
      }
      this.imgUrlss(e.files);
    },
    toscroll() {
      // let oDiv = this.$refs.contentImg.offsetTop;
      $("body,html").animate({ scrollTop: 620 }, 500);
    },
    imgUrlss(obj) {},
    upLoadimg() {}
  }
};
</script>

<style lang='scss' scope>
.inline {
  display: inline-block;
}
.box {
  background: #000;
  .apps {
    padding-right: 75px;
  }

  .apps.tactive {
    padding-right: 85px;
  }
  .OperatorRight {
    margin: 60px 0 0 244px;
    flex: 1;
    padding: 15px 0 0 15px;
    .matting {
      width: 100%;
      min-height: 624px;
      background-color: #202020;
      padding-top: 70px;
      box-sizing: border-box;
      margin-bottom: 15px;
      .list {
        width: 100%;
        margin-top: 60px;
        li {
          width: 100%;
          margin-bottom: 80px;
          .inline-box {
            width: 900px;
            margin: 0 auto;
          }
          .inline:first-child {
            margin-right: 50px;
          }
          .inline {
            float: left;
            max-width: 415px;
            p {
              font-size: 15px;
              text-align: left;
            }
            p:first-child {
              font-size: 30px;
              margin-top: 30px;
            }
          }
          .list1 {
            width: 415px;
            height: 240px;
          }
          .list2 {
            width: 375px;
            height: 240px;
          }
          .list3 {
            height: 350px;
            margin-bottom: 62px;
          }
        }
        li:last-child {
          margin-bottom: 0;
        }
      }
      p {
        width: 100%;
        text-align: center;
        color: rgba(217, 217, 217, 1);
        font-size: 19px;
        margin-bottom: 60px;
      }
      p:first-child {
        font-size: 40px;
        margin-bottom: 20px;
      }
      p.bot-tip {
        margin-top: -60px;
        font-size: 14px;
      }
      p.bot-tip-mb {
        font-size: 14px;
      }
      .imgbox {
        width: 900px;
        margin: 0 auto;
        img {
          width: 481px;
          height: 340px;
          margin-right: 77px;
          float: left;
        }
        .matt-user {
          width: 852px;
          height: 281px;
          margin-top: 78px;
        }
        .upload {
          width: 281px;
          height: 340px;
          .el-button {
            border-radius: 4px;
            width: 100%;
            height: 40px;
            background-color: #e82255;
            color: #fff;
            border-color: #e82255;
            margin-bottom: 20px;
            margin-top: 5px;
          }
          .el-input__inner {
            margin-bottom: 27px;
          }
          p {
            font-size: 14px;
            margin-bottom: 15px;
            color: #9f9f9f;
            text-align: left;
          }
          p:last-child {
            margin-top: 84px;
            span {
              color: #e82255;
            }
          }
        }
      }
      .lm,
      .mb {
        width: 546px;
        height: 427px;
        margin: 0 auto;
        display: block;
        margin-top: -30px;
      }
      .mb {
        width: 544px;
        height: 323px;
        margin-bottom: 30px;
      }
      .matt-wechat {
          width: 260px;
          height: 260px;
          display: block;
          margin: 0 auto;
          margin-top: 50px;
          margin-bottom: 24px;
          font-size: 15px;
        }
    }
  }
  .Operator {
    line-height: 1;
    color: rgba(217, 217, 217, 1);
    width: 244px;
    background-color: #202020;
    font-size: 14px;
    height: 100%;
    position: fixed;
    left: 0;
    top: 60px;
    z-index: 1001;

    h6 {
      padding: 27px 0 25px 34px;
      font-weight: 500;
      font-size: 14px;
      color: rgba(217, 217, 217, 1);
    }

    .el-button {
      border-radius: 0;
      width: 160px;
      height: 40px;
      background-color: #e82255;
      color: #fff;
      border-color: #e82255;
      margin: 0 0 14px 42px;
    }

    .afterbtn {
      padding: 0 0 0 42px;

      span {
        color: #e82255;
      }
    }

    .center {
      margin-top: 24px;
      padding: 24px 0 27px 34px;
      border-top: 1px solid #3d3d3d;
      .flex img {
        margin-right: 6px;
      }

      h5 {
        font-weight: 500;
        font-size: 14px;
        margin-bottom: 24px;
        color: rgba(217, 217, 217, 1);
      }

      input {
        border: none;
        border-bottom: 1px solid rgba(217, 217, 217, 1);
        line-height: 40px;
        height: 40px;
        margin-left: 8px;
        margin-bottom: 22px;
        padding-left: 25px;
        background: #202020;
        color: rgba(217, 217, 217, 1);
      }

      input::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: rgba(217, 217, 217, 1);
      }

      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: rgba(217, 217, 217, 1);
      }

      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: rgba(217, 217, 217, 1);
      }

      input:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: rgba(217, 217, 217, 1);
      }

      .flex {
        margin: 0 0 0 8px;
      }
    }

    .bottonLast {
      padding: 30px 0 30px 34px;
      font-size: 14px;
      /*font-weight: 600;*/
      flex-direction: column;
      justify-content: space-between;

      .flex img {
        margin-right: 10px;
      }

      & > div:first-child {
        margin-bottom: 30px;
      }

      & > div:nth-child(2) {
        /*margin-bottom: 376px;*/
      }

      h5 {
        margin-bottom: 24px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(217, 217, 217, 1);
      }

      .fixedB {
        position: absolute;
        left: 34px;
        bottom: 100px;

        .flex {
          position: relative;
          margin-bottom: 15px;

          &:hover .noC {
            display: block;
          }

          .noC {
            position: absolute;
            bottom: 0;
            right: -116px;
            display: none;
          }
        }

        a {
          color: rgba(217, 217, 217, 1);
        }
      }
    }

    .historyList {
      position: absolute;
      width: 570px;
      background-color: #fff;
      right: -644px;
      top: 8px;
      height: 80%;
      padding: 24px 34px 0;
      z-index: 1001;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);

      .hisimgs {
        height: 95%;
        overflow-y: auto;
      }

      i {
        font-size: 20px;
        position: absolute;
        top: 8px;
        right: 8px;
      }

      .oneDate {
        margin-bottom: 30px;
      }

      .oneDate:nth-last-child(2) {
        margin-bottom: 0;
      }

      h4 {
        font-size: 26px;
        line-height: 1;
        margin-bottom: 20px;
        font-weight: 500;
      }

      .flex {
        flex-wrap: wrap;

        & > div {
          width: 100px;
          height: 100px;
          margin-right: 12px;
          margin-bottom: 15px;
          overflow: hidden;

          img {
            display: block;
            width: 100%;
            /*height: 100%;*/
          }

          &:nth-child(5n) {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>