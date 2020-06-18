import Vue from 'vue'
import index from './repairEdit.vue'
import '@/plugins/subUntils.js'
import '@/style/iconfont/iconfont.css'
import store from '@/store'
new Vue({
    store,
    render: h => h(index)
}).$mount('#repairEdit')
