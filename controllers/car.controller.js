const Car = require('../models/car.model');

exports.createCar = (req, res) => {
  const { make, model, year, color, dailyRate } = req.body;
  const providerId = req.userId;

  const newCar = new Car({
    make,
    model,
    year,
    color,
    dailyRate,
    providerId
  });

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