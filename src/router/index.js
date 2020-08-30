import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import home from '@/components/tabber/home.vue';
import mycar from '@/components/tabber/mycar.vue';
import user from '@/components/tabber/user.vue';

import goodslist from '@/components/grid/goodslist.vue';
import toutiao from '@/components/grid/toutiao.vue';

// 商品详情
import goodsinfo from '@/components/goods/goodsinfo.vue';

// 获取文章详细
import getnews from '@/components/news/getnew.vue';

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: home },
    { path: '/mycar', component: mycar },
    { path: '/user', component: user },
    { path: '/goodslist', component: goodslist },
    { path: '/toutiao', component: toutiao },
    { path: '/goodsinfo/:id', component: goodsinfo },
    { path: '/getnews/:id', component: getnews }
]

const router = new VueRouter({
    routes
})

export default router;
