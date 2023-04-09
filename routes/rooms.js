const express = require('express');
const router = express.Router();
const Room = require('../models/Rooms');

//Route1:Fetch all the rooms using GET using "/api/auth/createuser"
router.get('/fetchall', async (req, res)=>{
    const category = await req.header('category');
    console.log(category);
    const data = await Room.find({Category:category});
    res.json(data);
})

module.exports = router;
