import Vue from 'vue'
import VueRouter from 'vue-router'
import { getStore, getPrivilege } from '@/libs/util'
import { useCarIndexCode, examineIndexCode, sendCarIndexCode } from '@/libs/const'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main-page',
    component: () => import('@/components/main-page.vue').then(m => m.default),
    redirect: '/firstPage',
    children: [
      {
        path: '/index',
        name: 'Index', // 首页
        meta: {
          auth: 'useCar',
          isActive: 0
        },
        component: () => import('@/views/index/Index.vue').then(m => m.default)
      },
      {
        path: '/examine',
        name: 'Examine', // 审批
        meta: {
          auth: 'examine',
          isActive: 1
        },
        component: () => import('@/views/examine/Examine.vue').then(m => m.default)
      },
      {
        path: '/sendCar',
        name: 'SendCar', // 派车
        meta: {
          auth: 'sendCar',
          isActive: 2
        },
        component: () => import('@/views/send/SendCar.vue').then(m => m.default)
      },
      {
        path: '/driveCar',
        name: 'DriveCar', // 驾驶
        meta: {
          auth: 'Driver',
          isActive: 3
        },
        component: () => import('@/views/drive/DriveCar.vue').then(m => m.default)
      }
    ]
  },
  // 用车
  {
    path: '/applay', // 用车申请
    name: 'Applay',
    meta: {
      auth: 'useCar'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/index/applay/Applay.vue').then(m => m.default)
  },
  {
    path: '/urgeApplay', // 紧急用车申请
    name: 'UrgeApplay',
    meta: {
      auth: 'useCar'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/index/applay/UrgeApplay.vue').then(m => m.default)
  },
  {
    path: '/useCarList', // 用车列表
    name: 'UseCarList',
    meta: {
      auth: 'useCar'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/index/useCarList/UseCarList.vue').then(m => m.default)
  },
  {
    path: '/useCarDetail', // 用车详情
    name: 'UseCarDetail',
    meta: {
      auth: 'useCar'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/index/useCarList/UseCarDetail.vue').then(m => m.default)
  },
  {
    path: '/costList', // 我的费用列表
    name: 'CostList',
    meta: {
      auth: 'useCar'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/index/ourCost/CostList.vue').then(m => m.default)
  },
  {
    path: '/costDetail', // 我的费用详情
    name: 'CostDetail',
    meta: {
      auth: 'useCar'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/index/ourCost/CostDetail.vue').then(m => m.default)
  },
  {
    path: '/evaluateList', // 我的评价列表
    name: 'EvaluateList',
    meta: {
      auth: 'useCar'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/index/evaluate/EvaluateList.vue').then(m => m.default)
  },
  {
    path: '/evaluateDetail', // 我的评价详情
    name: 'EvaluateDetail',
    meta: {
      auth: 'useCar'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/index/evaluate/EvaluateDetail.vue').then(m => m.default)
  },
  {
    path: '/map', // 地图
    name: 'Map',
    meta: {
      auth: 'useCar'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/index/map/Map.vue').then(m => m.default)
  },
  // 派车
  {
    path: '/rejoinList', // 归队列表
    name: 'RejoinList',
    meta: {
      auth: 'sendCar'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/send/rejoin/RejoinList.vue').then(m => m.default)
  },
  {
    path: '/rejoinListDetail', // 归队列表详情
    name: 'RejoinListDetail',
    meta: {
      auth: 'sendCar'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/send/rejoin/RejoinListDetail.vue').then(m => m.default)
  },
  {
    path: '/dispatchList', // 调度列表
    name: 'DispatchList',
    meta: {
      auth: 'sendCar'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/send/dispatch/DispatchList.vue').then(m => m.default)
  },
  {
    path: '/dispatchDetail', // 调度列表详情
    name: 'DispatchDetail',
    meta: {
      auth: 'sendCar'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/send/dispatch/DispatchDetail.vue').then(m => m.default)
  },
  {
    path: '/chooseCarpool',
    name: 'chooseCarpool',
    meta: {
      auth: 'sendCar'
    },
    component: () => import('../views/send/dispatch/chooseCarpool.vue').then(m => m.default)
  },
  {
    path: '/chooseFleet',
    name: 'chooseFleet',
    meta: {
      auth: 'sendCar'
    },
    component: () => import('../views/send/dispatch/chooseFleet.vue').then(m => m.default)
  },
  {
    path: '/sendCarList', // 派车列表
    name: 'SendCarList',
    meta: {
      auth: 'sendCar'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/send/sendCar/SendCarList.vue').then(m => m.default)
  },
  {
    path: '/sendCarDetail', // 派车列表详情
    name: 'SendCarDetail',
    meta: {
      auth: 'sendCar'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/send/sendCar/SendCarDetail.vue').then(m => m.default)
  },
  {
    path: '/changeIndex', // 派车列表详情-》选择车辆派车
    name: 'ChangeIndex',
    meta: {
      auth: 'sendCar'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/send/sendCar/ChangeIndex.vue').then(m => m.default)
  },
  {
    path: '/changeCar', // 派车列表详情-》选择车辆派车
    name: 'ChangeCar',
    meta: {
      auth: 'sendCar'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/send/sendCar/ChangeCar.vue').then(m => m.default)
  },
  {
    path: '/changeDriver', // 派车列表详情-》选择车辆派车-》选择驾驶员
    name: 'ChangeDriver',
    meta: {
      auth: 'sendCar'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/send/sendCar/ChangeDriver.vue').then(m => m.default)
  },
  // 审批
  {
    path: '/carExamineList', // 用车审核列表
    name: 'CarExamineList',
    meta: {
      auth: 'examine'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/examine/useCarExamine/CarExamineList.vue').then(m => m.default)
  },
  {
    path: '/examineDetail', // 用车审核列表详情
    name: 'ExamineDetail',
    meta: {
      auth: 'examine'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/examine/useCarExamine/ExamineDetail.vue').then(m => m.default)
  },
  // 驾驶
  {
    path: '/taskList', // 任务列表
    name: 'TaskList',
    meta: {
      auth: 'Driver'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/drive/task/TaskList.vue').then(m => m.default)
  },
  {
    path: '/taskDetail', // 任务列表详情
    name: 'TaskDetail',
    meta: {
      auth: 'Driver'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/drive/task/TaskDetail.vue').then(m => m.default)
  },
  // 个人中心部分
  {
    path: '/changePwd',
    name: 'ChangePwd',
    meta: {
      auth: 'other'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/person/ChangePwd.vue').then(m => m.default)
  },
  {
    path: '/changePhone',
    name: 'ChangePhone',
    meta: {
      auth: 'other'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/person/ChangePhone.vue').then(m => m.default)
  },
  {
    path: '/message',
    name: 'Message',
    meta: {
      auth: 'other'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/person/Message.vue').then(m => m.default)
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      auth: 'other'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/login/Login.vue').then(m => m.default)
  },
  {
    path: '/firstPage',
    name: 'FirstPage',
    meta: {
      auth: 'other'
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/login/FirstPage.vue').then(m => m.default)
  }
]

const router = new VueRouter({
  // mode: 'hash',
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
router.beforeEach(function (to, from, next) {
  if (to.path === '/chooseCarpool' || to.path === '/chooseFleet') {
    document.getElementsByTagName('body')[0].setAttribute('style', 'background:#FAFAFA')
  }
  // 设置驾驶员权限
  let userBean = JSON.parse(getStore('userBean')) ? JSON.parse(getStore('userBean')) : ''
  if (to.meta.auth === 'other') {
    next()
  }
  // 超级管理员页面权限
  if (userBean.user_type === 1) {
    next()
  } else {
    // 驾驶员页面权限
    if ((userBean.is_type === 1) && (to.meta.auth === 'Driver' || to.meta.auth === 'other')) {
      next()
      // 用车页面权限
    } else if (getPrivilege(useCarIndexCode) && (to.meta.auth === 'useCar' || to.meta.auth === 'other')) {
      next()
      // 审批页面权限
    } else if (getPrivilege(examineIndexCode) && (to.meta.auth === 'examine' || to.meta.auth === 'other')) {
      next()
      // 派车页面权限
    } else if (getPrivilege(sendCarIndexCode) && (to.meta.auth === 'sendCar' || to.meta.auth === 'other')) {
      next()
    }
  }
})
export default router
