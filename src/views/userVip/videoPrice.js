import Vue from 'vue'
import userVip from './videoPrice.vue'
import '@/plugins/subUntils.js'
import store from '@/store'
new Vue({
    store,
    render: h => h(userVip)
}).$mount('#videoPrice')
