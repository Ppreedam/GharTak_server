const blogModel = require("../Schema/BlogSchema");

const AddBlog = async (req, res) => {
    const data = req.body;
    const newData = blogModel(data);
    try {
        const modeldata = await newData.save()
        res.status(201).json({ mess: "Blog Posted Successful", data: modeldata })
    } catch (error) {
        res.status(501).json({ mess: "Failed" })
    }
}

const GetBlog = async (req, res) => {
    try {
        const alldata = await blogModel.find()
        res.status(201).json({ mess: "Data get Successful", data: alldata })
    } catch (error) {
        res.status(501).json({ err: "failed" })
    }
}

module.exports = { AddBlog, GetBlog}