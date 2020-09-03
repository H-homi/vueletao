<template>
    <div class="goodsdetail_container">
        <Swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <SwipeItem v-for="item in thumbimagesData" :key="item.src">
                <img :src="item.src" alt="">
            </SwipeItem>
        </Swipe>
        <div class="goodsInfo">
            <div class="goodsName">
                <span>{{goodsData.title}}</span>
            </div>
            <Divider />
            <div class="price">
                <div class="marketPrice"><del>市场价:￥{{goodsData.market_price}}</del></div>
                <div class="shopPrice">本店价:￥<span class="value">{{goodsData.sell_price}}</span></div>
            </div>

            <div class="goodsNumber">
                <span>购买数量：</span>
                <Stepper v-model="value" />
            </div>
        </div>
        <div class="goodsItem">
            <Divider>其他信息</Divider>
            <div class="goodsOtherInfo">
                <span>商品货号：{{goodsData.goods_no}}</span>
                <span>库存情况：{{ goodsData.stock_quantity }}</span>
                <span>上假时间：{{ goodsData.add_time | datatimeFormat }}</span>
            </div>
        </div>

        <div class="goodsItem">
            <Divider>介绍</Divider>
            <div class="content" v-html="goodsData.content">
            </div>
        </div>

        <GoodsAction>
            <GoodsActionIcon icon='chat-o' text='客服' dot @click="onClickIcon" />
            <GoodsActionIcon to='/mycar' icon='cart-o' text='购物车' :badge="$store.getters.carTotal" />
            <GoodsActionButton type='warning' text='加入购物车' @click="addTocar" />
            <GoodsActionButton type='danger' text='立即购买' />
        </GoodsAction>
    </div>
</template>

<script>
import { Swipe, SwipeItem ,Divider,Stepper, GoodsAction, GoodsActionIcon, GoodsActionButton,Toast } from 'vant';
import {getGoodsinfo,getthumbimages} from '@/api/index.js'
    export default {
        components:{
            Swipe, SwipeItem,Divider,Stepper, GoodsAction, GoodsActionIcon, GoodsActionButton
        },
        data () {
            return {
                goodsId : '',
                thumbimagesData : [],
                goodsData : {},
                value:1,
                cartList:[],
                cartNumber:0,
            }
        },
        methods:{
            async getGoodsData(){
                var res = await getthumbimages(this.goodsId);
                var res2 = await getGoodsinfo(this.goodsId);
                this.thumbimagesData = res.message;
                this.goodsData = res2.message;
            },
            getCartList(){
                this.cartList = JSON.parse(localStorage.getItem('cartList')) || [];
                this.getCartNumber()
            },
            getCartNumber(){
                this.cartList.forEach(v => {
                    this.cartNumber += v.number;
                });
            },
            onClickIcon() {
                Toast('点击图标');
            },
            addTocar() {
                var goods = {
                    id:this.goodsId,
                    number:this.value,
                    price:  this.goodsData.sell_price,
                    selected:true
                }
                this.$store.commit('addCar',goods)
                /* var current = this.cartList.find(v =>{
                    return v.id == this.goodsId;
                });

                if(current){
                    current.number += this.value;
                    current.price = this.goodsData.sell_price * current.number;
                }else{
                    var cart = {
                        id:this.goodsId,
                        number:this.value,
                        price:  this.goodsData.price,
                        selected:false
                    }
                    this.cartList.push(cart);
                }

                this.cartNumber += this.value;
                this.value = 1;
                localStorage.setItem('cartList',JSON.stringify(this.cartList)); */
            },
        },
        created(){
            this.goodsId = this.$route.params.id;
            this.getGoodsData();
            this.$parent.showNavBar({title:'商品详细'});
            this.getCartList();
            this.$parent.isShowTabbar = false;
        },


    }
</script>

<style lang="scss" scoped>
.goodsdetail_container{
    padding: 5px 5px 50px 5px;

    .my-swipe {
        height: 240px;
        width: 100%;
        border-radius: 5px;
        background-color: #fff;

        .van-swipe-item {
            text-align: center;
            img{
                height: 100%;
                width: 245px;
            }
        }
    }

    .goodsInfo{
        padding: 8px;
        margin: 10px 0;
        border-radius: 5px;
        background-color: #fff;

        .goodsNumber{
            display: flex;
            margin-bottom: 10px;
            justify-content: flex-start;
            align-items: center;
        }
        .price{
            display: flex;
            color: #333;
            margin-bottom: 15px;

            .marketPrice{
                margin-right: 20px;
            }

            .shopPrice{

                .value{
                    color: red;
                    font-weight: 700;
                }
            }

        }
    }

    .goodsItem{
        padding: 8px;
        margin-bottom: 10px;
        border-radius: 5px;
        background-color: #fff;

        .goodsOtherInfo{
            display: flex;
            flex-direction: column;
        }
        .content /deep/ img{
            width: 100%;
        }
        .content /deep/ table{
            width: 100%;
        }
    }

    /* .van-goods-action{
        // bottom: 50px;
    }
 */
}
</style>
