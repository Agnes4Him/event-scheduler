const ViewButton = ({onShow}) => {
    return (
        <div>
            <button className="view-btn" onClick={onShow}>View All Events</button>
        </div>
    )
}

export default ViewButton