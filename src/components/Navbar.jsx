import { Link , useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo-h.png"; // <-- Use the new 'H' logo

function Navbar() {

  const location = useLocation(); // 2. Get the current location object

  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="Happenix Logo" className="navbar-logo" />
      </Link>

      <div className="links">
        {/* 3. Only show this link if we are NOT on the /events page */}
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