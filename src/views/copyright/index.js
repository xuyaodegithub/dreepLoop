import Vue from 'vue'
import index from './index.vue'
import '@/plugins/subUntils.js'
new Vue({
    render: h => h(index)
}).$mount('#copyright')
