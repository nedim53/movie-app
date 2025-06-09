import React from "react";
import { Link } from "react-router-dom";
import Search from "./search";

const Navbar =() => {
    return(
        <nav className="navbar">
        <Link to = "/">Movies</Link>
        <Link to = "/tv">Tv Shows</Link>
          (<Search />)
    
        </nav>
    )
}


export default Navbar;