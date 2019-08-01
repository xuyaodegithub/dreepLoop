import Vue from 'vue'
import product from './index.vue'
import router from './router'
import '@/plugins/subUntils.js'
new Vue({
    router,
    render: h => h(product)
}).$mount('#product')
