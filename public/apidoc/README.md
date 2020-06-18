# 欢迎使用PicUP.AI API使用指南

**PicUP.AI API**

Hi，开发者您好，欢迎使用PicUP.AI的API。以下内容，是您接入服务的一些基本介绍，希望您能够在这里找到适合您业务的AI技术能力，感谢您的使用！

## 快速开始
### 获取API Key
[点击获取，您的专属API Key](http://www.picup.shop/userCenter.html#/userCenter/secret)
### 简单调用示例
使用http协议Post传图片方式，调用人物抠图API
> 注意：Content-Type为"multipart/form-data"

```shellcommand
curl -H 'APIKEY: INSERT_YOUR_API_KEY_HERE' \
     -F 'file=@/home/roy/images/1.jpg'     \
     -f http://www.picup.shop/api/v1/matting (物体抠图请用  http://www.picup.shop/api/v1/matting?mattingType=2) \
     -o out.png
```

