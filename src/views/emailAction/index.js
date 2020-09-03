import Vue from 'vue'
import emailAction from './index.vue'
import '@/plugins/subUntils.js'
import store from '@/store'
new Vue({
    store,
    render: h => h(emailAction)
}).$mount('#emailAction')
