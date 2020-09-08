<template>
    <div class="addressadd_container">
        <van-address-edit
            :area-list="areaList"
            show-postal
            show-delete
            show-set-default
            show-search-result
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
            @change-area = "onChangeArea"
        />
    </div>
</template>

<script>
import { AddressEdit,Area } from 'vant';
import { addressAddData } from '@/api/index.js'
import areaList from '../../util/area.js'
    export default {
        data() {
            return {
                areaList,
                areaCode:''
            };
        },
        created () {
            this.$parent.showNavBar({title:'新增地址'})

        },
        components:{
            "van-address-edit" : AddressEdit
        },
        methods: {
            async onSave(values) {
                // console.log(values);
                var user = JSON.parse( localStorage.getItem('userInfo') );
                values.areaCode = this.areaCode;
                values.isDefault = values.isDefault==true ? 1 : 0;
                values.country = values.county;
                // console.log(values);
                // return;
                let {status,message} = await addressAddData(values,user.id);
                this.$toast(message);
                if(status == 0){
                    this.$router.push('/addressmanage');
                    // todo 如果新增地址为默认，需要请求数据库将地址列表中其他的默认地址的默认标志清除

                }
            },
            onDelete() {
                Toast('delete');
            },
            onChangeArea(value){
                console.log(value);
                var arr = [];
                value.map(v => {
                    arr.push(v.code);
                })
                this.areaCode = arr.join('-');
            }
        },

    }
</script>

<style lang="scss" scoped>

</style>
