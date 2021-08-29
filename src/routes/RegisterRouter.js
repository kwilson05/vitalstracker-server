const express = require('express');
const router = express.Router();

const Controller = require('../controller/RegisterController');


router.use(function timeLog(req, res, next) {
  console.log('Register Route: ', Date.now());

  next();
});

router.post('/', Controller.register);

module.exports = router;
