const Car = require('../models/car.model');

exports.createCar = (req, res) => {
  const { make, model, year, color, daily_rate } = req.body;
  console.log(req.customer_id);
  const provider_id = req.customer_id;

  const newCar = {
    make,
    model,
    year,
    color,
    daily_rate,
    provider_id
  };
  console.log(newCar);
  Car.create(newCar, (err, car) => {
    if (err) {
      res.status(500).json({ error: 'Error creating car' });
      return;
    }

    res.status(201).json({ message: 'Car created successfully', car });
  });
};

exports.getAvailableCars = (req, res) => {
  Car.findAll((err, cars) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving cars' });
      return;
    }

    res.status(200).json(cars);
  });
};