import "../styles/Home.css";
import logo from "../assets/logoX.png";

function Home() {
  return (
    <div className="home">
      <img src={logo} alt="Happenix Logo" className="logo" />
      <h1>Welcome to HAPPENIX</h1>
      <p>Cochin University of Science & Technology</p>
    </div>
  );
}

export default Home;
