<template lang="html">
  <transition name='fade'>
    <div class="overlay" v-show="close">
        <div :style="{height:oheight,width:owidth}" class="overlay_main">
          <span class="close" title="关闭" @click="switchs();changeSatus()"></span>
          <slot></slot>
        </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "overlay",
  data() {
    return {}
  },
  props: ['close','oheight','owidth'],
  methods: {
    switchs() {
      this.$emit('update:close', false)
    },
    changeSatus() {//事件
      this.$emit('changeSatus', false)//触发自定义事件
    }
  }
}
</script>

<style lang="css">
.overlay{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99;
  background-color: rgba(0,0,0,.5) !important;
  display: flex;
  justify-content: center;
  align-items: center;
}
.overlay_main{
  position: relative;
  background: #043434;
box-shadow: 0 2px 5px 5px rgba(0,0,0,.1);
color: #49f5f5;

}
.close{
  display: inline-block;
  width: 36px;
  height: 36px;
  background: url(../../assets/img/close.png) no-repeat 0 0;
  position: absolute;
  right: 5px;
  top: -36px;
  cursor: pointer;
}
</style>
