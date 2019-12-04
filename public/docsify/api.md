# PICUP.AI API Document

## quick start

- [get your apikey](http://www.picup.ai/userCenter.html/secret)
- use http protocol to call the api, the content type should be "multipart/form-data" 

```shell
curl -H 'APIKEY: INSERT_YOUR_API_KEY_HERE' \
-F 'file=@/home/roy/images/1.jpg' -f \
http://www.picup.ai/api/v1/matting -o out.png
```

## For different programming languages

### shell command

```shell
curl -H 'APIKEY: INSERT_YOUR_API_KEY_HERE' \
-F 'file=@/home/roy/images/1.jpg' \
http://www.picup.ai/api/v1/matting -o out.png
```

### python

```python
import requests
response = requests.post(
    'http://www.picup.ai/api/v1/matting',
    files={'file': open('/path/to/file.jpg', 'rb')},
    headers={'APIKEY': 'INSERT_YOUR_API_KEY_HERE'},
)
with open('out.png', 'wb') as out:
    out.write(response.content)
```
### php

```php
$client = new GuzzleHttp\Client();
$res = $client->post('http://www.picup.ai/api/v1/matting', [
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

### java(spring boot)

```java
@Autowired
private RestTemplate restTemplate;

File file = new File("/path/to/file.jpg");
byte[] bytesArray = new byte[(int) file.length()];

FileInputStream fis = new FileInputStream(file);
fis.read(bytesArray); //read file into bytes[]
fis.close();
MultipartBodyBuilder builder = new MultipartBodyBuilder();
builder.part("file",bytesArray,MediaType.IMAGE_JPEG);
HttpHeaders headers = new HttpHeaders();
headers.setContentType(MediaType.MULTIPART_FORM_DATA);
headers.add("APIKEY","INSERT_YOUR_API_KEY_HERE");
HttpEntity<MultiValueMap> request= new HttpEntity<>(builder.build(),headers);
entity = restTemplate.postForEntity("http://www.picup.ai/api/v1/matting", request, Resource.class);

//todo: your logic to deal with entity

```
