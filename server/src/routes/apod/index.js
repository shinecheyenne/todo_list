const express = require('express')
const ApodRouter = express.Router()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const multer = require('multer')
const fs = require('fs')
const Image = require('../../models/Image') //정의한 모델 가져오기


const upload= multer({
    storage: multer.memoryStorage(), //이미지를 버퍼의 형태로 받아옴
    limits: {fileSize: 5*1024*1024}
})

ApodRouter.route('/').get(async (req, res)=>{ // URL 응답 테스트
    // ***route('/:name')
    // if(req.params.name!='cheyenne'){
    //     res.status(401).send('you are not authorized to this page')
    //     next()
    // }
    const data = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`)
    await data.json().then((obj)=>{
        res.send(`<img src = ${obj.hdurl} alt='apod' style='width: 50%'></img>`)
        console.log(req.headers)
    })
})

ApodRouter.route('/upload').get((req, res)=>{
    // if(err) next(err)
    res.sendFile(`${process.cwd()}/public/index.html`)
})

//https://seungha-devlog.com/blog/read/608f9e955e68a40a46847b78
//몽고db에 이미지 저장하기
ApodRouter.route('/upload').post(upload.single('testfile'), async(req, res)=>{
    try{
        const img= req.file.buffer
        if(img.truncated) return res.status(413) //이미지 용량 제한 초과 시
        const image = new Image({img})
        await image.save()
        return res.json(`${image._id}`)
    }catch(e){
        return res.status(500).json()
    }
})

//몽고db에서 이미지 불러와서 다운로드, 화면에 전달하기
ApodRouter.route('/download/:id').get(async(req, res)=>{
    const {id} = req.params
    try{
        const image = await Image.findById(id).exec()
        if(!image) return res.status(404).json()
        const imageUrl = image.img
        fs.writeFileSync(`public/images/${id}.png`, imageUrl)
        fs.readFile(`public/images/${id}.png`, (err, data)=> {
            if(err) throw err
            res.writeHead(200, {'Content-Type': 'image/png'})
            res.write(data)
            res.end()
        })
    }catch(e){
        return res.status(500).json()
    }
})

module.exports = ApodRouter

//res.redirect
//res.render("index") - html 문서
