import Vue from 'vue'
import resBack from './index.vue'
import '@/plugins/subUntils.js'
import store from '@/store'
new Vue({
    store,
    render: h => h(resBack)
}).$mount('#res')
