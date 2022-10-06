const Scheduler = require('../models/eventModel')

exports.updateEvent = (req, res) => {
    if (req) {
        const userId = req.params.userId
        const eventId = req.params.eventId
        var eventIndex
        console.log(`request received ${userId}, ${eventId}, ${req.body.event}`)
        Scheduler.findOne({_id:userId})
        .then((result) => {
            if (result) {
                //console.log(result)
                for (i = 0; i < (result.events).length; i++) {
                    if (result.events[i]._id == eventId) {
                        eventIndex = i
                    }
                }
                //console.log(eventIndex)
                
                Scheduler.updateOne({ 'events._id' : eventId }, { '$set' : { 'events.$.event' : req.body.event, 'events.$.date': req.body.date}})
                .then((response) => {
                    console.log(response)
                    console.log("Successful update")
                    res.status(200).json({"message" : "event_updated"})
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json({"message" : "server_error"})
                })
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({"message" : "server_error"})
        })
    }
}