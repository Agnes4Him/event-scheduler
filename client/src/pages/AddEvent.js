import { useState } from 'react'
import NavBar from '../components/NavBar'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const AddEvent = () => {

    const [date, setDate] = useState(new Date())
    const [eventEmail, setEventEmail] = useState("")
    const [eventDetails, setEventDetails] = useState("")
    const [eventError, setEventError] = useState("")
    const [eventSuccess, setEventSuccess] = useState("")

    const handleCancelEvent = () => {
        setDate(new Date())
        setEventEmail("")
        setEventDetails("")
    }

    const handleSaveEvent = () => {

        // Send a post request to the backend
        
        if (eventEmail.length === 0) {
            setEventError("Email is required")
            setEventSuccess("")
        }else if (eventDetails.length === 0) {
            setEventError("Please enter the details of event")
            setEventSuccess("")
        }else {
            const eventObj = {
                date : date,
                email : eventEmail,
                details : eventDetails
            }
            fetch('/api/add-event', {
                method : 'POST',
                headers : {
                    'Content-Type' : "application/json"
                },
                body : JSON.stringify(eventObj)
            })
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                if (result.message === "server_error") {
                    setEventError("Internal server error. Try again later")
                    setEventSuccess("")
                }else {
                    setEventSuccess("A new event has been saved")
                    setEventError("")
                    setDate(new Date())
                    setEventEmail("")
                    setEventDetails("")
                    setTimeout(() => {
                        setEventSuccess("")
                    }, 2000)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
      
    } 

    return (
        <div>
            <NavBar />
            <div className="add-container">
            <div className="add-event">
            <div className="title-container">
                <p className="title-text">Reminder</p>
                <hr />
            </div>
            <div className="date-container">
                <p className="date-text">Date</p>
                <Calendar onChange={setDate} value={date} minDate={new Date()} />
            </div>
            <div className="email-container">
                <p className="email-text">Email</p>
                <input
                type="email"
                placeholder="Email Address"
                value={eventEmail}
                onChange={(e) => setEventEmail(e.target.value)}
                />
            </div>
            <div className="name-container">
                <p className="event-text">Event</p>
                <input
                type="text"
                placeholder="Enter details of Event"
                value={eventDetails}
                onChange={(e) => setEventDetails(e.target.value)}
                />
            </div>
            <div className="cancel-save">
                <button className="cancel-btn" onClick={handleCancelEvent}>Cancel</button>
                <button className="save-btn" onClick={handleSaveEvent}>Save</button>
            </div>
        </div>
        </div> 
        { !eventSuccess && eventError && <div className="event-error">{ eventError }</div> }
        { !eventError && eventSuccess && <div className="event-success">{ eventSuccess }</div> }        
        </div>
    
    )
}

export default AddEvent