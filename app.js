require('dotenv').config()
const express =  require('express')
const connectToDatabase = require('./database')
const Blog = require('./model/blogModel')
const app = express()
app.use(express.json())
const {multer, storage} = require('./middleware/multerConfig')
const upload = multer({storage: storage})

connectToDatabase()


app.get("/", (req, res)=>{
    res.status(200).json({
        message : "This is home page."
    })
})

app.post("/blog", upload.single('image'), async (req, res)=>{
    const {title, subtitle, description, image} = req.body
    if(!title || !subtitle || !description){
        return res.status(400).json({
            message: "Please provide title, subtitle or description !"
        })
    }
    await Blog.create({
        title: title,
        subtitle: subtitle,
        description: description,
        image: image
    })
    res.status(200).json({
        message : "Blog API hit successfully !"
    })
})


app.listen(process.env.PORT, ()=>{
    console.log("NodeJS Project Started")
})


