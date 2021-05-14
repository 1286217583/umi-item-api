const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/users')

// 路由文件
const usersRouter = require('./routes/users')
const bannersRouter = require('./routes/banners')

// 创建 express 服务
const app = express()

// 链接mongodb
const uri = 'mongodb://127.0.0.1:27017/maizuo'
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('数据库连接成功');
}).catch(err => {
  console.log('数据库连接失败', err);
})

// 中间件
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.set('Access-Control-Allow-Headers','content-type')
  next()
})

// 路由
app.use('/api', [usersRouter, bannersRouter])


app.listen(3000)
