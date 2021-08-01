const express = require('express');
const router = express.Router();

const Controller = require('../controller/VitalController');

router.use(function timeLog(req, res, next) {
  console.log('Vital Route: ', Date.now());
  next();
});

router.post('/', Controller.new);
/*router.delete('/:id', Controller.delete);*/
router.put('/:vitalID', Controller.edit);
router.get('/', Controller.all);
router.get('/:vitalID', Controller.get);

module.exports = router;
