<template>
    <div class="address_container">
        <van-address-list
            v-model="chosenAddressId"
            :list="addressList"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
        />
    </div>
</template>

<script>
import { AddressList } from 'vant';
import { getaddressData } from '@/api/index.js'
    export default {
        data () {
            return {
                chosenAddressId: 0,
                addressList:[],

            }
        },
        methods: {
            onAdd() {
                this.$router.push('/addressadd');
            },
            onEdit(item, index) {
                // this.$toast('编辑地址:' + index);
                this.$router.push(`/addressedit/${JSON.stringify(item)}`);
            },
            async getAddressList(){
                var userInfo = JSON.parse( localStorage.getItem('userInfo') );
                var res = await getaddressData(userInfo.id);
                res.map(v => {
                    v.address = v.province + v.city + v.country + v.addressDetail;
                    // v.isDefault = v.isDefault == 1 ? true :false;
                    if(v.isDefault == 1){
                        v.isDefault = true;
                        this.chosenAddressId = v.id;
                    }else{
                        delete v.isDefault;
                    }
                })
                this.addressList = res;
            }

        },
        created(){
            this.$parent.showNavBar({title:'地址管理'});
            // 获取所有收货地址时系统会有缓存，需要进行一些处理
            // 发送请求时，在地址后面加上随机数或在请求头加上
            this.getAddressList();
            this.chosenAddressId
        },
        components:{
            "van-address-list":AddressList
        }
    }
</script>

<style lang="scss" scoped>

</style>
