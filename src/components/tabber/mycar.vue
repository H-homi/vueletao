<template>
    <div>

        <div class="goods_list" v-if="isShow">
            <Divider>收货地址</Divider>
            <van-address-list
                v-model="chosenAddressId"
                :list="list"
                default-tag-text="默认"
            />
            <Divider>购买的商品</Divider>
            <div class="goods_item" v-for="(item,index) in carData" :key="item.id">
                <div class="switchButton">
                    <vant-switch @change="changeSelected(item.id,$store.getters.getGoodsSelected[item.id])" v-model="$store.getters.getGoodsSelected[item.id]" />
                </div>
                <div class="thumbImage">
                    <img :src="item.thumb_path" alt="">
                </div>
                <div class="goodsInfo">
                    <div class="title">{{item.title}}</div>
                    <div class="row">
                        <span class="price">￥{{item.sell_price}}</span>
                        <Stepper @change='changeNumber(item.id,$store.getters.getGoodsNumber[item.id])' v-model="$store.getters.getGoodsNumber[item.id]"/>
                        <Button type="danger" @click="del(item.id,index)">删除</Button>
                    </div>
                </div>
            </div>
            <Cell icon='cash-back-record' title="微信支付" />
            <SubmitBar :price="$store.getters.getGoodsSelectedPrice" button-text="提交订单" @submit="onSubmit" >
                <template #default>共{{ $store.getters.getGoodsSelectedNumber }}件商品</template>
            </SubmitBar>
        </div>

        <div class="empty" v-if="!isShow">
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
import { Switch,Stepper ,Button,AddressList ,Divider ,Cell,SubmitBar  } from 'vant';
import {getshopcarlistData} from '@/api/index.js'
    export default {
        data () {
            return {
                isShow:false,
                carData:[],
                cartListData:[],
                chosenAddressId: '1',
                list: [
                    {
                    id: '1',
                    name: '张三',
                    tel: '13000000000',
                    address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                    isDefault: true,
                    },
                ],
            }
        },
        components:{
            'vant-switch':Switch,
            'van-address-list':AddressList,
            Stepper,Button,Divider,Cell,SubmitBar
        },
        methods:{
            onSubmit(){
                this.$toast.loading({
                    message: '提交订单中...',
                    forbidClick: true,
                });
            },
            async getshopcarlist(){
                var ids = this.$store.getters.getGoodsIds;
                if(!ids){
                    this.isShow =false
                    return;
                }
                var {message} = await getshopcarlistData(ids);
                // console.log(message);
                this.carData = message;
                this.isShow = true;

            },
            changeSelected(goods_id,selected){
                // console.log(selected);
                // console.log(goods_id);
                this.$store.commit('changeGoodsSelected',{goods_id,selected})
            },
            changeNumber(goods_id,number){
                this.$store.commit('changeGoodsNumber',{goods_id,number});
            },
            del(goods_id,index){
                var bool = this.carData.some(v =>{
                    return v.id == goods_id;
                })
                if(bool){
                    this.carData.splice(index,1);
                }
                this.$store.commit('delCarGoods',{goods_id,index})
            }
        },

        created(){
            // 显示navbar
            this.$parent.showNavBar({title:'我的购物车'});
            this.$parent.isShowTabbar = true;
            // console.log(this.$parent.isShowTabbar);
            // this.getcarData();
            this.getshopcarlist();
            this.$parent.active = 1;
            // console.log(this.$store.getters.getGoodsNumber);
        },



    }
</script>

<style lang="scss" scoped>
    .van-divider{
        font-size :16px;
        color :#6f7370;
        border-color: #545e6c;
        margin: 2px;
    }
    .van-address-list{
        padding-bottom: 20px;
    }
    .van-address-list__bottom {
        visibility: hidden;
    }
    .van-submit-bar{
        bottom: 50px;
    }
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
                width: 100%;
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
                        margin-left: 4px;
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
