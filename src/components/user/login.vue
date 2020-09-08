<template>
    <div class="login_container">
        <van-form @submit="onSubmit">
        <van-field
            v-model="username"
            name="username"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
            提交
            </van-button>
        </div>
        </van-form>
        <div class="register">
            <router-link to='/register'>新用户注册</router-link>
        </div>
        <div class="home">
            <router-link to='/home'>首页</router-link>
        </div>
    </div>
</template>

<script>
import { Form,Field,Button } from 'vant';
import { userLogin } from '@/api/index.js'
    export default  {
        components:{
            'van-form':Form,
            'van-field':Field,
            'van-button':Button
        },
        data() {
            return {
                username: '',
                password: '',
            };
        },
        methods: {
            async onSubmit(values) {
                this.$toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    duration:0,     //持续展示toast
                });
                let {message,status,token,userInfo} = await userLogin(values);
                this.$toast.clear();
                this.$toast(message);
                if(status == 0){
                    localStorage.setItem('userInfo',JSON.stringify(userInfo));
                    localStorage.setItem('token',token);
                    this.$router.push('/home');
                }
            },
        },
        created(){
            this.$parent.showNavBar({title:'登录'});
            this.$nextTick(function(){
                document.querySelector('.van-nav-bar__left').style.display='none'
            });
        },
    }
</script>
<style lang="scss" scoped>
    .login_container{
        margin-top: 20px;

        .register , .home{
            text-align: center;
            margin-top: 15px;
            a{
                color: rgb(168, 164, 164);
            }
        }

    }

</style>
