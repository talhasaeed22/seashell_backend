const connectToMongo = require('./db');
connectToMongo();
const express = require('express');
var cors = require('cors')

const app = express();
const port = 5000;

app.use(cors())

//Middleware to use req.body
app.use(express.json());

//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/rooms', require('./routes/rooms'));

app.listen(port, () => {
    console.log(`Room Booking App listening at http://localhost:${port}`)
})

app.get('/', (req, res)=>{
    res.send("Welcome to Room Booking API");
  })