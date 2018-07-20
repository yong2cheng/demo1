<template lang="html">
    <div class="main_xtgl"> 
        <div class="menu_manage_count clearfix">
            <div class="menu_manage_left scroll2">
                <el-tree
                :data="menuArrDate"
                default-expand-all
                @node-click="handleNodeClick"
                :props="defaultProps">
                </el-tree>
            </div>
            <div class="menu_manage_right">
                <div class="menu_manage_right_top clearfix">
                   <span>{{checkedNodeData.label}}明细</span> <button @click="adds()" v-if="getParentId==1||getParentId==0">新增</button>
                </div>
                <div class="menu_manage_right_bottom">
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
                        <tbody>
                            <tr>
                                <td>菜单名称</td>
                                <td>{{checkedNodeData.label}}</td>
                            </tr>
                            <tr>
                                <td>菜单编码</td>
                                <td>{{checkedNodeData.code}}</td>
                            </tr>
                            <tr>
                                <td>请求URL</td>
                                <td>{{checkedNodeData.filePath}}</td>
                            </tr>
                            <tr>
                                <td>操作</td>
                                <td>
                                    <button class="btn-small" @click="updates()">编辑</button>
                                    <!-- <button class="btn-small checked" @click="deletes(item)">删除</button> -->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <overlay :close.sync="isShow"><add v-if="isShow" :datas="{updateData:updateData}" @changeSat="getChild"/></overlay>
        <overlay :close.sync="isShow1"><updates v-if="isShow1" :datas="{updateData:updateData}" @changeSat="getChild"/></overlay>
    </div>
</template>
    
<script>
import overlay from '@/components/common/overlay'
import BScroll from 'better-scroll'
import add from './add'
import updates from './updates'
export default {
    data: function() {
        return {
            token:'',
            menuArr:[],
            menuArrDate:[],
            checkedNodeData:'',
            updateData:{},
            getParentId:1,
            isShow:false,
            isShow1:false,
            defaultProps: {
                children: 'children',
                label: 'label'
            },
        }
    },
    components:{
        overlay,
        add,
        updates
    },
    created: function() {
        this.token = sessionStorage.getItem('accessToken');
        this.getMenuList("csh");// 首次进入页面调接口
    },
    mounted: function() {
        this.$nextTick(() => {
            let scroll2 = new BScroll('.scroll2', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true});
        });
    },
    methods: {
            // 查询菜单列表
        getMenuList(type) {
            this.$http.get("/systemManagementService/systemFunctionService/getSystemFunctionTree",{
                params:{
                    sign:this.token,
                }
            }).then((res) => {
                if (res.status == 200) {
                    if(res.data.code == 1) {
                        this.menuArr = res.data.data.systemFunctionTreeNodes;
                        if(this.menuArr&&this.menuArr.length>0) {
                            var data = [];
                            for(var i =0;i<this.menuArr.length;i++) {
                                var obj = {};
                                obj.id=this.menuArr[i].id;
                                obj.label=this.menuArr[i].name;
                                obj.filePath=this.menuArr[i].attributes.filePath
                                obj.parentId=this.menuArr[i].attributes.parentId
                                if(type == "csh") {
                                    this.checkedNodeData = obj
                                }
                                if(this.menuArr[i].children && this.menuArr[i].children.length>0) {
                                    var data1 = [];
                                    for(var j =0;j<this.menuArr[i].children.length;j++) {
                                        var obj1 = {};
                                        obj1.id= this.menuArr[i].children[j].id
                                        obj1.label= this.menuArr[i].children[j].name
                                        obj1.filePath=this.menuArr[i].children[j].attributes.filePath
                                        obj1.code=this.menuArr[i].children[j].attributes.code
                                        obj1.parentId=this.menuArr[i].children[j].parentId
                                        if(this.menuArr[i].children[j].children && this.menuArr[i].children[j].children.length>0) {
                                            var data2 = [];
                                            for(var k =0;k<this.menuArr[i].children[j].children.length;k++) {
                                                var obj2 = {};
                                                obj2.id= this.menuArr[i].children[j].children[k].id
                                                obj2.label= this.menuArr[i].children[j].children[k].name
                                                obj2.filePath=this.menuArr[i].children[j].children[k].attributes.filePath
                                                obj2.code=this.menuArr[i].children[j].children[k].attributes.code
                                                obj2.parentId= this.menuArr[i].children[j].children[k].parentId
                                                data2.push(obj2);
                                            }
                                            obj1.children = data2
                                        }
                                        data1.push(obj1);
                                    }
                                    obj.children = data1
                                }
                                data.push(obj)
                            }
                            this.menuArrDate = data
                        }
                    }
                }
            }).catch(function(error) {
                console.log(error);
            })
        },
        // 新增菜单按钮
        adds() {
            this.isShow = true;
            this.updateData = this.checkedNodeData
        },
        // 编辑菜单按钮
        updates(){
            this.isShow1 = true;
            let obj = {}
            obj.sysfuncName = this.checkedNodeData.label
            obj.sysfuncId = this.checkedNodeData.id
            obj.filePath = this.checkedNodeData.filePath
            obj.sysfuncCode = this.checkedNodeData.code
            obj.parentSysfuncId = this.checkedNodeData.parentId
            this.updateData = obj
        },
        handleNodeClick(data) {
            this.checkedNodeData = data
            this.getParentId = this.checkedNodeData.parentId
            if(this.getParentId == undefined) {
                this.getParentId = 1
            }
        },
        // 得到子组件回调事件
        getChild(data) {
            this.isShow = false;
            this.isShow1 = false;
            this.getMenuList(data);// 新增或编辑成功后重新调接口
            if(data != false) {
                let obj ={}
                obj.label = data.sysfuncName
                obj.code = data.sysfuncCode
                obj.filePath = data.filePath
                this.checkedNodeData = obj
            } 
        }
    }
}
</script>
    
<style lang="css">
    .menu_manage_count {border:1px solid #0d7474;height: 600px;margin: 48px 0;box-sizing: border-box;}
    .menu_manage_left {float: left;width: 390px;height: 100%;border-right :1px solid #0d7474;}
    .menu_manage_right {float: left;width:700px;margin: 100px 20px}
    .menu_manage_right_top {text-align: center;margin-bottom:10px}
    .menu_manage_right_top span {color:#49f5f5;font-size: 20px}
    .menu_manage_right_top button {float: right;}
    .menu_manage_right_bottom {border :1px solid #0d7474;margin-bottom: 50px;}
    .menu_manage_right .checked {background-color: #f6726c}
    .menu_manage_count .el-tree{background: #043434;color:#49f5f5}
    .el-tree-node__content:hover {background-color: #33a5a5; }
    .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {background-color: #1a5c5c;}
    .scroll2 {position:relative;height:100%;overflow:hidden}
</style>
            