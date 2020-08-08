import Vue from 'vue'
import login from './login.vue'
import '@/plugins/subUntils.js'
new Vue({
    render: h => h(login)
}).$mount('#login')
