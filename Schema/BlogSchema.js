const mongoose = require("mongoose");
// const autoincrement = require("mongoose-auto-increment")

const blogSchema = new mongoose.Schema({
    title: String,
    metatag: String,
    imgurl: String,
    question1: String,
    answer1: String,
    question2: String,
    answer2: String,
    question3: String,
    answer3: String,
    question4: String,
    answer4: String,
    question5: String,
    answer5: String,
    question6: String,
    answer6: String,
    question7: String,
    answer7: String,
    question8: String,
    answer8: String,
    authorname:String,
    
})

// autoincrement.initialize(mongoose.connection)
// blogSchema.plugin(autoincrement.plugin, "Blog")

const blogModel = new mongoose.model("Blog", blogSchema)

module.exports = blogModel