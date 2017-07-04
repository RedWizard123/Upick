/**
 * Created by faraway on 17-6-27.
 */
const express = require('express');
const router = express.Router();
const v = 'v2'

function parseBodyJSON (req, res, next) {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    req.body = JSON.parse(data);
    next();
  });
}

function wait(time) {
  return function (req, res, next) {
    setTimeout(() => {
      next()
    }, time)
  }
}
router.get(`/${v}/users/status`, wait(100), (req, res) => {
  res.status(200).json({
    'status': 200 ,
    'data': {
      'status': true
    }
  });
});
router.get(`/${v}/index`, wait(100), (req, res) => {
  res.status(200).json({
    'status': 200,
    'data': {
      'slogan': '让校内坑店无处遁形',
      'shop_types': [
        {
          'type_name': '美食'
        },
        {
          'type_name': '生活服务'
        },
        {
          'type_name': '喝的'
        },
        {
          'type_name': '玩的'
        },
        {
          'type_name': '健身'
        },
      ],
      'popular_shops': [
        {
          'shop_name': '东一学生食堂',
          'shop_score': 9,
          'hit_number': 19454
        },
        {
          'shop_name': 'F2咖啡馆',
          'shop_score': 10,
          'hit_number': 1000000
        },
        {
          'shop_name': '谷德鸡王',
          'shop_score': 8.5,
          'hit_number': 30021212
        },
        {
          'shop_name': '锁石咖啡',
          'shop_score': 7.5,
          'hit_number': 100
        },
        {
          'shop_name': '韵苑食堂大酒店',
          'shop_score': 7.5,
          'hit_number': 100
        }
      ]
    }
  });
});
router.post(`/${v}/shops/list`, wait(100), parseBodyJSON, (req, res, next) => {
  const reqJSON = req.body;
  if (reqJSON.request_type === 1) {
    res.status(200).json({
      'status': 200,
      'data': {
        'subtypes': ['自行车', '文印店', '电器维修', '理发店', '眼镜店', '自行车', '文印店', '电器维修', '理发店'],
        'shop_list': [
          {
            'shop_name': reqJSON.keyword,
            'shop_area': '店铺所在区域',
            'shop_address': '店铺地址',
            'open_time': '营业时间',
            'shop_score': 0,
            'img_urls': [
              {
                'src': '',
                'msrc': '',
                'width': 100,
                'height': 200
              }
            ],
            'shop_tags': [
              { 'tag_name': '难吃', 'positive': false },
              { 'tag_name': '不好玩', 'positive': false },
              { 'tag_name': '好吃', 'positive': false }
            ]
          },
          {
            'shop_name': 'asfgdgdgf',
            'shop_area': '店铺所在区域',
            'shop_address': '店铺地址',
            'open_time': '营业时间',
            'shop_score': 0,
            'img_urls': [
              {
                'src': '',
                'msrc': '',
                'width': 200,
                'height': 200
              }
            ],
            'shop_tags': [
              { 'tag_name': '难吃', 'positive': false },
              { 'tag_name': '不好玩', 'positive': true },
              { 'tag_name': '好吃', 'positive': false }
            ]
          }
        ]
      }
    });
  } else if (reqJSON.request_type === 2) {
    res.status(200).json({
      'status': 200,
      'data': {
        'shop_list': [
          {
            'shop_name': '绿源电动车',
            'shop_area': '东边',
            'shop_address': '子松',
            'open_time': '7:00-20:00',
            'shop_score': 8.0,
            'img_urls': [
              {
                'src': '',
                'msrc': '',
                'width': 100,
                'height': 100
              }
            ],
            'shop_tags': ['店铺标签']
          },
          {
            'shop_name': '爱哦发货',
            'shop_area': '东边',
            'shop_address': '子松',
            'open_time': '7:00-20:00',
            'shop_score': 8.0,
            'img_urls': [
              {
                'src': '',
                'msrc': '',
                'width': 100,
                'height': 100
              }
            ],
            'shop_tags': ['店铺标签']
          },
          {
            'shop_name': '暗示法大放送',
            'shop_area': '东边',
            'shop_address': '子松',
            'open_time': '7:00-20:00',
            'shop_score': 8.0,
            'img_urls': [
              {
                'src': '',
                'msrc': '',
                'width': 100,
                'height': 100
              }
            ],
            'shop_tags': ['店铺标签']
          },
          {
            'shop_name': '多个地方提供',
            'shop_area': '东边',
            'shop_address': '子松',
            'open_time': '7:00-20:00',
            'shop_score': 8.0,
            'img_urls': [
              {
                'src': '',
                'msrc': '',
                'width': 100,
                'height': 100
              }
            ],
            'shop_tags': ['店铺标签']
          }
        ]
      }
    });
  } else if (reqJSON.request_type === 3) {
    res.status(200).json({
      'status': 200,
      'data': {
        'shop_list': [
          {
            'shop_name': reqJSON.keyword,
            'shop_area': '店铺所在区域',
            'shop_address': '店铺地址',
            'open_time': '营业时间',
            'shop_score': 0,
            'img_urls': [
              {
                'src': '',
                'msrc': '',
                'width': 100,
                'height': 200
              }
            ],
            'shop_tags': [
              { 'tag_name': '难吃', 'positive': false },
              { 'tag_name': '不好玩', 'positive': false },
              { 'tag_name': '好吃', 'positive': false }
            ]
          },
          {
            'shop_name': 'asfgdgdgf',
            'shop_area': '店铺所在区域',
            'shop_address': '店铺地址',
            'open_time': '营业时间',
            'shop_score': 0,
            'img_urls': [
              {
                'src': '',
                'msrc': '',
                'width': 200,
                'height': 200
              }
            ],
            'shop_tags': [
              { 'tag_name': '难吃', 'positive': false },
              { 'tag_name': '不好玩', 'positive': true },
              { 'tag_name': '好吃', 'positive': false }
            ]
          }
        ]
      }
    });
  } else if (reqJSON.request_type === 4) {
    res.status(200).json({
      'status': 200,
      'data': {
        'shop_list': [
          {
            'shop_name': '韵苑大酒店',
            'shop_score': 9
          },
          {
            'shop_name': '韵苑自行车',
            'shop_score': 8.7
          }
        ]
      }
    });
  }
  next();
});
router.get(`/${v}/shops/search_history`, wait(100), (req, res, next) => {
  res.status(200).json({
    'status': 200,
    'data': {
      'search_history': '搜索历史店铺列表'.split('')
    }
  })
  next()
})
router.get(`/${v}/shops/search_history/hot_records`, wait(100), (req, res, next) => {
  res.status(200).json({
    'status': 200,
    'data': {
      'hot_records': '搜索历史店铺列表'.split('').reverse()
    }
  })
  next()
})
router.post(`/${v}/shops/tags`, wait(100), (req, res, next) => {
  res.status(200).json({
    'status':200,
    'data': {
      'shop_tags': [
        { 'tag_name': '南昌', 'positive': false },
        { 'tag_name': '安达市', 'positive': false },
        { 'tag_name': '阿萨德撒', 'positive': false },
        { 'tag_name': '啊啊', 'positive': false },
        { 'tag_name': '是否', 'positive': false },
        { 'tag_name': '大概', 'positive': false },
        { 'tag_name': '阿萨德撒', 'positive': false },
        { 'tag_name': '啊啊s', 'positive': false },
        { 'tag_name': '是否安达市', 'positive': false },
        { 'tag_name': '大概时代', 'positive': false },
        { 'tag_name': '是否阿萨', 'positive': false },
        { 'tag_name': '大概十大', 'positive': false },
        { 'tag_name': '阿萨德撒', 'positive': false },
        { 'tag_name': '啊啊啊', 'positive': false },
        { 'tag_name': '是否安达市', 'positive': false },
        { 'tag_name': '是否安达市', 'positive': false },
        { 'tag_name': '是否安达市', 'positive': false },
        { 'tag_name': '是否安达市', 'positive': false },
        { 'tag_name': '大概时代', 'positive': false }
      ]
    }
  })
  next()
})
router.post(`/${v}/comments/images`, wait(5000), parseBodyJSON, (req, res, next) => {
  res.status(200).json({
    'status': 200,
    'data': {
      'url': 'https://pic2.zhimg.com/v2-70e3d3bccaba6e58d9f379eacb0f92b1_xl.jpg',
      'simg_url': 'https://pic2.zhimg.com/v2-70e3d3bccaba6e58d9f379eacb0f92b1_xl.jpg',
      'height': 200,
      'width': 200
    }
  })
  next()
})
router.post(`/${v}/shops/comments`, wait(1000), parseBodyJSON, (req, res, next) => {
  if (req.body.request_type === 1) {
    res.status(200).json({
      'status': 200,
      'data': ''
    })
    next()
  } else if (req.body.request_type === 2) {
    res.status(200).json({
      'status': 200,
      'data': [
        {
          'author_headimg': '',
          'author_nickname': 'hehe',
          'author_openid': '56453453454152',
          'issue_time': Date.now(),
          'like_number': Math.round(100 * Math.random()),
          'dislike_number': Math.round(100 * Math.random()),
          'text': '好紧张啥办法金卡是否剧肯定不是放假后健康萨芬不能及时看到好牛逼健康是福',
          'operation': -1,
          'imgs': ['', '', '']
        },
        {
          'author_headimg': '',
          'author_nickname': 'hehe',
          'author_openid': '56453453454152',
          'issue_time': Date.now(),
          'like_number': Math.round(100 * Math.random()),
          'dislike_number': Math.round(100 * Math.random()),
          'text': '好紧张啥办法金卡是否剧肯定不是放假后健康萨芬不能及时看到好牛逼健康是福',
          'operation': -1,
          'imgs': ['', '', '']
        },
        {
          'author_headimg': '',
          'author_nickname': 'hehe',
          'author_openid': '56453453454152',
          'issue_time': Date.now(),
          'like_number': Math.round(100 * Math.random()),
          'dislike_number': Math.round(100 * Math.random()),
          'operation': -1,
          'text': '好紧张啥办法金卡是否剧肯定不是放假后健康萨芬不能及时看到好牛逼健康是福',
          'imgs': ['', '', '']
        },
        {
          'author_headimg': '',
          'author_nickname': 'hehe',
          'author_openid': '56453453454152',
          'issue_time': Date.now(),
          'like_number': Math.round(100 * Math.random()),
          'dislike_number': Math.round(100 * Math.random()),
          'operation': -1,
          'text': '好紧张啥办法金卡是否剧肯定不是放假后健康萨芬不能及时看到好牛逼健康是福',
          'imgs': ['', '', '']
        },
        {
          'author_headimg': '',
          'author_nickname': 'hehe',
          'author_openid': '56453453454152',
          'issue_time': Date.now(),
          'like_number': Math.round(100 * Math.random()),
          'dislike_number': Math.round(100 * Math.random()),
          'operation': -1,
          'text': '好紧张啥办法金卡是否剧肯定不是放假后健康萨芬不能及时看到好牛逼健康是福',
          'imgs': ['', '', '']
        },
        {
          'author_headimg': '',
          'author_nickname': 'hehe',
          'author_openid': '56453453454152',
          'issue_time': Date.now(),
          'like_number': Math.round(100 * Math.random()),
          'dislike_number': Math.round(100 * Math.random()),
          'operation': -1,
          'text': '好紧张啥办法金卡是否剧肯定不是放假后健康萨芬不能及时看到好牛逼健康是福',
          'imgs': ['', '', '']
        },
        {
          'author_headimg': '',
          'author_nickname': 'hehe',
          'author_openid': '56453453454152',
          'issue_time': Date.now(),
          'like_number': Math.round(100 * Math.random()),
          'dislike_number': Math.round(100 * Math.random()),
          'text': '好紧张啥办法金卡是否剧肯定不是放假后健康萨芬不能及时看到好牛逼健康是福',
          'operation': -1,
          'imgs': ['', '', '']
        }
      ]
    })
    next()
  } else {
    res.status(200).json({
      'status': 200,
      'data': ''
    })
    next()
  }
})

router.post(`/${v}/shops`, wait(1000), parseBodyJSON, (req, res, next) => {
  res.status(200).json({
    'status': 200,
    'data':
      {
        'shop_name': req.body.shop_name,
        'shop_area': '店铺所在区域',
        'shop_address': '址噶哈哈就是房间开放世界级手机看就看你',
        'open_time': '9:00-23:00 7:00-21:00',
        'shop_score': 9.87452,
        'img_urls': [
          {
            'src': 'https://pic2.zhimg.com/v2-70e3d3bccaba6e58d9f379eacb0f92b1_xl.jpg',
            'msrc': 'https://pic2.zhimg.com/v2-70e3d3bccaba6e58d9f379eacb0f92b1_xl.jpg',
            'width': 200,
            'height': 200
          }
        ],
        'shop_tags': [
          { 'tag_name': '南昌', 'positive': false },
          { 'tag_name': '安达市', 'positive': false },
          { 'tag_name': '阿萨德撒', 'positive': true },
          { 'tag_name': '啊啊', 'positive': false },
          { 'tag_name': '是否', 'positive': true },
          { 'tag_name': '大概', 'positive': false },
          { 'tag_name': '阿萨德撒', 'positive': false },
          { 'tag_name': '啊啊s', 'positive': false },
          { 'tag_name': '是否安达市', 'positive': false },
          { 'tag_name': '大概时代', 'positive': false },
          { 'tag_name': '是否阿萨', 'positive': false },
          { 'tag_name': '大概十大', 'positive': false },
          { 'tag_name': '阿萨德撒', 'positive': false },
          { 'tag_name': '啊啊啊', 'positive': false },
          { 'tag_name': '是否安达市', 'positive': false },
          { 'tag_name': '是否安达市', 'positive': false },
          { 'tag_name': '是否安达市', 'positive': false },
          { 'tag_name': '是否安达市', 'positive': false },
          { 'tag_name': '大概时代', 'positive': false }
        ]
      }
  })
  next()
})


module.exports = router;
