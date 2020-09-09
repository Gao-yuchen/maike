/**
 * 此文件为封装axios请求
 * @type {string}
 */
//import Vue from 'vue'
import axios from 'axios'
 const baseUrl = 'http://39.96.74.104:8081'
// const baseUrl = process.env.NODE_ENV
// const baseUrl = process.env.VUE_APP_BASE_URL_NAME

// const baseUrl = 'https://ai.xinhua-news.cn/SimCompService/xinhuaAPI/'

/**
 * 设置axios对象，设置公共请求前缀、请求超时时间、是否可以携带跨域标识
 */


const instance = axios.create({
    baseURL: baseUrl,
    timeout: 50000,
    headers: {
        
        'Content-Type': 'application/json',
        
    }
})


// 设置请求拦截器，方便添加请求头中的数据
instance.interceptors.request.use(
    config => {
        // console.log(config)
        if (config.url == '/openAPI/machineLearning/checkTask?app_key=xinhua1&sign=433A89E7598E2DD52D6248767912DA83') {
            config.params = { taskID: localStorage.getItem('videoTaskIDParem') };
        }
        
        if(localStorage.getItem("token")){
            config.headers.Authorization=localStorage.getItem("token")
         
        }
        if (config.url == 'demo/getDetailTaskResult') {
            config.params = {
                taskID: localStorage.getItem('videoTaskIDParem'),
                taskType: localStorage.getItem('taskTypeParem')
            };
        }
        return config
    },
    error => Promise.reject(error)
)

// 设置相应拦截器，当返回数据是进行包装验证
instance.interceptors.response.use(
    response => {
        
        
        if (response.status === 200) {
            return Promise.resolve(response.data);
            
        } else {
            return Promise.reject(response.data);
        }
    }
)

/**
 * 封装get请求
 * @param url 请求路径
 * @param params 请求参数
 * @returns {Promise<any>} 返回的值（promise）
 */
export const getHttpService = (url, params) => new Promise((resolve, reject) =>
    instance.get(url, { params })
        .then(res => resolve(res))
        .catch(err => {
            // Vue.prototype.$fail('获取数据失败，请刷新!')
            reject(err)

        })
)

/**
 * 封装post请求
 * @param url 请求路径
 * @param params 请求参数
 * @returns {Promise<any>} 返回的值（promise）
 */
export const postHttpService = (url, params) => new Promise((resolve, reject) =>
    instance.post(url, params,)
        .then(res => resolve(res))
        .catch(err => {
            // Vue.prototype.$fail('获取数据失败，请刷新!')
            reject(err)
        })
)



export const putHttpService = (url, data = {}) => new Promise((resolve, reject) =>
    instance.put(url, data)
        .then(res => resolve(res))
        .catch(err => {
            // Vue.prototype.$fail('获取数据失败，请刷新!')
            reject(err)
        })
)


export const deleteHttpService = (url, params) => new Promise((resolve, reject) =>
    instance.delete(url, params)
        .then(res => resolve(res))
        .catch(err => {
            // Vue.prototype.$fail('获取数据失败，请刷新!')
            reject(err)
        })
)



