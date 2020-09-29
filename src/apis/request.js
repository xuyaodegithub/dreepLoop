import axios from 'axios';
// import qs from 'qs'
import {getToken, removeToken, clearCookie} from "../utils/auth";
import {basrUrls} from "../utils/index";
import {Message, Notification} from 'element-ui'
import store from '../store'
// axios.defaults.timeout=10000;//设置请求时间，超过时间报超时错位
// axios.defaults.headers={'X-Custom-Header': 'foobar'}//全局设置请求头
// instance.defaults.headers['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8';//全局设置请求头//表示跨域请求时是否需要使用凭证默认false
// axios.defaults.baseURL='http://test-admin-h5.olquan.cn'//设置域名
axios.defaults.withCredentials = true//表示跨域请求时是否需要使用凭证,默认false，一般请求携带cookie是设置为true
// })
const instance = axios.create( {
    // timeout:10000,
    baseURL: process.env.VUE_APP_BASEURL,
    // headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
    // validateStatus:  (status)=> {
    // 更改状态码 不怎么用
    // return status<500
    // 此时设置成功状态码是404，所以就算地址错误，报404，但依旧会显示请求成功
    // }
} );//自定义axios对象
instance.interceptors.request.use( function (config) {//为自定义axios设置请求拦截器
    // console.log(config)
    // 在发送请求之前做些什么config是axios请求实例 里面包含axios各种配置项和相关属性信息
    if (getToken()) config.headers['token'] = getToken();
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject( error )
} );
instance.interceptors.response.use( function (response) {//为自定义axios设置响应拦截器
    // 对响应数据做点什么
    const res = response.data, a = ['posterEditor', 'idPhotoEdit', 'imagePhotoEdit'];
    if (res.code === 0) {
        return res
    } else if (res.code == 1100/* && a.findIndex(item=>window.location.href.includes(item))<0*/) {
        removeToken();
        clearCookie( 'token' );
        store.dispatch('showLoginDilogAction');
        // localStorage.setItem('backUrl',window.location.href);
        // window.location.href=`loginOrRegister.html`;
        return res
    } else {
        Notification( {
            type: 'error',
            message: response.data.msg
        } )
        return res
        // return Promise.reject(response.data)
    }
}, function (err) {
    // 对请求错误做些什么
    if (!navigator.onLine) {
        Message( {//网络异常，请查看你的网络状态
            type: 'warning',
            message: '网络异常，请查看你的网络状态'
        } )
        return 'networkdisconnect';
    }
    // 根据你设置的timeout/真的请求超时 判断请求现在超时了，你可以在这里加入超时的处理方案
    if (err.code === 'ECONNABORTED' && err.message.indexOf( 'timeout' ) !== -1) {
        // return axios.request(originalRequest) // 再重复请求一次
        Message( {//
            type: 'warning',
            message: '网络超时，请重新尝试'
        } )
        return 'timeout';
    }
    return Promise.reject( err );
} );
// instance.interceptors.request.eject(beforask);//移除请求拦截器方法
// instance.interceptors.response.eject(afterask);//移除响应拦截器方法

const post = (url, data) => {//post请求
    return instance( {
        method: 'post',
        url: url,
        dataType: 'JSON',
        data: data
    } )
}
const paramspost = (url, data) => {//post请求  params参数
    return instance( {
        method: 'post',
        url: url,
        dataType: 'JSON',
        params: data
    } )
}
const get = (url, data) => {//get请求
    return instance( {
        method: 'get',
        url: url,
        dataType: 'JSON',
        params: data
    } )
}
const upPost = (url, data) => {//图片上传请求
    return instance( {
        method: 'post',
        url: url,
        dataType: 'JSON',
        data: data,
        headers: {'Content-Type': 'multipart/form-data'}
    } )
}
const paramspost2 = (url, data, file) => {//图片上传请求
    return instance( {
        method: 'post',
        url: url,
        dataType: 'JSON',
        params: data,
        data: file,
        headers: {'Content-Type': 'application/octet-stream'}
    } )
}


export default {
    post,
    get,
    upPost,
    paramspost,
    paramspost2
}
