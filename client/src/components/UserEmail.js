const UserEmail = ({viewEmail, onSetViewEmail, onSendEmail}) => {
    return (
        <div className="user-email">
            <form onSubmit={onSendEmail}>
                <input
                type="email" 
                placeholder="Enter Email Address"
                value={viewEmail}
                onChange={onSetViewEmail}
                />
                <button>Send</button>
            </form>
        </div>
    )
}

export default UserEmail