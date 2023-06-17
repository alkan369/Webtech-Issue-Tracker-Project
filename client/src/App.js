import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './components/welcome-page/Welcome';
import Tickets from './components/tickets-page/Tickets'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for Welcome Page - This is the default route */}
        <Route path="/" element={<Welcome />} />
        {/* Route for Tickets Page */}
        <Route path="/tickets" element={<Tickets />} />
      </Routes>
    </Router>
  );
};

export default App;
