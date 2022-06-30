// 导入axios
import axios from 'axios'

import md5 from 'md5'

import loading from './loading'

// 创建axios实例对象
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((config) => {
  // 打开loading加载
  loading.open()

  // 调用接口要传的参数
  const { icode, time } = getTestICode()
  config.headers.icode = icode
  config.headers.codeType = time

  // TODO 将token 通过请求头发送给后台

  return config
}, (error) => {
  // 关闭loading加载
  loading.close()
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  // 关闭loading加载
  loading.close()

  // TODO token过期状态

  // TODO 全局响应处理

  return response
}, (error) => {
  // 关闭loading加载
  loading.close()
  return Promise.reject(error)
})

// 统一了传参处理
const request = (options) => {
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data || {}
  }
  service(options)
}

// 获取icode、
function getTestICode() {
  const now = parseInt(Date.now() / 1000)
  const code = now + 'LGD_Sunday-1991'
  return {
    icode: md5(code),
    time: now
  }
}

// 导出axios实例对象
export default request
