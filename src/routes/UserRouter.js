const express = require('express');
const router = express.Router();


const Controller = require('../controller/UserController');

router.use(async (req, res, next) => {
  console.log('User Route: ', Date.now());
  next();
});

router.post('/auth/register', Controller.register);
router.post('/auth/signin', Controller.signin);
router.post('/auth/isSignedIn', Controller.isSignedIn);
router.post('/auth/signout', Controller.signout);


module.exports = router;
