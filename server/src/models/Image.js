const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
    img: Buffer
})

const Image = mongoose.model('Image', imageSchema)

module.exports = Image