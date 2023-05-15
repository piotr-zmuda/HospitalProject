const express = require('express');
const router = express.Router();

const employmentControler = require('../public/Controllers/EmploymentController');

router.get('/', employmentControler.showEmploymentList);
router.get('/add', employmentControler.showAddEmploymentForm);
router.get('/edit/:empId', employmentControler.showEditEmploymentForm);
router.get('/details/:empId', employmentControler.showEmploymentDetails);

router.post('/add', employmentControler.createEmployment);
router.post('/edit', employmentControler.updateEmployment);
router.get('/delete/:empId', employmentControler.deleteEmployment);


module.exports = router;