const mongoose = require('mongoose')
const Scheme = mongoose.Schema  

const blogScheme = new Scheme({
    title : {
        type : String
    },
    subtitle : {
        type : String
    }, 
    description : {
        type : String
    },
    image : {
        type : String
    }
})

const Blog = mongoose.model('Blog', blogScheme)
module.exports = Blog
