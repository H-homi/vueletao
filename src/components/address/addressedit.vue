<template>
    <div class="addressadd_container">
        <van-address-edit
            :area-list="areaList"
            :address-info="areaInfo"
            show-postal
            show-delete
            show-set-default
            show-search-result
            :area-columns-placeholder="['请选择', '请选择', '请选择']"
            @save="onSave"
            @delete="onDelete"
            @change-area = "onChangeArea"
        />
        <!-- {{addressInfo}} -->
    </div>
</template>

<script>
import { AddressEdit,Area } from 'vant';
import { addressEditData,addressDeleteData } from '@/api/index.js'
import areaList from '../../util/area.js'
    export default {
        // 路由props解耦参数
        props:['addressInfo'],
        data() {
            return {
                areaList,
                areaCode:'',
                areaInfo:{},
                proCityCountry:[]
            };
        },
        created () {
            this.$parent.showNavBar({title:'编辑地址'});
            this.areaInfo = JSON.parse(this.addressInfo);
            this.areaCode = this.areaInfo.areaCode
            // this.areaInfo.areaCode = this.areaInfo.areaCode.split('-')[2];
            var temp = this.areaInfo.areaCode.lastIndexOf('-');
            if(temp != -1){
                this.areaInfo.areaCode = this.areaInfo.areaCode.substring(temp+1);
            }
        },
        components:{
            "van-address-edit" : AddressEdit
        },
        methods: {
            async onSave(values) {
                console.log(values)
                var user = JSON.parse(localStorage.getItem('userInfo'));
                values.user_id = user.id;
                values.areaCode = this.areaCode;
                values.isDefault = values.isDefault ?1 :0;
                values.country = values.county;
                // return;
                var { status,message } = await addressEditData(values);
                this.$toast(message)
                if(status == 0){
                    this.$router.push('/addressmanage');
                }
            },
            async onDelete(value) {
                var {status,message} = await addressDeleteData(value.id);
                this.$toast(message)
                if(status == 0){
                    // 删除成功
                    this.$router.push('/addressmanage');
                }
            },
            onChangeArea(value){
                // console.log(value);
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
