const express = require('express');
const router = express.Router();

const employeeControler = require('../public/Controllers/pacjenciController');

router.get('/', employeeControler.showPatientList);
router.get('/add', employeeControler.addPatientForm);
router.get('/details/:empID', employeeControler.showPatientDetails);

module.exports = router;