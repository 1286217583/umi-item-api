const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/users')

// 路由文件
const usersRouter = require('./routes/users')

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
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 路由
app.use('/api', router)


app.listen(3000)
