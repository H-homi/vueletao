<template>
    <div class="register_container">
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
        <van-field
            v-model="confirmPassword"
            type="password"
            name="confirmPassword"
            label="确认密码"
            placeholder="确认密码"
            :rules="[{ required: true, message: '请填写确认密码' }]"
            @change=checkPassword
        />
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
            提交
            </van-button>
        </div>
        </van-form>
        <div class="login">
            <router-link to='/login'>登录</router-link>
        </div>
        <div class="home">
            <router-link to='/home'>首页</router-link>
        </div>
    </div>
</template>

<script>
import { Form,Field,Button } from 'vant';
import { registerUser } from '@/api/index.js'
    export default {
        data() {
            return {
                username: '',
                password: '',
                confirmPassword:''
            };
        },
        methods:{
            async onSubmit(values){
                let {username,password} = values;
                // console.log(username);
                // console.log(password);
                let bool = this.checkPassword();
                if(!bool){
                    this.$toast('两次密码输入不一致');
                    return;
                }
                // console.log(bool);
                let res = await registerUser({username,password});
                console.log(res);
                if(res.status==0){
                    this.$toast.success('注册成功,即将前往登录');
                    this.$router.push('/login');
                }else{
                    this.$toast.fail(res.message);
                }
            },
            checkPassword(){
                var _this = this;
                var ele = document.querySelector('input[name=confirmPassword]');
                var ele2 = document.querySelector('input[name=password]');
                if(ele.value != ele2.value){
                    _this.$toast('两次密码输入不一致');
                    return false;
                }else{
                    return true
                }
            }

        },
        created(){
            this.$parent.showNavBar({title:'注册'});
            this.$nextTick(function(){
                document.querySelector('.van-nav-bar__left').style.display='none'
            });

        },
        components:{
            'van-form':Form,
            'van-field':Field,
            'van-button':Button
        },


    }
</script>

<style lang="scss" scoped>
    .register_container{
        margin-top: 20px;

        .login , .home{
            text-align: center;
            margin-top: 15px;
            a{
                color: rgb(168, 164, 164);
            }
        }

    }
</style>
