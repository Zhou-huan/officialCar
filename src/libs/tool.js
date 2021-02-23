export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj, key) => {
  if (key) return key in obj
  else {
    let keysArr = Object.keys(obj)
    return keysArr.length
  }
}

/**
 * @returns {String} 当前浏览器名称
 */
export const getExplorer = () => {
  const ua = window.navigator.userAgent
  const isExplorer = (exp) => {
    return ua.indexOf(exp) > -1
  }
  if (isExplorer('MSIE')) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
}

export const getAppName = () => {
  const an = window.navigator.appVersion
  let isAndroid = an.indexOf('Android') > -1 || an.indexOf('Linux') > -1 // g
  let isIOS = !!an.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  let name
  if (isAndroid) {
    name = 'android'
  } else if (isIOS) {
    name = 'ios'
  }
  return name
}

/**
 * 获取月份含有多少天
 * @param vDate
 * @returns {number}
 */
export const getDaysOfMonth = (vDate) => {
  vDate = new Date(vDate) || new Date()
  let d = new Date(vDate.getFullYear(), vDate.getMonth() + 1, 0)
  return d.getDate()
}

/**
 * 去掉日期的格式
 * @param date 时间
 * @param split 分隔符
 * @returns {string}
 */
export const removeDateFormat = (date, split) => {
  split = split || '-'
  let str = ''
  date.split(split).forEach((item) => {
    str += item
  })
  return str
}
