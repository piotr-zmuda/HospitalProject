const express = require('express');
const router = express.Router();

const departamentController = require('../public/Controllers/departamentyController');

router.get('/', departamentController.showDeptList);
router.get('/add', departamentController.addDeptForm);
router.get('/details/:empID', departamentController.showDeptDetails);

module.exports = router;