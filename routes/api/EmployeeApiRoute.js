const express = require('express');
const router = express.Router();

const empApiController = require('../../API/EmployeeAPI');

router.get('/', empApiController.getEmployees);
router.get('/:empId', empApiController.getEmployeesById);

module.exports = router;