import { useParams } from "react-router-dom"

const ViewEvents = () => {

    const { email } = useParams()

    return (
        <div>
            <h3>Event list for {email} </h3>
        </div>
    )
}

export default ViewEvents