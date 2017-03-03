require('./check-versions')()
var config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var opn = require('opn')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

app.get('/index', function(req, res){
  res.json({
    topic: "推文推文推文推文推文推文推文推文",
    list1: [
      {
        title: "美食",
        subTitle: [
          "擦费",
          "asfs",
          "assaf",
          "safef",
          "asdd",
          "frevc"
        ]
      },
      {
        title: "生活服务",
        subTitle: [
          "擦费",
          "asfs",
          "assaf",
          "safef",
          "asdd",
          "frevc"
        ]
      },
      {
        title: "喝的",
        subTitle: [
          "擦费",
          "asfs",
          "assaf",
          "safef",
          "asdd",
          "frevc"
        ]
      },
      {
        title: "玩的",
        subTitle: [
          "擦费",
          "asfs",
          "assaf",
          "safef",
          "asdd",
          "frevc"
        ]
      },
      {
        title: "健身",
        subTitle: [
          "擦费",
          "asfs",
          "assaf",
          "safef",
          "asdd",
          "frevc"
        ]
      }
    ],
    list2: [
      "氧气厂",
      "氧气厂",
      "氧气厂",
      "氧气厂",
      "SB驾校",
      "绅宝"
    ]
  });
});
app.get('/comment_data', function(req, res){
  res.json({
    error: "",
    data: {
      name: "老在咖啡",
      iconURL: "path/to/icon",
      tags: [
        {
          title: "hbyn1",
          id: 545
        },
        {
          title: "nhhg2",
          id: 545
        },
        {
          title: "gvddv3",
          id: 545
        },
        {
          title: "ebv4",
          id: 545
        },
        {
          title: "好喝5",
          id: 545
        },
        {
          title: "好喝asf6",
          id: 545
        },
        {
          title: "好喝aumtj8",
          id: 545
        },
        {
          title: "好喝hn9",
          id: 545
        },
        {
          title: "好喝fgcvf10",
          id: 545
        },
        {
          title: "vghgh11",
          id: 545
        },
        {
          title: "fhnjhg12",
          id: 545
        },
        {
          title: "tybg13",
          id: 545
        },
        {
          title: "etyrh14",
          id: 545
        },
        {
          title: "thrytu15",
          id: 545
        },
        {
          title: "rfgtb17",
          id: 545
        },
        {
          title: "vgbhnj18",
          id: 545
        },
        {
          title: "tyrhn19",
          id: 545
        },
        {
          title: "weregt20",
          id: 545
        },
        {
          title: "imj21",
          id: 545
        },
        {
          title: "rfgtb17",
          id: 545
        },
        {
          title: "vgbhnj18",
          id: 545
        },
        {
          title: "tyrhn19",
          id: 545
        },
        {
          title: "weregt20",
          id: 545
        },
        {
          title: "imj21",
          id: 545
        },
        {
          title: "imj21",
          id: 545
        },
        {
          title: "好喝cd22",
          id: 545
        }
      ]
    }
  });
});
app.get('/store_detail', function(req, res){
  res.json({
    error: "",
    data: {
      name: "地址",
      openTime: "9:00 - 21:00",
      address: "地址地址地址地址地址地址",
      picURLs: [
        {
          src: "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg",
          msrc: "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg",
          w: 1200,
          h: 800
        },
        {
          src: "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg",
          msrc: "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg",
          w: 1200,
          h: 800
        },
        {
          src: "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg",
          msrc: "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg",
          w: 1200,
          h: 800
        }
      ],
      tags: [
        [
          "地址A",
          5
        ],
        [
          "地址",
          5
        ],
        [
          "A地址",
          5
        ],
        [
          "地A址",
          5
        ]
      ],
      score: "9",
      comments: [
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1485386584,
          like: 752,
          dislike: 1,
          liked: false,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1436394135,
          like: 202,
          dislike: 1,
          liked: true,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1395627842,
          like: 305,
          dislike: 1,
          liked: true,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1469525286,
          like: 793,
          dislike: 1,
          liked: false,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1433659439,
          like: 206,
          dislike: 1,
          liked: true,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1440321357,
          like: 176,
          dislike: 1,
          liked: true,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1442893795,
          like: 910,
          dislike: 1,
          liked: true,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1407669844,
          like: 707,
          dislike: 1,
          liked: false,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1476980774,
          like: 752,
          dislike: 1,
          liked: false,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1440996060,
          like: 339,
          dislike: 1,
          liked: false,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1465113850,
          like: 811,
          dislike: 1,
          liked: true,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1420219800,
          like: 458,
          dislike: 1,
          liked: false,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1480615996,
          like: 485,
          dislike: 1,
          liked: false,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1408583270,
          like: 613,
          dislike: 1,
          liked: true,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1460370514,
          like: 327,
          dislike: 1,
          liked: true,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1393061682,
          like: 798,
          dislike: 1,
          liked: false,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1455480349,
          like: 810,
          dislike: 1,
          liked: false,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1391300478,
          like: 975,
          dislike: 1,
          liked: true,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1420575877,
          like: 441,
          dislike: 1,
          liked: true,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1390703210,
          like: 429,
          dislike: 1,
          liked: false,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1456856148,
          like: 53,
          dislike: 1,
          liked: false,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1413969182,
          like: 504,
          dislike: 1,
          liked: false,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1388589658,
          like: 217,
          dislike: 1,
          liked: true,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1413032858,
          like: 215,
          dislike: 1,
          liked: true,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1391925068,
          like: 991,
          dislike: 1,
          liked: true,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1450334875,
          like: 334,
          dislike: 1,
          liked: true,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1444212717,
          like: 714,
          dislike: 1,
          liked: true,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1458472789,
          like: 668,
          dislike: 1,
          liked: true,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1480422939,
          like: 169,
          dislike: 1,
          liked: true,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1480033868,
          like: 235,
          dislike: 1,
          liked: true,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1388877712,
          like: 186,
          dislike: 1,
          liked: false,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1439228081,
          like: 715,
          dislike: 1,
          liked: false,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1432567420,
          like: 1,
          dislike: 1,
          liked: false,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1421083448,
          like: 47,
          dislike: 1,
          liked: true,
          disliked: true
        },
        {
          id: 512,
          value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
          date: 1431973423,
          like: 391,
          dislike: 1,
          liked: false,
          disliked: true
        }
      ]
    }
  });
});
app.get('/comments_list', function(req, res){
  res.json({
    error: "",
    data: [
      {
        id: 512,
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1393334957,
        like: 71,
        dislike: 1,
        liked: false,
        disliked: true
      },
      {
        id: 512,
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1453814413,
        like: 651,
        dislike: 1,
        liked: true,
        disliked: true
      },
      {
        id: 512,
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1445711219,
        like: 55,
        dislike: 1,
        liked: true,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1474511197,
        like: 106,
        dislike: 1,
        liked: false,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1428479916,
        like: 741,
        dislike: 1,
        liked: true,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1468965413,
        like: 771,
        dislike: 1,
        liked: true,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1436196639,
        like: 273,
        dislike: 1,
        liked: false,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1389170868,
        like: 455,
        dislike: 1,
        liked: true,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1419911489,
        like: 10,
        dislike: 1,
        liked: false,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1482864742,
        like: 766,
        dislike: 1,
        liked: false,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1465949685,
        like: 863,
        dislike: 1,
        liked: false,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1441034317,
        like: 412,
        dislike: 1,
        liked: true,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1486884207,
        like: 873,
        dislike: 1,
        liked: true,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1449935581,
        like: 488,
        dislike: 1,
        liked: true,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1475106725,
        like: 580,
        dislike: 1,
        liked: false,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1411806151,
        like: 763,
        dislike: 1,
        liked: true,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1460807029,
        like: 863,
        dislike: 1,
        liked: false,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1478164242,
        like: 312,
        dislike: 1,
        liked: false,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1408885552,
        like: 822,
        dislike: 1,
        liked: false,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1456752362,
        like: 978,
        dislike: 1,
        liked: false,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1463432136,
        like: 202,
        dislike: 1,
        liked: true,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1460863709,
        like: 936,
        dislike: 1,
        liked: true,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1467282990,
        like: 396,
        dislike: 1,
        liked: false,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1440911467,
        like: 35,
        dislike: 1,
        liked: true,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1430332268,
        like: 911,
        dislike: 1,
        liked: true,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1442497749,
        like: 361,
        dislike: 1,
        liked: true,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1433127027,
        like: 398,
        dislike: 1,
        liked: true,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1405576503,
        like: 277,
        dislike: 1,
        liked: true,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1405320852,
        like: 748,
        dislike: 1,
        liked: false,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1472147075,
        like: 929,
        dislike: 1,
        liked: false,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1480657007,
        like: 465,
        dislike: 1,
        liked: true,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1487414816,
        like: 283,
        dislike: 1,
        liked: false,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1486264732,
        like: 635,
        dislike: 1,
        liked: true,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1422463132,
        like: 981,
        dislike: 1,
        liked: true,
        disliked: true
      },
      {
        id: "adasdasd",
        value: "红豆牛奶超级好喝...下次点别的尝一下～～01",
        date: 1442793630,
        like: 278,
        dislike: 1,
        liked: false,
        disliked: true
      }
    ]
  });
});
app.post('/comment', function(req, res){
  res.json({"error":""});
});
app.post('/add_store', function(req, res){
  res.json({"error":""});
});`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  `
app.get('/store_list_data', function(req, res){
  res.json({
    error: "",
    data: [
      {
        id: 1,
        name: "老再",
        openTime: "6:00-24:00",
        address: "XXXXXXX",
        score: 9,
        overall: 9.8,
        picURLs: [
          {
            src: "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg",
            msrc: "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg",
            w: 1200,
            h: 800
          }
        ],
        tags: [
          [
            "环境好",
            10
          ],
          [
            "适合自习",
            20
          ],
          [
            "难喝",
            7
          ]
        ]
      },
      {
        id: 2,
        name: "F2",
        openTime: "6:00-24:00",
        address: "XXXXXXX",
        score: 7,
        overall: 6.8,
        picURLs: [
          {
            src: "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg",
            msrc: "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg",
            w: 1200,
            h: 800
          }
        ],
        tags: [
          [
            "环境好",
            1
          ],
          [
            "不适合自习",
            5
          ],
          [
            "难喝",
            7
          ]
        ]
      },
      {
        id: 2,
        name: "F2",
        openTime: "6:00-24:00",
        address: "XXXXXXX",
        score: 7,
        overall: 6.8,
        picURLs: [
          {
            src: "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg",
            msrc: "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg",
            w: 1200,
            h: 800
          }
        ],
        tags: [
          [
            "环境好",
            1
          ],
          [
            "不适合自习",
            5
          ],
          [
            "难喝",
            7
          ]
        ]
      },
      {
        id: 2,
        name: "F2",
        openTime: "6:00-24:00",
        address: "XXXXXXX",
        score: 7,
        overall: 6.8,
        picURLs: [
          {
            src: "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg",
            msrc: "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg",
            w: 1200,
            h: 800
          }
        ],
        tags: [
          [
            "环境好",
            1
          ],
          [
            "不适合自习",
            5
          ],
          [
            "难喝",
            7
          ]
        ]
      },
      {
        id: 2,
        name: "F2",
        openTime: "6:00-24:00",
        address: "XXXXXXX",
        score: 7,
        overall: 6.8,
        picURLs: [
          {
            src: "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg",
            msrc: "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg",
            w: 1200,
            h: 800
          }
        ],
        tags: [
          [
            "环境好",
            1
          ],
          [
            "不适合自习",
            5
          ],
          [
            "难喝",
            7
          ]
        ]
      },
      {
        id: 2,
        name: "F2",
        openTime: "6:00-24:00",
        address: "XXXXXXX",
        score: 7,
        overall: 6.8,
        picURLs: [
          {
            src: "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg",
            msrc: "https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg",
            w: 1200,
            h: 800
          }
        ],
        tags: [
          [
            "环境好",
            1
          ],
          [
            "不适合自习",
            5
          ],
          [
            "难喝",
            7
          ]
        ]
      }
    ]
  });
});

app.get('/store_list_search_data', function(req, res){
  res.json({
    error: "",
    data: [
      {
        id: 1,
        name: "老再",
        openTime: "6:00-24:00",
        address: "XXXXXXX",
        score: 9,
        overall: 9.8,
        picURLs: [
          "path/to/pic1",
          "最好是绝对路径"
        ],
        tags: [
          [
            "环境好",
            10
          ],
          [
            "适合自习",
            20
          ],
          [
            "难喝",
            7
          ]
        ]
      },
      {
        id: 2,
        name: "F2",
        openTime: "6:00-24:00",
        address: "XXXXXXX",
        score: 7,
        overall: 6.8,
        picURLs: [
          "",
          ""
        ],
        tags: [
          [
            "环境好",
            1
          ],
          [
            "不适合自习",
            5
          ],
          [
            "难喝",
            7
          ]
        ]
      },
      {
        id: 2,
        name: "F2",
        openTime: "6:00-24:00",
        address: "XXXXXXX",
        score: 7,
        overall: 6.8,
        picURLs: [
          "",
          ""
        ],
        tags: [
          [
            "环境好",
            1
          ],
          [
            "不适合自习",
            5
          ],
          [
            "难喝",
            7
          ]
        ]
      },
      {
        id: 2,
        name: "F2",
        openTime: "6:00-24:00",
        address: "XXXXXXX",
        score: 7,
        overall: 6.8,
        picURLs: [
          "",
          ""
        ],
        tags: [
          [
            "环境好",
            1
          ],
          [
            "不适合自习",
            5
          ],
          [
            "难喝",
            7
          ]
        ]
      },
      {
        id: 2,
        name: "F2",
        openTime: "6:00-24:00",
        address: "XXXXXXX",
        score: 7,
        overall: 6.8,
        picURLs: [
          "",
          ""
        ],
        tags: [
          [
            "环境好",
            1
          ],
          [
            "不适合自习",
            5
          ],
          [
            "难喝",
            7
          ]
        ]
      },
      {
        id: 2,
        name: "F2",
        openTime: "6:00-24:00",
        address: "XXXXXXX",
        score: 7,
        overall: 6.8,
        picURLs: [
          "",
          ""
        ],
        tags: [
          [
            "环境好",
            1
          ],
          [
            "不适合自习",
            5
          ],
          [
            "难喝",
            7
          ]
        ]
      }
    ]
  });
});

app.get('/upload_store_data', function(req, res){
  res.json({"error":""});
});

app.get('/store_form_data', function(req, res){
  res.json({
    error: "",
    data: [
      {
        title: "类型",
        placeholder: "必填",
        inputType: "select",
        necessary: "true",
        ops: [
          {
            name: "aygfy",
            id: 1
          },
          {
            name: "bsd",
            id: 2
          },
          {
            name: "b",
            id: 54
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          },
          {
            name: "bsfd",
            id: 545
          }
        ]
      },
      {
        title: "商家名称",
        placeholder: "必填",
        inputType: "shortText",
        necessary: "true"
      },
      {
        title: "地址",
        placeholder: "请描述具体位置",
        inputType: "shortText",
        necessary: "true"
      },
      {
        title: "营业时间",
        placeholder: "选填",
        inputType: "shortText",
        necessary: "false"
      },
      {
        title: "描述",
        placeholder: "选填",
        inputType: "longText",
        necessary: "false"
      }
    ]
  });
});

app.get('/changeLikeStatus', function(req, res){
  res.json({
    error: "",
    data: {
      result: {
        liked: req.query.liked==="true",
        disliked: req.query.disliked==="true"
      }
    }
  });
});


var uri = 'http://127.0.0.1:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
