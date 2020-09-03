import Vue from 'vue'
import userVip from './index.vue'
import '@/plugins/subUntils.js'
import store from '@/store'
new Vue({
    store,
    render: h => h(userVip)
}).$mount('#userVip')
