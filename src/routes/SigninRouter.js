const express = require('express');
const router = express.Router();

const Controller = require('../controller/SigninController');


router.use(function timeLog(req, res, next) {
  console.log('Signin Route: ', Date.now());
  next();
});

router.post('/', Controller.signin);

module.exports = router;
