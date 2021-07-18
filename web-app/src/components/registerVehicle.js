
// import React, { useEffect, useState } from 'react';
import {Row, Col, Form, Table, Dropdown, DropdownButton, Button, Alert, Card, Container} from 'react-bootstrap';
import React, { useState } from 'react'

function RegisterVehicle() {

    return (
      <>
      <Container style={{height:'50em', backgroundColor:"lightgrey"}}>
        <Row>
        <Row>
        <p style={{color:"gray"}}>Vehicle Registration</p>
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
                        <td><Form.Label>Chassis Number</Form.Label></td>
                        <td><Form.Control type="text" placeholder="Enter Owner ID" /></td>
                    </tr>
                    <tr>
                        <td><Form.Label>Automobile Type</Form.Label></td>
                        <td><Form.Control type="text" placeholder="Select Automobile Type" /></td>
                    </tr>
                    <tr>
                        <td><Form.Label>Make</Form.Label></td>
                        <td><Form.Control type="text" placeholder="Enter Make" /></td>
                    </tr>
                    <tr>
                        <td><Form.Label>Model</Form.Label></td>
                        <td><Form.Control type="text" placeholder="Enter Model" /></td>
                    </tr>
                    <tr>
                        <td><Form.Label>Year</Form.Label></td>
                        <td><select id="year" class="form-select">
                            <option selected>Select Year</option>
                            <option value='1990'>1990</option>
                            <option value='1991'>1991</option>
                            <option value='1992'>1992</option>
                            <option value='1993'>1993</option>
                            <option value='1994'>1994</option>
                            <option value='1995'>1995</option>
                            <option value='1996'>1996</option>
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td><Form.Label>Engine Number</Form.Label></td>
                        <td><Form.Control type="text" placeholder="Enter Engine Number" /></td>
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

export default RegisterVehicle;