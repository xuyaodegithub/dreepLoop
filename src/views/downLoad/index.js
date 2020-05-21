import Vue from 'vue'
import down from './index.vue'
import router from './router'
import '@/plugins/subUntils.js'
new Vue({
    router,
    render: h => h(down)
}).$mount('#down')
