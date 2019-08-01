/**
 * 获取url参数
 * @param {String} url url地址
 * @param {String} name 参数名称
 */
export const getQueryString = (url, name) => {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  const r = url.slice(url.search(/\?/)).substr(1).match(reg)
  if (r != null) { return unescape(r[2]) }
  return null
}

/**
 * 函数去抖,针对winodw.onresize等事件
 * @param {Function} method 需要去抖的方法
 */
export const debounce = method => {
  if (method.timeout) clearTimeout(method.timeout)
  method.timeout = setTimeout(() => {
    method()
  }, 500)
}

/**
 * 识别是否为微信浏览器
 */
export const isWeixinBrowser = () => /micromessenger/.test(navigator.userAgent.toLowerCase())


/**
 * 判断是否为空对象
 * @param {*} obj 
 */
export const isEmptyObject = obj => {
  for (var name in obj) {
    return false
  }
  return true
}

/**
 * 面包屑配置
 */
export const getBreadInfo = (url) => {
  const breadConfig = {
    '/property-profile': ['Property Profile', 'Dashboard'],

    '/devices': ['Devices', 'Devices List'],
    '/devicesEdit': ['Devices', 'Device Edit'],
    '/devicesCreate': ['Devices', 'Device Create'],

    '/hotels': ['Hotels', 'Hotels List'],
    '/hotelsEdit': ['Hotels', 'Hotel Edit'],
    '/hotelsCreate': ['Hotels', 'Hotel Create'],

    '/skills': ['Skills', 'Skills List'],
    '/skillsEdit': ['Skills', 'Skill Edit'],
    '/skillsCreate': ['Skills', 'Skill Create'],

    '/intents': ['Intents', 'Intents List'],
    '/intentsEdit': ['Intents', 'Intent Edit'],
    '/intentsCreate': ['Intents', 'Intent Create'],

    '/rooms': ['Rooms', 'Rooms List'],
    '/roomsEdit': ['Rooms', 'Room Edit'],
    '/roomsCreate': ['Room', 'Room Create'],

    '/roomTypes': ['Room Types', 'Room Types List'],
    '/roomTypesEdit': ['Room Types', 'Room Type Edit'],
    '/roomTypesCreate': ['Room Types', 'Room Type Create'],

    '/contents': ['Contents', 'Contents List'],
    '/contentsCreate': ['Contents', 'Content Create'],
    '/contentsEdit': ['Contents', 'Content Edit'],
    
    '/contacts': ['Contacts', 'Contacts List'],
    '/contactsCreate': ['Contacts', 'Contact Create'],
    '/contactsEdit': ['Contacts', 'Contact Edit'],
  }
  let breadInfo = breadConfig[Object.keys(breadConfig).find((item, index) => item.split('/')[1] === url.split('/')[1])]
  if (url === '/') {
    breadInfo = breadConfig['/property-profile']
  }
  return breadInfo ? breadInfo : []
}
