import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from '../components/NavBar'
import CreateButton from '../components/CreateButton'
import ViewButton from '../components/ViewButton'
import UserEmail from "../components/UserEmail";

const Main = () => {

    const [showUserEmail, setShowUserEmail] = useState(false)
    const [viewEmail, setViewEmail] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

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
        if (viewEmail.length === 0) {
            setErrorMsg("Email is required")
        }else {
            fetch('/api/confirm-email', {
                method:'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({email:viewEmail})
            })
            .then((response) => {
                return response.json()
            })
            .then((result) => {
                if (result.message === "no_email") {
                    setErrorMsg("That email does not exist")
                }else if (result.message === "server_error") {
                    setErrorMsg("Internal server error. Try again later")
                }else {
                    setErrorMsg("")
                    navigate(`/view-events/${viewEmail}`)
                }
            })
        }
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
                { errorMsg && <div className="error-msg">{ errorMsg }</div> }
            </div>
        </div>
    )
}

export default Main