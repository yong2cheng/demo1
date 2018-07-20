//数据诊断
const sjzdMain = () =>
    import('@/components/sjzd/mainIndex');
const sjzd = () =>
    import('@/components/sjzd/index/sjzdIndex');
const znyp = () =>
    import('@/components/sjzd/znyp/znypIndex');
const dlyc = () =>
    import('@/components/sjzd/dlyc/dlycIndex');
const dlxf = () =>
    import('@/components/sjzd/dlyc/dlxfIndex');
const sjbj = () =>
    import('@/components/sjzd/sjbj/sjbjIndex');
const phyc = () =>
    import('@/components/sjzd/phyc/phycIndex');
const mpxf = () =>
    import('@/components/sjzd/phyc/mpxfIndex');
const cjyc = () =>
    import('@/components/sjzd/cjyc/cjycIndex');
const flhz = () =>
    import('@/components/sjzd/flhz/classsifiedIndex');

let sjzdArr = [
    {//数据诊断
        path: '/sjzd',
        component: sjzdMain,
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'sjzd',
                component: sjzd,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/znyp',
                name: 'znyp',
                component: znyp,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/dlyc',
                name: 'dlyc',
                component: dlyc,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/dlxf',
                name: 'dlxf',
                component: dlxf,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/sjbj',
                name: 'sjbj',
                component: sjbj,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/phyc',
                name: 'phyc',
                component: phyc,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "/mpxf",
                name: "mpxf",
                component: mpxf,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "/flhz",
                name: "flhz",
                component: flhz,
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: '/cjyc',
                name: 'cjyc',
                component: cjyc,
                meta: {
                    requiresAuth: true
                }
            }
        ]
    }
] 
export default sjzdArr