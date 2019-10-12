/**
 * Created by Yan on 2019-06-01
 **/
import https from './request'
/**
 * 上传图片
 **/
 export const uploadImgApi=(data)=>{
  return https.upPost('/webMatting/matting2',data)
}

/**
 * 粘贴抠图
 **/
 export const copyUpload=(data)=>{
  return https.paramspost('/webMatting/mattingByUrl2',data)
}
/**
 * 获取排队中图片信息
 **/
 export const getMattingInfo=(data)=>{
  return https.get('/webMatting/getMattingInfo',data)
}
/**
 * 下载原图
 **/
 export const downloadMattedImage=(data)=>{
  return https.get('/webMatting/getMattedImage',data)
}
/**
 * 批量下载
 **/
 export const getMattedImageMultiple=(data)=>{
  return https.post('/webMatting/getMattedImageMultiple',data)
}



//用户模块开始
/**
 * 获取用户信息
 **/
export const getUserInfo=(data)=>{
 return https.get('/user/userInfo',data)
}
/**
 * 检查邮箱是否注册
 **/
export const usercheckEmail=(data)=>{
 return https.get('/user/checkEmail',data)
}
/**
 * 手机号注册
 **/
export const userRegister=(data)=>{
 return https.get('/user/registerByMobile',data)
}
/**
 * 发送验证码
 **/
export const sendCode=(data)=>{
 return https.get('/user/sendSms',data)
}
/**
 * 手机号快速登录
 **/
export const loginByMobile=(data)=>{
 return https.get('/user/quickLoginByMobile',data)
}
/**
 * 用户登录
 **/
export const userLogin=(data)=>{
 return https.get('/user/login',data)
}
/**
 * 修改密码
 **/
export const userResetPassword=(data)=>{
 return https.get('/user/changePassword',data)
}
/**
 * 通过token修改密码
 **/
export const userResetbyEmail=(data)=>{
 return https.get('/user/changePasswordByToken',data)
}
/**
 * 发送修改密码邮件
 **/
export const sendChangePasswordEmail=(data)=>{
 return https.get('/user/sendChangePasswordEmail',data)
}
/**
 * 邮箱激活
 **/
export const userActivationEmail=(data)=>{
 return https.get('/user/activeEmail',data)
}
/**
 * 获取apikey
 **/
export const userApikey=(data)=>{
 return https.get('/user/apikey',data)
}
/**
 * 重新刷新apikey
 **/
export const userRefreshApikey=(data)=>{
 return https.get('/user/refreshApikey',data)
}
/**
 * 获取抠图历史记录
 **/
export const userHistoryList=(data)=>{
 return https.get('/webMatting/mattingHistory',data)
}
//用户模块结束


//产品模块开始
/**
 * 获取订阅列表
 **/
export const subscriptionPlans=(data)=>{
 return https.get('/order/subscriptionPlans',data)
}
/**
 *我的订阅
 **/
export const userSubscribe=(data)=>{
 return https.get('/order/mySubscription',data)
}
/**
 *能量使用记录
 **/
export const userPlansHistory=(data)=>{
 return https.get('/order/creditsLogs',data)
}
/**
 *生成订阅订单
 **/
export const creatSubscriptionPlan=(data)=>{
 return https.get('/order/prepaySubscriptionPlan',data)
}
/**
 *支付
 **/
export const userCreatePayment=(data)=>{
 return https.get('/paypal/createPayment',data)
}
/**
 *通知支付成功
 **/
export const userNotifyPaid=(data)=>{
 return https.get('/order/notifyPaid',data)
}
/**
 *获取验证图
 **/
export const userGetCaptcha=(data)=>{
 return https.get('/getCaptcha',data)
}
/**
 *获取验证结果
 **/
export const userGetvalidate=(data)=>{
 return https.get('/validate',data)
}
//产品模块结束


