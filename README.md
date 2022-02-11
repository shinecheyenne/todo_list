캐시서버(nginx):

서버에서 저장, 캐시서버에서 한 번 더 저장
로드 밸런싱: 트래픽 분산 역할 (nginx에 ip 주소를 여러개 저장해 놓음)

워커: 멀티 스레딩

CORS 란 자신이 속하지 않은 다른 도메인, 다른 프로토콜, 다른 포트에 있는 리소스를 요청하는 HTTP 방식이다. 


|todo
| |-server
| | |-.gitignore
| | |-node_modules
| | |-src
| | | |-models
| | | | |-Todo.js
| | | | |-User.js
| | | |-routes
| | | | |-index.js
| | | | |-todo
| | | | | |-index.js
| |-nginx
| |-client
| |-index.js
| |-package.json


1. root 폴더 아래 server 폴더 생성
2. server 폴더에서 npm init -y (패키지 관리 파일 생성)
3. server 폴더 아래 src 폴더 생성 (url 라우팅 코드, db모델 위치할 폴더)
4. server 폴더 아래 root 파일(index.js) 생성 (cmd 창에서 code . 치면 vscode 에디터 열림)
5. server 폴더 아래 .gitignore 에 node_modules 적기 (todo 하위 각 폴더에 만들 예정.. server, nginx, client 등)

todo 폴더 내에서 git init

6. (base) PS D:\신채연\todo\server> npm install express --save
7. (base) PS D:\신채연\todo\server> node index.js

<!-- * 포트가 이미 사용중인 경우이거나 서버가 비정상적으로 종료된 경우 에러 처리
리눅스 - sudo fuser -k 5000/tcp (자신의 서버 포트번호 사용) -->

8. (base) PS D:\신채연\todo\server> npm i -g nodemon  (-g: 전역 설치)

(base) PS D:\신채연\todo\server> npm list -g
C:\Users\YJ\AppData\Roaming\npm
└── nodemon@2.0.15

9. (base) PS D:\신채연\todo\server> nodemon index.js
10. (base) PS D:\신채연\todo\server> npm install cors --save
CORS 란 자신이 속하지 않은 다른 도메인, 다른 프로토콜, 다른 포트에 있는 리소스를 요청하는 HTTP 방식이다. 

11. 요청 본문 (request body) 파싱 설정
요청 본문(request body)는 주로 Ajax콜과 같은 비동기 POST 요청을 json과 같은 문자열로 만들어 서버로 전송한다. express 서버에서는 req 객체의 body 프로퍼티에 접근하여 값을 가져올 수 있다.


12. (base) PS D:\신채연\todo\server> npm install morgan --save
logger