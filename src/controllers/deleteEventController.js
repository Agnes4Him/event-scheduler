const Scheduler = require('../models/eventModel')

exports.deleteEvent = (req, res) => {
    if (req) {
        const id = req.params.id
        const email = req.params.email
        console.log(`Request received to delete event ${id} for ${email}`)
        Scheduler.findOne({email:email})
        .then((result) => {
            if (result) {
                console.log(result)
                Scheduler.findOneAndUpdate({email:email}, { $pull: { events : {_id : id}} }, { new: true })
                .then((response) => {
                    console.log("Event successfully deleted")
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}