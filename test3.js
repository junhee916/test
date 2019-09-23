let fs = require("fs")
let http = require("http")
let express = require("express")
let app = express()
let cookieParser = require("cookie-parser")

/*
0) 서버로 값을 전송하는 방법 (form태그와 query)
1) 쿠키(이해)
2) 미들웨어
3) db의 이해 (파일로 써서 영구저장)
4) mysql 사용법
   mysql -u root -h localhost -p   (u : 유저, h : 접속호스, p : 비밀번호)
*/


/*
    쿼리방식(url 로 데이터 보내기) 의 문제점
    1) 보안 : 비밀번호같은게 url 에 노출됨
    2) 길이 : url의 길이제한이 존재 => 너무 긴 데이터는 보낼수가 없음
*/

/*
수업시간절약

    1) aws.com 가입 ( 비밀번호 어렵게 )   구글OTP
    2) 카드등록(해외결제가능카드)
    3) aws ec2 생성0
    4) aws rds 생성
    
    5) github.com 가입
*/

/*
다음시간
1) 포스트
2) db붙이기
3) 템플릿엔진
4) 세션
5) 소켓
*/


fs.writeFile("1.txt", "hello World", function(req, res){
    console.log("Hi")
})

app.use(cookieParser())
app.use("/public", express.static("public"))
app.use("/images", express.static("images"))
app.use(express.static('bootstrap'));

var db_id = "junhee916"
var db_pw = "1234"

app.get("/login", function(req, res){
    fs.readFile("login.html", function(err, data){
        res.send(data.toString())
    })
})

app.get("/loginprocess", function(req, res){
    if(db_id == req.query.myid && db_pw == req.query.mypw){
        // 로그인 성공시 로직

        fs.cookie("user", { login : true })  // 쿠키를 발급(보냄)해주는 부분
        // 1) user 라는 이름으로 발급해주느중 
        // 2) { login : true } 라는 정보를 써주는중
        res.send("로그인성공")
    } else {
        res.send("로그인 실패")
    }
})

var loginmiddle = function(req, res, next){
    if(req.cookies.user){
        next()
    } else {
        res.send("로그인 안된유저 접근불가")
    }
}

app.get("/", loginmiddle, function(req, res){
    res.send("로그인된 메인페이지")
})

app.get("/", function(req, res){
    if(req.cookies.user){  // 브라우져로부터 들어오는 쿠키들은 req.cookies 안에 있음
        res.send("회원님 안녕하세요")
    } else {
        res.send("누구시죠?")
    }
})


app.get("/abc", function(req, res){
    res.send("Try")
})

app.listen(3000, function(){
    console.log("Welcome")
})