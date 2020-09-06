import Vue from 'vue'
import index from './index.vue'
import '@/plugins/subUntils.js'
import store from '@/store'
new Vue({
    store,
    render: h => h(index)
}).$mount('#copyright')
