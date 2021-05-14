const express = require('express')
const bcryptjs = require('bcryptjs')
const UserModel = require('../models/users')
const router = express.Router()

// 用户登录
router.post('/sign-in', async (req, res) => {
  // 1、获取前端传递过来的 email 与 password
  const { email, password } = req.body
  let isOK = false
  // 2、查看 email 是否 存在
  const user = await UserModel.findOne({ email })
  if (user) {
    isOK = await bcryptjs.compare(password,user.password)
  }

  if (isOK) {
    res.send({
      code: 0,
      msg: '登录成功',
      data: {
        userInfo: {
          id: user._id,
          nickname: user.nickname,
          email: user.email
        }
      }
    })
  } else {
    res.send({
      code: -1,
      msg: '用户名或密码不正确'
    })
  }

})

// 用户注册
router.post('/sign-up', async (req, res) => {
  // 1、获取前端传递过来的参数
  const {
    email,
    password,
    nickname,
    gender
  } = req.body
  // 2、判断当前用户是否以及注册过了
  const user = await UserModel.findOne({ email })
  if (user) {
    res.send({
      code: -1,
      msg: '邮箱以及被注册过了'
    })

    return
  }
  // 3、存储到数据库中
  const newUser = new UserModel({
    email,
    password: await bcryptjs.hash(password, 10),
    nickname,
    gender
  })

  newUser.save()

  res.send({
    code: 0,
    msg: '注册成功'
  })

})

module.exports = router

