<template>
    <div class="app_container">
        <!-- 头部 -->
        <div class="header" id="header" v-if="isShow">
            <img src="@/assets/images/logo.png" alt="">
            <Search v-model="searchValue" placeholder="请输入搜索关键词" />
        </div>

        <Sticky><NavBar v-if="!isShow" :title="title" left-arrow @click-left="$router.go(-1)" /></Sticky>
        <!-- 中部 (不能写固定，放由路由匹配的动态内容)-->
        <!-- <div class=""></div> -->
        <router-view></router-view>
        <!-- 底部 -->

        <div class="navbar" v-if="isShowTabbar">
            <Tabbar v-model="active" >
                <TabbarItem icon="wap-home-o" to='/home'>首页</TabbarItem>
                <TabbarItem icon="cart-o" to='/mycar'>购物车</TabbarItem>
                <TabbarItem icon="user-o" to='/user'>我的乐淘</TabbarItem>
            </Tabbar>
        </div>
    </div>
</template>

<script>
import { Search, Tabbar, TabbarItem ,NavBar,Sticky  } from 'vant'
    export default {
        name:'App',
        components:{
            Search,Tabbar,TabbarItem,NavBar,Sticky
        },
        data () {
            return {
                searchValue : '',
                active: 0,
                isShow:true,
                title:'',
                isShowTabbar:true,
            }
        },
        methods:{
            controlHeader(){
                var headerEl = document.getElementById('header');

                var headerHeight = headerEl.offsetHeight;

                window.onscroll = function(){
                    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
                    if(scrollTop >= headerHeight){
                        headerEl.classList.add('headerSticky');
                    }
                }
            },
            showNavBar(options){
                this.title = options.title;
                this.isShow = false;
            }
        },
        created(){
            this.$nextTick(function(){
                this.controlHeader();
            });
            this.isShowTabbar = true;
        }

    }
</script>

<style lang="scss" scoped>
.app_container{
    min-width: 320px;
    max-width: 750px;
    background-color: #eee;
    padding-bottom: 50px;
    margin: 0 auto;
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
    .navbar{
        position: fixed;
    }
    .headerSticky{
        position: sticky;
        min-width: 320px;
        max-width: 750px;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 999;
    }
}
</style>
