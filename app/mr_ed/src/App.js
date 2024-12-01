import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Homepage from './components/Homepage';
import EDNavbar from './components/EDNavbar';
import PatientWaiting from './components/patientWaiting';
import NurseWaiting from './components/nurseWaiting';
import EnterVirtualTriage from './components/EnterVirtualTriage';

function App() {
  return (
    <Router>
      <EDNavbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/patientWaiting" element={<PatientWaiting />} /> 
          <Route path="/nurseWaiting" element={<NurseWaiting />} />
          <Route path="/enter" element={<EnterVirtualTriage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;