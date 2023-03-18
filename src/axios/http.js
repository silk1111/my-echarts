
// 对于axios进行二次封装
import axios from "axios";
import store from'../store/index';
// 1:利用axios对象的方法create,去创建一个axios实例
// 2:request就是axios,只不过稍微配置一下
const requests = axios.create({
//  配置对象
//  基础路由，发请求的时候，路径当中会出现api
//   baseURL: "/api",
//  代表请求超时的时间5S
  timeout: 5000,
});
// post请求头
requests.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
//  config: 配置对象，对象里面有一个属性很重要，headers请求头
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = store.state.token;        
        token && (config.headers.Authorization = token);     
        return config;
});
 
//响应拦截器
requests.interceptors.response.use((res) => {
    
//  成功的回调函数：服务器相应数据回来以后，响应拦截器可以检测到，可以做一些事情
if (res.status === 200) {       
    console.log("=200");
    //  console.log();
     
    return Promise.resolve(res);        
} else {            
    return Promise.reject(res);        
}   
//   return res.data;
}, (error) => {
//  响应失败的回调函数
//   return Promise.reject(new Error('fail'));
console.log(error);

});
 
// 对外暴露
export default requests;
