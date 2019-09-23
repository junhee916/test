let fs = require("fs")
let http = require("http")
let express = require("express")
let app = express()
let cookieParser = require("cookie-parser")
let bodyParser = require("body-parser")
let sessionParser = require("express-session")
let mysql = require("mysql")
let WebSocket = require("ws")
let socketIo = require("socket.io")

let connection = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "123123",
    database: "testdb"
})

connection.connection()

app.use(cookieParser())
app.use(bodyParser.urlencoded())
app.use(sessionParser({
    secret: "dfnkeninkdfnkdjlasoff%!@%!@$!@",
    resave: true,
    saveUninitialized: true
}))

app.get("/login", function(req, res){
    fs.readFile("login.html", function(err, data){
        res.send(data.toString())
    })
})

app.post("/loginprocess", function(req, res){

    connection.query("select*from users where user_id =?", [req.body.myid, req.body.mypw], function(err, rows){
        if(rows.length==0){
            res.send("아이디가 맞지 않습니다.")
        }
        else{
            if(rows[0].user_pw==req.body.mypw){
                req.session.user = {
                  name: req.body.myid
                }

                res.send("로그인 성공")
            }
            else{
                res.send("비밀번호가 맞지 않습니다.")
            }
        }
    })
})

app.get("/write", function(req, res){
    fs.readFile("write.html", function(err, data){
        res.send(data.toString())
    })
})

app.get("/writeprocess", function(req, res){
    connection.query("insert into board(title, content) valuse(?,?)", [req.query.title, req.query.content], function(){
        res.send("write ok")
    })
})

app.get("/socket", function(req, res){
    fs.readFile("socket.html", function(err, data){
        res.send(data.toString())
    })
})

let server = app.listen(80, function(){
    console.log("Welcome")
})

let io = socketIo(server)

io.on("connection", function(socket){
    console.log("클라이언트 접속 id:", socket.id)

    socket.on("newchat", function(data){
        console.log(data)

        io.emit("chat", {msg: data.msg})
    })
})