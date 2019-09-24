import Vue from 'vue'
import register from './index.vue'
import router from './router'
import '@/plugins/subUntils.js'
new Vue({
    router,
    render: h => h(register)
}).$mount('#register')
