import { useParams } from "react-router-dom"
import Navbar from '../components/NavBar'
import { MdDelete, MdEdit } from "react-icons/md";

const ViewEvents = () => {

    const { email } = useParams()

    // Remember to factor in codes when user email has no event saved in database yet...

    return (
        <div className="view-container">
            <Navbar />
            <div className="list-container">
                <h3>Welcome { email }</h3>
            <table>
                <tr>
                    <th>Event</th>
                    <th>Date Created</th>
                    <th>Event Date</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                <tr>
                    <td>Attend conference</td>
                    <td>05/09/2022</td>
                    <td>01/10/2022</td>
                    <td>Ahead</td>
                    <td><div className="edit-delete"><MdEdit className="edit-icon"/><MdDelete className="delete-icon"/></div></td>
                </tr>
                <tr>
                    <td>Travel to the UK</td>
                    <td>06/09/2022</td>
                    <td>02/11/2022</td>
                    <td>Ahead</td>
                    <td><div className="edit-delete"><MdEdit className="edit-icon"/><MdDelete className="delete-icon"/></div></td>
                </tr>
                <tr>
                    <td>Write AWS</td>
                    <td>08/09/2022</td>
                    <td>05/11/2022</td>
                    <td>Ahead</td>
                    <td><div className="edit-delete"><MdEdit className="edit-icon"/><MdDelete className="delete-icon"/></div></td>
                </tr>
            </table>

            </div>
        </div>
    )
}

export default ViewEvents