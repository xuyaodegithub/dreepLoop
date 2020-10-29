import Vue from 'vue'
// import Element from 'element-ui'
import '../element-variables.scss'
import '../assets/public.css';
import filters from '../filters/filters'
// import locale from 'element-ui/lib/locale/lang/en'
Object.keys(filters).map((val,index)=>{
    Vue.filter(val,filters[val])
    // console.log(val,filters[val])
})
// Vue.use(Element)
Vue.directive('drag',(event)=>{//拖拽的自定义指令
    let oDiv=event;
    oDiv.onmousedown=(ev)=>{
        console.log(ev.target.className)
        if( ev.target.className.indexOf('content')<0 ) return;
        let x=ev.clientX-oDiv.offsetLeft;
        let y=ev.clientY-oDiv.offsetTop;
        document.onmousemove=(e)=>{
            let l=e.clientX-x;
            let t=e.clientY-y;
            oDiv.style.left=l+'px';
            oDiv.style.top=t+'px';
        }
        document.onmouseup=(e)=>{
            document.onmousemove=null;
            document.onmouseup=null;
        }
    }

})
