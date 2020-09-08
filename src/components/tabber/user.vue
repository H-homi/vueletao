<template>
    <div>
        <div class="person_container">
            <Cell >
                <CellGroup :border=false>
                    <img src="../../assets/images/logo.png" alt="">
                    <div class="name">用户名:{{user.username}}</div>
                </CellGroup>
            </Cell>
            <Cell title="修改密码" is-link />
            <Cell title="我的订单" to='/order' is-link />
            <Cell title="地址管理" to='/addressmanage' is-link />
        </div>
        <br>
        <Cell title="提交反馈" is-link />
        <Cell title="关于乐淘" value='v1.0.0' />
        <Cell title="weixin h5 pay"  />
        <Button block class="loginout" @click="loginout">退出登录</Button>
    </div>
</template>

<script>
import {Button,Cell,CellGroup,Icon} from 'vant';
import {isLogin} from '@/api/index.js'
    export default {
        data () {
            return {
                user:{username:''}
            }
        },
        methods:{
            async checkUser(){
                var token = localStorage.getItem('token') || '';
                var res = await isLogin(token);
                if(!res){
                    this.$toast('请先登录账号');
                    this.$router.push('/login');
                }
            },
            loginout(){
                localStorage.removeItem('token');
                localStorage.removeItem('userInfo');
                this.$router.push('/home');
            }
        },
        components:{
            Button,Cell,CellGroup,Icon
        },
        created(){
            this.checkUser();
            this.$parent.showNavBar({title:'个人中心'});
            this.$parent.isShowTabbar = false;
            this.user = JSON.parse( localStorage.getItem('userInfo')) || {}
        }
    }
</script>

<style lang="scss" scoped>

    .person_container{
        .van-cell{
            .van-cell__value{
                .van-cell-group{
                    display: flex;
                    align-items: center;
                    img{
                        width: 20%;
                        margin-right: 100px;
                    }
                    .name{
                        font-size: 18px;
                        color: #5D5555;
                    }
                }
            }
        }
    }

    .loginout{
        position: fixed;
        bottom: 0;
        left: 0;
    }
</style>
