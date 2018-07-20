<template>
    <ul>
        <li :key="index" v-for="(item,index) in 3">
            {{item}}
            <tree-if v-if="folder.hasChild"></tree-if>
            <tree-else v-else></tree-else>
        </li>
    </ul>
</template>
<script>
import treeIf from './treeIf.vue'
import treeElse from './treeElse.vue'
export default {
    props:['folder'],
    components:{
        treeIf,
        treeElse
    }
}
</script>
<style>

</style>
