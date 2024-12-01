import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners';

const NurseWaiting = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [priority, setPriority] = useState(1);

  const createMedicalTicket = () => {
    const data = {
      'VTticketID': selectedTicket.ticketID,
      'priority': parseInt(priority),
      'startTime': new Date().toString()
    };
    console.log(data);
    axios.post('http://localhost:8000/medical/ticket', data)
      .then(response => {
        console.log("Ticket created:", response.data);
        setSelectedTicket(null);
      })
      .catch(error => console.error("Error creating ticket:", error));
  };

  useEffect(() => {
    axios.get('http://localhost:8000/triage/tickets')
      .then(response => {
        setTickets(response.data);
        setLoading(false);
      })
      .catch(error => console.error("Error fetching tickets:", error));
  }, []);

  const renderSymptoms = (symptoms) => (
    <div>
      {Object.entries(symptoms).map(([symptom, value]) => (
        <Row key={symptom}>
          <Col>
            {symptom}: {value ? "Yes" : "No"}
          </Col>
        </Row>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="patient-waiting" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
        <h1>Nurse Waiting Screen</h1>
        <p>Please wait for incoming patient triage forms.</p>
        <ClipLoader color="#3498db" loading={true} size={150} />
      </div>
    );
  }

  if (selectedTicket) {
    return (
      <Form>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', marginBottom: '20px' }}>
          <h1>Ticket Details</h1>
          <div style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
            width: '80%',
            textAlign: 'center',
            transition: 'transform 0.2s, background-color 0.2s',
          }}>
            <h2>Ticket Details</h2>
            <p><strong>Ticket ID:</strong> {selectedTicket.ticketID}</p>
            <p><strong>User:</strong> {selectedTicket.user}</p>
            <p><strong>Emergency Department:</strong> {selectedTicket.ED.name}</p>
            <p><strong>Duration of Symptoms:</strong> {selectedTicket.durationOfSymptoms}</p>
            <p><strong>Allergies:</strong> {selectedTicket.listAllergies}</p>
            <p><strong>Past Medical Conditions:</strong> {selectedTicket.pastMedicalConditions}</p>

            <h3>General Symptoms</h3>
            {renderSymptoms(selectedTicket.generalSymptoms)}

            <h3>Respiratory Symptoms</h3>
            {renderSymptoms(selectedTicket.respiratorySymptoms)}

            <h3>Gastrointestinal Symptoms</h3>
            {renderSymptoms(selectedTicket.gastrointestinalSymptoms)}

            <h3>Neurological Symptoms</h3>
            {renderSymptoms(selectedTicket.neurologicalSymptoms)}

            <h3>Musculoskeletal Symptoms</h3>
            {renderSymptoms(selectedTicket.musculoskeletalSymptoms)}

            <h3>Cardiovascular Symptoms</h3>
            {renderSymptoms(selectedTicket.cardiovascularSymptoms)}

            <h3>Skin Symptoms</h3>
            {renderSymptoms(selectedTicket.skinSymptoms)}

            <h3>Psychological Symptoms</h3>
            {renderSymptoms(selectedTicket.psychologicalSymptoms)}

            <h3>Substance Habits</h3>
            {renderSymptoms(selectedTicket.substanceHabits)}

            <p><strong>Consent:</strong> {selectedTicket.consent ? "Yes" : "No"}</p>
            <p><strong>Timestamp:</strong> {new Date(selectedTicket.timestamp).toLocaleString()}</p>

            <p><strong>Select the priority:</strong></p>
            <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="1">High</option>
              <option value="2">Medium</option>
              <option value="3">Low</option>
            </Form.Select>
            <Button onClick={createMedicalTicket} style={{ marginTop: '20px' }}>Submit Ticket</Button>
            <Button variant="secondary" onClick={() => setSelectedTicket(null)} style={{ marginTop: '20px', marginLeft: '10px' }}>Back</Button>
          </div>
        </div>
      </Form>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Incoming Triage Tickets</h1>
      <div style={{ width: '80%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {tickets.map(ticket => (
          <div key={ticket.ticketID} style={{
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            onClick={() => setSelectedTicket(ticket)}
          >
            <strong>{ticket.user}</strong>
            <div style={{ fontSize: '0.8em', color: '#555' }}>{new Date(ticket.timestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NurseWaiting;