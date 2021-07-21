import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Alert, Card, Container } from 'react-bootstrap';
import api from '../helper/api';

function Enroll() {
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);

  const enrollAdmin = async () => {

    try {

      const result = await api.post('api/enrollAdmin');

      setAdmin({
        status: 'ok',
        msg: result.data
      });

    }
    catch (e) {

      if (e.response)
        setAdmin({
          status: 'err',
          msg: e.response.data
        });
    }

  }

  const registerUser = async () => {

    try {

      const result = await api.post('api/registerUser');

      setUser({
        status: 'ok',
        msg: result.data
      });

    }
    catch (e) {

      if (e.response)
        setUser({
          status: 'err',
          msg: e.response.data
        });
    }

  }

  return (
    <>
      <Container>
        <Row>
          <p style={{ color: "gray" }} className="mt-2">
            For initiallizing hyperledger user and show please click on enroll show and register user!
          </p>
        </Row>
        <Row>

          <Col sm>
            <Card border="info" style={{ height: '300px' }}>
              <Card.Header>
                <Card.Title>Admin</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">Initialize Admin</Card.Subtitle>

                {!admin && <Button onClick={() => enrollAdmin()}>Enroll Admin</Button>}

                <Alert show={admin} className="mt-4" variant={admin.status == "ok" ? "success" : "danger"}>
                  <p>{admin.msg}</p>
                  <div><Button onClick={() => setAdmin(false)} variant={admin.status == "ok" ? "outline-success" : "outline-danger"}>
                    close
                  </Button>
                  </div>
                </Alert>

              </Card.Body>
            </Card>
          </Col>

          <Col sm>
            <Card border="info" style={{ height: '300px' }}>
              <Card.Header>
                <Card.Title>User</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">Initialize User</Card.Subtitle>

                {!user && <Button onClick={() => registerUser()}>Register User</Button>}

                <Alert show={user} className="mt-4" variant={user.status == "ok" ? "success" : "danger"}>
                  <p>{user.msg}</p>
                  <div><Button onClick={() => setUser(false)} variant={user.status == "ok" ? "outline-success" : "outline-danger"}>
                    close
                  </Button>
                  </div>
                </Alert>

              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
    </>
  );
}

export default Enroll;