/** 常量文件 */
import { fetch } from './fetch'
export const mapKey = '78e72d25e9e1beb6de870fafe19764e2'
export const requestUrl = 'http://192.168.0.56:8080/carmon/'
let viewUrl = process.env.VUE_APP_URL.split('/')
export const appViewUrl = viewUrl[0] + '//' + viewUrl[2] + '/'
// 权限码
// 用车首页权限 160（申请）,161（订单）,171（费用）,164（评价）
export const useCarIndexCode = [160, 161, 171, 164]
export const examineIndexCode = [165, 166]
export const sendCarIndexCode = [172, 173, 175, 176, 169]
// 用车：160（申请）,161（订单）,171（费用）,164（评价），操作权限：25（申请、修改、重新申请、评价）
// 审批：165、166，操作权限：193、194、195、196（有任意一个都可以审批/驳回）
// 派车：172、173、175、176、169（其中进入调度派车列表需要权限172、173，我的派车列表：175、176，归队等级：169），操作权限：100（调度），101（派车），102（归队）

// 登录
export const login = (data, callback) => fetch('user/loginr_app', {
  callback,
  reqBody: data
})
// 申请车辆预加载数据
export const preList = (data, callback) => fetch('applet/replace_app', {
  callback,
  reqBody: data
})
// 申请用车(包括紧急用车)增加地址选择（小地址搜索大地址）
export const getSearchPlace = (data, callback) => fetch('applet/queryAddress', {
  callback,
  reqBody: data
})
// 获取费用详情数据
export const getCostById = (data, callback) => fetch('applet/moneyDetailData', {
  callback,
  reqBody: data
})
// 申请订单(包括紧急用车申请)费用确认
export const checkApply = (data, callback) => fetch('applet/checkApply', {
  callback,
  reqBody: data
})
// 获取指点审核人的任务号
export const getTask = (data, callback) => fetch('applet/getObjectInfo', {
  callback,
  reqBody: data
})
// 用车首页
export const useIndex = (data, callback) => fetch('applet/homeData', {
  callback,
  reqBody: data
})
// 添加用车申请
export const addAppaly = (data, callback) => fetch('applet/addapply_app', {
  callback,
  reqBody: data
})
// 添加紧急用车申请
export const addUrgeAppaly = (data, callback) => fetch('applet/addapply_yj', {
  callback,
  reqBody: data
})
// 紧急用车时获取部门树
export const getDeptTree = (data, callback) => fetch('applet/queryDept', {
  callback,
  reqBody: data
})
// 紧急用车时根据部门id获取申请人 参数：userName申请人姓名、requestDept单位id
export const getApplayUsers = (data, callback) => fetch('applet/getUserInfo', {
  callback,
  reqBody: data
})
// 紧急用车时根据部门id获取审核人 请求参数:deptId ：部门id
export const getAuditor = (data, callback) => fetch('applet/getAuditUser', {
  callback,
  reqBody: data
})
// 获取用车区域
export const getArea = (data, callback) => fetch('applet/getQyInfo', {
  callback,
  reqBody: data
})
// 修改密码和手机号
export const changePhonePwd = (data, callback) => fetch('applet/check', {
  callback,
  reqBody: data
})
// 消息中心 applet/getMsgInfo
export const messageCenter = (data, callback) => fetch('applet/getMsgInfo', {
  callback,
  reqBody: data
})

// 用车列表
export const useCarList = (data, callback) => fetch('applet/orderpage_app', {
  callback,
  reqBody: data
})
// 确认费用
export const carBack = (data, callback) => fetch('applet/islook', {
  callback,
  reqBody: data
})
// 审核首页
export const getExamine = (data, callback) => fetch('applet/auditHomeData', {
  callback,
  reqBody: data
})
// 用车详情
export const getApplyInfoById = (data, callback) => fetch('applet/getApplyInfoById', {
  callback,
  reqBody: data
})
// 取消订单、调度
export const cancelApply = (data, callback) => fetch('applet/cancelApply', {
  callback,
  reqBody: data
})
// 确认
export const affirmInfo = (data, callback) => fetch('applet/affirmInfo', {
  callback,
  reqBody: data
})
// 审批列表
export const auditList = (data, callback) => fetch('applet/auditList', {
  callback,
  reqBody: data
})
// 审批通过
export const auditPass = (data, callback) => fetch('applet/auditPass', {
  callback,
  reqBody: data
})
// 审批驳回
export const auditRebut = (data, callback) => fetch('applet/auditRebut', {
  callback,
  reqBody: data
})
// 派车首页
export const sendCarIndex = (data, callback) => fetch('applet/dispatcherHomeData', {
  callback,
  reqBody: data
})
// 调度列表
export const dispatcherList = (data, callback) => fetch('applet/dispatcherList ', {
  callback,
  reqBody: data
})
// 派车列表
export const convoyList = (data, callback) => fetch('applet/convoyList', {
  callback,
  reqBody: data
})
// 驾驶首页
export const getDriveIndex = (data, callback) => fetch('applet/driverHomeData', {
  callback,
  reqBody: data
})
// 添加、修改评价
export const addEvaluate = (data, callback) => fetch('applet/addComment', {
  callback,
  reqBody: data
})
// 可拼车列表
export const getMatchingApplyInfo = (data, callback) => fetch('applet/getMatchingApplyInfo', {
  callback,
  reqBody: data
})
// 车队列表
export const getConvoyInfo = (data, callback) => fetch('applet/getConvoyInfo', {
  callback,
  reqBody: data
})
// 调度确认
export const dispatcherApply = (data, callback) => fetch('applet/dispatcherApply', {
  callback,
  reqBody: data
})
// 归队登记列表
export const getBackCarList = (data, callback) => fetch('applet/rejoinList', {
  callback,
  reqBody: data
})
// 任务列表
export const getTaskList = (data, callback) => fetch('applet/driverApplyList', {
  callback,
  reqBody: data
})
// 订单归队接口
export const getAddBackCar = (data, callback) => fetch('applet/rejoinSuccess', {
  callback,
  reqBody: data
})
// 获取gps里程接口
export const getCPSDistance = (data, callback) => fetch('applet/rejoinGPS', {
  callback,
  reqBody: data
})
// 获取拼单人详细信息
export const getMatchedApplyInfo = (data, callback) => fetch('applet/getMatchedApplyInfo', {
  callback,
  reqBody: data
})
// 获取车辆数据
export const getSendCarPage = (data, callback) => fetch('applet/sendCarPage', {
  callback,
  reqBody: data
})
// 获取驾驶员数据
export const getSendDriverPage = (data, callback) => fetch('applet/sendDriverPage', {
  callback,
  reqBody: data
})
// 提交派车信息
export const sendApply = (data, callback) => fetch('applet/sendApply', {
  callback,
  reqBody: data
})
// 驾驶员回车 applet/driverBackCar
export const driverBackCar = (data, callback) => fetch('applet/driverBackCar', {
  callback,
  reqBody: data
})
// 获取重定向地址 applet/oauth2wx
export const getUrl = (data, callback) => fetch('applet/oauth2wx', {
  callback,
  reqBody: data
})
// 获取token
export const getToken = (data, callback) => fetch('applet/getAccessToken', {
  callback,
  reqBody: data
})
// 获取电话号码
export const phoneLogin = (data, callback) => fetch('applet/appletLoginr', {
  callback,
  reqBody: data
})
