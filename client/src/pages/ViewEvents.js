import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Navbar from '../components/NavBar'
import { MdDelete, MdEdit } from "react-icons/md";

const ViewEvents = () => {

    const [ noEvents, setNoEvents ] = useState(false)
    const [ exceptMsg, setExceptMsg ] = useState("")
    const [ data, setData ] = useState([])

    const { email } = useParams()

    useEffect(() => {

        fetch(`/api/get-events/${email}`)
        .then((response) => {
            return response.json()
        })
        .then((result) => {
            console.log(result)
            if(result.message === "no_events") {
                setNoEvents(true)
                setExceptMsg("There are no events associated with this email")
            }else if(result.message === "no_user") {
                setNoEvents(true)
                setExceptMsg("This email/ user does not exist")
            }else if(result.message === "server_error") {
                setNoEvents(true)
                setExceptMsg("Internal server error. Try again")
            }else {
                setNoEvents(false)
                setData(result.message.events)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }, [email])

    const handleEventDelete = (e) => {

        const id = e.currentTarget.dataset.id

        fetch(`/api/delete-event/${id}/${email}`, {
            method : "DELETE",
            headers: {
                'Content-type': 'application/json'
            }
        })
    }

    return (
        <div className="view-container">
            <Navbar />
            <h3>Welcome { email }</h3>
            { noEvents && <h4 className="except-msg">{exceptMsg}</h4> }
            { !noEvents && <div className="list-container">
            <table>
                <tr>
                    <th>Event</th>
                    <th>Date Created</th>
                    <th>Event Date</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                {data.map((item) => (
                    <tr key={item._id}>
                        <td>{item.event}</td>
                        <td>{item.datecreated.split("T")[0]}</td>
                        <td>{item.eventdate.split("T")[0]}</td>
                        <td>Ahead</td>
                        <td><div className="edit-delete"><MdEdit className="edit-icon"/><MdDelete className="delete-icon" data-id={item._id} onClick={handleEventDelete} /></div></td>
                    </tr>
                ))}
            </table>

            </div> }
        </div>
    )
}

export default ViewEvents