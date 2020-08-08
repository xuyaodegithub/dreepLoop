import Vue from 'vue'
import aboutUs from './index.vue'
import '@/plugins/subUntils.js'
new Vue({
    render: h => h(aboutUs)
}).$mount('#aboutUs')
