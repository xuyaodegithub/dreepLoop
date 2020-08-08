import Vue from 'vue'
import changePass from './index.vue'
import '@/plugins/subUntils.js'
new Vue({
    render: h => h(changePass)
}).$mount('#pass')
