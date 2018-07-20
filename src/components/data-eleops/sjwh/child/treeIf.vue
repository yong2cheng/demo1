<template>
    <ul>
        <li :key="index" v-for="(item,index) in 3">
            {{item}}
            <tree-ul></tree-ul>
        </li>
    </ul>
</template>
<script>

export default {
    
}
</script>
<style>

</style>
