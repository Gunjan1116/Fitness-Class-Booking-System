const express=require("express")
const {connection}=require("./config/db")
const { trainerRouter } = require("./Routes/trainer.route")
const {bookingRoutes}=require("./Routes/bookingRoutes")
const {signupRoute}=require("./Routes/signupRoute")

require("dotenv").config()

const app=express()
app.use(express.json())

app.use("/user",signupRoute)
app.use("/trainer",trainerRouter)
app.use("/booking",bookingRoutes)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running at ${process.env.port}`)
})