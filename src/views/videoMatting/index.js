import Vue from 'vue'
import index from './index.vue'
import '@/plugins/element.js'
import '@/plugins/subUntils.js'
import store from '@/store'
import uploader from 'vue-simple-uploader';
Vue.use(uploader);
new Vue({
    store,
    render: h => h(index)
}).$mount('#app')
