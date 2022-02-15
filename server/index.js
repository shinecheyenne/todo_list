//서버의 메인 //hello
const express = require('express') // node_modules 내 express 관련 코드를 가져온다
const cors = require('cors') //=> cors 설정=> 동일 출처정책(보안)
const logger = require('morgan')
const mongoose = require('mongoose')
const multer = require('multer')
const fs = require('fs')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
const routes = require('./src/routes')
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()


app.set('case sensitive routing', true) //대소문자 구분하고 싶으면?!

const corsOption ={// CORS 옵션
    origin: 'http://localhost:5000', //'*' 모든 도메인 허용
    credentials: true //도메인간 쿠키 허용할지 설정,
    // Etag값을 토대로 새로운 요청인지 아닌지 판단(304 관련)
} //설정한 host만 허용하겠다

const CONNECT_URL = process.env.MONGO_URL

mongoose.connect(CONNECT_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log("mongodb connected..."))
    .catch(e=> console.log(`failed to connect mongodb: ${e}`))


//미들웨어(middleware) :클라이언트로부터 요청이 들어오면 미들웨어 먼저 실행, request 는 미들웨어를 거치면서 계속 반환됨
app.use(cors(corsOption)) //CORS 설정
app.use(express.json()) //request body 파싱 (클라이언트로부터 post방식으로 전송된 요청(문자열, payload)를 객체로 파싱)
app.use(logger('tiny')) //logger 설정
app.use(express.static('public'))

app.use("/api", routes) // api 라우팅 -> localhost:5000/api URL 주소 하위에 우리가 설계한 Rest API URL 서브 주소로 라우팅(Routing)할 수 있다.  url 패턴 매칭 (컨트롤러 역할)
//모듈: 파일, 함수, 객체


app.get('/hello',  (req, res)=>{ // URL 응답 테스트
    res.send(`${res.statusCode} hello world!`) //return 과 같은 개념 (브라우저로 응답) 
}) 

//304: 브라우저에 데이터가 캐시되어 있음
//https://huns.me/development/2306


app.use((req, res, next)=>{ // 사용자가 요청한 페이지가 없는 경우 에러처리
    res.status(404).send(`${res.statusCode} Sorry, we can't find page`)
})


app.use((err, req, res, next)=>{ //서버 내부 오류 처리
    console.error(err.stack)
    res.status(500).send("something is broken on server!")
})

app.listen(5000,()=>{ // 5000 포트로 서버 오픈
    console.log(`server is running on port ${port}...`)
})

