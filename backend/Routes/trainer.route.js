const express=require("express")
const mongoose=require("mongoose")
const { TrainerModel } = require("../models/trainer.model")

const trainerRouter=express.Router()

trainerRouter.get("/",async (req,res)=>{
    try {
        let trainerData= await TrainerModel.find()
        res.send(trainerData)
        
    } catch (error) {
        console.log("Error While Fetching trainer Data")
        console.log(error)
    }
})

trainerRouter.get("/:id",async (req,res)=>{
    let id=req.params.id
    try {
        let trainerData=await TrainerModel.find({_id:id})
        res.send(trainerData)
    } catch (error) {
        console.log("Error While Fetching trainer Data")
        console.log(error)
    }
})


trainerRouter.post("/add",async (req,res)=>{
    let payload=req.body
    payload.timeslot=[{
        "id":1,
        "startTime":6,
        "endTime":8,
        "isBooked":false
      },
      {
        "id":2,
        "startTime":8,
        "endTime":10,
        "isBooked":false
      },
      {
        "id":3,
        "startTime":16,
        "endTime":18,
        "isBooked":false
      },{
        "id":4,
        "startTime":18,
        "endTime":20,
        "isBooked":false
      }
      ]
    try {
        let trainer= await TrainerModel.insertMany(payload)
        res.json({"msg":"Trainer Added"})
        
    } catch (error) {
        console.log("Error while Adding a trainer")
        console.log(error)
    }

})

trainerRouter.patch("/update/:id",async (req,res)=>{
    let id=req.params.id
    let payload=req.body
    try {
        let updateTrainerData= await TrainerModel.findByIdAndUpdate({_id:id},payload)
        res.send("Trainer Data Updated")
        
    } catch (error) {
        console.log("Error While updtaing trainer")
       console.log(error) 
    }
})

trainerRouter.patch("/updateTime/:id/:timeId",async (req,res)=>{
    let id=req.params.id
    let timeID=req.params.timeId
    try {
        let data=await TrainerModel.findById({_id:id})
        let timedata=data.timeslot
        let updateTimedata= timedata.map((elem)=>{
             if(elem.id==timeID){
             elem.isBooked=true
           }
           return elem
           
        })
        let payload={timeslot:updateTimedata}
        
       let updatedData= await TrainerModel.findByIdAndUpdate({_id:id},payload)
        res.send("TimeSlot updated")
    } catch (error) {
        console.log("Error while updating timeSlot")
        console.log(error)
    }
   
})

trainerRouter.delete("/delete/:id",async (req,res)=>{
    let id=req.params.id
    try {
        let deleteTrainer=await TrainerModel.findByIdAndDelete({_id:id})
        res.json({"msg":"Trainer Data Deleted"})
        
    } catch (error) {
        console.log(error)
    }
})

module.exports={
    trainerRouter
}