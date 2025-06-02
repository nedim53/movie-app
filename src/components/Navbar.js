import React from "react";
import { Link } from "react-router-dom";

const Navbar =() => {
    return(
        <nav className="navbar">
        <Link to = "/">Home page</Link>
        <Link to = "/series">Tv Shows</Link>
        </nav>
    )
}

export default Navbar;