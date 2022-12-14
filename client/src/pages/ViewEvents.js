import { useEffect, useState } from 'react'
import { useParams, useNavigate } from "react-router-dom"
import Navbar from '../components/NavBar'
import { MdDelete, MdEdit } from "react-icons/md";
//import EventStatus from '../components/EventStatus';

const ViewEvents = () => {

    const [ noEvents, setNoEvents ] = useState(false)
    const [ exceptMsg, setExceptMsg ] = useState("")
    const [ data, setData ] = useState([])
    const [ userId, setUserId ] = useState("")

    const { email } = useParams()

    const navigate = useNavigate()

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
                /*for (var i = 0; i < (result.message.events).length; i++) {
                    let edate = result.message.events[i].eventdate
                    console.log(edate)
                    let mdate = edate.split("T")[0]
                    let eday = mdate.split("-")[2]
                    let new_day = eday.split("")
                    var single_day
                    if (new_day[0] === "0") {
                        single_day = parseInt(new_day[1])
                    }else {
                        single_day = parseInt(eday)
                    }
                    console.log(typeof(single_day))
                } */
                setNoEvents(false)
                setData(result.message.events)
                setUserId(result.message._id)
                
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

    const handleUpdateEvent = (e) => {
        const eventId = e.currentTarget.dataset.id
        navigate(`/update-event/${userId}/${eventId}`)
    } 

    const getStatus = (itemDate) => {

        let d = new Date()
        let dYear = d.getFullYear() 
        let dMonth = d.getMonth() + 1
        let dDay = d.getDate()
        let modMonth = dMonth.toString()
        let modDay = dDay.toString()
        var month
        var day
        if (modMonth.length === 1) {
            month = "0" + modMonth
            month = parseInt(month)
        }else {
            month = parseInt(modMonth)
        }
        if (modDay.length === 1) {
            day = "0" + modDay
            day = parseInt(day)
        }else {
            day = parseInt(modDay)
        }

        let savedDate = itemDate.split("T")[0]
        let modDate = savedDate.split("-")
        let savedYear = parseInt(modDate[0])
        let savedMonth = parseInt(modDate[1])
        var savedDay = parseInt(modDate[2])
        
        if (savedYear < dYear) {
            return <td>Expired</td>
        }else if ((savedYear === dYear) && (savedMonth < month)) {
            return <td>Expired</td>
        }else if ((savedYear === dYear) && (savedMonth === month) && (savedDay < day)) {
            return <td>Expired</td>
        }else if ((savedYear === dYear) && (savedMonth === month) && (savedDay === day)) {
            return <td>Today</td>
        }else {
            return <td>Ahead</td>
        }
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
                        <td>{ getStatus(item.eventdate) }</td>
                        <td><div className="edit-delete"><MdEdit className="edit-icon" data-id={item._id} onClick={handleUpdateEvent} /><MdDelete className="delete-icon" data-id={item._id} onClick={handleEventDelete} /></div></td>
                    </tr>
                ))}
            </table>

            </div> }
        </div>
    )
}

export default ViewEvents