
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
export async function getshopcarlistData(id){
    return await instance.get(`/getshopcarlist/${id}`);
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
