const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const { connection } = require('./db.js')
const layoutDetails = require('./purchaseOrder/purchaseOrder.routes');
require("dotenv").config();

const port = process.env.PORT || 3000; // Default to 3000 if PORT isn't set in .env

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/layout", layoutDetails);

app.get("/", (req, res) => {
    res.send({ message: "API is working now" });
});

app.listen(port, async()=>{
    try{
        // await mongoose.connect(process.env.mongoUrl)
        await connection
        console.log("database connected")
    }catch (error){
        console.log(`Here is the error ${error}`)
    }

    console.log("server is running on the port number", port)
})