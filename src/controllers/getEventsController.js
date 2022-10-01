const Scheduler = require('../models/eventModel')

exports.getEvents = (req, res) => {
    if (req) {
        const email = req.params.email
        console.log("Request for events received", email)
        Scheduler.findOne({email:email})
        .then((result) => {
            if (result) {
                if (result.events.length == 0) {
                    console.log("No saved events for this user")
                    res.status(200).json({"message" : "no_events"})
                }else {
                    console.log(result.events)
                    res.status(200).json({"message" : result})
                }
            }else {
                res.status(400).json({"message" : "no_user"})
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({"message" : "server_error"})
        })
    }
}