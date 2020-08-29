<template>
    <div>
        <!-- <NavBar title="新闻列表" left-arrow @click-left="onClickLeft" /> -->
        <div class="newslist">
            <div class="newsitem" v-for="item in newslist" :key="item.id">
                <div class="img_container">
                    <img :src="item.img_url" alt="">
                </div>
                <div class="info">
                    <h3 class="title"></h3>
                    <div class="time_click">
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {NavBar} from 'vant';
import {getNewslistData} from '@/api/index.js'

    export default {
        data () {
            return {
                newslist:[]
            }
        },
        components:{
            NavBar
        },
        methods:{
            /* onClickLeft(){
                this.$router.go(-1);
            }, */
            async getNewslist(){
                var res = await getNewslistData();
                this.newslist = res.message;
                // console.log(this.newslist);
            },

        },
        created(){
            this.getNewslist();
            // 显示navbar
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

                img{
                    height:100%;
                    width: 100%;
                }
            }
        }
    }
</style>
