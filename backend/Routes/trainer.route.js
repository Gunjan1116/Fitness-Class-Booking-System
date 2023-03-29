const express=require("express")
const mongoose=require("mongoose")

const trainerRouter=express.Router()

trainerRouter.get("/",(req,res)=>{
    res.send("All Good")
})

module.exports={
    trainerRouter
}