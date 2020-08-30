import vue from 'vue';

import moment from 'moment'

// 全局过滤器
vue.filter('datatimeFormat',function(data,format='YYYY-MM-DD'){
    return moment(data).format(format);
})
