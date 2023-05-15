var express = require('express');
var router = express.Router();
const AuthController = require('../public/Controllers/authController');
const LangController = require('../public/Controllers/LangController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('../views/index', { title: 'Express' });
});
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);
router.get('/changeLang/:lang', LangController.changeLang);
module.exports = router;
