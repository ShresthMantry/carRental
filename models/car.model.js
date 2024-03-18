const db = require('../config/db.config');

const Car = function(car) {
  this.make = car.make;
  this.model = car.model;
  this.year = car.year;
  this.color = car.color;
  this.dailyRate = car.dailyRate;
  this.providerId = car.providerId;
};

Car.create = (newCar, result) => {
  db.query('INSERT INTO cars SET ?', newCar, (err, res) => {
    if (err) {
      console.error('Error creating car:', err);
      result(err, null);
      return;
    }

    console.log('Created car:', { id: res.insertId, ...newCar });
    result(null, { id: res.insertId, ...newCar });
  });
};

Car.findAll = (result) => {
  db.query('SELECT * FROM cars WHERE status = "Available"', (err, res) => {
    if (err) {
      console.error('Error retrieving cars:', err);
      result(err, null);
      return;
    }

    console.log('Retrieved cars:', res);
    result(null, res);
  });
};

module.exports = Car;