import bg1 from '@/assets/bgs1/1.jpg'
import bg2 from '@/assets/bgs1/2.jpg'
import bg3 from '@/assets/bgs1/3.jpg'
import bg4 from '@/assets/bgs1/4.jpg'
import bg5 from '@/assets/bgs1/5.jpg'
import bg6 from '@/assets/bgs1/6.jpg'
import bg7 from '@/assets/bgs1/7.jpg'
import bg8 from '@/assets/bgs1/8.jpg'
import bg9 from '@/assets/bgs1/9.jpg'
import bg10 from '@/assets/bgs1/10.jpg'
import bg11 from '@/assets/bgs1/11.jpg'
import bg12 from '@/assets/bgs1/12.jpg'
import bg13 from '@/assets/bgs1/13.jpg'
import bg14 from '@/assets/bgs1/14.jpg'
import bg15 from '@/assets/bgs1/15.jpg'
import bg16 from '@/assets/bgs1/16.jpg'
import bg17 from '@/assets/bgs1/17.jpg'
import bg18 from '@/assets/bgs1/18.jpg'
import bg19 from '@/assets/bgs1/19.jpg'
import bg20 from '@/assets/bgs1/20.jpg'
import bg21 from '@/assets/bgs1/21.jpg'
import bgs1 from '@/assets/bgs2/1.jpg'
import bgs2 from '@/assets/bgs2/2.jpg'
import bgs3 from '@/assets/bgs2/3.jpg'
import bgs4 from '@/assets/bgs2/4.jpg'
import bgs5 from '@/assets/bgs2/5.jpg'
import bgs6 from '@/assets/bgs2/6.jpg'
import bgs7 from '@/assets/bgs2/7.jpg'
import bgs8 from '@/assets/bgs2/8.jpg'
import bgs9 from '@/assets/bgs2/9.jpg'
import bgs10 from '@/assets/bgs2/10.jpg'
import bgs11 from '@/assets/bgs2/11.jpg'
import bgs12 from '@/assets/bgs2/12.jpg'
import bgs13 from '@/assets/bgs2/13.jpg'
import bgs14 from '@/assets/bgs2/14.jpg'
import bgs15 from '@/assets/bgs2/15.jpg'
import bgs16 from '@/assets/bgs2/16.jpg'
import bgs17 from '@/assets/bgs2/17.jpg'
import bgs18 from '@/assets/bgs2/18.jpg'
import bgs19 from '@/assets/bgs2/19.jpg'
import bgs20 from '@/assets/bgs2/20.jpg'
import bgs21 from '@/assets/bgs2/21.jpg'
import bgs22 from '@/assets/bgs2/22.jpg'
import bgs23 from '@/assets/bgs2/23.jpg'
import bgz1 from '@/assets/bgs3/1.jpg'
import bgz2 from '@/assets/bgs3/2.jpg'
import bgz3 from '@/assets/bgs3/3.jpg'
import bgz4 from '@/assets/bgs3/4.jpg'
import bgz5 from '@/assets/bgs3/5.jpg'
import bgz6 from '@/assets/bgs3/6.jpg'
import bgz7 from '@/assets/bgs3/7.jpg'
import bgz8 from '@/assets/bgs3/8.jpg'
import bgz9 from '@/assets/bgs3/9.jpg'
import bgz10 from '@/assets/bgs3/10.jpg'
import bgz11 from '@/assets/bgs3/11.jpg'
import bgz12 from '@/assets/bgs3/12.jpg'
import bgz13 from '@/assets/bgs3/13.jpg'
import bgz14 from '@/assets/bgs3/14.jpg'
import bgz15 from '@/assets/bgs3/15.jpg'
import bgz16 from '@/assets/bgs3/16.jpg'
import bgz17 from '@/assets/bgs3/17.jpg'
import bgz18 from '@/assets/bgs3/18.jpg'
import bgz19 from '@/assets/bgs3/19.jpg'
import bgz20 from '@/assets/bgs3/20.jpg'
import bgz21 from '@/assets/bgs3/21.jpg'
import bgz22 from '@/assets/bgs3/22.jpg'
import bgz23 from '@/assets/bgs3/23.jpg'
import bgz24 from '@/assets/bgs3/24.jpg'
import bgz25 from '@/assets/bgs3/25.jpg'
import bgz26 from '@/assets/bgs3/26.jpg'
import bgz27 from '@/assets/bgs3/27.jpg'
import bgz28 from '@/assets/bgs3/28.jpg'
import bgz29 from '@/assets/bgs3/29.jpg'
import bgz30 from '@/assets/bgs3/30.jpg'
import color from '@/assets/image/color.png'
import fopa from '@/assets/image/fopa.png'
import mohu1 from '@/assets/image/mohu1.png'
import mohu2 from '@/assets/image/mohu2.png'
import { downloadMattedImage } from "@/apis";
export const mixins={
  data(){
    return {
      oneItemBg:[bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11, bg12, bg13, bg14, bg15, bg16, bg17, bg18, bg19, bg20, bg21],
      bgList: [
        [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11, bg12, bg13, bg14, bg15, bg16, bg17, bg18, bg19, bg20, bg21],
        [bgs1, bgs2, bgs3, bgs4, bgs5, bgs6, bgs7, bgs8, bgs9, bgs10, bgs11, bgs12, bgs13, bgs14, bgs15, bgs16, bgs17, bgs18, bgs19, bgs20, bgs21, bgs22, bgs23,],
        [bgz1, bgz2, bgz3, bgz4, bgz5, bgz6, bgz7, bgz8, bgz9, bgz10, bgz11, bgz12, bgz13, bgz14, bgz15, bgz16, bgz17, bgz18, bgz19, bgz20, bgz21, bgz22, bgz23, bgz24, bgz25, bgz26, bgz27, bgz28, bgz29, bgz30,],
      ],
      colorList:[
        '#fc0615','#ff7f02','#ffff11','#1cff12','#1bffff','#0000fe','#fc01fc','#7f0f7f','#986633','#ffffff','#7f7f7f','#000000',
        '#ffffff','#ebebeb','#d6d6d6','#c2c2c2','#adadad','#999999','#858585','#707070','#5c5c5c','#474747','#333333','#000000',
        '#12374a','#061a55','#10033b','#2e063b','#3c091a','#5c0f07','#5b1f05','#563309','#583c0c','#676113','#4f5613','#273e14',
        '#154d66','#0f2f7c','#190950','#451058','#551428','#81190c','#7b2a0c','#7b4a10','#795813','#8c8614','#71761a','#38571c',
        '#0a6d8d','#1542a9','#2a0876','#621c7e','#781d3e','#b51d12','#ae3d13','#aa6917','#a77a15','#c3bc14','#9aa40d','#4f7a28',
        '#158cb4','#1855d4','#371b94','#7a259e','#982550','#e32316','#db5017','#d4810b','#d39c0c','#f5eb17','#c3d119','#689d31',
        '#06a1d7','#1260fe','#4e22b5','#972abb','#ba2c5c','#ff3f1a','#fe690b','#fcaa18','#fec810','#fffc45','#d9ec38','#76bc3f',
        '#0fc7fd','#3c87fe','#5f2eec','#bf36f5','#e73a7c','#ff6050','#ff8647','#ffb43f','#fecb3e','#fef769','#e3ef65','#97d45f',
        '#54d6fa','#75a7ff','#874efd','#d257fd','#ef71a0','#fe8c82','#fea57d','#fec775','#fdda76','#fdf892','#ebf390','#b2dd8b',
        '#96e2fa','#a9c6fe','#b18cfd','#e391fd','#f4a4c1','#ffb4ae','#fec5aa','#ffd9a8','#fee4a9','#fefaba','#f4f6b7','#cce8b5',
        '#ccf0fe','#d3e2ff','#d9c8fe','#efcafe','#f9d3e0','#fedbd9','#ffe3d7','#feedd3','#fff1d4','#fffdde','#f7fadd','#e0eed5',
      ],//色板
      color: [fopa, color,mohu2,mohu1],
    }
  },
  methods:{
    edireThis(k){
      const editPictures={
        pro:this.bgOriginal.img,
        ori:this.Original
      }
      if(!k){
        localStorage.setItem('editImg',JSON.stringify(editPictures))
        window.open('editPictures.html')
      } else{
        if( this.imageMUrl){
          editPictures.pro=this.imageMUrl
          localStorage.setItem('editImg',JSON.stringify(editPictures))
          window.open('editPictures.html')
          return
        }
        downloadMattedImage({fileId: this.fileId}).then(res => {
          if (!res.code) {
            this.imageMUrl = res.data
            editPictures.pro=res.data
            localStorage.setItem('editImg',JSON.stringify(editPictures))
            window.open('editPictures.html')
          }
        })
      }
    },
  },
  mounted(){

  },
  created(){

  },
}
