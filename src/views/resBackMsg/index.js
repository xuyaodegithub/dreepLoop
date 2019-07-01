import Vue from 'vue'
import resBack from './index.vue'
import router from './router'
import '@/plugins/subUntils.js'
new Vue({
    router,
    render: h => h(resBack)
}).$mount('#res')
