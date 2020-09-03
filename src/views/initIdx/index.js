import Vue from 'vue'
import init from './index.vue'
import '@/plugins/subUntils.js'
import store from '@/store'
new Vue({
    store,
    render: h => h(init)
}).$mount('#init')
