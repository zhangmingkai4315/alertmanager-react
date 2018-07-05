import React from 'react'
import {NavLink} from 'react-router-dom'
import FA from 'react-fontawesome'
const Header = () => {
    return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> 
                <a className="navbar-brand" href="/">AlertManager</a> 
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target = "#navbarColor01" aria-controls = "navbarColor01" aria-expanded = "false" aria-label = "Toggle navigation">
                    <span className="navbar-toggler-icon"></span> 
                </button>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to="/alerts" className="nav-link">Alerts</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/silences" className="nav-link">Silences</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/status" className="nav-link">Status</NavLink>
                        </li> 
                    </ul>
                    <form className="form-inline">
                        <button className="btn btn-outline-info my-2 my-sm-0"><FA name="bell-slash"/> New Silence</button> 
                    </form>
                </div>
            </nav>
    )
}

export default Header;
