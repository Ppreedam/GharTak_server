const express = require("express");
const mongoose = require("mongoose");
const bodyparser=require("body-parser");
const connection = require("./DataBase/db.js");
const  route = require("./Server/routes.js");
const cors = require("cors")
const dotenv = require("dotenv");

dotenv.config()

const port = process.env.port || 5000


const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json({extended:true}))
app.use(cors());
app.use("/", route)


mongoose.set('strictQuery', true);


connection();






  
// app.post("/addblog",AddBlog)

app.listen(port, ()=>{
    console.log(`Server is live on http://localhost:${port}`)
})
