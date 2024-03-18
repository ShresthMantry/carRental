const Rental = require('../models/rental.model');
const Payment = require('../models/payment.model');
const Car = require('../models/car.model');

exports.rentCar = (req, res) => {
  const { carId, startDate, endDate } = req.body;
  const customerId = req.userId;

  // Calculate the total cost
  const rentDuration = calculateRentDuration(startDate, endDate);
  const totalCost = calculateTotalCost(rentDuration, carId);

  const newRental = new Rental({
    carId,
    customerId,
    startDate,
    endDate,
    totalCost
  });

  Rental.create(newRental, (err, rental) => {
    if (err) {
      res.status(500).json({ error: 'Error creating rental' });
      return;
    }

    // Update the car status to "Rented"
    Car.updateStatus(carId, 'Rented', (err) => {
      if (err) {
        res.status(500).json({ error: 'Error updating car status' });
        return;
      }

      res.status(201).json({ message: 'Car rented successfully', rental });
    });
  });
};

exports.makePayment = (req, res) => {
  const { rentalId, paymentMethod } = req.body;
  const paymentDate = new Date();
  const amount = req.rental.totalCost; // Assuming the total cost is available in req.rental

  const newPayment = new Payment({
    rentalId,
    paymentDate,
    paymentMethod,
    amount
  });

  Payment.create(newPayment, (err, payment) => {
    if (err) {
      res.status(500).json({ error: 'Error making payment' });
      return;
    }

    res.status(201).json({ message: 'Payment successful', payment });
  });
};

// Helper functions
function calculateRentDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const rentDuration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return rentDuration;
}

function calculateTotalCost(rentDuration, carId) {
  // Retrieve the daily rate for the car
  // Calculate the total cost based on the rent duration and daily rate
  // Return the total cost
}