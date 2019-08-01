import Vue from 'vue'
import aboutUs from './index.vue'
import router from './router'
import '@/plugins/subUntils.js'
new Vue({
    router,
    render: h => h(aboutUs)
}).$mount('#aboutUs')
