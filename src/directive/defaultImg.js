// 自定义指令-图片加载失败默认加载
import Vue from 'vue'
/**
 * 检测图片是否存在
 * @param url
 */
let imageIsExist = function (url) {
  return new Promise((resolve) => {
    var img = new Image()
    img.onload = function () {
      if (this.complete === true) {
        resolve(true)
        img = null
      }
    }
    img.onerror = function () {
      resolve(false)
      img = null
    }
    img.src = url
  })
}
// 我们可能想在bind和update钩子函数上做重复动作，并不关心其他钩子函数
Vue.directive('real-img', async function (el, binding) {
  let imgURL = binding.value// 获取图片地址
  if (imgURL) {
    let exist = await imageIsExist(imgURL)
    el.setAttribute('src', !exist ? require('@/assets/images/Image_failed.png') : imgURL)
    // if (exist) el.setAttribute('src', imgURL)
  }
})
