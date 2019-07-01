import https from './request'
/**
 * 上传图片
 */
 export const uploadImgApi=(data)=>{
  return https.upPost('/matting',data)
}

/**
 * 粘贴抠图
 */
 export const copyUpload=(data)=>{
  return https.paramspost('/mattingByUrl',data)
}

