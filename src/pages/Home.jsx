import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="hero-overlay"></div>
      
      <div className="hero-content">
        <h1>
          Stay updated.
          <br />
          Stay connected.
          <br />
          <span>Never miss an event again</span>
        </h1>
        <p>
          Happenix makes event discovery and hosting simple. Find exciting
          events at CUSAT, or create your own in minutes. Manage RSVPs,
          tickets, and promotion — all in one place
        </p>
        <Link to="/register" className="cta-button">
          Create Your First Event
        </Link>
      </div>
    </div>
  );
}

export default Home;