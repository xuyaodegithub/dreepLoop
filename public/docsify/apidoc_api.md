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

## 人像抠图去背景
识别图像中的人体轮廓，与背景进行分离，返回分割后的Alpha图、前景人像图，适应多个人体，复杂背景，人体位置重叠、遮挡、背面、侧面等各类人体姿态，各种服装、发饰、帽子、眼镜、鞋包等衣着配饰。
### 场景案例
#### 人像抠图
将原始图片中的人像分离出来，选择新的背景图像进行替换、合成；同时可以对背景进行虚化处理，突出人像，实现大光圈人像拍照效果
#### 人体特效
视频直播过程中，识别用户的人体轮廓，为人像实时增加各种设定的背景特效、贴纸道具，提供更加丰富的娱乐体验
#### 影视后期处理
识别影视作品中的人像区域，进行一键抠像、背景替换、人像虚化等后期处理
### 常见问题
Q：输入的图片格式有什么要求?  
A：支持PNG、JPG、JPEG、BMP、GIF  
Q：支持图片大小有限制吗?  
A：目前限制上传的分辨率最高为2000x2000，图片文件大小10MB以下  
### 服务价格
您可以通过在线充值付费方式，购买API调用次数。  
一次性购买越多，越优惠。  
购买的次数没有时间限制。  
注册账号即送10次免费使用。  
[查看价格列表](http://www.picup.shop/userVip.html)

### 可定制
对于需要特殊模式的大客户，可以通过邮件[pikachu@picup.ai](mailto:pikachu@picup.ai)或微信roymind和我们联系。
### API文档
#### 接口描述
用户向服务请求获取某张图中的人物，服务器返回人物的PNG图片。
#### 请求说明
**请求示例**

HTTP 方法：POST  
请求URL：`http://www.picup.shop/api/v1/matting (物体抠图请用  http://www.picup.shop/api/v1/matting?mattingType=2)`  
  
Header如下：  

| 参数 | 值 |
| ------ | ------ |
| Content-Type	 | multipart/form-data |
| APIKEY | [您的专属API Key](http://www.picup.shop/userCenter.html#/userCenter/secret) | 
  
Body中放置请求参数，参数详情如下：  

| 参数 | 值 |
| ------ | ------ |
| file	 | 图片文件 |

返回

返回即为一张content-type为image/png的图片资源，如果出现错误，状态码为标准的http 50x系列错误

#### 请求限制

当前api QPS限制为 1次/秒

### SDK
#### 命令行
```shellcommand
curl -H 'APIKEY: INSERT_YOUR_API_KEY_HERE' \
     -F 'file=@/path/to/file.jpg'     \
     -f http://www.picup.shop/api/v1/matting \ (物体抠图请用  http://www.picup.shop/api/v1/matting?mattingType=2)
     -o out.png
```

#### Python
```python
import requests
response = requests.post(
    'http://www.picup.shop/api/v1/matting', (物体抠图请用  http://www.picup.shop/api/v1/matting?mattingType=2)
    files={'file': open('/path/to/file.jpg', 'rb')},
    headers={'APIKEY': 'INSERT_YOUR_API_KEY_HERE'},
)
with open('out.png', 'wb') as out:
    out.write(response.content)
```

#### PHP
```php
$client = new GuzzleHttp\Client();
$res = $client->post('http://www.picup.shop/api/v1/matting (物体抠图请用  http://www.picup.shop/api/v1/matting?mattingType=2)', [
    'multipart' => [
        [
            'name'     => 'file',
            'contents' => fopen('/path/to/file.jpg', 'r')
        ]
    ],
    'headers' => [
        'APIKEY' => 'INSERT_YOUR_API_KEY_HERE'
    ]
]);

$fp = fopen("out.png", "wb");
fwrite($fp, $res->getBody());
fclose($fp);
```

#### Java(spring boot)
```java
@Autowired
private RestTemplate restTemplate;
        FileSystemResource resource = new FileSystemResource(new File("/path/to/file.jpg"));
        MultipartBodyBuilder builder = new MultipartBodyBuilder();
        builder.part("file",resource,MediaType.IMAGE_JPEG);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.add("APIKEY","INSERT_YOUR_API_KEY_HERE");
        HttpEntity<MultiValueMap> request= new HttpEntity(builder.build(),headers);
        Resource entity = restTemplate.postForObject("http://www.picup.shop/api/v1/matting (物体抠图请用  http://www.picup.shop/api/v1/matting?mattingType=2)", request, Resource.class);
        FileCopyUtils.copy(entity.getInputStream(), new FileOutputStream("/path/to/saveresult.png"));
//todo: your logic to deal with entity
```

