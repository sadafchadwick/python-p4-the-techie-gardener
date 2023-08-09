import React from "react";
import { NavLink } from "react-router-dom"

function NavBar() {
    return (
    <nav>
        <NavLink to="/">HOME</NavLink>
        <NavLink to="/aboutus">ABOUT US</NavLink>
        <NavLink to="/greenhouses">YOUR GREENHOUSES</NavLink>
        <NavLink to="/zones">YOUR ZONES</NavLink>
        <NavLink to="/plants">YOUR PLANTS</NavLink>
        <div className="glow-on-hover"></div>
    </nav>
    )
}

export default NavBar;