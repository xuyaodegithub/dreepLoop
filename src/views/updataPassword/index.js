import Vue from 'vue'
import updataPassword from './index.vue'
import router from './router'
import '@/plugins/subUntils.js'
import store from '@/store'
new Vue({
    store,
    router,
    render: h => h(updataPassword)
}).$mount('#updata')
