const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const addEventRoute = require('./src/routes/addEventRoute')
const confirmEmailRoute = require('./src/routes/confirmEmailRoute')
const getEventsRoute = require('./src/routes/getEventsRoute')
const deleteEventRoute = require('./src/routes/deleteEventRoute')
const getOneEventRoute = require('./src/routes/getOneEventRoute')

dotenv.config()

const app = express()
const port = process.env.PORT
const schedulerDb = process.env.SCHEDULER_KEY

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(addEventRoute)
app.use(confirmEmailRoute)
app.use(getEventsRoute)
app.use(deleteEventRoute)
app.use(getOneEventRoute)

mongoose.connect(schedulerDb, {useNewUrlParser:true, useUnifiedTopology:true})
.then((result) => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})
.catch((err) => {
    console.log(err)
})
