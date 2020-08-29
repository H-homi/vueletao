import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import home from '@/components/tabber/home.vue'
import mycar from '@/components/tabber/mycar.vue'
import user from '@/components/tabber/user.vue'

import goodslist from '@/components/grid/goodslist.vue'
import toutiao from '@/components/grid/toutiao.vue'

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: home },
    { path: '/mycar', component: mycar },
    { path: '/user', component: user },
    { path: '/goodslist', component: goodslist },
    { path: '/toutiao', component: toutiao },
]

const router = new VueRouter({
    routes
})

export default router;
