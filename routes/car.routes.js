const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const carController = require('../controllers/car.controller');

const router = express.Router();

router.post('/', authMiddleware.verifyToken, carController.createCar);
router.get('/available', carController.getAvailableCars);

module.exports = router;