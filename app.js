'use strict';

let express = require('express');
let path = require('path');

let FormulaBackEnd = require('./formula1-back-end');

let app = express();

app.get('/', function(req, res) {
  res.status(200).send('Hello, world!');
});
app.use(express.static(__dirname + '/F1'));
app.get('/formula1', function(req, res) {
	res.sendFile(path.join(__dirname + '/F1/index.html'));
});

if (module === require.main) {
    let server = app.listen(process.env.PORT || 8080, function () {
        let host = server.address().address ? server.address().address : '127.0.0.1';
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
