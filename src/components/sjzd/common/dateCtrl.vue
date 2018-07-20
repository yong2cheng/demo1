<template>
    <el-date-picker
        v-model="currentDate"
        type="date"
        placeholder="选择日期"
        @change="sendDate"
        value-format="yyyy-MM-dd" />
    <!-- <el-pagination
        background
        @current-change='change()'
        :current-page.sync="pageSize"
        layout="prev, pager, next"
        :total="1000" /> -->
</template>

<script>
export default {
    data:function(){
        return{
            currentDate : '',
            pageSize : ''
        }
    },
    methods:{
        timestampToTime : function(timestamp){
            var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes() + ':';
            var s = date.getSeconds();
            return Y+M+D;
        },
        sendDate:function(){
            this.$emit("listenDate",this.currentDate)
        }
    },
    created:function(){
        this.currentDate = this.timestampToTime(Date.parse(new Date())/1000)
    }
}
</script>

<style>

</style>
