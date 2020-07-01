import Vue from 'vue'
import index from './index.vue'
import router from './router'
import '@/plugins/subUntils.js'
import '@/style/repairIcon/iconfont.css'
import '@/style/font/iconfont.css'
import store from '@/store'
new Vue({
    router,
    store,
    render: h => h(index)
}).$mount('#editPictures')
