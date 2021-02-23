import Cookies from 'js-cookie'

export const TOKEN_KEY = 'token'
const cookieExpires = 1
// 存取token
export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, {
    expires: cookieExpires || 1
  })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

export const setStore = (name, content) => {
  if (!name) return false
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

export const getStore = (name) => {
  if (!name) return false
  return window.localStorage.getItem(name)
}

export const removeStore = (name) => {
  if (!name) return false
  window.localStorage.removeItem(name)
}
export const clearStore = () => {
  window.localStorage.clear()
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  let paramObj = {}
  if (url.indexOf('?') > -1) {
    let pa = url.split('?')[1]
    const keyValueArr = pa.indexOf('&') > -1 ? pa.split('&') : [pa]
    keyValueArr.forEach(item => {
      const keyValue = item.split('=')
      paramObj[keyValue[0]] = keyValue[1]
    })
  }
  return paramObj
}

export const typeOf = (obj) => {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}
/**
 * 深拷贝
 * @param data
 * @returns {{}|*}
 */
export const deepCopy = (data) => {
  const t = typeOf(data)
  let o

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]))
    }
  } else if (t === 'object') {
    for (let i in data) {
      o[i] = deepCopy(data[i])
    }
  }
  return o
}

/**
 * 删除对象中的空key
 * @param obj
 */
export const delEmptyKey = (obj) => {
  let temp = {}
  if (Object.keys(obj).length > 0) {
    Object.keys(obj).forEach((key) => {
      if (obj[key]) {
        temp[key] = obj[key]
      }
    })
  }
  return temp
}
/*eslint-disable*/
export const ycyaUtil = {
  isJson: function (obj) {
    return typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
  },
  isJsonStr: function (str) {
    var result = {
      isJson: false
    };
    if (typeof str == 'string') {
      try {
        var obj = JSON.parse(str);
        if (typeof obj == 'object' && obj) {
          result.isJson = true;
          result.data = obj;
        }
      } catch (e) {
        console.log('isJsonStr(error)：' + str + '!!!' + e);
      }
    } else {
      console.log('isJsonStr(error):para is not a string!');
    }
    return result;
  },
  htmlEncode: function (html) {
    var temp = document.createElement("div");
    (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
    var output = temp.innerHTML;
    temp = null;
    return output;
  },
  htmlDecode: function (text) {
    var temp = document.createElement("div");
    temp.innerHTML = text;
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
  },
  checkPrivilegeM: function (privilege, code) { //A1_A2,B1_B2
    var orArray = code.split(",");
    if (orArray == null || orArray.length == 0) return false;
    for (var i = 0; i < orArray.length; i++) {
      var andArray = orArray[i].split("_"),
        count = 0;
      for (var j = 0; j < andArray.length; j++) {
        if (this.checkPrivilege(privilege, andArray[j])) count++;
      }
      if (count == andArray.length) return true;
    }
    return false;
  },
  checkPrivilege: function (privilege, code) {
    if (code < 0 || code > privilege.length * 6) return false;
    var seed = [
      "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
      "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
      "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
      "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
      "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"
    ];
    var idx = Math.floor(code / 6);
    var curr = privilege.charAt(idx);
    var seekIdx = 0;
    for (var j = 0; j < seed.length; j++) {
      if (seed[j] == curr) {
        seekIdx = j;
        break;
      }
    }
    return this.getBit(seekIdx, (code - idx * 6)) == 1;
  },
  getBit: function (value, index) {
    if (this._isInt(value)) {
      return (value & (1 << index)) >> index;
    }
    return false;
  },
  getBitRange: function (value, begin, end) {
    if (this._isInt(value)) {
      var result = 0;
      for (var i = begin; i <= end; i++) {
        result += this.getBit(value, i) << (i - begin);
      }
      return result;
    }
    return false;
  },
  _isInt: function (value) {
    return typeof value === 'number';
  }
}
// 把时间戳转化为时分秒
export const transformTime = (value) => {
  var theTime = parseInt(value);// 秒
  var theTime1 = 0;// 分
  var theTime2 = 0;// 小时
  if (theTime > 60) {
      theTime1 = parseInt(theTime / 60);
      theTime = parseInt(theTime % 60);
      if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60);
          theTime1 = parseInt(theTime1 % 60);
      }
  }
  var result = "" + parseInt(theTime) + "秒";
  if (theTime1 > 0) {
      result = "" + parseInt(theTime1) + "分" + result;
  }
  if (theTime2 > 0) {
      result = "" + parseInt(theTime2) + "小时" + result;
  }
  return result;
}
// 高德经纬度转百度
export const amapTobmap = (gg_lng, gg_lat) => {
  
  var X_PI = Math.PI * 3000.0 / 180.0;
  var x = gg_lng, y = gg_lat;
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
  var bd_lng = z * Math.cos(theta) + 0.0065;
  var bd_lat = z * Math.sin(theta) + 0.006;
  return {
      bd_lat: bd_lat,
      bd_lng: bd_lng
  }
}
// 百度经纬度转高德
export const bmapToamap = (bd_lng, bd_lat) => {
  
  var X_PI = Math.PI * 3000.0 / 180.0;
  var x = bd_lng - 0.0065;
  var y = bd_lat - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
  var gg_lng = z * Math.cos(theta);
  var gg_lat = z * Math.sin(theta);
  return {lng: gg_lng, lat: gg_lat}

}
// 计算两个日期之前的相隔天数
export const getDaysBetween = (dateString1,dateString2) => {
  var  startDate = Date.parse(dateString1);
  var  endDate = Date.parse(dateString2);
  if (startDate>endDate){
      return 0;
  }
  if (startDate==endDate){
      return 1;
  }
  var days=(endDate - startDate)/(1*24*60*60*1000);
  return  days;
}
// 页面权限判断方法
export const getPrivilege = (arr2) => {
  let flag = false
  let arr1 = JSON.parse(getStore('userBean')) ? JSON.parse(getStore('userBean')).powers : []
  arr1.some(val => {
    if (arr2.indexOf(val) > -1) {
      flag = true
      return true
    }
  })
  return flag
}