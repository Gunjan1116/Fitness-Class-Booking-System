const express = require("express");

const { Bookingmodel } = require("../models/bookingModel");

const { authenticate } = require("../middlewares/authenticateMiddleware")

const bookingRoutes = express.Router();
const nodemailer = require("nodemailer")
require("dotenv").config()

bookingRoutes.get("/", async (req, res) => {//getting all booking data
    try {
        const reqData = await Bookingmodel.find();
        res.json({ msg: "All booking data", bookingData: reqData })
    } catch (error) {
        console.log("error from getting all booking data", error.message);
        res.json({ msg: "error in getting all booking data", errorMsg: error.message })
    }
})

bookingRoutes.get("/userId", authenticate,async (req, res) => {//getting paticular user booking data
    let userId = req.body.userId;
    try {
        const reqData = await Bookingmodel.find({ userId });
        res.json({ msg: `All booking data of userId ${userId}`, Data: reqData })
    } catch (error) {
        console.log("error from getting paticular user booking data", error.message);
        res.json({ msg: "error in getting paticular user booking data", errorMsg: error.message })
    }
})

bookingRoutes.get("/:trainerId", async (req, res) => {//getting paticular trainer booking data
    let trainerId = req.params.trainerId;
    try {
        const reqData = await Bookingmodel.find({ trainerId });
        res.json({ msg: `All booking data of trainerId ${trainerId}`, Data: reqData })
    } catch (error) {
        console.log("error from getting paticular trainer booking data", error.message);
        res.json({ msg: "error in getting paticular trainer booking data", errorMsg: error.message })
    }
})

bookingRoutes.post("/create", authenticate, async (req, res) => {//create new booking
    const data = req.body;
    try {
        let allBookings = await Bookingmodel.find({ trainerId: data.trainerId })
        if (allBookings.length === 0) {
            const addData = new Bookingmodel(data);
            await addData.save();
        } else {
            for (let i = 0; i < allBookings.length; i++) {
                if (allBookings[i].bookingDate === data.bookingDate) {
                    if (allBookings[i].bookingSlot === data.bookingSlot) {
                        res.json({ "msg": "This Slot is Not Available." })
                        return
                    }
                }
            }
            const addData = new Bookingmodel(data);
            await addData.save();
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'ajitkhatua286@gmail.com',
                pass: process.env.emailpassword
            }
        });
        const mailOptions = {
            from: 'ajitkhatua286@gmail.com',
            to: `${data.userEmail}`,
            subject: 'Booking Confirmation from Rapid fit',
            text: `Your Booking is confirmed on ${data.bookingDate} date at ${data.bookingSlot} slot.`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Error while sending conformation mail' });
            } else {
                // res.json({ msg: "new booking created successfully" })
                return res.status(200).json({ message: 'Confiramtion sent to email', msg: "new booking created successfully" });
            }
        });

    } catch (error) {
        console.log("error from adding new booking data", error.message);
        res.json({ msg: "error in adding new booking data", errorMsg: error.message })
    }
})

bookingRoutes.patch("/edit/:id", async (req, res) => {//edit the booking data
    const ID = req.params.id
    const data = req.body;
    try {
        await Bookingmodel.findByIdAndUpdate({ _id: ID }, data);
        res.json({ msg: `booking id of ${ID} is updated succesfully` })
    } catch (error) {
        console.log("error from editing booking data", error.message);
        res.json({ msg: "error in edit of booking data", errorMsg: error.message })
    }
})

bookingRoutes.delete("/remove/:id", authenticate,async (req, res) => {//removing the booking data
    const ID = req.params.id
    //console.log(ID);
    try {
        await Bookingmodel.findByIdAndDelete({ _id: ID });
        res.json({ msg: `booking id of ${ID} is deleted succesfully` })
    } catch (error) {
        console.log("error from deleting booking data", error.message);
        res.json({ msg: "error in deleting of booking data", errorMsg: error.message })
    }
})

module.exports = {
    bookingRoutes
}