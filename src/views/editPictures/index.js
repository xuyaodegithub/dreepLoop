import Vue from 'vue'
import index from './index.vue'
import router from './router'
import '@/plugins/subUntils.js'
import store from '@/store'
new Vue({
    router,
    store,
    render: h => h(index)
}).$mount('#editPictures')
