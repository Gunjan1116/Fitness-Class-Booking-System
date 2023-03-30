const mongoose=require("mongoose");

const signupSchema=mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    mobileNo:{type:Number,require:true},
    password:{type:String,require:true},
})

const Signupmodel=mongoose.model("user",signupSchema);

module.exports={
    Signupmodel
}