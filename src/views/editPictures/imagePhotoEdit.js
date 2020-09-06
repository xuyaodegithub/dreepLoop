import Vue from 'vue'
import index from './imagePhotoEdit.vue'
import '@/plugins/subUntils.js'
import '@/style/repairIcon/iconfont.css'
import store from '@/store'
new Vue({
    store,
    render: h => h(index)
}).$mount('#imagePhotoEdit')
