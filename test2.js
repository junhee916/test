let fs = require("fs")
let http = require("http")
let express = require("express")
let app = express()
let cookieParser = require("cookie-parser")

app.use(cookieParser())
app.use("/public", express.static("public"))
app.use("/images", express.static("images"))
app.use(express.static('bootstrap'))

app.get("/index", function(req, res){
    fs.readFile("index.html", function(err, data){
    res.send(data.toString())
    })
    })

app.listen(3000, function(){
    console.log("Welcome")
})