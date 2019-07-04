import Vue from 'vue'
import emailAction from './index.vue'
import router from './router'
import '@/plugins/subUntils.js'
new Vue({
    router,
    render: h => h(emailAction)
}).$mount('#emailAction')
