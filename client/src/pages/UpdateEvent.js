import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/NavBar'
import Calendar from 'react-calendar'

const UpdateEvent = () => {

    const [date, setDate] = useState(new Date())
    const [ eventDetails, setEventDetails ] = useState("")
    const [ updateError, setUpdateError ] = useState("")
    const [ updateSuccess, setUpdateSuccess ] = useState("")

    const { userId, eventId } = useParams()

    useEffect(() => {
        fetch(`/api/get-event/${userId}/${eventId}`)
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            if (result.message === "server_error") {

            }else {
                let new_date = (result.message.eventdate).split("T")
                let d = new Date(new_date[0])
                setDate(d)
                setEventDetails(result.message.event)
            }
        })
    }, [userId, eventId])

    const handleUpdate = () => {

        const updatedEventObj = {
            date : date,
            event : eventDetails
        }

        fetch(`/api/update-event/${userId}/${eventId}`, {
            method:"PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updatedEventObj)
        })
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            if (result.message === "server_error") {
                setUpdateError("Internal server error. Try again")
                setUpdateSuccess("")
            }else {
                setUpdateSuccess("Update was successful!")
                setUpdateError("")
            }
        })
    }

    return (
        <div>
            <Navbar />
            <div className="update-event">
                <h3>Please, update your event here...</h3>
                <div className="date-details">
                    <Calendar onChange={setDate} value={date} />
                    <div className="details">
                        <input 
                        type="text"
                        value={eventDetails}
                        onChange={(e) => setEventDetails(e.target.value)}
                        />
                        <div className="update-btn">
                            <button onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            { updateError && <div className="update-error">{ updateError }</div> }
            { updateSuccess && <div className="update-success">{ updateSuccess }</div> }
        </div>
    )
}

export default UpdateEvent