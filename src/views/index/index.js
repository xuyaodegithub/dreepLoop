import Vue from 'vue'
import index from './index.vue'
import router from './router'
import '@/plugins/element.js'
new Vue({
    router,
    render: h => h(index)
}).$mount('#app')
