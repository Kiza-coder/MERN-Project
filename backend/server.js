const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require ('dotenv').config()


//CONST
const app = express()
const port = process.env.port || 5000
const uri = process.env.ATLAS_URI;
const exerciseRouteur = require('./routes/exercise')
const userRouteur = require('./routes/user')




//MIDDLEWARE
app.use(cors())
app.use(express.json());
app.use("/exercises",exerciseRouteur) // WHEN WE GO TO '/EXERCISES', EVERYTHING IN EXERCISEROUTEUR WILL BE EXECUTED 
app.use("/users",userRouteur)



//COnnect to the MangoDBAtlas
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true}
)

const connection = mongoose.connection
connection.once('open', () => {
    console.log("MangoDB database connection established succefully")
})

app.listen(port, () => {
    console.log('Server is running')
})
