import Vue from 'vue'
import index from './apis.vue'
import '@/plugins/element.js'
import '@/plugins/subUntils.js'
import store from '@/store'
new Vue({
    store,
    render: h => h(index)
}).$mount('#app')
