# upick接口文档 - Upick API Document

## 界面
+ Protocol:HTTP
+ Client request format:JSON
+ Server response format:JSON

## General status code
### Status code
| Code | Detail |# upick借口文档 - Upick API Document

## 界面
+ Protocol:HTTP
+ Client request format:JSON
+ Server response format:JSON

## General status code
### Status code
| Code | Detail |
|:----:|--------|
| 200 | OK. 请求正确，返回请求内容。|
| 400 | Bad Request。不合法的请求.可能是因为请求格式错误。|
| 403 | Forbidden 。请求的资源被拒绝存取。|
| 404 | Not Found。请求的资源未被找到。|

所有Response都是以如下形式返回
```json
{
    "status": "status code",
    "data": "数据信息"
}
```
当status为200时data返回请求数据，否则后台处理错误返回错误信息


## APIs

## 判断是否登录
### GET /api/v2/users/status
#### Response
```json
{
    "status": "status code",
    "data":
    {
        "status": "登录状态(true/false)"
    }
}
```

## 获取主页内容
### GET /api/v2/index
#### Response
```json
{
    "status": "status code",
    "data":
    {
        "slogan": "让校内坑店无处遁形",
        "shop_types":
        [
            {
                "type_name": "类型名称"
            }
        ],
        "popular_shops":
        [
            {
                "shop_name": "店铺名称",
                "shop_score": "店铺得分",
                "hit_number": "点击量"
            }
        ]
    }
}
```

## 获取某类型店铺列表信息
### POST /api/v2/shops/list
#### Request
```json
{
    "request_type": "请求类型"(1表示请求大类型店铺列表，2表示请求子类型店铺列表，3表示关键字搜索列表),
    "shop_type": "店铺类型"(仅当根据店铺类型获取店铺列表时有此字段),
    "keyword": "搜索关键字"(仅当根据关键字搜索店铺列表时有此子段)
}
```
#### Response
```json
{
    "status": "status code",
    "data":
    {
        "subtypes": ["子类型"](仅当为大类型时有此字段),
        "shop_list":
        [
            {
                "shop_name": "店铺名称",
                "shop_area": "店铺所在区域",
                "shop_address": "店铺地址",
                "open_time": "营业时间",
                "shop_score": "买家打分",
                "img_urls": [
                    {
                        "src": "图片url",
                        "msrc": "缩略图url",
                        "width": "图片宽度",
                        "height": "图片高度"
                    }
                ],
                "shop_tags": "店铺标签"
            }
        ]
    }
}
```

## 添加评论
### POST /api/v2/shops/comments
#### Request
```json
{
    "request_type": "请求类型(0代表删除，1代表添加，2代表获取评论，3代表改变评论的喜欢状态)",
    "shop_name": "店铺名称",
    "shop_score": "用户打分",
    "comment_text": "评论文字",
    "shop_tags": "店铺标签",
    "img_urls": ["评论图片url"]
}
```
#### Response
```json
{
    "status": "status code",
    "data": ""
}
```

## 删除评论
### POST /api/v2/shops/comments
#### Request
```json
{
    "request_type": "请求类型(0代表删除，1代表添加，2代表获取评论，3代表改变评论的喜欢状态)",
    "author_id": "评论者openid",
    "comment_time": "评论时间"
}
```
#### Response
```json
{
    "status": "status code",
    "data": ""
}
```

## 获取店铺评论列表
### POST /api/v2/shops/comments
#### Request
```json
{
    "request_type": "请求类型(0代表删除，1代表添加，2代表获取评论，3代表改变评论的喜欢状态)",
    "shop_name": "店铺名称"
}
```
#### Response
```json
{
    "status": "status code",
    "data":
    [
        {
            "author_id": "评论者openid",
            "author_headimg": "评论者头像",
            "author_nickname": "评论者昵称",
            "comment_text": "评论文字内容",
            "comment_imgs": "评论图片",
            "comment_time": "评论发布时间",
            "like_number": "赞数",
            "dislike_number": "踩数"
        }
    ]
}
```

## 改变评论的喜欢状态
### POST /api/v2/shops/comments
#### Request
```json
{
    "request_type": "请求类型(0代表删除，1代表添加，2代表获取评论，3代表改变评论的喜欢状态)",
    "author_id": "评论者openid",
    "comment_time": "评论时间"
}
```
#### Response
```json
{
    "status": "status code",
    "data": ""
}
```

## 添加店铺信息
### POST /api/v2/shops
#### Request
```json
{
    "request_type": "请求类型(1代表用户添加，2代表后台添加，0代表后台删除)",
    "shop_name": "店名",
    "shop_address": "店铺地址",
    "shop_type": "店铺类型(仅当后台添加时有此字段)",
    "shop_img": "店铺图片",
    "open_time": "店铺营业时间(仅当后台添加时有此字段)"
}
```
#### Response
```json
{
    "status": "status code",
    "data": ""
}
```

## 删除店铺
### POST /api/v2/shops
### Request
```json
{
    "request_type": "请求类型(1代表用户添加，2代表后台添加，0代表后台删除)",
    "shop_name": "店名"
}
```
#### Response
```json
{
    "status": "status code",
    "data": ""
}
```

## 接收处理图片并返回url
### POST /api/v2/comments/images
#### Request
```json
{
    "image": "用户上传的图片(base64 string)"
}
```
#### Response
```json
{
    "status": "status code",
    "data":
    {
        "url": "处理后的图片url",
        "simg_url": "缩略图url",
        "height": "原图高",
        "width": "原图宽"
    }
}
```

## 获取店铺类型信息
### GET /api/v2/shops/types
#### Response
```json
{
    "status": "status code",
    "data":
    [
        {
            "type_name": "类型名称",
            "sub_type": ["细分的子类"](数组)
        }
    ]
}
```

## 评论图片点击量
### POST /api/v2/comments/images
#### Request
```json
{
    'type': 'hit（操作类型）'
    'image': '图片url'
}
```
#### Response
```json
{
    "status": "status code",
    "data": ""
}
```

## 访问量，进入来源
### POST /api/v2/pages_info
#### Request
```json
{
    'current_page': '原始页面',
    'previous_page': '来源页面',
}
```
#### Response
```json
{
    "status": "status code",
    "data": ""
}
```

## 分类点击
### POST /api/v2/classes
#### Request
```json
{
    'type': 1（大分类）/2（小分类）',
    'class': '分类名称'
}
```
#### Response
```json
{
    "status": "status code",
    "data": ""
}
```

## 微信分享接口
### POST /api/v2/jsapi
#### Request
```json
{
    "url": "当前页面url"
}
```
#### Response (response字段都是直接在wx.config填进去的)
```json
{
    "status": "status code",
    "data":
    {
        "appId": "appId",
        "timestamp": "timestamp",
        "nonceStr": "nonceStr",
        "signature": "signature"
    }
}
```
