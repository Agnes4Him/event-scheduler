import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav>
            <div className = "nav-content">
                <Link to="/" style={{textDecoration: "none"}}><h2 className="nav-brand">EventScheduler</h2></Link>
                <p className="nav-slogan">Helping you schedule your events effectively...</p>
            </div>
        </nav>
    )
}

export default NavBar