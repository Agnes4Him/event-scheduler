const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
    event : {
        type : String,
        required : [true, 'Event details is required']
    },
    eventdate : {
        type : Date,
        required : [true, 'Event date is required']
    }, 
    datecreated : {
        type : Date,
        default : Date.now
    }
})

const userSchema = new Schema({
    email : {
        type : String,
        required : [true, 'Email is required']
    },
    events : [eventSchema]
})

const Scheduler = mongoose.model('scheduler', userSchema)

module.exports = Scheduler;