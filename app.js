const express =  require('express')
const connectToDatabase = require('./database')
const app = express()


// console.log(express);
// console.log(app)
connectToDatabase()


app.get("/", (req, res)=>{
    res.status(200).json({
        message : "This is home page."
    })
})

app.get("/about", (req, res)=>{
    res.status(200).json({
        message : "This is about page."
    })
})

app.listen(3000, ()=>{
    console.log("NodeJS Project Started")
})


