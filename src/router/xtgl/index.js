// 系统管理
const xtgl = () =>
    import('@/components/systemManage/index')
const xtglMain = () =>
    import('@/components/systemManage/xtglMain/index')
const cdgl = () =>
    import('@/components/systemManage/menuManage/index')
const jsgl = () =>
    import('@/components/systemManage/roleManage/index')
const yhgl = () =>
    import('@/components/systemManage/userManage/index')
const yhdlrz = () =>
    import('@/components/systemManage/userLogonLog/index')

let zbgzArr = [
    { 
        path: '/xtgl',
        component: xtgl,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'xtglMain',
                component: xtglMain,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/cdgl',
                name: 'cdgl',
                component: cdgl,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/jsgl',
                name: 'jsgl',
                component: jsgl,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/yhgl',
                name: 'yhgl',
                component: yhgl,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/yhdlrz',
                name: 'yhdlrz',
                component: yhdlrz,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
]
export default zbgzArr