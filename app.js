require('dotenv').config()
const express = require('express')
const connectToDatabase = require('./database')
const Blog = require('./model/blogModel')
const app = express()
app.use(express.json())
const { multer, storage } = require('./middleware/multerConfig')
const upload = multer({ storage: storage })
const fs = require('fs')

connectToDatabase()


app.get("/", (req, res) => {
    res.status(200).json({
        message: "This is home page."
    })
})

app.post("/blog", upload.single('image'), async (req, res) => {
    const { title, subtitle, description, image } = req.body
    const fileName = req.file.filename
    if (!title || !subtitle || !description) {
        return res.status(400).json({
            message: "Please provide title, subtitle or description !"
        })
    }
    await Blog.create({
        title: title,
        subtitle: subtitle,                                             
        description: description,
        image: fileName
    })
    res.status(200).json({
        message: "Blog API hit successfully !"
    })
})

// API to fetch blogs
app.get("/blog", async (req, res) => {
    const blogs = await Blog.find() // It returns data in array
    res.status(200).json({
        message: "Blogs fetched successfully",
        data: blogs
    })
    // res.status(200).json(blogs)
})

// API to fetch single blog
app.get("/blog/:id", async (req, res) => {
    const {id} = req.params
    const blog = await Blog.findById(id) // It returns data in an object
    if (!blog) {
        return res.status(404).json({
            message: "No data found"
        })
    }
    res.status(200).json({
        message: "Single fetched successfully",
        data: blog
    })
    // res.status(200).json(blog); 
    console.log("Hitted fist time")
})

// API to delete a blog
app.delete("/blog/:id", async (req, res) => {
    const { id } = req.params
    const blog = await Blog.findById(id)
    if(!blog){
        return res.status(404).json({ 
            message: "Blog not found" 
        })
    }
    const fileName = blog.image
    await Blog.findByIdAndDelete(id)
    fs.unlink('./storage/' + fileName, (err)=>{ // `storage/${fileName}` we do in string formatting
        if(err){
            console.log(err)
        }else {
            console.log("File deleted successfully")
        }
    })
    res.status(200).json({
        message : "Blog deleted successfully"
    })
    console.log("Hitted Second time")
})

// API to update a blog
app.put("/blog/:id", upload.single('image'), async (req, res)=>{
    const {id} = req.params
    const blog = await Blog.findById(id)
    if(!blog){
        return res.status(404).json({ 
            message: "Blog not found !" 
        })
    }

    let image = blog.image
    if(req.file){
        fs.unlink('./storage/' + image, (err)=>{ // `storage/${fileName}` we do in string formatting
            if(err){
                console.log(err)
            }else {
                console.log("Old image deleted successfully")
            }
        })
        image = req.file.filename
    }

    const {title, subtitle, description} = req.body
    await Blog.findByIdAndUpdate(id, {
        title,
        subtitle,
        description,
        image
    })

    res.status(200).json({
        message : "Blog updated successfully !"
    })

    console.log("Hitted third time")
})

app.use(express.static('./storage'))

app.listen(process.env.PORT, () => {
    console.log("NodeJS Project Started")
})


