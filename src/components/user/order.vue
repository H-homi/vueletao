<template>
    <div>
        <van-tabs v-model="active">
            <van-tab title="全部" >
                <van-card
                    v-for="item in 10" :key="item"
                    num="2"
                    price="2.00"
                    desc="描述信息"
                    title="商品标题"
                    thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
                />
            </van-tab>
            <van-tab title="待付款">
                <van-card
                    v-for="item in 2" :key="item"
                    num="2"
                    price="10.00"
                    desc="描述信息"
                    title="商品标题"
                    thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
                />
            </van-tab>
            <van-tab title="待收货">
                <van-card
                    v-for="item in 2" :key="item"
                    num="2"
                    price="5.00"
                    desc="描述信息"
                    title="商品标题"
                    thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
                />
            </van-tab>
            <van-tab title="已完成">
                <van-card
                    v-for="item in 2" :key="item"
                    num="2"
                    price="4.00"
                    desc="描述信息"
                    title="商品标题"
                    thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
                />
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { Tab, Tabs,Card  } from 'vant';
    export default {
        data () {
            return {
                active: 0,
            }
        },
        created(){
            this.$parent.showNavBar({title:'我的订单'})

        },
        components:{
            'van-tabs':Tabs,
            'van-tab':Tab,
            'van-card':Card
        }
    }
</script>

<style lang="scss" scoped>

</style>
