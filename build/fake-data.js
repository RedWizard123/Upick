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
    console.log(1);
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

router.get(`/${v}/users/status`, (req, res) => {
  res.status(200).json({
    'status': 200 ,
    'data': {
      'status': true
    }
  });
});
router.get(`/${v}/index`, wait(2000), (req, res) => {
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

router.post(`/${v}/shops/list`, parseBodyJSON, (req, res, next) => {
  const reqJSON = req.body;
  if (reqJSON.request_type === 1) {
    res.status(200).json({
      'status': 200,
      'data': {
        'subtypes': ['自行车', '文印店', '电器维修', '理发店', '眼镜店']
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
  } else {
    res.status(200).json({
      'status': 200,
      'data': {
        'shop_list': [
          {
            'shop_name': '店铺名称',
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
            'shop_tags': ['店铺标签']
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
            'shop_tags': ['店铺标签']
          }
        ]
      }
    });
  }
  next();
});

module.exports = router;
