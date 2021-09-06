const express = require('express');
const router = express.Router();
//const { decodeClaims } = require("../util/FirebaseUtil");

const Controller = require('../controller/UserController');

router.use(function timeLog(req, res, next) {
  console.log('User Route: ', Date.now());

  //user firebase to get user details
  next();
});

//router.post('/', Controller.new);
//router.get('/', Controller.all);
/*router.delete('/:id', Controller.delete);
router.post('/:id', Controller.edit);
router.get('/', Controller.getAll);
router.get('/:id', Controller.get);*/

module.exports = router;
