let fs = require("fs")
let http = require("http")
let express = require("express")
let app = express()
let cookieParser = require("cookie-parser")
let bodyParser = require("body-parser")
let sessionParer = require("express-session")
let hbs = require("express-handlebars")
let mysql = require("mysql")
let multer = require("multer")
let WebSocket = require("ws")
let socketIo = require("socket.io")
let connection = mysql.createConnection({
    user: "admin",
    host: "database-1.ccia79mprjnt.ap-northeast-2.rds.amazonaws.com",
    password: "123123123",
    database: "test"
})

connection.connect()

app.engine("hbs", hbs({
    extname: "hbs",
    defaultLayout: false
}))
app.set("view engine", "hbs")

app.use(cookieParser())
app.use(bodyParser.urlencoded())
app.use(sessionParer({
    secret: "kdnfoen#%#@%@",
    resave: true,
    saveUninitialized: true
}))

let upload = multer({
    storage:multer.diskStorage({
        destination:function(req, file, cb){
            cb(null, "uploads")
        },
        filename:function(req, file, cb){
            cb(null, file.originalname)
        }
    })
})
app.use("/uploads", express.static("uploads"))

app.get("/upload", function(Req, res){
    res.render("upload")
})

app.post("/uploadprocess", upload.single("myfile"), function(req, res){
    res.render("instargram")
})

let server = app.listen(80, function(){
    console.log("Welcome")
})

let io = socketIo(server)