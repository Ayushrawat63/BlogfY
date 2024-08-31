const mongoose =require('mongoose')


const mongooseConnect=()=>{
    mongoose.connect(process.env.MONGOOSECONNECT_URL).then(()=>{
    console.log("MongoDb Connected")
}).catch(()=>{
    console.log("MongoDb Disconnected")
})
}

module.exports=mongooseConnect