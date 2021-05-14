const express = require('express')
const fs = require('fs')
const path = require('path')

const multer = require('multer')
const BannerModel = require('../models/banners')
const router = express.Router()
const upload = multer({ dest: 'uploads' })

/**
 * 新增轮播图
 */
router.post('/banners', upload.single('file'), async (req, res) => {
  // 1、获取前端传递的参数
  const file = req.file;
  const { name, startTime, endTime } = req.body
  // 2、对上传过来的图片文件做处理
  const fileData = fs.readFileSync(file.path)
  const filename = `${file.filename}.${file.originalname.split('.')[1]}`
  const newFilePath = path.resolve(__dirname, '../public', filename)
  // 3、去seave.js中提供中间件，再到这写人数据库
  const newBanner = new BannerModel({
    name,
    imgUrl: `http://localhost:3000/${filename}`,
    startTime,
    endTime
  })

  const data = await newBanner.save();
  console.log(1,data,2);

  res.send({
    code: 0,
    msg: '新增成功',
    data
  })

  fs.writeFileSync(newFilePath, fileData)

  res.send("sdawd")
})

/**
 * 查询轮播图
 */
router.get('/banners', async (req, res) => {
  const banners = await BannerModel.find()

  res.send({
    code: 0,
    msg: '查询成功',
    data: {
      banners
    }
  })
})

/**
 * 删除轮播图
 */

router.delete('/banners/:id', async (req, res) => {
  // 1、获取id
  const id = req.params.id

  // 操作数据库
  await BannerModel.deleteOne({ _id: id })

  res.send({
    code: 0,
    msg: '删除成功'
  })

})

/**
 * 修改指定id的轮播图数据
 */
router.patch('/banners/:id', async (req, res) => {
  // 1、得到id
  const { id } = req.params
  const data = await BannerModel.updateOne({_id: id}, req.body)

  res.send({
    code: 0,
    msg: '修改成功',
    data
  })
})

module.exports = router
