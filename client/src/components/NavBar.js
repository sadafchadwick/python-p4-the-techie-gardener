import React from "react";
import { NavLink } from "react-router-dom"
import "../styling/navbar.css"
import Greenhouses from "./Greenhouses";


const linkStyles = {
    display: "inline-block",
    width: "160px",
    height: "50px",
    border: "none",
    outline: "none",
    color: "green",
    background: "white",
    cursor: "pointer",
    position: "relative"
};

function NavBar() {
    return (
        <nav>
            <NavLink style={linkStyles} className="glow-on-hover" to="/">HOME</NavLink>
            {/* <NavLink style={linkStyles} className="glow-on-hover" to="/aboutus">ABOUT US</NavLink> */}
            <NavLink style={linkStyles} className="glow-on-hover" to="/greenhouses">YOUR GREENHOUSES</NavLink>
            <NavLink style={linkStyles} className="glow-on-hover" to="/zones">YOUR ZONES</NavLink>
            <NavLink style={linkStyles} className="glow-on-hover" to="/plants">YOUR PLANTS</NavLink>
            {/* <NavLink style={linkStyles} className="glow-on-hover" to="/loginsignup">LOGIN/SIGNUP</NavLink> */}
        </nav>
    )
}

export default NavBar;