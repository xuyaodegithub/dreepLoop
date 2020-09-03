import Vue from 'vue'
import index from './image.vue'
import '@/plugins/element.js'
import '@/plugins/subUntils.js'
import store from '@/store'
new Vue({
    store,
    render: h => h(index)
}).$mount('#imagePhoto')
