const express = require('express');
const router = express.Router();

const SessionController = require('../controller/SessionController');

router.use(function timeLog(req, res, next) {
  console.log('User Route: ', Date.now());
  next();
});

router.post('/signin/:firebaseToken', SessionController.signin);
router.post('/signout', SessionController.signout);
module.exports = router;
