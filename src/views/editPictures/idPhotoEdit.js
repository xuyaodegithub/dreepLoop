import Vue from 'vue'
import index from './idPhotoEdit.vue'
import '@/plugins/subUntils.js'
import '@/style/repairIcon/iconfont.css'
import '@/style/font/iconfont.css'
import store from '@/store'
new Vue({
    store,
    render: h => h(index)
}).$mount('#idPhotoEdit')
