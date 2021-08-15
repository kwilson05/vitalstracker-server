const express = require('express');
const router = express.Router();

const Controller = require('../controller/SignoutController');


router.use(function timeLog(req, res, next) {
  console.log('Signout Route: ', Date.now());
  next();
});

router.post('/', Controller.signout);

module.exports = router;
