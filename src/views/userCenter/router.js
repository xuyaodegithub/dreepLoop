import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    // { path: '/', name: 'login', component: r => { require(['./login/Login'], r) }, meta: { title: 'console 登录' }}
    {
        path: '/',
        name: '我的订阅',
        component: ()=> import(/* webpackChunkName: "Retrieve" */ '@/views/userCenter/user-subscribe.vue'),
    },{
        path: '/userCenter/user-credit',
        name: '我的学分',
        component: ()=> import(/* webpackChunkName: "Retrieve" */ '@/views/userCenter/user-credit.vue'),
    },{
        path: '/userCenter/secret',
        name: 'API秘钥',
        component: ()=> import(/* webpackChunkName: "Retrieve" */ '@/views/userCenter/user-secret-key.vue'),
    },{
        path: '/userCenter/earn',
        name: '赚取学分',
        component: ()=> import(/* webpackChunkName: "Retrieve" */ '@/views/userCenter/user-earn.vue'),
    },{
        path: '/userCenter/history',
        name: '历史记录',
        component: ()=> import(/* webpackChunkName: "Retrieve" */ '@/views/userCenter/user-history.vue'),
    },{
        path: '/userCenter/set',
        name: '账户设置',
        component: ()=> import(/* webpackChunkName: "Retrieve" */ '@/views/userCenter/user-set.vue'),
    },
]

export default new VueRouter({
    routes: routes
})
