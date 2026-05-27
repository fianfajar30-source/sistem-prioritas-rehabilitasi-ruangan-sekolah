import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        MAX-HEAPKEL10
      </Link>

      <div className="nav-links">
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          <h2>01 WELCOME </h2>
        </Link>

        <Link
          to="/input"
          className={location.pathname === "/input" ? "active" : ""}
        >
          <h2>2 INPUT DATA</h2>
        </Link>

        <Link
          to="/hasil"
          className={location.pathname === "/hasil" ? "active" : ""}
        >
          <h2>03 HASIL PRIORITAS</h2>
        </Link>
      </div>

      <div className="live">
        <div className="dot"></div>
        SYSTEM LIVE
      </div>
    </nav>
  );
}