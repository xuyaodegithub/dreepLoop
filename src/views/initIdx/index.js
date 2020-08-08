import Vue from 'vue'
import init from './index.vue'
import '@/plugins/subUntils.js'
new Vue({
    render: h => h(init)
}).$mount('#init')
