const Scheduler = require('../models/eventModel')

exports.addEvent = (req, res) => {
    if (req.body) {
        console.log(req.body)
        const scheduler = new Scheduler({email:req.body.email, events : [{event: req.body.details, eventdate:req.body.date}]})
        scheduler.save()
    }
}