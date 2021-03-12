import Vue from 'vue'
// 节流函数
Vue.directive('throttling', {
  // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  inserted (el, binding) {
    let { func, param } = binding.value
    el.addEventListener('input', () => {
      const nowTime = new Date().getTime()
      if (!el.preTime || nowTime - el.preTime > 200) {
        el.preTime = nowTime
        func.call(this, param)
      }
    })
  }
})
