import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/NavBar'
import Calendar from 'react-calendar'

const UpdateEvent = () => {

    const [date, setDate] = useState(new Date())
    const [ eventDetails, setEventDetails ] = useState("")

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
                            <button>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateEvent