const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true,
  },

  nickname: {
    type: String,
    required: true
  },

  gender: {
    type: Number,
    required: true,
    default: 1
  }
})

const model = mongoose.model('User', schema)

module.exports = model

