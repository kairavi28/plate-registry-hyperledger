
import React, { useEffect, useState } from 'react';
import {Row, Col, Button, Alert, Card, Container} from 'react-bootstrap';

function Enroll() {
    const [admin, setAdmin] = useState(false);
    const [user, setUser] = useState(false);

    return (
      <>
      <Container style={{height:'50em', backgroundColor:"lightgrey"}}>
        <Row>
        <Row>
        <p style={{color:"gray"}}>For initiallizing hyperledger user and show please click on enroll show and register user! 
        </p>
        <Col></Col>
        <Col sm>
        <Card border="info" style={{ width: '25rem', textAlign:'center' }}>
        <Card.Header>
            <Card.Title>Admin</Card.Title>
        </Card.Header>
        <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">Initialize Admin</Card.Subtitle>
        {/* alert -- success message*/}
        <Alert show={admin} variant="success"> 
        <p>Admin is Enrolled!</p>
        <div><Button onClick={() => setAdmin(false)} variant="outline-success">
            close
        </Button>
        </div>
        </Alert>

        {!admin && <Button onClick={() => setAdmin(true)}>Enroll Admin</Button>}
        
        </Card.Body>
        </Card>
        </Col>
        <Col sm>
        <Card border="info" style={{ width: '25rem', textAlign:'center' }}>
        <Card.Header>
            <Card.Title>User</Card.Title>
        </Card.Header>
        <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">Initialize User</Card.Subtitle> 
            {/* alert -- success message*/}
        <Alert show={user} variant="success"> 
        <p>User is Registered!</p>
        <div><Button onClick={() => setUser(false)} variant="outline-success">
            close
        </Button>
        </div>
        </Alert>

        {!user && <Button onClick={() => setUser(true)}>Register User</Button>}
        
            
        </Card.Body>
        </Card>
        </Col><Col></Col>
      </Row>
    </Row>
    </Container>  
    </>
    );
  }

export default Enroll;