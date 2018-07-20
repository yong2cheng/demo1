<template lang="html">
  <div>
    <div class="head_bar">
        <div class="iconbox">
          <div @click="switchSee" class="frbutts tubiaobut">
            <p>
              <span>表</span>
              <span >图</span>
            </p>
            <div class="tsblock" :class="{'switch':!switchType}"></div>
          </div>
        </div>
    </div>
    <transition name="component-fade" mode="out-in">
              <keep-alive>    
                  <component :is="currentView"></component>
              </keep-alive>    
    </transition>
   

  </div>
     

</template>
<script>
import fiure from'./figure'
import tble from'./table'
import BScroll from "better-scroll";
export default {
  data() {
    return {
     currentView:'tble',
     switchType:true,//true为表,false为图
    };
  },
  created() {
    // this.getData();
  },
   mounted: function() {
        this.$nextTick(() => {
            let scroll2 = new BScroll('.scroll2', {scrollbar:{fade: true,interactive: true} ,mouseWheel: true});
        });
    },
  methods: {
    switchSee(){//切换表与图
      this.switchType = !this.switchType;
      if (this.switchType) {
        this.currentView='tble';
      }else {
        this.currentView='fiure';
      }
    }
  },
  components:{
      fiure,
      tble
  }
};
</script>

<style>
.head_bar { float:left; width:99%; margin:5px .5%; position:relative;  border-bottom:1px solid #0d7474;}

.head_bar .butt { float:left; height:24px; font-size:13px; padding:0 5px; background:#0d7474; margin:5px; line-height:23px; cursor:pointer; font-weight:normal;}
.head_bar .butt.right { float:right; cursor:pointer !important; padding:0 20px;}
.head_bar .butt a { color:#fff; text-decoration:none;}
.head_bar .butt:hover { background:#11aeae}
.iconbox { float:left; margin:20px 0; margin-left:10px;}
.frbutts,.iconbox a { float:left; margin-left:5px; height:32px; padding:0 15px;  background:#0d7474; line-height:32px; font-size:13px; cursor:pointer; }
.frbutts:hover,.iconbox a:hover {background:#0A9C9C}
.iconbox a {color:#fff; text-decoration:none; display:block; }
.tubiaobut {
    position: relative;
    width: 80px;
    padding: 0 3px;
    text-align: center;
    cursor: pointer;
    border-radius: 40px;
    background: #012323;
    -webkit-box-shadow: inset 0 2px 5px 1px rgba(0,0,0,.5), 0 1px 0 rgba(255,255,255,.2);
    box-shadow: inset 0 2px 5px 1px rgba(0,0,0,.5), 0 1px 0 rgba(255,255,255,.2);
}
.tubiaobut:hover,.tubiaobut2:hover  {background:#012323;}
.tubiaobut p {
    float: left;
    width: 80px;
    position: absolute;
    z-index: 2;
}
.tubiaobut p span {
    float: left;
    width: 40px;
    height: 32px;
    line-height: 32px;
    font-size: 12px;
    text-align: center;
}
.tubiaobut .tsleft {
    margin-left: 0;
}
.tubiaobut .tsblock {
    float: left;
    width: 40px;
    height: 26px;
    background: #dd6b66;
    border-radius: 13px;
    margin-top: 1px;
    transition: all 0.3s;
}
.tubiaobut .tsblock,.tubiaobut2 .tsblock { float:left; width:40px; height:26px; background:#dd6b66; border-radius:13px;  margin-top:3px;}
/* .switch{
  margin-left: 40px;
} */

.yiban { float:left; width:46%; margin:20px 2%;}
.yiban table tr td { font-size:13px;}
.yiban table thead tr td {font-size:14px;}
.switch {margin-left: 40px;}
.iconbox .switch_left {margin-left: 0;}
.iconbox .switch_right {margin-left: 40px;}
</style>
