let express = require("express")
let app = express()

let a = 0

// RAM

// DISK (HDD, SDD)

app.get("/", function(req, res){
    res.send(a + "입니다")
    a = a + 1
})

app.listen(80, function(){
    console.log("ok")
})