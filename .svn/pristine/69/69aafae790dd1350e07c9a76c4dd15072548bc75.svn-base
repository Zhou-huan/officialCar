import store from '@/store'
let appName = getAppName()
/* eslint-disable */

function getAppName () {
  const an = window.navigator.appVersion
  let isAndroid = an.indexOf('Android') > -1 || an.indexOf('Linux') > -1; //g
  let isIOS = !!an.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  let name
  if (isAndroid) {
    name = 'android'
  } else if(isIOS) {
    name = 'ios'
  }
  return name
}

function connectWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge)
  } else {
    document.addEventListener('WebViewJavascriptBridgeReady', function() {
        callback(WebViewJavascriptBridge)
    }, false)
  }
}

function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'https://__bridge_loaded__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

function appBridge() {
  if (appName === 'android') {
    connectWebViewJavascriptBridge(function(bridge) {
      bridge.init(function(message, responseCallback) {
        responseCallback(message);
      });
      registerHandler(bridge)
    })
  } else if (appName === 'ios') {
    setupWebViewJavascriptBridge(function(bridge) {
      var uniqueId = 1
      function log(message, data) {
        var log = document.getElementById('log')
        var el = document.createElement('div')
        el.className = 'logLine'
        el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
        if (log.children.length) {
          log.insertBefore(el, log.children[0])
        } else {
          log.appendChild(el)
        }
      }
      registerHandler(bridge)
    })
  }
}
appBridge()

//原生调用h5的方法
// data 是原生传递过来的数据.
// responseCallback 是 JS 调用完毕之后传递给原生的数据
function registerHandler(bridge) {
  bridge.registerHandler('selectObject', function(data, responseCallback) {
    responseCallback(data)
  })
  bridge.registerHandler('allowBack', function (data, responseCallback) {
    responseCallback(data)
  })
  bridge.registerHandler('getCurrentPosition', function (data, responseCallback) {
    store.commit('setPosition', JSON.parse(data))
    responseCallback(data)
    
  })
  bridge.registerHandler('getPic', function (data, responseCallback) {
    store.commit('setPic', data)
    responseCallback(data)
  })
  bridge.registerHandler('getAudio', function (data, responseCallback) {
    store.commit('setAudio', data)
    responseCallback(data)
  })
  bridge.registerHandler('getVideo', function (data, responseCallback) {
    store.commit('setVideo', data)
    responseCallback(data)
  })
  bridge.registerHandler('freshPage', function (data, responseCallback) {
    store.commit('setFreshPage')
    responseCallback(data)
  })
  bridge.registerHandler('tellJsBack', function (data, responseCallback) {
    responseCallback(data)
  })
}

