import Vue from 'vue'
import userVip from './index.vue'
import router from './router'
import '@/plugins/subUntils.js'
new Vue({
    router,
    render: h => h(userVip)
}).$mount('#userVip')
