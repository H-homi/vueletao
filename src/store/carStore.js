import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// 购物车对象 （id.number,price,select:true）


// 本地存储中可能会有购物车商品，我们要先全部取出来，放在全局共享state
var carData = JSON.parse(localStorage.getItem('carData')) || [];
const store = new Vuex.Store({
    state:{
        carData:carData,
        isPending:false
    },
    mutations:{
        addCar(state,goods){
            var current = state.carData.find(v => {
                return v.id == goods.id;
            })
            if(current){
                current.number += goods.number;
            }else{
                state.carData.push(goods);
            }
            localStorage.setItem('carData',JSON.stringify(carData));
        },
        // 修改商品的数量
        changeGoodsNumber(state,obj){
            var current = state.carData.find(v =>{
                return v.id == obj.goods_id;
            });
            current.number = obj.number;
            localStorage.setItem('carData',JSON.stringify(state.carData));
        },
        // 修改商品的选中状态
        changeGoodsSelected(state,obj){
            var current = state.carData.find(v => {
                return v.id == obj.goods_id;
            });
            // console.log(current);
            current.selected = obj.selected;
            localStorage.setItem('carData', JSON.stringify(state.carData));
        },
        // 删除购物车商品
        delCarGoods(state,obj){
            var bool = state.carData.some(v =>{
                if(v.id == obj.goods_id){
                    return true;
                }
            });
            if(bool){
                state.carData.splice(obj.index,1);
            }
            localStorage.setItem('carData', JSON.stringify(state.carData));
        },
         // 修改isPending的状态
        changeIsPending(state,bool){
            state.isPending = bool;
        }
    },
    getters:{
        // 获取购物车商品总数量
        carTotal(state){
            var total = 0;
            state.carData.map(v => total += parseInt(v.number) );
            return total;
        },
         // 获取购物车所有商品的id 得到 '88,91'
        getGoodsIds(state){
            var ids = [];
            state.carData.map(v => ids.push(v.id));
            return ids.join(',');
        },
        // 获取购物车商品的购买数量 构造数据如下
        // {商品id:商品number，商品id:商品number}
        getGoodsNumber(state){
            var obj = {};
            state.carData.map(v =>{
                obj[v.id] = v.number;
            });
            return obj;
        },
        // 获取购物车商品的选中状态 构造数据如下
        // {商品id:true，商品id:false}
        getGoodsSelected(state){
            var obj = {};
            state.carData.map(v=>{
                obj[v.id] = v.selected;
            });
            return obj;
        },
        // 获取购物车商品的选中的数量
        getGoodsSelectedNumber(state){
            var total = 0;
            state.carData.map(v =>{
                if(v.selected=== true){
                    total += v.number;
                }
            });
            return total;
        },
        //获取购物车商品的选中的总价格
        getGoodsSelectedPrice(state){
            var totalPrice = 0;
            state.carData.map(v => {
                if(v.selected === true){
                    totalPrice +=  v.price * v.number ;
                }
            });
            // console.log(totalPrice);
            return totalPrice*100;
        }
    }

})

export default store;
