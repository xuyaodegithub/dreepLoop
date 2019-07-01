import Vue from 'vue'
import login from './login.vue'
import router from './router'
import '@/plugins/subUntils.js'
new Vue({
    router,
    render: h => h(login)
}).$mount('#login')
