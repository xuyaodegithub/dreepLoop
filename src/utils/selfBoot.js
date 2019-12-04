class Boot {
    constructor(str, config) {  // 构造函数
        this.ele=$(str);//容器元素
        this.DomW=$(str).width()//容器宽度
        this.trDom = [];//每行dom集合
        this.trW=0;//每行dom集合的实时宽度
        this.lineNum=0;//元素在第几行的属性值
        this.list=config.list;//待渲染数据
        this.idx=0;//加载到第几个数据
        this.baseHeight=config.baseHeight;//初始化高度基数
        this.beforload=config.beforload//初始化回调函数
        this.afterload=config.beforload//结束时回调函数
    }
    init() {  // 初始化方法
        if(this.beforload)this.beforload();
        this.loadImg()
    }
    loadImg(){
        this.list.map((item,index)=>{
            let oDiv=$(`<div class="iboot-item" style="margin: 5px"></div>`),scale;
            const oA=`<a href="detail.html"><img src=${item.src} alt="" style="width: 100%;"></a>`;
            oDiv.append(oA)
            let oImg=new Image()
            oImg.src=item.src;
            oImg.onload=()=>{
                scale=oImg.width/oImg.height;
                oDiv.attr({line:this.lineNum,width: oImg.width,height:oImg.height,scale:scale,idx:index});
                this.ele.find('.iboot-item').eq(index).replaceWith(oDiv);
                // this.trDom.push(oDiv)
                // this.trW+=scale*this.baseHeight;
                // if(this.trW>=this.DomW){
                //     const oh=this.baseHeight*(this.DomW-this.trDom.length*10)/this.trW;//变化后高度
                //     this.trDom.map(v=>{
                //         v.css({
                //             width:oh*v.attr('scale'),height:oh
                //         })
                //         this.ele.find('.iboot-item').eq(v.attr('idx')).replaceWith(v);
                //     })
                //     this.trDom=[];
                //     this.trW=0;
                //     this.lineNum++
                // }
            }
            oImg.onerror=()=>{}
        })
        // let oDiv=$(`<div class="iboot-item" style="margin: 5px"></div>`),scale;
        // const oA=`<a href="detail.html"><img src="${this.list[this.idx].src}" alt="" style="width: 100%;"></a>`;
        // oDiv.append(oA)
        // let oImg=new Image()
    }
    judgeEnd(){//判断是否结束
        this.idx++;
        if(this.idx<this.list.length)this.loadImg();
        else {
            this.trDom.map(v=>{
                v.css({
                    width:this.baseHeight*v.attr('scale'),height:this.baseHeight
                })
                this.ele.find('.iboot-item').eq(v.attr('idx')).replaceWith(v);
            })
            this.afterload ? this.afterload() : '';
        }
    }
}
window.Iboot = function(ele, config){
    return new Boot(ele, config).init();
}
