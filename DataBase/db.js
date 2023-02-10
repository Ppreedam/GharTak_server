const mongoose =require("mongoose")

// const url = "mongodb://0.0.0.0:27017/BlogData"
// url = `mongodb+srv://Sarkaricard:xyz987abc@cluster0.azuavhs.mongodb.net/BlogData?retryWrites=true&w=majority`

const connection =async ()=>{
    await  mongoose.connect(`mongodb+srv://Sarkaricard:xyz987abc@cluster0.azuavhs.mongodb.net/Product_data?retryWrites=true&w=majority`,{useUnifiedTopology:true, useNewUrlParser:true})
    .then((res)=>console.log("Database connection successful"))
    .catch((err)=>console.log(err))
  }

  module.exports=connection

  