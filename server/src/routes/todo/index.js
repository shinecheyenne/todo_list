const express = require('express')
const TodoRouter = express.Router()
const Todo = require('../../models/Todo') //정의한 모델 가져오기

//read
// /api/todos
TodoRouter.route('/').get( async (req, res)=>{
    // console.log(res)
    const todos= await Todo.find()
    res.json({status: 200, todos})
})

//read
// /api/todos/{id}
TodoRouter.route('/:id').get((req, res)=>{
    Todo.findById(req.params.id, (err,todo)=>{
        if(err) throw err
        res.json({status:200, todo})
    })

})

//create
TodoRouter.route('/').post((req, res)=>{
    Todo.findOne({name: req.body.name, done: false}, async(err, todo)=>{//중복 체크
        if(err) throw err
        if(!todo){
            const newTodo = new Todo(req.body)
            await newTodo.save().then(()=>{
                res.json({status:201, msg:'new todo created in db!', newTodo})
            })
        }else{
            const msg = 'this todo already exists in db!'
            console.log(msg)
            res.json({status:204, msg}) //msg:msg
        }
    })
})

//update /put: 전체 객체 변경 , /patch: 특정 파라미터 값 변경
TodoRouter.route('/:id').put((req, res)=>{
    Todo.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, todo)=>{
        if(err) throw err
        res.json({status: 204, msg:`todo ${req.params.id} updated in db!`, todo})
    })
})

//delete
TodoRouter.route('/:id').delete((req, res)=>{
    Todo.findByIdAndRemove(req.params.id, (err, todo)=>{
        if(err) throw err
        res.json({status: 204, msg: `todo ${req.params.id} removed`})
    })
})

module.exports = TodoRouter