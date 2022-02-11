const express = require('express')
const TodoRouter = express.Router()

TodoRouter.route('/').get((req, res)=>{
    console.log(res)

    res.send(`${res.statusCode} all todo list`)
})

TodoRouter.route('/:id').get((req, res)=>{
    res.send(`todo ${req.params.id}`)
})

module.exports = TodoRouter