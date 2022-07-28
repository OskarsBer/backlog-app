// Declare variables
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const gameEntry = require('./models/game');


// Set middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
// app.use(express.json())
app.use(cors())


mongoose.connect(process.env.DB_STRING, {useNewUrlParser: true}, () => {console.log('Connected to database..')}
)

// TODO refactor to async await properly
app.get('/', async (request, response) => {
    try {
        gameEntry.find({}, (err, entries) => {
            response.render('index.ejs', {backlog_db: entries})
        })
    } catch (error) {
        if(error) return response.status(500).send(error)
    }
})


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})