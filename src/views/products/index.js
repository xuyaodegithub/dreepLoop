import Vue from 'vue'
import product from './index.vue'
import '@/plugins/subUntils.js'
new Vue({
    render: h => h(product)
}).$mount('#product')
