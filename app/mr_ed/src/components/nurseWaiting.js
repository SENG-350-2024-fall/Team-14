import React, { useEffect, useState } from 'react';

const NurseWaiting = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    const fetchTickets = async () => {
      try {
        const response = await fetch('/api/triage-tickets');
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTickets();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (selectedTicket) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
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
          <strong>User ID:</strong> {selectedTicket.userID || 'N/A'}
          <div><strong>Timestamp:</strong> {selectedTicket.timestamp}</div>
          <div><strong>Allergies:</strong> {selectedTicket.listAllergies?.join(', ') || 'None'}</div>
          <div><strong>Duration:</strong> {selectedTicket.durationOfSymptoms || 'N/A'}</div>
          
          <h3>Symptoms:</h3>
          <div>
            {Object.entries(selectedTicket).map(([key, value]) => {
              if (typeof value === 'object' && value !== null) {
                return (
                  <div key={key}>
                    <strong>{key}:</strong>
                    <ul>
                      {Object.entries(value).map(([symptom, hasSymptom]) => (
                        <li key={symptom}>{symptom}: {hasSymptom ? 'Yes' : 'No'}</li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return null;
            })}
          </div>

          <button onClick={() => setSelectedTicket(null)} style={{ marginTop: '20px' }}>Back</button>
        </div>
      </div>
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
            <strong>User ID:</strong> {ticket.userID}
            <div><strong>Timestamp:</strong> {ticket.timestamp}</div>
            <div><strong>Allergies:</strong> {ticket.listAllergies?.join(', ') || 'None'}</div>
            <div><strong>Duration:</strong> {ticket.durationOfSymptoms || 'N/A'}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NurseWaiting;