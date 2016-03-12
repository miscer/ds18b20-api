'use strict';

const ds18b20 = require('ds18b20');
const zipObject = require('lodash/zipObject');

exports.read = () => {
  return findSensors()
    .then((ids) => {
      return Promise.all(ids.map(readSensor))
        .then((readings) => zipObject(ids, readings));
    });
};

const findSensors = () => {
  return new Promise((resolve, reject) => {
    ds18b20.sensors((err, ids) => {
      if (err) {
        reject(err);
      } else {
        resolve(ids);
      }
    });
  });
};

const readSensor = (id) => {
  return new Promise((resolve, reject) => {
    ds18b20.temperature(id, (err, value) => {
      if (err) {
        reject(err);
      } else {
        resolve(value);
      }
    });
  });
};
