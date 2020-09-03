import Vue from 'vue'
import changePass from './index.vue'
import '@/plugins/subUntils.js'
import store from '@/store'
new Vue({
    store,
    render: h => h(changePass)
}).$mount('#pass')
