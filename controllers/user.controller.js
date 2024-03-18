const User = require('../models/user.model');

exports.getUserProfile = (req, res) => {
  const email = req.email;

  User.findByEmail(email, (err, user) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(500).json({ error: 'Error retrieving user' });
      }
      return;
    }

    res.status(200).json(user);
  });
};

exports.updateUserProfile = (req, res) => {
  const email = req.email;
  const { name, phone, address, city, zip_code } = req.body;

  const updatedUser = {
    name,
    phone,
    address,
    city,
    zip_code
  };

  User.updateByEmail(email, updatedUser, (err, user) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(500).json({ error: 'Error updating user' });
      }
      return;
    }

    res.status(200).json({ message: 'User profile updated successfully' });
  });
};