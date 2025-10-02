import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/rename.png";

function Navbar() {
  return (
    <nav className="navbar">
      <img src={logo} alt="Happenix Logo" className="navbar-logo" />

      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

export default Navbar;
