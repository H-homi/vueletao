<template>
    <div>
        <!-- <NavBar title="商品列表" left-arrow @click-left="onClickLeft" /> -->
        <div class="goodslistcontainer">
            <!-- <div class="item" v-for="item in goodslistData" :key="item.id"> -->
            <router-link tag="div" :to="'/goodsinfo/'+item.id"  class="item" v-for="item in goodslistData" :key="item.id">
                <img :src="item.img_url" alt="">
                <div class="title">{{ item.title }}</div>
                <div class="info">
                    <div class="price">
                        <span class="now">￥{{ item.sell_price }}</span>
                        <span class="old"><del>￥ {{ item.market_price }}</del></span>
                    </div>
                    <div class="hot">
                        <span>热卖中</span>
                        <span>剩{{ item.stock_quantity }}件</span>
                    </div>
                </div>
            </router-link>

            <router-view></router-view>
            <!-- </div> -->

        </div>
        <Button color='#ee0a24' size="large" @click="appendGoodslistData(createPage++)">加载更多</Button>
    </div>
</template>

<script>
import { NavBar , Button,Toast  } from 'vant';
import { getGoodslistContainer } from '@/api/index.js';
import router from 'vue-router';
    export default {
        name:'goodslist',
        components:{
            NavBar,Button
        },
        data () {
            return {
                goodslistData:[],
                createPage : 1,
            }
        },
        methods:{
            onClickLeft(){
                this.$router.go(-1);
            },
            async getGoodslistData(){
                var res = await getGoodslistContainer(this.createPage);
                this.goodslistData = res.message;
            },
            async appendGoodslistData(){
                var res = await getGoodslistContainer(this.createPage);
                // console.log(res.message.length);
                if(res.message.length == 0){
                    Toast('加载完毕');
                }else{
                    this.goodslistData = this.goodslistData.concat(res.message);
                    // console.log(this.goodslistData);
                }
            }
        },
        created () {
            this.getGoodslistData();
            // 显示navbar
            this.$parent.showNavBar({title:'商品列表'});
        },
        activated(){
            this.$parent.showNavBar({title:'商品列表'});
        }
    }
</script>

<style lang="scss" scoped>
    .goodslistcontainer{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        box-shadow: 0 0 5px #ccc;
        padding: 5px;

        .item{
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            align-content: space-between;
            width: 47%;
            border: 1px solid #ccc;
            border-radius: 8px;
            overflow: hidden;
            background-color: #fff;
            margin-bottom: 5px;
            padding: 4px;

            img{
                width: 100%;
                height: 160px;
            }
            .title{
                padding: 2px;
                font-size: 12px;
                color: #333;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;   //作为弹性伸缩盒子模型显示。
                -webkit-box-orient: vertical;  //设置伸缩盒子的子元素排列方式--从上到下垂直排列
                -webkit-line-clamp: 2;  //显示的行
            }
            .info{
                padding: 3px 5px;
                margin: 0;
                color: #565252;
                .price{
                    .now{
                        color: red;
                        font-weight: 700;
                    }
                    .old{
                        margin-left: 8px;
                        font-size: 12px;
                    }
                }

                .hot{
                    display: flex;
                    justify-content: space-between;
                    font-size: 14px;
                    color: #565252;
                }
            }
        }

    }


</style>

