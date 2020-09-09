
import instance from './config.js';

export async function getLunboData(){
    return await instance.get('/getlunbo');
}

export async function getRecommendData() {
    return await instance.get('/recommend');
}

export async function getGoodslistContainer(createPage) {
    return await instance.get(`/getgoods?pageindex=${createPage}`);
}

export async function getNewslistData(page = 1, pagesize = 5){
    return await instance.get(`/getnewslist?page=${page}&pagesize=${pagesize}`);
}

// 获得商品详细
export async function getGoodsinfo(id){
    return await instance.get(`/getgoodsinfo/${id}`);
}
export async function getthumbimages(id){
    return await instance.get(`/getthumbimages/${id}`);
}

// 获取文章详细
export async function getnews(id) {
    return await instance.get(`/getnew/${id}`);
}

// 获取评论
export async function getcomments(newsid, pageindex) {
    return await instance.get(`/getcomments/${newsid}?pageindex=${pageindex}`);
}
//发表评论
export async function postCommentData(value,id) {
    return await instance.get(`/postcomment/${id}`, {content:value});
}
//获取购物车商品信息
export async function getshopcarlistData(ids){
    return await instance.get(`/getshopcarlist/${ids}`);
}

//获取美图欣赏
export async function getcategory() {
    return await instance.get(`/getcategory`);
}
// 获取美图欣赏的右边内容
export async function getcatelist(id) {
    return await instance.get(`/getcatelist/${id}`);
}

/* export async function getthumbimages(id) {
    return await instance.get(`/getthumbimages/${id}`);
} */

//登录请求
export async function userLogin(data) {
    return await instance.post(`/login`,data);
}

// 验证token
export async function isLogin(token) {
    // var token = localStorage.getItem('token');

    return await instance.post(`/checktoken?token=${token}`);
}

// 注册请求
export async function registerUser(data) {
    return await instance.post(`/register`, data);
}

// 获取用户收货地址
export async function getaddressData(id) {
    // return await instance.get(`/getaddress/${id}?_v=${Math.random()}`);
    return await instance.get(`/getaddress/${id}`);
}

// 新增地址
export async function addressAddData(data,userid) {
    return await instance.post(`/addaddress/${userid}`, data);
}

//编辑地址
export async function addressEditData(data) {
    return await instance.post(`/updateaddress/${data.id}`, data);
}

// 删除地址
export async function addressDeleteData(id) {
    return await instance.post(`/deladdress/${id}`);
}
