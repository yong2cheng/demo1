<template>
  <div class="main sjwh">
    <div class="t_title">数据重处理</div>
    <div class="t_sousuo">
      <input type="text" placeholder="输入厂站名称(待开发)" class="txt"/>
      <button disabled>搜索</button>
    </div>
    <div class="trunk">
      <el-row type="flex" class="row-bg">
        <el-col :span="5"><div class="sjwh_tree">
          <!-- <el-tree :props="props" check-strictly @node-contextmenu="toright" :load="loadNode" :lazy="true" @check-change="handleCheckChange">
</el-tree> -->
<el-tree style="width:300px;" :data="data" :props="defaultProps" @node-contextmenu="toright" @node-expand="handleNodeClick">
</el-tree>
          </div></el-col>
        <el-col :span="19">
          <div class="grid-content">
            <div style="height:50%;padding:20px;box-sizing:border-box;border:1px solid #0d7474;border-bottom:none;">
              <table class="table">
                <thead>
                  <tr style="cursor:pointer;" title="双击为所有设备添加信息" @dblclick="addXX(-1)">
                    <td>序号</td>
                    <td colspan="2">处理设备名称</td>
                    <td>任务类型</td>
                    <td colspan="2">数据开始时间</td>
                    <td colspan="2">数据结束时间</td>
                  </tr>
                </thead>
              </table>
              <div class="scroll4" style="height: calc(100% - 72px);border-bottom:1px solid #0d7474;">
                <table class="table">
                  <tbody>
                    <tr style="cursor:pointer;" :class="{readyBg:index==scindex}" title="双击为改条设备添加信息" @dblclick="addXX(index)" @click="scindex=index" :key="index" v-for="(item,index) in addData">
                      <td>{{index-(-1)}}</td>
                      <td colspan="2">{{item.name}}</td>
                      <td>{{item.leixin}}</td>
                      <td colspan="2">{{item.startTime}}</td>
                      <td colspan="2">{{item.endTime}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="text-align:center;line-height:50px;">
                <button @click="chanchua" class="warning">删除</button>
                <button @click="addData=[]" class="warning">清空</button>
                <button @click="zhixin">执行</button>
              </div>
            </div>
            <div style="height:50%;padding:20px;box-sizing:border-box;border:1px solid #0d7474;">
              <table class="table">
                <thead>
                  <tr>
                    <td><input :checked="quanxuan" @click="quanxuan=!quanxuan" type="checkbox">勾选</td>
                    <td>序号</td>
                    <td colspan="2" style="position: relative;">处理设备名称
                        <div class="common_sort">
                          <span class="positive_sequence" @click="orderColumn='name';direction=1;getReTask()"></span>
                          <span class="reverse_order" @click="orderColumn='name';direction=0;getReTask()"></span>
                        </div>
                    </td>
                    <td width="12%" style="position: relative;">任务类型
                        <div class="common_sort">
                          <span class="positive_sequence" @click="orderColumn='taskType';direction=1;getReTask()"></span>
                          <span class="reverse_order" @click="orderColumn='taskType';direction=0;getReTask()"></span>
                        </div>
                    </td>
                    <td colspan="2" style="position: relative;">处理开始时间
                        <div class="common_sort">
                          <span class="positive_sequence" @click="orderColumn='startTime';direction=1;getReTask()"></span>
                          <span class="reverse_order" @click="orderColumn='startTime';direction=0;getReTask()"></span>
                        </div>
                    </td>
                    <td colspan="2" style="position: relative;">处理结束时间
                        <div class="common_sort">
                          <span class="positive_sequence" @click="orderColumn='endTime';direction=1;getReTask()"></span>
                          <span class="reverse_order" @click="orderColumn='endTime';direction=0;getReTask()"></span>
                        </div>
                    </td>
                    <td width="12%" style="position: relative;">处理状态
                        <div class="common_sort">
                          <span class="positive_sequence" @click="orderColumn='status';direction=1;getReTask()"></span>
                          <span class="reverse_order" @click="orderColumn='status';direction=0;getReTask()"></span>
                        </div>
                    </td>
                  </tr>
                </thead>
              </table>
              <div class="scroll3" style="height: calc(100% - 72px);border-bottom:1px solid #0d7474;">
                <table class="table">
                  <tbody>
                    <tr v-if="reTask.length<=0">
                      <td colspan="7">
                        暂无数据
                      </td>
                    </tr>
                    <tr :key="index" v-for="(item,index) in reTask">
                      <td><input v-model="dcl" :value="index" type="checkbox"></td>
                      <td>{{index-(-1)}}</td>
                      <td colspan="2">{{item.name}}</td>
                      <td width="12%">{{item.taskType}}</td>
                      <td colspan="2">{{item.startTime}}</td>
                      <td colspan="2">{{item.endTime}}</td>
                      <td width="12%" @click="getAffe(item.status,item.modelId,item.startTime,item.endTime,item.name,item.taskType,item.type)" :class="{clickable:item.status=='成功'}">{{item.status}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style="text-align:center;line-height:50px;">
                <button @click="delReTask" class="warning">删除</button>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <overlay style="min-height:600px;" oheight="60%" :close.sync="isShowd">
      <div class="yiji_t">
        <div class="t_title">
          <span>任务处理状态</span>
        </div>
        <div class="t_sousuo">
          <div class="left">
            <span>设备名称：<span style="color:#fff;">{{affName}}</span> </span>
          <span>任务类型：<span style="color:#fff;">{{affTaskType}}</span></span>
          </div>
          <div class="right">
            <span>数据开始时间：<span style="color:#fff;">{{affStartTime}}</span></span>
            <span>数据结束时间：<span style="color:#fff;">{{affEndTime}}</span></span>
          </div>
          <div style="clear:both;"></div>
        </div>
        <div style="height:calc(100% - 90px);border:1px solid #0d7474;padding:10px;box-sizing:border-box;">
          <el-col style="height:100%;" :span="5">
            <div>
              <table style="position:relative;left:1px;" class="table">
                <tbody>
                  <tr>
                    <td rowspan="3">处理流程</td>
                    <td @click="cllc='统计电量'" class="isClick" :class="{xuanz:cllc=='统计电量'}">统计电量</td>
                  </tr>
                  <tr>
                    <td @click="cllc='分线'" class="isClick" :class="{xuanz:cllc=='分线'}">分线</td>
                  </tr>
                  <tr>
                    <td @click="cllc='母平'" class="isClick" :class="{xuanz:cllc=='母平'}">母平</td>
                  </tr>
                </tbody>
              </table>
            </div>
            </el-col>
        <el-col style="height:100%;border:1px solid #0d7474;padding:10px;background:#012828;" :span="19">
          <div style="height:100%;">
            <div class="t_title">
              <div class="left">
                <button :class="{btn_checked:dateType==1}" @click="dateType=1">日查询</button>
              <button :class="{btn_checked:dateType==0}" @click="dateType=0">月查询</button>
              </div>
              
              <div class="right">
                <el-date-picker
                type="date" v-if="dateType"
                v-model="dayDate"
                value-format="yyyy-MM-dd"
                placeholder="选择一个日期">
                </el-date-picker>
                <el-date-picker
                type="month" v-if="!dateType"
                v-model="dayDate"
                value-format="yyyy-MM-dd"
                placeholder="选择一个日期">
                </el-date-picker>
                <button @click="getAffe('成功',rwclId)">查询</button>
              </div>
              <div style="clear:both"></div>
            </div>
            <table v-show="cllc=='统计电量'" class="table">
              <thead>
                <tr>
                  <td>序号</td>
                  <td>设备</td>
                  <td>正向有功</td>
                  <td>反向有功</td>
                </tr>
              </thead>
            </table>
            <div v-show="cllc=='统计电量'" class="scroll" style="height:calc(100% - 80px);border-bottom:1px solid #0d7474;">
              <table class="table">
                <tr>
                  <td v-if="dldata.length<=0" colspan="6">暂无数据</td>
                </tr>
                <tr :key="index" v-for="(item,index) in dldata">
                  <td>{{index-(-1)}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.mainElecPap}}</td>
                  <td>{{item.mainElecRap}}</td>
                </tr>
              </table>
            </div>
            <table v-show="cllc=='分线'" class="table">
              <thead>
                <tr>
                  <td>序号</td>
                  <td>时间</td>
                  <td>线路名称</td>
                  <td>输入电量</td>
                  <td>输出电量</td>
                  <td>差电量</td>
                  <td>平衡率</td>
                </tr>
              </thead>
            </table>
            <div v-show="cllc=='分线'" class="scroll1" style="height:calc(100% - 80px);border-bottom:1px solid #0d7474;">
              <table class="table">
                <tr>
                  <td colspan="7">待开发</td>
                </tr>
              </table>
            </div>
            <table v-show="cllc=='母平'" class="table">
              <thead>
                <tr>
                  <td>序号</td>
                  <td>时间</td>
                  <td>线路名称</td>
                  <td>输入电量</td>
                  <td>输出电量</td>
                  <td>差电量</td>
                  <td>平衡率</td>
                </tr>
              </thead>
            </table>
            <div v-show="cllc=='母平'" class="scroll2" style="height:calc(100% - 80px);border-bottom:1px solid #0d7474;">
              <table class="table">
                <tr v-if="mpdata.length==0">
                  <td colspan="7">暂无数据</td>
                </tr>
                <tr :key="index" v-for="(item,index) in mpdata">
                  <td>{{index-(-1)}}</td>
                  <td>{{item.occurTime}}</td>
                  <td>{{item.name}}</td>
                  <td>{{item.inputValue}}</td>
                  <td>{{item.outputValue}}</td>
                  <td>{{item.value}}</td>
                  <td>{{item.rate}}</td>
                </tr>
              </table>
            </div>
          </div>
        </el-col>
        </div>
      </div>
    </overlay>
    <!-- 添加信息 -->
    <overlay style="min-height:440px;" :close.sync="isShowa">
      <div style="width:455px;font-size:14px;">
        <div class="t_title">
          <span>{{addName}}</span>
        </div>
          <div style="box-sizing:border-box;text-align:center;">
            <!-- <p style="line-height:50px;">
              <span>数据开始时间：</span>
              <el-date-picker
                            type="date"
                            v-model="startTime"
                            value-format="yyyy-MM-dd"
                            placeholder="yyyy-MM-dd">
                            </el-date-picker>
            </p>
            <p style="line-height:50px;">
              <span>数据结束时间：</span>
              <el-date-picker
                            type="date"
                            v-model="endTime"
                            value-format="yyyy-MM-dd"
                            placeholder="yyyy-MM-dd">
                            </el-date-picker>
            </p> -->
            <el-date-picker
              v-model="value13"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
            <p style="line-height:50px;">
              <span style="display:inline-block;width:98px;">任务类型：</span>
              <select v-model="leixin" name="" id="">
                <option value="0">重处理</option>
              </select>
            </p>
          </div>
          <div style="line-height:50px;" class="t_foot">
            <button @click="addXXqd">确定</button>
          </div>
      </div>
    </overlay>
     <!-- loading框 -->
      <div v-if="isLoading" class="loadbox">
          <div class="tkzz"></div>
          <div class="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          </div>
      </div>
      <!-- <tree-test></tree-test> -->
  </div>
</template>

<script>
import tree from '@/components/common/tree.vue'
import treeMinx from '@/components/mixins/tree.js'
import overlay from '@/components/common/overlay'
import BScroll from "better-scroll"
import qs from "qs"
import treeTest from './child/treeTest.vue'
export default {
  mixins: [treeMinx],
  components:{
    tree,
    overlay,
    treeTest
  },
  data:function(){
    return{
      token:sessionStorage.getItem("accessToken"),
      isShowd:false,
      hasisShowd:false,
      hasScroll1:false,
      hasScroll2:false,
      cllc:'统计电量',
      dayDate:this.$day().format("YYYY-MM-DD"),
     props: {
          label: 'name',
          children: 'zones'
        },
        count: 1,
        data:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        addData:[],
        addName:"",
        isShowa:false,
        value13:[],
        startTime:"",
        endTime:"",
        scindex:-1,
        addIndex:"",
        leixin:0,
        leixinNames:["重处理","数据预插"],
        timer:"",
        reTask:[],
        dateType:0,
        rwclId:'',
        dcl:[],
        quanxuan:false,
        mpdata:[],
        dldata:[],
        isLoading:false,
        affName:'',
        affStartTime:'',
        affEndTime:'',
        affTaskType:'',
        orderColumn:'stName',
        direction:0,
        affType:1
    }
  },
  mounted(){
    this.$nextTick(() => {
          let scroll = new BScroll(".sjwh_tree", {
            scrollbar: { fade: false, interactive: true },
            preventDefault:false,
            mouseWheel: true,
            freeScroll:true,
            scrollX:true
          });
          let scroll3 = new BScroll(".scroll3", {
            scrollbar: { fade: false, interactive: true },
            preventDefault:false,
            mouseWheel: true
          });
          let scroll4 = new BScroll(".scroll4", {
            scrollbar: { fade: false, interactive: true },
            preventDefault:false,
            mouseWheel: true
          });
    });
    this.$http.get("/treeService/tree/getAllSystemTreeNode?sign="+this.token)
      .then(res=>{
        if(res.data.code==1){
          var arr=res.data.data.allSubSystems;
          var data=[];
          for(var a of arr){
            if(a.id!=null&&a.id!=""){
              data.push({
                label:a.name,
                id:a.id,
                children:[{}]
              })
            }
          }
          this.data=data;
        }
      });
      this.getReTask();
  },
  methods:{
    chanchua(){
      if(this.scindex==-1){
        this.$notify.info({
          title: '消息',
          message: '请先选中设备!!!'
        });
      }else{
        this.addData.splice(this.scindex,1);
        this.scindex=-1;
      }
    },
    addXX(index){
      this.isShowa=true;
      this.addIndex=index;
      if(index==-1){
        this.addName="所有设备"
        this.leixin=0;
      }else{
        this.addName=this.addData[index].name;
        if(this.addData[index].startTime!=""){
          this.startTime=this.addData[index].startTime;
          this.endTime=this.addData[index].endTime;
        }
        this.leixin=this.leixinNames.indexOf(this.addData[index].leixin);
        if(this.leixin==-1){
          this.leixin=0;
        }
      }
    },
    addXXqd(){
      if(this.startTime==""||this.endTime==""){
        this.$notify.info({
          title: '消息',
          message: '请填写时间!!!'
        });
        return;
      }
      if(this.addIndex==-1){
        for(var a of this.addData){
          a.startTime=this.startTime;
          a.endTime=this.endTime;
          a.leixin=this.leixinNames[this.leixin];
          a.leixinnum=this.leixin;
        }
        this.isShowa=false;
      }else{
        this.addData[this.addIndex].startTime=this.startTime;
        this.addData[this.addIndex].endTime=this.endTime;
        this.addData[this.addIndex].leixin=this.leixinNames[this.leixin];
        this.addData[this.addIndex].leixinnum=this.leixin;
        this.isShowa=false;
      }
    },
    handleCheckChange(data, checked, indeterminate) {
        
      },
    handleNodeClick(data,node,body) {
        console.log(body);
        if (node.level === 1){
          this.treeHttp("/treeService/tree/getAllBaseVoltageTreeNodeBySystemId?sign="+this.token+"&systemId="+node.data.id,'allSubStations',false,data);
          
        }
        if (node.level === 2){
          this.treeHttp("/treeService/tree/getAllSubStationTreeNodeBySystemIdAndBvId?sign="+this.token+"&systemId="+node.data.parentId+"&bvId="+node.data.id,'allSubStations',false,data);
          data.children=[
          {
            label:data.label+'-1'
          }
          ]
        }
        if(node.level===3){
          this.treeHttp("/treeService/tree/getAllVoltagelevelTreeNodeBySystemIdAndBvId?sign="+this.token+"&sbtId="+node.data.id,'allSubStations',false,data);
          
        }
        if(node.level===4){
         this.treeHttp("/quotaService/quota/getMeter?sign="+this.token+"&vlId="+node.data.id,'meters',true,data);
          
        }
        if(node.level>4){
          return resolve([]);
        }
    },
    toright(event,data,node){
      var has=false;
      for(var a of this.addData){
        if(a.id==node.data.id||a.id==node.data.mrid){
          has=true;
        }
      }
      if(has){
        this.$notify.info({
          title: '消息',
          message: '已存在该设备!!!'
        });
      }else{
        if(node.level==3){
          this.addData.push({
            name:node.data.label,
            id:node.data.id,
            type:0, //厂站1 设备2
            leixin:"",
            leixinnum:"",
            startTime:"",
            endTime:""
          })
        }
        if(node.level==5){
          this.addData.push({
            name:node.data.label,
            id:node.data.mrid,
            leix:"",
            leixinnum:"",
            type:1, //厂站1 设备2
            startTime:"",
            endTime:""
          })
        }
      }
    },
    treeHttp(url,qq,isLocalName,data){
      this.$http.get(url)
            .then(res=>{
              if(res.data.code==1){
                var arr=res.data.data[qq];
                var datax=[];
                for(var a of arr){
                  if((a.id!=null&&a.id!="")||(a.mrid!=null&&a.mrid!="")){
                    if(isLocalName){
                      var name=a.localName;
                      var children=[];
                    }else{
                      var name=a.name;
                      var children=[{}];
                    }
                    datax.push({
                      label:name,
                      id:a.id,
                      attribute:a.attribute,
                      mrid:a.mrid,
                      parentId:a.parentId,
                      children:children
                    })
                  }
                }
                data.children=datax;
              }
            })
    },
    zhixin(){
      if(this.addData.length<=0){
        this.$notify.info({
          title: '消息',
          message: '没有可执行设备!!!'
        });
      }else{
        this.isLoading=true;
          var arr=[];
          for(var a of this.addData){
            if(a.startTime==""||a.endTime==""){
              this.$notify.info({
                title: '消息',
                message: '有未添加时间的设备!!!'
              });
              this.isLoading=false;
              return;
            }
            arr.push({
              type:a.type,
              stId:a.id,
              startTime:a.startTime,
              endTime:a.endTime
            })
          }
        this.$http.post("/maintenanceService/dateMaintenanceService/reTaskEnergys?sign="+this.token,
          arr)
          .then(res=>{
            if(res.data.code==1){
              this.$notify({
                title: '成功',
                message: '执行成功!',
                type: 'success'
              });
              this.isLoading=false;
              this.$http.get("/maintenanceService/dateMaintenanceService/getReTask?taskType=1&sign="+this.token)
                .then(res=>{
                  if(res.data.code==1){
                    var data=res.data.data.getReTask;
                    var arr=[];

                    for(var a of data){
                      if(a.modelId!=null||a.modelIds!=null){
                        arr.push({
                          name:a.name,
                          id:a.id,
                          modelId:a.modelIds==null?a.modelId:a.modelIds,
                          type:a.modelIds==null?1:0,
                          status:a.status==1?"已提交":
                                                a.status==2?"正在处理":
                                                    a.status==3?"成功":"失败",
                          startTime:new Date(a.startTime).toLocaleString(),
                          endTime:new Date(a.endTime).toLocaleString(),
                          taskType:"重处理"
                        })
                      }
                      
                    }
                    this.reTask=arr;
                  }else{
                    this.$notify.error({
                      title: '错误',
                      message: res.data.msg
                    });
                    return;
                  }
                })
            }else{
              this.isLoading=false;
            }
          })
      }
    },
    getReTask(){
      this.$http.get("/maintenanceService/dateMaintenanceService/getReTask?taskType=1&sign="+this.token+"&orderColumn="+this.orderColumn+"&direction="+this.direction)
        .then(res=>{
          if(res.data.code==1){
            var data=res.data.data.getReTask;
            var arr=[];
            for(var a of data){
              if(a.modelId!=null||a.modelIds!=null){
                  arr.push({
                  name:a.name,
                  id:a.id,
                  modelId:a.modelIds==null?a.modelId:a.modelIds,
                  type:a.modelIds==null?1:0,
                  status:a.status==1?"已提交":
                                        a.status==2?"正在处理":
                                            a.status==3?"成功":"失败",
                  startTime:new Date(a.startTime).toLocaleString(),
                  endTime:new Date(a.endTime).toLocaleString(),
                  taskType:a.taskType==1?"重处理":""
                })
              }
              
            }
            this.reTask=arr;
          }else{
            this.$notify.error({
              title: '错误',
              message: res.data.msg
            });
            return;
          }
        })
      var timer=setInterval(()=>{
        this.$http.get("/maintenanceService/dateMaintenanceService/getReTask?taskType=1&sign="+this.token)
          .then(res=>{
            if(res.data.code==1){
              var data=res.data.data.getReTask;
              var arr=[];
              if(data==[]){
                clearInterval(timer);
                timer=null;
              }else{
                var qcg=true;
                for(var a of data){
                  if(a.status!=3){
                    qcg=false;
                  }
                  if(a.modelId!=null||a.modelIds!=null){
                      arr.push({
                      name:a.name,
                      id:a.id,
                      modelId:a.modelIds==null?a.modelId:a.modelIds,
                      type:a.modelIds==null?1:0,
                      status:a.status==1?"已提交":
                                            a.status==2?"正在处理":
                                                a.status==3?"成功":"失败",
                      startTime:new Date(a.startTime).toLocaleString(),
                      endTime:new Date(a.endTime).toLocaleString(),
                      taskType:a.taskType==1?"重处理":""
                    })
                  }
                  
                }
                this.reTask=arr;
                if(qcg){
                  clearInterval(timer);
                  timer=null;
                }
              }
              
            }else{
              clearInterval(timer);
              timer=null;
            }
          })
      },10000);
        
      
    },
    delReTask(){
      if(this.dcl.length<=0){
        this.$notify.info({
          title: '消息',
          message: '没有勾选设备!!!'
        });
      }else{
        var arr=[];
        for(var a of this.dcl){
          arr.push(this.reTask[a].id);
        }
        arr=arr.join(',');
        //arr=JSON.stringify(arr);
        this.$http.post("/maintenanceService/dateMaintenanceService/deleteReTaskByParam?sign="+this.token,
          qs.stringify({
            ids:arr
          }))
          .then(res=>{
            if(res.data.code==1){
              this.$notify({
                title: '成功',
                message: '删除成功!',
                type: 'success'
              });
              this.dcl=[];
              this.getReTask();
            }
          })
      }
    },
    getAffe(name,id,startTime,endTime,affname,taskType,type){
      console.log(type);
      if(name=="成功"){
        if(startTime!=undefined){
          this.affStartTime=startTime;
          this.affEndTime=endTime;
          this.affName=affname;
          this.affTaskType=taskType;
          this.affType=type;
        }
        this.isLoading=true;
        this.rwclId=id;
        this.isShowd=true;
        if(this.cllc=="分线"){
          this.isLoading=false;
        }
        if(this.cllc=="母平"){
          this.$http.get("/maintenanceService/dateMaintenanceService/getAffectedBusbarByDate?sign="+this.token+"&mrids="+id+"&date="+this.dayDate+"&dateType="+this.dateType+"&type="+this.affType)
          .then(res=>{
            if(res.data.code==1){
              this.isLoading=false;
              var data=res.data.data.getAffectedBusbarByDate;
              this.mpdata=[];
                for(var a of data){
                  this.mpdata.push({
                    occurTime:new Date(a.occurTime).toLocaleString(),
                    name:a.name,
                    inputValue:a.inputValue,
                    outputValue:a.outputValue,
                    value:a.value,
                    rate:a.rate
                  })
                }
            }else{
              this.isLoading=false;
            }
          })
        }
        if(this.cllc=="统计电量"){
          this.$http.get("/maintenanceService/dateMaintenanceService/getEnergyData?sign="+this.token+"&devIds="+id+"&date="+this.dayDate+"&dateType="+this.dateType+"&type="+this.affType)
          .then(res=>{
            if(res.data.code==1){
              this.isLoading=false;
              var data=res.data.data.getEnergyData;
              this.dldata=[];
                for(var a of data){
                  this.dldata.push({
                    name:a.vlName,
                    mainElecPap:a.mainElecPap,
                    mainElecRap:a.mainElecRap,
                  })
                }
            }else{
              this.isLoading=false;
            }
          })
        }
      }
    }
  },
  watch:{
    value13:function(){
      this.startTime=this.value13[0].toLocaleString();
      this.endTime=this.value13[1].toLocaleString();
    },
    quanxuan:function(){
      this.dcl=[];
      if(this.quanxuan){
        for(var i in this.reTask){
          this.dcl.push(i)
        }
      }
    },
    dcl:function(){
      
    },
    isShowd:function(){
      if(!this.hasisShowd){
        this.$nextTick(() => {
          let scroll = new BScroll(".scroll", {
            scrollbar: { fade: false, interactive: true },
            preventDefault:false,
            mouseWheel: true
          });
        });
        this.hasisShowd=true;
      }
    },
    cllc:function(){
      this.getAffe('成功',this.rwclId);
      if(this.cllc=="分线"&&!this.hasScroll1){
        let scroll1 = new BScroll(".scroll1", {
            scrollbar: { fade: false, interactive: true },
            preventDefault:false,
            mouseWheel: true
          });
          this.hasScroll1=true;
      }
      if(this.cllc=="母平"&&!this.hasScroll2){
        let scroll2 = new BScroll(".scroll2", {
            scrollbar: { fade: false, interactive: true },
            preventDefault:false,
            mouseWheel: true
          });
          this.hasScroll2=true;
      }
    },
    dateType:function(){
      this.getAffe('成功',this.rwclId);
    }
  }
}
// lastAttr树形第一最有一层的属性
</script>

<style lang="css">
.aaa{
  padding-left: 20px;
}
.sjwh{
  padding:10px 20px;
  background: #043434;
  box-sizing: border-box;
  border:1px solid #0d7474;
}
.sjwh .trunk{
  height:700px;
}
.sjwh .sjwh_tree{
  height:690px;
  background: #012828;
  position:relative;
  overflow: hidden;
}
.sjwh .scroll,.sjwh .scroll1,.sjwh .scroll2,.sjwh .scroll3,.sjwh .scroll4{
  overflow:hidden;
  position:relative;
}
.sjwh .clickable{
  color:#f6726c;
  cursor: pointer;
}
.grid-content{
  border:1px solid #0d7474;
  height:690px;
  box-sizing: border-box;
  padding:20px;
}
.sjwh .xuanz{
  border-right:1px solid transparent;
  position:relative;
  left:2px;
  background: rgb(1, 40, 40);
}
.sjwh .isClick{
  color:#f6726c;
  cursor:pointer;
}
.sjwh .readyBg {
    background: #3d3640 !important;
}
.el-tree{
  background: #012828;
  color:#84f1f1;
}
.el-tree> div> div:first-child> .el-tree-node__label:before{
  content:'';
  display:inline-block;
  width: 18px;
  height: 16px;
  vertical-align: bottom;
  background: url("../../../assets/img/areas/area5.gif") no-repeat;
}
.el-tree> div> div:nth-child(2)> div> div:first-child> .el-tree-node__label:before{
  content:'';
  display:inline-block;
  width: 18px;
  height: 16px;
  vertical-align: bottom;
  background: url("../../../assets/img/voltaglevel/Vol7.gif") no-repeat;
}
.el-tree> div> div:nth-child(2)> div> div:nth-child(2)> div> div:first-child> .el-tree-node__label:before{
  content:'';
  display:inline-block;
  width: 18px;
  height: 16px;
  vertical-align: bottom;
  background: url("../../../assets/img/factory/Fac2_Vol5.gif") no-repeat;
}
</style>
