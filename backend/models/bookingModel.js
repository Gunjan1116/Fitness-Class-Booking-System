const mongoose=require("mongoose");

const bookingSchema=mongoose.Schema({
    userId:{type:String,require:true},
    trainerId:{type:String,require:true},
    userEmail:{type:String,require:true},
    bookingDate:{type:String,require:true},//mm/dd/yyyy
    bookingSlot:{type:String,require:true}
},{timestamps:true})

const Bookingmodel=mongoose.model("booking",bookingSchema)

module.exports={Bookingmodel}
// let x=new Date();

// console.log(x);

// // console.log(x.getUTCFullYear());
// //console.log(x.getUTCMonth());
// // console.log(x.getUTCDate());
// // console.log(x.getUTCHours());
// // console.log(x.getUTCMinutes());
// // console.log(x.getUTCSeconds());
// console.log(x.toLocaleDateString())