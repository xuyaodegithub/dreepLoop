import https from './request'
/**
 * 上传图片
 **/
 export const uploadImgApi=(data)=>{
  return https.upPost('/webMatting/matting',data)
}

/**
 * 粘贴抠图
 **/
 export const copyUpload=(data)=>{
  return https.paramspost('/webMatting/mattingByUrl',data)
}
/**
 * 下载原图
 **/
 export const downloadMattedImage=(data)=>{
  return https.get('/webMatting/getMattedImage',data)
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
 * 注册
 **/
export const userRegister=(data)=>{
 return https.get('/user/registerByEmail',data)
}
/**
 * 用户登录
 **/
export const userLogin=(data)=>{
 return https.get('/user/loginByEmail',data)
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
//产品模块结束


