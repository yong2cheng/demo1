<template>
    <div  class="inbl">
        <div v-for="(ico,index) of icon" class="btn primary iconBtn" v-bind:class="ico.iconFont" :key="index">
            {{ico.iconName}}
        </div>
    </div>
</template>

<script>
export default {
    props:['icon']
}
</script>

<style>
    .iconBtn{
        margin-right: 10px; 
    }
</style>
