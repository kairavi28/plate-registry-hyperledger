const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { roles } = require('./modules/Auth');

const enrollAdmin = require('../fabric-sdk/modules/enrollAdmin');
const registerUser = require('../fabric-sdk/modules/registerUser');
const invoke = require('../fabric-sdk/modules/invoke');
const query = require('../fabric-sdk/modules/query');

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

const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;

    //check bearer token
    if (authorization == roles.authenticated) next();
    else res.status(401).send();
}

//call once -- setup
app.post('/api/enrollAdmin', requireAuth, async (req, res) => {

    try {
        //check authentication here

        const result = await enrollAdmin();
        res.send(result);
    } catch (e) {
        res.status(400).send(e.message)
    }

});

//call once -- setup
app.post('/api/registerUser', requireAuth, async (req, res) => {

    try {
        const result = await registerUser();
        res.send(result);
    } catch (e) {
        res.status(400).send(e.message)
    }

});


app.post('/api/invoke', requireAuth, async (req, res) => {

    try {

        const { contract, funcName } = req.body;
        const result = await invoke(contract, funcName);
        res.send(result);

    } catch (e) {
        res.status(400).send(e.message)
    }

});


app.post('/api/query', requireAuth, async (req, res) => {

    try {

        const { contract, funcName, pr1 } = req.body;
        const result = await query(contract, funcName, pr1);
        res.send(result);

    } catch (e) {
        res.status(400).send(e.message)
    }

});