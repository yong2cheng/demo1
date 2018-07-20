// 数据交互
const sjjh = () =>
    import('@/components/data-interactive/sjjhIndex');
const sjjhMain = () =>
    import('@/components/data-interactive/childs/index')
const sjcx = () =>
    import('@/components/data-interactive/childs/sjcx/sjcx')
const yxdady = () =>
    import('@/components/data-interactive/childs/yxdady/yxdady')
const qscx = () =>
    import('@/components/data-interactive/childs/qscx/qscx');
    const sjss = () =>
    import('@/components/data-eleops/sjss/sjssIndex');//数据上送
let sjjhArr = [
    { //数据交互
        path: '/sjjh',
        component: sjjh,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'sjcx',
                component: sjcx,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/sjcx',
                name: 'sjcx',
                component: sjcx,
                meta: {
                    requiresAuth: true
                }
            }, {
                path: '/yxdady',
                name: 'yxdady',
                component: yxdady,
                meta: {
                    requiresAuth: true
                }
            }, {
                path: '/qscx',
                name: 'qscx',
                component: qscx,
                meta: {
                    requiresAuth: true
                }
            }, {
                path: '/sjss',
                name: 'sjss',
                component: sjss,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    },
]
export default sjjhArr