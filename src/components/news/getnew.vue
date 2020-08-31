<template>
    <div class="detail-container">
        <h3 class="title">{{ newsData.title }}</h3>
        <div class="subtitle">
            <span>发布时间：{{ newsData.add_time | datatimeFormat('YYYY-MM-DD hh:mm:ss') }}</span>
            <span>阅读 {{newsData.click}}次</span>
        </div>
        <div class="content" v-html="newsData.content"></div>
        <div class="comment">
            <Field
                v-model="value"
                placeholder="有爱评论,说点好听的"
                rows = "2"
                maxlength="50"
                type="textarea"
                show-word-limit />
            <Button  type="info"  size="large" @click="postComment">发表评论</Button>
            <div class="list">
                <div class="list-item" v-for="item in commentsData" :key="item.id">
                    <div class="user">
                        <div>{{ item.user_name}}:{{item.content}}</div>
                        <div>评论时间：{{ item.add_time | datatimeFormat('YYYY-MM-DD hh:mm:ss') }}</div>
                    </div>
                </div>
                <Button  plain hairline color='red'  size="large" @click="loadmore" >加载更多</Button>
            </div>
        </div>

    </div>
</template>

<script>
import {getnews,getcomments,postCommentData} from '@/api/index.js';
import {Field ,Button,Toast} from 'vant';
    export default {
        components:{
            Field,Button
        },
        data () {
            return {
                newsId:'',
                pageindex:1,
                newsData:{},
                value:'',
                commentsData:[],
                isLoadmore:true
            }
        },
        methods:{
            async getNewsData(){
                var res = await getnews(this.newsId);
                this.newsData = res.message[0];
            },
            async getcommentsData(){
                var res = await getcomments(this.newsId,this.pageindex);
                this.commentsData = res.message;
            },
            async loadmore(){
                if(!this.isLoadmore){
                    Toast('没有更多了');
                    return;
                }
                this.pageindex++;
                var res = await getcomments(this.newsId,this.pageindex);
                this.commentsData = this.commentsData.concat(res.message);
                if(res.message.length==0){
                    Toast('没有更多了');
                    this.pageindex--;
                    this.isLoadmore = false;
                }
            },
            async postComment(){
                if(this.value.trim().length==0){
                    Toast('请输入评论');
                    return;
                }
                var res = await postCommentData(this.value,this.newsId);
                this.isLoadmore = true;
                console.log(res);

            }
        },
        created(){
            this.newsId = this.$route.params.id;
            this.$parent.showNavBar({title:'新闻详情'});
            this.getNewsData();
            this.getcommentsData();
        },
    }
</script>

<style lang="scss" scoped>
    .detail-container{
        background-color: #faf9f9;
        padding: 0 10px;

        .title{
            font-size: 16px;
            color: #404040;
            text-align: center;
            padding: 10px 0;
        }

        .subtitle{
            display: flex;
            justify-content: space-between;
            color: #888;
            font-size: 13px;
            padding-bottom: 5px;
            border-bottom: 1px solid #888;
        }
        .comment{
            .list-item{
                padding: 5px 1px;
                .user{
                    background-color: #e8e8e8;
                    font-size: 12px;
                }
            }

        }
        .content /deep/ img{
            width: 100%;
        }
        .content /deep/ table{
            width: 100%;
        }

    }
</style>
