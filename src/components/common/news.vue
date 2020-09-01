<template>
    <div>
        <div class="newslist" >
            <router-link :to="/getnews/+item.id" tag="div" class="newsitem" v-for="item in photochilder" :key="item.id">
                <div class="img_container">
                    <img :src="item.img_url" alt="" @click.stop="imgClick(item.id)">
                </div>
                <div class="text">
                    <h3 class="title">{{ item.title}}</h3>
                    <div class="zhaiyao">
                        {{item.zhaiyao}}
                    </div>
                </div>
            </router-link>
        </div>
    </div>

</template>

<script>

    export default {
        name:'common-news',
        props:['photochilder'],
        data () {
            return {
            }
        },
        methods:{
            imgClick(id){
                // 把数据传递父组件
                this.$emit('img-click',id)
            }
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

            .text{
                width: 100%;
                padding: 2px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .title{
                    font-size: 13px;
                }
                .zhaiyao{
                    font-size: 12px;
                    color: #888;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;   //作为弹性伸缩盒子模型显示。
                    -webkit-box-orient: vertical;  //设置伸缩盒子的子元素排列方式--从上到下垂直排列
                    -webkit-line-clamp: 2;  //显示的行
                }

            }
        }
    }
    .van-loading{
        text-align: center;
    }
</style>
