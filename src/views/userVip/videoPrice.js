import Vue from 'vue'
import userVip from './videoPrice.vue'
import '@/plugins/subUntils.js'
new Vue({
    render: h => h(userVip)
}).$mount('#videoPrice')
