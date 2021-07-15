var express = require('express');
var bodyParser = require('body-parser');
const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

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
