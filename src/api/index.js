
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
