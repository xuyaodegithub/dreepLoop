import Vue from 'vue'
import resBack from './index.vue'
import '@/plugins/subUntils.js'
new Vue({
    render: h => h(resBack)
}).$mount('#res')
