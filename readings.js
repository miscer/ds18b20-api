'use strict';

const CronJob = require('cron').CronJob;
const sensors = require('./sensors');

let readings = Promise.resolve({
  date: new Date(),
  readings: {}
});

exports.get = () => {
  return readings;
};

exports.start = () => {
  new CronJob('00 * * * * *', read, null, true);
};

function read() {
  console.log('Reading sensors...');

  readings = sensors.read()
    .then((readings) => ({
      date: new Date(),
      readings: readings
    }));
}
