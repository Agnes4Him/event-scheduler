import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar'
import CreateButton from '../components/CreateButton'
import ViewButton from '../components/ViewButton'
import UserEmail from "../components/UserEmail";

const Main = () => {

    const [showUserEmail, setShowUserEmail] = useState(false)
    const [viewEmail, setViewEmail] = useState("")

    const navigate = useNavigate()

    const handleOnClick = () => {
        navigate("/add-event")
    }

    const handleOnShow = () => {
        setShowUserEmail(true)
    }

    const handleOnSetViewEmail = (e) => {
        setViewEmail(e.target.value)
    }

    const handleOnSendEmail = (e) => {
        e.preventDefault()
        navigate(`/view-events/${viewEmail}`)
    }

    return (
        <div>
            <NavBar />
            <div className="main-body">
                <div className="btn-container">
                    <CreateButton onClick={handleOnClick} />
                    <ViewButton onShow={handleOnShow} />
                </div>
                <hr />
                { showUserEmail && <UserEmail viewEmail={viewEmail} onSetViewEmail={handleOnSetViewEmail} onSendEmail={handleOnSendEmail} /> }
            </div>
        </div>
    )
}

export default Main