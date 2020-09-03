import Vue from 'vue'
import login from './login.vue'
import '@/plugins/subUntils.js'
import store from '@/store'
new Vue({
    store,
    render: h => h(login)
}).$mount('#login')
