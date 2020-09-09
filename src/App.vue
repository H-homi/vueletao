<template>
    <div class="app_container">
        <!-- 头部 -->
        <div class="header" id="header" v-if="isShow">
            <img src="@/assets/images/logo.png" alt="">
            <Search v-model="searchValue" placeholder="请输入搜索关键词" />
        </div>

        <Sticky><NavBar v-if="!isShow" :title="title" left-arrow @click-left="goBack" /></Sticky>
        <!-- 中部 (不能写固定，放由路由匹配的动态内容)-->
        <!-- <div class=""></div> -->
        <keep-alive include="home,newslist,goodslist">
            <router-view></router-view>
        </keep-alive>

        <!-- 底部 -->

        <div class="navbar" v-if="isShowTabbar">
            <Tabbar v-model="active" >
                <TabbarItem icon="wap-home-o" to='/home'>首页</TabbarItem>
                <TabbarItem icon="cart-o" to='/mycar' :badge='$store.getters.carTotal'>购物车</TabbarItem>
                <TabbarItem icon="user-o" to='/user'>我的乐淘</TabbarItem>
            </Tabbar>
        </div>
    </div>
</template>

<script>
import { Search, Tabbar, TabbarItem ,NavBar,Sticky  } from 'vant';
// 导入vuex中的state的辅助函数
import {mapState} from 'vuex';
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
                // data中监听不到数据的变化
                // isPending:this.$store.state.isPending,
            }
        },
        computed:{
            /*isPending : function () {
                return this.$store.state.isPending;
            }*/
            // 等价于
            ...mapState(['isPending'])
        },
        watch:{
            'isPending':function (isPending) {
                // 判断true还是false,给loading 和关闭loading即可
                console.log(isPending);
                isPending
                ? this.$toast.loading({
                    message:'loading...',
                    forbidClick : true,
                    duration : 600 // 持续展示toast
                    })
                    :this.$toast.clear();
                    // : console.log(111);
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
            },
            goBack(){
                // console.log(a);
                // console.log(this.$router);
                // console.log(this.$route);
                if(this.$route.path.indexOf('addressmanage') != -1){
                    this.$router.push('/user');
                }else if(this.$route.path.indexOf('user') != -1){
                    this.$router.push('/home');
                }else{
                    this.$router.go(-1);
                }
                this.isShowTabbar = true;
                // this.active = 0;
            }
        },
        created(){
            this.$nextTick(function(){
                this.controlHeader();
            });
        },
        activated(){

        },
        deactivated(){

        }

    }
</script>

<script type="text/javascript" src="https://cdn.bootcss.com/vConsole/3.3.0/vconsole.min.js"></script>
<script>
window.vConsole = new window.VConsole();
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
