import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Row, Col, Dropdown } from 'react-bootstrap';

const EnterVirtualTriage = () => {
  const [formData, setFormData] = useState({
    ED: '',
    durationOfSymptoms: '',
    listAllergies: '',
    pastMedicalConditions: '',
    generalSymptoms: {},
    respiratorySymptoms: {},
    gastrointestinalSymptoms: {},
    neurologicalSymptoms: {},
    musculoskeletalSymptoms: {},
    cardiovascularSymptoms: {},
    skinSymptoms: {},
    psychologicalSymptoms: {},
    substanceHabits: {},
    consent: false,
    timestamp: new Date().toISOString()
  });
  const [error, setError] = useState(null);

  const handleTextChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    const [category, symptom] = id.split('.');
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [symptom]: checked
      }
    });
  };

  const handleDropdown = (eventKey) => {
    setFormData({
      ...formData,
      ED: eventKey
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/triage/tickets', formData, {
        headers: {
            'Content-Type': 'application/json', // Ensure JSON format is specified
        },
    });
      console.log('Ticket created:', response.data);
      setError(null);
    } catch (err) {
      console.error('Error creating ticket:', err);
      console.error('Error response:', err.response);
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError({ detail: 'An unexpected error occurred. Please try again later.' });
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <h1>Enter Virtual Triage</h1>
      <Form onSubmit={handleSubmit} style={{ width: '80%' }}>
        <Row>
          <Col>
            <h3>General Symptoms</h3>
            <Form.Check type="checkbox" label="Fever" id="generalSymptoms.fever" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Chills" id="generalSymptoms.chills" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Fatigue" id="generalSymptoms.fatigue" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Weakness" id="generalSymptoms.weakness" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Weight Change" id="generalSymptoms.weightChange" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Night Sweats" id="generalSymptoms.nightSweats" onChange={handleCheckboxChange} />
          </Col>
          <Col>
            <h3>Respiratory Symptoms</h3>
            <Form.Check type="checkbox" label="Cough" id="respiratorySymptoms.cough" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Shortness of Breath" id="respiratorySymptoms.shortnessOfBreath" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Wheezing" id="respiratorySymptoms.wheezing" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Sore Throat" id="respiratorySymptoms.soreThroat" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Nasal Congestion" id="respiratorySymptoms.nasalCongestion" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Chest Pain" id="respiratorySymptoms.chestPain" onChange={handleCheckboxChange} />
          </Col>
          <Col>
            <h3>Gastrointestinal Symptoms</h3>
            <Form.Check type="checkbox" label="Nausea" id="gastrointestinalSymptoms.nausea" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Vomiting" id="gastrointestinalSymptoms.vomiting" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Diarrhea" id="gastrointestinalSymptoms.diarrhea" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Constipation" id="gastrointestinalSymptoms.constipation" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Abdominal Pain" id="gastrointestinalSymptoms.abdominalPain" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Appetite Loss" id="gastrointestinalSymptoms.appetiteLoss" onChange={handleCheckboxChange} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Neurological Symptoms</h3>
            <Form.Check type="checkbox" label="Headache" id="neurologicalSymptoms.headache" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Dizziness" id="neurologicalSymptoms.dizziness" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Numbness" id="neurologicalSymptoms.numbness" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Confusion" id="neurologicalSymptoms.confusion" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Memory Loss" id="neurologicalSymptoms.memoryLoss" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Seizures" id="neurologicalSymptoms.seizures" onChange={handleCheckboxChange} />
          </Col>
          <Col>
            <h3>Musculoskeletal Symptoms</h3>
            <Form.Check type="checkbox" label="Joint Pain" id="musculoskeletalSymptoms.jointPain" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Muscle Pain" id="musculoskeletalSymptoms.musclePain" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Stiffness" id="musculoskeletalSymptoms.stiffness" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Back Pain" id="musculoskeletalSymptoms.backPain" onChange={handleCheckboxChange} />
          </Col>
          <Col>
            <h3>Cardiovascular Symptoms</h3>
            <Form.Check type="checkbox" label="Palpitations" id="cardiovascularSymptoms.palpitations" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Swelling Legs/Ankles" id="cardiovascularSymptoms.swellinglegsAnkles" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Chest Pain" id="cardiovascularSymptoms.chestPain" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Accelerated Heartbeat" id="cardiovascularSymptoms.acceleratedHeartbeat" onChange={handleCheckboxChange} />
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Skin Symptoms</h3>
            <Form.Check type="checkbox" label="Rash" id="skinSymptoms.rash" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Itching" id="skinSymptoms.itching" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Bruising" id="skinSymptoms.bruising" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Wounds" id="skinSymptoms.wounds" onChange={handleCheckboxChange} />
          </Col>
          <Col>
            <h3>Psychological Symptoms</h3>
            <Form.Check type="checkbox" label="Anxiety" id="psychologicalSymptoms.anxiety" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Depression" id="psychologicalSymptoms.depression" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Mood Swings" id="psychologicalSymptoms.moodSwings" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Sleep Pattern Changes" id="psychologicalSymptoms.sleepPatternChanges" onChange={handleCheckboxChange} />
          </Col>
          <Col>
            <h3>Substance Habits</h3>
            <Form.Check type="checkbox" label="Alcohol" id="substanceHabits.alcohol" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Smoking" id="substanceHabits.smoking" onChange={handleCheckboxChange} />
            <Form.Check type="checkbox" label="Drugs" id="substanceHabits.drugs" onChange={handleCheckboxChange} />
          </Col>
        </Row>
        <Form.Group controlId="durationOfSymptoms">
          <Form.Label>Duration of Symptoms</Form.Label>
          <Form.Control type="text" value={formData.durationOfSymptoms} onChange={handleTextChange} required />
        </Form.Group>
        <Form.Group controlId="listAllergies">
          <Form.Label>Allergies</Form.Label>
          <Form.Control type="text" value={formData.listAllergies} onChange={handleTextChange} required />
        </Form.Group>
        <Form.Group controlId="pastMedicalConditions">
          <Form.Label>Past Medical Conditions</Form.Label>
          <Form.Control type="text" value={formData.pastMedicalConditions} onChange={handleTextChange} required />
        </Form.Group>
        <Form.Group controlId="ED">
          <Form.Label>Emergency Department</Form.Label>
          <Dropdown onSelect={handleDropdown}>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              {formData.ED || 'Select Emergency Department'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="Victoria General Hospital">Victoria General Hospital</Dropdown.Item>
              <Dropdown.Item eventKey="Royal Jubilee Hospital">Royal Jubilee Hospital</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group controlId="consent">
          <Form.Check type="checkbox" label="Consent" checked={formData.consent} onChange={(e) => setFormData({ ...formData, consent: e.target.checked })} />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
          Submit
        </Button>
      </Form>
      {error && (
        <Alert variant="danger" style={{ marginTop: '20px' }}>
          {Array.isArray(error.detail) ? (
            <ul>
              {error.detail.map((err, index) => (
                <li key={index}>{err.msg}</li>
              ))}
            </ul>
          ) : (
            <p>{error.detail}</p>
          )}
        </Alert>
      )}
    </div>
  );
};

export default EnterVirtualTriage;