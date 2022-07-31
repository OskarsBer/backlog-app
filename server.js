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

app.get('/', async (request, response) => {
    try {
        gameEntry.find({}, (error, entries) => {
            response.render('index.ejs', {
                gameList: entries
            })
        })
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})

app.post('/', async (request, response) => {
    const newEntry = new gameEntry(
        {
            title: request.body.title
        }
    )
    try {
        await newEntry.save()
        console.log(newEntry)
        response.redirect('/')
    } catch (error) {
        if (error) return response.status(500).send(error)
        response.redirect('/')
    }
})


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})