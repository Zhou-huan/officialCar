// 自定义指令-点击非当前元素
import Vue from 'vue'
Vue.directive('clickoutside', {
  // 每当指令绑定到元素身上的时候,会立即执行这个bind函数,只执行一次
  bind (el, binding, vnode) {
    // 元素刚绑定了指令的时候,还没插入dom中,直接操作元素没用
    function handler (e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) return false
      // 判断指令中是否绑定了函数
      if (binding.expression) { // expression，绑定值的字符串形式，如value中值即为"1+1";value，指令的绑定值。如v-focus="1+1"，value即为2。
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e)
      }
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = handler
    document.addEventListener('click', handler)
  },
  unbind (el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__)
    delete el.__vueClickOutside__
  }
})
