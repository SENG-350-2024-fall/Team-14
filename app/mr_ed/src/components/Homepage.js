import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import '../styles/Homepage.css'


function Homepage() {
    
const mockDepartments = [
    {
        establishmentID: 101,
        address: "123 Maple St, Vancouver, BC",
        maximumCapacity: 100,
        currentLoad: 75,
        waitTime: "00:15",  // 15 minutes in HH:MM format
        name: "Emergency Department"
    },
    {
        establishmentID: 102,
        address: "456 Oak St, Toronto, ON",
        maximumCapacity: 150,
        currentLoad: 125,
        waitTime: "00:30",  // 30 minutes
        name: "Radiology"
    },
    {
        establishmentID: 103,
        address: "789 Pine St, Calgary, AB",
        maximumCapacity: 50,
        currentLoad: 40,
        waitTime: "00:20",  // 20 minutes
        name: "Cardiology"
    },
    {
        establishmentID: 104,
        address: "321 Cedar St, Montreal, QC",
        maximumCapacity: 120,
        currentLoad: 110,
        waitTime: "00:25",  // 25 minutes
        name: "Neurology"
    },
    {
        establishmentID: 105,
        address: "654 Spruce St, Halifax, NS",
        maximumCapacity: 200,
        currentLoad: 180,
        waitTime: "00:45",  // 45 minutes
        name: "Pediatrics"
    }
];
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        // Fetch user data from the API endpoint
        fetch('http://localhost:8000/auth/user', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(response => response.json())
            .then(data => setUserData(data))
            .catch(error => console.error(error));
    }, []);
    const email = localStorage.getItem('email');
    return (
        <Container fluid>
            <Row>
                <Col>
                    <h1 class="text-center">Mr Ed</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h2>Department Wait Times</h2>
                </Col>
            </Row>
            <Row className='card-list'>
                <Col>
                    { mockDepartments.map( department => (
                        <Card>
                            <Card.Title className='d-flex justify-content-between'>
                                <span>{ department.name }</span>
                                <span className='wait-time'>{ department.waitTime } hrs</span>
                            </Card.Title>
                            <Card.Body > 
                                { department.address }
                            </Card.Body>
                        </Card>
                    ) ) }
                </Col>
            </Row>
        </Container>
    );
}
export default Homepage;