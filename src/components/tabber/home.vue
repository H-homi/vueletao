<template>
    <div class="home_container">
        <!-- 头部 -->
        <!-- <div class="header" id='header'>
            <img src="@/assets/images/logo.png" alt="">
            <Search v-model="searchValue" placeholder="请输入搜索关键词"  />
        </div> -->
        <!-- 轮播图 -->
        <Swipe :autoplay="3000">
            <SwipeItem v-for="image in lunboData" :key="image.img">
                <img :src="image.img" alt="" >
            </SwipeItem>
        </Swipe>

        <!-- 宫格 -->
        <Grid :column-num="4">
            <GridItem to='/goodslist' >
                <img src="@/assets/images/menu10.png" alt="">
                <span>数码电器</span>
            </GridItem>
            <GridItem to='/toutiao'>
                <img src="@/assets/images/menu19.png" alt="">
                <span>乐淘头条</span>
            </GridItem>
            <GridItem >
                <img src="@/assets/images/menu18.png" alt="">
                <span>美图欣赏</span>
            </GridItem>
            <GridItem >
                <img src="@/assets/images/menu15.png" alt="">
                <span>乐淘服饰</span>
            </GridItem>
            <GridItem >
                <img src="@/assets/images/menu12.png" alt="">
                <span>9.9元拼单</span>
            </GridItem>
            <GridItem >
                <img src="@/assets/images/menu13.png" alt="">
                <span>乐淘服饰</span>
            </GridItem>
            <GridItem >
                <img src="@/assets/images/menu16.png" alt="">
                <span>物流查询</span>
            </GridItem>
            <GridItem >
                <img src="@/assets/images/menu17.png" alt="">
                <span>全部</span>
            </GridItem>

        </Grid>

        <!--为你推荐 -->
        <div class="recommend">
            <Divider :style="{color:'#333',borderColor:'#333','font-size':'16px'}">为你推荐</Divider>

            <div class="goodList">
                <!-- <div class="item" v-for="item in recommendData" :key="item.id"> -->
                <router-link class="item" tag="div" :to="/goodsinfo/+item.id" v-for="item in recommendData" :key="item.id">
                    <!-- <img :src="item.img_url" alt=""> -->
                    <img v-lazy="item.img_url" alt="">
                    <div class="text">
                        <div class="title">
                            {{ item.title }}
                        </div>
                        <div class="price">
                            ￥{{ item.sell_price }}
                            <span class="buy">
                                {{ item.buy }}人已购买
                            </span>
                        </div>
                    </div>
                </router-link>

            </div>
        </div>

    </div>
</template>

<script>
import {Swipe,SwipeItem,Search,Grid,GridItem,Divider,Lazyload } from 'vant';
import {getLunboData,getRecommendData} from '@/api/index.js';
    export default {
        data () {
            return {
                searchValue:'',
                lunboData:[],
                recommendData:[]

            }
        },
        components: {
            Swipe,SwipeItem,Search,Grid,GridItem,Divider
        },
        methods:{
            async getLunbo(){
                var res= await getLunboData();
                this.lunboData = res.message;
            },
            async getRecommend(){
                var res = await getRecommendData();
                this.recommendData = res.message;
                // console.log(this.recommendData);
            },
        },
        created(){
            this.getLunbo();
            this.getRecommend();
            this.$parent.isShow = true;
        }
    }
</script>

<style lang="scss" scoped>
.home_container{
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        img{
            height: 44px;
            margin-left: 4px;
        }
        .van-search{
            flex: 1;
        }
    }
    .van-swipe{
        height: 200px;
        width: 100%;
        .van-swipe-item{
            img{
                height: 100%;
                width: 100%;
            }
        }
    }

    .van-grid{
        .van-grid-item__content{
            padding: 16px 8px;
            box-sizing: border-box;
            img{
                width: 50%;
                // margin-bottom: 4px;
            }
            span{
                color: #524949;
            }
        }
    }
    .recommend{
        padding: 0 8px;
        .goodList{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .item{
                display: flex;
                justify-content: space-between;
                width: 48%;
                margin: 4px 0;
                flex-direction: column;
                border-radius: 6px;
                overflow: hidden;
                background-color: #fff;
                img{
                    width: 100%;
                }
                .text{
                    .title {
                        font-size: 12px;
                        color: #333;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;   //作为弹性伸缩盒子模型显示。
                        -webkit-box-orient: vertical;  //设置伸缩盒子的子元素排列方式--从上到下垂直排列
                        -webkit-line-clamp: 2;  //显示的行
                    }
                    .price{
                        font-size: 14px;
                        color: #f50;
                        padding: 10px 0;
                        span{
                            margin-left: 10px;
                            font-size: 12px;
                            color: #999;
                        }
                    }
                }
            }
        }
    }


}

</style>
