import React from "react";
import { NavLink } from "react-router-dom"
import "../styling/navbar.css"
// import Greenhouses from "./Greenhouses";


// const linkStyles = {
//     display: "inline-block",
//     width: "160px",
//     height: "50px",
//     border: "none",
//     outline: "none",
//     color: "green",
//     background: "white",
//     cursor: "pointer",
//     position: "relative"
// };


// const linkStyles ={ 
//         display: "inline-block",
//         width: "200px",
//         height: "25px",
//         border: "none",
//         outline: "none",
//         color: "red",
//         background: "white",
//         cursor: "pointer",
//         position: "relative",
//     };

function NavBar() {
    return (
    <nav className="nav-container">
        {/* <NavLink style={linkStyles} className="glow-on-hover" to="/">home</NavLink>
        <NavLink style={linkStyles} className="glow-on-hover" to="/aboutus">about us</NavLink>
        <NavLink style={linkStyles} className="glow-on-hover" to="/greenhouses">your greenhouses</NavLink>
        <NavLink style={linkStyles} className="glow-on-hover" to="/zones">your zones</NavLink>
        <NavLink style={linkStyles} className="glow-on-hover" to="/plants">your plants</NavLink> */}
        {/* <NavLink style={linkStyles} className="glow-on-hover" to="/loginsignup">login</NavLink> */}
        {/* <div className="glow-on-hover"></div> */}
        <NavLink className="nav-button" to="/home">home</NavLink>
        <NavLink className="nav-button" to="/aboutus">about us</NavLink>
        <NavLink className="nav-button" to="/greenhouses">your greenhouses</NavLink>
        <NavLink className="nav-button" to="/zones">your zones</NavLink>
        <NavLink className="nav-button" to="/plants">your plants</NavLink>
    </nav>
    )
}

export default NavBar;