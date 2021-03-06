import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sendCarData: '', // 派车时车辆的id和当前状态
    carpoolData: [], // 选择可拼车的数据
    fleetData: [], // 选择车队的数据
    selectCar: [], // 派车时派发的车辆数据
    orderSendData: [], // 派车时需要的订单信息
    selectTree: [] // 用车单位树
  },
  mutations: {
    setCarpool (state, payload) {
      state.carpoolData = payload
    },
    setFleet (state, payload) {
      state.fleetData = payload
    },
    setSendCar (state, payload) {
      state.sendCarData = payload
    },
    setSelectCar (state, payload) {
      state.selectCar.push(payload)
    },
    setOrderData (state, payload) {
      state.orderSendData = payload
    },
    setSelectTree (state, payload) {
      state.selectTree = payload
    }
  },
  actions: {
    SET_CARPOOL ({ commit }, payload) {
      commit('setCarpool', payload)
    },
    SET_FLEET ({ commit }, payload) {
      commit('setFleet', payload)
    }
  },
  modules: {
  }
})
