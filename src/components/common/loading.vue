<template>
    <div class="loadbox" v-if="isLoading">
       <div class="tkzz"></div>
         <div class="loading">
         <span></span>
         <span></span>
         <span></span>
         <span></span>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    isLoading: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style>
</style>
