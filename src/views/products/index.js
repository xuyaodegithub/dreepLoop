import Vue from 'vue'
import product from './index.vue'
import '@/plugins/subUntils.js'
import store from '@/store'
new Vue({
    store,
    render: h => h(product)
}).$mount('#product')
