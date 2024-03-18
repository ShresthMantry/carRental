const db = require('../config/db.config');

const Employee = function(employee) {
  this.firstName = employee.firstName;
  this.lastName = employee.lastName;
  this.email = employee.email;
  this.phone = employee.phone;
  this.locationId = employee.locationId;
  this.jobTitle = employee.jobTitle;
};

Employee.create = (newEmployee, result) => {
  db.query('INSERT INTO employees SET ?', newEmployee, (err, res) => {
    if (err) {
      console.error('Error creating employee:', err);
      result(err, null);
      return;
    }

    console.log('Created employee:', { id: res.insertId, ...newEmployee });
    result(null, { id: res.insertId, ...newEmployee });
  });
};

module.exports = Employee;