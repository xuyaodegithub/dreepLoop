import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    // { path: '/', name: 'login', component: r => { require(['./login/Login'], r) }, meta: { title: 'console 登录' }}
    // {
    //     path: '/',
    //     name: 'index',
    //     component:()=> import(/* webpackChunkName: "Home" */ '@/views/Home.vue'),
    //     meta: { title: '首页' }
    // }
]

export default new VueRouter({
    routes: routes
})
