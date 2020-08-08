import Vue from 'vue'
import emailAction from './index.vue'
import '@/plugins/subUntils.js'
new Vue({
    render: h => h(emailAction)
}).$mount('#emailAction')
