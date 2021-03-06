
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://api.w0824.com/api'
});
import {Toast} from 'vant';
import store from '@/store/carStore.js';
import {sleep} from '@/util/tool.js'

// 添加请求拦截器
instance.interceptors.request.use( async function (config) {
    // 在发送请求之前做些什么
    // console.log(config);
    // 设置自定义请求头（authorized-要求是https）携带token到前台，方便后台进行验证
    var token = localStorage.getItem('token') || '';
    token && (config.headers.token = token);
    //设置请求头，告诉服务端不要缓存，获取最新数据
    config.headers['if-modified-since'] = 0;


    !store.state.isPending && store.commit('changeIsPending',true);
    await sleep(800)

    // console.log('request-'+store.state.isPending);

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log('response-' + store.state.isPending);
    store.commit('changeIsPending',false);
    return response.data;
}, function (error) {
    store.commit('changeIsPending', false);

    // 对响应错误做点什么
    let { data,status } = error.response;
    switch (status) {
        case 401:
            Toast('用户信息过期，请重新登录');
            break;
        default:
            Toast('网络错误，请稍后再试');
            break;
    }
    // return Promise.reject(error);
});

export default instance;
