const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const enrollAdmin = require('../fabric-sdk/modules/enrollAdmin');
const registerUser = require('../fabric-sdk/modules/registerUser');

const app = express();
const httpServer = require('http').createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3300;

httpServer.listen(port, () => {
    console.log('Listening to port:', port);
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/api/enrollAdmin', async (req, res) => {

    try {
        const result = await enrollAdmin();
        res.send(result);
    } catch (e) {
        res.status(400).send(e.message)
    }

});

app.post('/api/registerUser', async (req, res) => {

    try {
        const result = await registerUser();
        res.send(result);
    } catch (e) {
        res.status(400).send(e.message)
    }

});