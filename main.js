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
    user:"root",
    host:"localhost",
    password:"123123",
    database:"testdb"
})

connection.connect()

app.use(cookieParser())
app.use(bodyParser.urlencoded())
app.use(sessionParser({
    secret:"dkjfdkjfdlajfldifj1@!%!@%!",
    resave:true,
    saveUninitialized:true
}))
app.use("/public", express.static("public"))

app.get("/", function(req, res){
    if(req.session.user){
        res.send("환영합니다.")
    } else {
        res.send("누구시죠?")
    }
})

app.get("/login", function(req, res){
    fs.readFile("login.html", function(err, data){
        res.send(data.toString())
    })
})

app.get("/send", function(req, res){
    fs.readFile("send.html", function(err, data){
        res.send(data.toString())
    })
})

app.post("/loginprocess", function(req, res){
    connection.query("select*from users where user_id=?", [req.body.myid, req.body.mypw], function(err, rows){
        if(rows.length==0){
            res.send("아이디가 존재하지 않습니다.")
        }
        else{
            if(rows[0].user_pw==req.body.mypw){
                "s%3AfOwf_nwp3INlBsMdSMksACfxBLDvOM1S.Xn8aRY23DY4PVob1tH44D17Yq9rOOUyggDoe6AeUDb0"
                req.session.user = {name:req.body.myid}
                fs.readFile("socket.html", function(err, data){
                    res.send(data.toString())
                })
            }
            else{ 
                fs.readFile("write.html", function(err, data){
                    res.send(data.toString())    
                })
            }
        }
    })
})


app.get("/writeprocess", function(req, res){
    connection.query("insert into board(title, content) value(?,?)", [req.query.title, req.query.content], function(){
        fs.readFile("teach.html", function(err, data){
            res.send(data.toString())
        })
    })
})

let server = app.listen(3000, function(){
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