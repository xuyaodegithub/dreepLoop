import Vue from 'vue'
import aboutUs from './index.vue'
import '@/plugins/subUntils.js'
import store from '@/store'
new Vue({
    store,
    render: h => h(aboutUs)
}).$mount('#aboutUs')
