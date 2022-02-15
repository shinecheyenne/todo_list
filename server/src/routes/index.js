const express = require('express')
const router = express.Router() //서브 라우터 생성 (하위 url에 대한 요청 처리하기 위함)
const todo = require('./todo')
const apod = require('./apod')

router.use('/todos', todo) // /api/todos => todo 모듈을 실행하라!
router.use('/apod', apod)
module.exports = router