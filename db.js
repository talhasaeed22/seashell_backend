const mongoose = require('mongoose');
const mongooseURI = "mongodb+srv://talha:talha123@cluster0.vhg1c.mongodb.net/RoomBooking";

const connectToMongo = async()=>{
    mongoose.connect(mongooseURI, ()=>{
        console.log("Connected to Mongoose Successfully");
    });

}

module.exports = connectToMongo;