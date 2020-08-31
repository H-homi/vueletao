<template>
    <div>
        <div class="goods_list">
            <div class="goods_item" v-for="(item,index) in cartData" :key="item.id">
                <div class="switchButton">
                    <vant-switch v-model="item.selected" />
                </div>
                <div class="thumbImage">
                    <img :src="cartListData[index].thumb_path" alt="">
                </div>
                <div class="goodsInfo">
                    <div class="title">{{cartListData[index].title}}</div>
                    <div class="row">
                        <span class="price">￥{{item.price}}</span>
                        <Stepper v-model="item.number"/>
                        <Button type="danger">删除</Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="empty" v-if="isShow">
            <h3> 亲，您的购物车为空，去 <a href="">首页</a>逛逛吧</h3>
            <hr>
            <div>
                <img src="../../assets/images/car.png" alt="">
            </div>
            <div>
                <a href="">登录</a>后可以同步电脑与手机购物车中的商品
            </div>
        </div>
    </div>
</template>

<script>
import { Switch,Stepper ,Button  } from 'vant';
import {getshopcarlistData} from '@/api/index.js'
    export default {
        data () {
            return {
                isShow:true,
                cartData:[],
                cartListData:[],
            }
        },
        components:{
            'vant-switch':Switch,
            Stepper,Button
        },
        methods:{
            getCartData(){
                this.cartData = JSON.parse( localStorage.getItem('cartList') || [] );
                if(this.cartData.length !== 0){
                    this.isShow = false;
                    this.cartData.forEach(v => {
                        this.getshopcarlist(v.id);
                    });
                }

            },
            async getshopcarlist(id){
                var res = await getshopcarlistData(id);
                return res.message[0];
            }
        },

        created(){
            // 显示navbar
            this.$parent.showNavBar({title:'我的购物车'});
            this.getCartData();
            this.$parent.active = 1;
            // this.getshopcarlist();
        },
        /* watch:{
            cartData:function(newValue){
                localStorage.setItem('cartList',JSON.stringify(cartData));
            }
        } */

    }
</script>

<style lang="scss" scoped>

    .goods_list{
        padding: 10px 5px ;

        .goods_item{
            display: flex;
            align-items: center;
            background-color: #fff;
            margin-bottom: 10px;
            padding: 8px;
            .thumbImage{

                img{
                    width: 50px;
                }
            }

            .goodsInfo{
                display: flex;
                flex-direction: column;
                justify-items: center;
                border-radius: 5px;
                justify-content: space-between;
                align-items: center;
                .title{
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;   //作为弹性伸缩盒子模型显示。
                    -webkit-box-orient: vertical;  //设置伸缩盒子的子元素排列方式--从上到下垂直排列
                    -webkit-line-clamp: 1;  //显示的行
                }

                .row{
                    display: flex;
                    width: 100%;
                    flex-direction: row;
                    align-items: center;
                    justify-content: space-between;

                    .price{
                        color: red;
                        font-weight: 700;
                    }
                }

            }
        }


    }
    .empty{
        text-align: center;
        color: #333;

        img{
            width: 40%;
        }
    }
</style>
