<template lang="html">
  <div class="main">
    <div class="mxian_succ mxian_mxwh">
      <div class="tool_bar">
        <!-- {{EMSareaId}}
        {{$route.path}} -->
          <span class="frbutt">
            <router-link :to="{path: $route.path+'/ems', query:{sysId:$route.query.sysId,sonid:$route.query.sonid,areaId:EMSareaId}}">EMS关联</router-link>
          </span>
          <span class="frbutt">
              <router-link target="_blank" :to="{path: $route.path+'/yxyh', query:{sysId:$route.query.sysId,sonid:$route.query.sonid}}">营销关联</router-link>
          </span>         
          <span class="frbutt">
              <router-link :to="{path: '', query:{sysId:$route.query.sysId,sonid:$route.query.sonid} }">线路模型</router-link>
          </span>
          <span class="frbutt">
              <router-link :to="{path: $route.path+'/refrom', query:{sysId:$route.query.sysId,sonid:$route.query.sonid}}">查看设备状态</router-link>
          </span>
          <span class="frbutt">
              <router-link :to="{path: $route.path+'/daoru', query:{sysId:$route.query.sysId,sonid:$route.query.sonid}}">导入</router-link>
          </span>
          <!-- <span class="frbutt">
              <router-link :to="{path: '', params: {} }">厂站导入</router-link>
          </span> -->
          <span style="margin-left:18px;color:#937505;font-size:13px;">当前地区:
            <i>{{areaName?areaName:'--'}}</i>
          </span>
          <!-- <div id="sjchange" class="tubiaobut" style="width:112px;float:right;margin-top:15px;">
            <p style="width:112px;">
              <span style="width:55px;" class="che" @click='switchData'>系统数据</span>
              <span style="width:55px;" @click='switchData'>地市数据</span>
            </p>
            <div class="tsblock" :class="{'switch':!switchType}" style="width:56px;" ></div>
          </div> -->
      </div>
      <section class="mxwh_main">
        <collect v-show="!shoeCollect" @showCollectLIst='getCollect' @getAreaId="getAreaIds" :dataType='switchType' ref='collected' />
        <collect-list v-show="shoeCollect" @backCollect='backCollect' @showDash ="showDash" />
        <overlay :close.sync="close">
          <div class="overlay_wrap">
            <dash-board :query ='subQuery' v-if="close"/>
          </div>
        </overlay>
      </section>
    </div>
  </div>
</template>
<script>
import collect from "./parts/collect.vue"
import collectList from "./parts/collect_list.vue"
import overlay from '@/components/common/overlay'
import dashBoard from './parts/dashboard.vue'
export default {
  name: "mxwh",
  data() {
    return {
      shoeCollect: false, //关闭列表
      close: false, //关闭弹框
      subQuery: '', //传给dashboard的参数
      listArr: [], //列表数据
      areaId: '',
      areaName:'',
      EMSareaId: 1,
      switchType:true,//true为系统数据,false为地市数据
    }
  },
  methods: {
    getCollect(data) { //获取二级列表
      this.shoeCollect = data;
    },
    backCollect(data) { //返回首页
      this.shoeCollect = data;
    },
    getAreaIds(msg) { //点击树传出来的地区Id
      console.log(msg);
      this.areaName = msg.name;
      this.EMSareaId =msg.id;
    },
    showDash(data) { //显示操作台，并穿数据
      // data=[true,item]
      this.close = data[0];
      this.subQuery = data[1];
    },
    switchData(){//切换数据源
      this.switchType = !this.switchType;
      if (this.switchType) {
        this.$refs.collected.getSysData();
      }else {
        this.$refs.collected.dynamicIp()
      }
    }
  },
  components: {
    collect,
    collectList,
    overlay,
    dashBoard
  }
}
</script>
<style lang="css">
.tool_bar{
  width: 99%;
  margin: 5px .5%;
  position: relative;
  border-bottom: 1px solid #0d7474;
  height: 70px;
  line-height: 70px;
}
.mxian_mxwh{
  min-height: 480px;
  margin-top: 0;
}
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
.switch{
  margin-left: 55px;
}
</style>
