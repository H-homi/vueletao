
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

export async function getNewslistData(){
    return await instance.get(`/getnewslist`);
}

