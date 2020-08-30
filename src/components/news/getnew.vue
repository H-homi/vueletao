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
        </div>
    </div>
</template>

<script>
import {getnews} from '@/api/index.js';
import {Field } from 'vant';
    export default {
        components:{
            Field
        },
        data () {
            return {
                newsId:'',
                newsData:{},
                value:''
            }
        },
        methods:{
            async getNewsData(){
                var res = await getnews(this.newsId);
                this.newsData = res.message[0];
            }
        },
        created(){
            this.newsId = this.$route.params.id;
            this.$parent.showNavBar({title:'新闻详情'});
            this.getNewsData();
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
    }
</style>
