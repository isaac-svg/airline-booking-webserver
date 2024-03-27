const mongoose = require("mongoose")


async function connectDB(){

    await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log(`connected to db`)
}

module.exports = connectDB