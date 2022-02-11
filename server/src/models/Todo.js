const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({ //데이터 모델(스키마) 정의
    name: {type: String, required: true, trim: true},
    done: {type: Boolean, default: false},
    description: {type: String, required: true, trim: true}
})

const Todo = mongoose.model('Todo', todoSchema) //실제 메모리에 모델 생성

module.exports = Todo //외부 파일에서 사용할 수 있도록 설정