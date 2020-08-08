import Vue from 'vue'
import down from './index.vue'
import '@/plugins/subUntils.js'
new Vue({
    render: h => h(down)
}).$mount('#down')
