import React from 'react';
import logo from '../welcome-page/logo.png';
import Tickets from '../tickets-page/Tickets';
import Projects from '../projects/Projects';
import './Dashboard.css';
const App = () => {
  return (
    <div>
      <header className="ticket-header">
        <img src={logo} alt="Logo" style={{ float: 'left', height: '80px', width: '90px', backgroundColor: '#fcfcfc' }} />
        <h1 style={{ marginLeft: '60px' }}>Issue Tracker</h1>
      </header>
      <main>
        <Tickets />
        <Projects />
      </main>
    </div>
  );
};

export default App;
