const Scheduler = require('../models/eventModel')

exports.confirmEmail = (req, res) => {
    if (req) {
        console.log(req.body)
        const email = req.body.email
        Scheduler.findOne({email:email}) 
        .then((result) => {
            if (!result) {
                console.log("That email does not exist")
                res.status(400).json({"message":"no_email"})
            }else {
                console.log("User found")
                res.status(200).json({"message":"email_found"})
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({"message":"server_error"})
        })
    }
}