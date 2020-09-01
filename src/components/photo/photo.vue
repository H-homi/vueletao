<template>
    <div>
        <van-tree-select
            height="100vh"
            :items="items"
            :main-active-index.sync="active"
            @click-nav='navHandle'
            >
            <template  #content>
                <news v-if="isShow" @img-click="thumb" :photochilder='items[active].children'></news>
            </template>
        </van-tree-select>
    </div>
</template>

<script>
import { TreeSelect,ImagePreview } from "vant";
import {getcategory,getcatelist,getthumbimages} from '@/api/index.js';
import news from '@/components/common/news.vue';

    export default {
        components: {
            "van-tree-select": TreeSelect,
            news
        },
        data(){
            return {
            active: 0,
            items: [],
            isShow:false
            };
        },
        methods:{
            async getcategoryData(){
                var {message} = await getcategory();
                // 先判断，防止没有数据报错
                if(!message.length){  return; }
                var first_id = message[0].id;
                var first_children = await this.getcatelistData(first_id);
                message[0].children = first_children;
                message.forEach(v =>{
                    v.text = v.title;
                    delete v.title;
                });
                this.items = message;
                this.isShow = true;
            },
            // 获取分组下面的列表数据children
            async getcatelistData(id){
                var {message} = await getcatelist(id);
                message.map(v =>{
                    v.text = v.title;
                });
                return message;
            },
            async navHandle(index){
                if(this.items[index].children){
                    return;
                }
                this.isShow = false;
                var item = this.items[index];
                var children = await this.getcatelistData(item.id);
                item.children = children;

                this.isShow = true;
            },
            async thumb(id){
                var {message} = await getthumbimages(id);
                if(!message.length){
                    this.$toast('亲，图片你自己上传咯');
                    return;
                }
                var thumbArr = [];
                message.map(v =>{
                    thumbArr.push(v.src);
                });
                ImagePreview(thumbArr)
            }
        },
        created(){
            this.$parent.showNavBar({title:'美图欣赏'});
            this.getcategoryData();
        },
    };
</script>

<style lang="scss" scoped>
</style>
