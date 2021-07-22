
import { Row, Col, Form, Table, Button, Alert, Card, Container, Modal } from 'react-bootstrap';
import api from '../helper/api';
import moment from 'moment';
import React, { useState, useEffect } from 'react'
import { enGB } from 'date-fns/locale'
import { DatePicker } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import '../App.css';

function OwnerList() {
    const [list, setList] = useState('');
    const [result, setResult] = useState(false);
    const [show, setShow] = useState(false);
    const [ownerID, setOwnerID] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [date, setDate] = useState(new Date);

    const handleClose = () => setShow(false);

    const updateList = async () => {
        try {

            const query = await api.post('api/owner/queryAll');

            if (query && query.data) {
                setList(query.data.map(item => item.Record).map((item, idx) => ({ ...item, no: idx + 1, registration_date: moment(item.registration_date).format('yyyy-MM-DD') })));
            }

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {

        updateList();

    }, []);

    const openEdit = id => {

        //fetching info from API
        (async () => {
            try {

                const model = {
                    owner_id: id
                }

                const query = await api.post('api/owner/findOne', model);

                if (query && query.data) {

                    setOwnerID(query.data.owner_id);
                    setFirstName(query.data.first_name);
                    setLastName(query.data.last_name);
                    setDate(moment(query.data.registration_date).toDate());

                    setShow(true);
                }

            } catch (e) {
                if (e.response)
                    setResult({
                        status: 'err',
                        msg: e.response.data
                    });
            }
        })()

    }

    const editHandler = async () => {

        const model = {
            owner_id: ownerID,
            first_name: firstName,
            last_name: lastName,
            reg_date: date
        }

        try {

            const result = await api.post('api/owner/edit', model);

            setResult({
                status: 'ok',
                msg: result.data
            });

            updateList();

        } catch (e) {
            if (e.response)
                setResult({
                    status: 'err',
                    msg: e.response.data
                });
        }

    }

    return (
        <Container className="owner-list">

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Edit Owner's Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table responsive="sm">
                        <tbody>
                            <tr>
                                <td><Form.Label> Owner ID </Form.Label></td>
                                <td><Form.Control type="text" readOnly value={ownerID} onChange={(e) => setOwnerID(e.target.value)} placeholder="Enter Owner ID" /></td>
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


                    <Alert show={result} className="mt-4" variant={result.status == "ok" ? "success" : "danger"}>
                        <p>{result.msg}</p>
                        <div><Button onClick={() => setResult(false)} variant={result.status == "ok" ? "outline-success" : "outline-danger"}>
                            close
                        </Button>
                        </div>
                    </Alert>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={editHandler}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row>
                <Col>

                    <div className="m-4">
                        {!list.length ? 'No Data Were Found!' :
                            <Table responsive hover striped bordered>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Reg Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list.map((row, i) => (
                                        <tr key={i}>
                                            <td>{row.no}</td>
                                            <td>{row.first_name}</td>
                                            <td>{row.last_name}</td>
                                            <td>{row.registration_date}</td>
                                            <td>
                                                <Button variant="warning" onClick={() => openEdit(row.owner_id)}>
                                                    Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        }
                    </div>

                </Col>
            </Row>
        </Container >
    );
}

export default OwnerList;