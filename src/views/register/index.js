import Vue from 'vue'
import register from './index.vue'
import '@/plugins/subUntils.js'
import store from '@/store'
new Vue({
    store,
    render: h => h(register)
}).$mount('#register')
