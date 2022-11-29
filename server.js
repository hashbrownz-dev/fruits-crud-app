// CORE DEPENDENCIES

require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const path = require('path');

// MODELS

const Fruit = require('./Models/Fruits');

const MONGO_URI = process.env.MONGO_URI;
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(MONGO_URI, CONFIG);

mongoose.connection
    .on("open", ()=> console.log('Connected to MongoDB'))
    .on("close", () => console.log('Disconnected from Mongo DB'))
    .on("error", (error) => console.log(error));

// CREATE APP

const app = express();
app.engine('jsx', require('express-react-views').createEngine());
app.set('view engine', 'jsx');

// MIDDLEWARE

app.use(morgan('tiny'));
app.use(methodOverride("_method")); // override for put and delete requests from forms
app.use(express.urlencoded({extended:true})); // parse urlencoded request bodies
app.use(express.static("public")); // serve static files from public folder

// ROUTES

app.get('/', (req,res) => {
    res.send("your server is running... you better catch it!");
})

// INDEX

app.get('/fruits', async (req, res) => {
    try{
        const fruits = await Fruit.find({});
        res.json(fruits);
        // res.render("fruits/Index", { fruits });
    } catch (error){
        res.json(error);
    }
})

// SEED DATABASE

app.get("/fruits/seed", (req, res) => {
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "yellow", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false }
    ]

    // DELETE ALL FRUITS
    Fruit.deleteMany({}).then((data) => {
        Fruit.create(startFruits).then((data) => {
            res.json(data);
        })
    })
})

// SERVER LISTERN
const PORT = process.env.PORT;
app.listen(PORT, () => { console.log(`Now listening on PORT: ${PORT}`)})