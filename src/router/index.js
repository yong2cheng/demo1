import Vue from 'vue'
import Router from 'vue-router'
//懒加载，有效降低打包单个文件体积，按需加载
import index from './index/index'//首页路由模块
import login from './login/index'//登陆模块
import unkonwn from './noFound/index'//404模块
import sjjh from './sjjh/index'//数据交互路由模块
import sjzd from './sjzd/index'//数据诊断路由模块
import zbgz from './zbgz/index'//指标跟踪模块
import sjfx from './sjfx/index'//数据分析路由模块
import dlywkhd from './ywkwd/index'//运维客户端路由模块
import xtgl from './xtgl/index'//系统管理路由模块

Vue.use(Router)
let router = new Router({
  routes: [
    ...login,
    ...index,
    ...sjfx,
    ...zbgz,
    ...sjzd,
    ...sjjh,
    ...dlywkhd,
    ...unkonwn,
    ...xtgl,
  ]
})
router.beforeEach((to, from, next) => {
  //to即将进入的目标路由对象，from当前导航正要离开的路由， next  :  下一步执行的函数钩子
  if (to.path === '/login') {
    next()
  } // 如果即将进入登录路由，则直接放行
  else { //进入的不是登录路由
    if (to.meta.requiresAuth && !sessionStorage.getItem('accessToken')) {
      next({
        path: '/login'
      })
    }
    //下一跳路由需要登录验证，并且还未登录，则路由定向到  登录路由
    else {
      next()
    }
  } //如果不需要登录验证，或者已经登录成功，则直接放行
})
export default router;
