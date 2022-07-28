// Declare variables
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()


// Set middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
// app.use(express.json())
app.use(cors())


app.get('/', async (request, response) => {
    try {
        response.render('index.ejs')
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})


mongoose.connect(process.env.DB_STRING, {useNewUrlParser: true}, () => {console.log('Connected to database..')}
)


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})