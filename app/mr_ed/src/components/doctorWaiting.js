import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

const DoctorWaiting = () => {
  const [medicalTickets, setMedicalTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8000/medical/tickets')
      .then(response => {
        setMedicalTickets(response.data);
        setLoading(false);
      })
      .catch(error => console.error("Error fetching medical tickets:", error));
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
    return <div>Loading...</div>;
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
            <p><strong>Emergency Department:</strong> {selectedTicket.ED}</p>
            <p><strong>Duration of Symptoms:</strong> {selectedTicket.durationOfSymptoms}</p>
            <p><strong>Allergies:</strong> {selectedTicket.listAllergies ? selectedTicket.listAllergies.join(', ') : 'None'}</p>
            <p><strong>Past Medical Conditions:</strong> {selectedTicket.pastMedicalConditions ? selectedTicket.pastMedicalConditions.join(', ') : 'None'}</p>

            <h3>General Symptoms</h3>
            {renderSymptoms(selectedTicket.generalSymptoms || {})}

            <h3>Respiratory Symptoms</h3>
            {renderSymptoms(selectedTicket.respiratorySymptoms || {})}

            <h3>Gastrointestinal Symptoms</h3>
            {renderSymptoms(selectedTicket.gastrointestinalSymptoms || {})}

            <h3>Neurological Symptoms</h3>
            {renderSymptoms(selectedTicket.neurologicalSymptoms || {})}

            <h3>Musculoskeletal Symptoms</h3>
            {renderSymptoms(selectedTicket.musculoskeletalSymptoms || {})}

            <h3>Cardiovascular Symptoms</h3>
            {renderSymptoms(selectedTicket.cardiovascularSymptoms || {})}

            <h3>Skin Symptoms</h3>
            {renderSymptoms(selectedTicket.skinSymptoms || {})}

            <h3>Psychological Symptoms</h3>
            {renderSymptoms(selectedTicket.psychologicalSymptoms || {})}

            <h3>Substance Habits</h3>
            {renderSymptoms(selectedTicket.substanceHabits || {})}

            <p><strong>Consent:</strong> {selectedTicket.consent ? "Yes" : "No"}</p>
            <p><strong>Timestamp:</strong> {new Date(selectedTicket.timestamp).toLocaleString()}</p>

            <Button variant="secondary" onClick={() => setSelectedTicket(null)} style={{ marginTop: '20px', marginLeft: '10px' }}>Back</Button>
          </div>
        </div>
      </Form>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Medical Tickets</h1>
      <div style={{ width: '80%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {medicalTickets.map(ticket => (
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
            <div style={{ fontSize: '0.8em', color: '#555' }}>
                Start Time: {new Date(ticket.startTime).toLocaleString()}
          </div>
      </div>
        ))}
    </div>
    </div>
  );
};

export default DoctorWaiting;
