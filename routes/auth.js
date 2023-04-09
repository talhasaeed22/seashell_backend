//Router imports
const express = require('express');
const router = express.Router();

//Validation imports
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//JWT Token imports
const JWT_Secret = 'Yournameisgood$boy';
const jwt = require('jsonwebtoken');

//Importing user to create and other stuff
const User = require("../models/User");

//Importing fecth user method form middleware to get the data of user
const fetchusers = require('../middleware/fetchuser');

//Route1: Create a user using POST using "/api/auth/createuser"
router.post('/createuser', [
    body('name', 'Enter a Valid Name').isLength({min: 3}),
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Enter Password of Alteast 5 characters').isLength({min:5}),
    body('age', 'Enter valid age').isLength({min:2})

] , async (req, res)=>{
    //Is there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }
    //Check wheather the user with this email exists already
    try {
        let user  = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({error: "Sorry the Email has taken already"})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);

        //Creating a user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            age: req.body.age
        })

        const data = {
            user:{
                id:user._id
            }
        }
        const authtoken  = jwt.sign(data, JWT_Secret);
        res.json({authtoken});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occurred");
    }
})

//Route 2: Authenticate a user using POST using "/api/auth/login"
router.post('/login', [
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists()
] , async (req, res)=>{
    //Is there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
    }
    //Req.body contains email and password so extracting them
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email})
        if(!user){
            res.status(400).json({error:"Please try to login with correct credentials"})
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            res.status(400).json({error:"Please try to login with correct credentials"})
        }
        //it is the data of user.... We will send the id of user
        const data = {
            user:{
                id:user._id
            }
        }
        const authtoken  = jwt.sign(data, JWT_Secret);
        res.json({authtoken});
    }catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occurred");
    }
})

//Route 3: Get user details using POST using "/api/auth/getuser"
router.post('/getuser' , async (req, res)=>{
    try {
        const userID = req.user.id;
        const user = await User.findOne({userID}).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error occurred");
    }
})
module.exports = router;