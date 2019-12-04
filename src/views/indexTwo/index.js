import Vue from 'vue'
import index from './index.vue'
import router from './router'
import '@/plugins/element.js'
import '@/plugins/subUntils.js'
import store from '@/store'
new Vue({
    router,
    store,
    render: h => h(index)
}).$mount('#apptwo')
