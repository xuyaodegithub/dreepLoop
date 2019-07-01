<template>
    <div class="vip">
        <header-sub></header-sub>
        <div class="section margin">
            <h3>获取全分辨率图像</h3>
            <p>1图像=1能量</p>
            <div class="flex j-b a-i">
                <div class="left">
                    <div class="top">推荐个人使用和评估</div>
                    <div class="title">自由账户</div>
                    <div class="price">一</div>
                    <div class="five0">50次免费预览</div>
                    <p>每月通过API和应用程序</p>
                    <div class="share">推荐朋友可获得能量</div>
                    <el-button type="primary" round>免费注册</el-button>
                </div>
                <div class="center">
                    <div class="top">无风险!可随时降级、升级和取消</div>
                    <div class="title">订阅计划</div>
                    <div class="price"><span>￥1.2</span>/图像</div>
                    <el-radio-group v-model="radio">
                        <el-radio :label="item.label" v-for="(item,index) in choseList" :key="index">
                            <span class="clear">
                                <span>{{item.title}}</span>
                                <span>{{item.price}}</span>
                                <span>{{item.consume}}</span>
                            </span>
                        </el-radio>
                        <el-radio :label="99">企业-联系我们</el-radio>
                    </el-radio-group>
                    <el-button type="primary" round>现在订阅</el-button>
                </div>
                <div class="right">
                    <div class="top">随时可用的能量，两年内有效</div>
                    <div class="title">随时可用</div>
                    <div class="price"><span>￥1.2</span>/图像</div>
                    <el-radio-group v-model="radio2" @change="changeRadio2">
                        <el-radio :label="item.label" v-for="(item,index) in choseList" :key="index">
                            <span class="clear">
                                <span>{{item.title}}</span>
                                <span>{{item.price}}</span>
                                <span>{{item.consume}}</span>
                            </span>
                        </el-radio>
                        <el-radio :label="99">企业-联系我们</el-radio>
                    </el-radio-group>
                    <el-button type="primary" round @click="dialogVisible=true">立即购买</el-button>
                </div>
            </div>
        </div>
        <div class="problem">
            <div class="margin">
                <h3>常见问题</h3>
                <div class="item">
                    <div class="flex Ques">
                        <i>Q</i>
                        <p>我应该得到随付即付的能量还是订阅</p>
                    </div>
                    <div class="flex Res">
                        <i>A</i>
                        <p>一次性或难以预测图像的需求，现即付的信用是一个伟大的选择。对于较大的或正在进行的图像的需求，你会节省每一个图片。
                        你的订阅过程。月度计划开始每月津40图像和翻转的任何未使用的能量(100%)你会受益于巨大的储存无需大费周章。</p>
                    </div>
                </div>
                <div class="item">
                    <div class="flex Ques">
                        <i>Q</i>
                        <p>什么是能量</p>
                    </div>
                    <div class="flex Res">
                        <i>A</i>
                        <p>信用使您能够使用删除。bg在高质量的全分辨率图样。您可以使用删除信用。bg通过删除。bg API，在我们的 Windows/ Mac/ Linux应用程序或Photoshop扩展。删除背景从1图像需要1能量，预览图片删除都是免费，通过移除
                        bg和1/4信贷。bg应用程序和API。订阅包括每个月的预算额度，你可以使用在这个月（或滚动到下个月，只要你爆出订阅）现收现付制能量是有效的购买后2年</p>
                    </div>
                </div>
                <div class="item">
                    <div class="flex Ques">
                        <i>Q</i>
                        <p>支付哪些图像</p>
                    </div>
                    <div class="flex Res">
                        <i>A</i>
                        <p>你可以上传任何JPG和PNG图像高达8mb，每个图像都必须包含至少一个人，是一个产品照片或一辆车照片（更多信息），如果图像分辨率大于10像素（例如4000x2500或任何其他长宽比）这个最大分辨率的大小</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="peopleAsk">
            <div class="margin">
                <h3>用户反馈</h3>
                <div class="flex a-i j-b">
                    <div class="ones flex" v-for="(val,index) in feedbackList" :key="index">
                        <div class="imgs">
                            <img :src="val.img" alt="">
                        </div>
                        <div class="msg">
                            <div>{{val.name}}</div>
                            <span>{{val.tag}}</span>
                            <p>{{val.content}}</p>
                        </div>
                    </div>
                </div>
                <el-button type="primary">继续</el-button>
            </div>
        </div>
        <footer-sub></footer-sub>
        <el-dialog
                custom-class="Dlog"
                :close-on-click-modal="false"
                :visible.sync="dialogVisible"
                width="400px">
            <div class="Dcontent">
                <div class="title">订阅计划-{{selectRadio2.title}}</div>
                <div class="price">{{selectRadio2.price}}</div>
                <p><i class="el-icon-minus"></i>&nbsp; 请选择您的地址 &nbsp;<i class="el-icon-minus"></i></p>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                            v-for="(item,index) in options"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
                <el-button @click="dialogVisible = false">继续</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import headerSub from '@/components/header/index.vue'
    import footerSub from '@/components/footer/index.vue'
    import { mapGetters } from 'vuex'
    import { mapActions } from 'vuex'
    export default {
        name: 'vip',
        data () {
            return {
                choseList:[
                    {title:'100能量/月',price:'￥59',consume:'￥1.2/图像',label:1},
                    {title:'200能量/月',price:'￥89',consume:'￥1.2/图像',label:2},
                    {title:'300能量/月',price:'￥109',consume:'￥1.2/图像',label:3},
                    {title:'400能量/月',price:'￥209',consume:'￥1.2/图像',label:4},
                    {title:'500能量/月',price:'￥300',consume:'￥1.2/图像',label:5},
                    {title:'1000能量/月',price:'￥590',consume:'￥1.2/图像',label:6},
                ],
                feedbackList:[
                    {name:'王女士',tag:'跨境店铺店主',content:'他能帮我快速处理图片背景，节约了我大量的时间，让我有更多的时间运营我的店铺，并且他处理图片背景的效果非常强大。',img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3677209778,3519789803&fm=27&gp=0.jpg'},
                    {name:'王女士',tag:'跨境店铺店主',content:'他能帮我快速处理图片背景，节约了我大量的时间，让我有更多的时间运营我的店铺，并且他处理图片背景的效果非常强大。',img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3677209778,3519789803&fm=27&gp=0.jpg'},
                    {name:'王女士',tag:'跨境店铺店主',content:'他能帮我快速处理图片背景，节约了我大量的时间，让我有更多的时间运营我的店铺，并且他处理图片背景的效果非常强大。',img:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3677209778,3519789803&fm=27&gp=0.jpg'},
                ],
                radio:1,
                radio2:1,
                dialogVisible: false,
                value:'1',
                options:[
                    {label:'中国',value:'1'},
                    {label:'美国',value:'2'},
                    {label:'德国',value:'3'},
                    {label:'英国',value:'4'},
                    {label:'澳大利亚',value:'5'},
                    {label:'新加坡',value:'6'},
                ],
                selectRadio2:{}
            }
        },
        computed:{

        },
        watch:{

        },
        mounted(){
            this.changeRadio2(this.radio2)
        },
        methods:{
            changeRadio2(e){
                this.selectRadio2=this.choseList.filter((val,index)=>{
                    return val.label === e
                })[0]
            }
        },
        components:{
            headerSub,footerSub
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.section{
    margin-top: 92px;
    text-align: center;
    margin-bottom: 108px;
    h3{
        font-size: 44px;
        color: #333;
        font-weight: 500;
        margin-bottom: 28px;
    }
    & > p{
        font-size: 16px;
        color: #626262;
        margin-bottom: 78px;
    }
    .left,.center,.right{
        width: 390px;
        overflow: hidden;
        border-radius: 15px;
        text-align: center;
        background-color: #fff;
        height: 550px;
        .top{
            font-size: 12px;
            color: #fff;
            line-height: 50px;
            background-color: #86abbd;
        }
        .title{
            font-size: 20px;
            color: #333;
            margin: 41px 0 30px;
        }
        .price{
            font-size: 12px;
            color: #3bb7f7;
            margin-bottom: 34px;
            line-height: 1;
            span{
                font-size: 30px;
            }
        }
        .el-radio-group{
            text-align: left;
            display: block;
            padding: 0 24px;
            color: #a2a2a2;
            .el-radio{
                width: 100%;
            }

        }
        .clear span{
            display: inline-block;
            width: 31%;
            color: #a2a2a2;
            &:last-child{
                text-align: right;
            }
            &:nth-child(2){
                text-align: center;
            }
        }
        .el-button{
            background-color: #27adf6;
            width: 160px;
            border-color: #27adf6;
            margin-top: 54px;
            margin-bottom: 46px;
        }
        .five0{
            font-size: 14px;
            color: #333;
            margin-bottom: 12px;
            line-height: 1;
        }
        & > p{
            font-size: 12px;
            color: #c6c6c6;
            margin-bottom: 93px;
            line-height: 1;
        }
        .share{
            font-size: 14px;
            line-height: 1;
            color: #333;
            margin-bottom: 55px;
        }
    }
    .left .price{
        font-size: 30px;
        color: #333;
    }
}
    .problem{
        background-color: #fff;
        padding: 86px 0 80px;
        color: #333;
        line-height: 1;
        h3{
            font-size: 32px;
            margin-bottom: 58px;
            font-weight: 500;
            text-align: center;
        }
        .item{
            font-size: 16px;
            line-height: 26px;
            color: #333;
            margin-bottom: 40px;
            i{
                width: 26px;
                border-radius: 50%;
                background-color: #25a9f1;
                text-align: center;
                margin-right: 17px;
                color: #fff;
                height: 26px;
            }
            .Ques{
                font-size: 16px;
                font-weight: 600;
            }
            .Res{
                margin-top: 12px;
                font-size: 14px;
                color: #a4a4a4;
                line-height: 24px;
            }
            .Res i{
                background-color: #3ddfc7;
            }
            p{
                width: 800px;
            }
        }
    }
    .peopleAsk{
        background-color: #f5f5f7;
        padding: 86px 0 130px;
        .a-i{
            flex-wrap: wrap;
        }
        h3{
            font-size: 34px;
            color: #333;
            line-height: 1;
            margin-bottom: 74px;
            text-align: center;
            font-weight: 500;
        }
        .ones{
            background-color: #fff;
            border-radius: 10px;
            width: 330px;
            padding: 30px 30px 50px;
            margin-bottom: 15px;
            line-height: 1;
            /*.imgs{*/
            /*    width: 60px;*/
            /*    height: 60px;*/
            /*    border-radius: 50%;*/
            /*    margin-right: 16px;*/
            /*}*/
            img{
                display: block;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                margin-right: 16px;
            }
            .msg > div{
                font-size: 16px;
                color: #333;
                margin-bottom: 10px;
            }
            .msg > span{
                display: inline-block;
                font-size: 12px;
                margin-bottom: 18px;
                color: #8d8d8d;
            }
            .msg > p{
                font-size: 12px;
                line-height:18px ;
                color: #8d8d8d;
            }
        }
        .el-button{
            width: 160px;
            background-color: #2aadf5;
            height: 50px;
            border-radius: 25px;
            border-color:#2aadf5 ;
            display: block;
            margin:95px auto 0 ;
        }
    }
  .Dcontent{
      .title{
          font-size: 20px;
          color: #5c5c5c;
          margin-bottom: 20px;
      }
      .price{
          font-size: 24px;
          color: #12a7ff;
          margin-bottom: 54px;
      }
      & > p{
          font-size: 14px;
          color: #5c5c5c;
          margin-bottom: 28px;
          line-height: 1;
          i{
              font-size: 20px;
              display: inline-block;
              vertical-align: middle;
          }
      }
      .el-select{
          display: block;
          margin-bottom: 40px;
      }
      .el-button{
          width: 100%;
          border-color: #27adf6;
          background-color: #27adf6;
          color: #fff;
          height: 50px;
      }
  }
</style>
<style lang="scss">
   .vip .el-radio__input.is-checked + .el-radio__label,.vip .el-radio{
        color: #a2a2a2;
    }
    .vip .el-radio__input.is-checked .el-radio__inner{
        border-color: #1babff;
        background-color: #1babff;
    }
    .vip  .el-dialog__body{
        padding: 16px 22px 32px;
        text-align: center;
    }
    .vip{
        .el-dialog{
            border-radius: 15px;
        }
        .el-dialog__headerbtn{
            top: 15px;
            right: 15px;
        }
    }
</style>
