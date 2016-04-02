'use strict';

let express = require('express');
let path = require('path');

let FormulaBackEnd = require('./formula1-back-end');

let app = express();

app.get('/', function(req, res) {
  res.status(200).send('Hello, world!');
});
app.use(express.static(__dirname + '/formula1-front-end'));
app.get('/formula1', function(req, res) {
	res.sendFile(path.join(__dirname + '/formula1-front-end/index.html'));
});

if (module === require.main) {
    let server = app.listen(process.env.PORT || 1337, function () {
        let host = server.address().address;
        console.log('Host: ' + host);
        if (host === '::' || !host) {
            host = '127.0.0.1';
        }
        let port = server.address().port;

        new FormulaBackEnd(host);

        console.log('App listening at http://%s:%s', host, port);
    });
}

module.exports = app;
