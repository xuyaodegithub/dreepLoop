import Vue from 'vue'
import user from './user.vue'
import router from './router'
import '@/plugins/subUntils.js'
new Vue({
    router,
    render: h => h(user)
}).$mount('#user')
