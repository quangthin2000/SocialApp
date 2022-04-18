const express = require("express");
const cors = require('cors')
const dotenv = require("dotenv");
const router = require('express').Router()
const bodyParser = require("body-parser");
const route = require('./routes/index')
const db = require('./config/db/index');
const fileupload = require("express-fileupload");

// app init
const app = express();
app.use(cors())
app.use(fileupload());
const PORT = 3000
// config env
dotenv.config()

db.connection()

// config body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// config route
route(app)


app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})