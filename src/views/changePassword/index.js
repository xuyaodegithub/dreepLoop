import Vue from 'vue'
import changePass from './index.vue'
import router from './router'
import '@/plugins/subUntils.js'
new Vue({
    router,
    render: h => h(changePass)
}).$mount('#pass')
