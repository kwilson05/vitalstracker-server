const express = require('express');
const router = express.Router();

router.use(function timeLog(req, res, next) {
  console.log('Axios Router: ', Date.now());
  if (req.body.data) {
    req.body = req.body.data;
  }
  next();
});


module.exports = router;
