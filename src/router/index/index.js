const index = () =>
    import('@/components/index/index');

let indexArr=[
    {
        path: '/',//首页模块
        name: 'index',
        component: index,
        meta: {
          requiresAuth: true
        }
      }
]
export default indexArr