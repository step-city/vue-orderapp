var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();//生成一个 express 实例 app，挂载了一个根路由控制器

var router = express.Router();

router.get('/', function (req, res ,next) {
  req.url = 'index.html';
  next();
})

app.use(router);

var appData = require('./data.json') //require 用来加载data代码
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

//**********加载mock数据**********
var apiRoutes = express.Router();

apiRoutes.get('/seller', function (req,res) {
  res.json({
    errno: 0,
    data: seller
  });
});
apiRoutes.get('/goods', function (req,res) {
  res.json({
    errno: 0,
    data: goods
  });
});
apiRoutes.get('/ratings', function (req,res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

app.use('/api', apiRoutes);

app.use(express.static('./dist'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
});
