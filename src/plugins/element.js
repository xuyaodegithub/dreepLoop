import Vue from 'vue'
import Element from 'element-ui'
import '../element-variables.scss'
import '../assets/public.css';
import filters from '../filters/filters'
import locale from 'element-ui/lib/locale/lang/en'
Object.keys(filters).map((val,index)=>{
    Vue.filter(val,filters[val])
    // console.log(val,filters[val])
})
Vue.use(Element,{ locale })
