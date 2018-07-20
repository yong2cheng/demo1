let menuList = [
  {
    filePath: '/zbgz',
    sysfuncName: "指标跟踪",
    sysfuncId: 1,
    children: [
      {
        filePath: '/cjfgl',
        sysfuncName: '采集覆盖率',
        sysfuncId: 1,
        parentSysfuncId: 1,
      }, {
        filePath: '/cjcgl',
        sysfuncName: '采集成功率',
        sysfuncId: 2,
        parentSysfuncId: 1,
      }, {
        filePath: '/mpzb',
        sysfuncName: '母平指标',
        sysfuncId: 3,
        parentSysfuncId: 1,
      }
    ]
  },
  {
    filePath: '/sjfx',
    sysfuncName: '数据分析',
    sysfuncId: 2,
    children: [
      {
        filePath: '/mxphl',
        sysfuncName: '母线平衡率',
        sysfuncId: 1,
        parentSysfuncId: 2,
      }, {
        filePath: '/mxphpzl',
        sysfuncName: '母线平衡配置率',
        sysfuncId: 2,
        parentSysfuncId: 2,
      }, {
        filePath: '/sbsh',
        sysfuncName: '设备损耗',
        sysfuncId: 13,
        parentSysfuncId: 2,
      }, {
        filePath: '/xtws',
        sysfuncName: '系统损耗',
        sysfuncId: 134,
        parentSysfuncId: 2,
      },
      // {
      //   filePath: '/jjfx',
      //   sysfuncName: '经济分析',
      //   sysfuncId: 15,
      //   parentSysfuncId: 2,
      // }
    ]
  },
  {
    filePath: '/sjjh',
    sysfuncName: '数据交互',
    sysfuncId: 3,
    children: [
      {
        filePath: '/sjcx',
        sysfuncName: '数据查询',
        sysfuncId: 11,
        parentSysfuncId: 3,
      }, {
        filePath: '/yxdady',
        sysfuncName: '营销档案对应',
        sysfuncId: 12,
        parentSysfuncId: 3,
      }, {
        filePath: '/qscx',
        sysfuncName: '缺数查询',
        sysfuncId: 188,
        parentSysfuncId: 3,
      }
    ]
  },

  {
    filePath: '/sjzd',
    sysfuncName: '数据诊断',
    sysfuncId: 5,
    children: [
      {
        filePath: '/znyp',
        sysfuncName: '智能研判',
        sysfuncId: 60,
        parentSysfuncId: 5,
      }, {
        filePath: '/dlyc',
        sysfuncName: '电量异常',
        sysfuncId: 61,
        parentSysfuncId: 5,
      }, {
        filePath: '/phyc',
        sysfuncName: '平衡异常',
        sysfuncId: 62,
        parentSysfuncId: 5,
      }, {
        filePath: '/cjyc',
        sysfuncName: '采集异常',
        sysfuncId: 63,
        id: 5,
      }
    ]
  },
  {
    filePath: '/dlywkhd',
    sysfuncName: '电量运维客户端',
    sysfuncId: 4,
    children: [
      {
        filePath: '/mxwh',
        sysfuncName: '模型维护',
        sysfuncId: 19,
        parentSysfuncId: 4,
      }, {
        filePath: '/sjzl',
        sysfuncName: '数据治理',
        sysfuncId: 13,
        parentSysfuncId: 4,
      }, {
        filePath: '/sjtj',
        sysfuncName: '事件提交',
        sysfuncId: 90,
        parentSysfuncId: 4,
      }, {
        filePath: '/sjss',
        sysfuncName: '数据上送',
        sysfuncId: 17,
        parentSysfuncId: 4,
      }, {
        filePath: '/zbdl',
        sysfuncName: '增补电量',
        sysfuncId: 94,
        parentSysfuncId: 4,
      }, {
        filePath: '/rcwh',
        sysfuncName: '日常维护',
        sysfuncId: 92,
        parentSysfuncId: 4,
      }, 
      // {
      //   filePath: '/sjwh',
      //   sysfuncName: '数据维护',
      //   sysfuncId: 90,
      //   parentSysfuncId: 4,
      // }
    ]
  },
  {
    filePath: '/xtgl',
    sysfuncName: "系统管理",
    sysfuncId: 6,
    children: [
      {
        filePath: '/yhgl',
        sysfuncName: '用户管理',
        sysfuncId: 1,
        parentSysfuncId: 6,
      },
      {
        filePath: '/jsgl',
        sysfuncName: '角色管理',
        sysfuncId: 2,
        parentSysfuncId: 6,
      },
      {
        filePath:'/cdgl',
        sysfuncName:'菜单管理',
        sysfuncId:3,
        parentSysfuncId:6,
      },
    ]
  },

]
export default menuList;
