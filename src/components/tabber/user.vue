<template>
    <div>
        <div class="person_container">
            <Cell >
                <CellGroup :border=false>
                    <img src="../../assets/images/logo.png" alt="">
                    <div class="name">用户名：homi</div>
                </CellGroup>
            </Cell>
            <Cell title="修改密码" is-link />
            <Cell title="我的订单" is-link />
            <Cell title="地址管理" is-link />
        </div>
        <br>
        <Cell title="提交反馈" is-link />
        <Cell title="关于乐淘" value='v1.0.0' />
        <Cell title="weixin h5 pay"  />
        <Button block class="loginout">退出登录</Button>
    </div>
</template>

<script>
import {Button,Cell,CellGroup,Icon} from 'vant';
    export default {
        data () {
            return {

            }
        },
        methods:{

        },
        components:{
            Button,Cell,CellGroup,Icon
        },
        created(){
            this.$parent.showNavBar({title:'个人中心'});
            this.$parent.isShowTabbar = false;
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
