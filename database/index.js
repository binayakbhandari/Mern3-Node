const mongoose = require('mongoose')

console.log(mongoose)

async function connectToDatabase(){
    await mongoose.connect()
    console.log("Databse connected successfully !")
}


module.exports = connectToDatabase
