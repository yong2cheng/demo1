// 指标跟踪
const zbgz = () =>
    import('@/components/quota/zbgzIndex');
const zbgzMain = () =>
    import('@/components/quota/childs/mainIndex')
const cjfgl = () =>
    import('@/components/quota/childs/acquisitionCoverage')
const cjcgl = () =>
    import('@/components/quota/childs/acquisitionSuccess')
const mpzb = () =>
    import('@/components/quota/childs/busBalance')
const mpzbDetail = () =>
    import('@/components/quota/childs/busBalance/mpzbDetail');


let zbgzArr = [
    { //指标跟踪
        path: '/zbgz',
        component: zbgz,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'zbgzMain',
                component: zbgzMain,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/cjfgl',
                name: 'cjfgl',
                component: cjfgl,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/cjcgl',
                name: 'cjcgl',
                component: cjcgl,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/mpzb',
                name: 'mpzb',
                component: mpzb,
                meta: {
                    requiresAuth: true
                },
            },
            {
                path: "/mpzb/mpzbDetail",
                component: mpzbDetail,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
]
export default zbgzArr