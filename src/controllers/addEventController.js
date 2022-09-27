const Scheduler = require('../models/eventModel')

exports.addEvent = (req, res) => {
    if (req.body) {
        console.log(req.body)
        Scheduler.findOne({email:req.body.email})
        .then((result) => {
            if (!result) {
                const scheduler = new Scheduler({email:req.body.email, events : [{event: req.body.details, eventdate:req.body.date}]})
                scheduler.save()
                .then((response) => {
                    console.log("Event successfully created")
                    res.status(200).json({"message":"event_created"})
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json({"message":"server_error"})
                })
            }else {
                const eventObj = {
                    event : req.body.details,
                    eventdate : req.body.date
                }
                Scheduler.findOneAndUpdate({email:req.body.email}, { $push : {events:eventObj}})
                .then((response) => {
                    console.log(`Event successfully added to list for ${req.body.email}`)
                    res.status(200).json({"message":"event_created"})
                })
                .catch((err) => {
                    console.log(err)
                    res.status(500).json({"message":"server_error"})
                })
            }
        })
    }
}