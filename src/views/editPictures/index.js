import Vue from 'vue'
import index from './index.vue'
import '@/plugins/subUntils.js'
import '@/style/repairIcon/iconfont.css'
import '@/style/font.css'
import store from '@/store'
new Vue({
    store,
    render: h => h(index)
}).$mount('#editPictures')
