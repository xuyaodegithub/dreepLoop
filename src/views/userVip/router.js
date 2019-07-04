import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    // { path: '/', name: 'login', component: r => { require(['./login/Login'], r) }, meta: { title: 'console 登录' }}

]

export default new VueRouter({
    routes: routes,
    scrollBehavior(to, from, savedPosition) {//路由切换时滚轮位置//scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
        // return 期望滚动到哪个的位置
        if (savedPosition) {
            return savedPosition
        } else {
            return {x: 0, y: 0}
        }
    }
})
