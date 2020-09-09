<template>
    <div>
        <!-- <NavBar title="新闻列表" left-arrow @click-left="onClickLeft" /> -->
        <Loading type="spinner" v-if='isShow' vertical >加载中</Loading>
        <div class="newslist" >
            <PullRefresh
                v-model="isLoading"
                @refresh="onRefresh"
                loading-text = '加载中'
            >
            <!-- <div class="newsitem" v-for="item in newslist" :key="item.id"> -->
            <router-link :to="/getnews/+item.id" tag="div" class="newsitem" v-for="item in newslist" :key="item.id">
                <div class="img_container">
                    <img :src="item.img_url" alt="">
                </div>
                <div class="info">
                    <h3 class="title">{{ item.title}}</h3>
                    <div class="time_click">
                        <span>发布时间：{{ item.add_time | datatimeFormat('YYYY-MM-DD hh:mm:ss') }}</span>
                        <span>点击 ：{{ item.click }} 次</span>
                    </div>
                </div>
            </router-link>
            </PullRefresh>
        </div>
        <Button type="primary" v-if="!isShow" @click="loadmore" block> 加载更多</Button>

    </div>

</template>

<script>
import {NavBar,PullRefresh,Toast,Button,Loading } from 'vant';
import {getNewslistData} from '@/api/index.js'

    export default {
        name:'newslist',
        data () {
            return {
                newslist:[],
                page : 1,
                pagesize : 5,
                isLoading: false,
                hasData : true,
                isShow : false
            }
        },
        components:{
            NavBar,PullRefresh,Button,Loading
        },
        methods:{
            async getNewslist(){
                var res = await getNewslistData(this.page,this.pagesize);
                this.newslist = res.message;
                // console.log(this.newslist);
            },
            onRefresh() {
                this.page = 1;
                this.hasData = true;
                this.newslist = [];
                this.isShow = true;
                setTimeout(() => {
                    Toast('刷新成功');
                    this.getNewslist();
                    this.isLoading = false;
                    this.isShow = false
                }, 1000);
            },
            async loadmore(){
                if(this.hasData == false){
                    Toast('没有更多了')
                    return;
                }
                this.page++;
                var res = await getNewslistData(this.page,this.pagesize);
                this.newslist = this.newslist.concat(res.message);
                this.hasData = true;
                if(res.message.length == 0){
                    this.hasData = false;
                    Toast('没有更多了');
                }
            }
        },
        created(){
            this.getNewslist();
            // 显示navbar
            this.$parent.showNavBar({title:'新闻列表'});
        },
        activated(){
            this.$parent.showNavBar({title:'新闻列表'});
        }
    }
</script>

<style lang="scss" scoped>
    .newslist{
        .newsitem{
            display: flex;
            border-bottom: 1px solid #ccc;
            margin-top: 2px;

            .img_container{
                width: 100px;
                height: 100px;
                padding: 2px;
                img{
                    height:100%;
                    width: 100px;
                }
            }

            .info{
                width: 100%;
                padding: 2px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .title{
                    font-size: 13px;
                }
                .time_click{
                    display: flex;
                    justify-content: space-between;
                    font-size: 12px;
                    margin-bottom: 10px;
                    color: #888;
                }
            }
        }
    }
    .van-loading{
        text-align: center;
    }
</style>
