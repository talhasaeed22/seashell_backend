const mongoose = require('mongoose')
const { Schema } = mongoose;

const roomsSchema = new Schema({
    Number:{
        type: Number, 
        required: true,
        unique:true
    },
    Status:{
        type: String, 
        required: true,
        default: "Empty"
    },
    Category:{
        type: String, 
        required: true
    },
    Type:{
        type: String, 
        required: true
    },
    Price:{
        type: Number, 
        required: true
    }
});

module.exports = mongoose.model('rooms', roomsSchema)