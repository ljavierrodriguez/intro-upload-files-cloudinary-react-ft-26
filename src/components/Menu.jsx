import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../context/GlobalContext'

const Menu = () => {
    const navigate = useNavigate()
    const { store, actions } = useContext(Context)

    const handleLogout = async () => {
        const resp = await actions.logout()
        if(resp){
            navigate('/login')
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Navbar
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">
                                Profile
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {store?.user?.email || 'Anonimous'}
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Action
                                    </a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        Another action
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider" />
                                </li>
                                <li>
                                    <button className="dropdown-item" onClick={handleLogout}>
                                        Salir
                                    </button>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">
                                Register
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Menu