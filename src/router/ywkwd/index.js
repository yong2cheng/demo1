// 运维客户端
const dlywkhd = () =>
    import('@/components/data-eleops/ywIndex');//电量运维客户端首页路由容器
const ywMain = () =>
    import('@/components/data-eleops/index/mainIndex');//首页
const ywIndex = () =>
    import('@/components/data-eleops/yw/ywIndex');//运维
const mxwh = () =>
    import('@/components/data-eleops/mxwh/mxwhIndex');//模型维护首页
const rcwh = () =>
    import('@/components/data-eleops/rcwh/rcwhIndex');//日常维护
const sjzl = () =>
    import('@/components/data-eleops/sjzl/sjzlIndex');//数据诊断
const sjtj = () =>
    import('@/components/data-eleops/sjtj/sjtjIndex');//事件提交
const sjss = () =>
    import('@/components/data-eleops/sjss/sjssIndex');//数据上送
const sjwh = () =>
    import('@/components/data-eleops/sjwh/sjwhIndex');//数据维护
const ems = () =>
    import('@/components/data-eleops/mxwh/parts/ems');//模型维护=》ems关联
const daoru = () =>
    import('@/components/data-eleops/mxwh/parts/daoru');//模型维护=》导入
const yxdady = () =>
    import('@/components/data-interactive/childs/yxdady/yxdady')//模型维护=》营销用户    
const ctpt = () =>
    import('@/components/data-eleops/sjtj/parts/ctpt');//事件提交=》换ctpt列表页
const meters = () =>
    import('@/components/data-eleops/sjtj/parts/meters');//事件提交=》换电表列表页
const status = () =>
    import('@/components/data-eleops/sjtj/parts/checkStatus');//事件提交=》查看状态页面
const addctpt = () =>
    import('@/components/data-eleops/sjtj/parts/addCt');//事件提交=》新增ctpt
const addmeters = () =>
    import('@/components/data-eleops/sjtj/parts/addMeters');//事件提交=》新增电表
const zbdl = () =>
    import('@/components/data-eleops/zbdl/zbdlIndex');//增补电量
const refrom = () =>
    import('@/components/data-eleops/mxwh/refrom');//增补电量

let ywkhd = [
    { //电量运维客户端
        path: '/dlywkhd',
        component: dlywkhd,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'ywMain',
                component: ywMain,
                meta: {
                    requiresAuth: true
                }
            },{
                path:'yw',
                name:'yw',
                component:ywIndex,
                meta: {
                    requiresAuth: true
                }
            }, {
                path: 'mxwh',
                name: 'mxwh',
                component: mxwh,
                meta: {
                    requiresAuth: true
                }
            }, {
                path: 'mxwh/yxyh',
                name: 'yxyh',
                component: yxdady,
                meta: {
                    requiresAuth: true
                }
            }, {
                path: 'mxwh/refrom',
                name: 'refrom',
                component: refrom,
                meta: {
                    requiresAuth: true
                }
            },{
                path: 'mxwh/ems',
                name: 'ems',
                component: ems,
                meta: {
                    requiresAuth: true
                }
            },{
                path: 'mxwh/daoru',
                name: 'daoru',
                component: daoru,
                meta: {
                    requiresAuth: true
                }
            }, {
                path: 'rcwh',
                name: 'rcwh',
                component: rcwh,
                meta: {
                    requiresAuth: true
                }
            }, {
                path: 'sjzl',
                name: 'sjzl',
                component: sjzl,
                meta: {
                    requiresAuth: true
                }
            }, {
                path: 'sjtj/ctpt',
                name: 'ctpt',
                component: ctpt,
                meta: {
                    requiresAuth: true
                }
            }, {
                path: 'sjtj/meters',
                name: 'meters',
                component: meters,
                meta: {
                    requiresAuth: true
                }
            }, {
                path: 'sjtj/status',
                name: 'status',
                component: status,
                meta: {
                    requiresAuth: true
                }
            }, {
                path: 'sjtj/addctpt',
                name: 'addctpt',
                component: addctpt,
                meta: {
                    requiresAuth: true
                }
            }, {
                path: 'sjtj/addmeters',
                name: 'addmeters',
                component: addmeters,
                meta: {
                    requiresAuth: true
                }
            }, {
                path: 'sjtj',
                name: 'sjtj',
                component: sjtj,
                meta: {
                    requiresAuth: true
                }
            }, {
                path: 'sjss',
                name: 'sjss',
                component: sjss,
                meta: {
                    requiresAuth: true
                }
            }, {
                path: 'sjwh',
                name: 'sjwh',
                component: sjwh,
                meta: {
                    requiresAuth: true
                }
            }, {
                path: 'zbdl',
                name: 'zbdl',
                component: zbdl,
                meta: {
                    requiresAuth: true
                }
            }]
    }
]
export default ywkhd