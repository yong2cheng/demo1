// 数据分析
const sjfx = () =>
  import ('@/components/data-analyse/sjfxIndex');
const sjfxMain = () =>
  import ('@/components/data-analyse/index');
const jjfx = () =>
  import ('@/components/data-analyse/jjfx/jjfx');
const mxphl = () =>
  import ('@/components/data-analyse/mxphl/mxphl');
const mxphlIndex = () =>
  import ('@/components/data-analyse/mxphl/index');
const jumpo = () =>
  import ('@/components/data-analyse/mxphl/jumpo');
const jumpt = () =>
  import ('@/components/data-analyse/mxphl/jumpt');
const mxphpzl = () =>
  import ('@/components/data-analyse/mxphpzl/mxphpzl');
const mxphpzlIndex = () =>
  import ('@/components/data-analyse/mxphpzl/index');
const mxphpzlone = () =>
  import ('@/components/data-analyse/mxphpzl/one');
const mxphpzltwo = () =>
  import ('@/components/data-analyse/mxphpzl/two');
const mxphpzlmxdz = () =>
  import ('@/components/data-analyse/mxphpzl/mxdz');
const emsrelation = () =>
  import ('@/components/data-analyse/mxphpzl/emsRelation');
const sbsh = () =>
  import ('@/components/data-analyse/sbsh/sbsh');
const xtws = () =>
  import ('@/components/data-analyse/xtws/xtws');


let sjfxArr = [{ //数据分析
  path: '/sjfx',
  component: sjfx,
  meta: {
    requiresAuth: true
  },
  children: [{
      path: '',
      component: sjfxMain,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/mxphl',
      component: mxphl,
      meta: {
        requiresAuth: true
      },
      children: [{
          path: '',
          component: mxphlIndex,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/mxphl/jumpo',
          component: jumpo,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: '/mxphl/jumpt',
          component: jumpt,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }, {
      path: '/mxphpzl',
      component: mxphpzl,
      meta: {
        requiresAuth: true
      },
      children: [{
          path: "",
          component: mxphpzlIndex,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/mxphpzl/one",
          component: mxphpzlone,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/mxphpzl/two",
          component: mxphpzltwo,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/mxphpzl/mxdz",
          component: mxphpzlmxdz,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/mxphpzl/emsrelation",
          component: emsrelation,
          meta: {
            requiresAuth: true
          }
        }
      ]
    }, {
      path: '/sbsh',
      component: sbsh,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/xtws',
      component: xtws,
      meta: {
        requiresAuth: true
      }
    }, {
      path: '/jjfx',
      component: jjfx,
      meta: {
        requiresAuth: true
      }
    }
  ]
}]
export default sjfxArr
