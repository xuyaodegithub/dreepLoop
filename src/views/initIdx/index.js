import Vue from 'vue'
import init from './index.vue'
import router from './router'
import '@/plugins/subUntils.js'
new Vue({
    router,
    render: h => h(init)
}).$mount('#init')
