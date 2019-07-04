import Vue from 'vue'
import updataPassword from './index.vue'
import router from './router'
import '@/plugins/subUntils.js'
new Vue({
    router,
    render: h => h(updataPassword)
}).$mount('#updata')
