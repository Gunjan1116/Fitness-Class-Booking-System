const mongoose=require("mongoose");

const signupSchema=mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    // mobileNo:{type:String,require:true},
    password:{type:String,require:true},
})

const Signupmodel=mongoose.model("user",signupSchema);

module.exports={
    Signupmodel
}

// "name":"ajit",
//     "email":"ajit@gmail.com",
//     "mobileNo":"340957358",
//     "password":""