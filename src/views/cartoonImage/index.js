import Vue from 'vue'
import cartoon from './index.vue'
import '@/plugins/subUntils.js'
import '@/plugins/element.js'
import store from '@/store'
new Vue({
    store,
    render: h => h(cartoon)
}).$mount('#cartoon')
