import axios from 'axios'
import { API_PATH } from '../constants'

const Axios = axios.create({
  baseURL: API_PATH,
  timeout: 20000,
  responseType: "json",
  withCredentials: true, // 需要跨域打开此配置
  headers: {
      // "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    "Content-Type": "application/json;charset=utf-8"
  }
})

//请求拦截
Axios.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//响应拦截
Axios.interceptors.response.use(
  response => {
    //todo:业务报错由此返回，在此做异常判断
    if(response.data.code !== 2000){
      return Promise.reject(response.data)
    }
    return Promise.resolve(response.data)
  },
  error => {
    return Promise.reject(error)
  }
)

export default Axios