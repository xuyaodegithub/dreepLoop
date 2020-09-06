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
 * 上传背景保存
 **/
 export const uploadossBg=(data)=>{
  return https.upPost('/oss/upload',data)
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
 * 通过短信获取token修改密码
 **/
export const getResetPasswordToken=(data)=>https.get('/user/getResetPasswordToken',data)
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
 return https.get('/pay/findProductAllByType',data)
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
 *下单接口
 **/
export const userCreatePayment=(data)=>{
 return https.get('/pay/unifiedOrder',data)
}
/**
 *判断是否支付成功
 **/
export const judgeIsPaly=(data)=>{
 return https.get('/pay/isPay',data)
}
/**
 *获取二维码
 **/
export const getQrCode=(data)=>{
 return https.get('/pay/getQrcode',data)
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
/**
 *获取邀请码
 **/
export const userGetInvitation=(data)=>{
 return https.get('/user/getInvitation',data)
}
/**
 *获取邀请码记录
 **/
export const userGetInvitationLogPage=(data)=>{
 return https.get('/user/listInvitationLogPage',data)
}
/**
 *图片修复
 **/
export const redirMatting=(data)=>{
 return https.upPost('/webMatting/predict',data)
}
//产品模块结束

/**
 *背景图片类目
 **/
export const imgListCat=(data)=>{
 return https.get('/img/cat',data)
}
/**
 *类目下背景图片
 **/
export const catImgList=(data)=>{
 return https.get('/img/page',data)
}
/**
 *模板分类
 **/
export const templateList=(data)=>{
 return https.get('/poster/templateList',data)
}
/**
 *模板详情
 **/
export const templateDetial=(data)=>{
 return https.get('/poster/template',data)
}
/**
 *保存模板
 **/
export const saveTemplate=(data)=>{
 return https.post('/admin/poster/saveTemplate',data)
}

/**
 *默认模板
 **/
export const templateCategoryList=(data)=>{
 return https.get('/poster/templateCategoryList',data)
}

/**
 *模板下载
 **/
export const templatedownload=(data)=>{
 return https.get('/poster/download',data)
}
/**
 *视频抠图上传
 **/
export const videoMatting=(data,file)=>{
 return https.paramspost2('/oss/append',data,file)
}
/**
 *视频抠图上传
 **/
export const BySha256=(data)=>{
 return https.get('/oss/getUploadTaskBySha256',data)
}

/**
 *视频预览轮播
 **/
export const videoImgsPreview=(data)=>{
 return https.paramspost('/videoMatting/previewImage',data)
}

/**
 *预览视频xiazai
 **/
export const videoPreview=(data)=>{
 return https.paramspost('/videoMatting/previewVideo',data)
}

/**
 *视频历史
 **/
export const videoHisList=(data)=>{
 return https.get('/videoMatting/mattingHistory',data)
}

/**
 *视频预览进度
 **/
export const videoMattingInfo=(data)=>{
 return https.get('/videoMatting/getMattingInfo',data)
}

/**
 *视频全部进度
 **/
export const videoFullMatting=(data)=>{
 return https.paramspost('/videoMatting/startFullMatting',data)
}

/**
 *视频删除
 **/
export const videoDelete=(data)=>{
 return https.get('/videoMatting/delete',data)
}

/**
 *获取关注二维码
 **/
export const wechatCode=(data)=>{
 return https.get('/weixinMp/getSubscribeQrCode',data)
}

/**
 *轮训是否关注
 **/
export const toSureWatch=(data)=>{
 return https.get('/weixinMp/checkMpSubscribe',data)
}

