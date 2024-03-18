const db = require('../config/db.config');

const Rental = function(rental) {
  this.carId = rental.carId;
  this.customerId = rental.customerId;
  this.startDate = rental.startDate;
  this.endDate = rental.endDate;
  this.totalCost = rental.totalCost;
};

Rental.create = (newRental, result) => {
  db.query('INSERT INTO rentals SET ?', newRental, (err, res) => {
    if (err) {
      console.error('Error creating rental:', err);
      result(err, null);
      return;
    }

    console.log('Created rental:', { id: res.insertId, ...newRental });
    result(null, { id: res.insertId, ...newRental });
  });
};

module.exports = Rental;