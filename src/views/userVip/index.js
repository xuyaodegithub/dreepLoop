import Vue from 'vue'
import userVip from './index.vue'
import '@/plugins/subUntils.js'
new Vue({
    render: h => h(userVip)
}).$mount('#userVip')
