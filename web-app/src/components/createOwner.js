
import { Row, Col, Form, Table, Button, Alert, Card, Container } from 'react-bootstrap';
import api from '../helper/api';
import React, { useState } from 'react'
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import '../App.css';

function CreateOwner() {
    const [ownerID, setOwnerID] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [date, setDate] = useState(new Date);
    const [result, setResult] = useState(false);

    const addNewOnwer = async () => {

        const model = {
            owner_id: ownerID,
            first_name: firstName,
            last_name: lastName,
            reg_date: date
        }

        try {

            const result = await api.post('api/owner/create', model);

            setResult({
                status: 'ok',
                msg: result.data
            });

        } catch (e) {
            if (e.response)
                setResult({
                    status: 'err',
                    msg: e.response.data
                });
        }
    }

    const clearForm = () => {
        setOwnerID('');
        setFirstName('');
        setLastName('');
        setDate(new Date);
    }

    return (
        <Container className="create-owner">
            <Row>

                <Col sm={{ offset: 2, span: 8 }} className="mt-4">

                    <Card border="info" style={{ textAlign: 'center' }}>
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
                                                <td><Form.Control type="text" value={ownerID} onChange={(e) => setOwnerID(e.target.value)} placeholder="Enter Owner ID" /></td>
                                            </tr>
                                            <tr>
                                                <td><Form.Label> First Name </Form.Label></td>
                                                <td><Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter First Name" /></td>
                                            </tr>
                                            <tr>
                                                <td><Form.Label> Last Name </Form.Label></td>
                                                <td><Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter Last Name" /></td>
                                            </tr>
                                            <tr>
                                                <td><Form.Label> Registration Date </Form.Label></td>
                                                <td>
                                                    <DatePicker date={date} format="yyyy-MM-dd" onDateChange={setDate} locale={enGB}>
                                                        {({ inputProps, focused }) => (
                                                            <Form.Control className={'input' + (focused ? ' -focused' : '')} {...inputProps} />)}
                                                    </DatePicker>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>

                                    <div className="float-start">
                                        <Button variant="success" type="button" onClick={() => addNewOnwer()}>
                                            Save New Owner
                                        </Button>

                                        <Button variant="warning" type="button" onClick={() => clearForm()} className="m-2">
                                            Clear Form
                                        </Button>
                                    </div>

                                </Form>

                            </Card.Subtitle>

                        </Card.Body>
                    </Card>



                    <Alert show={result} className="mt-4" variant={result.status == "ok" ? "success" : "danger"}>
                        <p>{result.msg}</p>
                        <div><Button onClick={() => setResult(false)} variant={result.status == "ok" ? "outline-success" : "outline-danger"}>
                            close
                        </Button>
                        </div>
                    </Alert>

                </Col>

            </Row>
        </Container >
    );
}

export default CreateOwner;