const mongoose = require('mongoose')

async function connectToDatabase(){
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Databse connected successfully !")
}


module.exports = connectToDatabase
