'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const readings = require('./readings');
const config = require('./config');

const app = express();

app.get('/temperature', (req, res) => {
  readings.get()
    .then((readings) => {
      res.send(readings);
    })
    .catch(() => {
      res.status(503).send({
        error: 'Unexpected error while retrieving readings'
      });
    });
});

app.listen(config.server.port, () => {
  console.log('Waiting for connections...');
});

readings.start();
