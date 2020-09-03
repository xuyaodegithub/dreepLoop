import Vue from 'vue'
import down from './index.vue'
import '@/plugins/subUntils.js'
import store from '@/store'
new Vue({
    store,
    render: h => h(down)
}).$mount('#down')
