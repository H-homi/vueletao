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

// 获取美图欣赏
import getPhoto from '@/components/photo/photo.vue';

// 获取订单页面
import order from '@/components/user/order.vue';

// 登录页面
import login from '@/components/user/login.vue';

// 注册页面
import register from '@/components/user/register.vue';

// 地址管理页面
import addressmanage from '@/components/address/addressmanage.vue';

// 新增用户收货地址
import addressadd from '@/components/address/addressadd.vue';

// 编辑收货地址
import addressedit from '@/components/address/addressedit.vue';


const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', component: home },
    { path: '/mycar', component: mycar },
    { path: '/user', component: user },
    { path: '/goodslist', component: goodslist },
    { path: '/toutiao', component: toutiao },
    { path: '/goodsinfo/:id', component: goodsinfo },
    { path: '/getnews/:id', component: getnews },
    { path: '/getPhoto', component: getPhoto },
    { path: '/order', component: order },
    { path: '/login', component: login },
    { path: '/register', component: register },
    { path: '/addressmanage', component: addressmanage },
    { path: '/addressadd', component: addressadd },
    { path: '/addressedit/:addressInfo', component: addressedit,props: true },


]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (from.path === '/login' || from.path === '/register'){
        Vue.nextTick(function () {
            let ele = document.querySelector('.van-nav-bar__left');
            if (ele) {
                ele.style.display = ''
            }
        })
    }
    next();
})

export default router;
