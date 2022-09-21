const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const addEventRoute = require('./src/routes/addEventRoute')

dotenv.config()

const app = express()
const port = process.env.PORT
const schedulerDb = process.env.SCHEDULER_KEY

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(addEventRoute)

mongoose.connect(schedulerDb, {useNewUrlParser:true, useUnifiedTopology:true})
.then((result) => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
})
.catch((err) => {
    console.log(err)
})
