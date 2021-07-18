
// import React, { useEffect, useState } from 'react';
import {Row, Col, Form, Table, Button, Alert, Card, Container} from 'react-bootstrap';
import React, { useState } from 'react'
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

function CreateOwner() {
    const [date, setDate] = useState();

    return (
      <>
      <Container style={{height:'50em', backgroundColor:"lightgrey"}}>
        <Row>
        <Row>
        <p style={{color:"gray"}}>Create Owner</p>
        <Col></Col>
        <Col sm>
        <Card border="info" style={{ width: '50rem', textAlign:'center' }}>
        <Card.Header>
            <Card.Title>Create Owner</Card.Title>
        </Card.Header>
        <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">
        <Form>
            <Table responsive="sm">
                <tbody>
                    <tr>
                        <td><Form.Label> Owner ID </Form.Label></td>
                        <td><Form.Control type="text" placeholder="Enter Owner ID" /></td>
                    </tr>
                    <tr>
                        <td><Form.Label> First Name </Form.Label></td>
                        <td><Form.Control type="text" placeholder="Enter First Name" /></td>
                    </tr>
                    <tr>
                        <td><Form.Label> Last Name </Form.Label></td>
                        <td><Form.Control type="text" placeholder="Enter Last Name" /></td>
                    </tr>
                    <tr>
                        <td><Form.Label> Registration Date </Form.Label></td>
                        <td><DatePicker date={date} onDateChange={setDate} locale={enGB}>
                            {({ inputProps, focused }) => (
                            <Form.Control className={'input' + (focused ? ' -focused' : '')} 
                            {...inputProps}/> )}
                            </DatePicker></td>
                    </tr>
                </tbody>
            </Table>
            <Button variant="primary" type="submit"> Submit </Button>
        </Form>
        </Card.Subtitle>
        
        {/* alert -- success message*/}
        {/* <Alert show={admin} variant="success"> 
        <p>Admin is createOwnered!</p>
        <div><Button onClick={() => setAdmin(false)} variant="outline-success">
            close
        </Button>
        </div>
        </Alert>

        {!admin && <Button onClick={() => setAdmin(true)}>createOwner Admin</Button>}
         */}
        </Card.Body>
        </Card>
        </Col>
       <Col></Col>
      </Row>
    </Row>
    </Container>  
    </>
    );
  }

export default CreateOwner;