import { Link, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo-h.png";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="Happenix Logo" className="navbar-logo" />
      </Link>

      <div className="links">
        {location.pathname !== "/events" && (
          <Link to="/events">Explore Events</Link>
        )}
        
        <Link to="/login" className="sign-in-btn">
          Sign In
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;