import Vue from 'vue'
import register from './index.vue'
import '@/plugins/subUntils.js'
new Vue({
    render: h => h(register)
}).$mount('#register')
