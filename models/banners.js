
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  imgUrl: {
    type: String,
    required: true
  },

  startTime: {
    type: String,
    required: true
  },

  endTime: {
    type: String,
    required: true
  }
}, { timestamps: true })

const model = mongoose.model('Banner', schema)

module.exports = model