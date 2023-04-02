const express=require("express");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const fs=require("fs");
require("dotenv").config();

const {Signupmodel} =require("../models/signupModel");

const signupRoute=express.Router();

//registering new user
signupRoute.post("/signup",async(req,res)=>{
    const {name,email,password}=req.body;
    let allData=await Signupmodel.find({email});
    //console.log(allData);
     if(allData.length==0){
        try {
            bcrypt.hash(password,5,async(err,hash)=>{
                if(err){
                    console.log("error from hashing the password in signup",err.message);
                    res.json({msg:"Something went wrong!"})
                }else{
                    const data=new Signupmodel({name,email,password:hash});
                    await data.save();
                    res.json({msg:"Signup Successfully"})
                }
            })
        } catch (error) {
            console.log("error from signup route",error.message);
            res.json({err:error.message});
        }
    }else if(allData[0].email==email){
        return res.json({msg:"You are already registerd!"})
    }
    
})

//login the user
signupRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;

    try {
        const reqData=await Signupmodel.find({email});
        if(reqData.length>0){
            bcrypt.compare(password,reqData[0].password,(err,result)=>{
                if(result){
                    let normal_token=jwt.sign({userId:reqData[0]._id,name:reqData[0].name,email:reqData[0].email},process.env.normalToken,{expiresIn:"1d"});
                    let refresh_token=jwt.sign({userId:reqData[0]._id,name:reqData[0].name,email:reqData[0].email},process.env.refreshToken,{expiresIn:"7d"});
                    res.json({"msg":"login Successfull","token":normal_token,"refreshToken":refresh_token,"name":reqData[0].name})
                }else{
                    res.json({"msg":"Wrong Credentials"})
                }
            })
        }else{
            res.json({"msg":"Wrong Credentials"})
        }
    } catch (error) {
        console.log("error from login route",error.message);
        res.json({err:error.message});
    }
})

//logout the user
signupRoute.get("/logout",(req,res)=>{
    const token=req.headers.authorization;

    try {
        const blacklistingToken=JSON.parse(fs.readFileSync("./blacklist.json","utg-8"));
        blacklistingToken.push(token);
        fs.writeFileSync("./blacklist.json",JSON.stringify(blacklistingToken));
        res.json({"msg":"logged out!"})
    } catch (error) {
        console.log("error from logout route",error.message);
        res.json({err:error.message});
    }
})

//to get newtoken 
signupRoute.get("/newtoken",async(req,res)=>{
    const refreshToken=req.headers.authorization;
    try {
        if(!refreshToken){
            res.json({msg:"please login first!"})
        }else{
            jwt.verify(refreshToken,process.env.refreshToken,function(err,decoded){
                if(err){
                    res.json({"msg":"please login again!!","err":err.message});
                }else{
                    const normalToken=jwt.sign({userId:decoded.userId,name:decoded.name,email:reqData[0].email},process.env.normalToken,{expiresIn:"1d"});
                    res.json({"msg":"login success","token":normalToken});
                }
            })
        }
    } catch (error) {
        console.log("error from getting new token route",error.message);
        res.json({err:error.message});
    } 
})

signupRoute.get("/alluser",async (req,res)=>{
    try {
        let userData= await Signupmodel.find()
        res.send(userData)
        
    } catch (error) {
        console.log("Error while fetching user Data")
    }
})

module.exports={
    signupRoute
}