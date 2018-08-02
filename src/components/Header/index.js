import React from 'react'
import { FormattedMessage } from 'react-intl'
import {NavLink,Link} from 'react-router-dom'
import FA from 'react-fontawesome'
const Header = () => {
    return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> 
                <a className="navbar-brand" href="/"><FormattedMessage id="AppName"/></a> 
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target = "#navbarColor01" aria-controls = "navbarColor01" aria-expanded = "false" aria-label = "Toggle navigation">
                    <span className="navbar-toggler-icon"></span> 
                </button>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to="/alerts" className="nav-link"><FormattedMessage id="menu.alerts"/></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/silences" className="nav-link"><FormattedMessage id="menu.silences"/></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/history" className="nav-link"><FormattedMessage id="menu.history"/></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/status" className="nav-link"><FormattedMessage id="menu.status"/></NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/enter" className="nav-link"><FormattedMessage id="menu.setting"/></NavLink>
                        </li> 
                    </ul>
                    <form className="form-inline">
                        <Link to="/silences/new" className="btn btn-outline-info my-2 my-sm-0"><FA name="bell-slash"/> <FormattedMessage id="alerts.new_silence"/></Link>
                    </form>
                </div>
            </nav>
    )
}

export default Header;
