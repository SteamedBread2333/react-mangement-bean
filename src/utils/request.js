import axios from 'axios'
import { API_PATH } from '../constants'
import appStore from '../stores/appStore'

axios.defaults.timeout = 20000
axios.defaults.baseURL = API_PATH
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

//请求拦截
axios.interceptors.request.use(
  config => {
    config.withCredentials = true  // 需要跨域打开此配置    
    appStore.showLoading()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//响应拦截
axios.interceptors.response.use(
  response => {
    appStore.hideLoading()
    //todo:业务报错由此返回，在此做异常判断
    if(response.data.code !== 2000){
      return Promise.reject(response.data)
    }
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default axios