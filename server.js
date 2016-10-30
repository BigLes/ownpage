'use strict';

let express = require('express');
let path = require('path');

let FormulaBackEnd = require('./formula1-back-end');
let RegExp = require('./regexp');

let app = express();

app.use(express.static(__dirname + '/www'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/www/index.html'));
});
app.use(express.static(__dirname + '/formula1-front-end'));
app.get('/formula1', function(req, res) {
	res.sendFile(path.join(__dirname + '/formula1-front-end/index.html'));
});

let server = app.listen(process.env.PORT || 1337, function () {
    let host = server.address().address;
    console.log('Host: ' + host);
    if (host === '::' || !host) {
        host = '127.0.0.1';
    }
    let port = server.address().port;

    new FormulaBackEnd(host);
    new RegExp(app);

    console.log('Connection string: ' + process.env.MYSQLCONNSTR_localdb);

    console.log('App listening at http://%s:%s', host, port);
});

module.exports = app;
