const Scheduler = require('../models/eventModel')

exports.getOneEvent = (req, res) => {
    if (req) {
        const userId = req.params.userId
        const eventId = req.params.eventId
        var event
        //console.log(`request received for ${userId}, ${eventId}`)
        Scheduler.findOne(({_id:userId}))
        .then((result) => {
            if (result) {
                //console.log(result)
                for (i = 0; i < (result.events).length; i++) {
                    if (result.events[i]._id == eventId) {
                        event = result.events[i]
                    }
                }
                console.log(event)
                res.status(200).json({"message":event})
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({"message":"server_error"})
        })
    }
}