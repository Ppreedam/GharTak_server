const express = require("express");
// const {AddBlog, GetBlog, AddDlDetails }= require("../Controller/Blog-controller");
const router= express();
var bcrypt = require("bcryptjs");
const userdb = require("../Schema/userSchema.js")
const adminuser = require("../Schema/AdminUserSchema.js")
const authenticate= require("../middleware/authenticate.js")
const {Registration} = require("../Controller/UserController.js");
const { addfund, deductfuncd, getfunddata } = require("../Controller/AddWallet");
const { AdminRegistration } = require("../Controller/Admincontroller");
const Adminauthenticate = require("../middleware/Adminauthentication");
// const {LoginUser} = require("../Controller/UserController.js")

// router.post("/addblog", AddBlog);
// router.get("/getblog", GetBlog)
// router.post("/adddldetails",AddDlDetails )
router.post("/register", Registration )
// router.post("/login", LoginUser )
router.post("/addfund", addfund);
router.post("/deductfund", deductfuncd);
router.get("/getfund/:userId", getfunddata)
router.post("/adminregistration", AdminRegistration)




// admin login
router.post("/adminlogin", async (req, res) => {
    // console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await adminuser.findOne({email:email});
        // console.log(userValid)
        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);
            // console.log(isMatch)
            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{

                // token generate
                const token = await userValid.generateAuthtoken();

                // cookiegenerate
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });

                const result = {
                    userValid,
                    token
                }
                // console.log(result)
                res.status(201).json({status:201,result})
            }
        }

    } catch (error) {
        res.status(401).json(error);
        console.log("catch block");
    }
});  

router.get("/adminvaliduser",Adminauthenticate,async(req,res)=>{
    try {
        const ValidUserOne = await adminuser.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
});

// user login
    

router.post("/login", async (req, res) => {
    // console.log(req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        res.status(422).json({ error: "fill all the details" })
    }

    try {
       const userValid = await userdb.findOne({email:email});
        // console.log(userValid)
        if(userValid){

            const isMatch = await bcrypt.compare(password,userValid.password);
            // console.log(isMatch)
            if(!isMatch){
                res.status(422).json({ error: "invalid details"})
            }else{

                // token generate
                const token = await userValid.generateAuthtoken();

                // cookiegenerate
                res.cookie("usercookie",token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly:true
                });

                const result = {
                    userValid,
                    token
                }
                // console.log(result)
                res.status(201).json({status:201,result})
            }
        }

    } catch (error) {
        res.status(401).json(error);
        console.log("catch block");
    }
});  



router.get("/validuser",authenticate,async(req,res)=>{
    try {
        const ValidUserOne = await userdb.findOne({_id:req.userId});
        res.status(201).json({status:201,ValidUserOne});
    } catch (error) {
        res.status(401).json({status:401,error});
    }
});


router.get("/logout",authenticate,async(req,res)=>{
    // console.log(req)
    try {
        req.rootUser.tokens =  req.rootUser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        res.clearCookie("usercookie",{path:"/"});

        req.rootUser.save();

        res.status(201).json({status:201})

    } catch (error) {
        res.status(401).json({status:401,error})
    }
})


module.exports = router;