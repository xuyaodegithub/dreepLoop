import Vue from 'vue'
import user from './user.vue'
import router from './router'
import '@/plugins/subUntils.js'
import store from '@/store'
new Vue({
    store,
    router,
    render: h => h(user)
}).$mount('#user')
