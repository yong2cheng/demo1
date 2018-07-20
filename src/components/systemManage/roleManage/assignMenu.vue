<template lang="html">
<!-- 点击新增弹框 -->
    <div class="overlay_tc1"> 
        <div class="count_top_tc1">
            <div class="count_tc_title">分配菜单</div>
            <div class="count_tc_count clearfix">
                    <el-tree
                    class="scroll1 role_scroll1"
                    :data="datas.menuArrDate"
                    show-checkbox
                    default-expand-all
                    :default-checked-keys="haveMenuArr"
                    node-key="id"
                    ref="tree"
                    highlight-current
                    :check-strictly=true
                    :props="defaultProps">
                  </el-tree>
            </div>
            <el-form>
                <el-form-item class="fpjs_btn">
                        <el-button type="primary" @click="submitForm();" >保存</el-button>
                        <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                </el-form-item>
            </el-form>
        </div>
    </div>
        
    </template>
    
    <script>
        import BScroll from 'better-scroll'
        export default {
            data: function() {
                return {
                    token:'',
                    haveMenuArr:[],
                    checkData:'',
                    defaultProps: {
                        children: 'children',
                        label: 'label'
                    },
                }
            },
            props:['datas'],
            watch: {
                datas:{
                    handler(news) {
                        console.log(this.datas.haveMenuArr)
                       this.haveMenuArr = this.datas.haveMenuArr;
                       this.checkData = this.datas.checkData;
                       if(this.haveMenuArr&&this.haveMenuArr.length>0) {
                            this.$refs.tree.setCheckedKeys(this.haveMenuArr);
                       }
                    },
                    deep:true
                    }
            },
            components:{
            },
            created: function() {
                this.token = sessionStorage.getItem('accessToken');
            },
            mounted: function() {
                this.$nextTick(() => {
                    let scroll1 = new BScroll('.scroll1', {scrollbar:{fade: false,interactive: true} ,mouseWheel: true});
			    });
            },
            methods: {
                // 提交用户信息按钮
                submitForm() {
                    var datas = Object.assign([],this.$refs.tree.getCheckedKeys());
                    if(datas&&datas.length>0) {
                        let data = [];
                        for(var i=0;i<datas.length;i++) {
                            if(this.$refs.tree.getNode(datas[i]).parent.key != undefined) {
                                data.push(this.$refs.tree.getNode(datas[i]).parent.key)
                            }
                        }
                        let resultarr = [...new Set(data)]
                        datas = datas.concat(resultarr)
                    }


                    var index = datas.indexOf("1")
                    if(index < 0){
                        datas.push("1");
                    }
                    datas =  [...new Set(datas)];
                    this.$http.get("/systemManagementService/roleSystemFunctionService/roleDistributionSystemFunction",{
                        params:{
                            sign:this.token,
                            roleId:this.checkData.roleId,
                            systemFunctionIds:datas
                        }
                    }).then((res) => {
                        if (res.status == 200) {
                            if(res.data.code == 1) {
                                this.changeSatus()
                            }
                        }
                    }).catch(function(error) {
                        console.log(error);
                    })
                },
                // 还原信息
                resetForm(formName) {
                },
                // 保存成功后自定义函数
                changeSatus() {
                    this.$emit('changeSat', false)//触发自定义事件
                }
            }
        }
    </script>
        
    <style lang="css">
        .count_tc_count {width:500px;margin: 0 auto}
        .fpjs_btn {text-align: center;margin-top: 20px;}
        .fpjs_btn button {margin: 0 20px} 
        .count_tc_count .el-tree{background: #043434;color:#49f5f5}
        .el-tree-node__content:hover {background-color: #33a5a5; }
        .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {background-color: #1a5c5c;}
        .role_scroll1 {
           position:relative;height:450px;overflow:hidden
        }
    </style>
            