
const mongoose=require("mongoose")

const trainerSchema=mongoose.Schema({
    name:String,
    age:Number,
    gender:String,
    image:String,
    price:Number,
    specialization:Array,
    timeslot:Array(Object)
})

const TrainerModel=mongoose.model("trainer",trainerSchema)

module.exports={
    TrainerModel
}