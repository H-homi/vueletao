import Vue from 'vue';
import App from './App.vue';
Vue.config.productionTip = false

import router from '@/router/index.js';
import { Lazyload,Toast } from 'vant';

// 引入全局过滤器
import '@/util/filter.js';
import '../src/assets/css/normalize.css'

import store from '@/store/carStore.js'
Vue.prototype.$toast = Toast;
// 注册时可以配置额外的选项
Vue.use(Lazyload, {
    lazyComponent: true,
});

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
