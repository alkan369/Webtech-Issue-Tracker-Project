import React from "react";
import logo from "../welcome-page/logo.png";
import Tickets from "../tickets-page/Tickets";
import Projects from "../projects/Projects";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("userToken")
    navigate("/");
  };

  return (
    <div>
      <header className="ticket-header">
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ float: "left", height: "80px", width: "90px", backgroundColor: "#fcfcfc" }}
          />
          <h1 style={{ marginLeft: "60px", marginRight: "auto" }}>Issue Tracker</h1>
          <button onClick={handleLogout} className="delete-button" style={{ maxHeight: "4rem" }}>
            Logout
          </button>
        </div>
      </header>
      <main>
        <Tickets />
        <Projects />
      </main>
    </div>
  );
};

export default App;
