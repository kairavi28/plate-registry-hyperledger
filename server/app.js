const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const { roles } = require('./modules/Auth');
const { contracts } = require('./modules/Contracts');

const enrollAdmin = require('../fabric-sdk/modules/enrollAdmin');
const registerUser = require('../fabric-sdk/modules/registerUser');
const invoke = require('../fabric-sdk/modules/invoke');
const query = require('../fabric-sdk/modules/query');

const app = express();
const httpServer = require('http').createServer(app);

app.use(cors());
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

app.post('/api/owner/create', requireAuth, async (req, res) => {

    try {

        const { owner_id, first_name, last_name, reg_date } = req.body;
        const model = Object.values({ owner_id, first_name, last_name, reg_date });

        const ownerModel = Object.values({ owner_id });
        const onwerQuery = await query(contracts.owner.name, contracts.owner.functions.getOwnerInfo, ownerModel);

        if (onwerQuery.length) { 
            res.status(400).send(`Owner ID: ${owner_id} already exists!`);
            return;
        }

        const result = await invoke(contracts.owner.name, contracts.owner.functions.addNewOwner, model);
        res.send(result);

    } catch (e) {
        res.status(400).send(e.message)
    }

});

app.post('/api/owner/findOne', requireAuth, async (req, res) => {

    try {

        const { owner_id } = req.body;
        const model = Object.values({ owner_id });

        const result = await query(contracts.owner.name, contracts.owner.functions.getOwnerInfo, model);
        res.send(result);

    } catch (e) {
        res.status(400).send(e.message)
    }

});